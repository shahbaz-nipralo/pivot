"use client"
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Phone, Mail, MapPin, Send, CheckCircle } from "lucide-react"

export default function Contact() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      })
    }, 1500)
  }

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.id]: e.target.value,
    })
  }

  return (
    <section id="contact" className="w-full bg-white mt-24">
      {/* Banner Section */}
      <div className="relative bg-[#2F6686] text-white">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-cover bg-center opacity-20 mix-blend-overlay" />
        <div className="container px-4 md:px-6 py-16 md:py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tighter">Let's Start a Conversation</h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              We're here to help with any questions you might have about our services, products, or how we can work
              together.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Form and Info Section */}
      <div className="container px-4 md:px-6 py-12">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Contact Information - Now displayed permanently on the side */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[#2F6686]">Contact Information</h2>
            <p className="text-gray-600">
              Feel free to reach out to us through any of these channels or fill out the form.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <Phone className="h-5 w-5 text-[#2F6686] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Phone</p>
                  <p className="text-gray-600">(123) 456-7890</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <Mail className="h-5 w-5 text-[#2F6686] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Email</p>
                  <p className="text-gray-600">support@excelhub.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <MapPin className="h-5 w-5 text-[#2F6686] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-gray-900">Office</p>
                  <p className="text-gray-600">123 Business Avenue, NY 10001</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {isSubmitted ? (
              <div className="p-8 flex flex-col items-center justify-center text-center space-y-4">
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">Message Sent!</h3>
                <p className="text-gray-500 max-w-md">
                  Thank you for reaching out. We've received your message and will get back to you shortly.
                </p>
                <Button onClick={() => setIsSubmitted(false)} variant="outline" className="mt-4">
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-5">
                <h2 className="text-2xl font-bold text-[#2F6686] mb-4">Send Us a Message</h2>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                      First name
                    </label>
                    <Input
                      id="firstName"
                      value={formState.firstName}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-[#2F6686] focus:ring-[#2F6686]"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                      Last name
                    </label>
                    <Input
                      id="lastName"
                      value={formState.lastName}
                      onChange={handleChange}
                      className="border-gray-300 focus:border-[#2F6686] focus:ring-[#2F6686]"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    className="border-gray-300 focus:border-[#2F6686] focus:ring-[#2F6686]"
                    placeholder="john.doe@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    value={formState.message}
                    onChange={handleChange}
                    className="min-h-[120px] border-gray-300 focus:border-[#2F6686] focus:ring-[#2F6686]"
                    placeholder="How can we help you today?"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="bg-[#2F6686] hover:bg-[#245573] w-full flex items-center justify-center gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
} 