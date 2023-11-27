import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

interface ICardProps {
  photo: {
    id: string;
    urls: {
      regular: string;
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

const Card: FC<ICardProps> = ({ photo, index }) => {
  console.log(photo.id);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        delay: index * 0.1,
        ease: "easeInOut",
        duration: 0.5,
      }}
      viewport={{ amount: 0 }}
      key={photo.id}
      className="shadow-xl rounded-md"
    >
      <Link href={`/photo/${photo.id}`} rel="preload" as="image">
        <Image
          src={photo.urls.regular}
          width={600}
          height={600}
          alt={photo.alt_description}
          className="h-80 object-cover rounded-md"
        />
      </Link>
    </motion.div>
  );
};

export default Card;
