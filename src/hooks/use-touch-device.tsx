import { useState, useEffect } from "react";

export function useTouchDevice() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          navigator.maxTouchPoints > 0
      );
    };

    checkTouchDevice();

    // Add event listener for changes in touch capabilities
    window.addEventListener("touchstart", checkTouchDevice);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("touchstart", checkTouchDevice);
    };
  }, []);

  return isTouchDevice;
}
