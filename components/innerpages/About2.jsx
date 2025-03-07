import { panelsData } from "@/data/facts";
import React from "react";
import Image from "next/image";

export default function About2() {
  return (
    <div
      id="about_us"
      className="about-us section panel overflow-hidden"
      data-anime="onview: -100; opacity: [0, 1]; easing: spring(1, 80, 10, 0); duration: 450; delay: 250;"
    >
      <div className="section-outer panel py-6 xl:py-9 bg-secondary dark:bg-gray-800">
        <div
          className="d-none lg:d-block"
          data-anime="onview: -100; targets: img; scale: [0.8, 1]; opacity: [0, 1]; easing: spring(1, 80, 10, 0); duration: 450; delay: 350;"
        >
          <div className="position-absolute bottom-0 start-0 ms-n8 mb-6">
            <Image
              className="w-150px xl:w-250px d-block dark:d-none"
              alt="walking"
              src="/assets/images/template/walking.svg"
              width="224"
              height="226"
            />
            <Image
              className="w-150px xl:w-250px d-none dark:d-block"
              alt="walking-dark"
              src="/assets/images/template/walking-dark.svg"
              width="224"
              height="227"
            />
          </div>
        </div>
        <div className="container max-w-lg">
          <div className="section-inner panel">
            <div
              className="panel vstack text-center"
              data-anime="onview: -100; targets: >*; translateY: [48, 0]; opacity: [0, 1]; easing: spring(1, 80, 10, 0); duration: 450; delay: anime.stagger(100, {start: 200});"
            >
              <h2 className="h3 lg:h2 mb-4">Wie House of Charts hilft</h2>
              <p className="fs-5 xl:fs-4 text-dark dark:text-white text-opacity-70">
              Wir automatisieren medizinische Dokumentation und andere repetitive, administrative Prozesse im Gesundheitswesen, damit Ärzte und Pflegekräfte mehr Zeit für die direkte Patientenversorgung haben. Durch den Einsatz neuester KI-Technologien steigern wir Effizienz und Qualität.


              </p>
              <p className="fs-5 xl:fs-4 text-dark dark:text-white text-opacity-70">
              Unser Team vereint medizinisches Fachwissen, KI-Forschung und Software-Expertise, um klinische Abläufe zu entlasten. Von der ersten Idee bis zur Umsetzung arbeiten wir eng mit Kliniken zusammen, um sicherzustellen, dass unsere Lösungen praxisnah und effektiv sind.
              </p>
              <div className="panel mt-6">
                <div className="row child-cols-6 lg:child-cols-4 justify-center g-3 col-match">
                  {panelsData.map((panel, index) => (
                    <div key={index}>
                      <div className="panel vstack gap-1">
                        <h4 className="h2 xl:h1 m-0">
                          <span data-anime={panel.animationData}>
                            {panel.value}
                          </span>
                          {panel.suffix && panel.suffix}
                        </h4>
                        <p className="fs-6 lg:fs-5 text-dark dark:text-white text-opacity-70 text-nowrap">
                          {panel.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
