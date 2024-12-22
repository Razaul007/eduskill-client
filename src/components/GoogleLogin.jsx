import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";


const GoogleLogin = () => {
    const {GoogleLogin, loading } = useAuth();
    const navigate = useNavigate();

    const handleGoogleLogin = async () => {
      
        try {
            await GoogleLogin(); 
           
           
            Swal.fire({
                icon: "success",
                title: "Login Successful!",
                text: "You have logged in with Google successfully.",
                confirmButtonColor: "#3085d6", 
            });
          

            navigate("/");
            
            
        } catch (error) {
            
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: error.message || "Something went wrong. Please try again.",
                confirmButtonColor: "#d33",
            });
           

        }
    };



    return (
        <div>
           <div className="divider">OR</div> 
           <div>
             <button onClick={handleGoogleLogin} className="btn w-full">
               
                   <span>Login with Google</span>
                  <FcGoogle />
              
             </button>
           </div>
        </div>
    );
};

export default GoogleLogin;