import Layout from "../components/Layout/Layout";
import SeoHead from "../components/SeoHead";
import Script from 'next/script';

export default function Schedule() {
 const handleMeetingWidgetLoad = () => {
   console.log('HubSpot Meeting Widget Loaded');
 };
  return (
    <>
      <SeoHead title='Schedule House of Charts - Demo' />
      <Layout>
      <div id="max-w-screen-xl mt-10 pt-80 px-8 xl:px-16 mx-auto">
         <div className="meetings-iframe-container" data-src="https://meetings-eu1.hubspot.com/sven-schuepbach?embed=true"></div>
         <Script src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js" strategy="beforeInteractive" />
       </div>
      </Layout>
    </>
  );
}
