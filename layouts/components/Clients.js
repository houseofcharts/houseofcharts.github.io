import { markdownify } from "@lib/utils/textConverter";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ImageFallback from "./ImageFallback";


const Clients = ({ clients }) => {

  return (
    <div className="section container">
    <div className="animate text-center">
      <p>{clients.subtitle}</p>
      {markdownify(clients.title, "h2", "section-title mt-4")}
    </div>
    <div className="animate from-right col-12 mt-16">
      <Swiper
        loop={true}
        spaceBetween={30}
        breakpoints={{
          0: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          992: { slidesPerView: 4 },
          1200: { slidesPerView: 5 },
        }}
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
      >
        {clients.brands.map((brand, index) => (
          <SwiperSlide
            className="cursor-pointer grayscale transition hover:grayscale-0"
            key={"brand-" + index}
          >
            <div className="relative flex h-28 w-full items-center justify-center p-4 lg:h-36 lg:p-6 [&_img]:!object-contain">
              <ImageFallback
                src={brand}
                width={300}
                height={150}
                alt="Client Logo"
                priority={true}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  </div>
  )
}


export default Clients;