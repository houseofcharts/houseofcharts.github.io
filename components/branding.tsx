import React from 'react';
import Logo from "./logo";

import Link from 'next/link';
import Image from 'next/image';

import MedFiles from "../public/assets/MedFiles.svg";

function Branding(props: any) {

    const textColor = 'black';



    return (
        <div className={`flex title-font font-medium items-center text-${textColor} mb-4 md:mb-0`}>
            <MedFiles className="h-16 w-16" />
            <div className="ml-3 text-xl">House of Charts</div>
        </div>
    )

    return (
        <Link href={""} className={`flex title-font font-medium items-center text-${textColor} mb-4 md:mb-0`}>
            <Image src="/ace-branding.png" alt="Branding Image" width={200} height={50} />
        </Link>
    )
}

export default Branding;