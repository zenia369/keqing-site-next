import Video from "@/components/pages/character/Video";
import Modal from "@/components/ui/modal/Modal";
import ModalLayout from "@/components/ui/modal/ModalLayout";
import { getCharacterVideos } from "@/services/characters.service";

import { CharacterPageProps } from "../../page";

export default async function Route({ params }: CharacterPageProps) {
  const data = await getCharacterVideos(params.character);

  if (!data?.videos.length) throw new Error(`Character didn't find by slug: ${params.character}`);

  return (
    <Modal>
      <ModalLayout>
        <Video videoUrl={data.videos.at(0)!.path} />
      </ModalLayout>
    </Modal>
  );
}
