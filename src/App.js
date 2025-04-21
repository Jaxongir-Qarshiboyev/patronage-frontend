import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Container, createTheme, ThemeProvider, IconButton, CssBaseline } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import GroupIcon from '@mui/icons-material/Group';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import Home from './components/Home';
import Families from './components/Families';
import Patronages from './components/Patronages';
import HouseholdPatronages from './components/HouseholdPatronages';
import Statistics from './components/Statistics';
import Login from './components/Login';
import Districts from './components/Districts';
import Polyclinics from './components/Polyclinics';
import Doctors from './components/Doctors';
import FamilyMembers from './components/FamilyMembers';
import Newborns from './components/Newborns';
import DisabledPersons from './components/DisabledPersons';
import logo from './assets/e-patronage-logo.png';

const theme = createTheme({
    palette: {
        primary: { main: '#1976D2' },
        secondary: { main: '#4CAF50' },
        background: { default: '#f5f5f5' },
    },
    typography: {
        h4: { fontWeight: 700, color: '#1976D2' },
        h5: { fontWeight: 600, color: '#444' },
        h6: {
            fontWeight: 600,
            color: '#ffffff',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            letterSpacing: '1px',
        },
    },
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#1976D2',
                    color: '#ffffff',
                    width: 240,
                    transition: 'transform 0.3s ease-in-out',
                },
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    '&:hover': {
                        backgroundColor: '#1565C0',
                    },
                    '&.Mui-selected': {
                        backgroundColor: '#115293',
                    },
                },
            },
        },
    },
});

function App() {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [districts, setDistricts] = useState([]);
    const [polyclinics, setPolyclinics] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [families, setFamilies] = useState([]);
    const [familyMembers, setFamilyMembers] = useState([]);
    const [patronages, setPatronages] = useState([]);
    const [householdPatronages, setHouseholdPatronages] = useState([]);
    const [newborns, setNewborns] = useState([]);
    const [disabledPersons, setDisabledPersons] = useState([]);
    const [stats, setStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (token) {
                try {
                    axios.defaults.headers.common['Authorization'] = `Token ${token}`;
                    const [
                        districtsRes,
                        polyclinicsRes,
                        doctorsRes,
                        familiesRes,
                        familyMembersRes,
                        patronagesRes,
                        householdPatronagesRes,
                        newbornsRes,
                        disabledPersonsRes,
                        statsRes,
                    ] = await Promise.all([
                        axios.get('http://127.0.0.1:8000/api/districts/'),
                        axios.get('http://127.0.0.1:8000/api/polyclinics/'),
                        axios.get('http://127.0.0.1:8000/api/doctors/'),
                        axios.get('http://127.0.0.1:8000/api/families/'),
                        axios.get('http://127.0.0.1:8000/api/family-members/'),
                        axios.get('http://127.0.0.1:8000/api/patronages/'),
                        axios.get('http://127.0.0.1:8000/api/household-patronages/'),
                        axios.get('http://127.0.0.1:8000/api/newborns/'),
                        axios.get('http://127.0.0.1:8000/api/disabled-persons/'),
                        axios.get('http://127.0.0.1:8000/api/stats/'),
                    ]);
                    setDistricts(districtsRes.data);
                    setPolyclinics(polyclinicsRes.data);
                    setDoctors(doctorsRes.data);
                    setFamilies(familiesRes.data);
                    setFamilyMembers(familyMembersRes.data);
                    setPatronages(patronagesRes.data);
                    setHouseholdPatronages(householdPatronagesRes.data);
                    setNewborns(newbornsRes.data);
                    setDisabledPersons(disabledPersonsRes.data);
                    setStats(statsRes.data);
                    console.log('Families loaded:', familiesRes.data); // Debugging uchun
                } catch (error) {
                    console.error('Error fetching data:', error);
                    if (error.response && error.response.status === 401) {
                        setToken('');
                        localStorage.removeItem('token');
                        delete axios.defaults.headers.common['Authorization'];
                    }
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };
        fetchData();
    }, [token]);

    const handleLogout = () => {
        axios.post('http://127.0.0.1:8000/api/logout/')
            .then(() => {
                setToken('');
                localStorage.removeItem('token');
                delete axios.defaults.headers.common['Authorization'];
                setDistricts([]);
                setPolyclinics([]);
                setDoctors([]);
                setFamilies([]);
                setFamilyMembers([]);
                setPatronages([]);
                setHouseholdPatronages([]);
                setNewborns([]);
                setDisabledPersons([]);
                setStats({});
            })
            .catch(error => console.error('Logout error:', error));
    };

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                <img
                    src={logo}
                    alt="e-patronage logo"
                    style={{ height: '40px', width: '40px', marginRight: '10px' }}
                />
                <Typography variant="h6">
                    Hamshira Manitoring
                </Typography>
            </Box>
            <List>
                {[
                    { text: 'Asosiy Sahifa', icon: <HomeIcon />, path: '/' },
                    { text: 'Tumanlar', icon: <LocationCityIcon />, path: '/districts' },
                    { text: 'Poliklinikalar', icon: <LocalHospitalIcon />, path: '/polyclinics' },
                    { text: 'Shifokorlar', icon: <MedicalServicesIcon />, path: '/doctors' },
                    { text: 'Oilalar', icon: <PeopleIcon />, path: '/families' },
                    { text: "Oila a'zolari", icon: <GroupIcon />, path: '/family-members' },
                    { text: 'Hamshiralar', icon: <EventIcon />, path: '/patronages' },
                    { text: 'Xonadon Hamshirasi', icon: <FamilyRestroomIcon />, path: '/household-patronages' },
                    { text: "Yangi tug'ilgan chaqaloqlar", icon: <ChildCareIcon />, path: '/newborns' },
                    { text: 'Nogironlar', icon: <AccessibilityIcon />, path: '/disabled-persons' },
                    { text: 'Statistika', icon: <BarChartIcon />, path: '/statistics' },
                ].map((item) => (
                    <ListItem
                        button
                        key={item.text}
                        component={NavLink}
                        to={item.path}
                        selected={window.location.pathname === item.path}
                        sx={{ color: '#fff' }}
                    >
                        <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
                <ListItem button onClick={handleLogout} sx={{ color: '#fff' }}>
                    <ListItemIcon sx={{ color: '#fff' }}>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItem>
            </List>
        </div>
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!token) {
        return <Login setToken={setToken} />;
    }

    return (
        <ThemeProvider theme={theme}>
            <Router>
                <CssBaseline />
                <Box sx={{ display: 'flex' }}>
                    {/* Mobil qurilmalar uchun hamburger menyusi */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' }, color: '#1976D2' }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Doimiy sidebar (katta ekranlar uchun) */}
                    <Drawer
                        variant="permanent"
                        sx={{
                            width: 240,
                            flexShrink: 0,
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { width: 240, boxSizing: 'border-box' },
                        }}
                    >
                        {drawer}
                    </Drawer>

                    {/* Mobil qurilmalar uchun yopiladigan sidebar */}
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': {
                                width: 240,
                                boxSizing: 'border-box',
                                transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
                                transition: 'transform 0.3s ease-in-out',
                            },
                        }}
                    >
                        {drawer}
                    </Drawer>

                    {/* Asosiy kontent */}
                    <Box
                        component="main"
                        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` } }}
                    >
                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/districts" element={<Districts districts={districts} setDistricts={setDistricts} />} />
                                <Route path="/polyclinics" element={<Polyclinics districts={districts} polyclinics={polyclinics} setPolyclinics={setPolyclinics} />} />
                                <Route path="/doctors" element={<Doctors doctors={doctors} polyclinics={polyclinics} setDoctors={setDoctors} />} />
                                <Route path="/families" element={<Families districts={districts} polyclinics={polyclinics} families={families} setFamilies={setFamilies} />} />
                                <Route path="/family-members" element={<FamilyMembers families={families} familyMembers={familyMembers} setFamilyMembers={setFamilyMembers} />} />
                                <Route path="/patronages" element={<Patronages doctors={doctors} patronages={patronages} families={families} setPatronages={setPatronages} />} />
                                <Route path="/household-patronages" element={<HouseholdPatronages patronages={patronages} families={families} householdPatronages={householdPatronages} setHouseholdPatronages={setHouseholdPatronages} />} />
                                <Route path="/newborns" element={<Newborns families={families} newborns={newborns} setNewborns={setNewborns} />} />
                                <Route path="/disabled-persons" element={<DisabledPersons families={families} disabledPersons={disabledPersons} setDisabledPersons={setDisabledPersons} />} />
                                <Route path="/statistics" element={<Statistics stats={stats} />} />
                            </Routes>
                        </Container>
                    </Box>
                </Box>
            </Router>
        </ThemeProvider>
    );
}

export default App;