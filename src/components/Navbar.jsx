

// import { Link, NavLink } from "react-router-dom";
// import { useState, useEffect } from "react";
// import useAuth from "../hooks/useAuth";


// const Navbar = () => {
    

//     const { user, Logout } = useAuth();


   
   

//     return (
//         <div className="navbar bg-base-100 shadow-md sticky top-0 z-10 pb-5">
//             <div className="navbar-start">
//                 <Link to="/" className="text-xl lg:text-3xl font-bold text-slate-800">
//                     EduSkills
//                 </Link>
//             </div>
//             <div className="navbar-center hidden lg:flex">
//                 <ul className="menu menu-horizontal px-1">
                   
//                     <li><NavLink to="/" className="mr-4">Home</NavLink></li>
//                     <li><NavLink to="/find-tutorials" className="mr-4">Find Tutors</NavLink></li>
//                     {/*if user Logged-in  */}
//                     {user && (
//                         <>
//                             <li><NavLink to="/add-tutorial" className="mr-4">Add Tutorials</NavLink></li>
//                             <li><NavLink to="/my-tutorials" className="mr-4">My Tutorials</NavLink></li>
//                             <li><NavLink to="/my-booked-tutors" className="mr-4">My booked tutors</NavLink></li>
//                         </>
//                     )}
//                 </ul>
//             </div>

//             <div className="navbar-end flex items-center">
//                 {/* Theme Toggle */}
                

                
//                 {!user && (
//                     <>
//                         <Link className="mr-2 lg:mr-4 btn bg-cyan-800 text-xl text-white lg:text-2xl" to="/login">
//                             Login
//                         </Link>
//                         <Link className="lg:mr-4 btn bg-cyan-800 text-xl text-white lg:text-2xl" to="/register">
//                             Register
//                         </Link>
//                     </>
//                 )}
//                 {/* If logged in */}
//                 {user && (
//                     <div className="flex items-center space-x-4">
//                         <img
//                             src={user.photoURL || "/user.png"}
//                             alt="Profile"
//                             className="w-10 h-10 rounded-full"
//                             title={user.displayName || "User"}
//                         />
//                         <button
//                             onClick={Logout}
//                             className="btn bg-red-500 text-white"
//                         >
//                             Logout
//                         </button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Navbar;


import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { FaBars, FaTimes } from "react-icons/fa"; // Importing icons for the menu

const Navbar = () => {
    const { user, Logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false); // State for the dropdown menu

    return (
        <div className="navbar bg-base-100 shadow-md sticky top-0 z-10 py-4 px-5 md:px-10  ">
            <div className="navbar-start flex items-center justify-between w-full ">
                <Link to="/" className="text-xl lg:text-3xl font-bold text-slate-800">
                    EduSkills
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden text-2xl"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <FaTimes /> : <FaBars />}
                </button>
            </div>

            {/* Desktop Menu */}
            <div className="navbar-center hidden lg:flex ">
                <ul className="menu menu-horizontal px-1 space-x-4">
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/find-tutorials">Find Tutors</NavLink></li>
                    {user && (
                        <>
                            <li><NavLink to="/add-tutorial">Add Tutorials</NavLink></li>
                            <li><NavLink to="/my-tutorials">My Tutorials</NavLink></li>
                            <li><NavLink to="/my-booked-tutors">My Booked Tutors</NavLink></li>
                        </>
                    )}
                </ul>
            </div>

            {/* Right Side (Login / Logout) */}
            <div className="navbar-end hidden lg:flex items-center space-x-4">
                {!user ? (
                    <>
                        <Link className="btn bg-cyan-800 text-white" to="/login">Login</Link>
                        <Link className="btn bg-cyan-800 text-white" to="/register">Register</Link>
                    </>
                ) : (
                    <div className="flex items-center space-x-4">
                        <img
                            src={user.photoURL || "/user.png"}
                            alt="Profile"
                            className="w-10 h-10 rounded-full"
                            title={user.displayName || "User"}
                        />
                        <button
                            onClick={Logout}
                            className="btn bg-red-500 text-white"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>

            {/* Mobile Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-16 left-0 w-full bg-white shadow-lg lg:hidden">
                    <ul className="flex flex-col items-center space-y-4 py-4">
                        <li><NavLink to="/" onClick={() => setIsOpen(false)}>Home</NavLink></li>
                        <li><NavLink to="/find-tutorials" onClick={() => setIsOpen(false)}>Find Tutors</NavLink></li>
                        {user && (
                            <>
                                <li><NavLink to="/add-tutorial" onClick={() => setIsOpen(false)}>Add Tutorials</NavLink></li>
                                <li><NavLink to="/my-tutorials" onClick={() => setIsOpen(false)}>My Tutorials</NavLink></li>
                                <li><NavLink to="/my-booked-tutors" onClick={() => setIsOpen(false)}>My Booked Tutors</NavLink></li>
                            </>
                        )}
                        {!user ? (
                            <>
                                <li><Link className="btn bg-cyan-800 text-white" to="/login" onClick={() => setIsOpen(false)}>Login</Link></li>
                                <li><Link className="btn bg-cyan-800 text-white" to="/register" onClick={() => setIsOpen(false)}>Register</Link></li>
                            </>
                        ) : (
                            <li className="flex flex-col items-center">
                                <img
                                    src={user.photoURL || "/user.png"}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full"
                                    title={user.displayName || "User"}
                                />
                                <button
                                    onClick={() => { Logout(); setIsOpen(false); }}
                                    className="btn bg-red-500 text-white mt-2"
                                >
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;
