/** @type {import('tailwindcss').Config} */

const decanter = require('decanter');

const path = require('path');
const dir = path.resolve(__dirname, 'src/styles');

module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  variants: {
    colors: {
      buttonPrimaryBg: 'blue',
    }
  },
  theme: {
    fontFamily: decanter.theme.fontFamily,
    lineHeight: decanter.theme.lineHeight,
    maxWidth: decanter.theme.maxWidth,
    decanter: decanter.theme.decanter,
    screens: decanter.theme.screens,
    extend: {
      fontSize: decanter.theme.fontSize,
      fontWeight: decanter.theme.extend.fontWeight,
      lineClamp: decanter.theme.extend.lineClamp,
      colors: decanter.theme.colors,
      containers: {
        '9xl': '90rem',
        '10xl': '100rem',
        '11xl': '110rem',
        '12xl': '120rem',
        '13xl': '130rem',
        '14xl': '140rem',
        '15xl': '150rem',
      },
      scale: {
        '-100': '-1'
      }
    },
  },
  plugins: [
    ...decanter.plugins,
    require('@tailwindcss/container-queries'),
    require(`${dir}/typography/local-footer.tsx`)(),
    require(`${dir}/typography/global-message.tsx`)(),
    require(`${dir}/centered-container.tsx`)()
  ],
};
