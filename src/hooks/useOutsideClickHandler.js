import { useEffect } from "react";

const useOutsideClickHandler = (ref, handler) => {
  useEffect(() => {
    const onClick = (e) => {
      if (ref.current.contains(e.target)) {
        return;
      }
      handler();
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
};

export default useOutsideClickHandler;
