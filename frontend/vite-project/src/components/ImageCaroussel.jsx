import React, { useState, useEffect, useRef } from 'react'

export default function ImageCarousel({
  images,
  autoPlay = true,
  interval = 5000,
}) {
  if (!images || images.length === 0) return null

  const slides = [images[images.length - 1], ...images, images[0]]

  const [index, setIndex] = useState(1)
  const [transition, setTransition] = useState(true)
  const slideWidth = 68 // vw
  const sliderRef = useRef(null)

  const next = () => {
    setTransition(true)
    setIndex((i) => {
      if (i >= slides.length - 1) return 1 // zurück zum ersten echten Slide
      return i + 1
    })
  }

  const prev = () => {
    setTransition(true)
    setIndex((i) => {
      if (i <= 0) return slides.length - 2 // zurück zum letzten echten Slide
      return i - 1
    })
  }

  useEffect(() => {
    if (!autoPlay) return

    let id = setInterval(next, interval)

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        clearInterval(id)
      } else {
        id = setInterval(next, interval)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => {
      clearInterval(id)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [autoPlay, interval])

  const handleTransitionEnd = () => {
    if (index === slides.length - 1) {
      setTransition(false)
      setIndex(1)
    }
    if (index === 0) {
      setTransition(false)
      setIndex(slides.length - 2)
    }
  }

  return (
    <div className="relative w-full py-10 overflow-hidden">
      {/* SLIDER */}
      <div
        ref={sliderRef}
        onTransitionEnd={handleTransitionEnd}
        className={`flex ${
          transition ? 'transition-transform duration-700 ease-in-out' : ''
        }`}
        style={{
          transform: `translateX(calc(50% - ${
            index * slideWidth
          }vw - ${slideWidth / 2}vw))`,
        }}
      >
        {slides.map((img, i) => (
          <div key={i} className="w-[68vw] shrink-0 px-1">
            <img src={img} alt="" className="w-full h-[68vh] object-cover " />
          </div>
        ))}
      </div>

      {/* CONTROLS – unter dem aktiven Bild */}
      <div className="mt-9 flex justify-center">
        <div className="flex items-center gap-6 bg-white/80 backdrop-blur px-6 py-3 rounded-full shadow-lg">
          {/* LEFT */}
          <button
            onClick={prev}
            className="bg-white rounded-full p-2 shadow hover:shadow-md transition"
          >
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* COUNTER */}
          <span className="text-sm tracking-widest text-gray-700">
            {index === 0
              ? images.length
              : index === slides.length - 1
                ? 1
                : index}{' '}
            / {images.length}
          </span>

          {/* RIGHT */}
          <button
            onClick={next}
            className="bg-white rounded-full p-2 shadow hover:shadow-md transition"
          >
            <svg
              className="w-6 h-6 text-red-600"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
