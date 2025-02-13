import Image from "next/image"

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
}

export default function OptimizedImage({ src, alt, width, height }: OptimizedImageProps) {
  return (
    <div className="relative" style={{ width, height }}>
      <Image src={src || "/placeholder.svg"} alt={alt} layout="fill" objectFit="cover" />
    </div>
  )
}

  
