import Circle from "@layouts/components/Circle";
import ImageFallback from "@layouts/components/ImageFallback";
import { gsap } from "@lib/gsap";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Autoplay, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const LandingBanner = ({banner, brands}) => {

    useEffect(() => {
        const ctx = gsap.context(() => {
          const banner = document.querySelector(".banner");
          const bannerBg = document.querySelector(".banner-bg");
          const bannerContent = document.querySelector(".banner-content");
          const header = document.querySelector(".header");
          const tl = gsap.timeline();
    
          tl.fromTo(
            ".banner-title",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, delay: 0.5 }
          )
            .fromTo(
              ".banner-btn",
              { y: 20, opacity: 0 },
              { y: 0, opacity: 1, duration: 0.5 },
              ">-0.4"
            )
            .fromTo(
              ".banner-img",
              {
                y: 20,
                opacity: 0,
              },
              {
                y: 0,
                opacity: 1,
                duration: 0.5,
              },
              ">-.5"
            );
    
          //parallax banner
          const parallaxTl = gsap.timeline({
            ease: "none",
            scrollTrigger: {
              trigger: banner,
              start: () => `top ${header.clientHeight}`,
              scrub: true,
            },
          });
    
          const position = (banner.offsetHeight - bannerBg.offsetHeight) * 0.4;
          parallaxTl
            .fromTo(
              bannerBg,
              {
                y: 0,
              },
              {
                y: -position,
              }
            )
            .fromTo(
              bannerContent,
              {
                y: 0,
              },
              {
                y: position,
              },
              "<"
            )
            .fromTo(
              ".banner-bg .circle",
              {
                y: 0,
              },
              {
                y: position,
              },
              "<"
            );
        });
    
        return () => ctx.revert();
      }, []);

    return (
        <section className="section banner pt-0">
            <div className="container-xl">
                <div className="relative">
                    <div className="bg-theme banner-bg col-12 absolute top-0 left-0">
                    <Circle
                        className="circle left-[10%] top-12"
                        width={32}
                        height={32}
                        fill={false}
                    />
                    <Circle
                        className="circle left-[2.5%] top-[29%]"
                        width={85}
                        height={85}
                    />
                    <Circle
                        className="circle left-[22%] bottom-[48%]"
                        width={20}
                        height={20}
                    />
                    <Circle
                        className="circle left-[15%] bottom-[37%]"
                        width={47}
                        height={47}
                        fill={false}
                    />
                    <Circle
                        className="circle left-[6%] bottom-[13%]"
                        width={62}
                        height={62}
                        fill={false}
                    />
                    <Circle
                        className="circle right-[12%] top-[15%]"
                        width={20}
                        height={20}
                    />
                    <Circle
                        className="circle right-[2%] top-[30%]"
                        width={73}
                        height={73}
                        fill={false}
                    />
                    <Circle
                        className="circle right-[19%] top-[48%]"
                        width={37}
                        height={37}
                        fill={false}
                    />
                    <Circle
                        className="circle right-[33%] top-[54%]"
                        width={20}
                        height={20}
                    />
                    <Circle
                        className="circle right-[3%] bottom-[20%]"
                        width={65}
                        height={65}
                    />
                    </div>
                    <div className="row overflow-hidden rounded-2xl">
                    <div className="col-12">
                        <div className="row relative justify-center pb-10">
                        <div className="banner-content col-10 pt-20 pb-10 text-center">
                          {markdownify(
                          banner.title,
                          "h1",
                          "mb-8 banner-title opacity-0"
                          )}
                          <div className="banner-btn opacity-0 sm:space-x-10 flex flex-col sm:flex-row items-center justify-center">
                              {/*<Link className="btn btn-secondary hover:bg-opacity-10 mb-4 sm:mb-0" href={banner.cta_secondary.href}>
                                  {banner.cta_secondary.label}
                              </Link>
                              */}
                              <Link className="btn btn-primary" href={banner.cta_primary.href}>
                                  {banner.cta_primary.label}
                              </Link>
                          </div>
                      </div>
                        <div className="col-10">
                            <ImageFallback
                            className="banner-img opacity-0"
                            src={banner.image}
                            width={1170}
                            height={666}
                            priority={true}
                            alt=""
                            />
                        </div>
                        </div>
                    </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <p>{"KOMPATIBEL MIT"}</p>
                    </div>
                    <div className="row border-y border-border py-5">
                    
                    <div className="animate from-right col-12">
                        <Swiper
                        loop={false}
                        slidesPerView={5}
                        breakpoints={{
                          300: {
                            slidesPerView: 1,
                          },
                          400: {
                            slidesPerView: 2,
                          },
                          600: {
                            slidesPerView: 3,
                          },
                          900: {
                            slidesPerView: 4,
                          },
                          1300: {
                            slidesPerView: 5,
                          },
                        }}
                        spaceBetween={20}
                        modules={[Autoplay]}
                        autoplay={{ delay: 2300 }}
                        >
                        {brands.map((brand, index) => (
                            <SwiperSlide
                            className=" h-20 cursor-pointer py-6 px-6 grayscale  transition hover:grayscale-0 lg:px-10"
                            key={"brand-" + index}
                            >
                            <div className="relative h-full">
                                <ImageFallback
                                className="object-contain"
                                src={brand}
                                sizes="100vw"
                                alt=""
                                fill={true}
                                priority={true}
                                />
                            </div>
                            </SwiperSlide>
                        ))}
                        </Swiper>
                    </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default LandingBanner;