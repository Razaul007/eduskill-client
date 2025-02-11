
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const MyTutorials = () => {
    const { user } = useAuth();
    const [tutorials, setTutorials] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedTutorial, setSelectedTutorial] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMyTutorials();
    }, [user]);

    const fetchMyTutorials = async () => {
        try {
            const { data } = await axios.get(`http://localhost:4000/my-tutorials/${user?.email}`);
            setTutorials(data);
        } catch (error) {
            console.error("Error fetching tutorials:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/tutorials/${id}`);
            setTutorials(tutorials.filter((tutorial) => tutorial._id !== id));
        } catch (error) {
            console.error("Error deleting tutorial:", error);
        }
    };

    const handleUpdate = (tutorial) => {
        setSelectedTutorial(tutorial);
        setShowModal(true);
    };

    const handleModalUpdate = async (event) => {
        event.preventDefault();
        if (!selectedTutorial || !selectedTutorial._id) return;

        const formData = {
            image: event.target.image.value,
            language: event.target.language.value,
            price: event.target.price.value,
            description: event.target.description.value,
        };

        try {
            const { data } = await axios.put(`http://localhost:4000/update/${selectedTutorial._id}`, formData);
            if (data.modifiedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "Tutorial Updated Successfully!",
                    showConfirmButton: false,
                    timer: 2500,
                });
                navigate('/my-tutorials');
            }
        } catch (error) {
            console.error("Error updating tutorial:", error);
            Swal.fire({ icon: "error", title: "Error", text: "Failed to update the tutorial." });
        }

        setShowModal(false);
        setSelectedTutorial(null);
    };

    return (
        <div className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-semibold text-center mb-6">My Tutorials</h1>
            <div className="overflow-x-auto">
                <table className="table-auto w-full border border-gray-300 text-sm md:text-base">
                    <thead>
                        <tr className="bg-gray-200 text-xs md:text-base">
                            <th className="border px-2 md:px-4 py-2">Name</th>
                            <th className="border px-2 md:px-4 py-2">Image</th>
                            <th className="border px-2 md:px-4 py-2">Language</th>
                            <th className="border px-2 md:px-4 py-2">Price</th>
                            <th className="border px-2 md:px-4 py-2">Description</th>
                            <th className="border px-2 md:px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tutorials.map((tutorial) => (
                            <tr key={tutorial._id} className="text-center">
                                <td className="border px-2 md:px-4 py-2">{tutorial.name}</td>
                                <td className="border px-2 md:px-4 py-2">
                                    <img src={tutorial.image} alt={tutorial.name} className="w-10 h-10 md:w-16 md:h-16 object-cover mx-auto" />
                                </td>
                                <td className="border px-2 md:px-4 py-2">{tutorial.language}</td>
                                <td className="border px-2 md:px-4 py-2">${tutorial.price}</td>
                                <td className="border px-2 md:px-4 py-2 truncate max-w-xs">{tutorial.description}</td>
                                <td className="border px-2 md:px-4 py-2 flex flex-col md:flex-row gap-2 justify-center">
                                    <button onClick={() => handleUpdate(tutorial)} className="bg-blue-500 text-white px-3 py-1 rounded text-xs md:text-base">Update</button>
                                    <button onClick={() => handleDelete(tutorial._id)} className="bg-red-500 text-white px-3 py-1 rounded text-xs md:text-base">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {showModal && selectedTutorial && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center px-4">
                    <form onSubmit={handleModalUpdate} className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
                        <h2 className="text-xl font-semibold mb-4">Update Tutorial</h2>
                        <input type="text" name="image" defaultValue={selectedTutorial.image} placeholder="Image URL" className="w-full px-4 py-2 border rounded mb-2" />
                        <input type="text" name="language" defaultValue={selectedTutorial.language} placeholder="Language" className="w-full px-4 py-2 border rounded mb-2" />
                        <input type="number" name="price" defaultValue={selectedTutorial.price} placeholder="Price" className="w-full px-4 py-2 border rounded mb-2" />
                        <textarea name="description" defaultValue={selectedTutorial.description} placeholder="Description" className="w-full px-4 py-2 border rounded mb-2"></textarea>
                        <div className="flex justify-end gap-2">
                            <button type="button" onClick={() => setShowModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update</button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default MyTutorials;


