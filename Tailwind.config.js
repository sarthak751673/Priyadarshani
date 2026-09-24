/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        base: {
          DEFAULT: '#0E1013',
          soft: '#14171B',
        },
        surface: {
          DEFAULT: '#191C21',
          raised: '#1F232A',
          line: 'rgba(255,255,255,0.07)',
        },
        ink: {
          DEFAULT: '#F4F5F7',
          soft: '#9AA0AB',
          faint: '#5E636D',
        },
        brand: {
          DEFAULT: '#2F6BFF',
          soft: '#4A7EFF',
          dim: '#1A3A8C',
        },
        amber: {
          DEFAULT: '#F5A623',
        },
        live: {
          free: '#22C55E',
          busy: '#EF4444',
          hold: '#F5A623',
        },
      },
      borderRadius: {
        xl2: '1.1rem',
      },
      boxShadow: {
        panel: '0 1px 0 0 rgba(255,255,255,0.04) inset',
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { opacity: 1, transform: 'scale(1)' },
          '50%': { opacity: 0.55, transform: 'scale(1.35)' },
        },
        riseIn: {
          from: { opacity: 0, transform: 'translateY(10px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideUp: {
          from: { transform: 'translateY(100%)' },
          to: { transform: 'translateY(0)' },
        },
      },
      animation: {
        pulseDot: 'pulseDot 1.8s ease-in-out infinite',
        riseIn: 'riseIn .38s cubic-bezier(.2,.7,.2,1) both',
        slideUp: 'slideUp .32s cubic-bezier(.2,.8,.2,1) both',
      },
    },
  },
  plugins: [],
}
