import React from "react";
import "./Ripple.css";

const ripples = Array.from({ length: 20 });

const Ripple: React.FC = () => {
  return (
    <div className="ripple-overlay">
      {ripples.map((_, i) => (
        <span
          key={i}
          className="ripple-circle"
          style={{
            animationDelay: `${i * 0.1}s`,
            opacity: 0.3 - i * 0.08,
          }}
        />
      ))}
    </div>
  );
};

export default Ripple;
