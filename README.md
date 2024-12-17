
# 🚆 FE-carriage_train-realTime

## Introduction
This is a **React.js** project that displays real-time train carriage information. It allows users to search for specific stations and view detailed information about train carriages, including features like **bike accessibility** and **wheelchair access**.

---

## Table of Contents
1. [Features](#features)  
2. [Installation](#installation)  
3. [Usage](#usage)  
4. [Components Overview](#components-overview)  
5. [Dependencies](#dependencies)  
6. [Testing](#testing)  
7. [Troubleshooting](#troubleshooting)  
8. [Contributors](#contributors)  
9. [License](#license)

---

## Features
- 🕵️ **Search for Stations**: Search by station name to retrieve train details.  
- 🚲 **Carriage Features**: Displays carriages equipped with bike or wheelchair access.  
- 🕒 **Loading State**: Shows a loading indicator while fetching data.  
- 📡 **Real-Time Data (Mock)**: Simulates real-time train data fetching with mock API response.  

---

## Installation

### Prerequisites  
Make sure you have the following installed:  
- **Node.js** (version 14+ recommended)  
- **npm** (Node package manager)  

### Steps to Install and Run  
1. **Clone the repository**:  
   ```bash
   git clone https://github.com/ElBaldo1/FE-carriage_train-realTime.git
   cd FE-carriage_train-realTime
   ```

2. **Install project dependencies**:  
   ```bash
   npm install
   ```

3. **Start the development server**:  
   ```bash
   npm start
   ```

4. Open your browser and navigate to:  
   ```bash
   http://localhost:3000
   ```

---

## Usage
1. **Enter a Station Name** in the search bar.  
2. View train details such as:  
   - Carriage layout  
   - Accessibility features  
   - Train stops and schedule  

3. Real-time mock data is displayed dynamically based on input.

---

## Components Overview

- **App.js**: Main application entry point.  
- **SearchBar.jsx**: Handles user input and API calls (mocked).  
- **TrainDisplay.jsx**: Renders train details and carriage information.  
   - **TrainHeader.jsx**: Displays train time, name, and stops.  
   - **TrainDetails.jsx**: Shows additional train details.  
   - **CarriageList.jsx**: Displays carriages and their features.  
- **index.js**: Application bootstrap file.  

---

## Dependencies
- **React** (UI Framework)  
- **Axios** (API requests)  
- **React Testing Library** (Testing utilities)  
- **Jest** (Test runner for unit testing)  

---

## Testing
Run tests with the following command:  
```bash
npm test
```
- Unit tests are located in `App.test.js` for basic component rendering.  

---

## Troubleshooting
- **Data Not Loading**: Ensure the mock backend or API endpoint is configured properly.  
- **API Errors**: Check `SearchBar.jsx` and verify the API URL (`http://localhost:5000`).  
- **Styles Not Applied**: Verify `style.css` is correctly imported.

---

## Contributors
- **[Your Name Here]**  
- Contributions welcome! Feel free to fork the repo and submit pull requests.  

---

## License
This project is licensed under the **MIT License**.  

---

## Repository
- GitHub Repository: [FE-carriage_train-realTime](https://github.com/ElBaldo1/FE-carriage_train-realTime)
