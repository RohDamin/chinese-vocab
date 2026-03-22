import { COLORS } from "../../styles/theme";
import { SpeakerIcon } from "../icons/Icons";
import { speak } from "../../utils/speech";

export default function HanziBox({
  hanzi,
  writeMode = false,
  writeHanziRevealed = false,
  onToggleWriteHanzi,
}) {
  const hanziBlurred = writeMode && !writeHanziRevealed;

  const handleMainClick = () => {
    if (writeMode) {
      onToggleWriteHanzi?.();
    } else {
      speak(hanzi);
    }
  };

  return (
    <div
      onClick={handleMainClick}
      style={{
        background: COLORS.orange,
        padding: writeMode ? "22px 16px 30px" : "22px 16px",
        textAlign: "center",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <div
        style={{
          fontSize: 42,
          fontWeight: 700,
          color: COLORS.white,
          letterSpacing: 3,
          filter: hanziBlurred ? "blur(12px)" : "none",
          userSelect: "none",
          transition: "filter .25s ease",
        }}
      >
        {hanzi}
      </div>

      {writeMode && (
        <div
          style={{
            position: "absolute",
            bottom: 8,
            left: 0,
            right: 0,
            textAlign: "center",
            fontSize: 11,
            fontWeight: 600,
            color: "rgba(255,255,255,.85)",
            pointerEvents: "none",
            textShadow: "0 1px 2px rgba(0,0,0,.2)",
          }}
        >
          {hanziBlurred ? "탭하여 한자 보기" : "탭하여 한자 숨기기"}
        </div>
      )}

      <div
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.stopPropagation();
          speak(hanzi);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            e.stopPropagation();
            speak(hanzi);
          }
        }}
        style={{
          position: "absolute",
          top: 10,
          right: 12,
          background: "rgba(255,255,255,.25)",
          borderRadius: 20,
          padding: "4px 8px",
          display: "flex",
          alignItems: "center",
          gap: 4,
          color: COLORS.white,
          fontSize: 11,
          cursor: "pointer",
        }}
      >
        <SpeakerIcon size={14} /> 발음듣기
      </div>
    </div>
  );
}
