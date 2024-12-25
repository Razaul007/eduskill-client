

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FeaturedTutors = () => {
    const [featuredTutorials, setFeaturedTutorials] = useState([]);



    useEffect(() => {
        const fetchTutorials = async () => {
            try {
                const response = await fetch("https://eduskills-server.vercel.app/tutorials");
                console.log(response)
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();

                // Filter products with a rating of 5 (featured products)
                const featured = data.filter((tutor) => tutor.review > "0");

                // Remove duplicates by _id (or another unique property)
                const uniqueFeatured = Array.from(
                    new Map(featured.map((tutor) => [tutor._id, tutor])).values()
                );

                setFeaturedTutorials(uniqueFeatured);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchTutorials();
    }, []);


    return (
        <div>
            <h1 className="text-3xl font-bold text-center mt-6 mb-5">Featured Tutorials</h1>
            {featuredTutorials.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-2 space-y-2">
                    {featuredTutorials.map((tutor) => (
                        <div key={tutor._id} className="card border rounded p-4 shadow-md">

                            <img
                                src={tutor.image}
                                alt=""
                                className="w-full h-48 object-cover rounded ml-3"
                            />
                            <h3 className="text-xl font-semibold px-2">{tutor.name}</h3>

                            <p>{tutor.description}</p>
                            <p className="text-green-500 font-bold">${tutor.price}</p>
                            <p>Rating: ⭐ {tutor.review}</p>
                            

                        </div>


                    ))}
                </div>
            ) : (
                <p>No featured Tutor available.</p>
            )}
        </div>
    );
};

export default FeaturedTutors;