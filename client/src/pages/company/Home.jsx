import React, { useState } from "react";
import bg from "../../assets/home_bg.jpg";
import kite from "../../assets/kite.png";
import Footer from "../../components/Footer";
import oms from "../../assets/oms.jpg";
import ems from "../../assets/ems.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with your own logic to handle the subscription (e.g., API call, validation)
    console.log(`Subscribing ${email} to updates...`);
    // Clear the email input after submission
    setEmail("");
  };
  const testimonials = [
    {
      id: 1,
      quote:
        "Working with Company X has been a game-changer for us. Their dedication to quality and innovation is unmatched.",
      name: "John Doe",
      position: "CEO, ABC Inc.",
      image: "https://randomuser.me/api/portraits/men/1.jpg", // Example image URL
    },
    {
      id: 2,
      quote:
        "The team at Company X delivered results beyond our expectations. Highly recommended!",
      name: "Jane Smith",
      position: "Marketing Director, XYZ Corp.",
      image: "https://randomuser.me/api/portraits/women/2.jpg", // Example image URL
    },
    {
      id: 3,
      quote:
        "Exceptional service! Company X truly understands our needs and delivers with precision every time.",
      name: "Michael Johnson",
      position: "COO, PQR Ltd.",
      image: "https://randomuser.me/api/portraits/men/3.jpg", // Example image URL
    },
    {
      id: 3,
      quote:
        "Exceptional service! Company X truly understands our needs and delivers with precision every time.",
      name: "Michael Johnson",
      position: "COO, PQR Ltd.",
      image: "https://randomuser.me/api/portraits/men/3.jpg", // Example image URL
    },
  ];
  const feedbacks = [
    {
      id: 1,
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla convallis libero nec sapien rutrum.",
      name: "John Doe",
      position: "CEO, ABC Inc.",
    },
    {
      id: 2,
      quote:
        "The team at Company X delivered results beyond our expectations. Highly recommended!",
      name: "Jane Smith",
      position: "Marketing Director, XYZ Corp.",
    },
    {
      id: 3,
      quote:
        "Exceptional service! Company X truly understands our needs and delivers with precision every time.",
      name: "Michael Johnson",
      position: "COO, PQR Ltd.",
    },
  ];
  return (
    <>
      {/* carousel  */}
      <section className="relative w-full h-screen">
        <div
          style={{ backgroundImage: `url(${bg})` }}
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-40 -z-10"
        />
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-20">
          <div className="pl-20 bg-opacity-50 rounded-lg w-3/4 ">
            <p className="text-sm font-bold mb-2 bg-gradient-to-r from-[#EC4899] to-[#7E22CE] bg-clip-text text-transparent">
              CUTTING EDGE CREATION
            </p>

            <p className="text-7xl mb-4 font-semibold bg-gradient-to-r from-[#410377] to-[#EC4899] bg-clip-text text-transparent">
              Software & Tech Development for the Future
            </p>
            <p className="text-lg font-light bg-gradient-to-r from-[#410377] to-[#000000] bg-clip-text text-transparent">
              Sure, you may be able to get by with whatever software your
              business is currently using, but will you grow?
            </p>
            <button className="bg-blue-500 text-white px-6 py-2 my-4 rounded-md">
              Get Started
            </button>
          </div>
          <div
            className=" h-[400px] w-3/4  mr-20 "
            style={{
              backgroundImage: `url(${kite})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "900px auto",
            }}
          ></div>
        </div>
      </section>
      {/* carousel end */}

      {/* oms product section  */}
      <section className=" py-12">
        <div className="max-w-5xl mx-auto ">
          <p className="text-3xl font-semibold mb-20 text-center">
            Our Software
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 bg-blue-50 p-6 shadow-lg">
            <div>
              <img
                src={oms}
                alt="Product Screenshot"
                className="w-full rounded-lg shadow-md"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-2xl font-semibold mb-4">
                Order Management System
              </p>
              <p className="text-xl mb-4 text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                convallis libero nec sapien rutrum, at dignissim magna
                fermentum.
              </p>
              <ul className="text-left mb-6">
                <li className="mb-2">
                  <span className="text-blue-600 mr-2">&#x2713;</span> Feature
                  1: Lorem ipsum dolor sit amet
                </li>
                <li className="mb-2">
                  <span className="text-blue-600 mr-2">&#x2713;</span> Feature
                  2: Consectetur adipiscing elit
                </li>
                <li className="mb-2">
                  <span className="text-blue-600 mr-2">&#x2713;</span> Feature
                  3: Nulla convallis libero nec sapien
                </li>
                <li className="mb-2">
                  <span className="text-blue-600 mr-2">&#x2713;</span> Feature
                  4: Dignissim magna fermentum
                </li>
              </ul>
              <Link to={"../subscription"}>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out">
                  See plan
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* pms product section end  */}
      {/* ems product section  */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 bg-blue-50 p-6">
            <div>
              <img
                src={ems}
                alt="Product Screenshot"
                className="w-full rounded-lg shadow-md"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-2xl font-semibold mb-4">
                Order Management System
              </p>
              <p className="text-xl mb-4 text-justify">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
                convallis libero nec sapien rutrum, at dignissim magna
                fermentum.
              </p>
              <ul className="text-left mb-6">
                <li className="mb-2">
                  <span className="text-blue-600 mr-2">&#x2713;</span> Feature
                  1: Lorem ipsum dolor sit amet
                </li>
                <li className="mb-2">
                  <span className="text-blue-600 mr-2">&#x2713;</span> Feature
                  2: Consectetur adipiscing elit
                </li>
                <li className="mb-2">
                  <span className="text-blue-600 mr-2">&#x2713;</span> Feature
                  3: Nulla convallis libero nec sapien
                </li>
                <li className="mb-2">
                  <span className="text-blue-600 mr-2">&#x2713;</span> Feature
                  4: Dignissim magna fermentum
                </li>
              </ul>
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out">
                See Plan
              </button>
            </div>
          </div>
        </div>
      </section>
      {/* ems product section end  */}

      {/* service section  */}
      <section className="w-full auto  flex flex-col justify-center items-center p-20">
        <h2 className="text-4xl font-bold mb-8">What's we provide</h2>
        <div className="flex justify-between max-w-7xl w-full">
          <div className="flex-1 mx-4 bg-white p-4 rounded-lg shadow-md text-center">
            {/* Replace with your icon component */}
            <p>Icon 1</p>
            <p>Web Development</p>
          </div>
          <div className="flex-1 mx-4 bg-white p-4 rounded-lg shadow-md text-center">
            {/* Replace with your icon component */}
            <p>Icon 2</p>
            <p>Mobile Developement</p>
          </div>
          <div className="flex-1 mx-4 bg-white p-4 rounded-lg shadow-md text-center">
            {/* Replace with your icon component */}
            <p>Icon 3</p>
            <p>Software solutions</p>
          </div>
        </div>
      </section>
      {/* service setion end */}

      {/* textimonials sections */}
      <section className=" py-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">Testimonials</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <p className="mb-4">{testimonial.quote}</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="text-lg font-semibold">{testimonial.name}</p>
                    <p className="text-gray-600">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* textimonials sections end */}

      {/* customer feedback  */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-8">Customer Feedback</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {feedbacks.map((feedback) => (
              <div
                key={feedback.id}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <p className="mb-4">{feedback.quote}</p>
                <div className="flex items-center justify-center">
                  <p className="text-lg font-semibold">{feedback.name}</p>
                  <p className="text-gray-600 ml-2">{feedback.position}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* endc suctomer feedback  */}

      {/* subscribe section  */}
      <section className="bg-gray-200 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-gray-600 mb-8">
            Stay updated with the latest news and trends.
          </p>
          <form onSubmit={handleSubmit} className="flex justify-center">
            <input
              type="email"
              className="px-4 py-2 w-64 sm:w-80 rounded-l-md focus:outline-none"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-md transition duration-300 ease-in-out"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
      {/* subscribe section  */}

      {/* footer section  */}
      <Footer />
      {/* footer end  */}
    </>
  );
};

export default Home;
