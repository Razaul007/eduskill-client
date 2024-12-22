// import { Fade } from "react-awesome-reveal";

import banner1 from "../../assets/banner1.webp"
import banner2 from "../../assets/banner2.webp"
import banner3 from "../../assets/banner3.webp"



const Banner = () => {

    return (

        <div className="mb-0">
            <div className="carousel w-full">
                <div id="item1" className="carousel-item w-full">
                    <img
                        src={banner1}
                        className="w-full lg:h-[600px]" />
                </div>
                <div id="item2" className="carousel-item w-full">
                    <img
                        src={banner2}
                        className="w-full lg:h-[600px]" />
                </div>
                <div id="item3" className="carousel-item w-full">
                    <img
                        src={banner3}
                        className="w-full lg:h-[600px]" />
                </div>
               
            </div>
            <div className="flex w-full justify-center gap-2 py-2">
                <a href="#item1" className="btn btn-xs">1</a>
                <a href="#item2" className="btn btn-xs">2</a>
                <a href="#item3" className="btn btn-xs">3</a>
            </div>
        </div>

    );
};

export default Banner;