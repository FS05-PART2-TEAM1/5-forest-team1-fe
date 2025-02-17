import { Link } from "react-router-dom";
import logoImg from "../../assets/img_logo.png";
import HeaderButton from "../buttons/HeaderButton";

export function Header({ isCreateButton = false }) {
  return (
    <>
      {isCreateButton ? (
        <div className="p-1 mx-auto flex pt-4  lg:mb-8 mb-4 justify-between items-center md:max-w-[1248px]">
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
        <div className="pl-3 pt-4 mb-2 mx-auto md:max-w-[1248px]">
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
