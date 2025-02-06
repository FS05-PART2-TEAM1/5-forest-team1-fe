import { useState } from "react";

function useLocalStorage(key, initialValue) {
  // 초기 상태를 localStorage에서 불러오거나 초기값으로 설정합니다.
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // localStorage에서 key에 해당하는 값을 가져옵니다.
      const item = window.localStorage.getItem(key);
      // 값이 존재하면 파싱하여 반환, 없으면 초기값을 반환합니다.
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(
        `localStorage에서 [${key}] 값을 불러오는 도중 에러 발생:`,
        error
      );
      return initialValue;
    }
  });

  // 상태와 localStorage에 값을 저장하는 함수입니다.
  const setValue = (value) => {
    try {
      // 함수 형태로 업데이트할 경우 현재 상태를 기반으로 값을 계산합니다.
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // 상태 업데이트
      setStoredValue(valueToStore);
      // localStorage에 업데이트된 값을 저장합니다. (문자열로 변환)
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(
        `localStorage에 [${key}] 값을 저장하는 도중 에러 발생:`,
        error
      );
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
