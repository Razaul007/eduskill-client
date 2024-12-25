
import { Link } from "react-router-dom";
import Banner from "./Home/Banner";
import Stats from "./Home/Stats";
import UserTestimonials from "../components/UserTestimonials";
import Contact from "../components/Contact";
import LanguageCategory from "./Home/LanguageCategory";
import FeaturedTutors from "../components/FeaturedTutors";

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
       <FeaturedTutors/>
       
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
