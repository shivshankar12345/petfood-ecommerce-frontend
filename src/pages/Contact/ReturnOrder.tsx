import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
 
interface OrderDetails {
  orderId: string;
  orderDate: string;
  items: string;
  total: string;
  status: 'Order Placed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
}
 
interface ReturnOrderData {
  reason: string;
  comments: string;
}
 
const mockOrder: OrderDetails = {
  orderId: '#12345',
  orderDate: 'Oct 25, 2024',
  items: 'Dog Food, Cat Treats',
  total: '$35.00',
  status: 'Delivered',
};
 
const ReturnOrder: React.FC = () => {
  const [orderID, setOrderID] = useState<string>('');
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
 
 
  const { register, handleSubmit, reset } = useForm<ReturnOrderData>();
 
 
 
  const handleReturnOrder = () => {
    if (orderID) {
   
      setOrderDetails(mockOrder);
    }
  };
 
  const onSubmit: SubmitHandler<ReturnOrderData> = (data) => {
   
    setOrderDetails(null);
    setOrderID('');
    reset();
    alert('Return request submitted successfully!');
  };
 
  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Return Your Order</h1>
 
      {/* Order ID Input */}
      <div className="flex flex-wrap items-center mb-8 gap-2">
        <input
          type="text"
          placeholder="Enter your Order ID"
          value={orderID}
          onChange={(e) => setOrderID(e.target.value)}
          className="w-full md:w-3/4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
        />
        <button
          onClick={handleReturnOrder}
          className="w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Search
        </button>
      </div>
 
      {/* Order Details and Return Form */}
      {orderDetails && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Order Details</h2>
          <div className="space-y-2 mb-6">
            <p className="text-gray-600"><span className="font-semibold">Order ID:</span> {orderDetails.orderId}</p>
            <p className="text-gray-600"><span className="font-semibold">Order Date:</span> {orderDetails.orderDate}</p>
            <p className="text-gray-600"><span className="font-semibold">Items:</span> {orderDetails.items}</p>
            <p className="text-gray-600"><span className="font-semibold">Total:</span> {orderDetails.total}</p>
          </div>
 
          {/* Return Form */}
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Return Form</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Reason for Return */}
            <div>
              <label htmlFor="reason" className="block text-gray-700 font-medium mb-1">Reason for Return</label>
              <select
                id="reason"
                {...register('reason', { required: 'Please select a reason' })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
              >
                <option value="">Select a reason</option>
                <option value="Damaged">Damaged</option>
                <option value="Wrong Item">Wrong Item</option>
                <option value="Not Needed">Not Needed</option>
                <option value="Other">Other</option>
              </select>
            </div>
 
            {/* Additional Comments */}
            <div>
              <label htmlFor="comments" className="block text-gray-700 font-medium mb-1">Additional Comments</label>
              <textarea
                id="comments"
                {...register('comments')}
                placeholder="Provide additional details if needed"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-400"
                rows={4}
              ></textarea>
            </div>
 
            {/* Return Order Button */}
            <button
              type="submit"
              className="w-full px-6 py-2 mt-4 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
              //disabled={loading}
            >
             Submit Return Request
            </button>
          </form>
        </div>
      )}
 
     
    </div>
  );
};
 
export default ReturnOrder;