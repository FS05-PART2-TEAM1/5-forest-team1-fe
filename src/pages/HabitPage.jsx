import React, { useState, useEffect } from "react";
import { Header } from "@/common/layout/Header";
import { Link, useLocation } from "react-router-dom";
import HabitListModal from "../common/modal/HabitListModal";
import habitApi from "@/api/habitApi";
import { startOfWeek, endOfWeek } from "date-fns";
import arrowImg from "../assets/icons/ic_arrow.png";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import con from "../assets/animations/Animation - 1739412951712.gif";
import congtb from "../assets/animations/Celebrate In Love GIF by Max.gif";

const TimeBox = () => {
  const [currentTime, setCurrentTime] = useState(getFormattedTime());

  function getFormattedTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "오후" : "오전";

    hours = hours % 12 || 12;

    return `${year}-${month}-${day} ${ampm} ${hours}:${minutes}`;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(getFormattedTime());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-gray-400 px-2 py-1 rounded-[50px] text-[#000000] text-[16px] text-center w-[200px] font-pretendard font-medium">
      {currentTime}
    </div>
  );
};

function HabitPage() {
  const location = useLocation();
  const [studyData, setStudyData] = useState(location.state?.studyData || null);
  const [title, setTitle] = useState(studyData?.title || "");
  const [nickname, setNickname] = useState(studyData?.nickname || "");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habits, setHabits] = useState([]);
  const [selectedHabits, setSelectedHabits] = useState([]);
  const [originalHabits, setOriginalHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const maxHabitCount = 8;
  const [isAllCompleted, setIsAllCompleted] = useState(false);
  const { width, height } = useWindowSize();
  const [habitCelebrations, setHabitCelebrations] = useState({});
  const [disabledHabits, setDisabledHabits] = useState({});

  useEffect(() => {
    async function fetchStudyData() {
      if (!studyData) {
        const studyId = new URLSearchParams(location.search).get("studyId");
        if (studyId) {
          const fetchedStudyData = await habitApi.getStudy(studyId);
          setStudyData(fetchedStudyData);
        }
      }
    }
    fetchStudyData();
  }, [location, studyData]);

  useEffect(() => {
    async function fetchHabits() {
      if (!studyData?.id) return;

      try {
        const today = new Date();
        const weekStart = startOfWeek(today, { weekStartsOn: 1 });
        const weekEnd = endOfWeek(today, { weekStartsOn: 1 });

        const habitData = await habitApi.getHabits(
          studyData.id,
          weekStart,
          weekEnd
        );

        const activeHabits = habitData.habitList.filter(
          (habit) => !habit.deletedAt
        );

        setHabits(activeHabits);
        setOriginalHabits(activeHabits);

        // ✅ 오늘 날짜 기준으로 체크된 것만 상태 반영하도록 변경
        const todayString = today.toISOString().split("T")[0];

        const completedHabitIds = activeHabits
          .filter((habit) =>
            habit.dailyHabitCheck?.some((check) => {
              const checkDateString = check.date.split("T")[0];
              return checkDateString === todayString && check.status === true;
            })
          )
          .map((habit) => habit.id);

        setSelectedHabits(completedHabitIds);

        const initialCelebrations = {};
        completedHabitIds.forEach((id) => {
          initialCelebrations[id] = true;
        });
        setHabitCelebrations(initialCelebrations);
      } catch (error) {
        console.error("❌ [습관 데이터 불러오기 오류]:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHabits();
  }, [studyData]);

  const openModal = () => {
    console.log("[현재 originalHabits]:", originalHabits);
    setIsModalOpen(true);
  };

  const onSave = async (updatedHabits) => {
    const formattedHabits = updatedHabits.map((habit) => ({
      id: habit.id || null,
      name: habit.name || "",
      studyId: studyData.id,
      deletedAt: habit.deletedAt || null,
    }));

    try {
      await habitApi.updateHabits(studyData.id, formattedHabits);
      const updatedList = await habitApi.getHabitsList(studyData.id);
      setHabits(updatedList.filter((h) => !h.deletedAt));
      setOriginalHabits(updatedList);
      setIsModalOpen(false);
    } catch (error) {
      console.error("🚨 습관 저장 중 오류 발생:", error);
    }
  };
  const onAddHabit = () => {
    if (habits.length < maxHabitCount) {
      const newHabitName = prompt("새로운 습관을 입력하세요:");

      if (newHabitName) {
        if (newHabitName.length > 20) {
          alert("습관 이름은 최대 20글자 입니다.");
          return;
        }
        const newHabit = { id: null, name: newHabitName, deletedAt: null };
        setHabits([...habits, newHabit]);
      }
    } else {
      alert("습관은 최대 8개까지만 추가할 수 있습니다.");
    }
  };
  const onRemoveHabit = (index) => {
    setEditableHabits((prevEditable) =>
      prevEditable.filter((_, i) => i !== index)
    );
  };

  const onToggleHabit = async (habitId) => {
    const studyId = studyData.id;
    const isCompleted = !selectedHabits.includes(habitId);

    const updatedSelectedHabits = isCompleted
      ? [...selectedHabits, habitId]
      : selectedHabits.filter((id) => id !== habitId);

    setSelectedHabits(updatedSelectedHabits);

    if (isCompleted) {
      setDisabledHabits((prev) => ({
        ...prev,
        [habitId]: true,
      }));

      setHabitCelebrations((prev) => ({
        ...prev,
        [habitId]: true,
      }));

      setTimeout(() => {
        setDisabledHabits((prev) => ({
          ...prev,
          [habitId]: false,
        }));
      }, 3000);
    } else {
      setHabitCelebrations((prev) => ({
        ...prev,
        [habitId]: false,
      }));
    }

    if (updatedSelectedHabits.length === habits.length) {
      setIsAllCompleted(true);
      setTimeout(() => setIsAllCompleted(false), 5000);
    }

    try {
      await habitApi.toggleHabitCompletion(studyId, habitId, isCompleted);
    } catch (error) {
      console.error("❌ [습관 완료 상태 변경 실패]:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-[#F6F4EF]">
        <Header />
        <main className="p-[20px] sm:p-[20px_24px] md:p-[20px_24px]">
          <div className="bg-white rounded-[20px] shadow p-4 md:p-6 lg:p-10 min-[1200px]:w-[1150px] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start mb-4">
              <h2 className="text-[24px] font-extrabold mb-4 md:text-[32px] weight-800 ">
                {nickname && title
                  ? `${nickname} 의 ${title}`
                  : "스터디 정보 없음"}
              </h2>
              <div className="flex gap-4 items-center">
                <Link to="/focus" state={{ studyData }}>
                  <button className="border py-2 px-2 md:py-3 md:pl-6 md:pr-5 rounded-[15px] text-[#818181] w-[120px] md:w-[144px] flex items-center justify-center font-medium">
                    오늘의 집중
                    <img src={arrowImg} className="ml-3" />
                  </button>
                </Link>
                <Link to="/">
                  <button className="border py-2 px-4 md:py-3 md:pl-6 md:pr-5  rounded-[15px] text-[#818181] w-[82px] flex items-center justify-center font-medium">
                    홈<img src={arrowImg} className="ml-3" />
                  </button>
                </Link>
              </div>
            </div>
            <div className="text-[18px] text-[#818181] mb-[8px] font-normal">
              현재시간
            </div>
            <TimeBox />
            <div className="border rounded-[20px] mt-8 w-full h-[680px] py-10 px-4 relative flex flex-col">
              <div className="flex items-center justify-center relative mb-4">
                <h3 className="text-[18px] md:text-[24px] text-[#414141] font-extrabold">
                  오늘의 습관
                </h3>
                <button
                  className="ml-4 text-[14px] text-[#818181] font-medium underline"
                  onClick={openModal}
                >
                  목록 수정
                </button>
              </div>

              <div className="flex-1 overflow-y-auto flex flex-col justify-center items-center">
                {habits.length > 0 ? (
                  <ul className="flex flex-col gap-3 text-center items-center">
                    {habits.map((habit) => (
                      <li
                        key={habit.id}
                        className={`text-[20px] w-[280px] h-[54px] md:w-[480px] md:h-[54px] min-h-[54px] font-bold text-[#414141]
                      rounded-[20px] flex items-center justify-center relative
                      transition-all duration-200 ease-in-out transform ${
                        disabledHabits[habit.id]
                          ? ""
                          : "cursor-pointer hover:-translate-y-1"
                      } ${
                          selectedHabits.includes(habit.id)
                            ? "bg-[#99C08E] text-white"
                            : "bg-[#EEEEEE] hover:bg-[#deeed5]"
                        }`}
                        onClick={() => {
                          if (!disabledHabits[habit.id]) {
                            onToggleHabit(habit.id);
                          }
                        }}
                        style={{ userSelect: "none" }}
                      >
                        {habit.name}
                        {habitCelebrations[habit.id] && (
                          <div className="absolute right-[10px] top-0 bottom-0 my-auto w-20 h-20 pointer-events-none flex items-center justify-center">
                            <img
                              src={con}
                              alt="축하 박수"
                              className="w-full h-full"
                            />
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-[#818181] text-[20px] text-center">
                    아직 생성된 목록이 없어요. <br /> 목록 수정을 눌러 습관을
                    생성해주세요.
                  </div>
                )}
                {isAllCompleted && (
                  <div className="fixed inset-0 bg-black bg-opacity-80 z-[100] flex flex-col items-center justify-center animate-fadeOut ">
                    <Confetti width={width} height={height} />
                    <img
                      src={congtb}
                      className="w-[1000px] opacity-90 "
                      style={{
                        maskImage:
                          "radial-gradient(circle, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 80%)",
                        WebkitMaskImage:
                          "radial-gradient(circle, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 80%)",
                        userSelect: "none",
                      }}
                      draggable="false"
                    />
                    <h2
                      className="text-white text-3xl md:text-5xl font-extrabold mt-2 animate-fadeIn"
                      style={{ userSelect: "none" }}
                    >
                      쉽네ㅋ👏
                    </h2>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>

      <HabitListModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={onSave}
        habits={habits}
        onRemoveHabit={onRemoveHabit}
        onAddHabit={onAddHabit}
        maxHabitCount={maxHabitCount}
      />
    </>
  );
}

export default HabitPage;
