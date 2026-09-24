import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';
import { reviewsData } from '../../data/reviewsData';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviewsData.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviewsData.length) % reviewsData.length);
  };

  const review = reviewsData[currentIndex];

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-white border-t border-stone-100 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Section Header */}
        <div className="space-y-3 mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#C5A880]">
            Testimonials
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F1416] tracking-tight">
            What Our Guests Say
          </h2>
          <p className="text-sm text-stone-500 max-w-lg mx-auto font-light leading-relaxed">
            Discover real feedback from guests who have experienced Haven House Rooms in Barry.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative bg-[#FAF8F5] rounded-3xl p-8 sm:p-12 lg:p-14 border border-stone-200/80 shadow-md">
          {/* Subtle Quote Watermark */}
          <Quote className="absolute top-6 right-8 w-16 h-16 text-[#C5A880]/15 pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            
            {/* Guest Avatar with Ring */}
            <div className="relative shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:w-28 rounded-full overflow-hidden border-4 border-white shadow-xl ring-4 ring-[#C5A880]/30">
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#C5A880] text-white p-1.5 rounded-full shadow-md">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            {/* Quote and Author Details */}
            <div className="text-center md:text-left flex-1 space-y-4">
              
              {/* Star Rating */}
              <div className="flex items-center justify-center md:justify-start gap-1 text-amber-500">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-xs font-bold text-stone-700 ml-2">5.0 Star Rating</span>
              </div>

              {/* Review Comment */}
              <blockquote className="font-serif-luxury text-base sm:text-xl text-stone-800 leading-relaxed italic">
                "{review.comment}"
              </blockquote>

              {/* Author & Stay Details */}
              <div className="pt-2 border-t border-stone-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{review.author}</h4>
                  <p className="text-xs text-stone-500">{review.location} • {review.stayType}</p>
                </div>

                <div className="text-xs text-[#9E7D52] font-semibold bg-white px-3 py-1 rounded-full border border-stone-200 inline-block self-center sm:self-auto">
                  {review.roomName}
                </div>
              </div>

            </div>

          </div>

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-stone-200/60 flex items-center justify-between">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {reviewsData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? 'w-8 bg-[#C5A880]' : 'w-2 bg-stone-300'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevReview}
                className="w-10 h-10 rounded-full bg-white hover:bg-[#C5A880] text-stone-700 hover:text-white border border-stone-200 hover:border-transparent flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                aria-label="Previous Review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextReview}
                className="w-10 h-10 rounded-full bg-white hover:bg-[#C5A880] text-stone-700 hover:text-white border border-stone-200 hover:border-transparent flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                aria-label="Next Review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
