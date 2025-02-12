import {
  EarnedPointsBoxSm,
  EarnedPointsBoxSmBlack,
} from "@/common/EarnedPointsBox";
import EmojiTag from "@/common/EmojiTag";
import clsx from "clsx";
import dayjs from "dayjs";

const backgroundColors = {
  green: "bg-f-green-bg",
  yellow: "bg-f-yellow-bg",
  blue: "bg-f-blue-bg",
  pink: "bg-f-pink-bg",
};
const textColors = {
  green: "text-f-green-text",
  yellow: "text-f-yellow-text",
  blue: "text-f-blue-text",
  pink: "text-f-pink-text",
};

const StudyCard = ({ study, type = "browse", onClick }) => {
  const isImage = study.backgroundType === "image";
  const hasReactions = study.reactions && study.reactions.length > 0;

  // 이미지 배경인 경우, 그라데이션과 함께 배경 이미지 설정
  const backgroundStyle = isImage
    ? {
        backgroundImage: `linear-gradient(180deg, rgba(12, 12, 12, 0.4) 0%, rgba(12, 12, 12, 0.4) 90%), url(${study.backgroundContent})`,
        backgroundRepeat: "no-repeat",
      }
    : {};

  // 카드 사이즈 및 배경 관련 클래스들
  const typeStyle = type === "viewed" ? "md:min-w-[358px]" : "";
  const baseStyle =
    "bg-cover bg-center rounded-[20px] relative cursor-pointer transition-transform transform hover:-translate-y-1 hover:shadow-lg ease-in-out duration-300 flex flex-col justify-between";
  const mobileStyle = "h-[180px] min-w-[240px] p-[16px]";
  const tabletStyle = "md:h-[243px] md:p-[30px]";

  // 텍스트 색상 설정 (이미지 배경이면 흰색, 아니면 지정된 색상)
  const nameTextColor = isImage
    ? "text-[#ffffff]"
    : `${textColors[study.backgroundContent]}`;
  const titleTextColor = isImage ? "text-[#ffffff]" : "text-f-black";
  const infoTextColor = isImage ? "text-f-gray-100" : "text-f-black";
  const descriptionTextColor = isImage ? "text-[#ffffff]" : "text-f-black";

  const now = dayjs();
  const day = now.diff(dayjs(study.createdAt), "day") + 1;

  return (
    <div
      className={clsx(
        typeStyle,
        baseStyle,
        mobileStyle,
        tabletStyle,
        backgroundColors[study.backgroundContent] // 배경 색상 적용
      )}
      style={backgroundStyle}
      onClick={onClick}
    >
      <div>
        <div className="md:absolute md:right-[30px] mb-[6px]">
          {isImage ? (
            <EarnedPointsBoxSmBlack points={study.totalPoints} />
          ) : (
            <EarnedPointsBoxSm points={study.totalPoints} />
          )}
        </div>

        <div className="text-18pt font-bold mb-1 md:mb-2 md:flex md:flex-col md:items-start whitespace-nowrap overflow-hidden md:overflow-visible text-ellipsis">
          <span className="mb-1">
            <span className={`${nameTextColor}`}>{study.nickname}</span>
            <span className={`${titleTextColor}`}>의&nbsp;</span>
          </span>
          <span className={`${titleTextColor} md:line-clamp-1`}>
            {study.title}
          </span>
        </div>

        <span
          className={`text-[12px] md:text-[14px] ${infoTextColor} mb-[10px] md:mb-[30px] block`}
        >
          {day}일째 진행중
        </span>
      </div>

      <span
        className={`text-[14px] ${descriptionTextColor} md:text-16pt font-normal md:max-w-none leading-tight md:leading-snug lg:leading-normal line-clamp-1 md:line-clamp-2`}
      >
        {study.description}
      </span>

      {hasReactions ? (
        <div className="flex gap-1">
          {study.reactions.map((reaction) => (
            <EmojiTag
              key={reaction.id}
              emoji={reaction.emoji}
              count={reaction.counts}
              size={"xs"}
            />
          ))}
        </div>
      ) : (
        <div className={`text-[14px] ${infoTextColor} flex items-center`}>
          응원하러 가기! 👏🎈
        </div>
      )}
    </div>
  );
};

export default StudyCard;
