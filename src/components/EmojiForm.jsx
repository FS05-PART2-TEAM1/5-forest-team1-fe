import EmojiTag from "@/common/EmojiTag";
import EmojiPicker from "emoji-picker-react";
import emojiCreateImg from "../assets/icons/emoji_create.png";
import plusImg from "../assets/icons/ic_plus.png";
import { useEffect, useState } from "react";
import { getReactions, patchReaction, postReaction } from "@/api/reactionApi";

function EmojiForm({ studyId }) {
  /*
  API 데이터를 가져온다 -
  useState 걸어서 emojis 같은 배열에 객체들을 저장한다. -
  전체 개수는 따로 구해서 (length-3) 해서 + 버튼에 숫자 표기해준다
  그 +버튼 누르면 emojis 배열에있는 전체 이모지와 각각의 count를 보여준다.

  이모지가 추가되면 emojis 배열에 이미 존재하면 count+1을 반영해준다.
  아니면 이모지, count:1 을 추가로 저장한다
  변경된 내용을 백엔드 서버로 전송한다.
  */
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
    };

    if (isChanged) fetchReactions();
  }, [isChanged]);

  const onShowAllClick = () => {
    if (isShowAll) {
      setIsShowAll(false);
    } else setIsShowAll(true);
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
      const patchData = { counts: isEmoji.counts + 1 };
      const reactionId = isEmoji.id;
      await patchReaction(studyId, reactionId, patchData);
    } else {
      const newEmoji = emojiData.emoji;
      await postReaction(studyId, newEmoji);
    }
    setIsChanged(true);
    setIsAddMod(false);
  };

  return (
    <div className="flex gap-4">
      <div className="flex gap-2">
        {emojis.map((element, index) => {
          if (index < 3)
            return <EmojiTag emoji={element.emoji} count={element.counts} />;
        })}
      </div>
      <div className="flex">
        <div className="lg:visible invisible cursor-pointer flex gap-1 p-2 rounded-[50px] items-center text-[14px] text-white bg-black opacity-30" onClick={onShowAllClick}>
          <img src={plusImg}/>
          {emojis.length - 3}..
        </div>
        {
          isShowAll &&
          <div className="lg:visible invisible pl-5 w-[242px] flex-wrap -translate-x-48 border p-4 gap-1 mt-10 absolute bg-white grid-cols-2 flex rounded-[20px]">
            {
              emojis.map((element, index) => {
                  return <EmojiTag emoji={element.emoji} count={element.counts} />;
              })
            }
          </div>
        }
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
          <div className="absolute mt-3">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </div>
    </div>
  );
}

export default EmojiForm;
