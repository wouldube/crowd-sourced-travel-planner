import { createTheme } from '@mui/material/styles';
import '@fontsource/urbanist';

let Theme = createTheme({
    palette: {
        primary: { main: '#f6e1a1' },
        secondary: { main: '#bbcaf4' },
        action: {
            active: '#bbcaf4',
            hover: '#bbcaf4',
            selected: '#bbcaf4'
        },
        divider: '#bbcaf4',
        background: { main: '#93d7ed' }
    },
    MuiTypography: {
        variants: [
            {
                props: { variant: 'h1' },
                style: {
                    fontFamily: 'urbanist',
                    fontSize: '1rem'
                }
            }
        ],
        styleOverrides: {
            root: {
                fontFamily: 'urbanist',
                fontSize: '1rem'
            },
        }
    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: 'contained',
            },
            styleOverrides: {
                root: {
                    borderRadius: "100%",
                    boxShadow: '0px 0px 10px 5px rgba(255, 255, 255, 0.3)',
                    height: "50px", width: "50px",
                    '&:hover': {
                        backgroundColor: '#f7ebc6'
                    }
                }
            }
        },
        MuiCard: {
            variants: [
                {
                    props: { variant: 'experience' },
                    style: {
                        opacity: '1', borderRadius: '50%',
                        height: '150px', width: '150px',
                        boxShadow: '0px 1px 10px 5px rgba(255, 255, 255, 0.3)',
                        backgroundPosition: 'center', backgroundSize: 'cover',
                        '&:hover': { animation: 'ExperienceInteraction1 1s forwards' }
                    }
                }
            ],
            styleOverrides: {
                root: {
                    borderRadius: '1rem', border: 'solid 3px #f6e1a1',
                    boxShadow: '0px 0px 10px 3px rgba(0, 0, 0, 0.2)',
                    background: 'radial-gradient(#FFFFFF, #f6e1a1)',
                    transition: '0.3s ease',
                    '&:hover': {
                        background: 'radial-gradient(#FFFFFF 50%, #f6e1a1)',
                        backgroundPosition: 'center', backgroundSize: 'cover',
                    },
                    backgroundPosition: 'center', backgroundSize: 'cover',
                    width: '100%', height: '100%'
                }
            }
        },
        MuiFormControl: {
            styleOverrides: { root: { padding: '1%' } }
        },
        MuiPaper: {
            variants: [
                {
                    props: { variant: 'welcoming' },
                    style: { height: '100vh' }
                },
                {
                    props: { variant: 'experiencesGrid' },
                    style: { overflowX: 'scroll', height: '100vh' }
                },
                {
                    props: { variant: 'experiencesMap' },
                    style: { overflow: 'scroll', height: '55vh' }
                },
                {
                    props: { variant: 'major' },
                    style: { width: '80vw', height: '80vh' }
                }
            ],
            styleOverrides: {
                root: {
                    borderRadius: '1rem', border: 'solid 3px #05594f',
                    boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.3)',
                    background: 'radial-gradient(#FFFFFF, #098778)'
                }
            }
        }
    }
})

export default Theme