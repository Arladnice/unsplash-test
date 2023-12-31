import ButtonCloseModal from "@/components/ButtonCloseModal";
import ImageDetail from "@/components/ImageDetail";
import { Photo } from "@/lib/types";
import { getPhoto } from "@/lib/unsplash";
import { FC } from "react";

interface ModalDetailPageProps {
  params: {
    id: string;
  };
}
const ModalDetailPage: FC<ModalDetailPageProps> = async ({ params }) => {
  const response = await getPhoto(params.id);
  const photo = (await response.json()) as Photo;

  return (
    <div className="fixed inset-0 bg-zinc-900/20 z-10">
      <div className="flex max-[450px]:items-start items-center h-full max-w-3xl mx-auto">
        <div className="w-full">
          <ButtonCloseModal />
          <ImageDetail photo={photo} />
        </div>
      </div>
    </div>
  );
};

export default ModalDetailPage;
