
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const Navbar = () => {
    const { user, Logout } = useAuth();

    return (
        <div className="navbar bg-base-100 shadow-md sticky top-0 z-10 pb-5">
            {/* Navbar Start */}
            <div className="navbar-start">
                {/* Logo */}
                <Link to="/" className="text-xl lg:text-3xl font-bold text-slate-800">
                    EduSkills
                </Link>
            </div>

            {/* Navbar Center */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {/* Common Links */}
                    <li><NavLink to="/" className="mr-4">Home</NavLink></li>
                    <li><NavLink to="/find-tutorials" className="mr-4">Find Tutors</NavLink></li>
                    {/* Links for Logged-in Users */}
                    {user && (
                        <>
                            <li><NavLink to="/add-tutorial" className="mr-4">Add Tutorials</NavLink></li>
                            <li><NavLink to="/my-tutorials" className="mr-4">My Tutorials</NavLink></li>
                            <li><NavLink to="/my-booked-tutors" className="mr-4">My booked tutors</NavLink></li>
                        </>
                    )}
                </ul>
            </div>

            {/* Navbar End */}
            <div className="navbar-end flex items-center">
                {/* If not logged in */}
                {!user && (
                    <>
                        {/* Login and Register Buttons */}
                        <Link className="mr-2 lg:mr-4 btn bg-cyan-500 text-xl lg:text-2xl" to="/login">
                            Login
                        </Link>
                        <Link className="lg:mr-4 btn bg-cyan-500 text-xl lg:text-2xl" to="/register">
                            Register
                        </Link>
                    </>
                )}
                {/* If logged in */}
                {user && (
                    <div className="flex items-center space-x-4">
                        {/* Profile Picture */}
                        <img
                            src={user.photoURL || "/user.png"}
                            alt="Profile"
                            className="w-10 h-10 rounded-full"
                            title={user.displayName || "User"}
                        />
                        {/* Logout Button */}
                        <button
                            onClick={Logout}
                            className="btn bg-red-500 text-white"
                        >
                            Logout
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
