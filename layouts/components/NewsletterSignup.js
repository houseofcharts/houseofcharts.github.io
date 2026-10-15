import { useState } from "react";

const NewsletterSignup = () => {
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
      context: { pageUri: window.location.href, pageName: document.title },
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
    <div className="rounded-2xl bg-theme-light px-8 py-12 text-center dark:bg-darkmode-theme-light md:px-16">
      <h2 className="h4">Keine Ausgabe verpassen</h2>
      <p className="mt-4">
        Melden Sie sich an und erhalten Sie jede neue Ausgabe direkt per E-Mail.
      </p>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-8 flex max-w-xl flex-col gap-4 sm:flex-row"
      >
        <input
          className="h-12 w-full rounded-[6px] border border-border bg-white px-4 text-text focus:border-primary focus:outline-none focus:ring-transparent dark:border-darkmode-border dark:bg-darkmode-body"
          name="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Ihre E-Mail-Adresse"
          required
          disabled={status === "loading"}
        />
        <button
          className="btn btn-primary shrink-0 whitespace-nowrap"
          type="submit"
          disabled={status === "loading"}
        >
          {status === "loading" ? "Wird gesendet..." : "Abonnieren"}
        </button>
      </form>
      {status === "success" && (
        <p className="mt-4 text-green-600">Vielen Dank für Ihre Anmeldung!</p>
      )}
      {status === "error" && (
        <p className="mt-4 text-red-600">
          Da ist leider etwas schiefgelaufen. Bitte versuchen Sie es später
          erneut.
        </p>
      )}
    </div>
  );
};

export default NewsletterSignup;
