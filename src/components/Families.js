import React, { useState } from 'react';
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

function Families({ districts = [], polyclinics = [], families = [], setFamilies }) {
    const [openAdd, setOpenAdd] = useState(false); // Add dialog
    const [openEdit, setOpenEdit] = useState(false); // Edit dialog
    const [familyData, setFamilyData] = useState({
        name: '',
        phone: '',
        status: 'Active',
        polyclinic: '',
        district: '',
    });
    const [editFamilyId, setEditFamilyId] = useState(null); // Tahrirlanadigan oila ID’si

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const handleOpenEdit = (family) => {
        setFamilyData({
            name: family.name || '',
            phone: family.phone || '',
            status: family.status || 'Active',
            polyclinic: family.polyclinic || '',
            district: family.district || '',
        });
        setEditFamilyId(family.id);
        setOpenEdit(true);
    };
    const handleCloseEdit = () => {
        setOpenEdit(false);
        setEditFamilyId(null);
        setFamilyData({ name: '', phone: '', status: 'Active', polyclinic: '', district: '' });
    };

    const handleChange = (e) => {
        setFamilyData({ ...familyData, [e.target.name]: e.target.value });
    };

    const handleAddSubmit = () => {
        if (!familyData.polyclinic || !familyData.district) {
            alert('Polyclinic and District are required fields.');
            return;
        }

        const dataToSend = {
            name: familyData.name,
            phone: familyData.phone,
            status: familyData.status,
            polyclinic: parseInt(familyData.polyclinic),
            district: parseInt(familyData.district),
        };

        axios.post('http://127.0.0.1:8000/api/families/', dataToSend, {
            headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        })
            .then(response => {
                setFamilies(prev => [...prev, response.data]);
                handleCloseAdd();
                setFamilyData({ name: '', phone: '', status: 'Active', polyclinic: '', district: '' });
            })
            .catch(error => {
                const errorMessage = error.response?.data
                    ? Object.values(error.response.data).join(', ')
                    : 'Unknown error';
                console.error('Error adding family:', error.response?.data);
                alert(`Failed to add family: ${errorMessage}`);
            });
    };

    const handleEditSubmit = () => {
        if (!familyData.polyclinic || !familyData.district) {
            alert('Polyclinic and District are required fields.');
            return;
        }

        const dataToSend = {
            name: familyData.name,
            phone: familyData.phone,
            status: familyData.status,
            polyclinic: parseInt(familyData.polyclinic),
            district: parseInt(familyData.district),
        };

        axios.patch(`http://127.0.0.1:8000/api/families/${editFamilyId}/`, dataToSend, {
            headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        })
            .then(response => {
                setFamilies(prev =>
                    prev.map(family =>
                        family.id === editFamilyId ? { ...family, ...response.data } : family
                    )
                );
                handleCloseEdit();
            })
            .catch(error => {
                const errorMessage = error.response?.data
                    ? Object.values(error.response.data).join(', ')
                    : 'Unknown error';
                console.error('Error editing family:', error.response?.data);
                alert(`Failed to edit family: ${errorMessage}`);
            });
    };

    const handleDelete = (id) => {
        if (!window.confirm('Are you sure you want to delete this family?')) {
            return;
        }

        axios.delete(`http://127.0.0.1:8000/api/families/${id}/`, {
            headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        })
            .then(() => {
                setFamilies(prev => prev.filter(family => family.id !== id));
            })
            .catch(error => {
                const errorMessage = error.response?.data
                    ? Object.values(error.response.data).join(', ')
                    : 'Unknown error';
                console.error('Error deleting family:', error.response?.data);
                alert(`Failed to delete family: ${errorMessage}`);
            });
    };

    return (
        <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h5" gutterBottom>
                Oilalar
            </Typography>
            <Button variant="contained" onClick={handleOpenAdd} sx={{ mb: 2 }}>
                Oila qo'shish
            </Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Oila Nomi</TableCell>
                        <TableCell>Telefon Raqami</TableCell>
                        <TableCell>Holati</TableCell>
                        <TableCell>Poliklinika</TableCell>
                        <TableCell>Tuman</TableCell>
                        <TableCell>Amallar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {families.length > 0 ? (
                        families.map((family) => (
                            <TableRow key={family.id}>
                                <TableCell>{family.id}</TableCell>
                                <TableCell>{family.name || 'N/A'}</TableCell>
                                <TableCell>{family.phone || 'N/A'}</TableCell>
                                <TableCell>{family.status || 'N/A'}</TableCell>
                                <TableCell>{family.polyclinic_name || 'N/A'}</TableCell>
                                <TableCell>{family.district_name || 'N/A'}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleOpenEdit(family)}
                                        sx={{ mr: 1 }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleDelete(family.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7}>No families available</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Add Family Dialog */}
            <Dialog open={openAdd} onClose={handleCloseAdd}>
                <DialogTitle>Add New Family</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Oila Boshlig'ining F.I.SH"
                        fullWidth
                        value={familyData.name}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        label="Telefon Raqami"
                        fullWidth
                        value={familyData.phone}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Holati</InputLabel>
                        <Select
                            name="status"
                            value={familyData.status}
                            onChange={handleChange}
                            label="Holati"
                        >
                            <MenuItem value="Active">Oila shaklantirib bo'lindi</MenuItem>
                            <MenuItem value="Inactive">Oila shaklantirilmoqda</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Poliklinika</InputLabel>
                        <Select
                            name="polyclinic"
                            value={familyData.polyclinic}
                            onChange={handleChange}
                            label="Poliklinika"
                            required
                        >
                            <MenuItem value="">Poliklinikani tanlang</MenuItem>
                            {polyclinics.map((polyclinic) => (
                                <MenuItem key={polyclinic.id} value={polyclinic.id}>
                                    {polyclinic.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Tuman</InputLabel>
                        <Select
                            name="district"
                            value={familyData.district}
                            onChange={handleChange}
                            label="Tuman"
                            required
                        >
                            <MenuItem value="">Tumanni tanlang</MenuItem>
                            {districts.map((district) => (
                                <MenuItem key={district.id} value={district.id}>
                                    {district.name}
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

            {/* Edit Family Dialog */}
            <Dialog open={openEdit} onClose={handleCloseEdit}>
                <DialogTitle>Edit Family</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Oila Boshlig'ining F.I.SH"
                        fullWidth
                        value={familyData.name}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        margin="dense"
                        name="phone"
                        label="Telefon Raqami"
                        fullWidth
                        value={familyData.phone}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Status</InputLabel>
                        <Select
                            name="status"
                            value={familyData.status}
                            onChange={handleChange}
                            label="Holati"
                        >
                            <MenuItem value="Active">Oila shaklantirib bo'lindi</MenuItem>
                            <MenuItem value="Inactive">Oila shaklantirilmoqda</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Polyclinic</InputLabel>
                        <Select
                            name="polyclinic"
                            value={familyData.polyclinic}
                            onChange={handleChange}
                            label="Poliklinika"
                            required
                        >
                            <MenuItem value="">Poliklinikani tanlang</MenuItem>
                            {polyclinics.map((polyclinic) => (
                                <MenuItem key={polyclinic.id} value={polyclinic.id}>
                                    {polyclinic.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>District</InputLabel>
                        <Select
                            name="district"
                            value={familyData.district}
                            onChange={handleChange}
                            label="Tuman"
                            required
                        >
                            <MenuItem value="">Tumanni tanlang</MenuItem>
                            {districts.map((district) => (
                                <MenuItem key={district.id} value={district.id}>
                                    {district.name}
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

export default Families;