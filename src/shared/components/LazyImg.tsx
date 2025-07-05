import React from 'react'

interface LazyImgProps {
  src: string,
  smallImg: string,
  style?: React.CSSProperties,
  className?: string,
  alt: string,
  rest?: React.ImgHTMLAttributes<HTMLImageElement>
}

function LazyImg({src, smallImg, style, className, ...rest}: LazyImgProps) {
  return (
    <img
      {...rest}
      src={src}
      style={{backgroundImage: `url(${smallImg})`, ...style}}
      className={`bg-cover bg-center object-center object-cover aspect-square ${className}`}
      loading="lazy"
    /> 
  )
}

export default LazyImg
