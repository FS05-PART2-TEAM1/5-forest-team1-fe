import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="text-center py-10">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-xl mb-4">페이지를 찾을 수 없습니다</p>
      <Link to="/" className="text-blue-500 hover:text-blue-700">
        메인으로 돌아가기
      </Link>
    </div>
  );
}

export default NotFound;
