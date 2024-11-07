"use client";

import { useRouter } from "next/navigation";
import { FC } from "react";

import Button from "./Button";

interface VideoProps {
  videoUrl: string;
}

const Video: FC<VideoProps> = ({ videoUrl }) => {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-white rounded flex items-start gap-2 p-3 h-3/5">
        <video src={videoUrl} controls className="rounded h-full" data-testid="video" />
        <Button onClick={handleBack}>Закрити</Button>
      </div>
    </div>
  );
};

export default Video;
