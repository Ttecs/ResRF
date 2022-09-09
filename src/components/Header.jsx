import React from "react";
import Logo from "../assets/img/logo.png";
import { MdAddShoppingCart } from "react-icons/md";
import UserProfile from "../assets/img/avatar.png";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "./../context/reducer";
function Header() {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user }, dispatch] = useStateValue();

  const login = async () => {
    const {
      user: { refreshToken, providerData },
    } = await signInWithPopup(firebaseAuth, provider);
    dispatch({
      type: actionType.SET_USER,
      user: providerData[0],
    });

    localStorage.setItem("user", JSON.stringify(providerData[0]));
  };
  return (
    <header className="w-screen fixed z-50 p-6 px-16">
      {/* desktop and tablet */}
      <div className="hidden md:flex w-full h-full justify-between items-center">
        <Link to={"/"} className="flex items-center gap-2 ">
          <img src={Logo} alt="logo" className="w-8 object-cover" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8 ml-auto">
            <li className="text-base text-lg text-textColor  hover:text-headingColor cursor-pointer duration-100 transition-all ease-in-out  ">
              Home
            </li>
            <li className="text-base text-lg text-textColor hover:text-headingColor cursor-pointer  duration-100 transition-all ease-in-out">
              Menu
            </li>
            <li className="text-base text-lg text-textColor  hover:text-headingColor cursor-pointer duration-100 transition-all ease-in-out">
              About Us
            </li>
            <li className="text-base text-lg text-textColor  hover:text-headingColor cursor-pointer duration-100 transition-all ease-in-out">
              Services
            </li>
          </ul>
          <div className="relative flex items-center justify-center">
            <MdAddShoppingCart className="text-textColor text-2xl   cursor-pointer" />
            <div className="w-5 h-5 rounded-full bg-cartNumBg  flex items-center  justify-center absolute -top-2 -right-2 ">
              <p className="text-sm text-white font-semibold ">2</p>
            </div>
          </div>

          <div className="relative">
            <motion.img
              onClick={() => login()}
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : UserProfile}
              alt="user"
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-lg rounded-full cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/*  mobile*/}
      <div className="flex md:hidden h-full  w-full bg-blue-400 p-3"></div>
    </header>
  );
}

export default Header;
