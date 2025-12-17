import React, { useState, useEffect } from 'react'

export default function ImageCarousel({ images, autoPlay = true, interval = 4000 }) {
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
        className="w-full h-[80vh] sm:h-[75vh] md:h-[80vh] object-cover transition-all duration-700"
      />

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 p-3 rounded-full  shadow-lg hover:shadow-xl transition-all"
        style={{ border: 'none' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 md:h-10 md:w-10 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 p-3 rounded-full  shadow-lg hover:shadow-xl transition-all"
        style={{ border: 'none' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 md:h-10 md:w-10 text-red-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-6 w-full flex items-center justify-center gap-3">
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`h-3 w-3 md:h-4 md:w-4 rounded-full cursor-pointer transition-all transform ${
              currentIndex === i
                ? 'bg-[#f7f2ec] scale-125 shadow-lg'
                : 'bg-[#f7f2ec] hover:bg-white/80'
            }`}
          ></div>
        ))}
      </div>
    </div>
  )
}
