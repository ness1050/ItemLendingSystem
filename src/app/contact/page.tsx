"use client"

import React, {useState} from "react";
import Image from "next/image";

const ContactPage = () => {

  const [success, setSuccess] = useState(false);

  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Here you can send the form data to an API if needed
    setSuccess(true);

    // Hide message after 3 seconds
    setTimeout(() => {
      setSuccess(false);
    }, 3000);

    // Reset form fields
    e.currentTarget.reset();
  };
  return (
    <div className="flex items-center justify-center p-9 w-auto  ">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl gap-8 p-10">
        <section className="p-4 hidden md:block">
          <Image
            src="/category/helpdesk.jpg"
            alt="grid-img-1"
            width={400}
            height={400}
            className="w-full h-200 object-cover rounded-lg shadow-xl/60 grayscale-65"
          />
        </section>

        <section className="flex flex-col ">
          <h2 className="text-2xl mb-6 text-black ">Contact Form</h2>
          <form onSubmit={handleSubmit} className="space-y-4 text-primary">
            <div>
              <label htmlFor="fname" className="block ">
                First Name
              </label>
              <input
                type="text"
                id="fname"
                name="firstname"
                placeholder="Your name..."
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus-visible:ring-2 focus:ring-ring focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="lname" className="block font-medium ">
                Last Name
              </label>
              <input
                type="text"
                id="lname"
                name="lastname"
                placeholder="Your last name..."
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-ring focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email@.com"
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-ring focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="Continents" className="block font-medium">
                Continent
              </label>
              <select
                name="Continents"
                id="Continents"
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-ring focus:outline-none">
                <option value="Europe">Europe</option>
                <option value="Asia">Asia</option>
                <option value="South America">South America</option>
                <option value="Africa">Africa</option>
                <option value="Australia">Australia</option>
                <option value="North America">North America</option>
              </select>
            </div>

            <div>
              <label htmlFor="Message" className="block font-medium">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                placeholder="Write your message..."
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-ring focus:outline-none"></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-button text-2xl text-white py-2 rounded cursor-pointer hover:ring-2 ring-ring font-medium focus-visible:bg-ring ">
              Submit
            </button>
            {success && (
              <p className="mt-4 text-green-600 font-medium">
                Your message has been delivered successfully!
              </p>
            )}
          </form>
        </section>
      </div>
    </div>
  );
};

export default ContactPage;
