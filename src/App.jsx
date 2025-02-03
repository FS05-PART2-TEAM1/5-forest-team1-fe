import { useState } from "react";
import AppRouter from "./AppRouter";
import useWindowSize from "./common/hooks/useWindowSize";

function App() {
  const {width, height} = useWindowSize();
  const {userEnv, setUserEnv} = useState();


  useEffect(()=> {
    if (width >= 1025) setUserEnv("desktop");
    if (width < 1025 && width > 768) setUserEnv("tablet");
    if (width <= 768) setUserEnv("mobile");
  }, [width])

  return (
    <div>
      <AppRouter userEnv={userEnv}/>
    </div>
  );
}

export default App;
