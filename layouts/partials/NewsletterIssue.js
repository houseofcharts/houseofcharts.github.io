import config from "@config/config.json";
import ImageFallback from "@layouts/components/ImageFallback";
import dateFormatDe from "@lib/utils/dateFormatDe";
import Link from "next/link";

const NewsletterIssue = ({ post }) => {
  const { summary_length } = config.settings;

  return (
    <div className="h-full overflow-hidden rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,.05)]">
      {post.frontmatter.image && (
        <Link
          href={`/newsletter/${post.slug}`}
          className="block bg-theme-light dark:bg-darkmode-theme-light"
        >
          <ImageFallback
            className="h-[260px] w-full object-contain p-6"
            src={post.frontmatter.image}
            alt={post.frontmatter.title}
            width={570}
            height={335}
          />
        </Link>
      )}
      <div className="p-8">
        {post.frontmatter.date && (
          <p className="mb-3 text-sm">{dateFormatDe(post.frontmatter.date)}</p>
        )}
        <h2 className="h4">
          <Link
            href={`/newsletter/${post.slug}`}
            className="block hover:text-primary hover:underline"
          >
            {post.frontmatter.title}
          </Link>
        </h2>
        <p className="mt-4">
          {post.content.slice(0, Number(summary_length))}...
        </p>
        <Link
          href={`/newsletter/${post.slug}`}
          className="mt-6 inline-block font-medium text-primary hover:underline"
        >
          Weiterlesen
        </Link>
      </div>
    </div>
  );
};

export default NewsletterIssue;
