import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../utilities/axios";
import LoadingSpinner from "../components/LoadingSpinner";
import Swal from "sweetalert2";

const CatForm = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cat, setCat] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "",
    description: "",
    contact: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", cat.name);
      formData.append("breed", cat.breed);
      formData.append("age", cat.age);
      formData.append("gender", cat.gender);
      formData.append("description", cat.description);
      formData.append("contact", cat.contact);

      images.forEach((image) => {
        formData.append("images", image);
      });

      const response = await axios({
        method: "POST",
        url: "/cats",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      });

      console.log(response.data);
      navigate("/");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: err.response?.data.message || err.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setImages(selectedFiles);
  };

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setCat({ ...cat, [name]: value });
  };

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <LoadingSpinner />
        </div>
      ) : (
        <form
          className="m-8 gap-5 lg:mt-16 lg:mx-20 xl:mx-80"
          onSubmit={handleSubmit}
        >
          <h1 className="font-bold text-xl text-center mb-5 text-light-third">
            Create Post
          </h1>
          <div className="mb-5 flex flex-col mx-auto">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Cat Name :
            </label>
            <input
              type="text"
              id="name"
              name="name"
              onChange={handleChangeInput}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5 flex flex-col mx-auto">
            <label
              htmlFor="breed"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Breed :
            </label>
            <input
              type="text"
              id="breed"
              name="breed"
              onChange={handleChangeInput}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5 flex flex-col mx-auto">
            <label
              htmlFor="age"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Age :
            </label>
            <input
              type="text"
              id="age"
              name="age"
              onChange={handleChangeInput}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5 flex flex-col mx-auto">
            <legend
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Gender:
            </legend>
            <div className="flex gap-5 xl:flex-col ">
              <label className="inline-flex items-center mr-4">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="male"
                  onChange={handleChangeInput}
                  className="form-radio text-blue-500 focus:ring-blue-500 dark:text-blue-400 dark:focus:ring-blue-400"
                />
                <span className="ml-2 text-sm text-gray-900 dark:text-white">
                  Male
                </span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="female"
                  onChange={handleChangeInput}
                  className="form-radio text-pink-500 focus:ring-pink-500 dark:text-pink-400 dark:focus:ring-pink-400"
                />
                <span className="ml-2 text-sm text-gray-900 dark:text-white">
                  Female
                </span>
              </label>
            </div>
          </div>

          <div className="mb-5 flex flex-col mx-auto">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Description :
            </label>
            <textarea
              id="description"
              name="description"
              onChange={handleChangeInput}
              className="h-48 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
            <label
              htmlFor="contact"
              className="block  mt-5 mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Contact :
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              onChange={handleChangeInput}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="flex flex-col justify-center w-full">
            <h5 className="text-sm font-medium mb-2">
              Upload Images : (max. 3 images)
            </h5>
            <div className="flex items-center justify-center w-full h-28 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <input
                id="images"
                name="images"
                type="file"
                className="hidden"
                multiple
                onChange={handleFileChange}
              />
              <label
                htmlFor="images"
                className="flex flex-col items-center justify-center w-full h-full p-5"
              >
                {images.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-4">
                    {images.map((image, index) => (
                      <img
                        key={index}
                        src={URL.createObjectURL(image)}
                        alt={`Image ${index}`}
                        className="rounded-lg max-w-16"
                      />
                    ))}
                  </div>
                ) : (
                  <>
                    <svg
                      className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                      />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </>
                )}
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-8 bg-light-third hover:bg-light-fourth text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            Submit
          </button>
        </form>
      )}
    </>
  );
};

export default CatForm;
