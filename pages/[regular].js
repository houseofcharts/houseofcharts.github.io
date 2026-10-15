import NotFound from "@layouts/404";
import About from "@layouts/About";
import Apply from "@layouts/Apply";
import Base from "@layouts/Baseof";
import Contact from "@layouts/Contact";
import Default from "@layouts/Default";
import Feedback from "@layouts/Feedback";
import { getRegularPage, getSinglePage } from "@lib/contentParser";
import config from "@config/config.json";

// for all regular pages
const RegularPages = ({ data, jobs }) => {
  const { title, meta_title, description, image, noindex, canonical, layout } =
    data.frontmatter;
  const { content } = data;

  return (
    <Base
      title={title}
      description={description ? description : content.slice(0, 120)}
      meta_title={meta_title}
      image={image}
      noindex={noindex}
      canonical={canonical}
      minimal={layout === "apply"}
    >
      {layout === "404" ? (
        <NotFound data={data} />
      ) : layout === "about" ? (
        <About data={data} />
      ) : layout === "feedback" ? (
        <Feedback data={data} />
      ) : layout === "contact" ? (
        <Contact data={data} />
      ) : layout === "apply" ? (
        <Apply data={data} jobs={jobs} />
      ) : (
        <Default data={data} />
      )}
    </Base>
  );
};
export default RegularPages;

// for regular page routes
export const getStaticPaths = async () => {
  const slugs = getSinglePage("content");
  const paths = slugs.map((item) => ({
    params: {
      regular: item.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

// for regular page data
export const getStaticProps = async ({ params }) => {
  const { regular } = params;
  const allPages = await getRegularPage(regular);

  // open positions for the application form's "Position" select
  const jobs =
    allPages.frontmatter.layout === "apply"
      ? getSinglePage(`content/${config.settings.jobs_folder}`).map((job) => ({
          slug: job.slug,
          title: job.frontmatter.title,
        }))
      : [];

  return {
    props: {
      slug: regular,
      data: allPages,
      jobs,
    },
  };
};
