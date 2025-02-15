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
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        layout="fill"
        objectFit="cover"
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${Buffer.from(
          `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="#cccccc"/></svg>`,
        ).toString("base64")}`}
      />
    </div>
  )
}

  
