import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../Redux/Slice/spinner.slice";
import useApi from "../hooks/useApi";
import { RootState } from "../Redux/store";
import { setProducts } from "../Redux/Slice/Product.slice";
import { Product } from "../types/Product.types";
import { toast } from "react-toastify";

const Cart = () => {
  const { accessToken } = useSelector((state: RootState) => state.auth);
  const { makeAPICallWithOutData, makeAPICallWithData } = useApi();
  const dispatch = useDispatch();
  const [expandedProducts, setExpandedProducts] = useState<
    Record<number, boolean>
  >({});
  const fetchProducts = async () => {
    dispatch(startLoading());

    try {
      const { isError, response, error } = await makeAPICallWithOutData(
        "get",
        `/products/getAllproducts?limit=10`
      );

      if (isError) {
        console.error(error?.message || "Failed to fetch products");
      } else {
        const { data } = response?.data || {};
        console.log("Products data", data);
        dispatch(setProducts(data || []));
      }
    } catch (err) {
      console.error("An unexpected error occurred", err);
    } finally {
      dispatch(stopLoading());
    }
  };
  const products = useSelector((state: RootState) => state.products.products);
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = async (product: Product): Promise<void> => {
    startLoading();
    const { isError, error } = await makeAPICallWithData(
      "post",
      "/cart/addCartItem",
      {
        product_id: product.id,
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    stopLoading();
    if (isError) {
      toast.error(error?.response?.data?.message || "Something went Wrong !!");
    } else {
      toast.success("Item Added to Cart !!");
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
        {products
          .filter(product => product.IsFeatured)
          .map(product => {
            // Function to toggle the expanded state of a specific product
            const toggleExpand = (id: number) => {
              setExpandedProducts(prev => ({
                ...prev,
                [id]: !prev[id],
              }));
            };

            const isExpanded = expandedProducts[(product as any).id] || false;

            const rating = 2.5;
            const fullStars = Math.floor(rating);
            const fraction = rating % 1;

            return (
              <div
                key={product.id}
                className="border rounded-lg p-6 bg-white shadow-md hover:shadow-xl transform transition-transform duration-300 hover:scale-105 relative flex flex-col overflow-hidden"
              >
                {/* Discount Label */}
                <span className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 text-xs font-semibold rounded-lg shadow-md">
                  15% OFF
                </span>

                {/* Product Image */}
                <div className="h-44 w-full overflow-hidden rounded-md mb-4">
                  <img
                    src={(product as any).imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-60"
                  />
                </div>

                {/* Product Details */}
                <div className="flex flex-col justify-between flex-grow mt-2">
                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    <span className="text-gray-700 text-sm font-medium mr-2">
                      {rating.toFixed(1)} / 5
                    </span>

                    {/* Stars */}
                    {[...Array(5)].map((_, index) => (
                      <div
                        className="relative w-5 h-5"
                        key={index}
                        style={{
                          position: "relative",
                          display: "inline-block",
                        }}
                      >
                        {/* Empty Star */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          className="w-5 h-5 text-gray-300"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 17.25l-6.591 3.468 1.255-7.644L.813 9.047l7.719-1.128L12 2l3.468 6.872 7.719 1.128-5.851 4.027 1.255 7.644L12 17.25z"
                          />
                        </svg>

                        {/* Filled Star */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="absolute top-0 left-0 w-full h-full text-yellow-400"
                          style={{
                            clipPath:
                              index < fullStars
                                ? "none"
                                : index === fullStars
                                ? `inset(0 ${100 - fraction * 100}% 0 0)`
                                : "inset(0 100% 0 0)",
                          }}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 17.25l-6.591 3.468 1.255-7.644L.813 9.047l7.719-1.128L12 2l3.468 6.872 7.719 1.128-5.851 4.027 1.255 7.644L12 17.25z"
                          />
                        </svg>
                      </div>
                    ))}
                  </div>

                  {/* Horizontal Divider */}
                  <hr className="border-t border-gray-200 my-2" />

                  {/* Product Title with "See More" and "See Less" */}
                  <div className="mt-2">
                    <h3
                      className={`text-lg font-semibold text-gray-800 ${
                        isExpanded ? "" : "line-clamp-2"
                      }`}
                    >
                      {product.name}
                    </h3>
                    {product.name.length > 50 && (
                      <button
                        className="text-blue-500 text-sm font-medium mt-1"
                        onClick={() => toggleExpand((product as any).id)}
                      >
                        {isExpanded ? "See Less" : "See More"}
                      </button>
                    )}
                  </div>

                  {/* Price */}
                  <p className="mt-3 text-gray-700">
                    <span className="text-green-600 font-bold text-xl">
                      ${Number(product.price).toFixed(2)}
                    </span>
                    <span className="line-through text-gray-400 ml-2 text-sm">
                      $79.99
                    </span>
                  </p>

                  {/* Stock Availability */}
                  <p className="text-sm text-green-500 mt-1 font-medium">
                    In Stock
                  </p>

                  {/* Add to Cart Button */}
                  <div className="mt-4">
                    <button
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-lg hover:bg-gradient-to-l hover:from-red-500 hover:to-orange-500 transition duration-300 font-semibold shadow-md"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};
export default Cart;