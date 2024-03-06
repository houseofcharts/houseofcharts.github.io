//https://gaudion.dev/blog/setup-google-analytics-with-gdpr-compliant-cookie-consent-in-nextjs13
export const pageView = (GA_MEASUREMENT_ID: string, url: string) => {
    window.gtag('config', GA_MEASUREMENT_ID, {
        page_path: url,
    });
}