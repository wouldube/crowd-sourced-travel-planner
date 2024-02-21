import { createTheme } from '@mui/material/styles';

let Theme = createTheme({
    palette: {
        primary: { main: '#f6e1a1' },
        secondary: { main: '#93d7ed' },
        action: {
            active: '#f4e5bb',
            hover: '#f4e5bb',
            selected: '#f4e5bb'
        },
        divider: '#f4e5bb',
        background: { main: '#93d7ed' }
    },
    components: {
        MuiButton: {
            variants: [
                {
                    props: { variant: 'extra' },
                    style: {
                        backgroundColor: '#f6e1a1',
                        extend: 'contained',
                        '&:hover': {
                            animation: ''
                        }
                    }
                }
            ],
            styleOverrides: {
                root: {
                    borderRadius: '3rem',
                    boxShadow: '0px 0px 10px 5px rgba(255, 255, 255, 0.3)',
                }
            }
        },
        MuiCard: {
            variants: [
                {
                    props: { variant: 'experience' },
                    style: {
                        opacity: '1', borderRadius: '50%',
                        height: '200px', width: '200px',
                        border: 'solid #f1cc5c 5px',
                        boxShadow: '0px 1px 10px 5px rgba(255, 255, 255, 0.3)',
                        backgroundColor: '#f6e1a1',
                        '&:hover': { animation: 'ExperienceInteraction1 1s forwards' }
                    }
                }
            ],
            styleOverrides: {
                root: {
                    overflow: 'scroll', borderRadius: '1.5rem',
                    boxShadow: '0px 0px 10px 3px rgba(255, 255, 255, 0.2)',
                    backgroundColor: '#f6e1a1',
                    width: '100%', height: '100%'
                }
            }
        },
        MuiPaper: {
            variants: [
                {
                    props: { variant: 'experiencesMap' },
                    style: { width: '70vw', height: '70vh' }
                },
                {
                    props: { variant: 'experiencesGrid' },
                    style: { width: '70vw', height: '70vh' }
                },
            ],
            styleOverrides: {
                root: {
                    overflow: 'scroll', borderRadius: '1rem',
                    boxShadow: '0px 0px 10px 5px rgba(255, 255, 255, 0.3)',
                    backgroundColor: '#098778',
                    style: { width: '70vw', height: '70vh' }
                }
            }
        }
    }
})

export default Theme