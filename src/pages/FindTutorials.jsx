
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const FindTutorials = () => {
  const [tutors, setTutors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

 
  const fetchTutors = async (query = "") => {
    try {
      const response = await axios.get("https://eduskills-server.vercel.app/tutorials", {
        params: { language: query }, 
      });
      setTutors(response.data);
    } catch (error) {
      console.error("There was an error fetching the tutors!", error);
    }
  };

  
  useEffect(() => {
    fetchTutors();
  }, []);

  // Handle search button 
  const handleSearch = () => {
    fetchTutors(searchQuery); 
  };

  return (
    <div className="flex flex-col mt-8 max-w-[1280px] mx-auto bg-base-100">
      <h1 className="text-3xl font-bold text-center mt-5 mb-6">Find Your Tutors</h1>
      <div className="mb-6 text-center flex justify-center items-center space-x-2">
        <input
          type="text"
          placeholder="Search by language..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-lg w-1/2"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-lg p-4">
        {tutors.length > 0 ? (
          tutors.map((tutor) => (
            <div key={tutor._id} className="rounded-lg bg-base-200 shadow-md">
              <img
                className="w-full h-48 object-cover rounded-lg p-2"
                src={tutor.image}
                alt={tutor.name}
              />
              <h3 className="text-xl font-semibold px-2">{tutor.name}</h3>
              <p className="px-2">Language: {tutor.language}</p>
              <p className="px-2">Review: {tutor.review}</p>
              <Link to={`/tutor/${tutor._id}`}>
                <button className="btn bg-blue-400 text-white m-2">View Details</button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No tutors found!</p>
        )}
      </div>
    </div>
  );
};

export default FindTutorials;
