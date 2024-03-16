import { markdownify } from "@lib/utils/textConverter";
import ImageFallback from "./ImageFallback";
import { useMediaQuery } from 'react-responsive';


const Offices = ({ offices }) => {

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  let countries = offices.countries;

  if (isMobile) {
    // Shift elements back by one
    countries = [ ...countries.slice(1, countries.length), countries[0]];
   }

  return (
            <div className="section container">
            <div className="animate text-center">
              <p>{offices.subtitle}</p>
              {markdownify(offices.title, "h2", "section-title mt-4")}
              {markdownify(offices.content, "p", "mt-16")}
            </div>
            <div className="row justify-center">
              <div className="lg:col-10">
                <div className="row  justify-center">
                  {countries.map((country, index) => (
                    <div
                      key={("country-", index)}
                      className="animate mt-10 md:col-6 xl:col-3"
                    >
                      <div className="rounded-xl p-5 shadow-[0_4px_25px_rgba(0,0,0,.05)]">
                        <ImageFallback
                          // className="mx-auto"
                          src={country.flag}
                          width={80}
                          height={80}
                          alt={country.name}
                        />
                        <h5 className="h4 mt-2">{country.name}</h5>
                        <p className="mt-2">{country.location}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
  )
}

export default Offices;
