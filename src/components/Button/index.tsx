const Button: React.FC<HTML.Button> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="bg-[#2C2B2B] rounded-md px-4 py-4 w-full self-center text-xl"
    >
      {children}
    </button>
  );
};

export default Button;
