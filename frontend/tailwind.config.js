/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Brand
        "gold": "#FFC107",
        "gold-light": "#FFD54F",
        "gold-dark": "#FFA000",
        "gold-dim": "#fabd00",

        // Surfaces (Material-inspired dark)
        "background": "#000000",
        "surface": "#0d0d0d",
        "surface-card": "#161616",
        "surface-raised": "#1e1e1e",
        "surface-container": "#241f14",
        "surface-container-low": "#201b11",
        "surface-container-high": "#2f291e",
        "surface-container-highest": "#3a3428",
        "surface-variant": "#3a3428",
        "surface-bright": "#3f382d",
        "surface-dim": "#181309",
        "surface-alert": "#0A192F",

        // On-surfaces
        "on-surface": "#ece1d0",
        "on-surface-variant": "#d4c5ab",
        "on-background": "#ece1d0",
        "on-secondary-fixed": "#1c1b1b",

        // Primaries (amber/gold)
        "primary": "#ffe4af",
        "primary-home": "#FFC107",
        "primary-container": "#ffc107",
        "primary-fixed": "#ffdf9e",
        "primary-fixed-dim": "#fabd00",
        "on-primary": "#3f2e00",
        "on-primary-container": "#6d5100",
        "on-primary-fixed": "#261a00",
        "on-primary-fixed-variant": "#5b4300",
        "inverse-primary": "#785900",

        // Secondary
        "secondary": "#c9c6c5",
        "secondary-container": "#4a4949",
        "secondary-fixed": "#e5e2e1",
        "secondary-fixed-dim": "#c9c6c5",
        "on-secondary": "#313030",
        "on-secondary-container": "#bab8b7",
        "on-secondary-fixed": "#1c1b1b",
        "on-secondary-fixed-variant": "#474646",

        // Tertiary
        "tertiary": "#b4f0ff",
        "tertiary-container": "#00defd",
        "tertiary-fixed": "#a5eeff",
        "tertiary-fixed-dim": "#00daf8",
        "on-tertiary": "#00363f",
        "on-tertiary-container": "#005e6c",
        "on-tertiary-fixed": "#001f25",
        "on-tertiary-fixed-variant": "#004e5a",

        // States
        "success": "#10B981",
        "error": "#EF4444",
        "warning": "#F59E0B",
        "info": "#38BDF8",
        "error-container": "#93000a",
        "on-error": "#690005",
        "on-error-container": "#ffdad6",

        // Text
        "text-primary": "#FFFFFF",
        "text-secondary": "#9CA3AF",

        // Misc
        "outline": "#9c8f78",
        "outline-variant": "#4f4632",
        "border": "#262626",
        "surface-tint": "#fabd00",
        "inverse-surface": "#ece1d0",
        "inverse-on-surface": "#363024",

        // Dark legacy
        "dark": "#000000",
        "card": "#121212",
      },

      borderRadius: {
        "custom": "8px",
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "full": "9999px",
      },

      spacing: {
        "xs": "4px",
        "sm": "8px",
        "md": "16px",
        "lg": "24px",
        "xl": "48px",
        "2xl": "64px",
        "xxl": "64px",
        "safe": "env(safe-area-inset-bottom)",
      },

      fontFamily: {
        "bebas": ["Bebas Neue", "cursive"],
        "inter": ["Inter", "sans-serif"],
        "sans": ["Inter", "sans-serif"],
        "label-caps": ["Inter", "Roboto", "sans-serif"],
        "data-numeric": ["Inter", "sans-serif"],
        "headline-lg": ["Inter", "sans-serif"],
        "heading-lg": ["Inter", "Roboto", "sans-serif"],
        "body-md": ["Inter", "Roboto", "sans-serif"],
        "display-xl-mobile": ["Bebas Neue", "sans-serif"],
        "display-xl": ["Bebas Neue", "Barlow Condensed", "sans-serif"],
      },

      fontSize: {
        "label-caps": ["0.75rem", { letterSpacing: "0.1em", fontWeight: "600" }],
        "data-numeric": ["14px", { lineHeight: "22px", fontWeight: "600" }],
        "headline-lg": ["24px", { lineHeight: "32px", fontWeight: "700" }],
        "headline-lg-mobile": ["20px", { lineHeight: "28px", fontWeight: "700" }],
        "heading-lg": ["1.5rem", { lineHeight: "1.3", fontWeight: "700" }],
        "body-md": ["0.875rem", { lineHeight: "1.6", fontWeight: "400" }],
        "display-xl-mobile": ["40px", { lineHeight: "44px", letterSpacing: "0.02em", fontWeight: "800" }],
        "display-xl": ["3.5rem", { lineHeight: "1.1", letterSpacing: "0.02em", fontWeight: "800" }],
      },

      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #ffc107 0%, #ffecb3 50%, #ffa000 100%)",
        "dark-gradient": "linear-gradient(180deg, #000000 0%, #0d0d0d 100%)",
        "card-gradient": "linear-gradient(135deg, #1e1e1e 0%, #141414 100%)",
        "hero-gradient": "radial-gradient(ellipse at top left, rgba(255, 193, 7, 0.15) 0%, transparent 60%)",
      },

      boxShadow: {
        "gold": "0 0 20px rgba(255, 193, 7, 0.3)",
        "gold-sm": "0 0 10px rgba(255, 193, 7, 0.15)",
        "gold-lg": "0 0 40px rgba(255, 193, 7, 0.4)",
        "card": "0 4px 24px rgba(0, 0, 0, 0.6)",
        "card-hover": "0 8px 40px rgba(0, 0, 0, 0.8)",
        "inner-gold": "inset 0 0 0 1px rgba(255, 193, 7, 0.3)",
      },

      animation: {
        "pulse-slow": "pulse 3s ease-in-out infinite",
      },
    }
  },
  plugins: [],
}
