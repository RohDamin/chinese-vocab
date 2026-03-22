// hooks/useVocab.js
import { useState, useEffect, useCallback, useRef } from "react";
import { fetchVocabList, fetchWords } from "../utils/sheets";
import { loadStatuses, updateStatus } from "../utils/supabase";

export function useVocab() {
  // 단어장 목록
  const [vocabList, setVocabList] = useState([]);
  const [selectedVocab, setSelectedVocab] = useState(null); // { id, name, description }

  // 단어 & 상태
  const [words, setWords] = useState([]);
  const [statuses, setStatuses] = useState({});

  // UI 상태
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState("card");
  const [loading, setLoading] = useState(true);
  const [animDir, setAnimDir] = useState(null);
  /** 🎲 활성화 시 스와이프할 때마다 무작위 카드로 이동 */
  const [randomSwipeActive, setRandomSwipeActive] = useState(false);
  const randomSwipeRef = useRef(false);
  randomSwipeRef.current = randomSwipeActive;

  // 1) 앱 시작: 단어장 목록 로드
  useEffect(() => {
    (async () => {
      try {
        const list = await fetchVocabList();
        setVocabList(list);
      } catch (e) {
        console.error("Failed to load vocab list:", e);
      }
      setLoading(false);
    })();
    window.speechSynthesis.getVoices();
  }, []);

  // 2) 단어장 선택 시: 단어 + 상태 로드
  const selectVocab = useCallback(async (vocab) => {
    setSelectedVocab(vocab);
    setLoading(true);
    setCurrentIdx(0);
    setShowAnswer(false);
    setRandomSwipeActive(false);
    setFilter("all");
    setView("card");

    try {
      const [wordData, statusData] = await Promise.all([
        fetchWords(vocab.name),
        loadStatuses(vocab.name),
      ]);
      setWords(wordData);
      setStatuses(statusData);
    } catch (e) {
      console.error("Failed to load vocab:", e);
    }
    setLoading(false);
  }, []);

  // 단어장 목록으로 돌아가기
  const goBack = useCallback(() => {
    setSelectedVocab(null);
    setWords([]);
    setStatuses({});
    setCurrentIdx(0);
    setRandomSwipeActive(false);
  }, []);

  // 필터링
  const STATUS_FIELDS = ["meaning_memorized", "hanzi_written", "hanzi_memorized"];

  const filtered = words.filter((w) => {
    const s = statuses[w.id];
    if (filter === "done") {
      return s && STATUS_FIELDS.every((f) => s[f]);
    }
    if (filter === "meaning_not") {
      return !s?.meaning_memorized;
    }
    if (filter === "hanzi_not") {
      return !s?.hanzi_memorized;
    }
    return true;
  });

  const current = filtered[currentIdx] || filtered[0];

  // 카드 이동
  const goTo = useCallback(
    (dir) => {
      const len = filtered.length;
      setAnimDir(dir);
      setTimeout(() => {
        setShowAnswer(false);
        setCurrentIdx((i) => {
          if (randomSwipeRef.current && len > 1) {
            let j;
            do {
              j = Math.floor(Math.random() * len);
            } while (j === i);
            return j;
          }
          if (dir === "next") return i < len - 1 ? i + 1 : 0;
          return i > 0 ? i - 1 : len - 1;
        });
        setAnimDir(null);
      }, 200);
    },
    [filtered.length]
  );

  const toggleRandomSwipe = useCallback(() => {
    setRandomSwipeActive((v) => !v);
  }, []);

  // 상태 토글 (field = "meaning_memorized" | "hanzi_written" | "hanzi_memorized")
  const toggleStatus = useCallback(
    async (wordId, field) => {
      const current = statuses[wordId]?.[field] || false;
      const newValue = !current;

      // 낙관적 업데이트 (UI 먼저 반영)
      setStatuses((prev) => ({
        ...prev,
        [wordId]: {
          ...prev[wordId],
          [field]: newValue,
          updated_at: new Date().toISOString(),
        },
      }));

      // Supabase에 저장
      await updateStatus(selectedVocab.name, wordId, field, newValue);
    },
    [statuses, selectedVocab]
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

  const goToCard = useCallback(
    (wordId) => {
      const idx = filtered.findIndex((f) => f.id === wordId);
      setCurrentIdx(idx >= 0 ? idx : 0);
      setShowAnswer(false);
      setView("card");
    },
    [filtered]
  );

  // 통계
  const doneCount = words.filter((w) => {
    const s = statuses[w.id];
    return s && STATUS_FIELDS.every((f) => s[f]);
  }).length;
  const notCount = words.length - doneCount;
  /** 뜻 암기 미완료 */
  const meaningNotCount = words.filter((w) => !statuses[w.id]?.meaning_memorized).length;
  /** 한자 암기 미완료 */
  const hanziMemNotCount = words.filter((w) => !statuses[w.id]?.hanzi_memorized).length;

  return {
    // 단어장 목록
    vocabList,
    selectedVocab,
    selectVocab,
    goBack,

    // 단어 & 상태
    words,
    filtered,
    current,
    currentIdx,
    statuses,
    showAnswer,
    setShowAnswer,
    filter,
    view,
    loading,
    animDir,

    // 통계
    doneCount,
    notCount,
    meaningNotCount,
    hanziMemNotCount,

    // 액션
    goTo,
    randomSwipeActive,
    toggleRandomSwipe,
    toggleStatus,
    changeFilter,
    changeView,
    goToCard,
  };
}