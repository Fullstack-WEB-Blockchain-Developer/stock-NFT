import { useEffect } from "react";

export const useOnClickOutsideOfArray = (refs, callback) => {
  const handleMouseUp = (e) => {
    let flag = refs.every((ref) =>{ 
      console.log('---ref.current', ref.current)
      console.log(e.path)
      return !e.path.includes(ref?.current)});
    flag && callback();
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);

    return () => document.removeEventListener("mouseup", handleMouseUp);
  });
};
