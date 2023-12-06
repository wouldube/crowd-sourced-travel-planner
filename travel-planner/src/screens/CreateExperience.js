// import { MdOutlineStarBorder, MdOutlineStarHalf, MdOutlineStar } from "react-icons/md";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateExperience = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [image, setImage] = useState("");
  //   const [rating, setRating] = useState("");
  //   const [review, setReview] = useState("");

  const navigate = useNavigate();

  const createExperience = async () => {
    const coordinates = { latitude, longitude };
    const newExperience = { title, description, coordinates, image };
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
  };

  return (
    <div>
      <h2>Create New Experience</h2>
      <div class="title">
        <label for="title">Title: </label>
        <input
          type="text"
          id="title"
          name="title"
          required="true"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div class="description">
        <label for="description">Description: </label>
        <input
          type="text"
          id="description"
          name="description"
          required="true"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div class="geolocation">
        <span>Geolocation: </span> <br />
        <label for="lat">Latitude: </label>
        <input
          type="number"
          id="lat"
          name="lat"
          required="true"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <label for="long"> Longitude: </label>
        <input
          type="number"
          id="long"
          name="long"
          required="true"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
      </div>

      <div class="image">
        <label for="image">Image: </label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>

      <br />
      {/* <div class="review">
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
      <button onClick={createExperience}>Create</button>
    </div>
  );
};

export default CreateExperience;
