import EmojiTag from "@/common/EmojiTag";
import EmojiPicker from "emoji-picker-react";
import emojiCreateImg from "../assets/icons/emoji_create.png";
import plusImg from "../assets/icons/ic_plus.png";
import { useEffect, useState } from "react";
import { getReactions, patchReaction, postReaction } from "@/api/reactionApi";

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
    if (isShowAll) {
      setIsShowAll(false);
    } else setIsShowAll(true);
  };

  const onEmojiTagClick = async (emoji) => {
    const findEmoji = emojis.find((element) => element.emoji === emoji);
    setEmojis(
      emojis.map((element) => {
        if (element.emoji === emoji)
          return { ...element, counts: element.counts + 1 };
        else return element;
      })
    );
    await patchReaction(studyId, findEmoji.id, { counts: 1 });
    setIsChanged(true);
  };

  const onEmojiClick = async (emojiData) => {
    const isEmoji = emojis.find((element) => emojiData.emoji === element.emoji);
    if (isEmoji) {
      setEmojis(
        emojis.map((element) => {
          return emojiData.emoji === element.emoji
            ? { ...element, counts: element.counts + 1 }
            : element;
        })
      );
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
              className="cursor-pointer flex gap-1 p-2 rounded-[50px] items-center text-[14px] text-white bg-black opacity-30"
              onClick={onShowAllClick}
            >
              <img src={plusImg} />
              {emojis.length - 3}..
            </div>
          </div>
        )}
        {isShowAll && (
          <div className="lg:visible invisible pl-5 w-[250px] -translate-x-48 border p-4 gap-1 mt-12 absolute bg-white grid grid-cols-3 place-items-center rounded-[20px] ">
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
          className="border flex w-[75px] text-16pt gap-2 items-center p-2 rounded-[50px] cursor-pointer"
          onClick={() => setIsAddMod(!isAddMod)}
        >
          <img src={emojiCreateImg} />
          <div>추가</div>
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
