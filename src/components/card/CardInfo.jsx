import { COLORS } from "../../styles/theme";
import { SpeakerIcon } from "../icons/Icons";
import { speak } from "../../utils/speech";
import { HandwritingPad } from "./HandwritingPad";

/** 한자쓰기 슬롯 고정 높이 · 예문 영역 최대 높이 (px) */
export const CARD_LOWER_SLOT_PX = 200;

const blurStyle = {
  filter: "blur(8px)",
  userSelect: "none",
  cursor: "pointer",
  transition: "filter .3s",
};

export function CardInfo({
  word,
  writePracticeActive = false,
  /** true: 뜻·병음·예문해석 블러 / false: 한자·예문(한문) 블러 — 쓰기 모드 아닐 때만 */
  meaningViewActive = false,
  /** true면 현재 모드에서 블러 해제 */
  blurPeek = false,
  onToggleBlurPeek,
}) {
  const meaningSideBlurred = !writePracticeActive && meaningViewActive && !blurPeek;
  const hanziSideBlurred = !writePracticeActive && !meaningViewActive && !blurPeek;

  return (
    <div style={{ padding: "16px 18px", textAlign: "center" }}>
      {/* 뜻 & 병음 */}
      {writePracticeActive ? (
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>{word.meaning}</div>
          <div style={{ fontSize: 14, color: "#999", marginBottom: 12 }}>{word.pinyin}</div>
        </div>
      ) : meaningViewActive ? (
        <div style={meaningSideBlurred ? blurStyle : {}} onClick={() => meaningViewActive && onToggleBlurPeek?.()}>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>{word.meaning}</div>
          <div style={{ fontSize: 14, color: "#999", marginBottom: 12 }}>{word.pinyin}</div>
        </div>
      ) : (
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#1a1a1a", marginBottom: 4 }}>{word.meaning}</div>
          <div
            style={{
              fontSize: 14,
              color: "#999",
              marginBottom: 12,
              ...(hanziSideBlurred ? blurStyle : {}),
            }}
            onClick={() => hanziSideBlurred && onToggleBlurPeek?.()}
          >
            {word.pinyin}
          </div>
        </div>
      )}

      <div style={{ height: 1, background: "#f0f0f0", margin: "0 0 10px" }} />

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

          {/* 한자 예문 — 기본 모드에서만 블러 */}
          <div
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#333",
              marginBottom: 2,
              lineHeight: 1.45,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6,
              flexWrap: "wrap",
            }}
          >
            <span
              style={
                hanziSideBlurred
                  ? { ...blurStyle, display: "inline-block" }
                  : { cursor: "pointer" }
              }
              onClick={() => {
                if (hanziSideBlurred) onToggleBlurPeek?.();
                else speak(word.example);
              }}
            >
              {word.example}
            </span>
            <span
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.stopPropagation();
                speak(word.example);
              }}
              style={{ cursor: "pointer", display: "inline-flex", alignItems: "center" }}
            >
              <SpeakerIcon size={14} />
            </span>
          </div>

          {/* 예문 병음·뜻 — 기본 모드에서는 병음만, 뜻 보기 모드에서는 둘 다 블러 */}
          {meaningSideBlurred ? (
            <div style={blurStyle} onClick={() => onToggleBlurPeek?.()}>
              <div style={{ fontSize: 13, color: "#aaa", marginBottom: 2 }}>{word.exPinyin}</div>
              <div style={{ fontSize: 14, color: "#666", marginBottom: 0 }}>{word.exMeaning}</div>
            </div>
          ) : (
            <>
              <div
                style={hanziSideBlurred ? blurStyle : {}}
                onClick={() => hanziSideBlurred && onToggleBlurPeek?.()}
              >
                <div style={{ fontSize: 13, color: "#aaa", marginBottom: 2 }}>{word.exPinyin}</div>
              </div>
              <div style={{ fontSize: 14, color: "#666", marginBottom: 0 }}>{word.exMeaning}</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
