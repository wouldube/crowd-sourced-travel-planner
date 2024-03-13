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
        fontFamily: 'comfortaa',
        variants: [
            {
                props: { variant: 'p' },
                style: {
                    fontFamily: 'comfortaa'
                }
            },
            {
                props: { variant: 'h1' },
                style: {
                    fontFamily: 'comfortaa'
                }
            },
            {
                props: { variant: 'h2' },
                style: {
                    fontFamily: 'comfortaa'
                }
            },
            {
                props: { variant: 'h3' },
                style: {
                    fontFamily: 'comfortaa'
                }
            },
            {
                props: { variant: 'CardContent' },
                style: {
                    fontFamily: 'comfortaa'
                }
            },
            {
                props: { variant: 'h5' },
                style: {
                    fontFamily: 'comfortaa'
                }
            },
            {
                props: { variant: 'h6' },
                style: {
                    fontFamily: 'comfortaa'
                }
            },
        ],
    },
    // typography: {
    //     fontFamily: 'comfortaa',
    //     styleOverrides: {
    //         root: {
    //             fontFamily: 'comfortaa'
    //         }
    //     }
    // },
    spacing: 10,
    components: {
        MuiButton: {
            defaultProps: {
                variant: 'contained',
            },
            styleOverrides: {
                root: {
                    aspectRatio: "1 / 1",
                    borderRadius: "100px", maxHeight: "100px", maxWeight: "100px",
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
                        opacity: '1', borderRadius: '100%',
                        aspectRatio: "1 / 1", width: "fit-content",
                        boxShadow: '0px 1px 10px 5px rgba(255, 255, 255, 0.3)',
                        backgroundPosition: 'center', backgroundSize: 'cover',
                        '&:hover': { animation: 'ExperienceInteraction1 1s forwards' }
                    }
                }
            ],
            styleOverrides: {
                root: {
                    fontFamily: 'comfortaa',
                    borderRadius: '1rem', border: 'solid 3px #8DD6EC',
                    boxShadow: '0px 0px 10px 3px rgba(0, 0, 0, 0.2)',
                    background: '#75CFEB',//radial-gradient(#FFFFFF 30%, #75CFEB)',

                    // background: 'radial-gradient(#FFFFFF, #75CFEB)',
                    transition: '0.3s ease',
                    '&:hover': {
                        background: '#75CFEB',//radial-gradient(#FFFFFF 30%, #75CFEB)',
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