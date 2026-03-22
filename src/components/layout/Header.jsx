// components/layout/Header.jsx
import { COLORS } from "../../styles/theme";
import { CardIcon, ListIcon } from "../icons/Icons";

export default function Header({ title, view, doneCount, notCount, onChangeView, onBack }) {
  return (
    <div
      style={{
        padding: "12px 20px",
        paddingTop: "max(12px, env(safe-area-inset-top))",
        background: COLORS.white,
        borderBottom: `1px solid ${COLORS.border}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* 뒤로가기 */}
        <button
          onClick={onBack}
          style={{
            width: 34,
            height: 34,
            borderRadius: 17,
            border: `1.5px solid ${COLORS.border}`,
            background: COLORS.white,
            color: COLORS.textMuted,
            fontSize: 18,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ‹
        </button>
        <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.text }}>{title}</div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ display: "flex", gap: 8, fontSize: 13 }}>
          <span style={{ background: COLORS.greenBg, color: COLORS.green, padding: "3px 10px", borderRadius: 20, fontWeight: 600 }}>
            {doneCount}
          </span>
          <span style={{ background: COLORS.redBg, color: COLORS.red, padding: "3px 10px", borderRadius: 20, fontWeight: 600 }}>
            {notCount}
          </span>
        </div>

        <div style={{ display: "flex", gap: 4, background: COLORS.inputBg, borderRadius: 10, padding: 3 }}>
          <ViewToggleBtn active={view === "card"} onClick={() => onChangeView("card")}>
            <CardIcon />
          </ViewToggleBtn>
          <ViewToggleBtn active={view === "list"} onClick={() => onChangeView("list")}>
            <ListIcon />
          </ViewToggleBtn>
        </div>
      </div>
    </div>
  );
}

function ViewToggleBtn({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 32,
        borderRadius: 8,
        border: "none",
        cursor: "pointer",
        background: active ? COLORS.white : "transparent",
        color: active ? COLORS.orange : "#aaa",
        boxShadow: active ? "0 1px 3px rgba(0,0,0,.1)" : "none",
        transition: "all .2s",
      }}
    >
      {children}
    </button>
  );
}