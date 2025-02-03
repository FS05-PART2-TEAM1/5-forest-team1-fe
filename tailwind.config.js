/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "f-black": "#414141",
        "f-gray-100": "#eeeeee",
        "f-gray-200": "#dddddd",
        "f-gray-500": "#818181",
        "f-bg": "#f6f4ef",
        "f-brand": "#99c08e",
        "f-error": "#c41013",
        "f-red": "#f50e0e",
        "f-error-bg": "#ffa3a5",
        "f-green": "#e1edde",
        "f-yellow": "#fff1cc",
        "f-blue-100": "#e0f1f5",
        "f-blue-400": "#418099",
        "f-pink-100": "#fde0e9",
        "f-pink-600": "#bc3c6a",
        "f-green": "#578246",
        "f-yellow": "#c18e1b",
      },
    },
  },
  plugins: [],
};
