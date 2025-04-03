  import React, { useState } from 'react';
import toast,{Toaster} from 'react-hot-toast';

  const TicketForm = () => {
    const [formData, setFormData] = useState({
      concertId: '',
      email: '',
      name: '',
      phone: '',
      quantity: '1',
      creditCard: '',
      expiration: '',
      securityCode: '',
      address: '',
      city: '',
      province: '',
      postalCode: '',
      country: ''
    });

    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
      setErrors("");
    };

    const validate = () => {
      const newErrors = {};
      
      // ConcertId validation
      if (!formData.concertId || parseInt(formData.concertId) <= 0) {
        newErrors.concertId = "Concert ID must be a positive number";
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email || !emailRegex.test(formData.email)) {
        newErrors.email = "Please provide a valid email address";
      }
      
      // Name validation
      if (!formData.name || formData.name.length < 2 || formData.name.length > 50) {
        newErrors.name = "Name must be between 2 and 50 characters";
      }
      
      // Phone validation
      const phoneRegex = /^\d{10}$/;
      if (!formData.phone || !phoneRegex.test(formData.phone)) {
        newErrors.phone = "Phone number must be 10 digits";
      }
      
      // Quantity validation
      const qty = parseInt(formData.quantity);
      if (isNaN(qty) || qty < 1 || qty > 10) {
        newErrors.quantity = "Quantity must be between 1 and 10 tickets";
      }
      
      // Credit card validation (simple validation)
      if (!formData.creditCard || formData.creditCard.length < 13) {
        newErrors.creditCard = "Please provide a valid credit card number";
      }
      
      // Expiration validation
      const expRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
      if (!formData.expiration || !expRegex.test(formData.expiration)) {
        newErrors.expiration = "Expiration date must be in MM/YY format";
      }
      
      // Security code validation
      const securityCodeRegex = /^\d{3}$/;
      if (!formData.securityCode || !securityCodeRegex.test(formData.securityCode)) {
        newErrors.securityCode = "Security code must be 3 digits";
      }
      
      // Address validation
      if (!formData.address || formData.address.length > 100) {
        newErrors.address = "Address is required and cannot exceed 100 characters";
      }
      
      // City validation
      if (!formData.city || formData.city.length > 50) {
        newErrors.city = "City is required and cannot exceed 50 characters";
      }
      
      // Province validation
      if (!formData.province || formData.province.length > 50) {
        newErrors.province = "Province/State is required and cannot exceed 50 characters";
      }
      
      // Postal code validation for Canadian format
      const postalRegex = /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/;
      if (!formData.postalCode || !postalRegex.test(formData.postalCode)) {
        newErrors.postalCode = "Please provide a valid Canadian postal code (e.g., A1B 0A1)";
      }
      
      // Country validation
      if (!formData.country || formData.country.length > 50) {
        newErrors.country = "Country is required and cannot exceed 50 characters";
      }
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (!validate()) {
        return; 
      }
    
      try {
        console.log("Form submitted:", formData);
      
        const response = await fetch("https://tickethub-dtckb6aqe2bvewez.canadacentral-01.azurewebsites.net/api/ConcertTicket", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        const result = await response.json();
        console.log("Success:", result);
        toast.success("Ticket Form submit successful!")
        setFormData({
          concertId: '',
          email: '',
          name: '',
          phone: '',
          quantity: '1',
          creditCard: '',
          expiration: '',
          securityCode: '',
          address: '',
          city: '',
          province: '',
          postalCode: '',
          country: ''
        });
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Ticket Form submit failed. Please try again.")
      } 
    };
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
        <Toaster position="top-center" />
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-8 md:p-10">
            <h1 className="text-3xl font-bold text-white text-center">Concert Ticket Form</h1>
            <p className="mt-2 text-purple-100 text-center">Complete your ticket purchase below</p>
          </div>
          
          <form onSubmit={handleSubmit} className="px-6 py-8 md:p-10 space-y-8">
            {/* Event Selection */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Event Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="concertId" className="block text-sm font-medium text-gray-700">
                    Concert ID
                  </label>
                  <input
                    type="number"
                    id="concertId"
                    name="concertId"
                    value={formData.concertId}
                    placeholder='Enter your choosed concer ID'
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-3 border"
                  />
                  {errors.concertId && <p className="mt-1 text-sm text-red-600">{errors.concertId}</p>}
                </div>
                
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                    Ticket Quantity
                  </label>
                  <select
                    id="quantity"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-3 border"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                  {errors.quantity && <p className="mt-1 text-sm text-red-600">{errors.quantity}</p>}
                </div>
              </div>
            </div>
            
            {/* Personal Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-3 border"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-3 border"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-3 border"
                    placeholder="1234567890"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>
              </div>
            </div>
            
            {/* Payment Information */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Payment Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="creditCard" className="block text-sm font-medium text-gray-700">
                    Credit Card Number
                  </label>
                  <input
                    type="text"
                    id="creditCard"
                    name="creditCard"
                    value={formData.creditCard}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-3 border"
                    placeholder="Card Number"
                  />
                  {errors.creditCard && <p className="mt-1 text-sm text-red-600">{errors.creditCard}</p>}
                </div>
                
                <div>
                  <label htmlFor="expiration" className="block text-sm font-medium text-gray-700">
                    Expiration Date
                  </label>
                  <input
                    type="text"
                    id="expiration"
                    name="expiration"
                    value={formData.expiration}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-3 border"
                    placeholder="MM/YY"
                  />
                  {errors.expiration && <p className="mt-1 text-sm text-red-600">{errors.expiration}</p>}
                </div>
                
                <div>
                  <label htmlFor="securityCode" className="block text-sm font-medium text-gray-700">
                    Security Code
                  </label>
                  <input
                    type="text"
                    id="securityCode"
                    name="securityCode"
                    value={formData.securityCode}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-3 border"
                    placeholder="CVV"
                  />
                  {errors.securityCode && <p className="mt-1 text-sm text-red-600">{errors.securityCode}</p>}
                </div>
              </div>
            </div>
            
            {/* Shipping Address */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">Shipping Address</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Street Address
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-3 border"
                  />
                  {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-3 border"
                  />
                  {errors.city && <p className="mt-1 text-sm text-red-600">{errors.city}</p>}
                </div>
                
                <div>
                  <label htmlFor="province" className="block text-sm font-medium text-gray-700">
                    Province/State
                  </label>
                  <input
                    type="text"
                    id="province"
                    name="province"
                    value={formData.province}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-3 border"
                  />
                  {errors.province && <p className="mt-1 text-sm text-red-600">{errors.province}</p>}
                </div>
                
                <div>
                  <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-3 border"
                    placeholder="A1B 2C3"
                  />
                  {errors.postalCode && <p className="mt-1 text-sm text-red-600">{errors.postalCode}</p>}
                </div>
                
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 py-2 px-3 border"
                  />
                  {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                </div>
              </div>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 transform hover:scale-[1.02]"
              >
                Purchase Tickets
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  export default TicketForm;