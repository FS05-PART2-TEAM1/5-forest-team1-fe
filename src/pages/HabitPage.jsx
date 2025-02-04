import React from "react";

function HabitPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center p-4 bg-white shadow">
        <img
          src={HeaderImage}
          alt="헤더 이미지"
          className="w-12 h-12 mr-4 object-cover rounded-full"
        />
        <h1 className="text-3xl font-bold text-gray-800">
          오늘의 습관 페이지 - 가승연
        </h1>
      </header>

      {/* Main Content */}
      <main className="p-4">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-2xl font-semibold mb-4">스터디 컨테이너</h2>
          <p>
            여기에 스터디 관련 내용이 표시됩니다. 예를 들어, 스터디 목록, 스터디
            생성/수정 등의 기능을 포함할 수 있습니다.
          </p>
          {/* 추가적인 스터디 관련 컴포넌트나 UI 요소를 이곳에 추가하세요 */}
        </div>
      </main>
    </div>
  );
}

export default HabitPage;
