# Carriage Train Monitor

![Build](https://img.shields.io/badge/build-ready-success) ![License](https://img.shields.io/badge/license-MIT-blue) ![React](https://img.shields.io/badge/react-18.3.1-61dafb)

## Overview
Carriage Train Monitor is a React application developed by Antonio Baldari to showcase a production-ready front-end architecture. The project simulates live Belgian rail data, allowing users to inspect carriage compositions, accessibility facilities, and passenger occupancy in real time.

## Features
- Search for trains by station with debounced filtering and instant feedback.
- Live mocked updates refresh occupancy and service status without reloading the page.
- Detailed carriage layout highlighting accessibility and amenity information.
- Responsive Bootstrap-driven interface with keyboard navigation and ARIA semantics.
- Configurable API layer prepared for swapping the mock service with a production endpoint.

## Installation
```bash
npm install
```

## Usage
```bash
npm start
```
The development server runs on [http://localhost:3000](http://localhost:3000). Updates from the mocked API stream are simulated every 10 seconds.

## Architecture
- **Components** – Presentational UI broken down into reusable pieces inside `src/components`.
- **Hooks** – Custom hooks in `src/hooks` encapsulate debouncing and live data subscriptions.
- **Utilities** – Mock API and shared helpers live in `src/utils`, making it simple to replace with a real service.
- **Assets** – Static files such as logos are stored in `src/assets`.
- **Styles** – Component-scoped styles and global layout utilities ensure consistent presentation.

## Components Overview
- `SearchBar` handles keyboard-accessible station search and submissions.
- `TrainDisplay` orchestrates loading, error, and data states while rendering train cards.
- `TrainHeader`, `TrainDetails`, and `CarriageList` present schedule metadata, live KPIs, and carriage compositions respectively.
- `StatusMessage` delivers reusable alert styling for system feedback.

## Technologies
- React 18 with functional components and hooks.
- Bootstrap-inspired utility classes for layout and spacing consistency.
- Jest and React Testing Library for unit and snapshot testing.
- ESLint and Prettier for code quality enforcement.

## Testing
```bash
npm test
```
This command runs the Jest test suite with React Testing Library, including snapshot coverage for the primary UI components.

## Deployment
The project is deployment-ready for static hosting providers such as Netlify or Vercel.

### Netlify
1. Create a new Netlify site linked to this repository.
2. Use the build command `npm run build` and publish the `build` directory.
3. Configure an environment variable `REACT_APP_API_BASE_URL` if pointing to a live API.

### Vercel
1. Import the repository into Vercel.
2. Set the build command to `npm run build` and the output directory to `build`.
3. Add `REACT_APP_API_BASE_URL` under project Environment Variables when connecting to a production backend.

## Live Updates & Filtering
The mock API layer emits fresh train data every 10 seconds, updating carriage occupancy and service status. The `useTrainSearch` hook listens to this stream, merges updates with the current filter, and debounces user input to avoid unnecessary requests.

## Accessibility & Responsiveness
Keyboard navigation, ARIA roles, and semantic HTML ensure the interface is usable with assistive technologies. Layouts adapt to small screens with responsive CSS and Bootstrap utility classes for spacing and alignment.

## License
This project is licensed under the [MIT License](LICENSE).
