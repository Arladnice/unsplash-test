"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import closeIcon from "../public/icons/Close.svg";

const ButtonCloseModal = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.back()}
      className="absolute top-6 right-6 cursor-pointer bg-white rounded-full p-1 hover:bg-slate-200 active:bg-slate-300 transition-colors"
    >
      <Image src={closeIcon} width={24} height={24} alt="close icon" />
    </div>
  );
};

export default ButtonCloseModal;
