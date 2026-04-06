# SWAPI Search

Star Wars search application built with Next.js, TypeScript, and CSS Modules using the SWAPI API.

Users can search across all available SWAPI categories, sort results by name/title and switch between categories while retaining their previous search and sort state.

## Features

- Search across:
  - People
  - Planets
  - Films
  - Species
  - Starships
  - Vehicles

- View the full list of matching results for each category

- Sort results by:
  - Name / Title (A-Z)
  - Name / Title (Z-A)

- Loading state while fetching data

- Error handling for failed requests

- Most recently searched category displayed

- Previous search and sort state retained per category

- Transport categories display:
  - Name
  - Model
  - Manufacturer
  - Cost in credits
  - Length
  - Crew
  - Passengers
  - Cargo capacity

- Styled with CSS Modules

- Accessibility tweaked, semantic structure, labels, live components, status/error announcements.


## Tech Stack

- Next.js
- TypeScript
- React
- CSS Modules
- SWAPI (https://swapi.dev)


## Getting Started

Clone the repository and install dependencies:

```bash
npm install

## then, run the development server:

npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Notes

- Full result fetching

- SWAPI paginates results, so I implemented a helper function to fetch all pages for a category/search combination in order to meet the acceptance criteria of displaying the full result set.

- Per-category search retention

- ### Each category retains its own:
    - search term
    - sort option
    - results

    This allows users to switch between categories without losing their previous search state.

- Accessibility
- ### Basic WCAG 2.2 A/AA considerations were included, such as:
    - labelled form controls
    - keyboard-friendly inputs
    - loading and error announcements
    - semantic structure
    - visible focus states


## AI Usage
AI was used as a learning and support tool during development.

It was primarily used for:
- guidance while learning Next.js
- TypeScript explanations and improvements
- debugging support
- accessibility checks
- code review / cleanup suggestions

All code was reviewed, implemented and tested manually as part of the build process.
