

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";

const MyTutorials = () => {
    const {user} = useAuth();
    const [tutorials, setTutorials] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTutorial, setSelectedTutorial] = useState(null);
    const navigate = useNavigate();
    console.log(selectedTutorial)

    // Fetch tutorials added by the user
    // useEffect(() => {
    //     const fetchTutorials = async () => {
    //         try {
    //             const response = await fetch(`http://localhost:4000/my-tutorials/${user?.email}`, {
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming you're using JWT for authentication
    //                 },
    //             });

    //             if (!response.ok) {
    //                 throw new Error("Failed to fetch tutorials");
    //             }

    //             const data = await response.json();
    //             setTutorials(data);
    //         } catch (error) {
    //             console.error("Error fetching tutorials:", error);
    //         }
    //     };

    //     fetchTutorials();
    // }, []);

     useEffect(() => {
            
                fetchMyTutorials();
                
           
          
        }, [user]);

        const fetchMyTutorials = async () => {
            try {
                const { data } = await axios.get(`http://localhost:4000/my-tutorials/${user?.email}`);
               console.log(data)
                setTutorials(data);
            } catch (error) {
                console.error("Error fetching booked tutors:", error);
            }
        };
    
    
    // Delete tutorial
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/tutorials/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
           
        );

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
    
        
    
            // Send update request to the server
            const response = await fetch(
                `http://localhost:4000/tutorials/${selectedTutorial._id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        
                    },
                    body: JSON.stringify(formData),
                }
            
            );

            console.log(response);
    
            if (!response.ok) {
                throw new Error("Failed to update tutorial");
            }
    
            const updatedTutorial = await response.json();
    
            // Update the tutorials state
            setTutorials((prevTutorials) =>
                prevTutorials.map((t) =>
                    t._id === updatedTutorial._id ? updatedTutorial : t
                )
            );
    
            // Close the modal and clear the selection
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
                            <td className="border border-gray-300 px-4 py-2">
                                <button
                                    onClick={() => handleUpdate(tutorial)}
                                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                                >
                                    Update
                                </button>
                                <button
                                    onClick={() => handleDelete(tutorial._id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
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
