import { cloneElement,FC, HTMLAttributes, ReactElement, ReactNode } from "react";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  asSlot?: boolean;
}

const Button: FC<ButtonProps> = ({ children, className, asSlot, ...props }) => {
  return asSlot ? (
    cloneElement(children as ReactElement, {
      className: `px-6 py-2 bg-transparent uppercase text-black border-2 border-purple-300 hover:bg-purple-400 hover:text-white hover:border-purple-400 ${className}`,
    })
  ) : (
    <button
      type="button"
      {...props}
      className={`px-6 py-2 bg-transparent uppercase text-black border-2 border-purple-300 hover:bg-purple-400 hover:text-white hover:border-purple-400 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
