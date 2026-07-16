import { markdownify } from "@lib/utils/textConverter";
import Banner from "@layouts/components/Banner";
import { useState } from "react";

const Newsletter = ({ data, posts }) => {
  const { frontmatter, content } = data;
  const { title, subtitle } = frontmatter;

  const sortedPosts = (posts || []).sort(
    (a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date)
  );

  const [selectedPost, setSelectedPost] = useState(null);

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    const portalId = "143884604";
    const formId = "d3247418-86a2-4390-bb3a-42cbc4cc7fbe";
    const hubspotUrl = `https://api-eu1.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

    const requestBody = {
      fields: [{ name: "email", value: email }],
      context: { pageUri: window.location.href, pageName: document.title }
    };

    try {
      const response = await fetch(hubspotUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <>
      <section className="section pt-0">
        <Banner title={title} />
      </section>

      <section className="section pt-10">
        <div className="container">
          <div className="row">

            {/* Linke Spalte */}
            <div className="mb-10 lg:col-3 lg:mb-0">
              <div className="rounded-lg bg-theme-light p-8 dark:bg-darkmode-theme-light">
                <h3 className="mb-6 text-xl font-bold">Vergangene Ausgaben</h3>

                {sortedPosts.length > 0 ? (
                  <ul className="space-y-4">
                    {sortedPosts.map((post, i) => {
                      const isActive = selectedPost === post;

                      return (
                        <li key={`post-${i}`} className="border-b border-border pb-3 last:border-0 last:pb-0">
                          <button
                            onClick={() => setSelectedPost(post)}
                            className={`text-left transition-colors hover:text-primary ${
                              isActive ? "text-primary font-bold" : "text-text"
                            }`}
                          >
                            {post.frontmatter.title}
                          </button>

                          {post.frontmatter.date && (
                            <span className="block text-sm text-text mt-1">
                              {new Date(post.frontmatter.date).toLocaleDateString("de-CH", {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              })}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-sm text-text">Noch keine Ausgaben veröffentlicht.</p>
                )}
              </div>
            </div>

            {/* Rechte Spalte */}
            <div className="lg:col-9 lg:pl-10">
              <div className="content text-left">
                {selectedPost ? (
                  <div className="animate-fadeIn">
                    {markdownify(selectedPost.frontmatter.title, "h2", "mb-4 text-3xl font-bold")}

                    <div className="mb-16">
                      {markdownify(selectedPost.content, "div", "prose max-w-none")}
                    </div>
                  </div>
                ) : (
                  <div className="animate-fadeIn">
                    {subtitle && markdownify(subtitle, "p", "mb-10 text-xl text-text font-medium")}

                    <div className="mb-16">
                      {markdownify(content, "div", "prose max-w-none")}
                    </div>
                  </div>
                )}

                <div className="mt-12 rounded-2xl border border-border p-8 dark:border-darkmode-border">
                  <h3 className="mb-4 text-2xl font-bold">Keine Ausgabe verpassen</h3>
                  <p className="mb-6">Melde dich an, um zukünftige Updates direkt per E-Mail zu erhalten.</p>

                  <form onSubmit={handleSubmit} className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <input
                      className="form-input w-full"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Deine E-Mail Adresse"
                      required
                      disabled={status === "loading"}
                    />
                    <button
                      className="btn btn-primary whitespace-nowrap"
                      type="submit"
                      disabled={status === "loading"}
                    >
                      {status === "loading" ? "Wird gesendet..." : "Abonnieren"}
                    </button>
                  </form>
                  {status === "success" && <p className="mt-4 text-green-600">Danke für deine Anmeldung!</p>}
                  {status === "error" && <p className="mt-4 text-red-600">Da ist leider etwas schiefgelaufen. Bitte versuche es später noch einmal.</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Newsletter;