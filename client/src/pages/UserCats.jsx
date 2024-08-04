import { useEffect, useState } from "react";
import axios from "../utilities/axios";
import { UserCatCard } from "../components/Card";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

export default function UserCats() {
  const [cats, setCats] = useState([]);

  const fetchUserCats = async () => {
    try {
      const { data } = await axios.get("/cats", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      // console.log(data.cats);
      setCats(data.cats);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: err.response?.data.message || err.message,
      });
    }
  };
  useEffect(() => {
    fetchUserCats();
  }, []);

  const handleChangeStatus = async (id) => {
    try {
      await axios.patch(
        `/cats/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      fetchUserCats();
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: err.response?.data.message || err.message,
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this post!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#4682A9",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        await axios.delete(`/cats/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        fetchUserCats();
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: err.response?.data.message || err.message,
      });
    }
  };

  return (
    <div>
      <h1 className="font-bold pt-8 lg:pt-14 2xl:pt-20 xl:text-3xl xl:mb-5 text-2xl text-center text-light-fourth">
        Your Cats
      </h1>
      <hr className="border-t-4 border-light-third mx-5 mt-3 md:mx-10 xl:mx-28" />
      <div className="m-10 lg:my-16 xl:mx-28 gap-8 sm:grid-cols-2 sm:grid md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        {cats.map((cat, index) => {
          return (
            <UserCatCard
              key={index}
              id={cat.id}
              images={cat.CatImages}
              name={cat.name}
              age={cat.age}
              breed={cat.breed}
              description={cat.description}
              adoptionStatus={cat.adoptionStatus}
              handleChangeStatus={handleChangeStatus}
              handleDelete={handleDelete}
            />
          );
        })}

        <Link
          to={"/create"}
          className="fixed bottom-4 right-4 md:bottom-10 md:right-10 lg:bottom-10 lg:right-16 xl:bottom-16 xl:right-20 xl:scale-125 lg:scale-110 bg-light-third hover:bg-light-fourth text-white font-bold p-2 rounded-full shadow-lg z-10"
        >
          <svg
            width="40px"
            height="40px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12H20M12 4V20"
              stroke="#FFFFFF"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
