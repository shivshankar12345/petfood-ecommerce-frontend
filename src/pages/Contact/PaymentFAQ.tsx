import { useEffect, useState } from "react";
import Footer from "../../components/Footer";

interface FAQItem {
    question: string;
    answer: string;
  }

const PaymentFAQ=()=>{
    const [faqData, setFaqData] = useState<FAQItem[]>([]);
    const [openIndex, setOpenIndex] = useState<number | null>(null);
  
    // Static FAQ data (for now)
    const staticFAQData: FAQItem[] = [
      {
        question: "Unable to make payments",
        answer: "If you're experiencing difficulty paying for your order,1.Check your internet connectivity 2.Double-check your payment information (Card number, expiration date, CVV)3.Clear your browser cache and cookies 4.Try for a different mode of payment (UPI / Netbanking / Credit Debit Cards / COD)"
      },
      {
        question: "Modes of payment",
        answer: "We accept online payments through all major Credit/Debit Cards (Visa, Mastercard), UPI (Google pay, PhonePe, Paytm), Net banking. EMI options on several credit cards are available. The payment has to be made in India Rupees, as per the final invoice."
      },
      {
        question: "What happens in case of a payment failure?",
        answer: "In case of any payment failures and charges incurred, the refund will be routed through the payment gateway to the source account within 5-7 working days."
      },
      {
        question: "My money got debited but the order did not get confirmed",
        answer: "In case your money has been debited and the order did not get confirmed, the amount will either get auto-refunded or a subsequent order will be automatically placed within 30 mins from the time of the transaction. If none of this occurs, please contact our support team at 18005723575 or Email at support@supertails.com"
      },
      {
        question: "When will I get my refund?",
        answer: "The maximum turnaround time for Credit / Debit card / Netbanking refund is between 5-7 working days from the processing date. UPI refunds usually happen within 24 hrs. Refund Policy"
      },
      {
        question: "How do I get a refund for my COD order?",
        answer: "Please contact our support team and we will help you receive a refund for your cash on delivery refund. Kindly note, that refunds cannot be processed in the form of cash (even for cash on delivery orders)"
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
    <h1 className="text-3xl font-extrabold mb-6 text-center text-indigo-600">Payments & Refunds FAQ</h1>
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

export default PaymentFAQ;