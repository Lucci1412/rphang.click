"use client";

import { useEffect, useState } from "react";
interface HeaderBackgroundWrapperProps {
  children: React.ReactNode;
}

const HeaderBackgroundWrapper = ({
  children,
}: HeaderBackgroundWrapperProps) => {
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY>10) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`flex !z-50 fixed top-0 left-0 right-0 items-center justify-center h-16 px-2  mx-auto border-b ${
        scrolling ? "bg-background shadow-md" : "bg-transparent"
      }`}
    >
      {children}
    </div>
  );
};

export default HeaderBackgroundWrapper;
