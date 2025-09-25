# Pi Core Nexus

Welcome to Pi Core Nexus, a feature-rich frontend demo for a conceptual Pi Network-integrated application. This project showcases a blend of e-commerce, media streaming, gaming, and a complete crypto wallet experience, all within a sleek, futuristic user interface.

## 🚀 Project Overview

Pi Core Nexus is designed to be an all-in-one platform that demonstrates the potential of integrating various services with the Pi Network. It provides a tangible user experience for a system where users can shop, watch streams, play games, and manage their Pi cryptocurrency seamlessly.

This is a **frontend-only demonstration** using mock data and simulated functionalities to illustrate the core user flows and UI/UX design.

## ✨ Features

- **🏠 Homepage**: A dynamic landing page featuring highlights from the marketplace, streaming, and gaming sections.
- **🛒 Marketplace**: Browse, search, and view detailed product pages in a futuristic e-commerce setting.
- **📺 Streaming Platform**: A section for watching simulated live streams and videos on demand.
- **🎮 Gaming Hub**: A portal to discover and launch "Play-to-Earn" games integrated with the Pi economy.
- **🔐 Authentication**: A simulated login system ("Connect Wallet") to provide a personalized user experience.
- **👤 User Profile**: A dedicated page for users to view their balance, wallet address, and edit their profile information (username and avatar).
- **💸 Comprehensive Wallet**:
    - **Dashboard**: View your Pi balance and a list of recent transactions.
    - **Core Actions**: Interactive modals for sending, receiving, and adding funds.
    - **Trading**:
        - **Buy/Sell**: A modal to trade Pi for USD.
        - **Swap**: Exchange Pi for other mock cryptocurrencies like ETH and BTC.
        - **Bridge**: A conceptual feature to transfer Pi to other blockchains.
    - **Live Price Simulation**: Mock prices for Pi, ETH, and BTC update every 30 seconds to simulate real market fluctuations.
- **📱 Responsive Design**: A mobile-first design with a collapsible sidebar menu ensures a seamless experience on all devices.
- **🎨 Consistent UI/UX**: All interactive elements, especially modals, share a unified and polished design for a cohesive user journey.

## 🛠️ Tech Stack

- **Framework**: [React](https://reactjs.org/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **State Management**: React Context API for global state (Authentication and Prices).

## 📂 Project Structure

The project is organized into logical directories to maintain clarity and scalability:

```
/
├── components/       # Reusable UI components (Button, Header, Modals, etc.)
├── constants/        # Mock data for products, videos, games, etc.
├── hooks/            # Custom React hooks (useAuth, usePrice)
├── pages/            # Top-level page components for each route
├── App.tsx           # Main application component with routing setup
├── index.html        # The entry point of the application
├── index.tsx         # The React root renderer
└── types.ts          # TypeScript type definitions
```

## 🏃‍♂️ How to Run

This is a self-contained frontend application with no build step required.

1.  Ensure all the provided files are in the same directory.
2.  Open the `index.html` file in any modern web browser.

The application will load and be fully interactive.
