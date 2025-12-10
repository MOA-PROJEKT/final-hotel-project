import React, { useState, useEffect } from 'react'

export default function ImageCarousel({
  images,
  autoPlay = true,
  interval = 4000,
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  useEffect(() => {
    if (!autoPlay) return
    const slideInterval = setInterval(nextSlide, interval)
    return () => clearInterval(slideInterval)
  }, [currentIndex, autoPlay, interval])

  return (
    <div className="relative w-full overflow-hidden">
      {/* Image */}
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="w-full h-[80vh] sm:h-[70vh] md:h-[80vh] object-cover transition-all duration-700"
      />

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-0 -translate-y-1/2 text-black text-4xl md:text-5xl font-bold p-4 hover:text-amber-400"
        style={{ background: 'none', border: 'none' }}
      >
        ‹
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-0 -translate-y-1/2 text-black text-4xl md:text-5xl font-bold p-4 hover:text-amber-400"
        style={{ background: 'none', border: 'none' }}
      >
        ›
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 w-full flex items-center justify-center gap-2">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-2 w-2 rounded-full cursor-pointer transition-all ${
              currentIndex === i ? 'bg-white' : 'bg-white/40'
            }`}
          ></div>
        ))}
      </div>
    </div>
  )
}
