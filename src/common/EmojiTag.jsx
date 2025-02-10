import clsx from "clsx";
import React from "react";

const EmojiTag = ({ emoji, count, size }) => {
  return (
    <div
      className={clsx(
        "flex items-center gap-1 px-2 py-1 bg-f-black bg-opacity-40 rounded-full",
        {
          ["text-xs"]: size === "xs",
          ["text-base"]: size === "base",
        }
      )}
    >
      <span>{emoji}</span>
      <span className="text-white">{count}</span>
    </div>
  );
};

export default EmojiTag;
