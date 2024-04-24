import React, { useState, useEffect } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { Container, Paper, Grid, Box, Card, CardHeader, CardContent, CardMedia,
    FormControl, FormGroup, FormLabel, TextField, Select, MenuItem,
    Button, ButtonGroup, IconButton, Tooltip, Rating, Divider } from '@mui/material';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ReviewModal from '../components/ReviewModal.js';

const Experience = (props) => {
    const [showEdit, setShowEdit] = useState(false);
    const [inFavs, setInFavs] = useState(false);
    const [showTrips, setShowTrips] = useState(false);

    // TODO: make page usable when user not logged in

    const navigate = useNavigate();

    // Review
    const [visibleReviewModal, setVisibleReviewModal] = useState(false);
    const [modalStyle, setModalStyle] = useState({});

    const id = localStorage.getItem("id")
    const experienceId = props.expId
    const setExperienceToUpdate = props.setExperienceToUpdate
    const setInitialExp = props.setInitialExp

    const [experience, setExperience] = useState({
        title: '',
        images: [''],
        location: { coordinates: ["", ""] },
        description: '',
    })
    const [trips, setTrips] = useState([])
    const [address, setAddress] = useState("")


    const onLoad = async () => {
        const response = await fetch(`http://localhost:5000/experiences/${experienceId}`)
        const data = await response.json()
        setExperience(data)

        if (id) {
            favoriteButton()
        }

        if (id == data.owner) {
            setShowEdit(true);
        }

        let coord1 = data.location.coordinates[1]
        let coord2 = data.location.coordinates[0]

        let url = `https://api.geoapify.com/v1/geocode/reverse?lat=${coord1}&lon=${coord2}&type=amenity&lang=en&limit=1&format=json&apiKey=abce6a14428f49d49ef299b1016bf4b2`
        
        const location_json = await fetch(url);
        const location_data = await location_json.json();
        if (location_data.results.length != 0)
            setAddress(location_data.results[0].formatted)  

    }

    useEffect(() => {
        onLoad();
    }, [])

    const favoriteButton = async () => {
        const data = await fetch(`http://localhost:5000/user-info/${id}`)
        const user = await data.json()
        const favList = user.favorites

        if (favList.indexOf(experience._id) >= 0) {
            setInFavs(true);
        }
        else {
            setInFavs(false);
        }
    }

    if (id) {
        favoriteButton()
    }

    // favorite an experience
    const favoriteExp = async () => {
        if (id) {

            const data = await fetch(`http://localhost:5000/user-info/${id}`)
            const user = await data.json()
            const favList = user.favorites

            if (favList.indexOf(experience._id) < 0) {
                favList.push(experience._id)

                const updateUser = await fetch(`http://localhost:5000/user-info/${id}`, {
                    method: "PUT",
                    body: JSON.stringify({ "favorites": favList }),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                favoriteButton()
            }
        }
        else {
            navigate('/login')
        }
    }

    const unfavoriteExp = async () => {
        const data = await fetch(`http://localhost:5000/user-info/${id}`)
        const user = await data.json()
        const favList = user.favorites

        const index = favList.indexOf(experience._id)
        if (index > -1) {
            favList.splice(index, 1);
        }

        const updateUser = await fetch(`http://localhost:5000/user-info/${id}`, {
            method: "PUT",
            body: JSON.stringify({ "favorites": favList }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        favoriteButton()
    }

    // add exp to trip
    const addToTrip = async () => {
        const data = await fetch(`http://localhost:5000/trips/${id}`)
        const trips = await data.json()
        console.log(trips)

        setTrips(trips)

        if (id) {
            setShowTrips(true);
        }
        else {
            navigate('/login')
        }
    }

    // add review
    const handleOpenReviewModal = (event) => {
        if (event) {
            event.stopPropagation();
            const { clientY } = event;

            const modalY = clientY - 150;

            setModalStyle({
                top: `${modalY}px`,
                position: 'fixed',
                left: '50%',
                transform: 'translateX(-50%)',
            });
        }

        setVisibleReviewModal(true);

    };

    const handleCloseReviewModal = () => {
        setVisibleReviewModal(false);
    };


    const pickTrip = async (trip) => {
        const expList = trip.experiences

        if (expList.indexOf(experience._id) < 0) {
            expList.push(experience._id)

            const updateTrip = await fetch(`http://localhost:5000/update-trip/${trip._id}`, {
                method: "PUT",
                body: JSON.stringify({ "experiences": expList }),
                headers: {
                    "Content-Type": "application/json",
                },
            })
        }

        setShowTrips(false);
    }

    const createTrip = () => {
        setInitialExp(experience)
        navigate("/trips/create-trip");
    }

    // if owner update experience
    const updateExp = () => {
        setExperienceToUpdate(experience._id);
        navigate("/update-exp");
    }

    // if owner delete experience
    const deleteExp = async () => {
        const response = await fetch(`http://localhost:5000/delete-exp/${experience._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(experience)
        });

        navigate('/');
    }

    // HIDDEN COMPONENTS

    const EditButton = () => (
        <Tooltip title="Edit Experience" followCursor>
            <Button onClick={updateExp}>
                <EditNoteIcon/>
            </Button>
        </Tooltip>
    )

    const DeleteButton = () => (
        <Tooltip title="Delete Experience" followCursor>
            <Button onClick={deleteExp}>
                <DeleteForeverIcon />
            </Button>
        </Tooltip>
    )

    const UserTrips = () => (
        <Tooltip>
            {trips.map((trip, index) => (
                <div key={index}>
                    <Button onClick={() => { pickTrip(trip) }}>{trip.title}</Button>
                </div>
            ))}
            <Button onClick={createTrip}>Create New Trip</Button>
        </Tooltip>
    )

    const Favorite = () => (
        <Tooltip title="Add to Favorites" followCursor>
            <Button onClick={favoriteExp}>
                <FavoriteBorderOutlinedIcon/>
            </Button>
        </Tooltip>
    )

    const Unfavorite = () => (
        <Tooltip title="Remove Favorite" followCursor>
            <Button onClick={unfavoriteExp}>
                <FavoriteIcon id="removeFav"/>
            </Button>
        </Tooltip>
    )

    const ReviewButton = () => (
        <Tooltip title="Write a Review" followCursor>
            <IconButton onClick={handleOpenReviewModal}>
                <RateReviewIcon id="removeFav"/>
            </IconButton>
        </Tooltip>
    );

    return (
        <Container>
            <Paper>
                <Grid container spacing={3}>
                    <Grid item xs={4}>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <strong><h2>{experience.title}</h2></strong>
                            </Grid>
                            <Grid item xs={12}>
                                <span><strong>Location</strong><br />
                                    {experience.location.coordinates[0]}, {experience.location.coordinates[1]}<br/>
                                    <br/>{address}</span>
                            </Grid>
                            <Grid item xs={12}>
                                <img src={experience.images[0]} style={{ width: "100%", borderRadius: "50px" }}></img>
                            </Grid>
                            <Grid item xs={12}>
                                <span>{experience.description}</span>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={8}>
                        <Grid container justifyContent="space-evenly">
                            <Grid item xs={2}>
                                <Tooltip title="Add to Trip" followCursor>
                                    <Button>
                                        <AddBoxOutlinedIcon onClick={addToTrip} />
                                    </Button>
                                </Tooltip>
                            </Grid>
                            {showEdit ?
                                <>
                                    <Grid item xs={2}>
                                        <EditButton />
                                    </Grid>
                                    <Grid item xs={2}>
                                        <DeleteButton />
                                    </Grid>
                                </>
                                : null}
                            {showTrips ?
                                <Grid item xs={2}>
                                    <UserTrips />
                                </Grid>
                                : null}
                            <Grid item xs={2}>
                                {inFavs ? <Unfavorite /> : <Favorite />}
                            </Grid>
                        </Grid>
                        {visibleReviewModal && (
                            <Grid item xs={2}>
                                <ReviewModal
                                    expId={experienceId}
                                    onClose={handleCloseReviewModal}
                                    style={modalStyle}
                                />
                            </Grid>
                        )}
                        <Card style={{ height: "50vh", overflowY: "scroll" }}>
                            <h3>reviews?</h3>
                        </Card>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}

export default Experience;