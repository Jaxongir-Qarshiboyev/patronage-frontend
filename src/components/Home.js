import React from 'react';
import { Typography, Box } from '@mui/material';
import backgroundImage from '../assets/background-image.jpg'; // Fon rasmini import qilamiz

const Home = () => {
    return (
        <Box
            sx={{
                minHeight: 'calc(100vh - 64px)', // AppBar balandligini hisobga olamiz
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                color: '#fff',
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
            <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Typography
                    variant="h3"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                    }}
                >
                    Manitoring tizimga xush kelibsiz!
                </Typography>
                <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                        fontStyle: 'italic',
                        textShadow: '1px 1px 3px rgba(0, 0, 0, 0.5)',
                    }}
                >
                    Oilalar, Hamshira xizmatlari va statistikani samarali boshqarish imkoniyati
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        mt: 4,
                        maxWidth: '600px',
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        padding: '20px',
                        borderRadius: '10px',
                        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    Bu hamshiralar uchun mo‘ljallangan monitoring tizimi bo‘lib, oilalar, patronaj xizmatlari va statistik ma’lumotlarni samarali boshqarish imkonini beradi. Tizim yordamida sog‘liqni saqlash xodimlari tomonidan olib borilayotgan ishlar real vaqt rejimida nazorat qilinadi va tahlil qilinadi.
                </Typography>
            </Box>
        </Box>
    );
};

export default Home;