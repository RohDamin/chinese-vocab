import { COLORS } from "../../styles/theme";
import { SpeakerIcon } from "../icons/Icons";
import { speak } from "../../utils/speech";

export default function HanziBox({ hanzi }) {
  return (
    <div
      onClick={() => speak(hanzi)}
      style={{
        background: COLORS.orange,
        padding: "28px 20px",
        textAlign: "center",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <div style={{ fontSize: 48, fontWeight: 700, color: COLORS.white, letterSpacing: 4 }}>
        {hanzi}
      </div>
      <div
        style={{
          position: "absolute",
          top: 12,
          right: 14,
          background: "rgba(255,255,255,.25)",
          borderRadius: 20,
          padding: "4px 8px",
          display: "flex",
          alignItems: "center",
          gap: 4,
          color: COLORS.white,
          fontSize: 11,
        }}
      >
        <SpeakerIcon size={14} /> 발음듣기
      </div>
    </div>
  );
}