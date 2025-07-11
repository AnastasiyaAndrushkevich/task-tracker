import "./Button.css";
import React from "react";

type ButtonProps = {
  onClick: () => void; //Я ожидаю, что мне передадут onClick, и это будет функция, которая ничего не принимает и ничего не возвращает.
};

export default function Button({ onClick }: ButtonProps) {
  return (
    <button className="button" onClick={onClick}>
      Add task
    </button>
  );
}
