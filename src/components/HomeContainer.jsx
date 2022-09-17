import React from "react";
import Delivery from "../assets/img/delivery.png";
import HeroBG from "../assets/img/heroBg.png";
import heroData from "./Data";

const HomeContainer = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full" id="home">
      <div className="py-2 flex-1 flex flex-col items-start justify-center  gap-6">
        <div className="flex items-center gap-2 justify-center  bg-orange-100 px-2 py-1 rounded-full drop-shadow-xl">
          <p className="text-base text-orange-500 font-semibold">
            Bike Delivery
          </p>
          <div className="w-8 h-8 rounded-full overflow-hidden bg-white">
            <img
              className="w-full h-full object-contain"
              src={Delivery}
              alt="delivery"
            />
          </div>
        </div>
        <p className="text-[2.5rem] font-bold tracking-wide lg:text-[4.25rem]">
          The Fastest Delivery in{" "}
          <span className="text-orange-600 text-[3rem] lg:text-[5rem]">
            Your City
          </span>{" "}
        </p>
        <p className="text-base text-textColor text-center md:text-left md:w-[80%]">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
        <button
          type="button"
          className="bg-gradient-to-br from-orange-400 to-orange-500 w-full px-4  py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-150 md:w-auto"
        >
          Order Now
        </button>
      </div>
      <div className="py-2 flex-1">
        <div className="w-full items-center flex justify-center relative">
          <img
            src={HeroBG}
            alt="herobg"
            className="ml-auto  lg:h-650 h-420 w-full lg:w-auto"
          />
          <div className="md:gap-2 gap-5  flex-wrap py-4  lg:w-460  md:h-full absolute flex items-center justify-center ">
            {heroData &&
              heroData.map((item, index) => (
                <div
                  key={item.id}
                  className="drop-shadow-lg mt-4 md:min-w-[190px] w-28 h-32 md:h-auto md:w-190 md:p-4 flex-col bg-cardOverlay  backdrop-blur-md rounded-3xl  flex items-center justify-center"
                >
                  <img
                    src={item.img}
                    alt="strawberry"
                    className="md:w-40 md:-mt-20 w-16 -mt-10"
                  />
                  <p className="md:text-base text-sm text-textColor font-semibold">
                    {item.title}
                  </p>
                  <p className="text-[10px] md:text-xs text-lighttextGray font-semibold my-3">
                    {item.descriptin}
                  </p>
                  <p className="text-xs font-semibold text-headingColor">
                    <span className="text-xs text-red-700">$</span> {item.price}
                  </p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContainer;
