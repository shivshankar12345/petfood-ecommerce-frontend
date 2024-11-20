import { useEffect, useState } from "react";
import Footer from "../../components/Footer";

interface FAQItem {
    question: string;
    answer: string;
  }

const CouponFAQ = () => {
    const [faqData, setFaqData] = useState<FAQItem[]>([]);
    const [openIndex, setOpenIndex] = useState<number | null>(null);
  
    // Static FAQ data (for now)
    const staticFAQData: FAQItem[] = [
      {
        question: "How do I apply a coupon to my order?",
        answer: "You can apply a coupon on the cart page before placing the order"
      },
      {
        question: "Where can I check the coupons/offers for my order?",
        answer: "Explore our exclusive Offers Zone on the Home Page, where you can select from a range of deals and enjoy the best discounts available every day."
      },
      {
        question: "My coupon is not working",
        answer: "Coupon codes are subject to terms and conditions (product/brand/cart value-specific coupons), so please make sure you've reviewed them and that the coupon is applicable to your order. If the issue still persists, please contact our support team at 18005723575 or email at support@supertails.com"
      },
      {
        question: "How do Bank Offers work?",
        answer: "Kindly visit the bank offers page located on the Home page or within the Offers Zone To avail the offer, ensure that you pay for your order using the Debit / Credit card specific to the bank offer."
      },
      {
        question: "Can I get brand-level offers?",
        answer: "Discover exclusive brand offers for Supertails available on the Home page or on the Offers Zone page, where you can explore and apply them to your order"
      },
      
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
    <h1 className="text-3xl font-extrabold mb-6 text-center text-indigo-600">Coupons & Discount</h1>
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

  )
}

export default CouponFAQ