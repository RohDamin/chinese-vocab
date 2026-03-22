// components/VocabListPage.jsx
import { COLORS } from "../styles/theme";

export default function VocabListPage({ vocabList, loading, onSelect }) {
  if (loading) {
    return (
      <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", color: "#999" }}>
        불러오는 중...
      </div>
    );
  }

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", overflow: "hidden", background: COLORS.bg }}>
      {/* 헤더 */}
      <div
        style={{
          flexShrink: 0,
          padding: "20px 20px 14px",
          paddingTop: "max(20px, env(safe-area-inset-top))",
          background: COLORS.white,
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.text }}>
          中文 단어장
        </div>
        <div style={{ fontSize: 13, color: COLORS.textLight, marginTop: 4 }}>
          단어장을 선택하세요
        </div>
      </div>

      {/* 단어장 목록 */}
      <div style={{ flex: 1, minHeight: 0, overflow: "auto", padding: "12px 16px max(12px, env(safe-area-inset-bottom))" }}>
      {(!vocabList || vocabList.length === 0) ? (
          <div style={{ textAlign: "center", padding: 40, color: "#ccc" }}>
            <div style={{ fontSize: 36, marginBottom: 8 }}>📚</div>
            <div style={{ fontSize: 14 }}>
              Google Sheets에 단어장을 추가하세요
            </div>
          </div>
        ) : (
          vocabList.map((vocab) => (
            <div
              key={vocab.id}
              onClick={() => onSelect(vocab)}
              style={{
                padding: "18px 20px",
                background: COLORS.white,
                borderRadius: 14,
                marginBottom: 10,
                boxShadow: COLORS.listShadow,
                borderLeft: `4px solid ${COLORS.orange}`,
                cursor: "pointer",
                transition: "transform .1s",
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <div style={{ fontSize: 17, fontWeight: 700, color: COLORS.text }}>
                {vocab.name}
              </div>
              {vocab.description && (
                <div style={{ fontSize: 13, color: COLORS.textLight, marginTop: 4 }}>
                  {vocab.description}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}