

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyTutorials = () => {
    const {user} = useAuth();
    const [tutorials, setTutorials] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTutorial, setSelectedTutorial] = useState(null);
    const navigate = useNavigate();
    console.log(selectedTutorial)

    console.log(tutorials)

     useEffect(() => {
            
                fetchMyTutorials();
                
           
          
        }, [user]);

        const fetchMyTutorials = async () => {
            try {
                const { data } = await axios.get(`https://eduskills-server.vercel.app/my-tutorials/${user?.email}`);
               console.log(data)
                setTutorials(data);
            } catch (error) {
                console.error("Error fetching booked tutors:", error);
            }
        };
    
    
    // Delete tutorial
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`https://eduskills-server.vercel.app/tutorials/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
           
        );
        console.log(response)

            if (!response.ok) {
                throw new Error("Failed to delete tutorial");
            }

            // Update the UI after deleting
            setTutorials(tutorials.filter((tutorial) => tutorial._id !== id));

        } catch (error) {
            console.error("Error deleting tutorial:", error);
        }
    };

    // Open the modal for updating
    const handleUpdate = (tutorial) => {
        setSelectedTutorial(tutorial);
        setShowModal(true);
    };


    const handleModalUpdate = async (event) => {
        event.preventDefault();
    
        // Check if selected tutorial is valid
        if (!selectedTutorial || !selectedTutorial._id) {
            console.error("No tutorial selected for update.");
            return;
        }
    
        // Prepare form data
        const formData = {
            image: event.target.image.value,
            language: event.target.language.value,
            price: event.target.price.value,
            description: event.target.description.value,
        };
         
          try {
            const { data } = await axios.put(`https://eduskills-server.vercel.app/update/${selectedTutorial._id}`, formData);
            console.log("Response Data:", data);
        
            if (data.modifiedCount>0) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Equipment Updated Successfully!",
                    showConfirmButton: false,
                    timer: 2500,
                });
                navigate('/my-tutorials'); 
            } else {
                Swal.fire({
                    icon: "error",
                    title: "No Changes",
                    text: "No updates were made to the equipment.",
                });
            }
        } catch (error) {
            console.error("Error updating equipment:", error);
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to update the equipment. Please try again.",
            });
        }
        

         
            setShowModal(false);
            setSelectedTutorial(null);
       
    };
    

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-semibold text-center mb-6">My Tutorials</h1>
            <table className="table-auto w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Image</th>
                        <th className="border border-gray-300 px-4 py-2">Language</th>
                        <th className="border border-gray-300 px-4 py-2">Price</th>
                        <th className="border border-gray-300 px-4 py-2">Description</th>
                        <th className="border border-gray-300 px-4 py-2">Review</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tutorials.map((tutorial) => (
                        <tr key={tutorial._id}>
                            <td className="border border-gray-300 px-4 py-2">{tutorial.name}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <img
                                    src={tutorial.image}
                                    alt={tutorial.name}
                                    className="w-16 h-16 object-cover"
                                />
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{tutorial.language}</td>
                            <td className="border border-gray-300 px-4 py-2">${tutorial.price}</td>
                            <td className="border border-gray-300 px-4 py-2">{tutorial.description}</td>
                            <td className="border border-gray-300 px-4 py-2">{tutorial.review}</td>
                            <td className="border border-gray-300 flex flex-col gap-2 ">
                                <button
                                    onClick={() => handleUpdate(tutorial)}
                                    className="bg-blue-500 text-white btn-sm  px-4 py-2 rounded mr-2"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(tutorial._id)}
                                    className="bg-red-500 text-white px-4 py-2 btn-sm rounded mr-2"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Update Modal */}
            {showModal && selectedTutorial && (
                <div className=" bg-gray-800 bg-opacity-75 flex items-center justify-center">
                    <form
                        onSubmit={handleModalUpdate}
                        className="bg-white p-6 rounded shadow-lg max-w-md w-full"
                    >
                        <h2 className="text-xl font-semibold mb-4">Update Tutorial</h2>
                        <div className="mb-4">
                            <label className="block font-medium">Name:</label>
                            <input
                                type="text"
                                value={selectedTutorial.name}
                                disabled
                                className="w-full px-4 py-2 border rounded bg-gray-200"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium">Email:</label>
                            <input
                                type="email"
                                value={selectedTutorial.email}
                                disabled
                                className="w-full px-4 py-2 border rounded bg-gray-200"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium">Image URL:</label>
                            <input
                                type="text"
                                name="image"
                                defaultValue={selectedTutorial.image}
                                className="w-full px-4 py-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium">Language:</label>
                            <input
                                type="text"
                                name="language"
                                defaultValue={selectedTutorial.language}
                                className="w-full px-4 py-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium">Price:</label>
                            <input
                                type="number"
                                name="price"
                                defaultValue={selectedTutorial.price}
                                className="w-full px-4 py-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium">Description:</label>
                            <textarea
                                name="description"
                                defaultValue={selectedTutorial.description}
                                className="w-full px-4 py-2 border rounded"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block font-medium">Review:</label>
                            <input
                                type="text"
                                value={selectedTutorial.review}
                                disabled
                                className="w-full px-4 py-2 border rounded bg-gray-200"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="button"
                                onClick={() => setShowModal(false)}
                                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default MyTutorials;
