export function EmptyState({ filter }) {
  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#ccc",
        gap: 8,
        paddingTop: 60,
      }}
    >
      <div style={{ fontSize: 40 }}>🎉</div>
      <div style={{ fontSize: 16, fontWeight: 600, color: "#999" }}>
        {filter === "not" ? "모든 단어를 외웠어요!" : "단어가 없습니다"}
      </div>
    </div>
  );
}