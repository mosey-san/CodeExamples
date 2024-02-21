export interface ButtonProps {
  children: JSX.Element | string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  size: 'sm' | 'md' | 'lg';
  color: 'black' | 'gray' | 'white' | 'transparent';
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  style?: React.CSSProperties;
};
