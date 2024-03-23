/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.orange.500'),
              '&:hover': {
                color: theme('colors.orange.700'),
              },
            },
            code: {
              color: theme('colors.gray.500'),
              backgroundColor: theme('colors.gray.100'),
              fontWeight: theme('fontWeight.normal'),
              borderRadius: theme('borderRadius.md'),
              paddingLeft: theme('spacing.1'),
              paddingRight: theme('spacing.1'),
              paddingTop: theme('spacing[0.5]'),
              paddingBottom: theme('spacing[0.5]'),
            },
            'code::before': {
              content: 'none',
            },
            'code::after': {
              content: 'none',
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
