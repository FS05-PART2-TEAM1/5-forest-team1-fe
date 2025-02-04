import logoImg from "../../assets/img_logo.png";

export function Header({ isCreateButton }) {
  return (
    <>
      {isCreateButton ? (
        <div className="flex lg:ml-48 md:ml-8 ml-2 lg:mr-48 md:mr-8 mr-2 mt-4 lg:mb-8 mb-4 justify-between items-center">
          <img className="md:w-[182px] w-[106px] md:h-[60px] h-[35px]" src={logoImg} />
          {/* 버튼 넣어야합니다. */}
          <div className="hover:bg-green-300 bg-orange-300 flex justify-center items-center p-4 text-white rounded-full cursor-pointer">나는 가짜버튼</div>
        </div>
      ) : (
        <div className="ml-48 mt-4 mb-8">
          <img src={logoImg} />
        </div>
      )}
    </>
  );
}
