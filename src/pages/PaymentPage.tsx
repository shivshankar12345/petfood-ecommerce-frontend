// import React from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";

// interface PaymentData {
//   paymentMode: "CreditCard" | "DebitCard" | "NetBanking" | "UPI" | "COD";
//   cardNumber?: string;
//   cardHolderName?: string;
//   expiryDate?: string;
//   cvv?: string;
//   upiId?: string;
//   bankName?: string;
// }

// const PaymentPage = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<PaymentData>();

//   const onSubmit = (data: PaymentData) => {
//     console.log("Payment Data:", data);

//     // Placeholder for API call for payment
//     // axios.post('/api/payment', data)
//     //   .then(response => {
//     //     toast.success('Payment successful!');
//     //   })
//     //   .catch(error => {
//     //     toast.error('Payment failed. Please try again.');
//     //   });

//     toast.success("Payment details submitted successfully!");
//   };

//   return (
//     <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white shadow-lg rounded-lg">
//       <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
//         Payment Options
//       </h2>
//       <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
//         <div className="grid gap-4">
//           <label className="block text-sm font-medium text-gray-700">
//             Select Payment Method <span className="text-red-500">*</span>
//           </label>
//           <select
//             {...register("paymentMode", { required: "Please select a payment method" })}
//             className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
//           >
//             <option value="">--Select Payment Mode--</option>
//             <option value="CreditCard">Credit Card</option>
//             <option value="DebitCard">Debit Card</option>
//             <option value="NetBanking">Net Banking</option>
//             <option value="UPI">UPI</option>
//             <option value="COD">Cash on Delivery</option>
//           </select>
//           {errors.paymentMode && <p className="text-red-500 text-sm mt-1">{errors.paymentMode.message}</p>}
//         </div>

//         {/* Credit/Debit Card Details */}
//         <div>
//           <h3 className="text-xl font-bold text-gray-800 mb-2">Card Details</h3>
//           <div className="grid md:grid-cols-2 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Card Number</label>
//               <input
//                 type="text"
//                 {...register("cardNumber")}
//                 placeholder="Enter card number"
//                 className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Card Holder Name</label>
//               <input
//                 type="text"
//                 {...register("cardHolderName")}
//                 placeholder="Enter cardholder name"
//                 className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
//               />
//             </div>
//           </div>
//           <div className="grid md:grid-cols-2 gap-6 mt-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
//               <input
//                 type="text"
//                 {...register("expiryDate")}
//                 placeholder="MM/YY"
//                 className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">CVV</label>
//               <input
//                 type="text"
//                 {...register("cvv")}
//                 placeholder="CVV"
//                 className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
//               />
//             </div>
//           </div>
//         </div>

//         {/* UPI Payment */}
//         <div>
//           <h3 className="text-xl font-bold text-gray-800 mb-2">UPI Details</h3>
//           <label className="block text-sm font-medium text-gray-700">UPI ID</label>
//           <input
//             type="text"
//             {...register("upiId")}
//             placeholder="Enter UPI ID"
//             className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
//           />
//         </div>

//         {/* Net Banking */}
//         <div>
//           <h3 className="text-xl font-bold text-gray-800 mb-2">Net Banking</h3>
//           <label className="block text-sm font-medium text-gray-700">Bank Name</label>
//           <input
//             type="text"
//             {...register("bankName")}
//             placeholder="Enter bank name"
//             className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-md font-semibold hover:bg-gradient-to-l transition-transform transform hover:scale-105"
//         >
//           Submit Payment
//         </button>
//       </form>
//     </div>
//   );
// };

// export default PaymentPage;


import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface PaymentData {
  paymentMode: "CreditCard" | "DebitCard" | "NetBanking" | "UPI" | "COD";
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cvv: string;
  upiId: string;
  bankName: string;
}

const PaymentPage = () => {
  const [selectedPaymentMode, setSelectedPaymentMode] = useState<PaymentData["paymentMode"]>("COD");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PaymentData>();

  const onSubmit = (data: PaymentData) => {
    console.log("Payment Data:", data);

       // Placeholder for API call for payment
    // axios.post('/api/payment', data)
    //   .then(response => {
    //     toast.success('Payment successful!');
    //   })
    //   .catch(error => {
    //     toast.error('Payment failed. Please try again.');
    //   });


    toast.success("Payment details submitted successfully!");
  };

  const handlePaymentModeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPaymentMode(event.target.value as PaymentData["paymentMode"]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-10 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
        Payment Options
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6">
        <div className="grid gap-4">
          <label className="block text-sm font-medium text-gray-700">
            Select Payment Method <span className="text-red-500">*</span>
          </label>
          <select
            {...register("paymentMode", { required: "Please select a payment method" })}
            value={selectedPaymentMode}
            onChange={handlePaymentModeChange}
            className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
          >
            <option value="CreditCard">Credit Card</option>
            <option value="DebitCard">Debit Card</option>
            <option value="NetBanking">Net Banking</option>
            <option value="UPI">UPI</option>
            <option value="COD">Cash on Delivery</option>
          </select>
          {errors.paymentMode && (
            <p className="text-red-500 text-sm mt-1">{errors.paymentMode.message}</p>
          )}
        </div>

        {/* Conditionally Render Fields Based on Payment Mode */}
        {selectedPaymentMode === "CreditCard" || selectedPaymentMode === "DebitCard" ? (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Card Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Card Number</label>
                <input
                  type="text"
                  {...register("cardNumber", { required: "Card Number is required" })}
                  placeholder="Enter card number"
                  className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
                {errors.cardNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.cardNumber.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Card Holder Name</label>
                <input
                  type="text"
                  {...register("cardHolderName", { required: "Card Holder Name is required" })}
                  placeholder="Enter cardholder name"
                  className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
                {errors.cardHolderName && (
                  <p className="text-red-500 text-sm mt-1">{errors.cardHolderName.message}</p>
                )}
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  type="text"
                  {...register("expiryDate", { required: "Expiry Date is required" })}
                  placeholder="MM/YY"
                  className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
                {errors.expiryDate && (
                  <p className="text-red-500 text-sm mt-1">{errors.expiryDate.message}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">CVV</label>
                <input
                  type="text"
                  {...register("cvv", { required: "CVV is required" })}
                  placeholder="CVV"
                  className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
                {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv.message}</p>}
              </div>
            </div>
          </div>
        ) : selectedPaymentMode === "UPI" ? (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">UPI Details</h3>
            <label className="block text-sm font-medium text-gray-700">UPI ID</label>
            <input
              type="text"
              {...register("upiId", { required: "UPI ID is required" })}
              placeholder="Enter UPI ID"
              className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            {errors.upiId && <p className="text-red-500 text-sm mt-1">{errors.upiId.message}</p>}
          </div>
        ) : selectedPaymentMode === "NetBanking" ? (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Net Banking</h3>
            <label className="block text-sm font-medium text-gray-700">Bank Name</label>
            <input
              type="text"
              {...register("bankName", { required: "Bank Name is required" })}
              placeholder="Enter bank name"
              className="mt-2 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
            {errors.bankName && <p className="text-red-500 text-sm mt-1">{errors.bankName.message}</p>}
          </div>
        ) : (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Cash on Delivery</h3>
            <p className="text-gray-700">No additional details are required for COD.</p>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-md font-semibold hover:bg-gradient-to-l transition-transform transform hover:scale-105"
        >
          Submit Payment
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
