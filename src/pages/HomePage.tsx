import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import useApi from "../hooks/useApi";
import { toast } from "react-toastify";

type SwiperSlide = {
  id: string;
  imageUrl: string;
};
const HomePage: React.FC = () => {
  const { makeAPICallWithOutData } = useApi();
  const [sliderImages, setSlideImages] = useState<SwiperSlide[]>([]);

  async function fetchSliderImages() {
    const { response, isError } = await makeAPICallWithOutData(
      "get",
      "/admin-panel/landingpage/crousel/getImages"
    );
    if (isError || !response) {
      toast.error("Network Error");
      return;
    }
    setSlideImages(response?.data?.crouselData);
  }
  useEffect(() => {
    fetchSliderImages();
  }, []);

  return (
    <div>
      {/* Welcome Section */}
      <div
        className="text-center p-8 rounded"
        style={{
          background: "linear-gradient(45deg, #FF9A8B, #FF6A88, #FF99AC)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-5xl font-bold mb-4 text-white">
          Welcome to PetFood Haven
        </h1>
        <p className="text-lg mb-6 text-white">
          Everything your pet needs, delivered to your door!
        </p>
        <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition duration-300">
          Shop Now
        </button>
      </div>

      <main className="bg-gray-100">
        {/* Hero Section with Carousel */}
        <section className="relative bg-gray-100 flex items-center justify-center">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            navigation={true}
            className="w-full"
          >
            {sliderImages.map((value: SwiperSlide) => (
              <SwiperSlide>
                <div
                  className="relative bg-cover bg-center h-[70vh] flex items-center justify-center"
                  style={{
                    backgroundImage:
                      // 'url("https://supertails.com/cdn/shop/files/12th_oct_web_2-min_1600x.png?v=1728541127")',
                      `url(${value.imageUrl})`,
                    width: "100%",
                    // backgroundSize: "contain",
                  }}
                ></div>
              </SwiperSlide>
            ))}
            {/* Carousel Slide 1 */}
            {/* <SwiperSlide>
              <div
                className="relative bg-cover bg-center h-[70vh] flex items-center justify-center"
                style={{
                  backgroundImage:
                    'url("https://supertails.com/cdn/shop/files/12th_oct_web_2-min_1600x.png?v=1728541127")',
                  width: "100%",
                  //backgroundSize: "contain",
                }}
              ></div>
            </SwiperSlide> */}

            {/* Carousel Slide 2 */}
            {/* <SwiperSlide>
              <div
                className="relative bg-cover bg-center h-[70vh] flex items-center justify-center"
                style={{
                  backgroundImage:
                    'url("https://supertails.com/cdn/shop/files/9th_oct_web_3-min_1600x.png?v=1728450246")',
                  width: "100%",
                  //backgroundSize: "contain",
                }}
              ></div>
            </SwiperSlide> */}

            {/* Carousel Slide 3 */}
            {/* <SwiperSlide>
              <div
                className="relative bg-cover bg-center h-[70vh] flex items-center justify-center"
                style={{
                  backgroundImage:
                    'url("https://supertails.com/cdn/shop/files/9th_oct_web_5-min_1600x.png?v=1728450245")',
                  width: "100%",
                  //backgroundSize: "contain",
                }}
              ></div>
            </SwiperSlide> */}
          </Swiper>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-white">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Explore Our Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://supertails.com/cdn/shop/files/7th_Oct_Popular_Categories-min_1429c56f-23c6-47b7-b6a7-3c0178c2fb9a_480x.png?v=1728279390"
                alt="Dog Food"
                className="h-90 w-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">Dog Food</h3>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://supertails.com/cdn/shop/files/7th_Oct_Popular_Categories-2-min_cbe23362-36e0-43ff-9e43-41ce998bf4aa_480x.png?v=1728279390"
                alt="Cat Food"
                className="h-90 w-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">Cat Food</h3>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://supertails.com/cdn/shop/files/1st_July_Popular_Categories_125_1b8043d7-414b-4d76-9080-18803afa09a1_480x.png?v=1727781543"
                alt="Accessories"
                className="h-90 w-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">Accessories</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 bg-gray-100">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="border rounded-lg p-4 bg-white shadow-md">
              <img
                src="https://supertails.com/cdn/shop/files/Frame344684057_280x.png?v=1716445251"
                alt="Product 1"
                className="h-40 w-full object-cover rounded-md"
                width={100}
              />
              <h3 className="mt-2 text-lg font-bold">Dog Kibble</h3>
              <p className="text-gray-600">$19.99</p>
              <button className="bg-orange-500 text-white px-4 py-2 mt-4 rounded hover:bg-orange-600 transition duration-300">
                Add to Cart
              </button>
            </div>
            <div className="border rounded-lg p-4 bg-white shadow-md">
              <img
                src="https://supertails.com/cdn/shop/files/Frame_344684069_1.png?v=1718002649"
                alt="Product 2"
                className="h-40 w-full object-cover rounded-md"
                width={100}
              />
              <h3 className="mt-2 text-lg font-bold">Cat Wet Food</h3>
              <p className="text-gray-600">$29.99</p>
              <button className="bg-orange-500 text-white px-4 py-2 mt-4 rounded hover:bg-orange-600 transition duration-300">
                Add to Cart
              </button>
            </div>
            <div className="border rounded-lg p-4 bg-white shadow-md">
              <img
                src="https://cdn.shopify.com/s/files/1/0565/8021/0861/files/Combo_21.png?v=1696417035"
                alt="Product 3"
                className="h-40 w-full object-cover rounded-md"
                height={100}
              />
              <h3 className="mt-2 text-lg font-bold">Pet Accessories Set</h3>
              <p className="text-gray-600">$39.99</p>
              <button className="bg-orange-500 text-white px-4 py-2 mt-4 rounded hover:bg-orange-600 transition duration-300">
                Add to Cart
              </button>
            </div>
            <div className="border rounded-lg p-4 bg-white shadow-md">
              <img
                src="https://cdn.shopify.com/s/files/1/0565/8021/0861/products/Frame1-2022-05-14T125036.756-527280.png?v=1696545663"
                alt="Product 4"
                className="h-40 w-full object-cover rounded-md"
              />
              <h3 className="mt-2 text-lg font-bold">Comfortable Pet Bed</h3>
              <p className="text-gray-600">$49.99</p>
              <button className="bg-orange-500 text-white px-4 py-2 mt-4 rounded hover:bg-orange-600 transition duration-300">
                Add to Cart
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
