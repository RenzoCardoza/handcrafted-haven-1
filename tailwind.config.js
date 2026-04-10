/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",

        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring))",

        primary: "oklch(var(--primary))",
        "primary-foreground": "oklch(var(--primary-foreground))",

        secondary: "oklch(var(--secondary))",
        "secondary-foreground": "oklch(var(--secondary-foreground))",

        muted: "oklch(var(--muted))",
        "muted-foreground": "oklch(var(--muted-foreground))",

        accent: "oklch(var(--accent))",
        "accent-foreground": "oklch(var(--accent-foreground))",

        destructive: "oklch(var(--destructive))",

        card: "oklch(var(--card))",
        "card-foreground": "oklch(var(--card-foreground))",

        popover: "oklch(var(--popover))",
        "popover-foreground": "oklch(var(--popover-foreground))",
      },
      borderRadius: {
        lg: "var(--radius)",
      },
    },
  },
  plugins: [],
};


