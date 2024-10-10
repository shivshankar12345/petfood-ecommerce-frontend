import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Welcome Section */}
      <div
        className="text-center text-white bg-cover bg-center bg-no-repeat bg-opacity-50 p-8 rounded"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1592194996308-cfbd2e8b3293?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')`,
          height: '60vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg">
          Welcome to PetFood Haven
        </h1>
        <p className="text-xl mb-6 font-light">
          Everything your pet needs, delivered to your door!
        </p>
        <button className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition duration-300 text-lg font-bold">
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
            {/* Carousel Slide 1 */}
            <SwiperSlide>
              <div
                className="relative bg-cover bg-center h-[70vh] flex items-center justify-center"
                style={{
                  backgroundImage:
                    'url("https://supertails.com/cdn/shop/files/12th_oct_web_2-min_1600x.png?v=1728541127")',
                  backgroundSize: 'contain',
                }}
              ></div>
            </SwiperSlide>

            {/* Carousel Slide 2 */}
            <SwiperSlide>
              <div
                className="relative bg-cover bg-center h-[70vh] flex items-center justify-center"
                style={{
                  backgroundImage:
                    'url("https://supertails.com/cdn/shop/files/9th_oct_web_3-min_1600x.png?v=1728450246")',
                  backgroundSize: 'contain',
                }}
              ></div>
            </SwiperSlide>

            {/* Carousel Slide 3 */}
            <SwiperSlide>
              <div
                className="relative bg-cover bg-center h-[70vh] flex items-center justify-center"
                style={{
                  backgroundImage:
                    'url("https://supertails.com/cdn/shop/files/9th_oct_web_5-min_1600x.png?v=1728450245")',
                  backgroundSize: 'contain',
                }}
              ></div>
            </SwiperSlide>
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
                src="https://example.com/dog-food-image.jpg"
                alt="Dog Food"
                className="h-60 w-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">Dog Food</h3>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://example.com/cat-food-image.jpg"
                alt="Cat Food"
                className="h-60 w-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">Cat Food</h3>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <img
                src="https://example.com/accessories-image.jpg"
                alt="Accessories"
                className="h-60 w-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <h3 className="text-white text-2xl font-bold">Accessories</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 bg-gray-100">
          <h2 className="text-3xl font-semibold text-center mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="border rounded-lg p-4 bg-white shadow-md">
              <img
                src="https://example.com/featured-product1.jpg"
                alt="Product 1"
                className="h-40 w-full object-cover rounded-md"
              />
              <h3 className="mt-2 text-lg font-bold">Delicious Dog Treats</h3>
              <p className="text-gray-600">$19.99</p>
              <button className="bg-orange-500 text-white px-4 py-2 mt-4 rounded hover:bg-orange-600 transition duration-300">
                Add to Cart
              </button>
            </div>
            <div className="border rounded-lg p-4 bg-white shadow-md">
              <img
                src="https://example.com/featured-product2.jpg"
                alt="Product 2"
                className="h-40 w-full object-cover rounded-md"
              />
              <h3 className="mt-2 text-lg font-bold">Premium Cat Food</h3>
              <p className="text-gray-600">$29.99</p>
              <button className="bg-orange-500 text-white px-4 py-2 mt-4 rounded hover:bg-orange-600 transition duration-300">
                Add to Cart
              </button>
            </div>
            <div className="border rounded-lg p-4 bg-white shadow-md">
              <img
                src="https://example.com/featured-product3.jpg"
                alt="Product 3"
                className="h-40 w-full object-cover rounded-md"
              />
              <h3 className="mt-2 text-lg font-bold">Pet Accessories Set</h3>
              <p className="text-gray-600">$39.99</p>
              <button className="bg-orange-500 text-white px-4 py-2 mt-4 rounded hover:bg-orange-600 transition duration-300">
                Add to Cart
              </button>
            </div>
            <div className="border rounded-lg p-4 bg-white shadow-md">
              <img
                src="https://example.com/featured-product4.jpg"
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



