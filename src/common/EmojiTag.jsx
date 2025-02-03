import React from "react";

const EmojiTag = ({ emojis }) => {
  return (
    <div className="relative">
      <div className=" inline-flex h-6  rounded-full items-center gap-2 ">
        {emojis.map((e, index) => (
          <div
            key={index}
            className="flex items-center gap-1 bg-f-gray-500 px-2 py-1 rounded-full"
          >
            <span>{e.emoji}</span>
            <span className="text-sm text-f-black">{e.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmojiTag;
