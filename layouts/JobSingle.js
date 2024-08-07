import config from "@config/config.json";
import Base from "@layouts/Baseof";

import { markdownify } from "@lib/utils/textConverter";
import shortcodes from "@shortcodes/all";
import { DiscussionEmbed } from "disqus-react";
import { MDXRemote } from "next-mdx-remote";
//BACK_TO_FULLSTACK: UNCOMMENT & img -> Image in jsx below
//import Image from "next/image";
// ALSO REMOVE
//const isProd = process.env.NODE_ENV === 'production';
import Cta from "./components/Cta";
import ImageFallback from "./components/ImageFallback";
import Job from "./partials/Job";

const JobSingle = ({ frontmatter, content, mdxContent, recentPosts }) => {
  let { description, title, date, image, author } = frontmatter;
  console.log("hello")
  console.log(description)
  console.log("bye")
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
                <div className="mt-6 flex items-center">
                  <div className="overflow-hidden rounded-full border-2 border-white shadow-[0_0_0_2px] shadow-primary">
                    <ImageFallback
                      src={author.avatar}
                      width={50}
                      height={50}
                      alt="author"
                    />
                  </div>
                  <div className="pl-5">
                    <p className="font-medium text-dark">{author.name}</p>
                  </div>
                </div>
                <div className="content mt-16 mb-16 text-left">
                  <MDXRemote {...mdxContent} components={shortcodes} />
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
