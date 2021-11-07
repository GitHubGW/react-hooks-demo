import { useContext, useRef } from "react";
import { LanguageContext } from "./context";
import "./Home.css";

const Home = () => {
  const { handleTranslate } = useContext(LanguageContext);
  const inputTag = useRef();
  const h2Tag = useRef();

  const handleLanguage = (language) => {
    window.event.preventDefault();
    const {
      current: { value },
    } = inputTag;
    const result = handleTranslate(language, value);
    h2Tag.current.innerHTML = result;
  };

  return (
    <form>
      <h1>📖 번역기 📖</h1>
      <input type="text" style={{ display: "none" }} />
      <input ref={inputTag} type="text" placeholder="번역할 내용을 입력하세요." />
      <button type="submit" onClick={() => handleLanguage("korean")}>
        한국어 번역
      </button>
      <button type="button" onClick={() => handleLanguage("japanese")}>
        일본어 번역
      </button>
      <button type="button" onClick={() => handleLanguage("chinese")}>
        중국어 번역
      </button>
      <h2 ref={h2Tag}>{}</h2>
    </form>
  );
};

export default Home;
