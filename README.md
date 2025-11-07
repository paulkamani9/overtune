# Frontend – Overtune (Vue.js)

**Hosted URL (GitHub Pages):**  
https://paulkamani.github.io/overtune-frontend/

**GitHub Repository:**  
https://github.com/paulkamani9/overtune

---

**Tutor:** Dr Zia Lallmahomed  
**Module:** CST3144 – Full Stack Development  
**Student:** Paul Kamani

---

## 🧩 Description

The Overtune frontend is a Vue.js single-page application that lets students and parents browse, sort, and book after-school music lessons. It fetches data dynamically from the backend hosted on AWS Elastic Beanstalk and displays live availability from MongoDB Atlas.

This application provides an intuitive interface for exploring various music lessons (piano, guitar, vocals, drums, etc.), managing a shopping cart, and completing secure bookings with real-time inventory updates.

---

## 💻 Tech Stack

- **Vue.js 2.7.14** – Progressive JavaScript framework for building user interfaces
- **Bootstrap 5.3.2** – Modern CSS framework for responsive design
- **JavaScript (ES6)** – Modern JavaScript with async/await patterns
- **Font Awesome 6.5.1** – Icon library for UI enhancements
- **GitHub Pages** – Static site hosting
- **AWS Elastic Beanstalk** – Backend integration for API calls
- **MongoDB Atlas** – Cloud database for lesson and order data

---

## 🌐 API Endpoints

All API endpoints are fetched from the AWS backend using native `fetch()` API with Promises (no Axios):

**Base URL:** `http://overtune-env.eba-tx7disv7.us-east-1.elasticbeanstalk.com`

### Endpoints:

- **GET /lessons** – Retrieve all available lessons
- **GET /search?q={query}** – Search lessons by keyword
- **POST /orders** – Create a new order/booking
- **PUT /lessons/:id** – Update lesson availability (spaces)

---

## 🧠 Features

### Core Functionality

- **Browse Lessons** – View all available music lessons with images, pricing, and availability
- **Search** – Real-time search-as-you-type functionality with debouncing (500ms)
- **Voice Search** – Voice-activated search using Web Speech API (browser-dependent)
- **Filter by Location** – Filter lessons by Online or In-Person
- **Sort Options** – Sort lessons by:
  - Subject (A-Z)
  - Price (Low to High / High to Low)
  - Available Spaces
- **Shopping Cart** – Add, remove, and adjust lesson quantities
- **Checkout** – Complete bookings with customer information
- **Form Validation** – Client-side validation for Name (letters only) and Phone (numbers only)
- **Dark/Light Theme** – Toggle between themes with animated vinyl icon
- **Responsive Design** – Mobile-first design that works on all screen sizes
- **Success Confirmation** – Visual feedback after successful booking

### Technical Features

- **Real-time Inventory** – Lesson spaces update dynamically after bookings
- **Local Storage** – Cart persists across page refreshes
- **Debounced Search** – Optimized API calls with 500ms delay
- **Loading States** – User feedback during API operations
- **Error Handling** – Graceful error messages for failed operations
- **Accessibility** – Semantic HTML and keyboard navigation support

---

## ⚙️ Development & Deployment

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Node.js and npm (optional, for local development server)

### Local Development

If you want to run a local development server:

```bash
# Install a simple HTTP server (if needed)
npm install -g http-server

# Navigate to project directory
cd overtune

# Start local server
http-server -p 8080

# Or use Python
python -m http.server 8080
```

Then open `http://localhost:8080` in your browser.

### Direct File Access

Alternatively, you can open `index.html` directly in your browser, though some features may work better with a local server.

### Build for Production

This is a static site, so no build process is required. Simply deploy the following files:

- `index.html`
- `app.js`
- `styles.css`

### GitHub Pages Deployment

1. **Create a GitHub repository** for your frontend code
2. **Push your code** to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```
3. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select branch: `main`
   - Select folder: `/ (root)`
   - Click "Save"
4. **Access your site** at: `https://<username>.github.io/<repository-name>/`

---

## 📁 Project Structure

```
overtune/
├── index.html          # Main HTML file with Vue.js templates
├── app.js              # Vue.js application logic and API calls
├── styles.css          # Custom styles and theme system
└── README.md           # Project documentation
```

---

## 🎨 Customization

### Changing the Backend URL

To point to a different backend server, update the `BASE_URL` constant in `app.js`:

```javascript
const BASE_URL = "http://your-backend-url.com";
```

### Theme Customization

The application supports dark/light themes with CSS custom properties. To customize colors, edit the `:root` and `[data-theme="dark"]` sections in `styles.css`:

```css
:root {
  --primary-color: #4c6ef5;
  --secondary-color: #ffd43b;
  /* ... other variables */
}
```

---

## 🔧 Browser Compatibility

- **Chrome/Edge** (recommended) – Full support including voice search
- **Firefox** – Full support including voice search
- **Safari** – Full support (voice search may require user permission)
- **Mobile Browsers** – Responsive design works on iOS and Android

---

## 📝 Form Validation Rules

### Checkout Form

- **Name Field**:
  - Required
  - Letters and spaces only
  - Pattern: `[A-Za-z\s]+`
- **Phone Field**:
  - Required
  - Numbers only
  - Pattern: `[0-9]+`

---

## 🚀 Features Breakdown

### Vue.js Data Management

- **Reactive data binding** for real-time UI updates
- **Computed properties** for filtered lessons and cart totals
- **Watchers** for cart persistence to localStorage
- **Lifecycle hooks** for initialization

### User Experience Enhancements

- **Animated transitions** for smooth interactions
- **Loading indicators** during API calls
- **Success/error modals** for user feedback
- **Vinyl record icon** animation for theme toggle
- **Voice search pulse** animation when listening

---

## 🐛 Troubleshooting

### API Connection Issues

If lessons are not loading:

1. Check browser console for errors
2. Verify the AWS backend URL is accessible
3. Ensure CORS is enabled on the backend
4. Check your internet connection

### Voice Search Not Working

- Ensure you're using HTTPS or localhost
- Grant microphone permissions when prompted
- Use Chrome or Firefox for best compatibility
- Check browser console for Speech API errors

### Cart Not Persisting

- Check if localStorage is enabled in your browser
- Clear browser cache and try again
- Ensure you're not in incognito/private mode

---

## 🧑‍🏫 Acknowledgements

- **Tutor:** Dr Zia Lallmahomed
- **Module Leader:** Dr Luca Piras
- **Module:** CST3144 – Full Stack Development
- **Coursework Deadline:** Week 11

---

## 📄 License

This project is created for educational purposes as part of the CST3144 coursework at Middlesex University.

---

## 📞 Contact

**Student:** Paul Kamani  
**Module:** CST3144 – Full Stack Development  
**Academic Year:** 2024/2025

---

_Last Updated: November 2025_
