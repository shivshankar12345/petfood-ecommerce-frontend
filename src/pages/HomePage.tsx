import React from 'react';


const HomePage: React.FC = () => {
  return (
    <div>
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <section className="text-center p-8">
    <h1 className="text-4xl font-bold mb-4">Welcome to Supertails!</h1>
    <p className="text-lg mb-6">
                            Your one-stop destination for all pet food and supplies. 
                            Discover our range of products to keep your pets happy and healthy.
    </p>
    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
                            Shop Now
    </button>
    </section>
     
                    <section className="mt-12">
    <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Example product cards (replace with dynamic data) */}
    <div className="border rounded-lg p-4 bg-white shadow-md">
    <img src="/path/to/product1.jpg" alt="Product 1" className="h-40 w-full object-cover rounded-md" />
    <h3 className="mt-2 text-lg font-bold">Product 1</h3>
    <p className="text-gray-600">$19.99</p>
    </div>
    <div className="border rounded-lg p-4 bg-white shadow-md">
    <img src="/path/to/product2.jpg" alt="Product 2" className="h-40 w-full object-cover rounded-md" />
    <h3 className="mt-2 text-lg font-bold">Product 2</h3>
    <p className="text-gray-600">$29.99</p>
    </div>
    <div className="border rounded-lg p-4 bg-white shadow-md">
    <img src="/path/to/product3.jpg" alt="Product 3" className="h-40 w-full object-cover rounded-md" />
    <h3 className="mt-2 text-lg font-bold">Product 3</h3>
    <p className="text-gray-600">$39.99</p>
    </div>
    </div>
    </section>
    </main>
    </div>
        );
};

export default HomePage;