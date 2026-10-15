import config from "@config/config.json";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const CV_EXTENSIONS = [".pdf", ".doc", ".docx"];
const DOCUMENT_EXTENSIONS = [".pdf", ".doc", ".docx", ".png", ".jpg", ".jpeg"];
const MAX_FILE_MB = 10;
const MAX_TOTAL_MB = 25;
const MAX_DOCUMENTS = 5;
const OPEN_APPLICATION = "initiativ";

const extensionOf = (name) => {
  const i = name.lastIndexOf(".");
  return i === -1 ? "" : name.slice(i).toLowerCase();
};

const formatMb = (bytes) => (bytes / (1024 * 1024)).toFixed(1);

const inputClass =
  "form-input w-full rounded-[6px] border border-border bg-white px-4 text-text placeholder:text-light focus:border-primary focus:outline-none focus:ring-transparent";

const Field = ({ label, htmlFor, required, error, hint, children }) => (
  <div className="mb-6">
    <label htmlFor={htmlFor} className="mb-2 block font-medium text-dark">
      {label}
      {required && <span className="text-primary"> *</span>}
    </label>
    {children}
    {hint && !error && <p className="mt-2 text-sm text-light">{hint}</p>}
    {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
  </div>
);

const Apply = ({ data, jobs = [] }) => {
  const { apply_api_url, apply_fallback_email } = config.params;
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    job: "",
    message: "",
    consent: false,
    website: "", // honeypot, stays empty for real users
  });
  const [cv, setCv] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [source, setSource] = useState("");
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [progress, setProgress] = useState(0);
  const [serverMessage, setServerMessage] = useState("");
  const [applicationId, setApplicationId] = useState("");
  const cvInput = useRef(null);
  const documentsInput = useRef(null);

  // Preselect the position from /apply?job=<slug>, remember ?src=<platform>
  useEffect(() => {
    if (!router.isReady) return;
    const { job, src } = router.query;
    if (typeof job === "string") {
      const known = jobs.some((j) => j.slug === job) || job === OPEN_APPLICATION;
      if (known) setForm((f) => ({ ...f, job }));
    }
    if (typeof src === "string") setSource(src);
  }, [router.isReady, router.query, jobs]);

  const update = (key) => (e) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const validate = () => {
    const er = {};
    if (form.name.trim().length < 2) er.name = "Bitte geben Sie Ihren Namen an.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim()))
      er.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
    if (!form.job) er.job = "Bitte wählen Sie eine Position.";
    if (!form.consent) er.consent = "Bitte stimmen Sie der Datenschutzerklärung zu.";

    if (!cv) er.cv = "Bitte laden Sie Ihren Lebenslauf hoch.";
    else if (!CV_EXTENSIONS.includes(extensionOf(cv.name)))
      er.cv = "Der Lebenslauf muss eine PDF- oder Word-Datei sein.";
    else if (cv.size > MAX_FILE_MB * 1024 * 1024)
      er.cv = `Die Datei ist zu gross (max. ${MAX_FILE_MB} MB).`;

    if (documents.length > MAX_DOCUMENTS)
      er.documents = `Maximal ${MAX_DOCUMENTS} weitere Dokumente.`;
    else if (documents.some((d) => !DOCUMENT_EXTENSIONS.includes(extensionOf(d.name))))
      er.documents = "Erlaubt sind PDF, Word, PNG und JPG.";
    else if (documents.some((d) => d.size > MAX_FILE_MB * 1024 * 1024))
      er.documents = `Jede Datei darf maximal ${MAX_FILE_MB} MB gross sein.`;

    const total = (cv ? cv.size : 0) + documents.reduce((s, d) => s + d.size, 0);
    if (total > MAX_TOTAL_MB * 1024 * 1024)
      er.documents = `Alle Dateien zusammen dürfen maximal ${MAX_TOTAL_MB} MB gross sein.`;

    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (status === "submitting") return;
    if (!validate()) return;

    const selectedJob = jobs.find((j) => j.slug === form.job);
    const fd = new FormData();
    fd.append("name", form.name.trim());
    fd.append("email", form.email.trim());
    fd.append("phone", form.phone.trim());
    fd.append("job", form.job);
    fd.append("jobTitle", selectedJob ? selectedJob.title : "Initiativbewerbung");
    fd.append("message", form.message.trim());
    fd.append("consent", form.consent ? "true" : "false");
    fd.append("website", form.website);
    fd.append("source", source || document.referrer || "");
    fd.append("pageUrl", window.location.href);
    fd.append("cv", cv, cv.name);
    documents.forEach((d) => fd.append("documents", d, d.name));

    setStatus("submitting");
    setProgress(0);
    setServerMessage("");

    // XMLHttpRequest instead of fetch so we can show upload progress
    const xhr = new XMLHttpRequest();
    xhr.open("POST", apply_api_url);
    xhr.upload.onprogress = (ev) => {
      if (ev.lengthComputable) setProgress(Math.round((ev.loaded / ev.total) * 100));
    };
    xhr.onload = () => {
      let body = {};
      try {
        body = JSON.parse(xhr.responseText || "{}");
      } catch (_) {}
      if (xhr.status >= 200 && xhr.status < 300 && body.ok) {
        setApplicationId(body.id || "");
        setStatus("success");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        if (body.fields) setErrors(body.fields);
        setServerMessage(body.error || "");
        setStatus("error");
      }
    };
    xhr.onerror = () => {
      setServerMessage("");
      setStatus("error");
    };
    xhr.send(fd);
  };

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", job: "", message: "", consent: false, website: "" });
    setCv(null);
    setDocuments([]);
    setErrors({});
    setStatus("idle");
    setProgress(0);
    setApplicationId("");
    if (cvInput.current) cvInput.current.value = "";
    if (documentsInput.current) documentsInput.current.value = "";
  };

  return (
    <section className="section pt-0">
      <div className="container">
        <div className="row justify-center">
          <div className="animate lg:col-8">
            {status === "success" ? (
              <div className="rounded-2xl bg-theme-light px-8 py-12 text-center md:px-16">
                <h2 className="h4">Vielen Dank für Ihre Bewerbung!</h2>
                <p className="mt-4">
                  Ihre Unterlagen sind bei uns eingegangen. Wir melden uns in Kürze
                  bei Ihnen.
                </p>
                {applicationId && (
                  <p className="mt-4 text-sm text-light">
                    Referenz: <span className="font-mono">{applicationId}</span>
                  </p>
                )}
                <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Link href="/jobs" className="btn btn-secondary">
                    Zurück zu den Jobs
                  </Link>
                  <button type="button" className="btn btn-primary" onClick={resetForm}>
                    Weitere Bewerbung senden
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-2xl bg-theme-light px-6 py-10 shadow-[0_4px_25px_rgba(0,0,0,0.05)] md:px-12"
              >
                <div className="md:grid md:grid-cols-2 md:gap-x-6">
                  <Field label="Name" htmlFor="name" required error={errors.name}>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      className={inputClass}
                      placeholder="Vor- und Nachname"
                      value={form.name}
                      onChange={update("name")}
                      disabled={status === "submitting"}
                      required
                    />
                  </Field>
                  <Field label="E-Mail" htmlFor="email" required error={errors.email}>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      className={inputClass}
                      placeholder="name@beispiel.ch"
                      value={form.email}
                      onChange={update("email")}
                      disabled={status === "submitting"}
                      required
                    />
                  </Field>
                  <Field label="Telefon" htmlFor="phone" error={errors.phone}>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      className={inputClass}
                      placeholder="+41 ..."
                      value={form.phone}
                      onChange={update("phone")}
                      disabled={status === "submitting"}
                    />
                  </Field>
                  <Field label="Position" htmlFor="job" required error={errors.job}>
                    <select
                      id="job"
                      name="job"
                      className={inputClass}
                      value={form.job}
                      onChange={update("job")}
                      disabled={status === "submitting"}
                      required
                    >
                      <option value="">Bitte wählen</option>
                      {jobs.map((job) => (
                        <option key={job.slug} value={job.slug}>
                          {job.title}
                        </option>
                      ))}
                      <option value={OPEN_APPLICATION}>Initiativbewerbung</option>
                    </select>
                  </Field>
                </div>

                <div className="md:grid md:grid-cols-2 md:gap-x-6">
                  <Field
                    label="Lebenslauf (CV)"
                    htmlFor="cv"
                    required
                    error={errors.cv}
                    hint={`PDF oder Word, max. ${MAX_FILE_MB} MB`}
                  >
                    <input
                      ref={cvInput}
                      id="cv"
                      name="cv"
                      type="file"
                      accept={CV_EXTENSIONS.join(",")}
                      className="block w-full text-sm file:mr-4 file:rounded-[6px] file:border-0 file:bg-primary file:px-4 file:py-2 file:font-medium file:text-white hover:file:bg-primary/90"
                      onChange={(e) => {
                        setCv(e.target.files && e.target.files[0] ? e.target.files[0] : null);
                        setErrors((er) => ({ ...er, cv: undefined }));
                      }}
                      disabled={status === "submitting"}
                      required
                    />
                    {cv && (
                      <p className="mt-2 text-sm">
                        {cv.name} ({formatMb(cv.size)} MB)
                      </p>
                    )}
                  </Field>

                  <Field
                    label="Weitere Dokumente (Cover Letter, Referenzen, etc.)"
                    htmlFor="documents"
                    error={errors.documents}
                    hint={`Optional: Motivationsschreiben, Zeugnisse, Diplome – bis zu ${MAX_DOCUMENTS} Dateien (PDF, Word, PNG, JPG), max. ${MAX_FILE_MB} MB pro Datei`}
                  >
                    <input
                      ref={documentsInput}
                      id="documents"
                      name="documents"
                      type="file"
                      multiple
                      accept={DOCUMENT_EXTENSIONS.join(",")}
                      className="block w-full text-sm file:mr-4 file:rounded-[6px] file:border file:border-primary file:bg-white file:px-4 file:py-2 file:font-medium file:text-primary hover:file:bg-primary hover:file:text-white"
                      onChange={(e) => {
                        setDocuments(Array.from(e.target.files || []));
                        setErrors((er) => ({ ...er, documents: undefined }));
                      }}
                      disabled={status === "submitting"}
                    />
                    {documents.length > 0 && (
                      <ul className="mt-2 text-sm">
                        {documents.map((d) => (
                          <li key={d.name + d.size}>
                            {d.name} ({formatMb(d.size)} MB)
                          </li>
                        ))}
                      </ul>
                    )}
                  </Field>
                </div>

                <Field label="Nachricht" htmlFor="message" error={errors.message}>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={`form-textarea ${inputClass}`}
                    placeholder="Optional: Was motiviert Sie? Was sollten wir über Sie wissen?"
                    value={form.message}
                    onChange={update("message")}
                    disabled={status === "submitting"}
                  />
                </Field>

                {/* Honeypot – hidden from humans, bots tend to fill it */}
                <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={update("website")}
                  />
                </div>

                <div className="mb-6">
                  <label className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      name="consent"
                      className="mt-1 h-5 w-5 shrink-0 rounded border-border text-primary focus:ring-primary"
                      checked={form.consent}
                      onChange={update("consent")}
                      disabled={status === "submitting"}
                      required
                    />
                    <span className="text-sm">
                      Ich bin einverstanden, dass House of Charts meine Angaben und
                      Unterlagen zur Bearbeitung meiner Bewerbung speichert und
                      verarbeitet. Details in der{" "}
                      <Link href="/privacy" className="text-primary underline" target="_blank">
                        Datenschutzerklärung
                      </Link>
                      . <span className="text-primary">*</span>
                    </span>
                  </label>
                  {errors.consent && (
                    <p className="mt-2 text-sm text-red-600">{errors.consent}</p>
                  )}
                </div>

                {status === "submitting" && (
                  <div className="mb-6">
                    <div className="h-2 w-full overflow-hidden rounded bg-white">
                      <div
                        className="h-2 bg-primary transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="mt-2 text-sm text-light">
                      {progress < 100 ? `Wird hochgeladen… ${progress}%` : "Wird gespeichert…"}
                    </p>
                  </div>
                )}

                {status === "error" && (
                  <div className="mb-6 rounded-[6px] border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {serverMessage ||
                      "Da ist leider etwas schiefgelaufen. Bitte versuchen Sie es später erneut"}
                    {apply_fallback_email && (
                      <>
                        {" "}
                        oder senden Sie Ihre Unterlagen direkt an{" "}
                        <a className="underline" href={`mailto:${apply_fallback_email}`}>
                          {apply_fallback_email}
                        </a>
                        .
                      </>
                    )}
                  </div>
                )}

                <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
                  <p className="text-sm text-light">
                    <span className="text-primary">*</span> Pflichtfelder
                  </p>
                  <button
                    type="submit"
                    className="btn btn-primary w-full sm:w-auto"
                    disabled={status === "submitting"}
                  >
                    {status === "submitting" ? "Wird gesendet…" : "Bewerbung absenden"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Apply;
