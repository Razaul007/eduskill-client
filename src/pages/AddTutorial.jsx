import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddTutorial = () => {
  const { user } = useAuth();  
  console.log(user)
  const navigate = useNavigate();

  const [tutorial, setTutorial] = useState({
    name: user?.displayName || '',  
    email: user?.email || '', 
    image: '',
    language: '',
    price: '',
    description: '',
    review: 0, // Default review is 0
  });

  

  // Languages Offered - you can replace this with a more complete list if needed
  const languagesOffered = [
    'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Russian',
    'Arabic', 'Portuguese', 'Italian', 'Korean', 'Dutch', 'Hindi', 'Turkish',
    'Swedish', 'Greek', 'Polish', 'Romanian', 'Danish', 'Finnish', 'Czech',
    'Hungarian', 'Norwegian', 'Hebrew', 'Thai', 'Vietnamese', 'Indonesian',
    'Bengali', 'Urdu', 'Punjabi', 'Malayalam', 'Tamil', 'Telugu', 'Gujarati',
    'Marathi', 'Punjabi', 'Swahili', 'Zulu', 'Afrikaans', 'Finnish', 'Icelandic',
    'Lithuanian', 'Latvian', 'Estonian', 'Bulgarian', 'Ukrainian', 'Belarusian',
    'Serbian', 'Croatian', 'Bosnian', 'Slovak', 'Slovenian', 'Maltese'
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTutorial({
      ...tutorial,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Here, you'd send the form data to your backend API
    console.log('Tutorial added:', tutorial);
    try{
     const res = await axios.post('http://localhost:4000/tutorials', tutorial)
      toast.success("Data added Successfully!")
      console.log(res)
      
    }catch(error){
         console.log(error)
    }
    

   
    // navigate('/my-tutorials');
  };

  return (
    <div className="max-w-lg mx-auto mt-5 p-6">
      <h1 className="text-3xl text-center font-bold mt-5 mb-6">Add a New Tutorial</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={tutorial.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Your Name"
            readOnly // Prevent editing name
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={tutorial.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Your Email"
            readOnly // Prevent editing email
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Tutorial Image</label>
          <input
            type="text"
            name="image"
            value={tutorial.image}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Image URL"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Language</label>
          <select
            name="language"
            value={tutorial.language}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Language</option>
            {languagesOffered.map((language, index) => (
              <option key={index} value={language}>
                {language}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={tutorial.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Price"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={tutorial.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Tutorial Description"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Review</label>
          <input
            type="number"
            name="review"
            value={tutorial.review}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            placeholder="Review (0 by default)"
            disabled // Review field is read-only by default
          />
        </div>

        <div className="flex justify-center">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTutorial;
