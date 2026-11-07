import config from "@config/config.json";
import Base from "@layouts/Baseof";

import dateFormatDe from "@lib/utils/dateFormatDe";
import rollDeadline from "@lib/utils/rollingDeadline";
import { markdownify } from "@lib/utils/textConverter";
import shortcodes from "@shortcodes/all";
import { DiscussionEmbed } from "disqus-react";
import { MDXRemote } from "next-mdx-remote";
import Link from "next/link";
import { useEffect, useState } from "react";
//BACK_TO_FULLSTACK: UNCOMMENT & img -> Image in jsx below
//import Image from "next/image";
// ALSO REMOVE
//const isProd = process.env.NODE_ENV === 'production';
import Cta from "./components/Cta";
import ImageFallback from "./components/ImageFallback";
import Job from "./partials/Job";

const JobSingle = ({ frontmatter, content, mdxContent, recentPosts, slug, deadline }) => {
  let { description, title, date, image } = frontmatter;
  // start with the build-time value (keeps SSR and hydration identical),
  // then re-roll on the client in case the last build is older than the deadline
  const [closingDate, setClosingDate] = useState(deadline);
  useEffect(() => {
    const rolled = rollDeadline(frontmatter.deadline, {
      graceDays: frontmatter.deadline_grace_days,
      stepMonths: frontmatter.deadline_step_months,
    });
    if (rolled) setClosingDate(rolled.toISOString());
  }, [frontmatter]);
  description = description ? description : content.slice(0, 120);

  const { disqus } = config;

  return (
    <Base title={title} description={description}>
      <section className="section pt-0">
        <div className="container">
          <article>
            <div className="row justify-center">
              <div className="lg:col-10">
                {image && (
                  <img
                    src={ image}
                    height="700"
                    width="1120"
                    alt={title}
                    priority={true}
                    className="fade w-full rounded-lg opacity-0"
                  />
                )}
              </div>
              <div className="lg:col-8">
                {markdownify(title, "h1", "h2 mt-6")}
                <div className="content mt-16 mb-16 text-left">
                  <MDXRemote {...mdxContent} components={shortcodes} />
                  {closingDate && (
                    <p>
                      <strong>Schlussdatum für Bewerbungen:</strong>{" "}
                      {dateFormatDe(closingDate)}
                    </p>
                  )}
                </div>
                <div className="mb-16 rounded-2xl bg-theme-light px-8 py-10 text-center">
                  <h3 className="h4">Interessiert?</h3>
                  <p className="mt-3">
                    Laden Sie Ihren Lebenslauf hoch – in zwei Minuten erledigt.
                  </p>
                  <Link
                    href={{ pathname: "/apply", query: { job: slug } }}
                    className="btn btn-primary mt-6"
                  >
                    Jetzt bewerben
                  </Link>
                </div>
              </div>
              {disqus.enable && (
                <div className="fade row justify-center opacity-0">
                  <div className="lg:col-8">
                    <DiscussionEmbed
                      shortname={disqus.shortname}
                      config={disqus.settings}
                    />
                  </div>
                </div>
              )}
            </div>
          </article>

          <div className="section mt-16">
            <h2 className="section-title text-center">Recent Articles</h2>
            <div className="row justify-center">
              {recentPosts.slice(0, 2).map((post, index) => (
                <div key={"job-" + index} className="animate mt-16 lg:col-5">
                  <Job post={post} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Cta />
    </Base>
  );
};

export default JobSingle;
