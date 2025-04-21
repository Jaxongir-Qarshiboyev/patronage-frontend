import React, { useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

function DisabledPersons({ families = [], disabledPersons = [], setDisabledPersons }) {
    const [open, setOpen] = useState(false);
    const [disabledPersonData, setDisabledPersonData] = useState({
        name: '',
        disability_id: '',
        address: '',
        family: '',
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleChange = (e) => {
        setDisabledPersonData({ ...disabledPersonData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const dataToSend = {
            name: disabledPersonData.name,
            disability_id: disabledPersonData.disability_id,
            address: disabledPersonData.address,
            family: parseInt(disabledPersonData.family) || null,
        };

        axios.post('http://127.0.0.1:8000/api/disabled-persons/', dataToSend, {
            headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        })
            .then(response => {
                setDisabledPersons(prev => [...prev, response.data]);
                handleClose();
                setDisabledPersonData({ name: '', disability_id: '', address: '', family: '' });
            })
            .catch(error => {
                const errorMessage = error.response?.data
                    ? Object.values(error.response.data).join(', ')
                    : 'Unknown error';
                console.error('Error adding disabled person:', error.response?.data);
                alert(`Failed to add disabled person: ${errorMessage}`);
            });
    };

    return (
        <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h5" gutterBottom>
                Nogironlar
            </Typography>
            <Button variant="contained" onClick={handleOpen} sx={{ mb: 2 }}>
                Nogiron insonni qo'shish
            </Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>F.I.SH</TableCell>
                        <TableCell>Nogironlik guvohnomasi</TableCell>
                        <TableCell>Manzil</TableCell>
                        <TableCell>Oila Nomi</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {disabledPersons.length > 0 ? (
                        disabledPersons.map((person) => (
                            <TableRow key={person.id}>
                                <TableCell>{person.id}</TableCell>
                                <TableCell>{person.name || 'N/A'}</TableCell>
                                <TableCell>{person.disability_id || 'N/A'}</TableCell>
                                <TableCell>{person.address || 'N/A'}</TableCell>
                                <TableCell>{person.family_name || 'N/A'}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={5}>No disabled persons available</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add New Disabled Person</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="F.I.SH"
                        fullWidth
                        value={disabledPersonData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="disability_id"
                        label="Nogironlik guvohnomasi"
                        fullWidth
                        value={disabledPersonData.disability_id}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="address"
                        label="Manzil"
                        fullWidth
                        value={disabledPersonData.address}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Oila Nomi</InputLabel>
                        <Select
                            name="family"
                            value={disabledPersonData.family}
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

export default DisabledPersons;