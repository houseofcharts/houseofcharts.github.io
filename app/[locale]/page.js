import Home7 from "./(homes)/home-7/page";
export const metadata = {
  title:
    "Home || House of Charts",
  description:
    "House of Charts – Die smarte KI-Lösung für schnelle und präzise klinische Dokumentation",
};
export default function HomePage1({ params }) {
  return (
    <>
      <Home7 params={params} />
    </>
  );
}
