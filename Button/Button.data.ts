export const CLASSES = {
  static:
    'min-w-[12.5rem] flex items-center justify-center sm:text-16 transition-colors duration-200 disabled:cursor-not-allowed whitespace-nowrap rounded-sm select-none',
  sizes: {
    sm: 'h-10 text-12 px-10',
    md: 'h-11 text-14 px-10',
    lg: 'h-13 text-16 px-10',
  },
  colors: {
    transparent: 'border border-current bg-transparent text-current',
    black:
      'bg-primary-900 text-white focus:bg-active hover:bg-active active:bg-primary-900 disabled:bg-primary-400',
    gray: 'bg-primary-100 text-primary-800 focus:bg-primary-200 hover:bg-primary-200 active:bg-primary-100 disabled:text-primary-200 disabled:bg-primary-50',
    white:
      'bg-white text-primary-900 border border-primary-900 focus:text-active focus:border-active hover:text-active hover:border-active disabled:text-primary-400 disabled:border-primary-400',
  },
};
