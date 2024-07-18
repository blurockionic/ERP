import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-black pt-8">
      <div className="container mx-auto flex flex-wrap justify-between">
        {/* Company Name and Services */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Order Management System</h2>
          <ul>
            <li className="mb-2">Service 1</li>
            <li className="mb-2">Service 2</li>
            <li className="mb-2">Service 3</li>
            <li className="mb-2">Service 4</li>
          </ul>
        </div>

        {/* About Us */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">About Us</h2>
          <p>
            Order Management System is a leading provider of innovative solutions.
            Our mission is to deliver high-quality services that help businesses
            thrive.
          </p>
        </div>

        {/* Company Location */}
        <div className="w-full md:w-1/3 mb-6 md:mb-0 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4">Location</h2>
          <p>123 Main Street</p>
          <p>Suite 100</p>
          <p>City, State, ZIP</p>
          <p>Country</p>
        </div>
      </div>
      <div className="bg-gray-100 py-4 text-center text-black">
        <p>&copy; 2023 Burock Infinity Technology. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
