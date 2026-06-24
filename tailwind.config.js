/** @type {import('tailwindcss').Config} */
module.exports = {
content: ["./src/**/*.{html,js}"],
theme: {
extend: {
colors: {
canvas: '#F4F3EF',
ranger: {
DEFAULT: '#4A5844',
dark: '#3B4736',
},
amber: {
DEFAULT: '#C48B36',
hover: '#A8742C',
},
onyx: '#1C1B1A',
},
fontFamily: {
display: ['GT Alpina Fine', 'Times New Roman', 'serif'],
body: ['Söhne', 'Helvetica Neue', 'Arial', 'sans-serif'],
},
transitionTimingFunction: {
'premium-ease': 'cubic-bezier(0.76, 0, 0.24, 1)',
},
spacing: {
'72-hours': '18rem',
}
},
},
plugins: [],
}
3. Globalny Arkusz S