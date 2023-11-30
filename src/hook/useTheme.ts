import { useEffect, useState } from "react";
const useTheme = () => {
  const [theme, setTheme] = useState<any>("");

  useEffect(() => {
    setTheme(localStorage.getItem("theme")!);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const onThemeHandler = () => {
    if (!theme) {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    }
    if (theme === "dark") {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return [theme, onThemeHandler];
};

export default useTheme;
