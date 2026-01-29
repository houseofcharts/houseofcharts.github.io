import React, { useEffect } from "react";

const FeedbackEmbed = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//js-eu1.hsforms.net/forms/embed/v2.js";
    script.type = "text/javascript";
    script.charset = "utf-8";
    script.async = true;

    script.onload = () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: "143884604",
          formId: "8a72354c-ef28-4a34-a047-458787bff9f2",
          region: "eu1",
          target: "#hubspot-form-container"
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      // Clean up script if necessary, though HubSpot script is usually safe to leave
    };
  }, []);

  return (
    <div className="flex justify-center w-full">
      <div
        id="hubspot-form-container"
        className="w-full max-w-[700px] border border-gray-200 rounded-3xl p-5 shadow-sm bg-white"
      ></div>
    </div>
  );
};

export default FeedbackEmbed;

// form can be prefilled with adding this after the url
// ?email=sven@hoc.ch&fallnummer=12545&subject=Henry%20Feedback&content=Das%20ist%20ein%20Test
// houseofcharts.com/feedback?email=sven@hoc.ch&fallnummer=12545&subject=Henry%20Feedback&content=Das%20ist%20ein%20Test