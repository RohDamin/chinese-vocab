const EMPTY_MESSAGES = {
  all: "단어가 없습니다",
  meaning_not: "뜻 암기할 단어가 없어요!",
  hanzi_not: "한자 암기할 단어가 없어요!",
  done: "아직 완료한 단어가 없어요",
};

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
      <div style={{ fontSize: 16, fontWeight: 600, color: "#999", textAlign: "center", padding: "0 20px" }}>
        {EMPTY_MESSAGES[filter] ?? "단어가 없습니다"}
      </div>
    </div>
  );
}