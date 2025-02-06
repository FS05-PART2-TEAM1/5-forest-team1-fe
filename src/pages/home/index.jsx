import StudyCard from "@/components/StudyCard";

const STUDY = [
  {
    id: "70c8c2ef-dca8-4667-924c-140cd339712b",
    nickname: "새하",
    title: "웹 보안 스터디",
    description:
      "웹 보안과 관련된 개념을 학습합니다.웹 보안과 관련된 개념을웹 보안과 관련된 개념을웹 보안과 관련된 개념을 ",
    backgroundType: "image",
    backgroundContent: `https://picsum.photos/200/200`,
    points: 180,
    createdAt: "2024-03-30T00:00:00.000Z",
    updatedAt: "2025-01-30T08:42:58.828Z",
    reactions: [
      {
        id: "dc77b00b-795d-4490-8679-8eff574027be",
        studyId: "cf38c6d9-686a-44de-8490-2a2ffa1bcba1",
        emoji: "👍",
        counts: 5,
        createdAt: "2025-01-31T15:22:05.752Z",
        updatedAt: "2025-01-31T15:22:05.752Z",
      },
      {
        id: "7d702831-04e5-4937-910c-029adb385eb5",
        studyId: "cf38c6d9-686a-44de-8490-2a2ffa1bcba1",
        emoji: "🔥",
        counts: 3,
        createdAt: "2025-01-31T15:22:05.754Z",
        updatedAt: "2025-01-31T15:22:05.754Z",
      },
    ],
  },
  {
    id: "70c8c2ef-dca8-4667-924c-140cd339712b",
    nickname: "새하",
    title: "웹 보안 스터디",
    description: "웹 보안과 관련된 개념을 학습합니다.",
    backgroundType: "color",
    backgroundContent: "green",
    points: 180,
    createdAt: "2024-03-30T00:00:00.000Z",
    updatedAt: "2025-01-30T08:42:58.828Z",
    reactions: [],
  },
];
function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold">스터디 목록 - 정한샘</h1>
      <div className="max-w-[1200px] px-[38px]">
        최근 조회한 스터디
        <div className="flex gap-[16px] md:gap-[24px] overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <StudyCard study={STUDY[0]} type={"viewed"}></StudyCard>
          <StudyCard study={STUDY[0]} type={"viewed"}></StudyCard>
          <StudyCard study={STUDY[0]} type={"viewed"}></StudyCard>
        </div>
      </div>
      <div className="max-w-[1200px] px-[38px]">
        스터디 둘러보기
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-[16px] md:gap-[24px]">
          <StudyCard study={STUDY[0]}></StudyCard>
          <StudyCard study={STUDY[0]}></StudyCard>
          <StudyCard study={STUDY[1]}></StudyCard>
          <StudyCard study={STUDY[1]}></StudyCard>
          <StudyCard study={STUDY[0]}></StudyCard>
          <StudyCard study={STUDY[0]}></StudyCard>
        </div>
      </div>
    </div>
  );
}

export default Home;
