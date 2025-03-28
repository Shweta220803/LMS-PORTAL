/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        'course-details-heading-small': ['26px', '36px'],
        'course-details-heading-large': ['26px', '44px'],
        'course-heading-small': ['26px', '36px'],
        'default':['15px','25px']



      },
      gridTemplateColumns:{
        'auto': 'repeat(auto-fit, minmax(200px, 1fr))'
      },
      spacing:{
        'section-height': '500px'
      }


    },
  },
  plugins: [],
}

