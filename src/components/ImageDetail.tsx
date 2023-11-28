import { Photo } from "@/lib/types";
import Image from "next/image";
import { FC } from "react";

interface ImageDetailProps {
  photo: Photo;
}
const ImageDetail: FC<ImageDetailProps> = ({ photo }) => {
  return (
    <div>
      <Image
        placeholder="blur"
        blurDataURL={photo.urls.small}
        src={photo.urls.regular}
        width={768}
        height={760}
        alt={photo.alt_description}
        className="object-cover mx-auto"
      />
    </div>
  );
};

export default ImageDetail;
