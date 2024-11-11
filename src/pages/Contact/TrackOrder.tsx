import React, { useState } from 'react';

type OrderStatus = 'Order Placed' | 'Shipped' | 'Out for Delivery' | 'Delivered';

interface OrderDetails {
  orderId: string;
  orderDate: string;
  expectedDelivery: string;
  items: string;
  total: string;
  status: OrderStatus;
}

const mockOrder: OrderDetails = {
  orderId: '#12345',
  orderDate: 'Oct 25, 2024',
  expectedDelivery: 'Nov 5, 2024',
  items: 'Dog Food, Cat Treats',
  total: '$35.00',
  status: 'Out for Delivery',
};

const TrackOrder: React.FC = () => {
  const [orderID, setOrderID] = useState<string>('');
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  const handleTrackOrder = () => {
    if (orderID) {
      setOrderDetails(mockOrder);
    }
  };

  const renderStatus = (status: OrderStatus) => {
    const statuses = ['Order Placed', 'Shipped', 'Out for Delivery', 'Delivered'];
    const currentIndex = statuses.indexOf(status) + 1;
    const progressPercentage = currentIndex >= 0 ? (currentIndex / statuses.length) * 100 : 0;

    return (
      <div>
        <div className="flex items-center justify-between mb-6 flex-wrap">
          {statuses.map((step, index) => (
            <div key={index} className="text-center mb-2 sm:mb-0 sm:flex-1">
              <div
                className={`w-10 h-10 ${
                  index <= currentIndex - 1 ? 'bg-blue-500' : 'bg-gray-300'
                } rounded-full flex items-center justify-center text-white font-semibold mx-auto`}
              >
                {index + 1}
              </div>
              <p
                className={`text-sm mt-2 ${
                  index <= currentIndex - 1 ? 'text-gray-700' : 'text-gray-500'
                }`}
              >
                {step}
              </p>
            </div>
          ))}
        </div>
        <div className="relative w-full h-2 bg-gray-300 rounded">
          <div
            className="absolute top-0 h-2 bg-blue-500 rounded"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto py-10 px-4 sm:px-8">
      <h1 className="text-2xl sm:text-3xl font-semibold text-center text-gray-800 mb-6">Track Your Order</h1>

      {/* Order ID Input */}
      <div className="flex flex-col sm:flex-row items-center mb-8 gap-2">
        <input
          type="text"
          placeholder="Enter your Order ID"
          value={orderID}
          onChange={(e) => setOrderID(e.target.value)}
          className="w-full sm:w-auto flex-1 px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring focus:border-blue-400"
        />
        <button
          onClick={handleTrackOrder}
          className="w-full sm:w-auto px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Track
        </button>
      </div>

      {/* Order Details Card */}
      {orderDetails && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Order Details</h2>
          <div className="space-y-2 text-sm sm:text-base">
            <p className="text-gray-600">
              <span className="font-semibold">Order ID:</span> {orderDetails.orderId}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Order Date:</span> {orderDetails.orderDate}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Expected Delivery:</span> {orderDetails.expectedDelivery}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Items:</span> {orderDetails.items}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Total:</span> {orderDetails.total}
            </p>
          </div>
        </div>
      )}

      {/* Order Progress Tracker */}
      {orderDetails && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Order Status</h2>
          {renderStatus(orderDetails.status)}
        </div>
      )}
    </div>
  );
};

export default TrackOrder;
