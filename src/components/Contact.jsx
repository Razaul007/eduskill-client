

const Contact = () => {
    return (
        <div className="my-24 mx-8 bg-base-100">
            <h1 className="text-3xl font-bold my-16 text-center">Contact Us</h1>
            <div className=" bg-base-100 p-4 shadow-xl w-full  lg:w-1/2 mx-auto">
                <form >
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name :</span>
                        </label>
                        <input type="text" placeholder="Your Name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email :</span>
                        </label>
                        <input type="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Message :</span>
                        </label>
                        <input type="textarea" placeholder="Write Your Message" className="input input-bordered h-32" required />
                    </div>

                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Contact;