import "./Button.css";
import React from "react";
import { FC } from "react";

type ButtonProps = {
  onClick: () => void; //Я ожидаю, что мне передадут onClick, и это будет функция, которая ничего не принимает и ничего не возвращает.
  children: React.ReactNode;
};

const Button: FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
};
export default Button;
