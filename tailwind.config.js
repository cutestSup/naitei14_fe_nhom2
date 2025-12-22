/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "green-primary": "#46A358",
        "green-dark": "#3D8B4F",
        "gray-dark": "#3D3D3D",
        "gray-light": "#727272",
        "dark-bg": "#121212",
        "dark-card": "#1E1E1E",
        "dark-text": "#E0E0E0",
        "dark-text-muted": "#A0A0A0",
      },
      textColor: {
        "primary-text": "#374151",
      },
    },
  },
  plugins: [],
};
