import { markdownify } from "@lib/utils/textConverter";
import Circle from "./Circle";
import ImageFallback from "./ImageFallback";


const Mission = ({ mission }) => {

  return (
    <div className="section container">
    <div className="row items-center justify-center">
      <div className="animate md:col-6 lg:col-5">
        <div className="about-image relative p-[60px]">
          <ImageFallback
            className="animate relative w-full rounded-2xl"
            src={mission.image}
            width={425}
            height={487}
            alt=""
          />
          <Circle
            className="top-4 left-4 z-[-1]"
            width={85}
            height={85}
          />
          <Circle
            width={37}
            height={37}
            fill={false}
            className="top-20 right-10 z-[-1]"
          />
          <Circle
            className="top-1/2 right-12 -z-[1]"
            width={24}
            height={24}
          />
          <Circle
            className="bottom-6 right-6 z-[-1]"
            width={85}
            height={85}
          />
          <Circle
            className="top-1/2 left-12 z-[-1]"
            width={20}
            height={20}
          />
          <Circle
            className="bottom-12 left-8 z-[1]"
            width={47}
            height={47}
            fill={false}
          />
        </div>
      </div>
      <div className="animate md:col-6 lg:col-4">
        <p>{mission.subtitle}</p>
        {markdownify(mission.title, "h2", "section-title bar-left mt-4")}
        {markdownify(mission.content, "p", "mt-10")}
      </div>
    </div>
  </div>
  )
}

export default Mission;