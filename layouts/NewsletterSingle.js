import Base from "@layouts/Baseof";
import dateFormatDe from "@lib/utils/dateFormatDe";
import { markdownify } from "@lib/utils/textConverter";
import shortcodes from "@shortcodes/all";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import Cta from "./components/Cta";
import NewsletterSignup from "./components/NewsletterSignup";
import NewsletterIssue from "./partials/NewsletterIssue";

const NewsletterSingle = ({ frontmatter, content, mdxContent, otherIssues }) => {
  let { description, title, date, subtitle } = frontmatter;
  description = description ? description : content.slice(0, 120);

  return (
    <Base title={title} description={description}>
      <section className="section pt-0">
        <div className="container">
          <article>
            <div className="row justify-center">
              <div className="lg:col-8">
                <Link
                  href="/newsletter"
                  className="inline-block font-medium text-primary hover:underline"
                >
                  ← Alle Ausgaben
                </Link>
                {markdownify(title, "h1", "h2 mt-6")}
                {date && (
                  <p className="mt-4 text-sm">{dateFormatDe(date)}</p>
                )}
                {subtitle &&
                  markdownify(
                    subtitle,
                    "p",
                    "mt-6 text-lg font-medium text-dark"
                  )}
                <div className="content mt-10 mb-16 text-left">
                  <MDXRemote {...mdxContent} components={shortcodes} />
                </div>
                <NewsletterSignup />
              </div>
            </div>
          </article>

          {otherIssues.length > 0 && (
            <div className="section mt-16">
              <h2 className="section-title text-center">Weitere Ausgaben</h2>
              <div className="row justify-center">
                {otherIssues.slice(0, 2).map((post, index) => (
                  <div key={"issue-" + index} className="mt-16 lg:col-5">
                    <NewsletterIssue post={post} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Cta />
    </Base>
  );
};

export default NewsletterSingle;
