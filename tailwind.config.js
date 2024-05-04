// module.exports = {
//     future : {
//         removeDeprecatedGapUtilities : true
//     }
// };

/** @type {import('tailwindcss').Config} */
module.exports = {
  important : true,
    content: ["./src/**/*.{html,js}"],
    theme: {
      fill: (theme) => ({
        red: theme('colors.red.primary')
      }),
      extend: {},
      colors: {
        white: '#ffffff',
        blue : {
          medium : '#005c98'
        },
        black : {
          light: '#262626',
          faded: '#00000059'
        },
        gray: {
          base : '#616161',
          backgroud: '#fafafa',
          primary : '#dbdbdb'
        },
        red : {
          primary: '#ed4956'
        }
      }
    },
    variants : {
      display : ['group-hover']
    },
    plugins: [],
  }