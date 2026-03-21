// components/list/WordList.jsx
import { COLORS } from "../../styles/theme";
import { CheckIcon } from "../icons/Icons";
import { EmptyState } from "../common/EmptyState";

export default function WordList({ filtered, statuses, filter, onSelect, onToggle }) {
  if (filtered.length === 0) {
    return <EmptyState filter={filter} />;
  }

  return (
    <div style={{ flex: 1, overflow: "auto", padding: "8px 16px 20px" }}>
      {filtered.map((w) => {
        const mem = statuses[w.id] === "memorized";
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
              borderLeft: `4px solid ${mem ? COLORS.green : "#ddd"}`,
              cursor: "pointer",
              gap: 14,
              transition: "all .15s",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.text, minWidth: 60 }}>
              {w.hanzi}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.textSub }}>{w.meaning}</div>
              <div style={{ fontSize: 12, color: COLORS.textLighter }}>{w.pinyin}</div>
            </div>
            <div
              onClick={(e) => { e.stopPropagation(); onToggle(w.id); }}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                border: mem ? "none" : "2px solid #ddd",
                background: mem ? COLORS.green : COLORS.white,
                color: COLORS.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
                transition: "all .2s",
              }}
            >
              {mem && <CheckIcon />}
            </div>
          </div>
        );
      })}
    </div>
  );
}