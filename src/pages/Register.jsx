import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import GoogleLogin from "../components/GoogleLogin";
import axios from "axios";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";

const Register = () => {
    const { CreateUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();

    const onSubmit = (data) => {
        const name = data.name;
        const email = data.email;
        const  photoURL = data.photoURL;
        const password = data.password;
       

        const userData = {name, email, photoURL, password };
       
        CreateUser(data.email, data.password)
        .then(() => {
                axios.post("http://localhost:5173/users", userData).then(res => {
                    console.log(res)
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "center",
                            icon: "success",
                            title: "Registration successful!",
                            showConfirmButton: false,
                            timer: 2500,
                        });
                        navigate("/");
                    }
                });
            })
            .catch((err) => {
                console.error("Error creating user:", err);
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong during registration!",
                });
            });
            navigate("/");
    };

    return (
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col">
                <div className="text-center lg:text-left">
                    <h1 className="text-5xl mb-5 font-bold">Register now!</h1>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                    <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                className="input input-bordered"
                                {...register("name", { required: true })}
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm font-light">Email is Required!</p>
                            )}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="email"
                                className="input input-bordered"
                                {...register("email", { required: true })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm font-light">Email is Required!</p>
                            )}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text"> PhotoUR</span>
                            </label>
                            <input
                                type="text"
                                placeholder="photoURL"
                                className="input input-bordered"
                                {...register("photoURL", { required: true })}
                            />
                            {errors.photoURL && (
                                <p className="text-red-500 text-sm font-light">Email is Required!</p>
                            )}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="password"
                                className="input input-bordered"
                                {...register("password", {
                                    required: "Password is required!",
                                    minLength: {
                                        value: 6,
                                        message: "Password must be at least 6 characters long!",
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                                        message: "Password must include uppercase, lowercase, number, and special character!",
                                    },
                                })}
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm font-light">{errors.password.message}</p>
                            )}
                        </div>
                        
                       

                        <div className="form-control mt-6">
                            <button className="btn btn-primary" type="submit">
                                Register
                            </button>
                        </div>
                        <div>
                            <GoogleLogin />
                        </div>
                        <label className="label gap-2">
                            <p>Already Have an Account? Please </p>
                            <Link to="/login" className="label-text-alt link link-hover text-blue-500 font-semibold">
                                Login
                            </Link>
                        </label>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;