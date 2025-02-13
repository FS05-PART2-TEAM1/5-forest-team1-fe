import { Link } from "react-router-dom";
import logoImg from "../../assets/img_logo.png";
import HeaderButton from "../buttons/HeaderButton";

export function Header({ isCreateButton = false }) {
  return (
    <>
      {isCreateButton ? (
        <div className="flex  2xl:ml-40 lg:ml-8 md:ml-8 ml-2 pt-4 2xl:mr-40 lg:mr-8 md:mr-8 mr-2 lg:mb-8 mb-4 justify-between items-center">
          <Link to="/home">
            <img
              className="md:w-[182px] w-[106px] md:h-[60px] h-[35px]"
              src={logoImg}
            />
          </Link>
          <Link to="/study/create">
            <HeaderButton>스터디 만들기</HeaderButton>
          </Link>
        </div>
      ) : (
        <div className="2xl:ml-40 lg:ml-8 md:ml-8 ml-2 pt-4 mb-8 md:w-[182px] w-[106px] md:h-[60px] h-[35px]">
          <Link to="/home">
            <img
              className="md:w-[182px] w-[106px] md:h-[60px] h-[35px]"
              src={logoImg}
            />
          </Link>
        </div>
      )}
    </>
  );
}
