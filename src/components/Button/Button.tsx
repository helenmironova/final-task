import React from "react";
import "./button.css";

interface ButtonProps {
  text: string;
  type?: "submit" | "reset";
  className: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
}

export function Button({
  className,
  text,
  onClick,
  type,
  isDisabled,
}: ButtonProps) {
  const classNames = "btn " + className;
  return (
    <button
      className={classNames}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {text}
    </button>
  );
}
