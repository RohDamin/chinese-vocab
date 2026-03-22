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
    showAnswer,
    setShowAnswer,
    filter,
    view,
    loading,
    animDir,
    doneCount,
    notCount,
    goTo,
    toggleStatus,
    changeFilter,
    changeView,
    goToCard,
  } = useVocab();

  // 단어장 미선택 → 목록 화면
  if (!selectedVocab) {
    return (
      <VocabListPage
        vocabList={vocabList}
        loading={loading}
        onSelect={selectVocab}
      />
    );
  }

  // 단어장 로딩 중
  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", color: "#999" }}>
        불러오는 중...
      </div>
    );
  }

  // 학습 화면
  return (
    <div
      style={{
        fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
        maxWidth: 420,
        margin: "0 auto",
        minHeight: "100vh",
        background: COLORS.bg,
        display: "flex",
        flexDirection: "column",
      }}
    >
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
        doneCount={doneCount}
        notCount={notCount}
        onChange={changeFilter}
      />

      {view === "card" ? (
        <FlashCard
          filtered={filtered}
          current={current}
          currentIdx={currentIdx}
          showAnswer={showAnswer}
          setShowAnswer={setShowAnswer}
          animDir={animDir}
          statuses={statuses}
          filter={filter}
          goTo={goTo}
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
  );
}