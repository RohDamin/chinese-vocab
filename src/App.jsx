// App.jsx
import { useVocab } from "./hooks/useVocab";
import Header from "./components/layout/Header";
import FilterTabs from "./components/common/FilterTabs";
import FlashCard from "./components/card/FlashCard";
import WordList from "./components/list/WordList";

export default function App() {
  const {
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
  } = useVocab();

  if (!loaded) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", fontFamily: "sans-serif", color: "#999" }}>
        불러오는 중...
      </div>
    );
  }

  return (
    <div
      style={{
        fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
        maxWidth: 420,
        margin: "0 auto",
        minHeight: "100vh",
        background: "#FAFAFA",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header
        view={view}
        memCount={memCount}
        notCount={notCount}
        onChangeView={changeView}
      />

      <FilterTabs
        filter={filter}
        totalCount={words.length}
        memCount={memCount}
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