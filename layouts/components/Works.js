import { markdownify } from "@lib/utils/textConverter";


const Works = ({ works }) => {

  return (
    <div className="section container">
    <div className="animate text-center">
      <p>{works.subtitle}</p>
      {markdownify(works.title, "h2", "section-title mt-4")}
      {markdownify(works.content, "p", "mt-10")}
    </div>
    <div className="row mt-10 justify-center">
      {works.list.map((work, index) => (
        <div key={"work-" + index} className="mt-10 md:col-6 lg:col-5">
          <div className="animate text-center md:px-6 xl:px-12">
            {markdownify(work.title, "h3", "h4")}
            {markdownify(work.content, "p", "mt-2")}
          </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Works;