import React, { useEffect } from "react";

const MeetingEmbed = () => {
  useEffect(() => {
    const head = document.querySelector("head");
    const script = document.createElement("script");
    script.setAttribute(
      "src",
      "https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
    );
    head.appendChild(script);
  }, []); //<script type="text/javascript" src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"></script>

  return (
    <div class="meetings-iframe-container" data-src="https://meetings-eu1.hubspot.com/sven-schuepbach?embed=true"></div>
  );
};

export default MeetingEmbed;