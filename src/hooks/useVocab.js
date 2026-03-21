// hooks/useVocab.js
import { useState, useEffect, useCallback } from "react";
import { INITIAL_WORDS } from "../data/words";
import { loadStatuses, saveStatuses as persistStatuses } from "../utils/storage";

export function useVocab() {
  const [words] = useState(INITIAL_WORDS);
  const [statuses, setStatuses] = useState({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("card");
  const [loaded, setLoaded] = useState(false);
  const [animDir, setAnimDir] = useState(null);

  // 초기 로드
  useEffect(() => {
    setStatuses(loadStatuses());
    setLoaded(true);
    window.speechSynthesis.getVoices(); // TTS 음성 목록 미리 로드
  }, []);

  // 저장
  const saveStatuses = useCallback((s) => {
    setStatuses(s);
    persistStatuses(s);
  }, []);

  // 필터링된 단어 목록
  const filtered = words.filter((w) => {
    if (filter === "memorized") return statuses[w.id] === "memorized";
    if (filter === "not") return statuses[w.id] !== "memorized";
    return true;
  });

  const current = filtered[currentIdx] || filtered[0];

  // 카드 이동
  const goTo = useCallback(
    (dir) => {
      setAnimDir(dir);
      setTimeout(() => {
        setShowAnswer(false);
        setCurrentIdx((i) => {
          if (dir === "next") return i < filtered.length - 1 ? i + 1 : 0;
          return i > 0 ? i - 1 : filtered.length - 1;
        });
        setAnimDir(null);
      }, 200);
    },
    [filtered.length]
  );

  // 암기 상태 토글
  const toggleStatus = useCallback(
    (id) => {
      const next = { ...statuses };
      if (next[id] === "memorized") {
        delete next[id];
      } else {
        next[id] = "memorized";
      }
      saveStatuses(next);
    },
    [statuses, saveStatuses]
  );

  // 필터/뷰 변경
  const changeFilter = useCallback((f) => {
    setFilter(f);
    setCurrentIdx(0);
    setShowAnswer(false);
  }, []);

  const changeView = useCallback((v) => {
    setView(v);
    setCurrentIdx(0);
    setShowAnswer(false);
  }, []);

  // 리스트에서 카드로 이동
  const goToCard = useCallback((wordId) => {
    const idx = filtered.findIndex((f) => f.id === wordId);
    setCurrentIdx(idx >= 0 ? idx : 0);
    setShowAnswer(false);
    setView("card");
  }, [filtered]);

  // 통계
  const memCount = words.filter((w) => statuses[w.id] === "memorized").length;
  const notCount = words.length - memCount;

  return {
    words,
    filtered,
    current,
    currentIdx,
    showAnswer,
    setShowAnswer,
    filter,
    view,
    loaded,
    animDir,
    statuses,
    memCount,
    notCount,
    goTo,
    toggleStatus,
    changeFilter,
    changeView,
    goToCard,
  };
}