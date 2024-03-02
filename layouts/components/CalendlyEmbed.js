import React, { useEffect } from "react";

const CalendlyEmbed = ({ url }) => {
  useEffect(() => {
    const head = document.querySelector("head");
    const script = document.createElement("script");
    script.setAttribute(
      "src",
      "https://assets.calendly.com/assets/external/widget.js"
    );
    head.appendChild(script);
  }, []);

  return (
    <div
    className="calendly-inline-widget rounded-xl h-[650px] sm:h-[800px] md:h-[900px] lg:h-[825px]"
      data-url={url}
    ></div>
  );
};

export default CalendlyEmbed;