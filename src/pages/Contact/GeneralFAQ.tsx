import { useEffect, useState } from "react";
import Footer from "../../components/Footer";

interface FAQItem {
    question: string;
    answer: string;
  }

const GeneralFAQ = () => {
    const [faqData, setFaqData] = useState<FAQItem[]>([]);
    const [openIndex, setOpenIndex] = useState<number | null>(null);
  
    // Static FAQ data (for now)
    const staticFAQData: FAQItem[] = [
      {
        question: "How do I create an account on Supertails?",
        answer: "Our account creation process is seamless, allowing you to sign up via OTP. Once logged in, you can enter your name, email address, and shipping details, enabling you to place orders for your furry friend effortlessly."
      },
      {
        question: "Is Supertails available across the country?",
        answer: "Our services are accessible nationwide. To confirm service availability in your area, please input your PIN code in the Check delivery date section provided under the product display page."
      },
      {
        question: "Do I need to pay any Shipping charge for the delivery?",
        answer: "A flat delivery charge of Rs.49 is applicable on all deliveries below Rs 700"
      },
      {
        question: "Are there any extra charges for my cash on delivery order?",
        answer: "Shipping charges of Rs 19 are applicable on cash on delivery orders. Please note we accept cash only for order value between Rs 700 and Rs 5000."
      },
      {
        question: "How do I update contact details on my account?",
        answer: "Regrettably, we currently do not offer the option to update contact details on the account. Please contact our support team at 18005723575 or Email at support@supertails.com for further assistance."
      },
      {
        question: "How do I update my Shipping details?",
        answer: "You have the flexibility to edit, add, or remove addresses from the Address section located on the My Account page"
      },
      {
        question: "How do I update my Email address?",
        answer: "Regrettably, we currently do not offer the option to update email addresses on the account. Please contact our support team at 18005723575 or email at support@supertails.com for further assistance."
      },
      {
        question: "Can I modify my shipping address after placing an order?",
        answer: "Sorry, this option is currently not available. You can always cancel the order before it has been shipped and place a new order. Don't worry, there are no cancellation charges."
      },
      {
        question: "Do you do same-day delivery",
        answer: "Yes, we offer 120 minutes (for eligible pin codes in Bangalore) and same-day deliveries in metro cities by 9 pm."
      },
      {
        question: "Do you have an offline store?",
        answer: "We will soon be available with offline stores in Bangalore and other metro cities."
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
    <h1 className="text-3xl font-extrabold mb-6 text-center text-indigo-600">General Enquiry</h1>
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

export default GeneralFAQ