import React, { useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

function Polyclinics({ districts = [], polyclinics = [], setPolyclinics }) {
    const [open, setOpen] = useState(false);
    const [polyclinicData, setPolyclinicData] = useState({
        name: '',
        district: '',
        address: '',
        phone: '',
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        setPolyclinicData({ ...polyclinicData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const dataToSend = {
            name: polyclinicData.name,
            district: parseInt(polyclinicData.district) || null,
            address: polyclinicData.address,
            phone: polyclinicData.phone,
        };

        axios.post('http://127.0.0.1:8000/api/polyclinics/', dataToSend, {
            headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        })
            .then(response => {
                setPolyclinics(prev => [...prev, response.data]);
                handleClose();
                setPolyclinicData({ name: '', district: '', address: '', phone: '' });
            })
            .catch(error => {
                const errorMessage = error.response?.data
                    ? Object.values(error.response.data).join(', ')
                    : 'Unknown error';
                console.error('Error adding polyclinic:', error.response?.data);
                alert(`Failed to add polyclinic: ${errorMessage}`);
            });
    };

    return (
        <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h5" gutterBottom>
                Poliklinikalar
            </Typography>
            <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
                Poliklinika qo'shish
            </Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Poliklinika Nomi</TableCell>
                        <TableCell>Tuman</TableCell>
                        <TableCell>Manzil</TableCell>
                        <TableCell>Telefon Raqami</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {polyclinics.length > 0 ? (
                        polyclinics.map((polyclinic) => (
                            <TableRow key={polyclinic.id}>
                                <TableCell>{polyclinic.id}</TableCell>
                                <TableCell>{polyclinic.name || 'N/A'}</TableCell>
                                <TableCell>{polyclinic.district_name || 'N/A'}</TableCell>
                                <TableCell>{polyclinic.address || 'N/A'}</TableCell>
                                <TableCell>{polyclinic.phone || 'N/A'}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5}>No polyclinics available</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Polyclinic</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Poliklinika Nomi"
                        fullWidth
                        value={polyclinicData.name}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Tumanlar</InputLabel>
                        <Select
                            name="district"
                            value={polyclinicData.district}
                            onChange={handleChange}
                            label="Tuman"
                        >
                            <MenuItem value="">Tumanni tanlang</MenuItem>
                            {districts.map((district) => (
                                <MenuItem key={district.id} value={district.id}>
                                    {district.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        name="address"
                        label="Manzil"
                        fullWidth
                        value={polyclinicData.address}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        label="Telefon Raqami"
                        fullWidth
                        value={polyclinicData.phone}
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

export default Polyclinics;