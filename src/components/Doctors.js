import React, { useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

function Doctors({ polyclinics = [], doctors = [], setDoctors }) {
    const [open, setOpen] = useState(false);
    const [doctorData, setDoctorData] = useState({
        user: '',
        specialty: '',
        polyclinic: '',
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        setDoctorData({ ...doctorData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const dataToSend = {
            user: parseInt(doctorData.user) || null,
            specialty: doctorData.specialty,
            polyclinic: parseInt(doctorData.polyclinic) || null,
        };

        axios.post('http://127.0.0.1:8000/api/doctors/', dataToSend, {
            headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        })
            .then(response => {
                setDoctors(prev => [...prev, response.data]);
                handleClose();
                setDoctorData({ user: '', specialty: '', polyclinic: '' });
            })
            .catch(error => {
                const errorMessage = error.response?.data
                    ? Object.values(error.response.data).join(', ')
                    : 'Unknown error';
                console.error('Error adding doctor:', error.response?.data);
                alert(`Failed to add doctor: ${errorMessage}`);
            });
    };

    return (
        <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h5" gutterBottom>
                Shifokorlar
            </Typography>
            <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
                Shifokor qo'shish
            </Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Foydalanuvchi</TableCell>
                        <TableCell>Mutaxassislik</TableCell>
                        <TableCell>Poliklinika</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {doctors.length > 0 ? (
                        doctors.map((doctor) => (
                            <TableRow key={doctor.id}>
                                <TableCell>{doctor.id}</TableCell>
                                <TableCell>{doctor.user || 'N/A'}</TableCell>
                                <TableCell>{doctor.specialty || 'N/A'}</TableCell>
                                <TableCell>{doctor.polyclinic_name || 'N/A'}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4}>No doctors available</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Doctor</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="user"
                        label="Shifokor Foydalanuvchi ID"
                        fullWidth
                        value={doctorData.user}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="specialty"
                        label="Mutaxassislik"
                        fullWidth
                        value={doctorData.specialty}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Poliklinika</InputLabel>
                        <Select
                            name="polyclinic"
                            value={doctorData.polyclinic}
                            onChange={handleChange}
                            label="Poliklinika"
                        >
                            <MenuItem value="">Poliklinikani tanlang</MenuItem>
                            {polyclinics.map((polyclinic) => (
                                <MenuItem key={polyclinic.id} value={polyclinic.id}>
                                    {polyclinic.name}
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

export default Doctors;