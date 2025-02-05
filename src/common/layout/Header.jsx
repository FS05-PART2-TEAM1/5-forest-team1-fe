import { Link } from "react-router-dom";
import logoImg from "../../assets/img_logo.png";
import HeaderButton from "../buttons/HeaderButton";

export function Header({ isCreateButton = false }) {
  return (
    <>
      {isCreateButton ? (
        <div className="flex lg:ml-48 md:ml-8 ml-2 lg:mr-48 md:mr-8 mr-2 mt-4 lg:mb-8 mb-4 justify-between items-center">
          <Link to="/">
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
        <div className="lg:ml-48 md:ml-8 ml-2 mt-4 mb-8 md:w-[182px] w-[106px] md:h-[60px] h-[35px]">
          <Link to="/">
            <img className="md:w-[182px] w-[106px] md:h-[60px] h-[35px]" src={logoImg} />
          </Link>
        </div>
      )}
    </>
  );
}
