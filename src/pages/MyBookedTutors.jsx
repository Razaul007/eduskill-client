import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";




const MyBookedTutors = () => {
    const { user } = useAuth();
    console.log(user)
    const [booked, setBooked] = useState([]);
    const navigate = useNavigate();




    useEffect(() => {
        fetchAllBooked()
    }, [user])
    const fetchAllBooked = async () => {
        const { data } = await axios.get(`http://localhost:4000/booked-tutors/${user?.email}`)

        setBooked(data)
    }
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
                            <h3 className="text-lg font-bold mt-2">{item.language}</h3>
                            <p className="text-gray-600">{item.tutorEmail}</p>
                            <p className="text-green-500 font-bold my-2">${item.price}</p>
                            <div className="flex justify-between">
                                {/* <button
                                    className="btn btn-primary"
                                    onClick={() => navigate(`/update/${item._id}`)}
                                >
                                    Update
                                </button> */}
                                {/* <button
                                    className="btn btn-error"
                                    onClick={() => handleDelete(item._id)}
                                >
                                    Delete
                                </button> */}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No equipment found.</p>
            )}

            {/* Delete Confirmation Modal */}
            {/* {selectedItem && (
                <div className="modal">
                    <div className="modal-box">
                        <h3 className="text-lg font-bold">Confirm Delete</h3>
                        <p>Are you sure you want to delete this equipment?</p>
                        <div className="modal-action">
                            <button
                                className="btn btn-error"
                                onClick={() => {
                                    handleDelete(selectedItem);
                                    setSelectedItem(null);
                                }}
                            >
                                Confirm
                            </button>
                            <button
                                className="btn btn-secondary"
                                onClick={() => setSelectedItem(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )} */}
        </div>
    );
    //     <div >
    //       <h1>My Booked Tutors</h1>
    //       <p>{booked.length}</p>
    //       {booked?.length > 0 ?  (
    //           <div>
    //             booked.map((tutor) => (
    //             <div key={tutor._id}>
    //               <img src={tutor.image} alt={tutor.name} />
    //               <h3>{tutor.name}</h3>
    //               <p>Language: {tutor.language}</p>
    //               <p>Price: {tutor.price}</p>
    //               <p>Review Count: {tutor.review}</p>
    //               <button onClick={() => handleReview(tutor._id)}>Review</button>
    //              </div>

    //         ))
    //         </div>
    //       ):(
    //         <p>You have not booked any tutors yet.</p>
    //       ) 
    //     }
    //     </div>
    //   );
};

export default MyBookedTutors;
