import React from "react";
import Logo from "../assets/img/logo.png";
import { MdAddShoppingCart, MdAdd, MdLogout } from "react-icons/md";
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
  const [isMenu, setisMenu] = React.useState(false);

  const logout = () => {
    setisMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });

      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setisMenu(!isMenu);
    }
  };
  return (
    <header className="w-screen fixed z-50 p-3 px-4 md:p-6 md:px-16 bg-primary">
      {/* desktop and tablet */}
      <div className="hidden md:flex w-full h-full justify-between items-center">
        <Link to={"/"} className="flex items-center gap-2 ">
          <img src={Logo} alt="logo" className="w-8 object-cover" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>
        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-8 ml-auto"
          >
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
          </motion.ul>
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
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg absolute flex-col  py-3 top-12 right-0"
              >
                {user && user.email == "tharakahalkewelatecs@gmail.com" && (
                  <Link to="/createItem">
                    <p className="px-4 py-2 flex items-center gap-3 hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base cursor-pointer">
                      New Item
                      <MdAdd />
                    </p>
                  </Link>
                )}
                <p
                  onClick={logout}
                  className="px-4 py-2 flex items-center gap-3 hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base cursor-pointer"
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/*  mobile*/}
      <div className="flex md:hidden h-full  w-full  p-3 items-center justify-between">
        <div className="relative flex items-center justify-center">
          <MdAddShoppingCart className="text-textColor text-2xl   cursor-pointer" />
          <div className="w-5 h-5 rounded-full bg-cartNumBg  flex items-center  justify-center absolute -top-2 -right-2 ">
            <p className="text-sm text-white font-semibold ">2</p>
          </div>
        </div>
        <Link to={"/"} className="flex items-center gap-2 ">
          <img src={Logo} alt="logo" className="w-8 object-cover" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>
        <div className="relative">
          <motion.img
            onClick={() => login()}
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : UserProfile}
            alt="user"
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-lg rounded-full cursor-pointer"
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg absolute flex-col  py-3 top-12 right-0"
            >
              {user && user.email == "tharakahalkewelatecs@gmail.com" && (
                <Link to="/createItem">
                  <p className="px-4 py-2 flex items-center gap-3 hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base cursor-pointer">
                    New Item
                    <MdAdd />
                  </p>
                </Link>
              )}
              <ul className="flex gap-22 flex-col">
                <li className="px-4 py-2 flex items-center gap-3 hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base cursor-pointer ">
                  Home
                </li>
                <li className="px-4 py-2 flex items-center gap-3 hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base cursor-pointer ">
                  Menu
                </li>
                <li className="px-4 py-2 flex items-center gap-3 hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base cursor-pointer ">
                  About Us
                </li>
                <li className="px-4 py-2 flex items-center gap-3 hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base cursor-pointer ">
                  Services
                </li>
              </ul>
              <p
                onClick={logout}
                className="px-4 py-2 flex items-center gap-3 hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base cursor-pointer"
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
