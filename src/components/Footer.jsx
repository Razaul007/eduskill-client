import React from "react";

const Footer = () => {
  return (
    <footer className="bg-cyan-900 text-gray-200 py-10">
      <div className="max-w-[1280px] mx-auto flex flex-col-1 md:flex-col-3 justify-between items-center gap-8">
        <div className="ml-5">
          <h1 className="text-2xl text-center font-bold text-white mb-4">EduSkills</h1>
          <p className="text-sm w-full text-wrap text-center">
            EduSkills is your gateway to learning and  <br />
            skill development.Connect with expert tutors  <br />
            and achieve your educational goals seamlessly.
          </p>

        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Quick Links</h2>
          <ul>
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="/find-tutorials" className="hover:underline">
                Find Tutors
              </a>
            </li>
            <li>
              <a href="/add-tutorial" className="hover:underline">
                Add Tutorials
              </a>
            </li>
            <li>
              <a href="/my-tutorials" className="hover:underline">
                My Tutorials
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Contact Us</h2>
          <p>Email: support@eduskills.com</p>
          <p>Phone: +123-456-7890</p>
          <div className="flex gap-4 mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-white"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-white"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:text-white"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:text-white"
            >
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 mt-8 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} EduSkills. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
