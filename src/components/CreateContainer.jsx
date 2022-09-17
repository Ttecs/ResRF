import React from "react";
import { motion } from "framer-motion";
import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import Loader from "./Loader";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase.config";

const catogories = [
  {
    id: 1,
    name: "chicken",
    urlParamName: "chicken",
  },
  {
    id: 2,
    name: "curry",
    urlParamName: "curry",
  },
  {
    id: 3,
    name: "rice",
    urlParamName: "rice",
  },
  {
    id: 4,
    name: "icecream",
    urlParamName: "icecream",
  },
  {
    id: 5,
    name: "fish",
    urlParamName: "fish",
  },
];

const CreateContainer = () => {
  const [name, setName] = React.useState("");
  const [calories, setcalories] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [fields, setfields] = React.useState(false);
  const [category, setCategory] = React.useState(null);
  const [alertStatus, setalertStatus] = React.useState("danger");
  const [msg, setmsg] = React.useState(null);
  const [isLoading, setisLoading] = React.useState(false);
  const [imageAsset, setimageAsset] = React.useState(null);

  const uploadimage = (e) => {
    setisLoading(true);
    const imagagefile = e.target.files[0];
    const storageref = ref(storage, `images/${Date.now()}-${imagagefile.name}`);
    const uploadTask = uploadBytesResumable(storageref, imagagefile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadprogress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setfields(true);
        setmsg("Something went wrong in uploading ");
        setalertStatus("danger");
        setTimeout(() => {
          setfields(false);
          setisLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setimageAsset(downloadURL);
          setisLoading(false);
          setfields(true);
          setmsg("Image uploaded successfully");
          setalertStatus("success");
          setTimeout(() => {
            setfields(false);
          }, 4000);
        });
      }
    );
  };

  const deleteimage = () => {};

  const saveDetails = () => {};

  return (
    <div className="w-full min-h-screen flex items-center justify-center ">
      <div className="w-[90%] md:w-[75%] border  border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center gap-4">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded-lg text-center text-base font-semibold ${
              alertStatus == "danger"
                ? "bg-red-400 text-red-800"
                : "bg-emerald-400 text-emerald-800"
            }`}
          >
            {msg}
          </motion.p>
        )}
        <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
          <MdFastfood className="text-2xl text-gray-700" />
          <input
            type="text"
            required
            value={name}
            placeholder="give me a title"
            onChange={(e) => setName(e.target.value)}
            className="w-full h-full text-lg bg-transparent fontsemibold  outline-none placeholder:text-gray-500 text-textColor"
          />
        </div>
        <div className="w-full ">
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="outline-none w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
          >
            <option value="other" className="bg-white">
              select a category
            </option>
            {catogories.map((cat) => (
              <option
                value={cat.urlParamName}
                className="bg-white text-base border-0 outline-none capitalize text-headingColor"
              >
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <div className="group flex justify-center items-center flex-col border-2 border-dotted border-gray-300 w-full h-225 md:h-420 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label
                    htmlFor=""
                    className="w-full h-full flex-col items-center justify-center cursor-pointer b "
                  >
                    <div className="w-full h-full flex-col items-center justify-center cursor-pointer flex gap-2">
                      <MdCloudUpload className="text-4xl text-gray-400 hover:text-gray-700" />
                      <p className="text-gray-500 text-xl hover:text-gray-700"></p>
                      <input
                        type="file"
                        name="upload image"
                        accept="image/*"
                        onChange={uploadimage}
                        className="w-30 h-30"
                      />
                    </div>
                  </label>
                </>
              ) : (
                <div className="relative h-full ">
                  <img
                    src={imageAsset}
                    alt="uploaded imaged"
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={deleteimage}
                    type="button"
                    className="absolute bottom-3 p-3 rounded-full bg-red-500 cursor-pointer outline-none hover:shadow-lg duration-500 transition-all ease-in-out"
                  >
                    <MdDelete className="text-2xl text-white" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3 ">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2 ">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input
              value={calories}
              onChange={(e) => setcalories(e.target.value)}
              type="text"
              required
              placeholder="Calories"
              className=" w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>

          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2 ">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="text"
              required
              placeholder="Price"
              className=" w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>
        <div className="flex items-center w-full justify-center">
          <button
            type="button"
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-lg text-white font-semibold"
            onClick={saveDetails}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateContainer;
