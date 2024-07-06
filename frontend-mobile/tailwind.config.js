/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        wht: "#ffffff",
        blk: "#09090b",
        gry: '#262628',
      },
      fontFamily: {
        jbm: ["JetBrainsMono-Regular", "monospace"],
        jbmitalic: ["JetBrainsMono-Italic", "monospace"],
        jbmbold: ["JetBrainsMono-Bold", "monospace"],
        jbmbolditalic: ["JetBrainsMono-BoldItalic", "monospace"],
        jbmlight: ["JetBrainsMono-ExtraLight", "monospace"],
        jbllightitalic: ["JetBrainsMono-ExtraLightItalic", "monospace"], 
        trmnl: ["VT323-Regular", "monospace"],
      }
    },
  },
  plugins: [],
};
