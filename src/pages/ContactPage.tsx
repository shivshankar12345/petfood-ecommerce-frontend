import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignInAlt,
  faPhoneAlt,
  faTruck,
  faUndoAlt,
  faMoneyBillWave,
  faTags,
  faQuestionCircle,
  faHeadset,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { RootState } from "../Redux/store";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";

interface formInput {
  name: string;
  email: string;
  message: string;
}

const Contact = () => {
  const { role, isAuth } = useSelector((state: RootState) => state.auth);

  // Initializing react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formInput>();

  // Handle form submission using react-hook-form
  const onSubmit = (data: any) => {
    // Logic to send form data, like an API call
    console.log("Form Data: ", data);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">
      <div className="container mx-auto py-12 px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Contact Us
        </h2>

        {/* Help Section */}
        {!isAuth && (
          <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Getting help is easy
            </h3>
            <p className="text-gray-600 mb-6">
              Sign in to get help with recent orders
            </p>
            <button className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition-colors">
              <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
              SIGN IN
            </button>
          </div>
        )}

        {/* Quick Links Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Quick links
          </h3>
          <ul className="space-y-4 text-gray-600">
            <li>
              <a href="/track-order" className="hover:underline text-teal-500">
                <FontAwesomeIcon icon={faTruck} className="mr-2" />
                Track order
              </a>{" "}
              - View the status of your order
            </li>
            <li>
              <a href="/return-order" className="hover:underline text-teal-500">
                <FontAwesomeIcon icon={faUndoAlt} className="mr-2" />
                Return order
              </a>{" "}
              - Return and view items in your order
            </li>
            <li>
              <a href="/chat-vet" className="hover:underline text-teal-500">
                <FontAwesomeIcon icon={faHeadset} className="mr-2" />
                Chat with a vet
              </a>{" "}
              - Get expert advice from our vets
            </li>
          </ul>
        </div>
        {/* Browse Topics Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Browse Topics
          </h3>
          <ul className="space-y-4 text-gray-600">
            <li>
              <a href="/orders" className="hover:underline text-teal-500">
                <FontAwesomeIcon icon={faTruck} className="mr-2" />
                Order related
              </a>
            </li>
            <li>
              <a
                href="/returns-cancellations"
                className="hover:underline text-teal-500"
              >
                <FontAwesomeIcon icon={faUndoAlt} className="mr-2" />
                Returns & cancellations related
              </a>
            </li>
            <li>
              <a
                href="/payments-refunds"
                className="hover:underline text-teal-500"
              >
                <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2" />
                Payments & refunds related
              </a>
            </li>
            <li>
              <a
                href="/coupons-discounts"
                className="hover:underline text-teal-500"
              >
                <FontAwesomeIcon icon={faTags} className="mr-2" />
                Coupons & discounts related
              </a>
            </li>
            <li>
              <a
                href="/general-enquiry"
                className="hover:underline text-teal-500"
              >
                <FontAwesomeIcon icon={faQuestionCircle} className="mr-2" />
                General enquiry
              </a>
            </li>
          </ul>
        </div>

        {/* Get in Touch Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Get in touch
          </h3>
          <p className="text-gray-600 mb-2">
            If you have any inquiries, feel free to
          </p>
          <p className="text-gray-600">
            <FontAwesomeIcon
              icon={faWhatsapp}
              className="text-green-500 mr-2"
            />
            WhatsApp us at{" "}
            <a
              href="tel:+18005723575"
              className="text-teal-500 hover:underline"
            >
              +1800-5723-575
            </a>
          </p>
          <p className="text-gray-600">
            <FontAwesomeIcon icon={faPhoneAlt} className="mr-2" />
            Call us at{" "}
            <a href="tel:18005723575" className="text-teal-500 hover:underline">
              1800-5723-575
            </a>
          </p>
          <p className="text-gray-600">
            <FontAwesomeIcon icon={faEnvelope} className="text-teal-500 mr-2" />
            Email us at{" "}
            <a
              href="mailto:support@supertails.com"
              className="text-teal-500 hover:underline"
            >
              support@supertails.com
            </a>
          </p>
        </div>

        {/* Become a Seller Section */}
        {role === "customer" ? (
          <>
            {" "}
            <div className="bg-white p-8 rounded-lg shadow-lg mt-8">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                Become a seller
              </h3>
              <p className="text-gray-600">
                List all your products on Supertails.
              </p>

              <button className="mt-4 bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition-colors">
                Become a Seller
              </button>
            </div>
          </>
        ) : (
          <></>
        )}

        {/* Contact Form Section */}
        <div className="bg-white p-8 rounded-lg shadow-lg mt-8">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">
            Send us a message
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-600">
                Name
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Name is required" })}
                className="w-full border border-gray-300 rounded-md p-2 mt-1"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-600">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email",
                  },
                })}
                className="w-full border border-gray-300 rounded-md p-2 mt-1"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-600">
                Message
              </label>
              <textarea
                id="message"
                {...register("message", { required: "Message is required" })}
                className="w-full border border-gray-300 rounded-md p-2 mt-1"
                rows={5}
              ></textarea>
              {errors.message && (
                <p className="text-red-500">{errors.message.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="bg-teal-500 text-white py-2 px-4 rounded-md hover:bg-teal-600 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Include Footer component */}
      <Footer />
    </div>
  );
};

export default Contact;
