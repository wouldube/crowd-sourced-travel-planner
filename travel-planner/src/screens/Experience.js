import React, { useState, useEffect } from "react";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { Container, Paper, Grid, Box, Card, Divider, Chip, Button, FormControl, FormLabel, InputLabel, TextField, Select, option, ButtonGroup, Tooltip, IconButton } from '@mui/material'
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
        location: {coordinates:["",""]},
        description: '',
    })
    const [trips, setTrips] = useState([])

    useEffect(() => {
        onLoad();
    }, [])

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
    }

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
        console.log('fav')
        console.log(id)
        const data = await fetch(`http://localhost:5000/user-info/${id}`)
        const user = await data.json()
        const favList = user.favorites

        console.log(favList)

        if (favList.indexOf(experience._id) < 0) {
            favList.push(experience._id)

            const updateUser = await fetch(`http://localhost:5000/user-info/${id}`, {
                method: "PUT",
                body: JSON.stringify({"favorites": favList}),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log(updateUser)

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
            body: JSON.stringify({"favorites": favList}),
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
                body: JSON.stringify({"experiences": expList}),
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

        const data = await fetch(`http://localhost:5000/user-info/${id}`)
        const user = await data.json()
        const expList = user.experiences

        const index = expList.indexOf(experience._id)
        if (index > -1) {
            expList.splice(index, 1);
        }

        const updateUser = await fetch(`http://localhost:5000/user-info/${id}`, {
            method: "PUT",
            body: JSON.stringify({"experiences": expList}),
            headers: {
                "Content-Type": "application/json",
            },
        });
        navigate("/");
    }

    // HIDDEN COMPONENTS

    const EditButton = () => (
        <Tooltip title="Edit Experience" followCursor>
            <IconButton onClick={updateExp}>
                <EditNoteIcon variant="contained"  className="button delete-button"/>
            </IconButton>
        </Tooltip>                
    )
    
    const DeleteButton = () => (
        <Tooltip title="Delete Experience" followCursor>
            <IconButton onClick={deleteExp}>
        <DeleteForeverIcon variant="contained"  className="button delete-button"/>
            </IconButton>
        </Tooltip>
    )
    
    const UserTrips = () => (
        <Tooltip>
            {trips.map((trip, index) => (
                <div key={index}>
                    <Button onClick={() => {pickTrip(trip)}} className="button delete-button">{trip.title}</Button>
                </div>
            ))}
            <Button onClick={createTrip} className="button delete-button">Create New Trip</Button>
        </Tooltip>
    )
    
    const Favorite = () => (
        <Tooltip title="Add to Favorites" followCursor>
            <IconButton onClick={favoriteExp}>
                <FavoriteIcon variant="contained"  className="button delete-button"/>
                {/* <FavoriteIcon onClick={favoriteExp} className="button delete-button"/> */}
                {/* <Button variant="contained" onClick={deleteExp}>Delete</Button> */}
            </IconButton>
        </Tooltip>
    )
    
    const Unfavorite = () => (
        <Tooltip title="Remove Favorite" followCursor>
            <IconButton onClick={unfavoriteExp}>
                <FavoriteBorderOutlinedIcon variant="contained"  id="removeFav" className="button delete-button"/>
                {/* <FavoriteBorderOutlinedIcon variant="contained" style={{display: "none"}} onClick={unfavoriteExp} id="removeFav"/> */}
                {/* <Button variant="contained" onClick={deleteExp}>Delete</Button> */}
            </IconButton>
        </Tooltip>
    )

    const ReviewButton = () => (
        <Tooltip title="Write a Review" followCursor>
            <IconButton onClick={handleOpenReviewModal}>
                <RateReviewIcon variant="contained"  id="removeFav" className="button delete-button" />
            </IconButton>
        </Tooltip>
    );    

    return (
        <Container>
            <Paper>
            <Grid container spacing={1}>
                {/* <h2></h2> */}
                <Grid item xs={16}>
                    <strong><h2>{experience.title}</h2></strong>
                </Grid>
                <Grid item xs={16}>
                    <img src={experience.images[0]} style={{ width: "350px" }}></img>
                </Grid>
                <Grid item xs={12}>
                    <span>{experience.description}</span>
                </Grid>
                <Grid item xs={12}>
                    <span><strong>Location: </strong>{experience.location.coordinates[0]}, {experience.location.coordinates[1]}</span>
                </Grid>
                <Grid item xs={12}>
                    <Tooltip title="Add to Trip" followCursor>
                        <IconButton>
                            <AddBoxOutlinedIcon onClick={addToTrip} className="button delete-button"/>
                        </IconButton>
                    </Tooltip>
                    { showEdit ? <EditButton /> : null }
                    { showEdit ? <DeleteButton /> : null }
                    { showEdit ? <ReviewButton /> : null }
                </Grid>
                <Grid item xs={12}>
                    { showTrips ? <UserTrips /> : null }
                    {/* <Button variant="contained" onClick={favoriteExp} id="addFav">Add to Favorites</Button> */}
                    {/* <FavoriteBorderOutlinedIcon variant="contained" style={{display: "none"}} onClick={unfavoriteExp} id="removeFav">Remove Favorite</Button> */}
                </Grid>
                <Grid item xs={12}>
                    { inFavs ? <Unfavorite /> : <Favorite />}
                </Grid>
            </Grid>
            <div>
                {visibleReviewModal && (
                    <ReviewModal 
                    expId={experienceId}
                    onClose={handleCloseReviewModal}
                    style={modalStyle}
                />)}
            </div>
            </Paper>
        </Container>
    )
}

export default Experience;