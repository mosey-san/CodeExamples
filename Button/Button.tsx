import Loader from '@UI/Loader';
import { ButtonProps } from '.';
import { CLASSES } from './Button.data';

export function Button({
  children,
  className,
  type,
  size,
  color,
  disabled,
  onClick,
  style,
  loading = false,
}: ButtonProps) {
  function clickHandler(e: React.MouseEvent) {
    if (loading) e.preventDefault();
    if (!loading && onClick) onClick(e);
  }

  return (
    <button
      style={style}
      className={[
        className,
        CLASSES.static,
        CLASSES.sizes[size],
        CLASSES.colors[color],
      ].join(' ')}
      onClick={clickHandler}
      type={type}
      disabled={disabled}
    >
      {loading ? (
        <Loader theme={color === 'black' ? 'light' : 'dark'} />
      ) : (
        children
      )}
    </button>
  );
}
