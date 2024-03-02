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
        slidesPerView={3}
        breakpoints={{
          992: {
            slidesPerView: 3,
          },
        }}
        spaceBetween={20}
        modules={[Autoplay]}
        autoplay={{ delay: 3000 }}
      >
        {clients.brands.map((brand, index) => (
          <SwiperSlide
            className="h-auto cursor-pointer py-6 px-6 grayscale  transition hover:grayscale-0 lg:px-10"
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
  )
}


export default Clients;