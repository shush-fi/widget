const defaultConfig = require("tailwindcss/defaultConfig");

// eslint-disable-next-line @typescript-eslint/no-var-requires, no-undef
const tailwindcssAnimate = require("tailwindcss-animate");
const containerQueries = require("@tailwindcss/container-queries");

function withOpacity(variableName) {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined)
      return `hsl(var(${variableName})/${opacityValue})`;
  };
}

/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{ts,tsx}"];
export const prefix = "sh-w-";
export const theme = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  fontFamily: {
    sans: ['"Bricolage Grotesque"', ...defaultConfig.theme.fontFamily.sans],
  },
  extend: {
    dropShadow: {
      'switch': ({theme}) => `0 0px 4px ${theme.colors.primary}/[0.25]`,
    },
    containers: {
      "2xs": "16rem",
    },
    colors: {
      shush: {
        primary: "#FCC42C",
      },
      border: withOpacity("--shush-widget-border"),
      ring: withOpacity("--shush-widget-ring"),
      background: withOpacity("--shush-widget-background"),
      foreground: withOpacity("--shush-widget-foreground"),
      input: {
        DEFAULT: withOpacity("--shush-widget-input"),
        foreground: withOpacity("--shush-widget-input-foreground"),
      },
      primary: {
        DEFAULT: withOpacity("--shush-widget-primary"),
        foreground: withOpacity("--shush-widget-primary-foreground"),
      },
      secondary: {
        DEFAULT: withOpacity("--shush-widget-secondary"),
        foreground: withOpacity("--shush-widget-secondary-foreground"),
      },
      destructive: {
        DEFAULT: withOpacity("--shush-widget-destructive"),
        foreground: withOpacity("--shush-widget-destructive-foreground"),
      },
      muted: {
        DEFAULT: withOpacity("--shush-widget-muted"),
        foreground: withOpacity("--shush-widget-muted-foreground"),
      },
      accent: {
        DEFAULT: withOpacity("--shush-widget-accent"),
        foreground: withOpacity("--shush-widget-accent-foreground"),
      },
      popover: {
        DEFAULT: withOpacity("--shush-widget-popover"),
        foreground: withOpacity("--shush-widget-popover-foreground"),
      },
      card: {
        DEFAULT: withOpacity("--shush-widget-card"),
        foreground: withOpacity("--shush-widget-card-foreground"),
      },
      
    },
    borderRadius: {
      lg: "var(--shush-widget-radius)",
      md: "calc(var(--shush-widget-radius) - 2px)",
      sm: "calc(var(--shush-widget-radius) - 4px)",
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
  },
};

export const plugins = [tailwindcssAnimate, containerQueries];
