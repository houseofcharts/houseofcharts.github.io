import { markdownify } from "@lib/utils/textConverter";
import Circle from "./Circle";
import VideoPopup from "./VideoPopup";


const Video = ({ video }) => {

  return (
        <div className="container-xl relative">
          <div className="bg-theme absolute top-0 left-0 w-full">
            <Circle
              className="left-[7%] top-[21%]"
              width={32}
              height={32}
              fill={false}
            />
            <Circle
              className="left-[30%] top-[10%]"
              width={20}
              height={20}
              fill={false}
            />
            <Circle
              className="left-[4%] bottom-[35%]"
              width={20}
              height={20}
              fill={false}
            />
            <Circle
              className="left-[10%] bottom-[11%]"
              width={37}
              height={37}
              fill={false}
            />
            <Circle
              className="left-[44%] bottom-[48%]"
              width={37}
              height={37}
              fill={false}
            />
            <Circle
              className="left-[35%] bottom-[22%]"
              width={20}
              height={20}
              fill={false}
            />
            <Circle
              className="right-[32%] top-[2%]"
              width={47}
              height={47}
              fill={false}
            />
          </div>
          <div className="row items-center justify-center py-[90px]">
            <div className="md:col-6 xl:col-4">
              <div className="animate p-5">
                <p>{video.subtitle}</p>
                {markdownify(video.title, "h2", "mt-4 section-title bar-left")}
                {markdownify(video.description, "p", "mt-10")}
              </div>
            </div>
            <div className="md:col-6 xl:col-5">
              <div className="px-4 ">
                <VideoPopup
                  id={video.video_id}
                  thumbnail={video.thumbnail}
                  width={540}
                  height={585}
                />
              </div>
            </div>
          </div>
        </div>
  )
}




