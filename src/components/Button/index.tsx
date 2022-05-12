import clsx from 'clsx';

const Button: React.FC<HTML.Button> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={clsx(
        'bg-[#2C2B2B] text-white rounded-md px-4 py-4 w-full self-center text-xl',
        props.className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
