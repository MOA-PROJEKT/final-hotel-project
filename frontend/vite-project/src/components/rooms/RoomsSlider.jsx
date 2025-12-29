// src/components/rooms/RoomsSlider.jsx

import { useState, useEffect } from 'react'
import slide1 from '../../assets/images/zimmer/slider1.webp'
import slide2 from '../../assets/images/zimmer/slider2.webp'
import slide3 from '../../assets/images/zimmer/slider3.webp'
import slide4 from '../../assets/images/zimmer/slider4.webp'
import slide5 from '../../assets/images/zimmer/slider5.webp'
import slide6 from '../../assets/images/zimmer/slider6.webp'

const sliderImages = [slide1, slide2, slide3, slide4, slide5, slide6]

export default function RoomsSlider() {
  const [current, setCurrent] = useState(0)
  const length = sliderImages.length

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1))
    }, 3000)
    return () => clearInterval(interval)
  }, [length])

  const prevSlide = () => setCurrent(current === 0 ? length - 1 : current - 1)
  const nextSlide = () => setCurrent(current === length - 1 ? 0 : current + 1)

  return (
    <div className="relative w-full overflow-hidden mb-24">
      {/* Слайды */}
      <div
        className="flex transition-transform duration-700"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {sliderImages.map((img, index) => (
          <div key={index} className="min-w-full">
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-[400px] sm:h-[500px] object-cover rounded-2xl"
            />
          </div>
        ))}
      </div>

      {/* Стрелки навигации */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition"
        aria-label="Previous Slide"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition"
        aria-label="Next Slide"
      >
        &#10095;
      </button>

      {/* Индикаторы */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {sliderImages.map((_, index) => (
          <span
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === current ? 'bg-amber-400' : 'bg-neutral-400/50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
