import { createTheme } from '@mui/material/styles';
import Comfortaa from '@fontsource/comfortaa'

let Theme = createTheme({
    palette: {
        primary: {
            main: '#75CFEB',
            light: '#8DD6EC'
        },
        secondary: {
            main: '#098778',
            dark: '#05594f'
        },
        action: {
            active: '#c1e8f5',
            hover: '#c1e8f5',
            selected: '#c1e8f5'
        },
        divider: '#c1e8f5',
        background: { main: '#5abbdc' }
    },
    typography: {
        fontFamily: 'comfortaa', fontWeightMedium: 'bolder'
    },
    spacing: 5,
    components: {
        MuiButton: {
            defaultProps: {
                variant: 'contained',
            },
            styleOverrides: {
                root: {
                    borderRadius: "100px", maxHeight: "100px", maxWdigh: "100px",
                    aspectRatio: "1 / 1",
                    boxShadow: '0px 0px 10px 5px rgba(255, 255, 255, 0.3)',
                    background: 'radial-gradient(#D7F0F8, #75CFEB)',
                    '&:hover': {
                        boxShadow: '0px 0px 25px 5px rgba(255, 255, 255, 0.7)',
                    }
                }
            }
        },
        MuiCard: {
            variants: [
                {
                    props: { variant: 'experience' },
                    style: {
                        opacity: '1', borderRadius: '100%', position: 'relative',
                        aspectRatio: "1 / 1", width: "fit-content",
                        boxShadow: '0px 1px 10px 5px rgba(255, 255, 255, 0.3)',
                        backgroundPosition: 'center', backgroundSize: 'cover',
                        transition: "transform boxShadow zIndex 1.5s ease",
                        '&:hover': {
                            transform: "scale(1.3)", zIndex: "5",
                            boxShadow: "0px 1px 20px 10px rgba(255, 255, 255, 0.9)",
                        },
                    }
                }
            ],
            styleOverrides: {
                root: {
                    borderRadius: '1rem', border: 'solid 3px #8DD6EC',
                    boxShadow: '0px 0px 10px 3px rgba(0, 0, 0, 0.2)',
                    background: '#75CFEB', transition: '0.3s ease',
                    '&:hover': {
                        background: '#75CFEB',
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
                    fontFamily: 'comfortaa',
                    borderRadius: '1rem', border: 'solid 3px #05594f',
                    boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.3)',
                    background: 'radial-gradient(#c1e8f5, #098778)'
                }
            }
        }
    }
})

export default Theme