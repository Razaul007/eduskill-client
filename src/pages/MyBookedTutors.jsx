import React, {  useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";



const MyBookedTutors = () => {
  const { user } = useAuth(); 
  console.log(user)
  const [booked, setBooked] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
   
    fetch(
       `http://localhost:4000/booked-tutors?email=${user.email}`)
       .then(res =>res.json())
       .then(data =>setEquipment(data))

 }, [user]);
  
//   useEffect(() => {
//     // Fetch tutor details
//     axios
//       .get(`http://localhost:4000/booked-tutors/${user?.email}`)
//       .then((response) => {
//         setBooked(response.data);
        
//       })
//       .catch((error) => {
//         console.error("Error fetching tutor details:", error);
//       });
//   }, [user]);

//   useEffect(() => {
//     fetchAllBooked()
//   }, [user])
//   const fetchAllBooked = async ()=>{
//     const {data} = await axios.get(`http://localhost:4000/booked-tutors?email=${user?.email}`)

//     setBooked(data)
//   }
console.log(booked)
//   Handle the review button click
//   const handleReview = (tutorId) => {
//     axios
//       .put(`http://localhost:4000/increment-review/${tutorId}`)
//       .then(() => {
//         alert("Review count increased!");
//         // After incrementing, you may choose to fetch the updated tutor list
//         // to reflect the new review count, or you can directly update the state
//       })
//       .catch((error) => {
//         console.error("Error incrementing review:", error);
//       });
//   };
// //  <Redirect to="/login" />
//   if (!user) {
//     return navigate("/login");
//   }

  return (
    <div >
      <h1>My Booked Tutors</h1>
      {booked.length > 0 ? (
        <p>You have not booked any tutors yet.</p>
      ) : (
        booked.map((tutor) => (
            
          <div key={tutor._id}>
          
            <img src={tutor.image} alt={tutor.name} />
            <h3>{tutor.name}</h3>
            <p>Language: {tutor.language}</p>
            <p>Price: {tutor.price}</p>
            <p>Review Count: {tutor.review}</p>
            <button onClick={() => handleReview(tutor._id)}>Review</button>
          </div>
        ))
      )}
    </div>
  );
};

export default MyBookedTutors;
