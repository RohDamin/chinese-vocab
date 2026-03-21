import { COLORS } from "../../styles/theme";
import { CheckIcon, XIcon } from "../icons/Icons";
import { EmptyState } from "../common/EmptyState";
import HanziBox from "./HanziBox";
import { CardInfo } from "./CardInfo";

export default function FlashCard({
  filtered,
  current,
  currentIdx,
  showAnswer,
  setShowAnswer,
  animDir,
  statuses,
  filter,
  goTo,
  toggleStatus,
}) {
  if (filtered.length === 0) {
    return <EmptyState filter={filter} />;
  }

  const isMemorized = statuses[current.id] === "memorized";

  return (
    <>
      {/* 카드 영역 */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 20px 0" }}>
        <div
          style={{
            width: "100%",
            background: COLORS.white,
            borderRadius: 20,
            boxShadow: COLORS.cardShadow,
            overflow: "hidden",
            transition: "opacity .2s, transform .2s",
            opacity: animDir ? 0.3 : 1,
            transform: animDir === "next" ? "translateX(-30px)" : animDir === "prev" ? "translateX(30px)" : "none",
          }}
        >
          <HanziBox hanzi={current.hanzi} />
          <CardInfo word={current} showAnswer={showAnswer} onReveal={() => setShowAnswer(true)} />
        </div>
      </div>

      {/* 하단 네비게이션 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", width: "100%" }}>
        <NavButton direction="prev" onClick={() => goTo("prev")} />

        <button
          onClick={() => toggleStatus(current.id)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "8px 16px",
            borderRadius: 20,
            border: "none",
            cursor: "pointer",
            fontSize: 13,
            fontWeight: 600,
            background: isMemorized ? COLORS.green : COLORS.inputBg,
            color: isMemorized ? COLORS.white : COLORS.textMuted,
            transition: "all .2s",
          }}
        >
          {isMemorized ? <><CheckIcon /> 암기완료</> : <><XIcon /> 미암기</>}
        </button>

        <span style={{ fontSize: 13, color: COLORS.textPlaceholder, fontWeight: 500 }}>
          {currentIdx + 1} / {filtered.length}
        </span>

        <NavButton direction="next" onClick={() => goTo("next")} />
      </div>
    </>
  );
}

function NavButton({ direction, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 44,
        height: 44,
        borderRadius: 22,
        border: `2px solid ${COLORS.orange}`,
        background: COLORS.white,
        color: COLORS.orange,
        fontSize: 20,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
      }}
    >
      {direction === "prev" ? "‹" : "›"}
    </button>
  );
}