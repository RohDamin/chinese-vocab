// components/list/WordList.jsx
import { COLORS } from "../../styles/theme";
import { EmptyState } from "../common/EmptyState";

const FIELDS = ["meaning_memorized", "hanzi_written", "hanzi_memorized"];
const FIELD_EMOJI = { meaning_memorized: "📖", hanzi_written: "✏️", hanzi_memorized: "🧠" };

export default function WordList({ filtered, statuses, filter, onSelect, onToggle }) {
  if (filtered.length === 0) {
    return <EmptyState filter={filter} />;
  }

  return (
    <div style={{ flex: 1, overflow: "auto", padding: "8px 16px 20px" }}>
      {filtered.map((w) => {
        const s = statuses[w.id] || {};
        const doneCount = FIELDS.filter((f) => s[f]).length;
        const allDone = doneCount === 3;

        return (
          <div
            key={w.id}
            onClick={() => onSelect(w.id)}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "14px 16px",
              background: COLORS.white,
              borderRadius: 14,
              marginBottom: 8,
              boxShadow: COLORS.listShadow,
              borderLeft: `4px solid ${allDone ? COLORS.green : doneCount > 0 ? COLORS.orange : "#ddd"}`,
              cursor: "pointer",
              gap: 12,
              transition: "all .15s",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.text, minWidth: 56 }}>
              {w.hanzi}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.textSub }}>{w.meaning}</div>
              <div style={{ fontSize: 12, color: COLORS.textLighter }}>{w.pinyin}</div>
            </div>
            {/* 미니 상태 표시 */}
            <div style={{ display: "flex", gap: 3 }}>
              {FIELDS.map((f) => (
                <span
                  key={f}
                  onClick={(e) => { e.stopPropagation(); onToggle(w.id, f); }}
                  style={{
                    fontSize: 13,
                    width: 26,
                    height: 26,
                    borderRadius: 13,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: s[f] ? COLORS.green : "#f3f3f3",
                    cursor: "pointer",
                    filter: s[f] ? "none" : "grayscale(1)",
                    opacity: s[f] ? 1 : 0.4,
                    transition: "all .2s",
                  }}
                >
                  {FIELD_EMOJI[f]}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}