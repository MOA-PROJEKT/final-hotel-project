import React from "react";
import { useState } from "react";
import Hero from "../assets/images/wellness/Hero.webp";
import spaMassage from "../assets/images/wellness/spaMassage.jpg";
import spaSauna from "../assets/images/wellness/spaSauna.jpg";
import spaPool2 from "../assets/images/wellness/spaPool2.jpg";
import yogaSession from "../assets/images/wellness/yogaSession.jpg";
import fitnessGym from "../assets/images/wellness/fitnessGym.jpg";
import yoga1 from "../assets/images/wellness/yoga1.webp";
import yoga2 from "../assets/images/wellness/yoga2.webp";
import yoga3 from "../assets/images/wellness/yoga3.webp";
import yoga4 from "../assets/images/wellness/yoga4.webp";
import yoga5 from "../assets/images/wellness/yoga5.webp";
import yoga6 from "../assets/images/wellness/yoga6.webp";

import ImageCarousel from "../components/ImageCaroussel.jsx";

const carouselImages = [yoga1, yoga2, yoga3, yoga4, yoga5, yoga6];

export default function Wellness() {
  return (
    <section>
      {/* HERO */}
      <div id="hero" className="relative min-h-[90vh] overflow-hidden">
        <img
          src={Hero}
          alt="hero bild"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-slate-900/35" />

        <div className="relative z-10 flex min-h-[90vh] items-center justify-center">
          <div className="mx-auto max-w-3xl px-4 text-center text-white">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold leading-tight">
              Wellness, Spa & Fitness.
            </h1>

            {/* TERMIN BUCHEN BUTTON */}
            <button className="mt-8 inline-block px-8 py-3 bg-amber-300 text-black font-semibold rounded-full transition hover:bg-amber-600">
              Termin buchen
            </button>
          </div>
        </div>
      </div>

      {/* INTRO */}
      <section>
        <div className="flex flex-col items-center text-center px-6 py-16">
          <p className="text-black text-2xl mt-4 max-w-3xl mx-auto">
            Entdecken Sie unsere exklusive Wellnesswelt – von entspannenden Spa-
            Anwendungen über ruhige Yoga-Sessions bis hin zu einem modernen
            Fitnessbereich für ein ganzheitliches Wohlfühlerlebnis.
          </p>
        </div>
      </section>

      {/* --- SPA SECTION --- */}
     <section>
  <div className="container mx-auto px-6 mb-24">
    <h2 className="text-3xl font-semibold text-amber-600 mb-8">
      Spa Angebote
    </h2>

    <div className="grid md:grid-cols-3 gap-10">
      {/* Massage */}
      <div className="bg-stone-300 rounded-2xl overflow-hidden border border-neutral-800">
        <img
          src={spaMassage}
          alt="Massage"
          className="w-full h-56 object-cover"
        />
        <div className="p-6">
          <h3 className="text-2xl text-amber-600 mb-2">Premium Massage</h3>
          <p className="text-black">
            Wohltuende Ganzkörper-, Aroma- oder Hot-Stone-Massagen für absolute Tiefenentspannung. 
            Lassen Sie den Stress des Alltags hinter sich und genießen Sie eine individuell abgestimmte 
            Behandlung, die Körper und Geist wieder in Balance bringt. Ideal, um neue Energie zu tanken 
            und tief zu entspannen.
          </p>
        </div>
      </div>

      {/* Sauna */}
      <div className="bg-stone-300 rounded-2xl overflow-hidden border border-neutral-800">
        <img
          src={spaSauna}
          alt="Sauna"
          className="w-full h-56 object-cover"
        />
        <div className="p-6">
          <h3 className="text-2xl text-amber-600 mb-2">Finnische Sauna</h3>
          <p className="text-black">
            Genießen Sie intensive Wärme und regenerative Erholung in unserer modernen Sauna. 
            Verschiedene Aufguss-Rituale und Ruhebereiche laden zum Abschalten ein und fördern 
            Wohlbefinden, Durchblutung und Entspannung. Perfekt für eine Auszeit vom Alltag.
          </p>
        </div>
      </div>

      {/* Pool */}
      <div className="bg-stone-300 rounded-2xl overflow-hidden border border-neutral-800">
        <img
          src={spaPool2}
          alt="Heated Pool"
          className="w-full h-56 object-cover"
        />
        <div className="p-6">
          <h3 className="text-2xl text-amber-600 mb-2">Innenpool</h3>
          <p className="text-black-400">
            Unser beheizter Poolbereich bietet sanfte Beleuchtung und ein angenehmes Ambiente 
            für entspanntes Schwimmen oder relaxte Momente. Ideal zum Abschalten, Energie tanken 
            oder für private Wellness-Momente in ruhiger Atmosphäre.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
      <section className="my-24">
        <ImageCarousel images={carouselImages} />
      </section>

      {/* --- YOGA SECTION --- */}
      <section>
        <div className="container mx-auto px-6 mb-24">
          <h2 className="text-3xl font-semibold text-amber-600 mb-8">
            Yoga & Meditation
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            <img
              src={yogaSession}
              alt="Fitness"
              className="rounded-2xl object-cover h-80 w-full border border-neutral-800"
            />

            <div className="flex flex-col justify-center">
              <h3 className="text-xl text-amber-600 mb-4">
                Tägliche Yoga-Stunden
              </h3>
              <p className="text-black-400 leading-relaxed mb-4">
                Finden Sie innere Ruhe und Balance in unseren professionell
                geführten Yoga- und Meditationsstunden — ideal für Anfänger und
                Fortgeschrittene.
              </p>

              <ul className="text-black-400 space-y-2">
                <li>• Morgen-Yoga für Energie</li>
                <li>• Entspannungs-Yoga am Abend</li>
                <li>• Meditation & Atemübungen</li>
                <li>• Private Yoga-Sessions</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- FITNESS SECTION --- */}
      <section className="mb-24">
        {" "}
        {/* Abstand zum Footer */}
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-amber-600 mb-8">
            Fitness & Gym
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="flex flex-col justify-center">
              <h3 className="text-xl text-amber-600 mb-4">
                Modernes Fitnessstudio
              </h3>
              <p className="text-black-400 leading-relaxed mb-4">
                Unser Fitnessbereich ist ausgestattet mit neuesten Geräten für
                Kraft- und Ausdauertraining – perfekt für alle, die aktiv
                bleiben möchten.
              </p>

              <ul className="text-black-400 space-y-2">
                <li>• Laufbänder & Crosstrainer</li>
                <li>• Freihantelbereich</li>
                <li>• Kraftgeräte & Functional Training</li>
                <li>• Personal Trainer auf Anfrage</li>
              </ul>
            </div>

            <img
              src={fitnessGym}
              alt="Fitness"
              className="rounded-2xl object-cover mb-5 h-80 w-full border border-neutral-800"
            />
          </div>
        </div>
      </section>
    </section>
  );
}
