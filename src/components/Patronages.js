import React, { useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

function Patronages({ families = [], doctors = [], patronages = [], setPatronages }) {
    const [openAdd, setOpenAdd] = useState(false); // Add dialog
    const [openEdit, setOpenEdit] = useState(false); // Edit dialog
    const [patronageData, setPatronageData] = useState({
        family: '',
        visit_date: '',
        status: 'Scheduled',
        doctor: '',
    });
    const [editPatronageId, setEditPatronageId] = useState(null); // Tahrirlanadigan patronaj ID’si

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const handleOpenEdit = (patronage) => {
        setPatronageData({
            family: patronage.family || '',
            visit_date: patronage.visit_date || '',
            status: patronage.status || 'Scheduled',
            doctor: patronage.doctor || '',
        });
        setEditPatronageId(patronage.id);
        setOpenEdit(true);
    };
    const handleCloseEdit = () => {
        setOpenEdit(false);
        setEditPatronageId(null);
        setPatronageData({ family: '', visit_date: '', status: 'Scheduled', doctor: '' });
    };

    const handleChange = (e) => {
        setPatronageData({ ...patronageData, [e.target.name]: e.target.value });
    };

    const handleAddSubmit = () => {
        const dataToSend = {
            family: parseInt(patronageData.family) || null,
            visit_date: patronageData.visit_date,
            status: patronageData.status,
            doctor: parseInt(patronageData.doctor) || null,
        };

        axios.post('http://127.0.0.1:8000/api/patronages/', dataToSend, {
            headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        })
            .then(response => {
                setPatronages(prev => [...prev, response.data]);
                handleCloseAdd();
                setPatronageData({ family: '', visit_date: '', status: 'Scheduled', doctor: '' });
            })
            .catch(error => {
                const errorMessage = error.response?.data
                    ? Object.values(error.response.data).join(', ')
                    : 'Unknown error';
                console.error('Error adding patronage:', error.response?.data);
                alert(`Failed to add patronage: ${errorMessage}`);
            });
    };

    const handleEditSubmit = () => {
        const dataToSend = {
            family: parseInt(patronageData.family) || null,
            visit_date: patronageData.visit_date,
            status: patronageData.status,
            doctor: parseInt(patronageData.doctor) || null,
        };

        axios.patch(`http://127.0.0.1:8000/api/patronages/${editPatronageId}/`, dataToSend, {
            headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        })
            .then(response => {
                setPatronages(prev =>
                    prev.map(patronage =>
                        patronage.id === editPatronageId ? { ...patronage, ...response.data } : patronage
                    )
                );
                handleCloseEdit();
            })
            .catch(error => {
                const errorMessage = error.response?.data
                    ? Object.values(error.response.data).join(', ')
                    : 'Unknown error';
                console.error('Error editing patronage:', error.response?.data);
                alert(`Failed to edit patronage: ${errorMessage}`);
            });
    };

    const handleDelete = (id) => {
        if (!window.confirm('Are you sure you want to delete this patronage?')) {
            return;
        }

        axios.delete(`http://127.0.0.1:8000/api/patronages/${id}/`, {
            headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        })
            .then(() => {
                setPatronages(prev => prev.filter(patronage => patronage.id !== id));
            })
            .catch(error => {
                const errorMessage = error.response?.data
                    ? Object.values(error.response.data).join(', ')
                    : 'Unknown error';
                console.error('Error deleting patronage:', error.response?.data);
                alert(`Failed to delete patronage: ${errorMessage}`);
            });
    };

    return (
        <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h5" gutterBottom>
                Hamshiralar
            </Typography>
            <Button variant="contained" onClick={handleOpenAdd} sx={{ mb: 2 }}>
                Hamshira qo'shish
            </Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Oila Nomi</TableCell>
                        <TableCell>Biriktirilgan sanasi</TableCell>
                        <TableCell>Holati</TableCell>
                        <TableCell>Shifokor</TableCell>
                        <TableCell>Amallar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {patronages.length > 0 ? (
                        patronages.map((patronage) => (
                            <TableRow key={patronage.id}>
                                <TableCell>{patronage.id}</TableCell>
                                <TableCell>{patronage.family_name || 'N/A'}</TableCell>
                                <TableCell>{patronage.visit_date || 'N/A'}</TableCell>
                                <TableCell>{patronage.status || 'N/A'}</TableCell>
                                <TableCell>{patronage.doctor || 'N/A'}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleOpenEdit(patronage)}
                                        sx={{ mr: 1 }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleDelete(patronage.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={6}>No patronages available</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Add Patronage Dialog */}
            <Dialog open={openAdd} onClose={handleCloseAdd}>
                <DialogTitle>Add New Patronage</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Oilani tanlang</InputLabel>
                        <Select
                            name="family"
                            value={patronageData.family}
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
                        label="Biriktirilgan sanasi (YYYY-MM-DD)"
                        fullWidth
                        value={patronageData.visit_date}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Holati</InputLabel>
                        <Select
                            name="status"
                            value={patronageData.status}
                            onChange={handleChange}
                            label="Holati"
                        >
                            <MenuItem value="Scheduled">Rejalashtirilgan</MenuItem>
                            <MenuItem value="Completed">Bajarildi</MenuItem>
                            <MenuItem value="Cancelled">Bekor qilingan</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Shifokor</InputLabel>
                        <Select
                            name="doctor"
                            value={patronageData.doctor}
                            onChange={handleChange}
                            label="Shifokor"
                        >
                            <MenuItem value="">Shifokorni tanlang</MenuItem>
                            {doctors.map((doctor) => (
                                <MenuItem key={doctor.id} value={doctor.id}>
                                    {doctor.user}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAdd}>Cancel</Button>
                    <Button onClick={handleAddSubmit}>Add</Button>
                </DialogActions>
            </Dialog>

            {/* Edit Patronage Dialog */}
            <Dialog open={openEdit} onClose={handleCloseEdit}>
                <DialogTitle>Edit Patronage</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Family</InputLabel>
                        <Select
                            name="family"
                            value={patronageData.family}
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
                        label="Biriktirilgan sanasi (YYYY-MM-DD)"
                        fullWidth
                        value={patronageData.visit_date}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Holati</InputLabel>
                        <Select
                            name="status"
                            value={patronageData.status}
                            onChange={handleChange}
                            label="Holati"
                        >
                            <MenuItem value="Scheduled">Rejalashtirilgan</MenuItem>
                            <MenuItem value="Completed">Bajarildi</MenuItem>
                            <MenuItem value="Cancelled">Bekor qilingan</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Doctor</InputLabel>
                        <Select
                            name="doctor"
                            value={patronageData.doctor}
                            onChange={handleChange}
                            label="Shifokor"
                        >
                            <MenuItem value="">Shifokorni tanlang</MenuItem>
                            {doctors.map((doctor) => (
                                <MenuItem key={doctor.id} value={doctor.id}>
                                    {doctor.user}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit}>Cancel</Button>
                    <Button onClick={handleEditSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}

export default Patronages;