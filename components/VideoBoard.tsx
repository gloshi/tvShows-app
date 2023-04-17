import useBillboard from "@/hooks/useBillboard";
import React, { useCallback } from "react";
import {AiOutlineInfoCircle} from 'react-icons/ai'
import PlayBtn from "./PlayBtn";
import useDesc from "@/hooks/UseDesc";

const VideoBoard = () => {
  const { data } = useBillboard();
  const {openModal} = useDesc()

  const hadleOpenModal = useCallback(() => {
    openModal(data?.id)
  },[data,openModal])

  return (
    <div className="relative h-[56.25vw]">
      <video
        poster={data?.thumbnailUrl}
        className="w-full h-[56.25vw] object-cover brightness-[60%] transition duration-500"
        autoPlay
        muted
        loop
        src={data?.videoUrl}
      ></video>
      <div className="absolute top-[30%] md:top-[40%] ml-4 md:ml-16">
      <p className="text-white text-1xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
          {data?.title}
        </p>
        <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
          {data?.description}
        </p>
        <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
          <PlayBtn movieId={data?.id}/>
        <button
            onClick={hadleOpenModal}
            className="
            bg-white
            text-white
              bg-opacity-30 
              rounded-md 
              py-1 md:py-2 
              px-2 md:px-4
              w-auto 
              text-xs lg:text-lg 
              font-semibold
              flex
              flex-row
              items-center
              hover:bg-opacity-20
              transition
            "
            >
                <AiOutlineInfoCircle  className="mr-1"/>
                Описание
        </button>
        </div>
      </div>
    </div>
  );
};

export default VideoBoard;
