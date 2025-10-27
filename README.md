# ItemLendingSystem webbapp i Next.js
Byggd med **Next.js** och **TypeScript**, där produkter hanteras via **Supabase** och **React**. Plattformen erbjuder lån hantering filterfunktioner samt interaktiva inslag som kontaktformulär och dynamiska produktsida.


## Innehåll
- 📖 [Om projektet](#-om-projektet)
- ✨ [Funktioner](#-funktioner)
- 🛠 [Teknologier](#-teknologier)
- ⚙️ [Installation](#-installation)
- 🚀 [Användning](#-användning)
- 📂 [Projektstruktur](#-projektstruktur)
- 📈 [Arbetsflöde](#-arbetsflöde)
- 🗓 [Sprintplan](#-sprintplan)
- 📚 [Lärdomar](#-lärdomar)

## om Projektet
Detta projekt är en **Itemlending system** byggd med **Next.js 15** och **TypeScript** som en del av en individual projekt. Plattformen är minimalistisk, responsiv och fokuserar på interaktivitet och användarvänlighet.  

Vi använder **Supabase** som backend för att hantera produktdata, istället för externa API:er.  

Projektet har också varit en övning i **agilt och scrum method**, inklusive versionskontroll med Git/GitHub, projekthantering med GitHub Projects, samt fokus på **tillgänglighet** genom tester med WAVE.  

Plattformen använder moderna Next.js-funktioner som **Server Components**, **Client Components**, **statiska och dynamiska routes** samt **asynkron datahantering**, vilket ger praktisk erfarenhet av verkliga webbutvecklingsprojekt.

## Funktioner


## 🛠 Teknologier
- [Next.js 15 (App Router)](https://nextjs.org/) – Ramverk för React, används för både server- och klientkomponenter.  
- [TypeScript](https://www.typescriptlang.org/) – Starkt typat språk för JavaScript som används i hela projektet.  
- [Supabase](https://supabase.com/) – Backend som hanterar databasen och autentisering.  
- [Tailwind CSS](https://tailwindcss.com/) – CSS-ramverk för snabb och responsiv styling.  
- [WAVE](https://wave.webaim.org/) – Verktyg för att testa tillgänglighet. 

## ⚙️ Installation
```bash
# Klona repo
git clone https://github.com/ness1050/itemlendingsystem

# Gå in i projektmappen
cd itemlendingsystem
cd app/src

# Installera beroenden
npm install

# Starta utvecklingsserver
npm run dev
```

---


## 📦 ProjektStruktur
```
project-root
├── public
│   ├── category          # Static assets for categories (e.g., icons, images)
│   └── icons             # Common icons used across the app
└── src
    └── app
        ├── about         # About page or module content
        ├── assets        # Local images, fonts, or static files used by components
        ├── components
        │   └── globals   # Global reusable components shared across pages
        ├── contact       # Contact page and related logic
        ├── contract
        │   ├── create
        │   │   └── [itemId]  # Dynamic routes for creating a contract by item ID
        │   ├── view          # Contract view pages or components
        │   └── [id]          # Dynamic route for viewing contract details by ID
        ├── data           # Static data, JSON files, or data-related utilities
        ├── lib            # Library functions, helpers, or utilities
        ├── login
        │   └── component  # Components related to user login
        ├── member         # User/member management module
        ├── registration   # User registration or sign-up logic
        ├── request        # Handles user requests or API interactions
        ├── services
        │   ├── contract   # Service layer for handling contract operations
        │   ├── item       # Service layer for item-related operations
        │   ├── loan       # Service layer for loan management
        │   └── request    # Service layer for request handling
        ├── supabase       # Supabase configuration and database interaction
        ├── ui
        │   ├── button     # Reusable button components
        │   └── [id]Items  # Dynamic UI components for items
        └── user           # User profile, settings, or dashboard
```
