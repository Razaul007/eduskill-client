// import React, { useEffect, useState } from 'react';
// import { FaArrowRight } from "react-icons/fa";
// import { Link } from 'react-router-dom';

// const LanguageCategory = () => {
//   const [tutorials, setTutorials] = useState([]);

//       // Fetch data from the backend API
//   useEffect(() => {
//     const fetchTutorials = async () => {
//       try {
//         const response = await fetch("http://localhost:4000/tutorials");
//         if (!response.ok) {
//           throw new Error("Failed to fetch products");
//         }

//         const data = await response.json();
//         // console.log(data);

//         // Filter for products in the "Sports Equipment" category
//         // const sportsCategoryProducts = data.filter(
//         //   (product) => product.categoryName === "Sports Equipment"
//         // );

//         setTutorials(data);
//         console.log(tutorials)
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchTutorials();
//   }, []);


//     return (
//         <div>
           
//             <section className="py-16">
//                 <h2 className="text-3xl font-semibold text-center mb-8">Explore Language Categories</h2>
//                 <p>{tutorials.length}</p>
//                 <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

//                    {/*  */}
//                  {
//                     tutorials.map(tutor=>   <Link key={tutor._id} to={`/find-tutorials`} className="card p-6 bg-white shadow-lg rounded-lg hover:bg-blue-100">
//                         <img src={tutor.image} alt="" className="w-16 h-16 mb-4 mx-auto" />
//                         <h3 className="text-xl font-semibold text-center">{tutor.language}</h3>
//                         <div className="text-center mt-2 ">

//                             <FaArrowRight />

//                         </div>
//                     </Link>)
//                  }    
//                     {/* ))} */}
//                 </div>
//             </section>
//         </div>
//     );
// };

// export default LanguageCategory;

import React, { useEffect, useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const LanguageCategory = () => {
  const [languageCategories, setLanguageCategories] = useState([]);

  // Fetch tutorials from the backend API
  useEffect(() => {
    const fetchTutorials = async () => {
      try {
        const response = await fetch("http://localhost:4000/tutorials");
        if (!response.ok) {
          throw new Error("Failed to fetch tutorials");
        }

        const data = await response.json();

        // Group tutors by language using a simple loop
        const groupedByLanguage = {}; // Start with an empty object
        for (const tutor of data) {
          const language = tutor.language; // Get the language of the current tutor

          // If language doesn't exist, create a new group
          if (!groupedByLanguage[language]) {
            groupedByLanguage[language] = [];
          }

          // Add the tutor to the group
          groupedByLanguage[language].push(tutor);
        }

        // Convert grouped data into an array for rendering
        const categories = Object.keys(groupedByLanguage).map((language) => ({
          language,
          tutors: groupedByLanguage[language],
          image: groupedByLanguage[language][0]?.image || "https://via.placeholder.com/64", // Use first tutor's image or a placeholder
        }));

        setLanguageCategories(categories); // Update state with grouped categories
      } catch (error) {
        console.error("Error fetching tutorials:", error);
      }
    };

    fetchTutorials();
  }, []);

  return (
    <div>
      <section className="py-16">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Explore Language Categories
        </h2>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {languageCategories.map((category) => (
            <Link
              key={category.language}
              to="/find-tutorials"
              className="card p-6 bg-white shadow-lg rounded-lg hover:bg-blue-100 transition duration-300"
            >
              <img
                src={category.image}
                alt={`${category.language} Logo`}
                className="w-16 h-16 mb-4 mx-auto"
              />
              <h3 className="text-xl font-semibold text-center">
                {category.language} Tutors
              </h3>
              <div className="text-center mt-2">
                <FaArrowRight />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LanguageCategory;
