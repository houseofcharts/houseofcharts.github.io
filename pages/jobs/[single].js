import config from "@config/config.json";
import JobSingle from "@layouts/JobSingle";
import { getSinglePage } from "@lib/contentParser";
import parseMDX from "@lib/utils/mdxParser";
import rollDeadline from "@lib/utils/rollingDeadline";
import { sortByDate } from "@lib/utils/sortFunctions";
const { jobs_folder } = config.settings;

// post single layout
const JobArticle = ({ post, authors, mdxContent, slug, recentPosts, deadline }) => {
  const { frontmatter, content } = post[0];

  return (
    <JobSingle
      frontmatter={frontmatter}
      content={content}
      mdxContent={mdxContent}
      authors={authors}
      slug={slug}
      recentPosts={recentPosts}
      deadline={deadline}
    />
  );
};

// get post single slug
export const getStaticPaths = () => {
  const allSlug = getSinglePage(`content/${jobs_folder}`);
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

// get post single content
export const getStaticProps = async ({ params }) => {
  const { single } = params;
  const posts = getSinglePage(`content/${jobs_folder}`);
  const post = posts.filter((p) => p.slug == single);
  const mdxContent = await parseMDX(post[0].content);
  const recentPosts = sortByDate(posts).filter((post) => post.slug !== single);
  // build-time deadline; the page re-rolls it in the browser (see JobSingle)
  const fm = post[0].frontmatter;
  const rolled = rollDeadline(fm.deadline, {
    graceDays: fm.deadline_grace_days,
    stepMonths: fm.deadline_step_months,
  });
  const deadline = rolled ? rolled.toISOString() : null;

  return {
    props: {
      post: post,
      mdxContent: mdxContent,
      slug: single,
      recentPosts: recentPosts,
      deadline: deadline,
    },
  };
};

export default JobArticle;
