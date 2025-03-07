import Footer3 from "@/components/footers/Footer3";
import Header7 from "@/components/headers/Header7";
import Blogs from "@/components/homes/home-4/Blogs";
import Cta from "@/components/homes/home-4/Cta";
import Cta2 from "@/components/homes/home-4/Cta2";
import Facts from "@/components/homes/home-7/Facts";
import Faq from "@/components/homes/home-4/Faq";
import Features from "@/components/homes/home-7/Features";
import Offerings from "@/components/homes/home-7/Offerings";
import Hero from "@/components/homes/home-7/Hero";
import Team from "@/components/homes/home-4/Team";
import Feedback from "@/components/homes/home-7/Feedback";
import KeyFeatures from "@/components/homes/home-7/KeyFeatures";
import React from "react";
export const metadata = {
  title:
    "Home 4 || Lexend - Full-featured, professional-looking software, saas and startup nextjs template.",
  description:
    "Lexend - Full-featured, professional-looking software, saas and startup nextjs template.",
};
export default function HomePage4() {
  return (
    <>
      <div className="page-wrapper uni-body panel bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200 overflow-x-hidden bp-xs bp-sm bp-md bp-lg dom-ready bp-xl bp-xxl">
        <Header7 />
        <div id="wrapper" className="wrap">
          <Hero />
          <div className="mt-1"></div>
          <Facts />
          <Feedback />
          <KeyFeatures />
          <Features />
          <Cta />
          <Blogs />
          <Cta2 />
        </div>
        <Footer3 />
      </div>
    </>
  );
}
