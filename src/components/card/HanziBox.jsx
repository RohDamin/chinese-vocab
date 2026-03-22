import { COLORS } from "../../styles/theme";
import { SpeakerIcon } from "../icons/Icons";
import { speak } from "../../utils/speech";

export default function HanziBox({ hanzi }) {
  return (
    <div
      onClick={() => speak(hanzi)}
      style={{
        background: COLORS.orange,
        padding: "22px 16px",
        textAlign: "center",
        cursor: "pointer",
        position: "relative",
      }}
    >
      <div style={{ fontSize: 42, fontWeight: 700, color: COLORS.white, letterSpacing: 3 }}>
        {hanzi}
      </div>
      <div
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
        }}
      >
        <SpeakerIcon size={14} /> 발음듣기
      </div>
    </div>
  );
}