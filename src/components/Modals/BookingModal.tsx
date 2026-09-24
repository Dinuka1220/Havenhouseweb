import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Tag,
  CreditCard,
  Lock,
  ArrowRight,
  ArrowLeft,
  Crown,
  Calendar,
  Printer,
  Sparkles,
  Coffee,
  Clock,
  Wine,
  Zap,
  ShieldCheck,
  Download
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useBooking, ADD_ONS } from '../../context/BookingContext';
import { roomsData } from '../../data/roomsData';

export const BookingModal: React.FC = () => {
  const {
    booking,
    isBookingModalOpen,
    setIsBookingModalOpen,
    formatPrice,
    setCheckInDate,
    setCheckOutDate,
    setAdults,
    setChildren,
    setSelectedRoom,
    toggleAddOn,
    applyPromo,
    calculateTotalPrice,
    addToast
  } = useBooking();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState<{ success: boolean; text: string } | null>(null);

  // Guest details form state
  const [guestDetails, setGuestDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    estimatedArrivalTime: '3:00 PM - 5:00 PM'
  });

  const [bookingReference, setBookingReference] = useState('');

  if (!isBookingModalOpen) return null;

  const { roomSubtotal, addOnsTotal, discountAmount, finalTotal, nights } = calculateTotalPrice();

  const handleApplyPromoCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromo(promoInput);
    setPromoMessage({ success: res.success, text: res.message });
  };

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const randomRef = 'HHB-' + Math.floor(100000 + Math.random() * 900000);
    setBookingReference(randomRef);
    setStep(4);
    addToast(`Reservation ${randomRef} confirmed! Check-in details sent.`, 'success');

    // Launch confetti celebration
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const handleDownloadCalendar = () => {
    try {
      const checkInFormatted = booking.checkInDate.replace(/-/g, '');
      const checkOutFormatted = booking.checkOutDate.replace(/-/g, '');
      const ics = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//Haven House Rooms//Barry Wales//EN',
        'CALSCALE:GREGORIAN',
        'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        `UID:${bookingReference || 'HHB-BOOKING'}@havenhousebarry.co.uk`,
        `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
        `DTSTART;VALUE=DATE:${checkInFormatted}`,
        `DTEND;VALUE=DATE:${checkOutFormatted}`,
        `SUMMARY:Stay at Haven House Rooms, Barry (${booking.selectedRoom?.name || 'Boutique Room'})`,
        `DESCRIPTION:Confirmation Code: ${bookingReference}\\nCheck-in: 3:00 PM\\nCheck-out: 11:00 AM\\nKeyless door PIN code sent via SMS/Email.\\nAddress: 14-16 Harbour Crescent, Barry, CF62 8PB, UK`,
        'LOCATION:14-16 Harbour Crescent, Barry, Vale of Glamorgan, CF62 8PB, United Kingdom',
        'STATUS:CONFIRMED',
        'END:VEVENT',
        'END:VCALENDAR'
      ].join('\r\n');

      const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `HavenHouse-${bookingReference || 'Stay'}.ics`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      addToast('Calendar event downloaded (.ics)', 'info');
    } catch {
      addToast('Could not generate calendar file', 'warning');
    }
  };

  const resetAndClose = () => {
    setIsBookingModalOpen(false);
    setTimeout(() => {
      setStep(1);
    }, 300);
  };

  const getAddonIcon = (id: string) => {
    if (id.includes('breakfast')) return Coffee;
    if (id.includes('checkout')) return Clock;
    if (id.includes('prosecco')) return Wine;
    if (id.includes('charging')) return Zap;
    return Sparkles;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in text-left">
      <div className="relative bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-stone-200">
        
        {/* Modal Top Header */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#C5A880] to-[#9E7D52] flex items-center justify-center text-white">
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif-luxury font-bold text-base text-stone-900 leading-tight">
                Reserve Your Stay
              </h3>
              <p className="text-[10px] text-stone-500">Haven House Rooms, Barry (South Wales)</p>
            </div>
          </div>

          <button
            type="button"
            onClick={resetAndClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close booking modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Multi-Step Progress Tracker */}
        {step < 4 && (
          <div className="bg-[#FAF8F5] px-6 py-3 border-b border-stone-100 flex items-center justify-between text-xs">
            {[
              { num: 1, label: 'Room & Dates' },
              { num: 2, label: 'Enhance Stay' },
              { num: 3, label: 'Guest & Confirm' }
            ].map((s) => (
              <div
                key={s.num}
                className={`flex items-center gap-2 font-semibold ${
                  step === s.num
                    ? 'text-[#9E7D52]'
                    : step > s.num
                    ? 'text-emerald-600'
                    : 'text-stone-400'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    step === s.num
                      ? 'bg-[#C5A880] text-white'
                      : step > s.num
                      ? 'bg-emerald-500 text-white'
                      : 'bg-stone-200 text-stone-600'
                  }`}
                >
                  {step > s.num ? '✓' : s.num}
                </div>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          
          {/* STEP 1: Room & Dates */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h4 className="font-serif-luxury text-xl font-bold text-stone-900">
                  Select Dates & Room Preference
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  Choose your stay dates and select from our boutique rooms in Barry.
                </p>
              </div>

              {/* Dates & Guests row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-[#FAF8F5] p-4 rounded-2xl border border-stone-200/80">
                <div>
                  <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Check-in</label>
                  <input
                    type="date"
                    value={booking.checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Check-out</label>
                  <input
                    type="date"
                    value={booking.checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    min={booking.checkInDate || new Date().toISOString().split('T')[0]}
                    className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Adults</label>
                  <select
                    value={booking.adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>{n} Adult{n > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-bold uppercase text-stone-500 block mb-1">Children</label>
                  <select
                    value={booking.children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full bg-white border border-stone-200 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800"
                  >
                    {[0, 1, 2, 3].map((n) => (
                      <option key={n} value={n}>{n} Child{n === 1 ? '' : 'ren'}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Room Choices List */}
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block">
                  Select Room ({roomsData.length} options available for {nights} night{nights > 1 ? 's' : ''})
                </label>

                <div className="grid grid-cols-1 gap-3">
                  {roomsData.map((room) => {
                    const isSelected = booking.selectedRoom?.id === room.id;

                    return (
                      <div
                        key={room.id}
                        onClick={() => setSelectedRoom(room)}
                        className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col sm:flex-row items-center gap-4 ${
                          isSelected
                            ? 'bg-[#FAF8F5] border-[#C5A880] ring-2 ring-[#C5A880]/30 shadow-md'
                            : 'bg-white border-stone-200 hover:border-stone-300'
                        }`}
                      >
                        <img
                          src={room.images[0]}
                          alt={room.name}
                          className="w-full sm:w-28 h-20 rounded-xl object-cover shrink-0"
                        />

                        <div className="flex-1 text-left space-y-1">
                          <div className="flex items-center gap-2">
                            <h5 className="font-bold text-sm text-stone-900">{room.name}</h5>
                            <span className="text-[10px] font-semibold bg-[#C5A880]/15 text-[#9E7D52] px-2 py-0.5 rounded-full">
                              {room.tag}
                            </span>
                          </div>
                          <p className="text-xs text-stone-500">{room.bedType} • {room.sizeSqFt} sq ft • Ensuite</p>
                        </div>

                        <div className="text-right shrink-0 flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto">
                          <span className="text-base font-bold font-serif-luxury text-[#B38E5D]">
                            {formatPrice(room.pricePerNight * nights)}
                          </span>
                          <span className="text-[10px] text-stone-400">
                            {formatPrice(room.pricePerNight)} / night
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex justify-end">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="gold-btn px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Continue to Enhancements</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Add-Ons & Extras */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h4 className="font-serif-luxury text-xl font-bold text-stone-900">
                  Enhance Your Sanctuary Experience
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  Add curated extras to make your stay in Barry unforgettable.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {ADD_ONS.map((addon) => {
                  const isChecked = booking.selectedAddOns.includes(addon.id);
                  const Icon = getAddonIcon(addon.id);

                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddOn(addon.id)}
                      className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                        isChecked
                          ? 'bg-[#FAF8F5] border-[#C5A880] ring-2 ring-[#C5A880]/30 shadow-xs'
                          : 'bg-white border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-md flex items-center justify-center text-xs transition-colors shrink-0 ${
                            isChecked ? 'bg-[#C5A880] text-white' : 'border border-stone-300'
                          }`}
                        >
                          {isChecked ? '✓' : ''}
                        </div>
                        <div className="w-8 h-8 rounded-xl bg-stone-100 flex items-center justify-center text-[#9E7D52] shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs sm:text-sm font-semibold text-stone-800 block">
                            {addon.name}
                          </span>
                          {addon.perNight && (
                            <span className="text-[10px] text-stone-400 block">
                              Calculated per night ({nights} nights = {formatPrice(addon.price * nights)})
                            </span>
                          )}
                        </div>
                      </div>

                      <span className="text-xs font-bold text-[#B38E5D] shrink-0">
                        +{formatPrice(addon.perNight ? addon.price * nights : addon.price)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Promo Code Box */}
              <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-stone-200">
                <form onSubmit={handleApplyPromoCode} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (Try SEASIDE30 or HAVEN10)"
                      className="w-full bg-white border border-stone-200 rounded-xl pl-9 pr-3 py-2 text-xs uppercase text-stone-800"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-stone-800 hover:bg-stone-900 text-white rounded-xl text-xs font-bold uppercase transition-colors"
                  >
                    Apply
                  </button>
                </form>

                {promoMessage && (
                  <p
                    className={`text-[11px] mt-2 font-medium ${
                      promoMessage.success ? 'text-emerald-600' : 'text-rose-500'
                    }`}
                  >
                    {promoMessage.text}
                  </p>
                )}
              </div>

              {/* Step 2 Actions */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-5 py-3 rounded-xl border border-stone-300 text-xs font-bold uppercase text-stone-600 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="gold-btn px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <span>Review & Guest Info</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Guest Details & Confirmation */}
          {step === 3 && (
            <form onSubmit={handleCompleteBooking} className="space-y-6">
              <div>
                <h4 className="font-serif-luxury text-xl font-bold text-stone-900">
                  Guest Information & Instant Guarantee
                </h4>
                <p className="text-xs text-stone-500 mt-1">
                  We need your contact information to send your digital keypad door PIN and parking access code.
                </p>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold uppercase text-stone-600 block mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={guestDetails.firstName}
                    onChange={(e) => setGuestDetails({ ...guestDetails, firstName: e.target.value })}
                    placeholder="e.g. Eleanor"
                    className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-stone-600 block mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={guestDetails.lastName}
                    onChange={(e) => setGuestDetails({ ...guestDetails, lastName: e.target.value })}
                    placeholder="e.g. Davies"
                    className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-stone-600 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={guestDetails.email}
                    onChange={(e) => setGuestDetails({ ...guestDetails, email: e.target.value })}
                    placeholder="e.g. eleanor@example.co.uk"
                    className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-bold uppercase text-stone-600 block mb-1">Mobile Phone (for Key PIN SMS) *</label>
                  <input
                    type="tel"
                    required
                    value={guestDetails.phone}
                    onChange={(e) => setGuestDetails({ ...guestDetails, phone: e.target.value })}
                    placeholder="e.g. +44 7700 900077"
                    className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3.5 py-2.5 text-xs text-stone-800"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase text-stone-600 block mb-1">Special Requests (Optional)</label>
                <textarea
                  rows={2}
                  value={guestDetails.specialRequests}
                  onChange={(e) => setGuestDetails({ ...guestDetails, specialRequests: e.target.value })}
                  placeholder="e.g. Early check-in preference, extra hypoallergenic pillows, EV parking spot..."
                  className="w-full bg-[#FAF8F5] border border-stone-200 rounded-xl px-3.5 py-2 text-xs text-stone-800"
                />
              </div>

              {/* Price Breakdown Summary Box */}
              <div className="bg-[#FAF8F5] rounded-2xl p-4 sm:p-5 border border-stone-200 space-y-2 text-xs">
                <div className="flex justify-between text-stone-600">
                  <span>{booking.selectedRoom?.name} ({nights} nights)</span>
                  <span>{formatPrice(roomSubtotal)}</span>
                </div>

                {addOnsTotal > 0 && (
                  <div className="flex justify-between text-stone-600">
                    <span>Selected Add-ons & Experiences</span>
                    <span>+{formatPrice(addOnsTotal)}</span>
                  </div>
                )}

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount ({booking.appliedPromoCode})</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline font-bold">
                  <span className="text-stone-900 text-sm">Total Due (Pay at Check-In)</span>
                  <span className="text-xl font-serif-luxury text-[#B38E5D]">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-stone-500">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                <span>No upfront charge. Free cancellation up to 48 hours prior to check-in.</span>
              </div>

              {/* Step 3 Actions */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-5 py-3 rounded-xl border border-stone-300 text-xs font-bold uppercase text-stone-600 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  className="gold-btn px-8 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-xl"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Confirm Reservation ({formatPrice(finalTotal)})</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Instant Confirmation & Voucher */}
          {step === 4 && (
            <div className="text-center space-y-6 py-4 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#9E7D52]">
                  Reservation Confirmed
                </span>
                <h3 className="font-serif-luxury text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
                  We look forward to welcoming you!
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  Your reservation reference is <strong className="text-stone-900 font-mono text-sm">{bookingReference}</strong>
                </p>
              </div>

              {/* Booking Summary Card */}
              <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-stone-200 text-left max-w-lg mx-auto space-y-3 text-xs">
                <div className="border-b border-stone-200 pb-3 flex items-start justify-between">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase font-semibold">Room Reserved</span>
                    <h5 className="font-bold text-sm text-stone-900">{booking.selectedRoom?.name}</h5>
                  </div>
                  <span className="text-xs font-bold text-[#9E7D52] bg-[#C5A880]/15 px-2.5 py-1 rounded-full">
                    {nights} Night{nights > 1 ? 's' : ''}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-stone-700">
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase block">Dates</span>
                    <span className="font-semibold">{booking.checkInDate} to {booking.checkOutDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-stone-400 uppercase block">Guests</span>
                    <span className="font-semibold">{booking.adults} Adults, {booking.children} Children</span>
                  </div>
                </div>

                {/* Key Access Notes */}
                <div className="p-3 bg-white rounded-xl border border-stone-200/80 space-y-1 text-[11px] text-stone-600">
                  <div className="flex items-center gap-1.5 font-bold text-stone-900">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Check-In & Access Protocol:</span>
                  </div>
                  <p>Check-in starts 3:00 PM. Your 6-digit keyless door PIN will be sent via SMS to <strong>{guestDetails.phone}</strong> at 9:00 AM on your arrival day.</p>
                </div>

                <div className="pt-2 border-t border-stone-200 flex justify-between items-center">
                  <span className="text-stone-600">Total Confirmed</span>
                  <span className="text-lg font-bold font-serif-luxury text-[#B38E5D]">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Action Buttons: Add to Calendar & Print Voucher */}
              <div className="flex flex-wrap items-center justify-center gap-3 max-w-md mx-auto">
                <button
                  type="button"
                  onClick={handleDownloadCalendar}
                  className="px-4 py-2.5 rounded-full border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Add to Calendar (.ics)</span>
                  <Download className="w-3 h-3 text-stone-400" />
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-4 py-2.5 rounded-full border border-stone-300 hover:bg-stone-50 text-stone-700 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5 text-[#C5A880]" />
                  <span>Print Voucher</span>
                </button>
              </div>

              <p className="text-xs text-stone-500 max-w-md mx-auto">
                A confirmation email and SMS with your check-in instructions and 24/7 keyless code details has been sent to <strong>{guestDetails.email || 'your email'}</strong>.
              </p>

              <div>
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="gold-btn px-10 py-3 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
