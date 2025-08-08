# WowBank - Personal Banking App

A modern, responsive personal banking application built for demo purposes. Features a clean interface inspired by contemporary banking platforms with account management, transfers, and user profile functionality.

## Features

- **Dashboard Overview**: Account summaries with real-time balances
- **Multiple Account Types**: Checking, Savings, and Investment accounts
- **Money Transfers**: Internal account transfers with form validation
- **Transaction History**: Recent activity display with categorized transactions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Interactive UI**: Smooth animations and user feedback notifications

## Quick Start

### Prerequisites
- Node.js (for live-server)
- Modern web browser

### Installation

1. Clone or download the project
```bash
cd personal-banking-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm start
```

4. Open your browser to `http://localhost:3000`

### Alternative Setup (No dependencies)
Simply open `index.html` in your web browser to run the app locally.

## Project Structure

```
personal-banking-app/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── app.js             # JavaScript functionality
├── package.json       # Project dependencies
└── README.md          # This file
```

## Features Overview

### Navigation
- **Dashboard**: Account overview and recent activity
- **Accounts**: Detailed view of all accounts
- **Transfer**: Money transfer between accounts
- **Profile**: User information and settings

### Interactive Elements
- Account card hover effects
- Form validation with user feedback
- Real-time transaction updates
- Notification system for user actions
- Keyboard shortcuts (Alt + 1-4 for navigation)

### Demo Data
The app comes pre-loaded with sample data for demonstration:
- Premium Checking: $12,847.52
- High-Yield Savings: $35,692.18  
- Investment Account: $89,234.67
- Recent transactions and account details

## Customization

### Styling
- Modify `styles.css` to change colors, fonts, or layout
- CSS custom properties for easy theme adjustments
- Responsive breakpoints at 768px and 480px

### Content
- Update account information in `index.html`
- Modify sample transactions in the HTML
- Adjust user profile information

### Functionality
- Add new features in `app.js`
- Extend form validation rules
- Integrate with real banking APIs (remove demo notifications)

## Browser Support
- Chrome/Chromium 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Performance
- Lightweight vanilla JavaScript (no frameworks)
- Optimized CSS with minimal external dependencies
- Fast loading times with efficient asset usage

## Security Note
This is a demo application with no real authentication or data persistence. For production use, implement proper security measures, authentication, and backend integration.

## License
MIT License - Feel free to use for demos, learning, or as a starting point for real applications.
