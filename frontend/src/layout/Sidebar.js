import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useTheme, useMediaQuery } from '@mui/material';
import { green } from '@mui/material/colors';
import HomeIcon from '@mui/icons-material/Home';

// Font Awesome Icons
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import  DynamicFormIcon  from '@mui/icons-material/DynamicForm';
import  FamilyRestroomIcon  from '@mui/icons-material/FamilyRestroom';
library.add(faPencilAlt, faEdit);

const Sidebar = ({ onMobileClose, openMobile }) => {
    const theme = useTheme();
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

    React.useEffect(() => {
        if (openMobile && onMobileClose) {
            onMobileClose();
        }
    }, []);
    return (
        
        <React.Fragment>
            <Drawer
                anchor='left'
                onClose={onMobileClose}
                open={!lgUp && openMobile}
                variant='temporary'
                PaperProps={{
                    sx: {
                        backgroundColor: theme.palette.background.default,
                        width: 256
                    }
                }}
            >
                <Box
                    sx={{
                        alignItems: 'flex-start',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        p: 2
                    }}
                >
                    <Link to='/' style={{ textDecoration: 'none' }}>
                        <IconButton size='large' disabled>
                            <Avatar
                                variant='rounded'
                                sx={{
                                    backgroundColor: green[600],
                                    marginRight: '15px',
                                    height: 52,
                                    width: 52
                                }}
                            >
                                <FamilyRestroomIcon 
                                    style={{ 
                                        color: theme.palette.common.white, 
                                        height: 30, 
                                        width: 30 
                                    }} 
                                />
                            </Avatar>
                            <Typography 
                                variant='h4' 
                                component='div' 
                                sx={{ 
                                    flexGrow: 1,
                                    color: theme.palette.common.white,
                                    fontWeight: 'bold', 
                                     
                                }}
                            >
                                Autism Predictor
                            </Typography>
                        </IconButton>
                    </Link>
                    <Box
                        sx={{
                            display: 'flex',
                            pb: 2,
                            pt: 5
                        }}
                    >
                    <Link to='/' style={{ textDecoration: 'none' }}>

                        <Button
                            color='primary'
                            component='a'
                            size='small'
                            variant='text'
                            sx={{
                                color: theme.palette.text.secondary,
                                fontSize: theme.typography.subtitle1,
                                fontWeight: 'medium',
                                mr: 2,
                                '& svg': {
                                    mr: 0.5
                                },
                            }}
                        >
                            <HomeIcon /> Home
                        </Button></Link>
                    </Box>
                    <Link to='/Autism-form' style={{ textDecoration: 'none' }}>

                    <Button
                        component='a'
                        color='primary'
                        size='small'
                        variant='text'
                        sx={{
                            color: theme.palette.text.secondary,
                            fontSize: theme.typography.subtitle1,
                            fontWeight: 'medium',
                            mr: 2,
                            '& svg': {
                                mr: 0.5
                            }
                        }}
                    >
                        <DynamicFormIcon
                            style={{ height: 23, width: 23 }} 
                        /> GET PREDICTION
                    </Button></Link>
                    
                </Box>
            </Drawer>
        </React.Fragment>
    );
};

export default Sidebar;