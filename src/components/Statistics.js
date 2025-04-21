import React from 'react';
import { Box, Typography, Grid, Card, CardContent, Divider } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import PeopleIcon from '@mui/icons-material/People';
import EventIcon from '@mui/icons-material/Event';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import backgroundImage from '../assets/background-image.jpg'; // Fon rasmini import qilamiz

const Statistics = ({ stats = {} }) => {
    // Grafik uchun ma'lumotlarni tayyorlash
    const chartData = [
        { name: 'Families', value: stats.total_families || 0, fill: '#4CAF50' },
        { name: 'Patronages', value: stats.total_patronages || 0, fill: '#1976D2' },
        { name: 'Newborns', value: stats.total_newborns || 0, fill: '#FF9800' },
        { name: 'Disabled Persons', value: stats.total_disabled_persons || 0, fill: '#F44336' },
    ];

    return (
        <Box
            sx={{
                minHeight: 'calc(100vh - 64px)', // Sidebar balandligini hisobga olamiz
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 3,
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Qora overlay
                    zIndex: 1,
                },
            }}
        >
            <Box sx={{ position: 'relative', zIndex: 2, width: '100%' }}>
                <Typography
                    variant="h4"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        color: '#fff',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                        textAlign: 'center',
                    }}
                >
                    System Statistics
                </Typography>

                {/* Statistik kartochkalar */}
                <Grid container spacing={3} sx={{ mb: 4, justifyContent: 'center' }}>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': { transform: 'scale(1.05)' },
                            }}
                        >
                            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <PeopleIcon sx={{ fontSize: 40, color: '#4CAF50' }} />
                                <Box>
                                    <Typography variant="h6" color="textPrimary">
                                        Total Families
                                    </Typography>
                                    <Typography variant="h5" color="textSecondary">
                                        {stats.total_families || 0}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': { transform: 'scale(1.05)' },
                            }}
                        >
                            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <EventIcon sx={{ fontSize: 40, color: '#1976D2' }} />
                                <Box>
                                    <Typography variant="h6" color="textPrimary">
                                        Total Patronages
                                    </Typography>
                                    <Typography variant="h5" color="textSecondary">
                                        {stats.total_patronages || 0}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': { transform: 'scale(1.05)' },
                            }}
                        >
                            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <ChildCareIcon sx={{ fontSize: 40, color: '#FF9800' }} />
                                <Box>
                                    <Typography variant="h6" color="textPrimary">
                                        Total Newborns
                                    </Typography>
                                    <Typography variant="h5" color="textSecondary">
                                        {stats.total_newborns || 0}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <Card
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                transition: 'transform 0.2s ease-in-out',
                                '&:hover': { transform: 'scale(1.05)' },
                            }}
                        >
                            <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <AccessibilityIcon sx={{ fontSize: 40, color: '#F44336' }} />
                                <Box>
                                    <Typography variant="h6" color="textPrimary">
                                        Total Disabled Persons
                                    </Typography>
                                    <Typography variant="h5" color="textSecondary">
                                        {stats.total_disabled_persons || 0}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                {/* Grafik */}
                <Divider sx={{ backgroundColor: '#fff', my: 4 }} />
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                        color: '#fff',
                        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
                        textAlign: 'center',
                    }}
                >
                    Statistics Overview
                </Typography>
                <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: 2, p: 3 }}>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="value" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </Box>
        </Box>
    );
};

export default Statistics;