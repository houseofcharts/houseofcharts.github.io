import ImageFallback from "@layouts/components/ImageFallback";
import { markdownify } from "@lib/utils/textConverter";

const Benefits = ({speciality}) => {

    return (
      <>
        {/* Special Features */}
        <section className="section">
          <div className="container">
            {
                speciality.map((item, index) => (
                    index % 2 == 0 ?
                    (
                        <div className="row items-center justify-center">
                            <div className="animate lg:col-6 lg:order-2">
                                <ImageFallback
                                className="mx-auto"
                                src={item.image}
                                width={575}
                                height={511}
                                alt={`speciality-${index}`}
                                />
                            </div>
                            <div className="animate lg:col-5 lg:order-1">
                                <p>{item.subtitle}</p>
                                {markdownify(
                                item.title,
                                "h2",
                                "mt-4 section-title bar-left"
                                )}
                                {markdownify(item.description, "p", "mt-10")}
                            </div>
                        </div>
                    ) :
                    (
                        <div className="row items-center">
                            <div className="animate lg:col-6">
                                <ImageFallback
                                className="mx-auto"
                                src={item.image}
                                width={575}
                                height={511}
                                alt={`speciality-${index}`}
                                />
                            </div>
                            <div className="animate lg:col-5">
                                <p>{item.subtitle}</p>
                                {markdownify(
                                item.title,
                                "h2",
                                "mt-4 section-title bar-left"
                                )}
                                {markdownify(item.description, "p", "mt-10")}
                            </div>
                        </div>
                    )
                ))
            }
            
            
          </div>
        </section>
      </>
    )
  }
  
export default Benefits;