import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
  const [id, setId] = useState("");
  let [image, setImage] = useState(null);

  const createExperience = async () => {
    try{
    const coordinates = { latitude, longitude };

    const fb_app = firebase.initializeApp(firebaseConfig);
    const storage = getStorage(fb_app)
    
    // TODO change imgRef to include experience id so imgs not overwritten
    const imgFile = document.getElementById('image');
    const imgRef = ref(storage, `/experiences/${id}/${image}`);
    const upload = await uploadBytesResumable(imgRef, imgFile.files[0], { contentType: 'image/png' })
    const downloadURL = await getDownloadURL(imgRef);
    setImage(downloadURL)
    console.log(downloadURL)

    const newExperience = { title, description, coordinates, image:downloadURL, id };
    const response = await fetch("http://localhost:5000/create-exp", {
      method: "POST",
      body: JSON.stringify(newExperience),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      // do something
      console.log(response);
      // navigate("/create-exp");
    } else {
      // handle error
      console.log("error");
    }
    navigate("/");
  } catch (error) {
    console.log(error)
  }};

  return (
    <div className="AddExperience">
      <h2>Create New Experience!</h2>
      <div className="title">
        <label htmlFor="title">Title</label><br/>
        <input
          type="text"
          id="title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="description">
        <label htmlFor="description">Description</label><br/>
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
        <label htmlFor="lat">Latitude</label><br/>
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
        <label htmlFor="image">Image</label><br/>
        <input
          type="file"
          id="image"
          accept="image/*"
          required
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      <br/>
      {/* <div className="review">
            <div>
                <span>Rating: </span>
                <span>
                    <MdOutlineStarBorder id="1"/>
                    <MdOutlineStarBorder id="2"/>
                    <MdOutlineStarBorder id="3"/>
                    <MdOutlineStarBorder id="4"/>
                    <MdOutlineStarBorder id="5"/>
                </span>
            </div>

            <div>
                <label for="review">Review: </label>
                <input type="text" id="review" name="review"></input>
            </div>
            </div> */}

      <br />
      <button onClick={createExperience} className="explore-button">Create</button>
    </div>
  );
};

export default CreateExperience;
