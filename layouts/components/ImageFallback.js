/* eslint-disable jsx-a11y/alt-text */
//BACK_TO_FULLSTACK: UNCOMMENT & img -> Image in jsx below
//import Image from "next/image";
// And comment this + remove the conditional below
const isProd = process.env.NODE_ENV === 'production';


import { useEffect, useState } from "react";

const ImageFallback = (props) => {
  const { src, fallback, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <img
      {...rest}
      src={isProd ? '/houseofcharts.github.io/' + imgSrc : '' + imgSrc}
      onError={() => {
        setImgSrc(fallback);
      }}
    />
  );
};

export default ImageFallback;
