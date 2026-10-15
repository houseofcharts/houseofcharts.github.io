import Base from "@layouts/Baseof";
import Banner from "@layouts/components/Banner";
import Cta from "@layouts/components/Cta";
import NewsletterSignup from "@layouts/components/NewsletterSignup";
import NewsletterIssue from "@layouts/partials/NewsletterIssue";
import { getListPage, getSinglePage } from "@lib/contentParser";
import { sortByDate } from "@lib/utils/sortFunctions";

const NewsletterIndex = ({ data, posts }) => {
  const { frontmatter } = data;
  const { title } = frontmatter;
  const issues = sortByDate(posts);

  return (
    <Base title={title}>
      <section className="section pt-0">
        <Banner title={title} />
        <div className="container">
          <div className="row justify-center pt-20">
            {issues.map((post, i) => (
              <div key={`issue-${i}`} className="mb-8 lg:col-5">
                <NewsletterIssue post={post} />
              </div>
            ))}
          </div>
          <div className="row justify-center pt-8 pb-16">
            <div className="lg:col-10">
              <NewsletterSignup />
            </div>
          </div>
        </div>
      </section>

      <Cta />
    </Base>
  );
};

export default NewsletterIndex;

export const getStaticProps = async () => {
  const data = await getListPage("content/newsletter/_index.md");
  const posts = getSinglePage("content/newsletter");

  return {
    props: {
      data: data,
      posts: posts,
    },
  };
};
