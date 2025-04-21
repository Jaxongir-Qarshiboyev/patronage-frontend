import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

function FamilyMembers({ families = [] }) {
    const [familyMembers, setFamilyMembers] = useState([]);
    const [openAdd, setOpenAdd] = useState(false); // Add dialog
    const [openEdit, setOpenEdit] = useState(false); // Edit dialog
    const [familyMemberData, setFamilyMemberData] = useState({
        family: '',
        name: '',
        birth_date: '',
        gender: '',
        address: '',
    });
    const [editFamilyMemberId, setEditFamilyMemberId] = useState(null); // Tahrirlanadigan a'zo ID’si

    // Ma'lumotlarni yuklash
    useEffect(() => {
        const fetchFamilyMembers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/family-members/', {
                    headers: { Authorization: `Token ${localStorage.getItem('token')}` },
                });
                setFamilyMembers(response.data);
            } catch (error) {
                console.error('Error fetching family members:', error.response?.data);
                alert('Failed to load family members. Please check your authentication or server status.');
            }
        };

        fetchFamilyMembers();
    }, []);

    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    const handleOpenEdit = (member) => {
        setFamilyMemberData({
            family: member.family || '',
            name: member.name || '',
            birth_date: member.birth_date || '',
            gender: member.gender || '',
            address: member.address || '',
        });
        setEditFamilyMemberId(member.id);
        setOpenEdit(true);
    };
    const handleCloseEdit = () => {
        setOpenEdit(false);
        setEditFamilyMemberId(null);
        setFamilyMemberData({ family: '', name: '', birth_date: '', gender: '', address: '' });
    };

    const handleChange = (e) => {
        setFamilyMemberData({ ...familyMemberData, [e.target.name]: e.target.value });
    };

    const handleAddSubmit = () => {
        const dataToSend = {
            family: parseInt(familyMemberData.family),
            name: familyMemberData.name,
            birth_date: familyMemberData.birth_date,
            gender: familyMemberData.gender,
            address: familyMemberData.address,
        };

        axios.post('http://127.0.0.1:8000/api/family-members/', dataToSend, {
            headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        })
            .then(response => {
                setFamilyMembers(prev => [...prev, response.data]);
                handleCloseAdd();
                setFamilyMemberData({ family: '', name: '', birth_date: '', gender: '', address: '' });
            })
            .catch(error => {
                const errorMessage = error.response?.data
                    ? Object.values(error.response.data).join(', ')
                    : 'Unknown error';
                console.error('Error adding family member:', error.response?.data);
                alert(`Failed to add family member: ${errorMessage}`);
            });
    };

    const handleEditSubmit = () => {
        const dataToSend = {
            family: parseInt(familyMemberData.family),
            name: familyMemberData.name,
            birth_date: familyMemberData.birth_date,
            gender: familyMemberData.gender,
            address: familyMemberData.address,
        };

        axios.patch(`http://127.0.0.1:8000/api/family-members/${editFamilyMemberId}/`, dataToSend, {
            headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        })
            .then(response => {
                setFamilyMembers(prev =>
                    prev.map(member =>
                        member.id === editFamilyMemberId ? { ...member, ...response.data } : member
                    )
                );
                handleCloseEdit();
            })
            .catch(error => {
                const errorMessage = error.response?.data
                    ? Object.values(error.response.data).join(', ')
                    : 'Unknown error';
                console.error('Error editing family member:', error.response?.data);
                alert(`Failed to edit family member: ${errorMessage}`);
            });
    };

    const handleDelete = (id) => {
        if (!window.confirm('Are you sure you want to delete this family member?')) {
            return;
        }

        axios.delete(`http://127.0.0.1:8000/api/family-members/${id}/`, {
            headers: { Authorization: `Token ${localStorage.getItem('token')}` },
        })
            .then(() => {
                setFamilyMembers(prev => prev.filter(member => member.id !== id));
            })
            .catch(error => {
                const errorMessage = error.response?.data
                    ? Object.values(error.response.data).join(', ')
                    : 'Unknown error';
                console.error('Error deleting family member:', error.response?.data);
                alert(`Failed to delete family member: ${errorMessage}`);
            });
    };

    return (
        <Paper sx={{ p: 2, mt: 2 }}>
            <Typography variant="h5" gutterBottom>
                Family Members
            </Typography>
            <Button variant="contained" onClick={handleOpenAdd} sx={{ mb: 2 }}>
                Add Family Member
            </Button>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Oila Nomi</TableCell>
                        <TableCell>F.I.SH</TableCell>
                        <TableCell>Tug'ilgan kun sanasi</TableCell>
                        <TableCell>Jins</TableCell>
                        <TableCell>Manzil</TableCell>
                        <TableCell>Amallar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {familyMembers.length > 0 ? (
                        familyMembers.map((member) => (
                            <TableRow key={member.id}>
                                <TableCell>{member.id}</TableCell>
                                <TableCell>{member.family_name || 'N/A'}</TableCell>
                                <TableCell>{member.name || 'N/A'}</TableCell>
                                <TableCell>{member.birth_date || 'N/A'}</TableCell>
                                <TableCell>{member.gender || 'N/A'}</TableCell>
                                <TableCell>{member.address || 'N/A'}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        onClick={() => handleOpenEdit(member)}
                                        sx={{ mr: 1 }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleDelete(member.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={7}>No family members available</TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Add Family Member Dialog */}
            <Dialog open={openAdd} onClose={handleCloseAdd}>
                <DialogTitle>Add New Family Member</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Oila Nomi</InputLabel>
                        <Select
                            name="family"
                            value={familyMemberData.family}
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
                        name="name"
                        label="F.I.SH"
                        fullWidth
                        value={familyMemberData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="birth_date"
                        label="Tug'ilgan kun (YYYY-MM-DD)"
                        fullWidth
                        value={familyMemberData.birth_date}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Jins</InputLabel>
                        <Select
                            name="gender"
                            value={familyMemberData.gender}
                            onChange={handleChange}
                            label="Jins"
                        >
                            <MenuItem value="">Jinsni tanlang</MenuItem>
                            <MenuItem value="M">Erkak</MenuItem>
                            <MenuItem value="F">Ayol</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        name="address"
                        label="Manzil"
                        fullWidth
                        value={familyMemberData.address}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseAdd}>Cancel</Button>
                    <Button onClick={handleAddSubmit}>Add</Button>
                </DialogActions>
            </Dialog>

            {/* Edit Family Member Dialog */}
            <Dialog open={openEdit} onClose={handleCloseEdit}>
                <DialogTitle>Edit Family Member</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Family</InputLabel>
                        <Select
                            name="family"
                            value={familyMemberData.family}
                            onChange={handleChange}
                            label="Oila Nomi"
                        >
                            <MenuItem value="">Select a family</MenuItem>
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
                        name="name"
                        label="F.I.SH"
                        fullWidth
                        value={familyMemberData.name}
                        onChange={handleChange}
                    />
                    <TextField
                        margin="dense"
                        name="birth_date"
                        label="Tug'ilgan kun (YYYY-MM-DD)"
                        fullWidth
                        value={familyMemberData.birth_date}
                        onChange={handleChange}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel>Gender</InputLabel>
                        <Select
                            name="gender"
                            value={familyMemberData.gender}
                            onChange={handleChange}
                            label="Jins"
                        >
                            <MenuItem value="">Jinsni tanlang</MenuItem>
                            <MenuItem value="M">Erkak</MenuItem>
                            <MenuItem value="F">Ayol</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        name="address"
                        label="Manzil"
                        fullWidth
                        value={familyMemberData.address}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit}>Cancel</Button>
                    <Button onClick={handleEditSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}

export default FamilyMembers;