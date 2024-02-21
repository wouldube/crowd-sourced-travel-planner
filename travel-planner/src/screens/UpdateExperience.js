import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const firebase = require("firebase/app")
const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require("firebase/storage");
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
    title: '',
    description: '',
    location: '',
    images: '',
    owner: '',
  });


  useEffect(() => {

    if (!localStorage.getItem("id")) {
        // localStorage.setItem("path", "/account")
        navigate("/login")
    }

    const id = localStorage.getItem("id")

    fetch(`http://localhost:5000/experiences/${experienceToUpdate}`)
    .then(response => response.json())
    .then(experience => {
        setExperience(experience);
        setTitle(experience.title);
        setDescription(experience.description);
        setLatitude(experience.location['coordinates'][0]);
        setLongitude(experience.location['coordinates'][1]);
        setImages(experience.images[0]);
        setOwner(experience.owner);

        if (experience.owner != id) {
          navigate("/UserExperiences")
        }

    })
    
    .catch(error => console.log(error));

  }, [])

  const addImage = async (newImage) => {
    const imgFile = document.getElementById('image');
    const imgRef = ref(storage, `/experiences/${experienceToUpdate}/${newImage}`);
    await uploadBytesResumable(imgRef, imgFile.files[0], { contentType: 'image/png' });
    const downloadURL = await getDownloadURL(imgRef);
    setImages([downloadURL]);
  }

  const updateExperience = async (event) => {
    event.preventDefault();

    const location = {"type":"Point","coordinates":[latitude, longitude]};

    let exp = {title, description, location, images}

    // image stuff


    const response = await fetch(`http://localhost:5000/update-exp/${experienceToUpdate}`, {
      method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(exp)
    });
  }

  return (
    <div className="AddExperience">
      <h2>Update Experience:</h2>
      <form>
      <div className="title">
        <label htmlFor="title">Title: </label><br/>
        <input
          type="text"
          id="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="description">
        <label htmlFor="description">Description: </label><br/>
        <input
          type="text"
          id="description"
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="geolocation">
        <span>Geolocation</span> <br />
        <label htmlFor="lat">Latitude: </label><br/>
        <input
          type="number"
          id="lat"
          required
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        /><br/>
        <label htmlFor="long">Longitude</label><br/>
        <input
          type="number"
          id="long"
          required
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
      </div>

      <div className="image">
        <div>
        <img src={images} style={{width:"220px"}}/>
        </div>
        <label htmlFor="image">Change Image: </label><br/>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => addImage([e.target.value])}
        />
      </div>
      <div>
        <input type="submit" onClick={updateExperience} value="Update"></input>
      </div>
      </form>
      <div>
        <button onClick={() => {navigate(`/UserExperiences`)}}>Cancel</button>
      </div>
    </div>
  );
};

export default UpdateExperience;