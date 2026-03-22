import { COLORS } from "../../styles/theme";
import { SpeakerIcon } from "../icons/Icons";
import { speak } from "../../utils/speech";
import { HandwritingPad } from "./HandwritingPad";

/** 한자쓰기 슬롯 고정 높이 · 예문 영역 최대 높이 (px) */
export const CARD_LOWER_SLOT_PX = 200;

export function CardInfo({ word, showAnswer, onReveal, writePracticeActive = false }) {
  const hidden = {
    filter: "blur(8px)",
    userSelect: "none",
    cursor: "pointer",
    transition: "filter .3s",
  };

  const revealMeaning = showAnswer || writePracticeActive;
  const revealExampleExtra = showAnswer || writePracticeActive;

  return (
    <div style={{ padding: "16px 18px", textAlign: "center" }}>
      {/* 뜻 & 병음 */}
      <div
        style={revealMeaning ? {} : hidden}
        onClick={() => !revealMeaning && onReveal()}
      >
        <div style={{ fontSize: 20, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>
          {word.meaning}
        </div>
        <div style={{ fontSize: 14, color: "#999", marginBottom: 12 }}>
          {word.pinyin}
        </div>
      </div>

      <div style={{ height: 1, background: "#f0f0f0", margin: "0 0 10px" }} />

      {/* 쓰기 모드: 고정 높이 슬롯 / 일반: 내용만큼만 (최대 동일 px, 아래 빈 여백 없음) */}
      {writePracticeActive ? (
        <div
          style={{
            height: CARD_LOWER_SLOT_PX,
            minHeight: CARD_LOWER_SLOT_PX,
            maxHeight: CARD_LOWER_SLOT_PX,
            overflow: "hidden",
            boxSizing: "border-box",
          }}
        >
          <HandwritingPad wordKey={String(word.id ?? word.hanzi ?? "")} slotHeight={CARD_LOWER_SLOT_PX} />
        </div>
      ) : (
        <div
          style={{
            maxHeight: CARD_LOWER_SLOT_PX,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            textAlign: "center",
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              fontSize: 10,
              color: "#F57C20",
              fontWeight: 600,
              marginBottom: 4,
              letterSpacing: 1,
            }}
          >
            예 문
          </div>
          <div
            onClick={() => speak(word.example)}
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#333",
              marginBottom: 2,
              cursor: "pointer",
              lineHeight: 1.45,
            }}
          >
            {word.example} <SpeakerIcon size={14} />
          </div>

          <div
            style={revealExampleExtra ? {} : hidden}
            onClick={() => !revealExampleExtra && onReveal()}
          >
            <div style={{ fontSize: 13, color: "#aaa", marginBottom: 2 }}>{word.exPinyin}</div>
            <div style={{ fontSize: 14, color: "#666", marginBottom: 0 }}>{word.exMeaning}</div>
          </div>

          {!showAnswer && (
            <div style={{ fontSize: 12, color: "#ccc", marginTop: 6, lineHeight: 1.3 }}>
              탭하여 정답 보기
            </div>
          )}
        </div>
      )}
    </div>
  );
}
