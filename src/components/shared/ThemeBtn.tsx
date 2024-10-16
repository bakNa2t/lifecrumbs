import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const ThemeBtn = ({
  sz,
  className,
  type,
}: {
  sz?: "default" | "sm" | "lg" | "icon" | null | undefined;
  className?: string | undefined;
  type?: "button" | "submit" | "reset" | undefined;
}) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwap = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <Button
      type={type}
      size={sz}
      className={className}
      onClick={handleThemeSwap}
    >
      <img
        src={
          theme === "light"
            ? "/assets/icons/i-moon.svg"
            : "/assets/icons/i-sun.svg"
        }
        alt="theme"
        width={24}
        height={24}
      />
    </Button>
  );
};

export default ThemeBtn;
