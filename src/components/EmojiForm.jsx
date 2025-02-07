import EmojiTag from "@/common/EmojiTag";
import EmojiPicker from "emoji-picker-react";
import emojiCreateImg from "../assets/icons/emoji_create.png";
import { useState } from "react";

function EmojiForm({ reactions = [] }) {
  /*
  API 데이터를 가져온다
  useState 걸어서 emojis 같은 배열에 객체들을 저장한다.
  전체 개수는 따로 구해서 (length-3) 해서 + 버튼에 숫자 표기해준다
  그 +버튼 누르면 emojis 배열에있는 전체 이모지와 각각의 count를 보여준다.
  만약 이모지 추가가 발생하면 emojis 에서 검색(find)을해서 이미 존재하는 이모지면 id랑 기존count+1해서 보내고
  아니면 이모지 정보만 전송한다.
  그리고 다시 API 데이터를 emojis에 가져온다.
  */
  const [emojis, setEmojis] = useState([]);
  const [isAddMod, setIsAddMod] = useState(false);

  const onEmojiClick = (emojiData) => {
    setIsAddMod(false);
  };
  return (
    <div className="flex gap-4">
      <div className="flex gap-2">
        {reactions.map((reaction) => {
          return <EmojiTag emoji={reaction.emoji} count={reaction.counts} />;
        })}
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
