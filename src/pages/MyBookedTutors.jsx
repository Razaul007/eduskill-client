
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";

const MyBookedTutors = () => {
    const { user } = useAuth();
    const [booked, setBooked] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        } else {
            fetchAllBooked();
        }
    }, [user, navigate]);

    const fetchAllBooked = async () => {
        try {
            const { data } = await axios.get(`https://eduskills-server.vercel.app/booked-tutors/${user?.email}`, {withCredentials:true});
            setBooked(data);
        } catch (error) {
            console.error("Error fetching booked tutors:", error);
        }
    };

    const handleReview = async (tutorId) => {
        try {
            await axios.put(`https://eduskills-server.vercel.app/increment-review/${tutorId}`);
            alert("Review count increased!");
            fetchAllBooked(); // Refresh the booked tutors list
        } catch (error) {
            console.error("Error incrementing review count:", error);
            alert("Failed to increase review count. Please try again.");
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-8">
            <h2 className="text-2xl font-bold text-center mb-6">My Booked Tutorials</h2>
            {booked.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {booked.map((item) => (
                        <div key={item._id} className="card border shadow-md p-4 rounded">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="rounded w-full h-48 object-cover"
                            />
                            <h3 className="text-lg font-bold mt-2">{item.name}</h3>
                            <p className="text-gray-600">Language: {item.language}</p>
                            <p className="text-green-500 font-bold my-2">${item.price}</p>
                            <p className="text-blue-500">Reviews: {item.review || 0}</p>
                            <button
                                className="btn btn-primary mt-4"
                                onClick={() => handleReview(item.tutorId)}
                            >
                                Review
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center">You have not booked any tutors yet.</p>
            )}
        </div>
    );
};

export default MyBookedTutors;

