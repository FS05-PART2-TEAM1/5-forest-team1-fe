import { useEffect, useRef } from "react";

function StudyCreatePage() {
  const inputRef = useRef(null);
  useEffect(() => {
    // 커서를 시작 위치로 이동 (예: 처음에 커서를 첫 번째 글자 위치로 설정)
    if (inputRef.current) {
      inputRef.current.setSelectionRange(0, 3); // 3번째 위치로 커서 이동
    }
  }, []);
  return (
    <div className="flex justify-center items-center bg-[#F6F4EF]">
      <div className=" rounded-xl lg:mt-[27px] lg:mb-32 md:mb-[197px] mt-5 mb-[171px] lg:w-[696px] lg:h-[1163px] md:w-[696px] md:h-[1171px] w-[344px] h-[1423px]  bg-white  p-4">
        <div className="mt-2">
          <div>
            <div className="gap-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold">스터디 만들기</h1>
              </div>
              <form className="flex flex-col mb-4 gap-2">
                <label className="text-lg font-semibold" htmlFor="">
                  닉네임
                </label>
                <input
                  className="border border-gray-300 p-3 h-12 rounded-lg"
                  placeholder="닉네임을 입력해 주세요"
                ></input>
              </form>
              <form className="flex flex-col mb-4 gap-2">
                <label className="text-lg font-semibold" htmlFor="">
                  스터디 이름
                </label>
                <input
                  className="border border-gray-300 p-3 h-12 rounded-lg"
                  placeholder="스터디 이름을 입력해주세요"
                ></input>
              </form>
              <form className="flex flex-col mb-4 gap-2">
                <label className="text-lg font-semibold" htmlFor="">
                  소개
                </label>
                <textarea
                  className="border border-gray-300 p-3 h-24 rounded-lg  leading-7"
                  placeholder="소개 멘트를 작성해 주세요"
                />
              </form>
              <div className=" mb-4 gap-2">
                <h3 className="text-lg font-semibold">배경을 선택해주세요</h3>
                <div>이미지들 </div>
              </div>
            </div>
            <form className="flex flex-col mb-4 gap-2">
              <label className="text-lg font-semibold" htmlFor="">
                비밀번호
              </label>
              <input
                className="border border-gray-300 p-3 h-12 rounded-lg"
                placeholder="비밀번호를 입력해 주세요"
              ></input>
            </form>

            <form className="flex flex-col mb-4 gap-2">
              <label className="text-lg font-semibold" htmlFor="">
                비밀번호 확인
              </label>
              <input
                className="border border-gray-300 p-3 h-12 rounded-lg"
                placeholder="비밀번호를 다시 입력해 주세요"
              ></input>
            </form>
          </div>
          <button>만들기</button>
        </div>
      </div>
    </div>
  );
}

export default StudyCreatePage;
