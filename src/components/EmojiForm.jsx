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


  useEffect(() => {
    const fetchReactions = async () => {
      const data = await getReactions(studyId);
      setEmojis(data.reactionList);
      setIsChanged(false);
    };
    if (isChanged) fetchReactions();
  }, [isChanged]);

  const onShowAllClick = () => {
    setIsShowAll(!isShowAll);
  };

  const onEmojiTagClick = useDebounceCallback(async (emoji) => {
    const findEmoji = emojis.find((element) => element.emoji === emoji);
    await patchReaction(studyId, findEmoji.id, { counts: 1 });
    setIsChanged(true);
  }, 200);

  const onEmojiClick = async (emojiData) => {
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
  };

  useEffect(() => {
    if (isChanged) {
      const sortedEmojis = [...emojis].sort((a, b) => b.counts - a.counts);
      setEmojis(sortedEmojis);
      setIsChanged(false);
    }
  }, [isChanged]);

  return (
    <div className="flex gap-4">
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
      <div className="flex">
        {emojis.length > 3 && (
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
        {isShowAll && (
          <div
            className="lg:visible invisible pl-5 -translate-x-52 border p-4 gap-1 mt-12 absolute bg-white grid grid-cols-4 place-items-center rounded-[20px] "
          >
            {emojis.map((element, index) => {
              return (
                <div
                  className="h-10 flex items-center cursor-pointer "
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
        <div
          className="border flex lg:w-[70px] md:w-[65px] h-8 text-16pt gap-2 items-center lg:p-1 p-1 rounded-[50px] cursor-pointer"
          onClick={() => setIsAddMod(!isAddMod)}
        >
          <img src={emojiCreateImg} />
          <div className="md:text-sm lg:text-lg">추가</div>
        </div>
        {isAddMod && (
          <div className="absolute mt-3 md:translate-x-0 -translate-x-48">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </div>
    </div>
  );
}

export default EmojiForm;
