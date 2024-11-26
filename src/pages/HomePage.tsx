import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Footer from "../components/Footer";
import useApi from "../hooks/useApi";
import { toast } from "react-toastify";
import CartPage from "../components/Cart";
import Cart from "../components/Cart";



type SwiperSlideType = {
  id: string;
  name: string;
  imageUrl: string;
};

const HomePage: React.FC = () => {
  const { makeAPICallWithOutData } = useApi();
  const [sliderImages, setSlideImages] = useState<SwiperSlideType[]>([]);
  const caregoryobj= [
    {
      img: "https://supertails.com/cdn/shop/files/7th_Oct_Popular_Categories-min_1429c56f-23c6-47b7-b6a7-3c0178c2fb9a_480x.png?v=1728279390",
      label: "Dog Food",
    },
    {
      img: "https://supertails.com/cdn/shop/files/7th_Oct_Popular_Categories-2-min_cbe23362-36e0-43ff-9e43-41ce998bf4aa_480x.png?v=1728279390",
      label: "Cat Food",
    },
    {
      img: "https://supertails.com/cdn/shop/files/1st_July_Popular_Categories_125_1b8043d7-414b-4d76-9080-18803afa09a1_480x.png?v=1727781543",
      label: "Accessories",
    },
  ];

  

  async function fetchSliderImages() {
    const { response, isError } = await makeAPICallWithOutData(
      "get",
      "/crousel/getImages"
    );
    if (isError || !response) {
      toast.error("Network Error");
      return;
    }
    setSlideImages(response?.data?.crousel);
  }

  useEffect(() => {
    fetchSliderImages();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 dark:bg-gray-900 dark:text-gray-200">

      <main className="bg-gray-50 dark:bg-gray-900">
        {/* Hero Section with Carousel */}
        <section className="relative bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            speed={2000}
            loop={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000 }}
            navigation={true}
            className="w-full"
          >
            {sliderImages.map((value: SwiperSlideType) => (
              <SwiperSlide key={value.id}>
                <div
                  className="relative bg-cover bg-center h-[70vh] flex items-center justify-center"
                  style={{
                    backgroundImage: `url(${value.imageUrl})`,
                    width: "100%",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-white dark:bg-gray-800">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Explore Our Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {caregoryobj.map((item, idx) => (
              <div
                key={idx}
                className="relative overflow-hidden rounded-lg shadow-lg"
              >
                <img
                  src={item.img}
                  alt={item.label}
                  className="h-90 w-full object-cover hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-bold">{item.label}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-16 bg-gray-100 dark:bg-gray-800">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Featured Products
          </h2>
         
          <CartPage></CartPage>
        </section>

        {/* Footer Section */}
        <section>
          <Footer />
        </section>
      </main>
    </div>
  );
};

export default HomePage;
