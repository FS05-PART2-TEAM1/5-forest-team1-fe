import {
  EarnedPointsBoxSm,
  EarnedPointsBoxSmBlack,
} from "@/common/EarnedPointsBox";
import EmojiTag from "@/common/EmojiTag";
import clsx from "clsx";

const backgroundColors = {
  green: "bg-f-green-bg",
  yellow: "bg-f-yellow-bg",
  blue: "bg-f-blue-blue",
  pink: "bg-f-pink-bg",
};

const StudyCard = ({ study, type = "browse" }) => {
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
    "bg-cover bg-center rounded-[20px] relative cursor-pointer transition-transform transform hover:-translate-y-1 hover:shadow-lg ease-in-out duration-300";
  const mobileStyle = "min-w-[240px] min-h-[180px] p-[16px]";
  const tabletStyle = "md:min-h-[243px] md:p-[30px]";

  // 텍스트 색상 설정 (이미지 배경이면 흰색, 아니면 지정된 색상)
  const nameTextColor = isImage
    ? "text-[#ffffff]"
    : `text-f-${study.backgroundContent}-text`;
  const titleTextColor = isImage ? "text-[#ffffff]" : "text-f-black";
  const infoTextColor = isImage ? "text-f-gray-100" : "text-f-black";
  const descriptionTextColor = isImage ? "text-[#ffffff]" : "text-f-black";

  const now = new Date();
  const studyCreatedAt = new Date(study.createdAt);
  const day = Math.ceil((now - studyCreatedAt) / (1000 * 60 * 60 * 24));

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
    >
      <div className="md:absolute md:right-[30px] mb-[6px]">
        {isImage ? (
          <EarnedPointsBoxSmBlack points={study.points} />
        ) : (
          <EarnedPointsBoxSm points={study.points} />
        )}
      </div>

      <div className="text-18pt h-[26px] font-bold flex items-center md:mb-[10px]">
        <span className={nameTextColor}>{study.nickname}</span>
        <span className={titleTextColor}>의 {study.title}</span>
      </div>

      <span
        className={`text-[12px] md:text-[14px] ${infoTextColor} mb-[10px] md:mb-[30px] block`}
      >
        {day}일째 진행중
      </span>

      <span
        className={`text-[14px] ${descriptionTextColor} md:text-16pt font-normal max-w-[208px] md:max-w-none leading-tight md:leading-snug lg:leading-normal block`}
      >
        {study.description}
      </span>

      {hasReactions ? (
        <div className="flex absolute gap-1 bottom-[16px] md:bottom-[30px]">
          {study.reactions.map((reaction) => (
            <EmojiTag
              key={reaction.id}
              emoji={reaction.emoji}
              count={reaction.counts}
            />
          ))}
        </div>
      ) : (
        <div
          className={`absolute bottom-[16px] md:bottom-[30px] text-[14px] ${infoTextColor} flex items-center`}
        >
          응원하러 가기! 👏🎈
        </div>
      )}
    </div>
  );
};

export default StudyCard;
