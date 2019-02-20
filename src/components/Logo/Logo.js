import React from "react";
import P5Wrapper from "react-p5-wrapper";
import sketch from "./Sketch";

const Logo = () => {
  return (
    <div className="logo">
      <P5Wrapper sketch={sketch} />
    </div>
  );
};

export default Logo;
