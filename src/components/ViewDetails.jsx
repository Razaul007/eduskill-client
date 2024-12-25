
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import Loading from "../pages/Loading";
 

const ViewDetails = () => {
    const navigate = useNavigate();
  const { id } = useParams(); 
  const [tutor, setTutor] = useState(null);
  const [isBooked, setIsBooked] = useState(false); 

  const { user } = useAuth(); 

  useEffect(() => {
   
    axios.get(`https://eduskills-server.vercel.app/tutor/${id}`)
      .then((response) => {
        setTutor(response.data);
        
      })
      .catch((error) => {
        console.error("Error fetching tutor details:", error);
      });
  }, [id]);


  const handleBooking = () => {
    if (user) {
      axios.post("https://eduskills-server.vercel.app/book-tutor", {
          tutorId: tutor._id,
          image: tutor.image,
          language: tutor.language,
          price: tutor.price,
          tutorEmail: tutor.email,
          email: user.email, 
        })
        .then(() => {
          setIsBooked(true); 
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
