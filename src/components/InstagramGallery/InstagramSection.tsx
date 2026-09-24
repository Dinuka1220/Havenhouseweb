import React, { useState } from 'react';
import { Heart, X } from 'lucide-react';
import { galleryPhotos, type GalleryPhoto } from '../../data/reviewsData';
import { InstagramIcon } from '../Common/SocialIcons';

export const InstagramSection: React.FC = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-white border-t border-stone-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#C5A880]">
            <InstagramIcon className="w-3.5 h-3.5" />
            <span>@havenhousebarry</span>
          </div>
          <h2 className="font-serif-luxury text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F1416] tracking-tight">
            Follow on Instagram & Gallery
          </h2>
          <p className="text-sm text-stone-500 font-light leading-relaxed">
            Tag your moments with #HavenHouseBarry to be featured on our social wall.
          </p>
        </div>

        {/* 6-Column / Responsive Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {galleryPhotos.map(photo => (
            <div
              key={photo.id}
              onClick={() => setSelectedPhoto(photo)}
              className="group relative aspect-square rounded-2xl overflow-hidden shadow-xs hover:shadow-xl cursor-pointer bg-stone-100"
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-[#0F1416]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-3 text-center">
                <InstagramIcon className="w-6 h-6 text-[#C5A880] mb-2" />
                <span className="text-xs font-semibold line-clamp-1">{photo.title}</span>
                <div className="flex items-center gap-1 text-[11px] text-stone-300 mt-1">
                  <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                  <span>{photo.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-4xl w-full bg-[#0F1416] rounded-3xl overflow-hidden shadow-2xl border border-white/10 text-white">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/10] bg-black">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-4 sm:p-6 flex items-center justify-between bg-[#161B1E] border-t border-white/10">
              <div className="text-left">
                <h4 className="font-serif-luxury font-bold text-lg text-white">{selectedPhoto.title}</h4>
                <p className="text-xs text-stone-400">{selectedPhoto.category} • Haven House Rooms, Barry</p>
              </div>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="gold-btn px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2"
              >
                <InstagramIcon className="w-3.5 h-3.5" />
                <span>View On Instagram</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
