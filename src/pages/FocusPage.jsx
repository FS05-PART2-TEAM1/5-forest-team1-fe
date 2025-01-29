function FocusPage() {
  return (
    <div className="w-screen h-screen bg-[#F6F4EF] py-[153px]">
      <div className="max-w-[1248px] mx-auto bg-white rounded-[20px] p-10 shadow-lg">
        <div className="flex justify-between items-center mb-[21px]">
          <h1 className="text-[32px] font-extrabold text-[#414141]">
            연우의 개발공장
          </h1>
          <div className="flex gap-4">
            <button className="px-6 py-2 rounded-[15px] border border-[#dddddd] text-base font-medium text-[#818181]">
              오늘의 습관
            </button>
            <button className="px-6 py-2 rounded-[15px] border border-[#dddddd] text-base font-medium text-[#818181]">
              홈
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-6">
          <p className="text-[#818181] text-[18px] font-normal">
            현재까지 획득한 포인트
          </p>
          <p className="text-[16px] flex items-center">
            <span className="text-green-600">🌱</span> 310P 획득
          </p>
        </div>

        <div className="rounded-[20px] border border-[#dddddd] p-8">
          <h2 className="text-center text-[24px] font-extrabold text-[#414141] mb-[100px]">
            오늘의 집중
          </h2>
          <div className="text-center">
            <div className="text-[150px] font-extrabold text-[#414141] mb-[94px]">
              25:00
            </div>
            <button className="bg-[#99C08E] text-white px-8 py-2 rounded-full flex items-center font-extrabold gap-2 mx-auto">
              <span>▶</span> Start!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FocusPage;
