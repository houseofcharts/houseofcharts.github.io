import { useEffect } from "react";
import { useRouter } from "next/router"
import config from "@config/config.json";
import Contact from "@layouts/Contact";
import PostSingle from "@layouts/PostSingle";
import { getSinglePage } from "@lib/contentParser";
import parseMDX from "@lib/utils/mdxParser";
import { sortByDate } from "@lib/utils/sortFunctions";
const { features_folder } = config.settings;

// post single layout
const Article = ({ post, authors, mdxContent, slug, recentPosts }) => {
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    router.replace('/contact'); // Redirect to /contact
  }, [router]);

  return (<div></div>)



  const { frontmatter, content } = post[0];

  return (
    <PostSingle
      frontmatter={frontmatter}
      content={content}
      mdxContent={mdxContent}
      authors={authors}
      slug={slug}
      recentPosts={recentPosts}
    />
  );
};

// get post single slug
export const getStaticPaths = () => {
  const allSlug = getSinglePage(`content/${features_folder}`);
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
  const posts = getSinglePage(`content/${features_folder}`);
  const post = posts.filter((p) => p.slug == single);
  const mdxContent = await parseMDX(post[0].content);
  const recentPosts = sortByDate(posts).filter((post) => post.slug !== single);

  return {
    props: {
      post: post,
      mdxContent: mdxContent,
      slug: single,
      recentPosts: recentPosts,
    },
  };
};

export default Article;
