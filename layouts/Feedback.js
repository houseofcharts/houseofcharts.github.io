import config from "@config/config.json";
import Banner from "./components/Banner";
import ImageFallback from "./components/ImageFallback";
import FeedbackEmbed from "./components/FeedbackEmbed";

const Feedback = ({ data }) => {
  const { frontmatter } = data;
  const { title } = frontmatter;

  return (
    <section className="section">
      <Banner title={title} />
      <div className="container">
        <div className="section row items-center justify-center">
          <div className="animate lg:col-5">
            <ImageFallback
              className="mx-auto lg:pr-10"
              src="/images/contact.png"
              width={497}
              height={397}
              alt=""
            />
          </div>
          <div className="animate lg:col-5">
          <div className="contact-form rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.05)]">
          <FeedbackEmbed />
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feedback;
