// components/card/FlashCard.jsx
import { COLORS } from "../../styles/theme";
import { CheckIcon } from "../icons/Icons";
import { EmptyState } from "../common/EmptyState";
import HanziBox from "./HanziBox";
import { CardInfo } from "./CardInfo";

const STATUS_LABELS = [
  { field: "meaning_memorized", label: "뜻 암기", emoji: "📖" },
  { field: "hanzi_written", label: "한자 써봄", emoji: "✏️" },
  { field: "hanzi_memorized", label: "한자 암기", emoji: "🧠" },
];

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

  const wordStatus = statuses[current.id] || {};

  return (
    <>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "16px 20px 0" }}>
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

        {/* 암기 상태 3단계 체크 */}
        <div style={{ display: "flex", gap: 8, marginTop: 14, width: "100%" }}>
          {STATUS_LABELS.map(({ field, label, emoji }) => {
            const checked = wordStatus[field] || false;
            return (
              <button
                key={field}
                onClick={() => toggleStatus(current.id, field)}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 5,
                  padding: "10px 6px",
                  borderRadius: 12,
                  border: checked ? "none" : `1.5px solid #ddd`,
                  cursor: "pointer",
                  fontSize: 12,
                  fontWeight: 600,
                  background: checked ? COLORS.green : COLORS.white,
                  color: checked ? COLORS.white : COLORS.textMuted,
                  transition: "all .2s",
                }}
              >
                {checked ? <CheckIcon /> : <span style={{ fontSize: 14 }}>{emoji}</span>}
                {label}
              </button>
            );
          })}
        </div>

        {/* 마지막 변경 시각 */}
        <div style={{ fontSize: 11, color: COLORS.textHint, marginTop: 6, visibility: wordStatus.updated_at ? "visible" : "hidden" }}>
          마지막 업데이트: {wordStatus.updated_at ? new Date(wordStatus.updated_at).toLocaleString("ko-KR") : "-"}
        </div>
      </div>

      {/* 네비게이션 */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", width: "100%" }}>
        <NavButton direction="prev" onClick={() => goTo("prev")} />
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