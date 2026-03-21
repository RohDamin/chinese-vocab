import { COLORS } from "../../styles/theme";

export default function FilterTabs({ filter, totalCount, memCount, notCount, onChange }) {
  const tabs = [
    ["all", "전체", totalCount],
    ["not", "미암기", notCount],
    ["memorized", "암기완료", memCount],
  ];

  return (
    <div style={{ display: "flex", gap: 6, padding: "12px 20px", background: COLORS.white }}>
      {tabs.map(([key, label, count]) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          style={{
            flex: 1,
            padding: "8px 0",
            textAlign: "center",
            fontSize: 13,
            fontWeight: 600,
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            background: filter === key ? COLORS.orange : COLORS.inputBg,
            color: filter === key ? COLORS.white : COLORS.textMuted,
            transition: "all .2s",
          }}
        >
          {label} ({count})
        </button>
      ))}
    </div>
  );
}