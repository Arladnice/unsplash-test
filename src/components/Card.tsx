import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface ICardProps {
  photo: {
    id: string;
    urls: {
      regular: string;
      small: string;
    };
    alt_description: string;
  };
  index: number;
}

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: { opacity: 1 },
};

const Card: FC<ICardProps> = ({ photo }) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: 0.2,
        ease: "easeInOut",
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
      key={photo.id}
      className="shadow-xl rounded-md"
    >
      <Link href={`/photo/${photo.id}`} rel="preload">
        <Image
          src={photo.urls.regular}
          width={600}
          height={600}
          placeholder="blur"
          blurDataURL={photo.urls.small}
          alt={photo.alt_description}
          className="h-80 object-cover rounded-md"
        />
      </Link>
    </motion.div>
  );
};

export default Card;
