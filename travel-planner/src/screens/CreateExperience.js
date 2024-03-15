import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Paper, Grid, Box, Card, CardHeader, CardContent, CardMedia,
  FormControl, FormGroup, FormLabel, TextField, Select, MenuItem,
  Button, ButtonGroup, IconButton, Tooltip, Rating, Divider } from '@mui/material';
const firebase = require("firebase/app")
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require("firebase/storage");
const { firebaseConfig } = require("../firebase/firebase-config");

export const CreateExperience = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("id")) {
      // localStorage.setItem("path", "/create-exp")
      navigate("/login")
    }

    setId(localStorage.getItem("id"))
  })

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [initialReview, setInitialReview] = useState({
    rating: 5,
    description: ""
  });

  const [review, setReview] = useState("");
  const [id, setId] = useState("");
  let [image, setImage] = useState(null);

  const createExperience = async () => {
    try {
      const coordinates = { latitude, longitude };

    const fb_app = firebase.initializeApp(firebaseConfig);
    const storage = getStorage(fb_app)
    
    // TODO change imgRef to include experience id so imgs not overwritten
    const imgFile = document.getElementById('image');
    const imgRef = ref(storage, `/experiences/${id}/${image}`);
    const upload = await uploadBytesResumable(imgRef, imgFile.files[0], { contentType: 'image/png' })
    const downloadURL = await getDownloadURL(imgRef);
    setImage(downloadURL)

    const newExperience = { title, description, coordinates, image:downloadURL, id, initialReview };
    const response = await fetch("http://localhost:5000/create-exp", {
      method: "POST",
      body: JSON.stringify(newExperience),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      console.log(await response.json());
    } else {
      // handle error
      console.log("Error creating experience");
    }
    navigate("/");
  } catch (error) {
    console.log(error)
  }};

  return (
    <Container style={{display: "flex", alignItems: "center", flexDirection:"column"}}>
      <Paper>
        <Grid container justifyContent="center" spacing={2}  m={2} style={{width: "400px"}}>
          <form>
              <Grid item position xs={16}>
                <FormControl>
                  <Container>
                  <h3>Create New Experience!</h3>
                  <TextField
                      id="title" label="title" required value={title}
                      onChange={(e) => setTitle(e.target.value)}
                  />
                  <TextField
                    id="description" label="description" required value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <h3>Geolocation</h3>
                  <TextField
                      type="number" id="lat" label="lat" required value={latitude}
                      onChange={(e) => setLatitude(e.target.value) }
                  />
                  <TextField
                      type="number" id="long" label="lat" required value={longitude}
                      onChange={(e) => setLongitude(e.target.value) }
                  />
                  <h3>Upload Photos</h3>
                  <Grid item xs={12}>
                    <TextField
                        type="file" id="image" accept="image/*" label="image" required
                        InputLabelProps={{
                          style: { padding: '0px 0' },
                        }}
                        inputProps={{
                          style: { padding: '30px 0' },
                        }}
                        onChange={(e) => setImage(e.target.value) }
                    />
                  </Grid>
                  <h3>Leave the first review!</h3>
                  <Grid item xs={12}>
                    <Rating 
                      id="rating" 
                      label="Rating" 
                      value={initialReview.rating} 
                      precision={0.1}
                      onChange={(event, newValue) => setInitialReview({ ...initialReview, rating: newValue })}
                    />
                    <TextField 
                      label="Review"
                      className="review-textarea"
                      value={initialReview.description}
                      onChange={(e) => setInitialReview({...initialReview, description: e.target.value})}
                      required
                    />
                  </Grid>
                  <Divider/>
                  <Container>
                    <Button onClick={createExperience}>Create</Button>
                    <Button onClick={() => {navigate(`/UserExperiences`)}}>Cancel</Button>
                  </Container>
                  </Container>
                </FormControl>
              </Grid>
          </form>
        </Grid>
      </Paper>
    </Container>
  );
};

export default CreateExperience;
