import React from "react";

const EmojiTag = ({ emoji, count, size = "sm" }) => {
  //부모컴포넌트에서 렌더링시킬때 이모지태그 사이즈 조정 ex. <EmojiTag size="md" />

  const emojiSizeClasses = {
    sm: "text-16pt",
    md: "text-[18px]",
  };

  const textSizeClasses = {
    sm: "text-[12px]",
    md: "text-[16px]",
  };

  return (
    <div className="flex items-center gap-1 px-2 py-1 bg-f-gray-500 bg-opacity-40 rounded-full">
      <span className={`${emojiSizeClasses[size]}`}>{emoji}</span>
      <span className={`${textSizeClasses[size]} text-white`}>{count}</span>
    </div>
  );
};

export default EmojiTag;
