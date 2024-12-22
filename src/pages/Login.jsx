import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import GoogleLogin from "../components/GoogleLogin";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";


const Login = () => {
    const { Login } = useAuth();

    const { register,
        handleSubmit,
        formState: { errors },
    } = useForm();
   
    const navigate = useNavigate();

    // const onSubmit = (data) => {
    //     Login(data.email, data.password);
    //     navigate("/");
    // };
  

    

const onSubmit = async (data) => {
    try {
        await Login(data.email, data.password); 
        Swal.fire({
            icon: "success", 
            title: "Login Successful!",
            text: "Welcome back!",
            confirmButtonColor: "#3085d6",
        });
       
        
        navigate("/");
    } catch (error) {
        Swal.fire({
            icon: "error", 
            title: "Login Failed",
            text: error.message,
            confirmButtonColor: "#d33",
        });
    }
};


    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col ">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl mb-5 font-bold">Login now!</h1>

                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" placeholder="email" className="input input-bordered" {...register("email", { required: true })} />
                            {errors.email && (<p className="text-red-500 text-sm font-light">Email is Required!</p>)}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" placeholder="password" className="input input-bordered"
                                {...register("password", {
                                    required: "Password is required!",
                                    minLength: {
                                        value: 8,
                                        message: "Password must be at least 8 characters long!",
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                        message: "Password must include uppercase, lowercase, number, and special character!",
                                    },
                                })}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm font-light">{errors.password.message}</p>
                            )}
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn btn-primary" type="submit">Login</button>
                        </div>
                        <div>
                            <GoogleLogin/>
                        </div>
                        <label className="label">
                            <p>New here? Please</p>
                            <Link to="/register" className="label-text-alt link link-hover text-blue-500 font-semibold">Register</Link >
                        </label>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;