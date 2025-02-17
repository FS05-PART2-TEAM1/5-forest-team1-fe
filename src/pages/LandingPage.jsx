import { Link, useNavigate } from "react-router-dom";
import { Header } from "../common/layout/Header";
import landingImage from "../assets/img_landing.png";

function LandingPage() {
  const navigate = useNavigate();

  const handleStartStudy = (e) => {
    if (e) e.preventDefault();
    navigate("/home", { state: { from: "/" } });
  };

  return (
    <div className="min-h-screen bg-f-bg">
      <Header />
      <section className="relative h-[600px] flex items-center justify-center text-center px-4 bg-f-green-bg bg-opacity-50">
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold text-f-black mb-6">
            나만의 스터디 숲을 가꾸어보세요
          </h1>
          <p className="text-lg md:text-xl text-f-gray-500 mb-8">
            스터디 관리부터 집중력 향상, 습관 형성까지
            <br />
            당신의 성장을 위한 모든 것
          </p>
          <button
            onClick={handleStartStudy}
            className="bg-f-brand text-white px-8 py-3 rounded-full text-lg hover:bg-f-green-text transition-colors"
          >
            스터디 시작하기
          </button>
        </div>
      </section>
      <img src={landingImage} alt="landing" className="w-full h-full" />
      <section className="py-20 px-4 md:px-8 lg:px-40">
        <h2 className="text-3xl font-bold text-center text-f-black mb-16">
          공부의 숲에서 제공하는 기능
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="group relative bg-white rounded-[2.5rem] p-8 text-center hover:bg-gradient-to-b hover:from-f-green-bg hover:to-white transition-all duration-500">
            <div className="absolute inset-0 bg-f-green-bg/5 rounded-[2.5rem] transform scale-95 -rotate-2 -z-10"></div>
            <div className="w-20 h-20 mx-auto mb-6 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-4xl filter drop-shadow-md">📚</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-f-black">
              스터디 관리
            </h3>
            <p className="text-f-gray-500 leading-relaxed">
              나만의 스터디 공간을 만들어요
              <br />
              목적에 맞는 스터디를 찾아보세요
            </p>
          </div>

          <div className="group relative bg-white rounded-[2.5rem] p-8 text-center hover:bg-gradient-to-b hover:from-f-blue-bg hover:to-white transition-all duration-500">
            <div className="absolute inset-0 bg-f-blue-bg/5 rounded-[2.5rem] transform scale-95 rotate-2 -z-10"></div>
            <div className="w-20 h-20 mx-auto mb-6 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-4xl filter drop-shadow-md">⏱️</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-f-black">집중 모드</h3>
            <p className="text-f-gray-500 leading-relaxed">
              5분, 15분, 25분, 45분까지
              <br />
              원하는 집중 시간을 선택하여 포인트를 획득해요
            </p>
          </div>

          <div className="group relative bg-white rounded-[2.5rem] p-8 text-center hover:bg-gradient-to-b hover:from-f-pink-bg hover:to-white transition-all duration-500">
            <div className="absolute inset-0 bg-f-pink-bg/5 rounded-[2.5rem] transform scale-95 -rotate-1 -z-10"></div>
            <div className="w-20 h-20 mx-auto mb-6 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <span className="text-4xl filter drop-shadow-md">✅</span>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-f-black">습관 형성</h3>
            <p className="text-f-gray-500 leading-relaxed">
              작은 습관 하나로 시작하는
              <br />
              당신의 성장 이야기
            </p>
          </div>
        </div>
      </section>

      <section className="h-[500px] px-4 md:px-8 lg:px-40 bg-gradient-to-b from-white to-f-green-bg/20 flex flex-col items-center justify-center">
        <button
          onClick={handleStartStudy}
          className="text-3xl md:text-4xl font-bold text-f-black hover:text-f-brand cursor-pointer transform hover:scale-105 transition-all duration-300"
        >
          공부의 숲으로 떠나볼까요?
        </button>
      </section>
    </div>
  );
}

export default LandingPage;
