import React, { useState } from 'react';
import { X, Send, CheckCircle2, Phone, Mail } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';
import { hotelDetails } from '../../data/hotelDetails';

export const ContactModal: React.FC = () => {
  const { isContactModalOpen, setIsContactModalOpen } = useBooking();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Room Enquiry',
    message: ''
  });

  if (!isContactModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setIsContactModalOpen(false);
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in text-left">
      <div className="relative bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-stone-200">
        <button
          onClick={() => setIsContactModalOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="space-y-2 mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C5A880]">
            Get In Touch
          </span>
          <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900">
            Contact Haven House Rooms
          </h3>
          <p className="text-xs text-stone-500">
            Have special requirements, group booking requests, or questions about Barry?
          </p>
        </div>

        {submitted ? (
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-2 animate-fade-in">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
            <h4 className="font-serif-luxury font-bold text-lg text-emerald-900">Message Received!</h4>
            <p className="text-xs text-emerald-700">
              Our concierge team will respond within 2-4 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-bold uppercase text-stone-600 block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. John Thomas"
                  className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-stone-600 block mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g. john@example.com"
                  className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-stone-600 block mb-1">Subject</label>
              <select
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800"
              >
                <option value="Room Enquiry">Room Availability Enquiry</option>
                <option value="Group Booking">Group / Extended Stay</option>
                <option value="Barry Travel Tips">Barry Island & Transport Info</option>
                <option value="Other">Other Question</option>
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-stone-600 block mb-1">Message *</label>
              <textarea
                rows={3}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="How can we assist you with your stay at Haven House?"
                className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-800"
              />
            </div>

            <button
              type="submit"
              className="w-full gold-btn py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-stone-100 grid grid-cols-2 gap-3 text-[11px] text-stone-500">
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>{hotelDetails.contact.displayPhone}</span>
          </div>
          <div className="flex items-center gap-1.5 truncate">
            <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
            <span className="truncate">{hotelDetails.contact.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
