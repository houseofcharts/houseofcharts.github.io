"use client"

import "../styles/tailwind.css";
import "../styles/slick.css";

function MyApp({ Component, pageProps }) {
 return (
   <>
     <Component {...pageProps} />
     <script async src="https://www.googletagmanager.com/gtag/js?id=G-6E0YPCK1XW"></script>
     <script dangerouslySetInnerHTML={{__html: `
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', 'G-6E0YPCK1XW');
     `}}></script>
     <script dangerouslySetInnerHTML={{__html: `
       (function(c,l,a,r,i,t,y){
         c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
         t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
         y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
       })(window, document, "clarity", "script", "kfjw8zl9e1");
     `}}></script>
   </>
 );
}

export default MyApp;