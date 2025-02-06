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
        "f-green-bg": "#e1edde",
        "f-green-text": "#578246",
        "f-yellow-bg": "#fff1cc",
        "f-yellow-text": "#c18e1b",
        "f-blue-blue": "#e0f1f5",
        "f-blue-text": "#418099",
        "f-pink-bg": "#fde0e9",
        "f-pink-text": "#bc3c6a",
      },
      fontSize: {
        "16pt": ["1rem", { lineHeight: "1" }], // 16pt = 1rem
        "18pt": ["1.125rem", { lineHeight: "1" }], // 18pt = 1.125rem
        "20pt": ["1.25rem", { lineHeight: "1" }], // 20pt = 1.25rem
        "24pt": ["1.5rem", { lineHeight: "1" }], // 24pt = 1.5rem
        "32pt": ["2rem", { lineHeight: "1" }], // 32pt = 2rem
        "80pt": ["5rem", { lineHeight: "1" }], // 80pt = 5rem
        "120pt": ["7.5rem", { lineHeight: "1" }], // 120pt = 7.5rem
        "150pt": ["9.375rem", { lineHeight: "1" }], // 150pt = 9.375rem
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
