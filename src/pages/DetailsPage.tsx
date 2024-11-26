import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface FormData {
  houseNum?: string;
  street: string;
  landmark: string;
  area: string;
  pinCode: string;
  city: string;
  state: string;
  name: string;
  phone: string;
  addressType: "Home" | "Work";
}

const DetailsPage = () => {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const fetchCityAndState = async (pinCode: string) => {
    try {
      const { data } = await axios.get(`https://api.postalpincode.in/pincode/${pinCode}`);
      if (data && data[0].Status === "Success") {
        const postOffice = data[0].PostOffice[0];
        setCity(postOffice.District);
        setState(postOffice.State);
        setValue("city", postOffice.District, { shouldValidate: true });
        setValue("state", postOffice.State, { shouldValidate: true });
      } else {
        toast.error("Invalid Pin Code");
      }
    } catch (error) {
      toast.error("Failed to fetch city and state. Try again.");
    }
  };

  const onSubmit = (data: FormData) => {
    console.log("Form Data:", data);
    toast.success("Address submitted successfully!");
    navigate("/payment-details");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Enter Address Details
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">House Number (Optional)</label>
            <input
              type="text"
              {...register("houseNum")}
              className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Street <span className="text-red-500">*</span></label>
            <input
              type="text"
              {...register("street", { required: "Street is required" })}
              className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street.message}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Landmark <span className="text-red-500">*</span></label>
            <input
              type="text"
              {...register("landmark", { required: "Landmark is required" })}
              className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            {errors.landmark && <p className="text-red-500 text-sm mt-1">{errors.landmark.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Area <span className="text-red-500">*</span></label>
            <input
              type="text"
              {...register("area", { required: "Area is required" })}
              className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area.message}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Pin Code <span className="text-red-500">*</span></label>
            <input
              type="text"
              {...register("pinCode", {
                required: "Pin Code is required",
                pattern: {
                  value: /^\d{6}$/,
                  message: "Pin Code must be 6 digits",
                },
                onBlur: (e) => fetchCityAndState(e.target.value),
              })}
              className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            {errors.pinCode && <p className="text-red-500 text-sm mt-1">{errors.pinCode.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              {...register("city")}
              value={city}
              readOnly
              className="mt-2 w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">State</label>
            <input
              type="text"
              {...register("state")}
              value={state}
              readOnly
              className="mt-2 w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone <span className="text-red-500">*</span></label>
            <input
              type="text"
              {...register("phone", {
                required: "Phone is required",
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone must be 10 digits",
                },
              })}
              className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address Type</label>
            <select
              {...register("addressType")}
              className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
            >
              <option value="Home">Home</option>
              <option value="Work">Work</option>
            </select>
          </div>
        </div>
         
        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-md font-semibold hover:bg-gradient-to-l transition-transform transform hover:scale-105"
        >
          Submit Address
        </button>
      
      </form>
    </div>
  );
};

export default DetailsPage;

