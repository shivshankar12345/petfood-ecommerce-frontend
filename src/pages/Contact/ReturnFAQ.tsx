import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";

// Define the structure for FAQ items
interface FAQItem {
  question: string;
  answer: string;
}

const ReturnsAndCancellationsFAQ: React.FC = () => {
  const [faqData, setFaqData] = useState<FAQItem[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Static FAQ data (for now)
  const staticFAQData: FAQItem[] = [
    {
      question: "How & when can I return my product?",
      answer: "You can return your product within 30 days of receiving it. The product must be unused, in its original packaging, and in the same condition you received it. To initiate the return, please follow the return instructions provided in your order details."
    },
    {
      question: "I want to cancel my order",
      answer: "To cancel your order, you must do so before it is shipped. Once an order has been processed or shipped, it cannot be canceled. If you wish to cancel, please contact our customer support team as soon as possible."
    },
    {
      question: "What if my order is damaged or defective?",
      answer: "If your order arrives damaged or defective, please contact our customer support team within 7 days of receiving the product. We will assist you in returning the product and providing a replacement or refund."
    },
    {
      question: "Can I return sale or clearance items?",
      answer: "Sale and clearance items are final sale and cannot be returned unless they are defective or damaged. Please review the product details to confirm if it is eligible for a return before purchasing."
    },
    {
      question: "How long does it take to process my return?",
      answer: "Returns are typically processed within 7-10 business days after we receive the returned product. You will be notified once your return has been processed."
    },
    {
      question: "Can I return items I bought online in-store?",
      answer: "Returns for online orders cannot be processed in-store. Please return your items using the return instructions provided in your order details."
    }
  ];

  // Simulating API call to fetch FAQ data (commented for future use)
  // useEffect(() => {
  //   const fetchFAQData = async () => {
  //     try {
  //       const response = await fetch('/api/faqs'); // Replace with your backend API
  //       const data = await response.json();
  //       setFaqData(data);
  //     } catch (error) {
  //       console.error('Error fetching FAQ data:', error);
  //     }
  //   };

  //   fetchFAQData();
  // }, []);

  // For now, use static data
  useEffect(() => {
    setFaqData(staticFAQData);
  }, []);

  // Toggle the answer visibility for a specific question
  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
    <div className="container mx-auto p-4 sm:p-8">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-indigo-600">Returns & Cancellations FAQ</h1>
      <div className="space-y-4">
        {faqData.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg shadow-md overflow-hidden"
          >
            <button
              onClick={() => handleToggle(index)}
              className="w-full flex justify-between items-center px-4 py-5 bg-indigo-100 text-indigo-800 font-semibold text-left hover:bg-indigo-200 focus:outline-none transition-colors duration-300"
            >
              <span>{faq.question}</span>
              <span
                className={`transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </button>
            {openIndex === index && (
              <div className="p-4 bg-gray-50 text-gray-700 border-t border-gray-300 transition-all duration-500 ease-in-out">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ReturnsAndCancellationsFAQ;



