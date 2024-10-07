import { useEffect, useState } from "react";

export default function useMobileScreen() {
  const [isMobileScreen, setIsMobileScreen] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 768) {
      setIsMobileScreen(true);
    } else {
      setIsMobileScreen(false);
    }
  }, [isMobileScreen]);

  return { isMobileScreen };
}
