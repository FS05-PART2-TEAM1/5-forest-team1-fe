import EmojiTag from "@/common/EmojiTag";
import EmojiPicker from "emoji-picker-react";
import emojiCreateImg from "../assets/icons/emoji_create.png";
import plusImg from "../assets/icons/ic_plus.png";
import { useEffect, useRef, useState } from "react";
import { getReactions, patchReaction, postReaction } from "@/api/reactionApi";
import useDebounceCallback from "@/hooks/useDebounceCallback";

function EmojiForm({ studyId }) {
  const [emojis, setEmojis] = useState([]);
  const [isAddMod, setIsAddMod] = useState(false);
  const [isShowAll, setIsShowAll] = useState(false);
  const [isChanged, setIsChanged] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReactions = async () => {
      const data = await getReactions(studyId);
      setEmojis(data.reactionList);
      setIsChanged(false);
      setTimeout(() => {
        setIsLoading(false);
      }, 600);
    };
    if (isChanged) fetchReactions();
  }, [isChanged]);

  const onShowAllClick = () => {
    setIsShowAll(!isShowAll);
  };

  const onEmojiTagClick = useDebounceCallback(async (emoji) => {
    setIsLoading(true);
    const findEmoji = emojis.find((element) => element.emoji === emoji);
    await patchReaction(studyId, findEmoji.id, { counts: 1 });
    setIsChanged(true);
  }, 200);

  const onEmojiClick = useDebounceCallback(async (emojiData) => {
    const isEmoji = emojis.find((element) => emojiData.emoji === element.emoji);
    if (isEmoji) {
      const patchData = { counts: 1 };
      const reactionId = isEmoji.id;
      await patchReaction(studyId, reactionId, patchData);
    } else {
      const newEmoji = emojiData.emoji;
      await postReaction(studyId, newEmoji);
    }
    setIsChanged(true);
    setIsAddMod(false);
  }, 200);

  useEffect(() => {
    if (isChanged) {
      const sortedEmojis = [...emojis].sort((a, b) => b.counts - a.counts);
      setEmojis(sortedEmojis);
      setIsChanged(false);
    }
  }, [isChanged]);

  return (
    <div className="flex gap-4">
      {!isLoading ? (
        <div className="flex gap-1">
          {emojis.map((element, index) => {
            if (index < 3)
              return (
                <div
                  className="cursor-pointer"
                  key={index}
                  onClick={() => onEmojiTagClick(element.emoji)}
                >
                  <EmojiTag
                    emoji={element.emoji}
                    count={element.counts}
                    size={"base"}
                  />
                </div>
              );
          })}
        </div>
      ) : (
        <div className="flex gap-1 animate-pulse bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400 bg-[length:200%_100%] bg-clip-text text-transparent">
          <div className="flex items-center gap-1 px-2 py-1 bg-f-black bg-opacity-40 rounded-full h-[31px] w-[56px]"></div>
          <div className="flex items-center gap-1 px-2 py-1 bg-f-black bg-opacity-40 rounded-full h-[31px] w-[56px]"></div>
          <div className="flex items-center gap-1 px-2 py-1 bg-f-black bg-opacity-40 rounded-full h-[31px] w-[56px]"></div>
          <div className="flex items-center gap-1 px-2 py-1 bg-f-black bg-opacity-40 rounded-full h-[31px] w-[45px] ml-4"></div>
          <div className="flex items-center gap-1 px-2 py-1 bg-f-black bg-opacity-40 rounded-full h-[31px] w-[65px] ml-4"></div>
        </div>
      )}

      <div className="flex">
        {emojis.length > 3 && !isLoading && (
          <div className="lg:block hidden">
            <div
              className="cursor-pointer flex gap-1 p-2 h-8 rounded-[50px] items-center text-[14px] text-white bg-black opacity-20"
              onClick={onShowAllClick}
            >
              <img src={plusImg} />
              {emojis.length - 3}..
            </div>
          </div>
        )}
        {isShowAll && !isLoading && (
          <div className="lg:visible invisible pl-5 -translate-x-52 border p-4 gap-1 mt-12 absolute bg-white grid grid-cols-4 place-items-center rounded-[20px] ">
            {emojis.map((element, index) => {
              return (
                <div
                  className="h-10 flex items-center cursor-pointer"
                  draggable="false"
                  onClick={() => onEmojiTagClick(element.emoji)}
                >
                  <EmojiTag
                    emoji={element.emoji}
                    count={element.counts}
                    size={"base"}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div>
        {!isLoading && (
          <>
            <div className={emojis.length === 0 && "relative right-8"}>
              <div
                className="border flex lg:w-[70px] md:w-[65px] h-8 text-16pt gap-2 items-center lg:p-1 p-1 rounded-[50px] cursor-pointer"
                onClick={() => setIsAddMod(!isAddMod)}
              >
                <img src={emojiCreateImg} />
                <div className="md:text-sm lg:text-lg">추가</div>
              </div>
              {isAddMod && (
                <div className="absolute mt-3 md:translate-x-0 -translate-x-48 z-20">
                  <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default EmojiForm;
