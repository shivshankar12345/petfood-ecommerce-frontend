import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";

// Define the structure for FAQ items
interface FAQItem {
  question: string;
  answer: string;
}

const OrderFAQ: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    // Static data for FAQs (for now)
    const staticFAQs: FAQItem[] = [
      {
        question: "How to place an order?",
        answer: "To place an order, browse our products, add items to your cart, and proceed to checkout.",
      },
      {
        question: "How do I track my order?",
        answer: "You can track your order from your account page or by using the tracking link sent to your email.",
      },
      {
        question: "Can I modify my order once it is placed?",
        answer: "Once an order is placed, modifications may not be possible. Please contact customer support for assistance.",
      },
      {
        question: "Items are missing from my order",
        answer: "If items are missing, please reach out to our support team, and we’ll assist you in resolving the issue.",
      },
      {
        question: "Items are damaged/defective?",
        answer: "If you received a damaged or defective item, please contact us for a replacement or refund.",
      },
      {
        question: "Items received are different from what I ordered?",
        answer: "We apologize for any mix-up. Please get in touch with customer service to correct your order.",
      },
      {
        question: "How do I determine the correct size for my pet?",
        answer: "Check the sizing guide available on each product page to choose the correct size for your pet.",
      },
      {
        question: "Size mismatch issue?",
        answer: "If the size doesn’t fit, please refer to our return policy or contact customer support.",
      },
      {
        question: "Not happy with the quality of the product?",
        answer: "Your satisfaction is our priority. Please contact us if you're not satisfied with the product quality.",
      },
      {
        question: "My order is marked delivered but not delivered.",
        answer: "If your order is marked delivered but you haven’t received it, please check with neighbors or contact support.",
      },
      {
        question: "Why is my order split?",
        answer: "Orders may be split due to availability. You'll receive updates for each part of your order as it ships.",
      },
    ];

    // Set static FAQs to state
    setFaqs(staticFAQs);
  }, []);

  // Toggle the answer visibility for a specific question
  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
    <div className="container mx-auto p-4 sm:p-8">
      <h1 className="text-3xl font-extrabold mb-6 text-center text-indigo-600">Order Related FAQs</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
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

export default OrderFAQ;
