import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Grid,
  Box,
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  FormControl,
  FormGroup,
  FormLabel,
  TextField,
  Select,
  MenuItem,
  Button,
  ButtonGroup,
  IconButton,
  Tooltip,
  Rating,
  Divider,
} from "@mui/material";

const firebase = require("firebase/app");
const {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} = require("firebase/storage");
const { firebaseConfig } = require("../firebase/firebase-config");

export const UpdateExperience = ({ experienceToUpdate }) => {
  const navigate = useNavigate();

  const fb_app = firebase.initializeApp(firebaseConfig);
  const storage = getStorage(fb_app);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [images, setImages] = useState("");
  const [owner, setOwner] = useState("");

  const [experience, setExperience] = useState({
    title: "",
    description: "",
    location: "",
    images: "",
    owner: "",
  });

  useEffect(() => {
    if (!localStorage.getItem("id")) {
      // localStorage.setItem("path", "/account")
      navigate("/login");
    }

    const id = localStorage.getItem("id");

    fetch(`http://localhost:5000/experiences/${experienceToUpdate}`)
      .then((response) => response.json())
      .then((experience) => {
        setExperience(experience);
        setTitle(experience.title);
        setDescription(experience.description);
        setLatitude(experience.location["coordinates"][1]);
        setLongitude(experience.location["coordinates"][0]);
        setImages(experience.images[0]);
        setOwner(experience.owner);

        if (experience.owner != id) {
          navigate("/UserExperiences");
        }
      })

      .catch((error) => console.log(error));
  }, []);

  const addImage = async (newImage) => {
    const imgFile = document.getElementById("image");
    const imgRef = ref(
      storage,
      `/experiences/${experienceToUpdate}/${newImage}`
    );
    await uploadBytesResumable(imgRef, imgFile.files[0], {
      contentType: "image/png",
    });
    const downloadURL = await getDownloadURL(imgRef);
    setImages([downloadURL]);
  };

  const updateExperience = async (event) => {
    event.preventDefault();

    const location = { type: "Point", coordinates: [latitude, longitude] };

    let exp = { title, description, location, images };

    // image stuff

    const response = await fetch(
      `http://localhost:5000/update-exp/${experienceToUpdate}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(exp),
      }
    );
  };

  return (
    <Container>
      <Paper>
        <Grid
          container
          justifyContent="center"
          spacing={2}
          m={2}
          style={{ width: "400px" }}
        >
          <form>
            <Grid item position xs={16}>
              <FormControl>
                <h2>Update Experience</h2>
                <TextField
                  label="title"
                  type="text"
                  id="title"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                  label="description"
                  type="text"
                  id="description"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <h3>Geolocation</h3>
                <TextField
                  label="Latitude"
                  type="number"
                  id="lat"
                  required
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                />
                <TextField
                  label="Longitude"
                  type="number"
                  id="long"
                  required
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                />
                <h3>Update Photos</h3>
                <img src={images} style={{ width: "220px" }} />
                <TextField
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={(e) => addImage([e.target.value])}
                />
                <Divider />
                <br></br>
                <Container>
                  <Button type="submit" onClick={updateExperience}>
                    Update
                  </Button>
                  <Button
                    onClick={() => {
                      navigate(`/UserExperiences`);
                    }}
                  >
                    Cancel
                  </Button>
                </Container>
              </FormControl>
            </Grid>
          </form>
        </Grid>
      </Paper>
    </Container>
  );
};

export default UpdateExperience;
