import Header7 from "@/components/headers/Header7";
import Image from "next/image";
import Footer2 from "@/components/footers/FooterHOC";
import MeetingEmbed from "@/components/MeetingEmbed";
import ContactLinks from "@/components/innerpages/ContactLinks";
import Faq from "@/components/homes/home-2/Faq";
import Brands from "@/components/common/Brands2";
import Blogs from "@/components/homes/home-2/Blogs";
export const metadata = {
  title:
    "Kontakt || House of Charts",
  description:
    "Lexend - Full-featured, professional-looking software, saas and startup nextjs template.",
};
export default function ContactPage() {
  return (
    <>
      
      <div className="page-wrapper uni-body panel bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-200 overflow-x-hidden bp-xs bp-sm bp-md bp-lg bp-xl bp-xxl dom-ready">
        <Header7 />
        <div className="section-outer panel pt-9 lg:pt-10 pb-1 sm:pb-2 lg:pb-4">
          <div className="container max-w-xl">
            <div
                className="section-inner panel mt-2 sm:mt-4 lg:mt-0"
                data-anime="targets: >*; translateY: [48, 0]; opacity: [0, 1]; easing: spring(1, 80, 10, 0); duration: 450; delay: anime.stagger(100, {start: 200});">
              <div className="vstack items-center gap-2 lg:gap-4 mb-4 sm:mb-6 lg:mb-8 max-w-750px mx-auto text-center">
                <h1 className="h2 sm:h1 lg:display-6 xl:display-5 m-0">
                  Kontaktieren Sie uns.
                </h1>
                <p className="fs-6 sm:fs-5 text-dark dark:text-white text-opacity-70">
                  Zögern Sie nicht, uns über die untenstehenden Optionen zu kontaktieren – unser engagiertes Team wird Ihre Anfrage umgehend beantworten.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div id="wrapper" className="wrap">
        <section className="section">
          <div className="container">
            <div className="section row items-center justify-center">
              <div className="animate lg:col-5">
                <Image
                  className="mx-auto lg:pr-10"
                  src="/assets/images/contact/contact.png"
                  width={497}
                  height={397}
                  alt=""
                />
              </div>
              <div className="animate lg:col-5">
                <div className="contact-form rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.05)]">
                  <MeetingEmbed />
                </div>
              </div>
            </div>
          </div>
        </section>

          {/* <ContactLinks />
          <Faq />
          <div
            id="clients_brands"
            className="clients-brands section panel overflow-hidden"
          >
            <div className="section-outer panel pb-8 sm:pb-9 xl:pb-9">
              <h5
                className="h6 sm:h5 text-center mb-4 sm:mb-6 xl:mb-8"
                data-anime="onview: -100; translateY: [48, 0]; opacity: [0, 1]; easing: spring(1, 80, 10, 0); duration: 450; delay: 200;"
              >
                Trusted by well-known brands.
              </h5>
              <div
                className="block-panel panel"
                data-anime="onview: -100; translateY: [48, 0]; opacity: [0, 1]; easing: spring(1, 80, 10, 0); duration: 450; delay: 250;"
              >
                <div className="element-brands max-w-950px m-auto text-gray-900 dark:text-white">
                  <Brands />
                </div>
              </div>
            </div>
          </div>
          <Blogs /> */}
        </div>
        <Footer2 />
      </div>
    </>
  );
}
