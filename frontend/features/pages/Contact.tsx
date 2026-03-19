"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/actions/button";
import { ImageWithFallback } from "@/components/media/ImageWithFallback";

const heroImage = "https://images.unsplash.com/photo-1759038085950-1234ca8f5fed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJlY2VwdGlvbiUyMGRlc2slMjBjb25jaWVyZ2V8ZW58MXx8fHwxNzczOTI1Mjk5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImage}
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-serif mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-gray-200"
          >
            We're here to help and answer any questions
          </motion.p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: MapPin,
                title: "Address",
                content: "Bole Road, Addis Ababa, Ethiopia",
              },
              {
                icon: Phone,
                title: "Phone",
                content: "+251 911 234 567",
                link: "tel:+251911234567",
              },
              {
                icon: Mail,
                title: "Email",
                content: "info@ethiobernohotel.com",
                link: "mailto:info@ethiobernohotel.com",
              },
              {
                icon: Clock,
                title: "Reception Hours",
                content: "24/7 Available",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg text-center"
              >
                <div className="w-14 h-14 bg-[#c9a961]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-7 w-7 text-[#c9a961]" />
                </div>
                <h3 className="text-lg text-[#1e3a5f] mb-2">{item.title}</h3>
                {item.link ? (
                  <a
                    href={item.link}
                    className="text-gray-600 hover:text-[#c9a961] transition-colors"
                  >
                    {item.content}
                  </a>
                ) : (
                  <p className="text-gray-600">{item.content}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-serif text-[#1e3a5f] mb-4">
                Send us a Message
              </h2>
              <div className="w-20 h-1 bg-[#c9a961] mb-6" />
              <p className="text-gray-600 mb-8">
                Have a question or want to make a reservation? Fill out the form below and we'll get back to you shortly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c9a961] focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c9a961] focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c9a961] focus:border-transparent"
                      placeholder="+251 911 234 567"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c9a961] focus:border-transparent"
                    >
                      <option value="">Select a subject</option>
                      <option value="reservation">Room Reservation</option>
                      <option value="inquiry">General Inquiry</option>
                      <option value="event">Event Booking</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#c9a961] focus:border-transparent resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#c9a961] hover:bg-[#b89851] text-white py-6"
                  disabled={submitted}
                >
                  {submitted ? (
                    "Message Sent!"
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                {submitted && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-600 text-center"
                  >
                    Thank you for your message! We'll get back to you soon.
                  </motion.p>
                )}
              </form>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-serif text-[#1e3a5f] mb-4">
                Find Us
              </h2>
              <div className="w-20 h-1 bg-[#c9a961] mb-6" />
              
              {/* Embedded Google Map */}
              <div className="rounded-lg overflow-hidden shadow-lg mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.3149817245975!2d38.76327931477975!3d9.030845093469997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85f3b6c6e5a7%3A0x8c2b3c8c8c8c8c8c!2sBole%20Road%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1234567890123!5m2!1sen!2set"
                  width="100%"
                  height="400"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Hotel Location"
                />
              </div>

              {/* Additional Contact Info */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl text-[#1e3a5f] mb-6">
                  Why Choose Ethioberno?
                </h3>
                <ul className="space-y-4">
                  {[
                    "Prime location in the heart of Addis Ababa",
                    "24/7 multilingual customer support",
                    "Complimentary airport shuttle service",
                    "Flexible cancellation policies",
                    "Best price guarantee",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-[#c9a961] rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-serif text-[#1e3a5f] mb-4">
              Frequently Asked Questions
            </h2>
            <div className="w-20 h-1 bg-[#c9a961] mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              {
                question: "What time is check-in and check-out?",
                answer: "Check-in is at 2:00 PM and check-out is at 12:00 PM. Early check-in and late check-out may be available upon request.",
              },
              {
                question: "Do you offer airport shuttle service?",
                answer: "Yes, we provide complimentary airport shuttle service for all our guests. Please inform us of your flight details in advance.",
              },
              {
                question: "Is parking available?",
                answer: "Yes, we offer complimentary valet parking for all hotel guests with 24/7 security.",
              },
              {
                question: "Do you have facilities for events and meetings?",
                answer: "Yes, we have multiple conference rooms and banquet halls with modern AV equipment and catering services.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 p-6 rounded-lg"
              >
                <h3 className="text-lg text-[#1e3a5f] mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
