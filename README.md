# final-hotel-project

🏨 Hotel Booking Web Application – Final Project
📌 Projektübersicht

Dieses Projekt ist eine Full-Stack Hotelbuchungs-Webanwendung, die im Rahmen des Abschlussprojekts entwickelt wurde.
Ziel war es, eine realistische Hotel-Website mit Benutzerverwaltung, Buchungssystem und Admin-Funktionen umzusetzen.

Die Anwendung ermöglicht es Gästen, sich zu registrieren, Zimmer anzusehen und Buchungen vorzunehmen.
Administratoren können Buchungen verwalten und haben erweiterte Zugriffsrechte.

🛠️ Tech Stack
Frontend

React (Vite)

React Router

i18n (Mehrsprachigkeit: DE / EN)

CSS / moderne Komponentenstruktur

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

Bcrypt (Passwort-Hashing)

✨ Features
Benutzer (User)

Registrierung & Login

Profilseite

E-Mail ändern

Passwort ändern

Account löschen

Zimmerübersicht & Zimmerdetailseiten

Zimmer buchen

Eigene Buchungen einsehen („My Bookings“)

Mehrsprachige Oberfläche (Deutsch / Englisch)

Administrator (Admin)

Admin-Dashboard

Übersicht aller Buchungen

Zugriff auf geschützte Admin-Routen

🏨 Zimmer & Buchungssystem

Mehrere Zimmertypen mit eigenen Detailseiten

Einheitliche Struktur für alle Zimmer

Buchungsformular mit Backend-Anbindung

Speicherung der Buchungen in der Datenbank

Verknüpfung von Buchungen mit Benutzerkonten

🗂️ Projektstruktur
final-hotel-project/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── data/
│   │   ├── locales/
│   │   └── assets/
│
└── README.md

👥 Team & Rollenverteilung

Das Projekt wurde im Team umgesetzt.

Projektmanagement & Koordination

Frontend-Entwicklung

Backend-Entwicklung

(Die Rollen wurden während des Projekts klar aufgeteilt und koordiniert.)

🚀 Installation & Start
Backend
cd backend
npm install
npm run dev


Benötigte .env Variablen:

MONGO_URI=...
JWT_SECRET=...
JWT_EXPIRES_IN=7d
PORT=3000

Frontend
cd frontend
npm install
npm run dev

📌 Projektstatus

✅ Grundfunktionen vollständig umgesetzt
✅ Frontend & Backend erfolgreich verbunden
✅ Benutzer- und Admin-Logik vorhanden
🟡 UX-Feinschliff & Dokumentation in Arbeit

🎯 Fazit

Dieses Projekt zeigt die Umsetzung einer realistischen Full-Stack-Webanwendung mit klarer Struktur, Authentifizierung, Datenbankanbindung und praxisnahen Features.
Es wurde besonderer Wert auf Sauberkeit, Verständlichkeit und Erweiterbarkeit gelegt.