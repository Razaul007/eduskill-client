import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";


const FindTutorials = () => {
  const [tutors, setTutors] = useState([]);

 
  useEffect(() => {
    axios.get("http://localhost:4000/tutorials")
      .then((response) => {
        setTutors(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the tutors!", error);
      });
  }, []);

  return (
    <div className=" flex flex-col mt-8 max-w-[1280px] mx-auto bg-base-100 ">
      <h1 className="text-3xl font-bold text-center mt-5 mb-6">Find Your Tutors</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-lg p-4">
        {tutors.map((tutor) => (
          <div key={tutor._id} className="rounded-lg ba-base-200"  >
            <img  className="w-full h-48 object-cover rounded-lg p-2" src={tutor.image} alt={tutor.name} />
            <h3>{tutor.name}</h3>
            <p>Language: {tutor.language}</p>
            <p>Review: {tutor.review}</p>
            <Link to={`/tutor/${tutor._id}`}>
              <button className="btn bg-blue-400 text-white">View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FindTutorials;
