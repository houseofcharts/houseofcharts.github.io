import NewsletterSingle from "@layouts/NewsletterSingle";
import { getSinglePage } from "@lib/contentParser";
import parseMDX from "@lib/utils/mdxParser";
import { sortByDate } from "@lib/utils/sortFunctions";

const NewsletterIssuePage = ({ post, mdxContent, otherIssues }) => {
  const { frontmatter, content } = post[0];

  return (
    <NewsletterSingle
      frontmatter={frontmatter}
      content={content}
      mdxContent={mdxContent}
      otherIssues={otherIssues}
    />
  );
};

export const getStaticPaths = () => {
  const allSlug = getSinglePage("content/newsletter");
  const paths = allSlug.map((item) => ({
    params: {
      single: item.slug,
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const { single } = params;
  const issues = getSinglePage("content/newsletter");
  const post = issues.filter((p) => p.slug == single);
  const mdxContent = await parseMDX(post[0].content);
  const otherIssues = sortByDate(issues).filter((p) => p.slug !== single);

  return {
    props: {
      post: post,
      mdxContent: mdxContent,
      otherIssues: otherIssues,
    },
  };
};

export default NewsletterIssuePage;
