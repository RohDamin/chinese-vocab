// App.jsx
import { useVocab } from "./hooks/useVocab";
import VocabListPage from "./components/VocabListPage";
import Header from "./components/layout/Header";
import FilterTabs from "./components/common/FilterTabs";
import FlashCard from "./components/card/FlashCard";
import WordList from "./components/list/WordList";
import { COLORS } from "./styles/theme";

export default function App() {
  const {
    vocabList,
    selectedVocab,
    selectVocab,
    goBack,
    words,
    filtered,
    current,
    currentIdx,
    statuses,
    filter,
    view,
    loading,
    animDir,
    doneCount,
    notCount,
    meaningNotCount,
    hanziMemNotCount,
    goTo,
    randomSwipeActive,
    toggleRandomSwipe,
    toggleStatus,
    changeFilter,
    changeView,
    goToCard,
  } = useVocab();

  const shellStyle = {
    flex: 1,
    minHeight: 0,
    display: "flex",
    flexDirection: "column",
    width: "100%",
    maxWidth: 420,
    margin: "0 auto",
    height: "100%",
    overflow: "hidden",
    fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
    background: COLORS.bg,
  };

  // 단어장 미선택 → 목록 화면
  if (!selectedVocab) {
    return (
      <div style={shellStyle}>
        <VocabListPage
          vocabList={vocabList}
          loading={loading}
          onSelect={selectVocab}
        />
      </div>
    );
  }

  // 단어장 로딩 중
  if (loading) {
    return (
      <div style={{ ...shellStyle, justifyContent: "center", alignItems: "center", color: "#999" }}>
        불러오는 중...
      </div>
    );
  }

  // 학습 화면
  return (
    <div style={shellStyle}>
      <Header
        title={selectedVocab.name}
        view={view}
        doneCount={doneCount}
        notCount={notCount}
        onChangeView={changeView}
        onBack={goBack}
      />

      <FilterTabs
        filter={filter}
        totalCount={words.length}
        meaningNotCount={meaningNotCount}
        hanziMemNotCount={hanziMemNotCount}
        doneCount={doneCount}
        onChange={changeFilter}
      />

      <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", overflow: "hidden", background: COLORS.bg }}>
        {view === "card" ? (
          <FlashCard
            filtered={filtered}
            current={current}
            currentIdx={currentIdx}
            animDir={animDir}
            statuses={statuses}
            filter={filter}
            goTo={goTo}
            randomSwipeActive={randomSwipeActive}
            toggleRandomSwipe={toggleRandomSwipe}
            toggleStatus={toggleStatus}
          />
        ) : (
          <WordList
            filtered={filtered}
            statuses={statuses}
            filter={filter}
            onSelect={goToCard}
            onToggle={toggleStatus}
          />
        )}
      </div>
    </div>
  );
}