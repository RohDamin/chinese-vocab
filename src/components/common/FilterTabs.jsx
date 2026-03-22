// components/common/FilterTabs.jsx
import { COLORS } from "../../styles/theme";

export default function FilterTabs({
  filter,
  totalCount,
  meaningNotCount,
  hanziMemNotCount,
  doneCount,
  onChange,
}) {
  const tabs = [
    ["all", "전체", totalCount],
    ["meaning_not", "뜻 암기", meaningNotCount],
    ["hanzi_not", "한자 암기", hanziMemNotCount],
    ["done", "완료", doneCount],
  ];

  return (
    <div style={{ display: "flex", gap: 4, padding: "10px 12px", background: COLORS.white, flexShrink: 0 }}>
      {tabs.map(([key, label, count]) => (
        <button
          key={key}
          type="button"
          onClick={() => onChange(key)}
          style={{
            flex: 1,
            padding: "8px 4px",
            textAlign: "center",
            fontSize: 12,
            fontWeight: 600,
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            background: filter === key ? COLORS.orange : COLORS.inputBg,
            color: filter === key ? COLORS.white : COLORS.textMuted,
            transition: "all .2s",
            lineHeight: 1.2,
          }}
        >
          {label} ({count})
        </button>
      ))}
    </div>
  );
}