# **Stock Investment Simulation Frontend**

The **Stock Investment Simulation Frontend** is an application developed in React that allows users to simulate the performance of stock investments over time. The application collects historical stock price data from a Python Backend API and presents both **line charts** and **candlestick charts** to visualize the growth or decrease of investments over a given period.

---

## **Key Features**

- **Interactive Charts**: Visualize stock performance with line charts and candlestick charts.
- **Advanced Options**: Configure analysis period and risk tolerance for custom simulations.
- **Improved UX**: Enhanced user experience with collapsible "Advanced Options" and dynamic date behavior.
- **Error Handling**: Display clear and informative error messages returned from the API.
- **Environment-Based Configuration**: Default options (e.g., risk tolerance, analysis period) now load dynamically from environment variables.

---

## **Overview**

The frontend is built using **React** and leverages **Chart.js**, **ApexCharts**, and **TradingView Lightweight Charts** to visualize stock performance interactively. Users can simulate investment growth or decline by providing basic inputs such as stock symbol, date range, and investment amount.

---

## **Technologies**

- **React**: Frontend framework for building user interfaces.
- **Chart.js**: For line charts.
- **ApexCharts**: For candlestick charts.
- **Axios**: For HTTP requests to the backend.
- **CSS3**: For responsive and clean UI styling.
- **Environment Variables**: Dynamic configuration with `.env` files.

---

## **Installation**

Follow these steps to set up the project locally:

### **Prerequisites**

- **Node.js** (recommended version: 20.x or higher)
- **npm** or **yarn** for package management
- **Backend API**: Ensure the backend is set up and running. [Stock Simulator Backend](https://github.com/fnldesign/stock-simulator-backend.git).

---

### **Installation Steps**

1. **Clone the Repository**:

```bash
git clone https://github.com/fnldesign/stock-simulator-frontend.git
cd stock-simulator-frontend
```

2. **Install Dependencies**:

```bash
npm install
# or
yarn install
```

3. **Environment Configuration**:

Create a `.env` file in the root directory and set default values:

```bash
VITE_APP_RISK_TOLERANCE=Medium
VITE_APP_ANALYSIS_PERIOD="1 Year"
VITE_API_BASE_URL="http://localhost:5000/api"
```

4. **Run the Project**:

```bash
npm run dev
# or
yarn run dev
```

The project will start on [http://localhost:5173](http://localhost:5173).

---

## **Folder Structure**

```graphql
src/
├── components/         # Reusable React components
│   ├── SimulationForm.jsx      # Form for inserting simulation data
│   ├── SimulationResults.jsx   # Display of simulation results
│   ├── ApexCandlestickChart.jsx # Candlestick chart using ApexCharts
│   ├── LightweightCandlestickChart.jsx # Candlestick chart using Lightweight Charts
│   ├── StockChart.jsx           # Line Chart using Chart.js
├── pages/              # Main pages
│   └── HomePage.jsx    # Home page with form and results
├── services/           # API services
│   └── apiService.js   # Functions for API calls
├── App.jsx             # React root component
├── index.js            # Entry point
└── styles/             # CSS styles
    ├── HomePage.css
    ├── SimulationForm.css
    └── ApexCandlestickChart.css
```

---

## **Contribution Instructions**

We are using **Git Flow** for managing branches. Please adhere to the following guidelines:

1. **Fork** the repository.
2. **Clone** the repository to your machine:

   ```bash
   git clone https://github.com/<your-username>/stock-simulator-frontend.git
   cd stock-simulator-frontend
   ```

3. Create a **feature branch** using Git Flow:

   ```bash
   git flow feature start feature-name
   ```

4. **Make your changes**, test them thoroughly, and commit:

   ```bash
   git add .
   git commit -m "Add feature: description of the feature"
   ```

5. Push your feature branch:

   ```bash
   git push origin feature/feature-name
   ```

6. Open a **Pull Request** for code review.

---

## **License**

This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International License** (CC BY-NC 4.0).  
See the [LICENSE.md](./LICENSE.md) file for details.

---

## **Contact**

For questions or contributions, reach out via:

- Email: **fnldesign@hotmail.com**
- Open an issue on this repository.

---

## **Changelog**

- **Dynamic Options**: Advanced options now use environment variables for default values.
- **Improved UX**: Advanced Options accordion with analysis period adjustment.
- **Error Handling**: Clear error messages displayed for API failures.
- **Git Flow**: Adopted Git Flow for branch management.

---

**Thank you for contributing to the Stock Investment Simulation Project!** 🚀
