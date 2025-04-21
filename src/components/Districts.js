import React, { useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';

function Districts({ districts = [], setDistricts }) {
    const [open, setOpen] = useState(false);
    const [districtData, setDistrictData] = useState({
        name: '',
        region: '',
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        setDistrictData({ ...districtData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        axios.post('http://127.0.0.1:8000/api/districts/', districtData, {
            headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        })
            .then(response => {
                setDistricts(prev => [...prev, response.data]);
                handleClose();
                setDistrictData({ name: '', region: '' });
            })
            .catch(error => {
                const errorMessage = error.response?.data
                    ? Object.values(error.response.data).join(', ')
                    : 'Unknown error';
                console.error('Error adding district:', error.response?.data);
                alert(`Failed to add district: ${errorMessage}`);
            });
    };

    return (
        <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h5" gutterBottom>
                Tumanlar
            </Typography>
            <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
                Tuman qo'shish
            </Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Tuman Nomi</TableCell>
                        <TableCell>Viloyat</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {districts.length > 0 ? (
                        districts.map((district) => (
                            <TableRow key={district.id}>
                                <TableCell>{district.id}</TableCell>
                                <TableCell>{district.name || 'N/A'}</TableCell>
                                <TableCell>{district.region || 'N/A'}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={3}>No districts available</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New District</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Tuman Nomi"
                        fullWidth
                        value={districtData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="region"
                        label="Viloyat"
                        fullWidth
                        value={districtData.region}
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

export default Districts;