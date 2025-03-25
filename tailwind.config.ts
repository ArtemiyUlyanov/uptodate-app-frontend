import type { Config } from "tailwindcss";

const beforePropertiesPlugin = require('tailwindcss-pseudo-elements');
const textShadowPlugin = require("tailwindcss-textshadow");
const animatePlugin = require('tailwindcss-animate');
const scrollbarHide = require("tailwind-scrollbar-hide");
const {heroui} = require("@heroui/react");

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./ui/**/*.{js,ts,jsx,tsx,mdx}",
    "./containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(toast|spinner).js"
  ],
  theme: {
    extend: {
      textShadow: {
        light: "1px 1px 2px rgba(0, 0, 0, 0.25)", // Легкая черная тень
        DEFAULT: "2px 2px 4px rgba(0, 0, 0, 0.25)", // Стандартная
      },
      fontFamily: {
        interTight: ['"Inter Tight"', 'sans-serif'],
        merri: ['"Merriweather"', 'serif'],
      },
      fontSize: {
        'sm-base': ['0.9375rem', '1.5rem'],
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800'
      },
      colors: {
        // backgroundColor: "#080808",
        // primaryColor: "#FFFFFF",
        // emphasizingColor: "#0F0F10",
        // emphasizingColor2: "#17171A",

        // borderColor: "#181818",
        
        // primaryText: "#FFFFFF",
        // blueText: "#3A89FF",
        // secondaryText: "#606060",

        // darkText: "#151516",

        // backgroundColor: "white",
        // primaryColor: "black",
        // emphasizingColor: "#1F1F21",
        // emphasizingColor2: "#1F1F21",

        // borderColor: "#202021",
        
        // primaryText: "#FFFFFF",
        // blueText: "#3A89FF",
        // secondaryText: "#6F6F6F",

        // darkText: "#151516",

        backgroundColor: "#111113",
        primaryColor: "#EFEEEC",
        secondaryColor: "#5F5F5F",
        secondaryColor2: "#C4C4C4",
        emphasizingColor: "#111113",
        emphasizingColor2: "#1E1E22",
        emphasizingColor3: "#313136",
        redColor: "#F44336",
        aspectColor: "#1A8CFF",
        warnColor: "#FF4C4C",

        borderColor: "#2C2C2C",
        
        primaryText: "#EFEEEC",
        redText: "#F44336",
        aspectText: "#1A8CFF",
        secondaryText: "#5F5F5F",
        secondaryText2: "#C4C4C4",

        oppositeText: "#050505",

        // backgroundColor: "#09090A",
        // primaryColor: "white",
        // emphasizingColor: "#E2E2E2",
        // emphasizingColor2: "#F4F4F4",
        // emphasizingColor3: "#202020",
        // redColor: "#FF78B7",
        // warnColor: "#FF4C4C",

        // borderColor: "#CFCFCF",
        
        // primaryText: "white",
        // redText: "#FF78B7",
        // secondaryText: "#606060",

        // oppositeText: "#EFEEEC",

        // backgroundColor: "#151516",
        // primaryColor: "#FFFFFF",
        // emphasizingColor: "#1C1C1D",
        // emphasizingColor2: "#F4F4F4",
        // emphasizingColor3: "#202020",
        // redColor: "#FF78B7",
        // warnColor: "#FF4C4C",

        // borderColor: "#242424",
        
        // primaryText: "#FFFFFF",
        // redText: "#FF78B7",
        // secondaryText: "#606060",

        // oppositeText: "#EFEEEC",

        // backgroundColor: "#090909",
        // primaryColor: "#FFFFFF",
        // emphasizingColor: "#111010",
        // emphasizingColor2: "#181818",
        // emphasizingColor3: "#202020",
        // blueColor: "#0769FF",
        // warnColor: "#FF4C4C",

        // borderColor: "#292929",
        
        // primaryText: "#FFFFFF",
        // blueText: "#2E81FF",
        // secondaryText: "#8B8B8B",

        // darkText: "#151516",
      },
    },
    variants: {
      extend: {
        before: ['responsive'],
        after: ['responsive'],
      },
    },
  },
  darkMode: 'class',
  plugins: [beforePropertiesPlugin,textShadowPlugin,animatePlugin,scrollbarHide,
    heroui({
      prefix: "nextui",
      addCommonColors: false,
      defaultTheme: "dark",
      defaultExtendTheme: "dark",
      layout: {},
      themes: {
        light: {
          layout: {
            secondary: {
              DEFAULT: '#1C77FF',
            }
          },
          colors: {
            secondary: {
              DEFAULT: '#1C77FF',
            }
          },
        },
        dark: {
          layout: {
            secondary: {
              DEFAULT: '#1C77FF'
            }
          },
          colors: {
            secondary: {
              DEFAULT: '#1C77FF'
            }
          },
        },
      },
    }),heroui()],
} satisfies Config;