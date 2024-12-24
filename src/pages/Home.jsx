// import React from "react";
import { Link } from "react-router-dom";
import Banner from "./Home/Banner";
import Stats from "./Home/Stats";
import UserTestimonials from "../components/UserTestimonials";
import Contact from "../components/Contact";
import LanguageCategory from "./Home/LanguageCategory";

const Home = () => {

  return (
    <div className="max-w-[1280px] mx-auto mt-5 " >
      {/* Banner Section */}
      <Banner />

      {/* Stats Section */}
      
      <Stats />
     {/* Language Category */}
     <LanguageCategory/>
      
      {/* Additional Sections (Featured Tutors, Popular Languages, etc.) */}
      <section className="py-16 bg-gray-100">
        <h2 className="text-3xl font-semibold text-center mb-8">Featured Tutors</h2>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Sample Tutor Card */}
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <img src="https://via.placeholder.com/150" alt="Tutor" className="w-32 h-32 rounded-full mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-center">John Doe</h3>
            <p className="text-center">English Tutor</p>
            <div className="text-center mt-4">
              <Link to="/tutor/john-doe" className="text-blue-500">View Profile</Link>
            </div>
          </div>
          {/* Add more tutor cards as needed */}
        </div>
      </section>
      <div className="my-24 mx-8">
        <h1 className="text-3xl font-bold my-16 text-center">User Testimonials</h1>
        <UserTestimonials />
      </div>
      <div className="my-24 mx-8">
        {/* <h1 className="text-3xl font-bold my-16 text-center">User Testimonials</h1> */}
        <Contact/>
      </div>

    </div>
  );
};

export default Home;
