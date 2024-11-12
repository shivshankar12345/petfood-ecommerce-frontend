import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../Redux/Slice/spinner.slice";
import useApi from "../hooks/useApi";
import { RootState } from "../Redux/store";
import { setProducts } from "../Redux/Slice/Product.slice";

const { makeAPICallWithOutData } = useApi();
const fetchProducts = async (
  dispatch: any
) => {
  dispatch(startLoading());

  try {
    const { isError, response, error } = await makeAPICallWithOutData(
      "get",
      `/products/getAllproducts`
    );

    if (isError) {
      console.error(error?.message || "Failed to fetch products");
    } else {
      const { data } = response?.data || {};
      dispatch(setProducts(data || []));
    }
  } catch (err) {
    console.error("An unexpected error occurred", err);
  } finally {
    dispatch(stopLoading());
  }
};

const CartPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state: RootState) => state.products.products); 
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    fetchProducts( dispatch);
  }, [ dispatch]);

  const handleAddToCart = (product: any) => {
    setCart(prevCart => [...prevCart, product]);
  };

  return (
    <section className="py-16 bg-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {products.map((product: any) => (
          <div
            key={product.id}
            className="border rounded-lg p-6 bg-white shadow-lg transform transition-transform duration-300 hover:scale-105 relative"
          >
            {/* Discount Label */}
            <span className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 text-xs rounded">
              15% OFF
            </span>

            {/* Product Image */}
            <div>
              <img
                src={product.imageUrl}
                alt={product.name}
                className="h-40 w-full object-cover rounded-md"
              />
            </div>

            {/* Rating */}
            <div className="flex items-center mt-4">
              <svg
                className="w-4 h-4 fill-current text-yellow-500"
                viewBox="0 0 24 24"
              >
                <path d="M12 .587l3.668 7.568L24 9.748l-6 5.844L19.8 24 12 20.142 4.2 24l1.8-8.408L0 9.748l8.332-1.593L12 .587z" />
              </svg>
          
            </div>

            {/* Product Title */}
            <div className="mt-2">
              <h3 className="text-lg font-bold">{product.name}</h3>

              {/* Price */}
              <p className="text-gray-500 mt-1">
                <span >
                  ${Number(product.price).toFixed(2)}
                </span>
           
              </p>

              {/* Stock Availability */}
              <p className="text-sm text-green-500 mt-1">
               "In Stock" 
              </p>

              {/* Add to Cart Button */}
              <div className="flex items-center justify-between mt-6">
                <button
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition duration-300"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Summary Section */}
      {cart.length > 0 && (
        <div className="mt-8 max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-md">
          <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between py-2">
                <span>{item.name}</span>
                <span>${item.discountedPrice.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between mt-4 font-bold">
            <span>Total:</span>
            <span>
              $
              {cart
                .reduce((total, item) => total + item.discountedPrice, 0)
                .toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </section>
  );
};
export default CartPage;
