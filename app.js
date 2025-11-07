// OverTune Vue.js 2 Application

// API Base URL - Change this to your deployed backend URL
const BASE_URL = "http://localhost:4000";

// Main Vue Instance
new Vue({
  el: "#app",
  data: {
    // View States
    currentView: "lessons",
    showCart: false,
    showCheckout: false,
    showSuccess: false,

    // Loading States
    isLoading: false,
    isCheckoutLoading: false,

    // Theme State
    isDarkMode: false,
    isThemeChanging: false,

    // Voice Search State
    isListening: false,
    voiceSearchSupported: false,
    recognition: null,

    // Lessons
    lessons: [],
    searchQuery: "",
    searchTimeout: null,
    sortBy: "",
    locationFilter: "",

    // Cart
    cart: [],

    // Forms
    checkoutForm: {
      name: "",
      phone: "",
    },

    // Errors
    checkoutError: "",
  },

  computed: {
    filteredLessons() {
      let filtered = this.lessons;

      // Filter by location
      if (this.locationFilter) {
        if (this.locationFilter === "Online") {
          filtered = filtered.filter(
            (l) => l.location.toLowerCase() === "online"
          );
        } else if (this.locationFilter === "In-Person") {
          filtered = filtered.filter(
            (l) => l.location.toLowerCase() !== "online"
          );
        }
      }

      return filtered;
    },

    cartTotal() {
      return this.cart.reduce((sum, item) => {
        return sum + item.lesson.price * item.quantity;
      }, 0);
    },
  },

  methods: {
    // Helper method to get instrument icon based on lesson subject
    getInstrumentIcon(subject) {
      const icons = {
        piano: "fas fa-piano",
        guitar: "fas fa-guitar",
        vocal: "fas fa-microphone",
        drum: "fas fa-drum",
        violin: "fas fa-violin",
        theory: "fas fa-book-open",
        saxophone: "fas fa-saxophone",
        bass: "fas fa-guitar",
      };

      for (let key in icons) {
        if (subject.toLowerCase().includes(key)) {
          return icons[key];
        }
      }
      return "fas fa-music";
    },

    // Initialize App
    async init() {
      this.loadFromLocalStorage();
      this.loadTheme();
      this.initVoiceSearch();
      await this.fetchLessons();
    },

    // Voice Search Initialization
    initVoiceSearch() {
      // Check if browser supports Speech Recognition API
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognition) {
        this.voiceSearchSupported = true;
        this.recognition = new SpeechRecognition();

        // Configure speech recognition
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = "en-US";

        // Handle successful speech recognition
        this.recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          this.searchQuery = transcript;
          this.debounceSearch();
          this.isListening = false;
        };

        // Handle speech recognition errors
        this.recognition.onerror = (event) => {
          console.error("Speech recognition error:", event.error);
          this.isListening = false;

          if (event.error === "no-speech") {
            alert("No speech detected. Please try again.");
          } else if (event.error === "not-allowed") {
            alert(
              "Microphone access denied. Please allow microphone access to use voice search."
            );
          }
        };

        // Handle when recognition ends
        this.recognition.onend = () => {
          this.isListening = false;
        };
      } else {
        this.voiceSearchSupported = false;
      }
    },

    // Start Voice Search
    startVoiceSearch() {
      // Check if voice search is supported
      if (!this.voiceSearchSupported) {
        alert("Voice search not supported in this browser.");
        return;
      }

      if (this.isListening) {
        // Stop listening if already active (toggle behavior)
        this.recognition.stop();
        this.isListening = false;
      } else {
        // Start listening for voice input
        try {
          this.recognition.start();
          this.isListening = true;
        } catch (error) {
          console.error("Error starting voice recognition:", error);
          alert("Could not start voice search. Please try again.");
        }
      }
    },

    // Theme Management
    loadTheme() {
      // Load theme preference from localStorage
      const savedTheme = localStorage.getItem("theme");
      this.isDarkMode = savedTheme === "dark";
      this.applyTheme();
    },

    applyTheme() {
      // Apply theme to document root element
      if (this.isDarkMode) {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
    },

    toggleTheme() {
      // Trigger spinning animation
      this.isThemeChanging = true;

      // Toggle theme after a short delay for animation effect
      setTimeout(() => {
        this.isDarkMode = !this.isDarkMode;
        this.applyTheme();

        // Save preference to localStorage
        localStorage.setItem("theme", this.isDarkMode ? "dark" : "light");

        // Remove spinning class after animation completes
        setTimeout(() => {
          this.isThemeChanging = false;
        }, 800);
      }, 100);
    },

    // Local Storage
    loadFromLocalStorage() {
      const cart = localStorage.getItem("cart");
      if (cart) this.cart = JSON.parse(cart);
    },

    saveToLocalStorage() {
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },

    // API Calls
    async fetchLessons() {
      this.isLoading = true;
      try {
        const response = await fetch(`${BASE_URL}/lessons`);
        const data = await response.json();

        if (data.success) {
          this.lessons = data.data;
        }
      } catch (error) {
        console.error("Error fetching lessons:", error);
      } finally {
        this.isLoading = false;
      }
    },

    async searchLessons() {
      if (!this.searchQuery.trim()) {
        await this.fetchLessons();
        return;
      }

      this.isLoading = true;
      try {
        const response = await fetch(
          `${BASE_URL}/search?q=${encodeURIComponent(this.searchQuery)}`
        );
        const data = await response.json();

        if (data.success) {
          this.lessons = data.data;
        }
      } catch (error) {
        console.error("Error searching lessons:", error);
      } finally {
        this.isLoading = false;
      }
    },

    debounceSearch() {
      clearTimeout(this.searchTimeout);
      this.searchTimeout = setTimeout(() => {
        this.searchLessons();
      }, 500);
    },

    sortLessons() {
      if (!this.sortBy) return;

      const sorted = [...this.lessons];

      switch (this.sortBy) {
        case "subject":
          sorted.sort((a, b) => a.subject.localeCompare(b.subject));
          break;
        case "price-asc":
          sorted.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          sorted.sort((a, b) => b.price - a.price);
          break;
        case "spaces":
          sorted.sort((a, b) => b.spaces - a.spaces);
          break;
      }

      this.lessons = sorted;
    },

    // Cart Management
    addToCart(lesson) {
      const existingItem = this.cart.find(
        (item) => item.lesson._id === lesson._id
      );

      if (existingItem) {
        if (existingItem.quantity < lesson.spaces) {
          existingItem.quantity++;
        }
      } else {
        this.cart.push({
          lesson: lesson,
          quantity: 1,
        });
      }

      this.saveToLocalStorage();
      this.showCart = true;
    },

    updateQuantity(item, change) {
      const newQuantity = item.quantity + change;

      if (newQuantity <= 0) {
        this.removeFromCart(item);
      } else if (newQuantity <= item.lesson.spaces) {
        item.quantity = newQuantity;
        this.saveToLocalStorage();
      }
    },

    removeFromCart(item) {
      const index = this.cart.indexOf(item);
      if (index > -1) {
        this.cart.splice(index, 1);
        this.saveToLocalStorage();
      }
    },

    proceedToCheckout() {
      this.showCart = false;
      this.showCheckout = true;
    },

    async completeOrder() {
      this.checkoutError = "";
      this.isCheckoutLoading = true;

      const orderData = {
        name: this.checkoutForm.name,
        phone: this.checkoutForm.phone,
        lessons: this.cart.map((item) => ({
          id: item.lesson._id,
          quantity: item.quantity,
        })),
      };

      try {
        const response = await fetch(`${BASE_URL}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          // Clear cart
          this.cart = [];
          this.saveToLocalStorage();

          // Close checkout, show success
          this.showCheckout = false;
          this.showSuccess = true;

          // Refresh lessons to update spaces
          await this.fetchLessons();

          // Reset form
          this.checkoutForm = { name: "", phone: "" };
        } else {
          this.checkoutError =
            data.message || "Order failed. Please try again.";
        }
      } catch (error) {
        console.error("Order error:", error);
        this.checkoutError = "Unable to connect to server. Please try again.";
      } finally {
        this.isCheckoutLoading = false;
      }
    },

    closeSuccessModal() {
      this.showSuccess = false;
      this.currentView = "lessons";
    },

    // Utilities
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    },

    formatLessonDate(dateString) {
      if (!dateString) return "";
      const date = new Date(dateString);
      return date.toLocaleDateString("en-GB", {
        weekday: "long",
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
  },

  mounted() {
    this.init();
  },

  watch: {
    cart: {
      handler() {
        this.saveToLocalStorage();
      },
      deep: true,
    },
  },
});
