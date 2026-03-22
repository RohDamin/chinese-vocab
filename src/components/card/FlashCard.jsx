// components/card/FlashCard.jsx
import { useRef, useCallback, useState } from "react";
import { COLORS } from "../../styles/theme";
import { CheckIcon } from "../icons/Icons";
import { EmptyState } from "../common/EmptyState";
import HanziBox from "./HanziBox";
import { CardInfo } from "./CardInfo";

/** 카드·스와이프 영역 좌우 여백 (px) */
const CARD_SIDE_PADDING = 24;

const STATUS_LABELS = [
  { field: "meaning_memorized", label: "뜻 암기", emoji: "📖" },
  { field: "hanzi_written", label: "한자 써봄", emoji: "✏️" },
  { field: "hanzi_memorized", label: "한자 암기", emoji: "🍊" },
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
  randomSwipeActive,
  toggleRandomSwipe,
  toggleStatus,
}) {
  const swipePointerId = useRef(null);
  const swipeStartX = useRef(0);
  const swipeStartY = useRef(0);
  const [writePracticeActive, setWritePracticeActive] = useState(false);

  const SWIPE_THRESHOLD = 56;

  const toggleWritePractice = useCallback(() => {
    setWritePracticeActive((v) => {
      const next = !v;
      if (next) setShowAnswer(true);
      return next;
    });
  }, [setShowAnswer]);

  const onSwipePointerDown = useCallback((e) => {
    if (e.button !== undefined && e.button !== 0) return;
    swipePointerId.current = e.pointerId;
    swipeStartX.current = e.clientX;
    swipeStartY.current = e.clientY;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  }, []);

  const endSwipe = useCallback(
    (e) => {
      if (swipePointerId.current === null || e.pointerId !== swipePointerId.current) return;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      swipePointerId.current = null;

      const dx = e.clientX - swipeStartX.current;
      const dy = e.clientY - swipeStartY.current;

      if (Math.abs(dx) < SWIPE_THRESHOLD) return;
      if (Math.abs(dx) < Math.abs(dy)) return;

      if (dx < 0) goTo("next");
      else goTo("prev");
    },
    [goTo]
  );

  const onSwipePointerUp = useCallback(
    (e) => {
      endSwipe(e);
    },
    [endSwipe]
  );

  const onSwipePointerCancel = useCallback(
    (e) => {
      if (swipePointerId.current === null || e.pointerId !== swipePointerId.current) return;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      swipePointerId.current = null;
    },
    []
  );

  if (filtered.length === 0) {
    return (
      <div style={{ flex: 1, minHeight: 0, overflow: "auto" }}>
        <EmptyState filter={filter} />
      </div>
    );
  }

  const wordStatus = statuses[current.id] || {};

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", overflow: "hidden", background: COLORS.bg }}>
      {/* 탭 아래 회색 영역: 랜덤만 (상단 흰 영역 높이 불변) */}
      <div
        style={{
          flexShrink: 0,
          padding: `6px ${CARD_SIDE_PADDING}px 0`,
          background: COLORS.bg,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <button
          type="button"
          onClick={() => toggleRandomSwipe()}
          title={randomSwipeActive ? "스와이프 무작위 끄기" : "스와이프 무작위 켜기"}
          aria-label={randomSwipeActive ? "스와이프 무작위 모드 끄기" : "스와이프 무작위 모드 켜기"}
          aria-pressed={randomSwipeActive}
          style={{
            width: 32,
            height: 32,
            padding: 0,
            borderRadius: 10,
            border: randomSwipeActive ? `2px solid ${COLORS.green}` : `1px solid ${COLORS.border}`,
            background: randomSwipeActive ? COLORS.green : COLORS.white,
            cursor: "pointer",
            fontSize: 15,
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: randomSwipeActive ? COLORS.white : COLORS.textMuted,
            boxShadow: randomSwipeActive ? "0 2px 6px rgba(46,160,90,.3)" : "0 1px 2px rgba(0,0,0,.06)",
          }}
        >
          🎲
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWritePractice();
          }}
          onPointerDown={(e) => e.stopPropagation()}
          title={writePracticeActive ? "한자쓰기 끄기" : "한자쓰기 (예문 자리에 필기)"}
          aria-label={writePracticeActive ? "한자쓰기 모드 끄기" : "한자쓰기 모드 켜기"}
          aria-pressed={writePracticeActive}
          style={{
            width: 32,
            height: 32,
            padding: 0,
            borderRadius: 10,
            border: writePracticeActive ? `2px solid ${COLORS.green}` : `1px solid ${COLORS.border}`,
            background: writePracticeActive ? COLORS.green : COLORS.white,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: writePracticeActive ? COLORS.white : COLORS.textMuted,
            boxShadow: writePracticeActive ? "0 2px 6px rgba(46,160,90,.3)" : "0 1px 2px rgba(0,0,0,.06)",
          }}
        >
          <span style={{ fontSize: 14, lineHeight: 1 }}>
            {STATUS_LABELS.find((s) => s.field === "hanzi_written")?.emoji ?? "✏️"}
          </span>
        </button>
      </div>

      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: `4px ${CARD_SIDE_PADDING}px 0`,
          touchAction: "none",
          overflow: "hidden",
        }}
        onPointerDown={onSwipePointerDown}
        onPointerUp={onSwipePointerUp}
        onPointerCancel={onSwipePointerCancel}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 340,
            background: COLORS.white,
            borderRadius: 18,
            boxShadow: COLORS.cardShadow,
            overflow: "hidden",
            transition: "opacity .2s, transform .2s",
            opacity: animDir ? 0.3 : 1,
            transform: animDir === "next" ? "translateX(-30px)" : animDir === "prev" ? "translateX(30px)" : "none",
          }}
        >
          <HanziBox hanzi={current.hanzi} />
          <CardInfo
            word={current}
            showAnswer={showAnswer}
            onReveal={() => setShowAnswer(true)}
            writePracticeActive={writePracticeActive}
          />
        </div>

        {/* 암기 상태 3단계 체크 */}
        <div style={{ display: "flex", gap: 8, marginTop: 10, width: "100%", maxWidth: 340 }}>
          {STATUS_LABELS.map(({ field, label, emoji }) => {
            const checked = wordStatus[field] || false;
            return (
              <button
                key={field}
                type="button"
                onClick={() => toggleStatus(current.id, field)}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 5,
                  padding: "8px 4px",
                  borderRadius: 12,
                  border: checked ? "none" : `1.5px solid #ddd`,
                  cursor: "pointer",
                  fontSize: 11,
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
        <div style={{ fontSize: 10, color: COLORS.textHint, marginTop: 4, visibility: wordStatus.updated_at ? "visible" : "hidden" }}>
          마지막 업데이트: {wordStatus.updated_at ? new Date(wordStatus.updated_at).toLocaleString("ko-KR") : "-"}
        </div>
      </div>

      {/* 진행 안내 */}
      <div
        style={{
          flexShrink: 0,
          padding: `10px ${CARD_SIDE_PADDING}px max(12px, env(safe-area-inset-bottom))`,
          width: "100%",
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: 14, color: COLORS.text, fontWeight: 600 }}>
          {currentIdx + 1} <span style={{ color: COLORS.textPlaceholder, fontWeight: 500 }}>/</span> {filtered.length}
        </div>
      </div>
    </div>
  );
}