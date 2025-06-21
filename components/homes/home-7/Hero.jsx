"use client";
import Brands from "@/components/common/Brands";
import Link from "next/link";
import Image from "next/image";
import { openContactModal } from "@/utlis/toggleContactModal";

export default function Hero() {
  return (
    <div id="hero_header" className="hero-header section panel overflow-hidden">
      <div className="section-outer panel py-6 xl:py-9 pt-9 lg:pt-10 bg-secondary dark:bg-gray-900">
        <div
          className="position-absolute top-0 start-0 end-0 min-h-screen overflow-hidden d-none lg:d-block"
          data-anime="onview: -100; targets: img; scale: [0.8, 1]; opacity: [0, 1]; easing: spring(1, 80, 10, 0); duration: 450; delay: anime.stagger(100, {start: 750});"
        >
          <div
            className="position-absolute  rotate-45"
            style={{ top: "35%", left: "47%" }}
          >
          </div>
          <div
            className="position-absolute  rotate-45"
            style={{ top: "12%", right: "15%" }}
          >
          </div>

          <div
            className="position-absolute  rotate-60"
            style={{ top: "44%", right: "18%" }}
          >
          </div>
        </div>
        <div className="container max-w-xl">
          <div className="section-inner panel py-4">
            <div className="row child-cols justify-center lg:justify-between items-center gy-4 sm:gy-6 gx-0">
              <div className="col-12 sm:col-9 lg:col-5">
                <div
                  className="vstack gap-2 mt-2 sm:mt-4 lg:mt-0 sm:text-center lg:text-center rtl:lg:text-end"
                  data-anime="targets: >*; translateY: [48, 0]; opacity: [0, 1]; easing: spring(1, 80, 10, 0); duration: 50; delay: anime.stagger(100, {start: 200});"
                >
                  <h1 className="h2 sm:h1 lg:display-6 xl:display-5 m-0">
                    Mehr Patienten,
                    weniger Dokumentation.
                  </h1>
                  <p className="fs-6 sm:fs-5 text-dark dark:text-white text-opacity-70">
                    Automatisierte Dokumentation für Ihre Klinik. Effizient, präzise, und sicher integriert
                  </p>
                  <div className="vstack sm:hstack gap-1 lg:gap-2 mt-1 sm:mt-2 flex-sm-column">
                    <a
                      onClick={openContactModal}
                      className="btn btn-md lg:btn-lg btn-primary text-white"
                    >
                      Klinik heute optimieren
                    </a>
                    <Link
                      href={`/blog`}
                      className="btn btn-md lg:btn-lg btn-red-outline"
                      data-uc-toggle=""
                    >
                      Mehr erfahren
                    </Link>
                  </div>
                  <p className="text-dark dark:text-white text-opacity-70 sm:mt-1 lg:mt-0">

                  </p>
                </div>
              </div>
              <div className="col-12 lg:col-6 xl:col-7">
                <div
                  className="hero-scene panel rtl:me-6 rtl:ms-n6"
                  data-anime="targets: >*; scale: [0.9, 1]; opacity: [0, 1]; easing: spring(1, 80, 10, 0); duration: 450; delay: anime.stagger(100, {start: 750});"
                >
                  <div className="panel overflow-hidden">
                    <Image
                      className="d-block dark:d-none"
                      alt="Main hero image"
                      src="/assets/images/template/hero-two_illustration.svg"
                      width="1280"
                      height="942"
                    />
                    <Image
                      className="d-none dark:d-block"
                      alt="Main hero image"
                      src="/assets/images/template/hero-two_illustration_dark.svg"
                      width="1280"
                      height="942"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="brands panel overflow-hidden mt-4 sm:mt-6 lg:mt-6 opacity-80">
              <div
                className="block-panel panel"
                data-anime="opacity: [0, 1]; duration: 450; delay: 750;"
              >
                <div className="element-brands text-gray-900 dark:text-white">
                  <Brands />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
