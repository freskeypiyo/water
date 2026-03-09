/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#042E2D',    
          primary: '#0A676A', 
          light: '#E2E3E3',   
          accent: '#61B7B4',  
          'accent-hover': '#03555A', 
        }
      },
      fontFamily: {
        display: ['Montserrat', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
      boxShadow: {
        'hover': '0 20px 50px rgba(10, 103, 106, 0.15)', 
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scrollReview: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-1500px)' },
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        scrollReview: 'scrollReview 40s linear infinite',
      }
    }
  },
  plugins: [],
}
