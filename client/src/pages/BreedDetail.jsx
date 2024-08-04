import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../utilities/axios";
import Bar from "../components/Bar";
import Swal from "sweetalert2";

export default function BreedDetail() {
  const { id } = useParams();
  const [cat, setCat] = useState({});
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchCatBreedDetail = async () => {
      try {
        const { data } = await axios.get(`/breeds/image/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // console.log(data);
        setImage(data.url);
        setCat(data.breeds[0]);
      } catch (err) {
        console.error(err);
        Swal.fire({
          icon: "error",
          title: err.response?.data.message || err.message,
        });
      }
    };
    fetchCatBreedDetail();
  }, [id]);

  return (
    <div className="mb-20 flex flex-col xl:flex-row ">
      <img
        className="self-center w-3/4 xl:w-1/3 xl:ml-10 mt-16 rounded"
        src={image}
        alt="Default avatar"
      ></img>
      <div className="max-w-xl md:w-full md:max-w-4xl lg:pt-10 pb-10 pt-5 mx-auto overflow-hidden">
        <div className="px-8 py-5 sm:p-6">
          <div className="px-10">
            <h2 className="text-2xl font-semibold mb-2">{cat.name}</h2>
            <p className="text-gray-600 mb-4">{cat.description}</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Origin</h3>
                <p className="text-gray-600">{cat.origin}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Temperament</h3>
                <p className="text-gray-600">{cat.temperament}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Life Span</h3>
                <p className="text-gray-600">{cat.life_span} years</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Weight</h3>
                <p className="text-gray-600">{cat?.weight?.metric} kg</p>
              </div>
            </div>
          </div>

          <div className="">
            <div className="px-6 pt-5 pb-10 sm:p-6 md:grid md:grid-cols-2 gap-x-5">
              <div className="mt-4">
                <Bar statName={"Adaptability"} stat={cat.adaptability} />
              </div>

              <div className="mt-4">
                <Bar statName={"Affection Level"} stat={cat.affection_level} />
              </div>

              <div className="mt-4">
                <Bar statName={"Child Friendly"} stat={cat.child_friendly} />
              </div>

              <div className="mt-4">
                <Bar statName={"Dog Friendly"} stat={cat.dog_friendly} />
              </div>

              <div className="mt-4">
                <Bar statName={"Energy Level"} stat={cat.energy_level} />
              </div>

              <div className="mt-4">
                <Bar statName={"Grooming"} stat={cat.grooming} />
              </div>

              <div className="mt-4">
                <Bar statName={"Health Issues"} stat={cat.health_issues} />
              </div>

              <div className="mt-4">
                <Bar statName={"Intelligence"} stat={cat.intelligence} />
              </div>

              <div className="mt-4">
                <Bar statName={"Social Needs"} stat={cat.social_needs} />
              </div>

              <div className="mt-4">
                <Bar
                  statName={"Stranger Friendly"}
                  stat={cat.stranger_friendly}
                />
              </div>

              <div className="mt-4">
                <Bar statName={"Vocalisation"} stat={cat.vocalisation} />
              </div>
            </div>
          </div>
        </div>
        <Link
          to={"/cat-breeds"}
          className="ml-8 xl:py-5 xl:px-7 xl:text-xl xl:m-10 bg-light-third rounded-lg text-md text-white hover:bg-light-fourth py-3 px-4"
        >
          Bact to Breeds
        </Link>
      </div>
    </div>
  );
}
