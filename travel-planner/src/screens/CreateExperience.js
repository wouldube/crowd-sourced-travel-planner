//import { MdOutlineStarBorder, MdOutlineStarHalf, MdOutlineStar } from "react-icons/md";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../components/experience.css';

export const CreateExperience = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [image, setImage] = useState(null);
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
    <div class="AddExperience">
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
        />
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
