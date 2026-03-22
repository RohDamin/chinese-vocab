import { COLORS } from "../../styles/theme";
import { SpeakerIcon } from "../icons/Icons";
import { speak } from "../../utils/speech";

export function CardInfo({ word, showAnswer, onReveal }) {
    const hidden = {
      filter: "blur(8px)",
      userSelect: "none",
      cursor: "pointer",
      transition: "filter .3s",
    };
  
    return (
      <div style={{ padding: "16px 18px", textAlign: "center" }}>
        {/* 뜻 & 병음 */}
        <div
          style={showAnswer ? {} : hidden}
          onClick={() => !showAnswer && onReveal()}
        >
          <div style={{ fontSize: 20, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>
            {word.meaning}
          </div>
          <div style={{ fontSize: 14, color: "#999", marginBottom: 12 }}>
            {word.pinyin}
          </div>
        </div>
  
        <div style={{ height: 1, background: "#f0f0f0", margin: "0 0 12px" }} />
  
        {/* 예문 */}
        <div style={{ fontSize: 10, color: "#F57C20", fontWeight: 600, marginBottom: 6, letterSpacing: 1 }}>
          예 문
        </div>
        <div
          onClick={() => speak(word.example)}
          style={{ fontSize: 16, fontWeight: 600, color: "#333", marginBottom: 4, cursor: "pointer", lineHeight: 1.45 }}
        >
          {word.example} <SpeakerIcon size={14} />
        </div>
  
        <div
          style={showAnswer ? {} : hidden}
          onClick={() => !showAnswer && onReveal()}
        >
          <div style={{ fontSize: 13, color: "#aaa", marginBottom: 4 }}>{word.exPinyin}</div>
          <div style={{ fontSize: 14, color: "#666" }}>{word.exMeaning}</div>
        </div>
  
        <div
          style={{
            fontSize: 12,
            color: "#ccc",
            marginTop: 10,
            minHeight: 18,
            visibility: showAnswer ? "hidden" : "visible",
          }}
        >
          탭하여 정답 보기
        </div>
      </div>
    );
  }