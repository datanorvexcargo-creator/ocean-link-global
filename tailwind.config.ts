import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // dark navy stack — premium maritime
        abyss:   '#02080f',  // deepest (nav scroll, hard outlines)
        midnight:'#040d1f',  // headers / footers
        navy: {
          DEFAULT: '#06142a',     // page surface
          50:  '#eaf0fa',
          100: '#c8d4ec',
          200: '#8ea7d1',
          300: '#4e6fa9',
          400: '#1c3a76',
          500: '#0a1f4a',
          600: '#06142a',
          700: '#040d1f',
          800: '#03091a',
          900: '#02060f',
        },
        // section variants — slightly lifted from the navy base
        depth: {
          DEFAULT: '#0a1f3d',  // mid section bg
          100: '#0c2348',
          200: '#0a1f3d',
          300: '#081834',
          400: '#06142a',
        },

        // electric accent — signature glow
        electric: {
          DEFAULT: '#2563eb',
          50:  '#e8efff',
          100: '#c5d3ff',
          200: '#8aa6ff',
          300: '#4f78fb',
          400: '#2563eb',
          500: '#1a4dc4',
          600: '#0e3b9c',
        },

        // signal red — premium
        signal: {
          DEFAULT: '#e53935',
          50:  '#fdeae9',
          100: '#fbcfcd',
          200: '#f48a86',
          300: '#ec5c57',
          400: '#e53935',
          500: '#b62622',
          600: '#841918',
        },
        ember: '#ff5a4f',

        // text scale on dark
        paper: {
          DEFAULT: '#ffffff',
          50:  '#ffffff',
          100: '#fafbfd',
          200: '#f4f6fa',
        },
        chalk: '#e6ebf3',   // bright body text
        haze:  '#a9b4ca',   // muted body text on dark
        cool:  '#6d7a96',   // micro text on dark

        // retained tokens (kept for backward compatibility)
        ink: {
          DEFAULT: '#06142a',
          900: '#020611',
          800: '#040d1f',
          700: '#0a1f3d',
          600: '#143263',
        },
        mist: {
          DEFAULT: '#0c2348',
          100: '#0c2348',
          200: '#143263',
          300: '#1b4080',
        },
        azure: {
          DEFAULT: '#2563eb',
          50: '#e8efff',
          100: '#c5d3ff',
          200: '#8aa6ff',
          300: '#4f78fb',
          400: '#2563eb',
          500: '#1a4dc4',
          600: '#0e3b9c',
        },
        skyline: '#5e87ff',
        flare:   '#ff5a4f',
        steel:   '#8d9ab5',
        silver:  'rgba(255,255,255,0.18)',
        slate: {
          25:  'rgba(255,255,255,0.95)',
          50:  '#e6ebf3',
          100: '#cdd4e2',
          200: '#a9b4ca',
          300: '#8d9ab5',
          400: '#6d7a96',
          500: '#4d5973',
          600: '#37425a',
          700: '#252d42',
          800: '#161c2c',
          900: '#0a1020',
        },
      },
      fontFamily: {
        display:    ['var(--font-display)',    'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans:       ['var(--font-sans)',       'ui-sans-serif', 'system-ui', 'sans-serif'],
        editorial:  ['var(--font-editorial)',  'Georgia',       'serif'],
        mono:       ['var(--font-mono)',       'ui-monospace',  'monospace'],
      },
      fontSize: {
        'micro':  ['0.6875rem', { lineHeight: '1.1',  letterSpacing: '0.18em' }],
        'tiny':   ['0.75rem',   { lineHeight: '1.4' }],
        'meta':   ['0.8125rem', { lineHeight: '1.55' }],
        'body':   ['1rem',      { lineHeight: '1.65' }],
        'lede':   ['1.125rem',  { lineHeight: '1.6'  }],
        'sub':    ['1.3125rem', { lineHeight: '1.45' }],
        'h4':     ['1.625rem',  { lineHeight: '1.25', letterSpacing: '-0.012em' }],
        'h3':     ['2.0625rem', { lineHeight: '1.18', letterSpacing: '-0.018em' }],
        'h2':     ['2.625rem',  { lineHeight: '1.1',  letterSpacing: '-0.024em' }],
        'h1':     ['3.5rem',    { lineHeight: '1.04', letterSpacing: '-0.03em'  }],
        'display':['4.75rem',   { lineHeight: '0.98', letterSpacing: '-0.04em'  }],
      },
      letterSpacing: {
        'ultra-tight': '-0.04em',
        'mega-tight':  '-0.06em',
        'wider-2':     '0.16em',
        'wider-3':     '0.28em',
      },
      transitionTimingFunction: {
        'out-expo':     'cubic-bezier(0.16, 1, 0.3, 1)',
        'out-quart':    'cubic-bezier(0.25, 1, 0.5, 1)',
        'in-out-circ':  'cubic-bezier(0.85, 0, 0.15, 1)',
      },
      animation: {
        'float-slow':  'float 14s ease-in-out infinite',
        'float-x':     'floatX 18s ease-in-out infinite',
        'drift':       'drift 32s ease-in-out infinite',
        'grain':       'grain 8s steps(10) infinite',
        'pulse-glow':  'pulseGlow 3.2s ease-in-out infinite',
        'pulse-line':  'pulseLine 4s ease-in-out infinite',
        'marquee':     'marquee 38s linear infinite',
        'orbit-slow':  'orbit 22s linear infinite',
        'sheen':       'sheen 3.6s linear infinite',
        'scan-line':   'scanLine 6s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%':      { transform: 'translate3d(0,-40px,0)' },
        },
        floatX: {
          '0%, 100%': { transform: 'translate3d(0,0,0)' },
          '50%':      { transform: 'translate3d(40px,-20px,0)' },
        },
        drift: {
          '0%, 100%':  { transform: 'translate3d(0,0,0) scale(1)' },
          '33%':       { transform: 'translate3d(60px,-30px,0) scale(1.08)' },
          '66%':       { transform: 'translate3d(-40px,30px,0) scale(0.94)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-5%,-10%)' },
          '20%': { transform: 'translate(-15%,5%)' },
          '30%': { transform: 'translate(7%,-25%)' },
          '40%': { transform: 'translate(-5%,25%)' },
          '50%': { transform: 'translate(-15%,10%)' },
          '60%': { transform: 'translate(15%,0%)' },
          '70%': { transform: 'translate(0%,15%)' },
          '80%': { transform: 'translate(3%,35%)' },
          '90%': { transform: 'translate(-10%,10%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.55', transform: 'scale(1)' },
          '50%':      { opacity: '1',    transform: 'scale(1.05)' },
        },
        pulseLine: {
          '0%, 100%': { opacity: '0.35' },
          '50%':      { opacity: '1' },
        },
        marquee: {
          '0%':   { transform: 'translate3d(0,0,0)' },
          '100%': { transform: 'translate3d(-50%,0,0)' },
        },
        orbit: {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        sheen: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        scanLine: {
          '0%':   { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
