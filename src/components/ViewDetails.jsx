// import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import Loading from "../pages/Loading";
 // Assuming this is the hook to get the user

const ViewDetails = () => {
    const navigate = useNavigate();
  const { id } = useParams(); // Get the tutor id from the URL
  const [tutor, setTutor] = useState(null);
  const [isBooked, setIsBooked] = useState(false); // Track booking status

  const { user } = useAuth();  // Getting the user from the useAuth hook

  useEffect(() => {
    // Fetch tutor details
    axios
      .get(`http://localhost:4000/tutor/${id}`)
      .then((response) => {
        setTutor(response.data);
        
      })
      .catch((error) => {
        console.error("Error fetching tutor details:", error);
      });
  }, [id]);

  // Handle booking
  const handleBooking = () => {
    if (user) {
      // Post the booking details to the backend
      axios
        .post("http://localhost:4000/book-tutor", {
          tutorId: tutor._id,
          image: tutor.image,
          language: tutor.language,
          price: tutor.price,
          tutorEmail: tutor.email,
          email: user.email, // Assuming user object has an email
        })
        .then(() => {
          setIsBooked(true); // Mark as booked
          alert("Booking successful!");
          navigate('/my-booked-tutors')
        })
        .catch((error) => {
          console.error("Error booking tutor:", error);
        });
    } else {
      alert("You must be logged in to book a tutor");
    }
  };
// 
 

  return tutor ? (
    <div className="w-1/2 mx-auto flex flex-col justify-center items-center gap-2 mt-10">
    
      <img className=" rounded-lg p-2" src={tutor.image} alt={tutor.name} />
      <h1>{tutor.name}</h1>
      <p>Language: {tutor.language}</p>
      <p className="w-1/2">Description: {tutor.description}</p>
      <p>Price: {tutor.price}</p>
      <p>Review: {tutor.review}</p>
      {user ? (
        <button className="btn btn-outline w-1/4 bg-slate-400 text-white " onClick={handleBooking}>Book</button>
      ) : (
        <p>Please log in to book a tutor.</p>
      )}
    </div>
  ) : (
    <p><Loading/></p>
  );
};

export default ViewDetails;
