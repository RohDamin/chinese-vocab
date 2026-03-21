// components/layout/Header.jsx
import { COLORS } from "../../styles/theme";
import { CardIcon, ListIcon } from "../icons/Icons";

export default function Header({ view, memCount, notCount, onChangeView }) {
  return (
    <div
      style={{
        padding: "16px 20px",
        background: COLORS.white,
        borderBottom: `1px solid ${COLORS.border}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.text }}>
        中文 단어장
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {/* 통계 배지 */}
        <div style={{ display: "flex", gap: 12, fontSize: 13 }}>
          <span style={{ background: COLORS.greenBg, color: COLORS.green, padding: "3px 10px", borderRadius: 20, fontWeight: 600 }}>
            {memCount}
          </span>
          <span style={{ background: COLORS.redBg, color: COLORS.red, padding: "3px 10px", borderRadius: 20, fontWeight: 600 }}>
            {notCount}
          </span>
        </div>

        {/* 뷰 토글 */}
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