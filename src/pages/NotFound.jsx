import { Link } from "react-router-dom";
import { useState } from "react";
import taejin1 from "../assets/img_taejin_gun1.png";
import taejin2 from "../assets/img_taejin_gun2.png";

function NotFound() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="text-center pt-80 py-10 min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 ">
      <h1 className="text-6xl font-bold mb-4 animate-bounce">4☠️4</h1>
      <p className="text-2xl mb-12 animate-pulse">앗! 길을 잃으셨다구요...?</p>
      <Link to="/">
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="transition-all duration-300"
        >
          <img
            src={isHovered ? taejin2 : taejin1}
            alt="Taejin"
            className={`w-1/2 mx-auto h-[500px] object-contain cursor-pointer 
              transition-all duration-300 hover:scale-105
              ${isHovered ? "opacity-100" : "opacity-90"}`}
          />
        </div>
      </Link>
      <p className="mt-8 text-red-500 text-xl font-bold animate-pulse">
        {isHovered ? `"응 잘가"` : `"어쩌지? 이제 못 돌아갈 것 같은데?"`}
      </p>
    </div>
  );
}

export default NotFound;
