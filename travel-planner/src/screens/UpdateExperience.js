import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// const firebase = require("firebase/app")
// const { getStorage, ref, uploadBytesResumable, getDownloadURL } = require("firebase/storage");
// const { firebaseConfig } = require("../firebase/firebase-config");
//import { MdOutlineStarBorder, MdOutlineStarHalf, MdOutlineStar } from "react-icons/md";

export const UpdateExperience = ({ ExperienceToUpdate }) => {

  const [title, setTitle] = useState(ExperienceToUpdate.title);
  const [description, setDescription] = useState(ExperienceToUpdate.description);
  const [latitude, setLatitude] = useState(ExperienceToUpdate.latitude);
  const [longitude, setLongitude] = useState(ExperienceToUpdate.longitude);
  let [image, setImage] = useState(ExperienceToUpdate.image);

  const navigate = useNavigate();

  const updateExperience = async () => {
    // const response = await fetch(`/my-experiences/${userExperienceToUpdate.experience_id}`, { // need to check link
    //   method: "PUT",
    //   body: JSON.stringify(response),
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // });
    const response = await fetch(`http://localhost:5000/update-exp/65729e8085891cfdbfb12faa`, { // need to check link
      method: "PUT",
      body: JSON.stringify(response),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      alert("Successfully updated experience.");
      console.log(response);
    } else {
      alert(`Failed to update experience, status code = ${response.status}`);
      console.log("error");
    }
    navigate("/");
  }

  return (
    <div className="UpdateExperience">
      <h2>Update Experience:</h2>
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
      <button onClick={updateExperience} className="explore-button">Update</button>
    </div>
  );
};