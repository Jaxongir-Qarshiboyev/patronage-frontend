import React, { useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

function Newborns({ families = [], newborns = [], setNewborns }) {
    const [open, setOpen] = useState(false);
    const [newbornData, setNewbornData] = useState({
        name: '',
        birth_date: '',
        gender: '',
        family: '',
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        setNewbornData({ ...newbornData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const dataToSend = {
            name: newbornData.name,
            birth_date: newbornData.birth_date,
            gender: newbornData.gender,
            family: parseInt(newbornData.family) || null,
        };

        axios.post('http://127.0.0.1:8000/api/newborns/', dataToSend, {
            headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        })
            .then(response => {
                setNewborns(prev => [...prev, response.data]);
                handleClose();
                setNewbornData({ name: '', birth_date: '', gender: '', family: '' });
            })
            .catch(error => {
                const errorMessage = error.response?.data
                    ? Object.values(error.response.data).join(', ')
                    : 'Unknown error';
                console.error('Error adding newborn:', error.response?.data);
                alert(`Failed to add newborn: ${errorMessage}`);
            });
    };

    return (
        <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h5" gutterBottom>
                Yangi tug'ilgan chaqaloqlar
            </Typography>
            <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
                Yangi tug'ilgan chaqaloq qo'shish
            </Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>F.I.SH</TableCell>
                        <TableCell>Tug'ilgan sanasi</TableCell>
                        <TableCell>Jins</TableCell>
                        <TableCell>Oila Nomi</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {newborns.length > 0 ? (
                        newborns.map((newborn) => (
                            <TableRow key={newborn.id}>
                                <TableCell>{newborn.id}</TableCell>
                                <TableCell>{newborn.name || 'N/A'}</TableCell>
                                <TableCell>{newborn.birth_date || 'N/A'}</TableCell>
                                <TableCell>{newborn.gender || 'N/A'}</TableCell>
                                <TableCell>{newborn.family_name || 'N/A'}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5}>No newborns available</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Newborn</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="F.I.SH"
                        fullWidth
                        value={newbornData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="birth_date"
                        label="Tug'ilgan sanasi (YYYY-MM-DD)"
                        fullWidth
                        value={newbornData.birth_date}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Jins</InputLabel>
                        <Select
                            name="gender"
                            value={newbornData.gender}
                            onChange={handleChange}
                            label="Jins"
                        >
                            <MenuItem value="">Jinsni tanlang</MenuItem>
                            <MenuItem value="M">Erkak</MenuItem>
                            <MenuItem value="F">Ayol</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Oila Nomi</InputLabel>
                        <Select
                            name="family"
                            value={newbornData.family}
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}

export default Newborns;