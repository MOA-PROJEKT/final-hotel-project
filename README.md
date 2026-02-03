# Final Hotel Project

Full-Stack Hotel Booking Web Application

# Projektübersicht

Dieses Projekt ist eine Full-Stack Hotelbuchungs-Webanwendung, die im Rahmen des Abschlussprojekts entwickelt wurde.
Ziel war es, eine realistische Hotel-Website mit Benutzerverwaltung, Buchungssystem, Admin-Funktionen sowie sauberer Backend-Validierung und -Sanitization umzusetzen.

Die Anwendung ermöglicht es Gästen, sich zu registrieren, Zimmer anzusehen und Buchungen vorzunehmen.
Administratoren können Buchungen verwalten und haben Zugriff auf geschützte Admin-Bereiche.

Ein besonderer Fokus lag auf:

klarer Projektstruktur

sicherer Authentifizierung

robuster Backend-Validierung (Dozent-Anforderung)

verständlichem und wartbarem Code

# Tech Stack
Frontend

React (Vite)

React Router

i18n (Mehrsprachigkeit: Deutsch / Englisch)

Moderne Komponentenstruktur

CSS

Backend

Node.js

Express.js

MongoDB (Mongoose)

JWT Authentication

bcrypt (Passwort-Hashing)

express-validator (Validation & Sanitization)

# Features
# Benutzer (User)

Registrierung & Login

Profilseite

E-Mail ändern

Passwort ändern

Account löschen

Zimmerübersicht & Zimmerdetailseiten

Zimmer buchen

Eigene Buchungen einsehen („My Bookings“)

Mehrsprachige Oberfläche (DE / EN)

# Administrator (Admin)

Admin-Dashboard

Übersicht aller Buchungen

Status von Buchungen ändern (z.B. pending / confirmed / cancelled)

Zugriff auf geschützte Admin-Routen (Role-Based Access Control)

# Zimmer & Buchungssystem

Mehrere Zimmertypen mit eigenen Detailseiten

Einheitliche Struktur für alle Zimmer

Buchungsformular mit Frontend- und Backend-Validierung

Speicherung der Buchungen in MongoDB

Verknüpfung von Buchungen mit Benutzerkonten

Gästeanzahl abhängig vom jeweiligen Zimmer begrenzt

# Validation & Sanitization 

Im Backend wird jede relevante Route validiert und bereinigt:

Validation

Request-Body-Validierung mit express-validator

Param-Validation für alle :id Routen (isMongoId)

Status-Validierung für Admin-Buchungsupdates (Whitelist)

Einheitliches Fehlerformat über zentrale validateRequest Middleware

Sanitization

trim() für Textfelder (z.B. Name, E-Mail)

toLowerCase() & normalizeEmail() für E-Mail-Adressen

escape() für Benutzer-Namen (XSS-Schutz)

Bereinigung erfolgt vor der Verarbeitung und Speicherung der Daten

# Dadurch wird sichergestellt, dass nur saubere, sichere und konsistente Daten im System verarbeitet werden.

# Projektstruktur
final-hotel-project/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── schemas/
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

# Installation & Start
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

# Team & Zusammenarbeit

Das Projekt wurde im Team umgesetzt.
Die Aufgaben wurden klar verteilt und koordiniert, u.a.:

Projektstruktur & Planung
Frontend-Entwicklung
Backend-Entwicklung
Validierung & Sicherheit

# Projektstatus

- Grundfunktionen vollständig umgesetzt
- Frontend & Backend erfolgreich verbunden
- Benutzer- und Admin-Logik implementiert
- Umfassende Backend-Validation & Sanitization
- UX-Feinschliff & weitere Erweiterungen möglich

# Fazit

Dieses Projekt zeigt die Umsetzung einer realistischen Full-Stack-Webanwendung mit klarer Architektur, sicherer Authentifizierung und robuster Datenverarbeitung.

Besonderer Wert wurde auf:

saubere Backend-Validierung
Daten-Sanitization
verständlichen Code
Erweiterbarkeit
gelegt und erfüllt damit die Anforderungen eines Abschlussprojekts vollständig.