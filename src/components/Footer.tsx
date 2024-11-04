import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faPaw, faStethoscope, faCapsules, faPhoneAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faYoutube, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { useEffect, useState } from 'react';
import useApi from '../hooks/useApi';

const Footer = () => {
  const { makeAPICallWithOutData } = useApi();

  // State for storing the contact info
  const [contactInfo, setContactInfo] = useState({
    phone: "",
    email: "",
  });

  // Fetch contact information from the API
  async function fetchContact() {
    const { isError, response } = await makeAPICallWithOutData(
      "get",
      `/admin-panel/contact/getAllContact`
    );
    if (!isError && response?.data) {
      setContactInfo({
        phone: response?.data.contacts?.[0].contact || "Not available",
        email: response.data.contacts?.[2].contact || "Not available",
      });
    }
  }

  // Use useEffect to call fetchContact when the component mounts
  useEffect(() => {
    fetchContact();
  }, []);
  
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        {/* Upper Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12">
          
          {/* Horizontal Icons and Info Section */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faTruck} size="lg" className="text-teal-500" />
              <div>
                <h3 className="text-lg font-semibold">24hr Delivery</h3>
                <p>In 24 cities</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faPaw} size="lg" className="text-teal-500" />
              <h3 className="text-lg font-semibold">1,50,000+ Happy pet parents</h3>
            </div>
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faStethoscope} size="lg" className="text-teal-500" />
              <div>
                <h3 className="text-lg font-semibold">Complimentary vet consult</h3>
                <p>For every new member</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faCapsules} size="lg" className="text-teal-500" />
              <div>
                <h3 className="text-lg font-semibold">Pet Pharmacy</h3>
                <p>Exclusive</p>
              </div>
            </div>
          </div>

          {/* Column 2: Online Shopping */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">ONLINE SHOPPING</h3>
            <ul className="space-y-2">
              <li><a href="/dogs" className="hover:text-teal-500">Dogs</a></li>
              <li><a href="/cats" className="hover:text-teal-500">Cats</a></li>
              <li><a href="/small-pets" className="hover:text-teal-500">Small Pets</a></li>
              <li><a href="/consult-vet" className="hover:text-teal-500">Consult a Vet</a></li>
              <li><a href="/dog-behaviour" className="hover:text-teal-500">Dog Behaviour</a></li>
              <li><a href="/pet-pharmacy" className="hover:text-teal-500">Pet Pharmacy</a></li>
            </ul>
          </div>

          {/* Column 3: Explore */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">EXPLORE</h3>
            <ul className="space-y-2">
              <li><a href="/our-story" className="hover:text-teal-500">Our story</a></li>
              <li><a href="/faqs" className="hover:text-teal-500">FAQs</a></li>
              <li><a href="/blog" className="hover:text-teal-500">Blog</a></li>
              <li><a href="/contact-us" className="hover:text-teal-500">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">QUICK LINKS</h3>
            <ul className="space-y-2">
              <li><a href="/my-account" className="hover:text-teal-500">My Account</a></li>
              <li><a href="/track-order" className="hover:text-teal-500">Track Your Order</a></li>
              <li><a href="/refund-policy" className="hover:text-teal-500">Refund policy</a></li>
              <li><a href="/return-policy" className="hover:text-teal-500">Return policy</a></li>
              <li><a href="/privacy-policy" className="hover:text-teal-500">Privacy Policy</a></li>
              <li><a href="/terms-of-use" className="hover:text-teal-500">Terms of Use</a></li>
              <li><a href="/refer-and-save" className="hover:text-teal-500">Refer and save</a></li>
            </ul>
          </div>


          {/* Column 6: Follow Us & Get in Touch */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Follow us</h3>
            <ul className="space-y-2">
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-500"><FontAwesomeIcon icon={faInstagram} /> Instagram</a></li>
              <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-500"><FontAwesomeIcon icon={faFacebook} /> Facebook</a></li>
              <li><a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-500"><FontAwesomeIcon icon={faYoutube} /> YouTube</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-500"><FontAwesomeIcon icon={faTwitter} /> Twitter</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-500"><FontAwesomeIcon icon={faLinkedin} /> LinkedIn</a></li>
            </ul>

            <h3 className="text-lg font-semibold">Get in touch</h3>
            <p>
              <FontAwesomeIcon icon={faPhoneAlt} className="text-teal-500 mr-2" />
              Call us at <a href="tel:18005723575" className="text-teal-500 hover:underline">:8003398749</a>
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} className="text-teal-500 mr-2" />
              Email us at <a href="mailto:support@supertails.com" className="text-teal-500 hover:underline">:xyz@gmai.com</a>
            </p>
          </div>
        </div>

        {/* Lower Section: Popular Searches */}
        <div className="border-t border-gray-700 pt-6 mt-6">
          <h3 className="text-lg font-semibold mb-4">POPULAR SEARCHES</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm">
            <a href="/dog-food" className="hover:text-teal-500">Dog Food</a>
            <a href="/dog-collars" className="hover:text-teal-500">Dog Collars Leashes Harnesses</a>
            <a href="/me-o" className="hover:text-teal-500">Me-O</a>
            <a href="/cat-clothes" className="hover:text-teal-500">Cat Clothes</a>
            <a href="/cat-litter" className="hover:text-teal-500">Cat Litter</a>
            <a href="/dog-raincoat" className="hover:text-teal-500">Dog Raincoat</a>
            {/* Add more popular search links here */}
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-700 pt-6 mt-6 text-center">
          <p>Supertails head office</p>
          <p>1335, 11th Cross Rd, Stage 3, Indiranagar, Bengaluru, Karnataka 560038</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


