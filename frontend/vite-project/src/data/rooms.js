// src/data/rooms.js

// Eure Zimmerbilder (genau so, wie sie im Explorer heißen)
import DELUXE_DOUBLE from "../assets/images/zimmer/DELUXE_DOUBLE.jpg";
import JUNIOR_MEDIUM from "../assets/images/zimmer/1_Titelbild_Junior-Suite-Medium.jpg";
import DELUXE_SUITE from "../assets/images//zimmer/1_Titelbild_Deluxe-Suite-living-room.jpg";
import TWIN_JUNIOR from "../assets/images/zimmer/1_Titelbild_Twin-Junior-Suite.jpg";
import letzte from "../assets/images/zimmer/letzte.webp";
import CORNER_JUNIOR from "../assets/images/zimmer/1_Titelbild_Corner-Junior-Suite.jpg";
import GRAND_SUITE from "../assets/images/zimmer/1_Titelbild_Grand-Suite-bedroom.jpg";
import PENTHOUSE from "../assets/images/zimmer/4_Carlton_Penthouse-13.jpg";

export const rooms = [
  {
    id: "deluxe-double",
    name: "Deluxe Doppelzimmer",
    size: "35–45 m²",
    category: "Zimmer",
    image: DELUXE_DOUBLE,
    shortDescription:
      "Individuell eingerichtet in warmen Farbpaletten, mit maßgefertigtem Mobiliar. Selbst als Einstiegskategorie bietet das Deluxe Doppelzimmer einen Blick auf die umliegenden Berge und den See.",
  },
  {
    id: "junior-suite-medium",
    name: "Junior Suite Medium",
    size: "55 m²",
    category: "Suite",
    image: JUNIOR_MEDIUM,
    shortDescription:
      "Gemütliche Junior Suite mit kombiniertem Wohn- und Schlafraum, Kingsize-Bett und nach Süden ausgerichtetem Blick auf die Landschaft mit Panoramablick über den See.",
  },
  {
    id: "deluxe-suite",
    name: "Deluxe Suite",
    size: "70 m²",
    category: "Suite",
    image: DELUXE_SUITE,
    shortDescription:
      "Großzügige Suite, deren Fensterfront den Blick weit über die Berge und den See öffnet. Viel Raum für ruhige Momente und lange Abende.",
  },
  {
    id: "twin-junior-suite",
    name: "Twin Junior Suite",
    size: "55 m²",
    category: "Suite",
    image: TWIN_JUNIOR,
    shortDescription:
      "Junior Suite mit zwei Queensize-Betten – ideal für Reisen zu zweit oder mit Freunden. Der Blick schweift über die Landschaft und den St. Moritzersee.",
  },
  {
    id: "junior-suite-large",
    name: "Junior Suite Large",
    size: "65 m²",
    category: "Suite",
    image: letzte,
    shortDescription:
      "Unsere Empfehlung für alle, die etwas mehr Platz schätzen: eine großzügige Junior Suite mit Badewanne, Dusche und Blick nach Süden auf die Bergwelt.",
  },
  {
    id: "corner-junior-suite",
    name: "Corner Junior Suite",
    size: "75 m²",
    category: "Suite",
    image: CORNER_JUNIOR,
    shortDescription:
      "Eck-Suite mit gemütlicher Sitzecke zum Zurücklehnen nach einem Tag im Schnee. Der Balkon öffnet sich zur Sonne und über den See.",
  },
  {
    id: "grand-suite",
    name: "Grand Suite",
    size: "80 m²",
    category: "Suite",
    image: GRAND_SUITE,
    shortDescription:
      "Komfort und Großzügigkeit in den oberen Etagen. Die Grand Suite verbindet weiche Stoffe, klare Linien und einen weiten Blick über Berge und Tal.",
  },
  {
    id: "penthouse-suite",
    name: "Carlton Penthouse Suite",
    size: "386 m²",
    category: "Penthouse",
    image: PENTHOUSE,
    shortDescription:
      "Fünf Balkone, ein Panorama-Rundumblick und ein Wohnbereich, der sich wie ein privates Refugium anfühlt. Die Penthouse Suite nimmt die gesamte oberste Etage ein.",
  },
];
