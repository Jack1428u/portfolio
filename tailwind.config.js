/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/app/**/*.{js,jsx}',
        './src/components/**/*.{js,jsx}',
        './src/sections/**/*.{js,jsx}',
        './src/lib/**/*.{js,jsx}',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'sans-serif'],
            },
            colors: {
                dark: {
                    bg: '#0a0a0a',
                    surface: '#141414',
                    card: '#1e1e1e',
                    border: '#262626',
                    'border-emphasis': '#404040',
                },
                accent: {
                    primary: '#3b82f6',
                    secondary: '#60a5fa',
                    success: '#10b981',
                },
            },
        },
    },
    plugins: [],
};
