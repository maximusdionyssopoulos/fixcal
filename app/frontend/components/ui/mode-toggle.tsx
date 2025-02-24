import { Button } from "./button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export default function ModeToggle() {
  const { setTheme } = useTheme();

  const setLight = () => {
    setTheme("light");
  };
  const setDark = () => {
    setTheme("dark");
  };
  return (
    <div className="inline-flex items-center">
      <Button variant={"ghost"} size={"icon"} onClick={setLight}>
        <Sun size={16} />
      </Button>
      <Button variant={"ghost"} size={"icon"} onClick={setDark}>
        <Moon size={16} />
      </Button>
    </div>
  );
}
