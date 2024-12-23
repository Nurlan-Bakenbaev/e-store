"use client";
import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const ConfettiComponent = ({ trigger }) => {
  const [showConfetti, setShowConfetti] = useState(false);

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
          width={window.innerWidth}
          height={window.innerHeight}
          gravity={0.1}
        />
      )}
    </>
  );
};

export default ConfettiComponent;
