import { createTheme } from '@mui/material/styles';

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
                        //border: 'solid #f1cc5c 5px',
                        boxShadow: '0px 1px 10px 5px rgba(255, 255, 255, 0.3)',
                        backgroundPosition: 'center', backgroundSize: 'cover',
                        // background: 'radial-gradient(#FFFFFF, #f6e1a1)',
                        '&:hover': { animation: 'ExperienceInteraction1 1s forwards' }
                    }
                }
            ],
            styleOverrides: {
                root: {//'1rem'
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
                    style: { height: '50vh' }
                },
                {
                    props: { variant: 'experiencesGrid' },
                    style: { overflow: 'scroll', height: '50vh'}
                },
                {
                    props: { variant: 'experiencesMap' },
                    style: { overflow: 'scroll', height: '85vh'}
                },
                {
                    props: { variant: 'major' },
                    //style: { display: 'flex', width: '70vw', height: '70vh' }
                }
            ],
            styleOverrides: {
                root: {
                    borderRadius: '1rem', border: 'solid 3px #05594f',
                    paddingRight: 'spacing(5)', ///////////////
                    boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.3)',
                    background: 'radial-gradient(#FFFFFF, #098778)',
                    // height: '100vh'
                }
            }
        }
    }
})

export default Theme