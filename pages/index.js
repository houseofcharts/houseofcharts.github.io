import Features from "../components/Features";
import Pricing from "../components/Pricing";
import Hero from "../components/Hero";
import Layout from "../components/Layout/Layout";
import SeoHead from "../components/SeoHead";

export default function Home() {
  return (
    <>
      <SeoHead title='House of Charts' />
      <Layout>
        <Hero />
        <Features />
        <Pricing />
      </Layout>
    </>
  );
}
