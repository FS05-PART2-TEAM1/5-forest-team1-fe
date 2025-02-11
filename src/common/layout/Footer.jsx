import React from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/img_logo.png";

export function Footer() {
  return (
    <footer className="bg-f-bg border-t border-[#DDDDDD]">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 2xl:mx-40 lg:mx-8 md:mx-8 mx-2 py-8">
        {/* 로고 및 카피라이트 */}
        <div className="flex flex-col gap-4">
          <Link to="/">
            <img
              src={logoImg}
              alt="공부의 숲 로고"
              className="md:w-[182px] w-[106px] md:h-[60px] h-[35px]"
            />
          </Link>
          <div className="text-[#818181] text-sm">
            <p>© 2025 공부의 숲</p>
            <p>by 정하윤, 이동혁, 최은비, 정한샘, 가승연</p>
            <p>All rights reserved.</p>
          </div>
        </div>

        {/* 네비게이션 링크 */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-12">
          <div className="flex flex-col gap-3">
            <h3 className="text-[#414141] font-bold text-sm md:text-base">
              서비스
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                to="/study/create"
                className="text-[#818181] hover:text-[#578246] text-sm"
              >
                스터디 만들기
              </Link>
              <Link
                to="/habit"
                className="text-[#818181] hover:text-[#578246] text-sm"
              >
                오늘의 습관
              </Link>
              <Link
                to="/focus"
                className="text-[#818181] hover:text-[#578246] text-sm"
              >
                오늘의 집중
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-[#414141] font-bold text-sm md:text-base">
              문의하기
            </h3>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:5-forest-team1.com"
                className="text-[#818181] hover:text-[#578246] text-sm"
              >
                이메일
              </a>
              <a
                href="https://github.com/orgs/FS05-PART2-TEAM1/dashboard"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#818181] hover:text-[#578246] text-sm"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
