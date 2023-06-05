import classes from "./button.module.css";
interface ButtonProps {
  placeholder: string;
  type?: "button" | "submit" | "reset";
  variant?: "text" | "outline" | "fill";
  onClick?: () => void;
}

const Button = ({ placeholder, variant = "fill", ...rest }: ButtonProps) => {
  return (
    <button className={classes[variant]} {...rest}>
      {placeholder}
    </button>
  );
};

export default Button;
