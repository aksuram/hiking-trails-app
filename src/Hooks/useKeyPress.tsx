import { useEffect, useState } from "react";

const useKeyPress = (keyValue: string) => {
  const [isKeyPressed, setIsKeyPressed] = useState(false);

  const handleKeyDown = (keyboardEvent: KeyboardEvent) => {
    if (keyboardEvent.repeat) return;
    if (keyboardEvent.key === keyValue) setIsKeyPressed(true);
  };
  const handleKeyUp = (keyboardEvent: KeyboardEvent) => {
    if (keyboardEvent.repeat) return;
    if (keyboardEvent.key === keyValue) setIsKeyPressed(false);
  };
  const handleBlur = () => {
    setIsKeyPressed(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  return isKeyPressed;
};

export default useKeyPress;
