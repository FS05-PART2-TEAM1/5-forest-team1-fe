import React, { useState, useEffect } from "react";
import { Header } from "@/common/layout/Header";
import { Link, useLocation } from "react-router-dom";
import HabitListModal from "../common/modal/HabitListModal";
import habitApi from "@/api/habitApi";

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
      if (studyData?.id) {
        const habitList = await habitApi.getHabitsList(studyData.id);
        setHabits(habitList.map((habit) => habit.name));
        setOriginalHabits(
          habitList.map((habit) => ({ id: habit.id, name: habit.name }))
        );
        setLoading(false);
        console.log(
          "📌 [originalHabits 설정 완료]:",
          habitList.map((habit) => ({ id: habit.id, name: habit.name }))
        );
      }
    }
    if (studyData) {
      fetchHabits();
    }
  }, [studyData]);

  if (loading) {
    return <div>습관을 불러오는 중...</div>;
  }

  const openModal = () => {
    console.log("[현재 originalHabits]:", originalHabits);
    setIsModalOpen(true);
  };

  const onSave = async (updatedHabitNames) => {
    console.log("📌 [onSave 호출됨] updatedHabits:", updatedHabitNames);
    console.log("📌 [originalHabits 데이터 확인]:", originalHabits);

    if (!Array.isArray(updatedHabitNames)) {
      console.error(
        "🚨 [onSave 오류]: updatedHabits가 배열이 아닙니다!",
        updatedHabitNames
      );
      return;
    }

    // ✅ 기존 습관을 Map 형태로 변환
    const originalHabitsMap = new Map(
      originalHabits.map((habit) => [habit.name, habit])
    );

    // ✅ 기존 습관이 아닌 새로운 습관 필터링
    const newHabits = updatedHabitNames
      .filter((name) => !originalHabitsMap.has(name))
      .map((name) => ({
        studyId: studyData.id,
        name,
      }));

    // ✅ 삭제된 습관 필터링
    const deletedHabits = originalHabits
      .filter((habit) => !updatedHabitNames.includes(habit.name)) // 기존 습관인데 목록에서 사라진 경우
      .map((habit) => ({
        id: habit.id,
        name: habit.name,
        deletedAt: new Date().toISOString(),
      }));

    // ✅ PATCH 요청할 데이터 (새로운 습관 + 삭제된 습관)
    const formattedHabits = [...newHabits, ...deletedHabits];

    // ✅ 변경된 데이터가 없다면 요청하지 않음
    if (formattedHabits.length === 0) {
      console.log("✅ 변경된 습관 없음, PATCH 요청 안함.");
      setIsModalOpen(false);
      return;
    }

    console.log("📌 [PATCH 요청 데이터]:", formattedHabits);

    try {
      const response = await habitApi.updateHabits(
        studyData.id,
        formattedHabits
      );

      if (response) {
        setHabits(response.map((habit) => habit.name));
        setOriginalHabits(
          response.map((habit) => ({ id: habit.id, name: habit.name }))
        );
        console.log(
          "📌 [습관 목록 업데이트 완료]:",
          response.map((habit) => habit.name)
        );
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error("🚨 습관 저장 중 오류 발생:", error);
    }
  };

  const onAddHabit = () => {
    if (habits.length < maxHabitCount) {
      const newHabit = prompt("새로운 습관을 입력하세요:");
      if (newHabit) {
        setHabits([...habits, newHabit]);
      }
    } else {
      alert("습관은 최대 8개까지만 추가할 수 있습니다.");
    }
  };
  const onRemoveHabit = (index) => {
    setHabits((prevHabits) => {
      const updatedHabits = [...prevHabits];
      updatedHabits[index] = {
        ...updatedHabits[index],
        deletedAt: new Date().toISOString(),
      };

      return updatedHabits.filter((habit) => !habit.deletedAt); // ✅ UI에서 즉시 숨김
    });
  };

  const onToggleHabit = (index) => {
    if (selectedHabits.includes(index)) {
      setSelectedHabits(selectedHabits.filter((i) => i !== index));
    } else {
      setSelectedHabits([...selectedHabits, index]);
    }
  };
  return (
    <>
      <div className="min-h-screen bg-[#F6F4EF]">
        <Header />
        <main className="p-[20px] sm:p-[16px_24px] md:p-[16px_24px]">
          <div className="bg-white rounded-lg shadow p-6 min-[1200px]:w-[1150px] mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold mb-4">
                {nickname && title
                  ? `${nickname} 의 ${title}`
                  : "스터디 정보 없음"}
              </h2>
              <div className="flex gap-4 items-center">
                <Link to="/focus" state={{ studyData }}>
                  <button className="border py-2 px-4 rounded-xl text-[#818181]">
                    오늘의 집중 <span>&gt;</span>
                  </button>
                </Link>
                <Link to="/">
                  <button className="border py-2 px-4 rounded-xl text-[#818181]">
                    홈 <span>&gt;</span>
                  </button>
                </Link>
              </div>
            </div>
            <TimeBox />
            <div className="border rounded-lg mt-8 w-full h-[631px] flex flex-col items-center justify-between py-10 px-6 relative">
              <h3 className="absolute left-1/2 transform -translate-x-1/2 text-[18px] md:text-[24px] font-bold text-[#414141]">
                오늘의 습관
              </h3>
              <button
                className="absolute left-1/2 transform -translate-x-1/2 ml-[90px] md:ml-[145px] text-[14px] text-[#818181] underline"
                onClick={openModal}
              >
                목록 수정
              </button>
              <div className="h-[498px] flex justify-center items-center w-full">
                {habits.length > 0 ? (
                  <ul className="flex flex-col gap-3 text-center">
                    {habits.map((habit, index) => (
                      <li
                        key={index}
                        className={`text-[20px] w-[280px] h-[54px] md:w-[480px] md:h-[54px] rounded-[20px] flex items-center justify-center cursor-pointer
                        ${
                          selectedHabits.includes(index)
                            ? "bg-[#99C08E] text-white"
                            : "bg-[#EEEEEE]"
                        }`}
                        onClick={() => onToggleHabit(index)}
                        style={{ userSelect: "none", cursor: "default" }}
                      >
                        {habit}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-[#818181] text-[20px] text-center">
                    아직 생성된 목록이 없어요.
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
