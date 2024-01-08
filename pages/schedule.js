import Layout from "../components/Layout/Layout";
import SeoHead from "../components/SeoHead";

export default function Schedule() {
 const handleMeetingWidgetLoad = () => {
   console.log('HubSpot Meeting Widget Loaded');
 };
  return (
    <>
      <SeoHead title='Schedule House of Charts - Demo' />
      <Layout>
      <div id="hs-meeting-widget"></div>
      <script src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"></script>
      <script>
        {`
          var options = {
            portalId: 'your_portal_id',
            formId: 'your_form_id',
            target: '#hs-meeting-widget',
            width: '100%',
            height: '100%',
            borderColor: '#ffffff',
            backgroundColor: '#ffffff',
            lang: 'en',
            onLoad: ${handleMeetingWidgetLoad}
          };
          window.HSBootstrap.loadMeetingWidget(options);
        `}
      </script>
      </Layout>
    </>
  );
}
