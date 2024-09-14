import { FC } from "react";

interface DescriptionProps {
  description: string;
}

const Description: FC<DescriptionProps> = ({ description }) => {
  return (
    <div className="w-8/12 p-4 mt-4 relative pl-7">
      <span className="character-description absolute w-12 h-12 top-0 left-0 bg-purple-200" />
      <span className="character-description absolute w-12 h-12 bottom-0 right-0 bg-purple-200 rotate-180" />
      <p className="text-2xl font-normal text-black underline">Зовнішність</p>
      <p className="mt-3 text-xl">{description}</p>
    </div>
  );
};

export default Description;
