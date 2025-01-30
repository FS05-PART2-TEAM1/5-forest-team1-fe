function FocusPage() {
  return (
    <div className="w-screen h-screen bg-[#F6F4EF] py-[153px]">
      <div className="w-[95%] mx-auto bg-white rounded-[20px] p-6 md:p-10 shadow-lg md:max-w-[1248px]">
        <div className="flex flex-col items-start justify-between mb-[21px] md:flex-row md:items-center">
          <h1 className="text-[24px] md:text-[32px] font-extrabold text-[#414141] mb-4 md:mb-0">
            연우의 개발공장
          </h1>
          <div className="flex gap-4">
            <button className="px-4 md:px-6 py-2 rounded-[15px] border border-[#dddddd] text-sm md:text-base font-medium text-[#818181]">
              오늘의 습관
            </button>
            <button className="px-4 md:px-6 py-2 rounded-[15px] border border-[#dddddd] text-sm md:text-base font-medium text-[#818181]">
              홈
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-6">
          <p className="text-[#818181] text-[16px] md:text-[18px] font-normal">
            현재까지 획득한 포인트
          </p>
          <p className="text-[14px] md:text-[16px] flex items-center">
            <span className="text-green-600">🌱</span> 310P 획득
          </p>
        </div>

        <div className="rounded-[20px] border border-[#dddddd] pt-6 md:pt-10">
          <h2 className="text-center text-[24px] font-extrabold text-[#414141] mb-[50px] md:mb-[100px]">
            오늘의 집중
          </h2>
          <div className="text-center">
            <div className="text-[80px] md:text-[120px] font-extrabold text-[#414141] mb-[50px] md:mb-[94px]">
              25:00
            </div>
            <button className="bg-[#99C08E] text-white w-[140px] md:w-[333px] h-[45px] md:h-[60px] mb-[50px] md:mb-[40px] rounded-full font-extrabold text-[18px] text-center md:text-[28px]">
              <span className="mr-2 md:mr-4 text-[20px] md:text-[30px]">▶</span>
              Start!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FocusPage;
