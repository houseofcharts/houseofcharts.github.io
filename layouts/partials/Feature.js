import config from "@config/config.json";
import ImageFallback from "@layouts/components/ImageFallback";
import dateFormat from "@lib/utils/dateFormat";
import Link from "next/link";

const Feature = ({ post, i }) => {
  const { summary_length, features_folder } = config.settings;

  let summary = post.frontmatter.summary ? post.frontmatter.summary : post.content;

  summary = summary.length >= Number(summary_length) ? summary.slice(0, Number(summary_length)) + '...' : summary.slice(0, Number(summary_length));
  


  return (
    <div className="overflow-hidden rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,.05)]">
      {post.frontmatter.image && (
        <Link href={`/${features_folder}/${post.slug}`}>
          <ImageFallback
            className="w-full object-cover"
            src={post.frontmatter.image}
            alt={post.frontmatter.title}
            width={570}
            height={335}
          />
        </Link>
      )}
      <div className="p-8">
        <h2 className="h4">
          <Link
            href={`/${features_folder}/${post.slug}`}
            className="block hover:text-primary hover:underline"
          >
            {post.frontmatter.title}
          </Link>
        </h2>
        <p className="mt-4">
          {summary}
        </p>
        <div className="mt-6 flex items-center">
          <div className="overflow-hidden rounded-full border-2 border-white shadow-[0_0_0_2px] shadow-primary">
            <ImageFallback
              src={post.frontmatter.author.avatar}
              width={50}
              height={50}
              alt="author"
            />
          </div>
          <div className="pl-5">
            <p className="font-medium text-dark">
              {post.frontmatter.author.name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
