// components/cookiebanner.tsx

'use client';

import Link from 'next/link'

import { getLocalStorage, setLocalStorage } from '../../lib/storageHelper';
import { useEffect, useState } from 'react';

export default function CookieBanner() {

    const [cookieConsent, setCookieConsent] = useState(null);
    const [showBanner, setShowBanner] = useState(true);
    //const [storedCookieConsent, setStoredCookieConsent] = useState(false);

    const textColor = 'gray-900';

    useEffect(() => {
        // Get Cookie Consent value saved in storage
        // if it is unavailable, set to true.
        //const storedCookieConsent = getLocalStorage('cookie_consent', null);
        const storedCookieConsent = getLocalStorage('cookie_consent', true);
        const storedShowBanner = getLocalStorage('cookie_consent', null);

        //setCookieConsent(storedCookieConsent);
        setShowBanner(storedShowBanner);
    }, [setCookieConsent]);


    useEffect(() => {
        const newValue = cookieConsent ? 'granted' : 'denied'

        window.gtag("consent", "update", {
            "analytics_storage": newValue
        });

        //setLocalStorage('cookie_consent', cookieConsent)

        // For testing
        //console.log("Cookie Consent: ", cookieConsent)
    })

    const decline = () => {
        setCookieConsent(false);
        setLocalStorage('cookie_consent', false);
        setShowBanner(false);
    }

    const accept = () => {
        setCookieConsent(true);
        setLocalStorage('cookie_consent', true);
        setShowBanner(false);
    }

    return (
        <div className={`my-2 mx-auto max-w-max md:max-w-screen-sm
                        fixed bottom-0 left-0 right-0 
                        ${showBanner != null ? "hidden" : "flex"} px-3 md:px-4 py-3 justify-between items-center flex-col sm:flex-row gap-4  
                         bg-white rounded-lg shadow`}>

            <div className='text-center'>
                <Link href="/info/cookies"><p>We use <span className='font-bold text-sky-400'>cookies</span> on our site.</p></Link>
            </div>


            <div className='flex gap-2'>
                
                <button className={`px-5 py-2 text-${textColor} rounded-md border-gray-900`} onClick={decline}>Decline</button>
                <button className={`btn btn-primary px-5 py-2 text-${textColor} rounded-lg`} onClick={accept}>Allow Cookies</button>
            </div>
        </div>
    )
}