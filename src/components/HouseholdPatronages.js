import React, { useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

function HouseholdPatronages({ families = [], householdPatronages = [], setHouseholdPatronages }) {
    const [open, setOpen] = useState(false);
    const [householdPatronageData, setHouseholdPatronageData] = useState({
        family: '',
        visit_date: '',
        status: 'Scheduled',
        notes: '',
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        setHouseholdPatronageData({ ...householdPatronageData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const dataToSend = {
            family: parseInt(householdPatronageData.family) || null,
            visit_date: householdPatronageData.visit_date,
            status: householdPatronageData.status,
            notes: householdPatronageData.notes,
        };

        axios.post('http://127.0.0.1:8000/api/household-patronages/', dataToSend, {
            headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        })
            .then(response => {
                setHouseholdPatronages(prev => [...prev, response.data]);
                handleClose();
                setHouseholdPatronageData({ family: '', visit_date: '', status: 'Scheduled', notes: '' });
            })
            .catch(error => {
                const errorMessage = error.response?.data
                    ? Object.values(error.response.data).join(', ')
                    : 'Unknown error';
                console.error('Error adding household patronage:', error.response?.data);
                alert(`Failed to add household patronage: ${errorMessage}`);
            });
    };

    return (
        <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h5" gutterBottom>
                Xonadon Hamshirasi
            </Typography>
            <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
                Xonadon Hamshirasi qo'shish
            </Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Oila Nomi</TableCell>
                        <TableCell>Tashrif sanasi</TableCell>
                        <TableCell>Holati</TableCell>
                        <TableCell>Izohlar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {householdPatronages.length > 0 ? (
                        householdPatronages.map((patronage) => (
                            <TableRow key={patronage.id}>
                                <TableCell>{patronage.id}</TableCell>
                                <TableCell>{patronage.family_name || 'N/A'}</TableCell>
                                <TableCell>{patronage.visit_date || 'N/A'}</TableCell>
                                <TableCell>{patronage.status || 'N/A'}</TableCell>
                                <TableCell>{patronage.notes || 'N/A'}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5}>No household patronages available</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Household Patronage</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Oila Nomi</InputLabel>
                        <Select
                            name="family"
                            value={householdPatronageData.family}
                            onChange={handleChange}
                            label="Oila Nomi"
                        >
                            <MenuItem value="">Oilani tanlang</MenuItem>
                            {families.map((family) => (
                                <MenuItem key={family.id} value={family.id}>
                                    {family.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="visit_date"
                        label="Tashrif sanasi (YYYY-MM-DD)"
                        fullWidth
                        value={householdPatronageData.visit_date}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Holati</InputLabel>
                        <Select
                            name="status"
                            value={householdPatronageData.status}
                            onChange={handleChange}
                            label="Status"
                        >
                            <MenuItem value="Scheduled">Rejalashtirilgan</MenuItem>
                            <MenuItem value="Completed">Bajarildi</MenuItem>
                            <MenuItem value="Cancelled">Bekor qilingan</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        name="notes"
                        label="Izohlar"
                        fullWidth
                        multiline
                        rows={4}
                        value={householdPatronageData.notes}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}

export default HouseholdPatronages;