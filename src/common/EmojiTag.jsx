import React from "react";

const EmojiTag = ({ emoji, count }) => {
  return (
    <div className="flex items-center gap-1 px-2 py-1 bg-f-black bg-opacity-40 rounded-full md:text-sm lg:text-lg">
      <span>{emoji}</span>
      <span className="text-white">{count}</span>
    </div>
  );
};

export default EmojiTag;
