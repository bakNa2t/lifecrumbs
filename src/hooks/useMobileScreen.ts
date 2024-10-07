import { useEffect, useState } from "react";

export default function useMobileScreen() {
  const [isMobileScreen, setIsMobileScreen] = useState(screen.width <= 768);

  useEffect(() => {
    if (screen.width <= 768) {
      setIsMobileScreen(true);
    } else {
      setIsMobileScreen(false);
    }
  }, []);

  let wdth, hgt;
  if (isMobileScreen) {
    wdth = 24;
    hgt = 24;
  } else {
    wdth = 42;
    hgt = 42;
  }

  return { isMobileScreen, wdth, hgt };
}
