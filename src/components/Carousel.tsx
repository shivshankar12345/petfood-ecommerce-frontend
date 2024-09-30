import { useState } from "react";

const Carousel:React.FC = () => {
    //   const [images, setImages] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Fetch images from backend
//   useEffect(() => {
//     const fetchImages = async () => {
//       try {
//         const response = await axios.get("your-backend-endpoint");
//         setImages(response.data); // Assuming the data is an array of image URLs
//       } catch (error) {
//         console.error("Error fetching images:", error);
//       }
//     };

//     fetchImages();
//   }, []);
  // Static array of image URLs for now
  const images = [
    "https://via.placeholder.com/1920x1080?text=Image+1",
    "https://via.placeholder.com/1920x1080?text=Image+2",
    "https://via.placeholder.com/1920x1080?text=Image+3",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to go to the next image
  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Function to go to the previous image
  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-screen mx-auto overflow-hidden">
      {images.length > 0 ? (
        <div className="relative">
          {/* Carousel Image */}
          <img
            src={images[currentIndex]}
            alt={`Slide ${currentIndex}`}
            className="w-screen h-48 sm:h-64 md:h-80 object-cover"
          />

          {/* Previous Button */}
          <button
            onClick={prevImage}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
          >
            &#10094; {/* Left arrow */}
          </button>

          {/* Next Button */}
          <button
            onClick={nextImage}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 focus:outline-none"
          >
            &#10095; {/* Right arrow */}
          </button>

          {/* Dots/Indicators */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full ${
                  currentIndex === index ? "bg-white" : "bg-gray-400"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      ) : (
        <p>Loading images...</p>
      )}
    </div>
  );
};

export default Carousel;


