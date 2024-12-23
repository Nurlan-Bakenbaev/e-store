"use client";
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const ConfettiComponent = ({ trigger }) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (trigger) {
      setShowConfetti(true);

      const timeout = setTimeout(() => setShowConfetti(false), 8000);
      return () => clearTimeout(timeout);
    }
  }, [trigger]);

  return (
    <>
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          gravity={0.1}
          
        />
      )}
    </>
  );
};

export default ConfettiComponent;
