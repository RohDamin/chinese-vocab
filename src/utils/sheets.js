// utils/sheets.js
const SHEET_ID = import.meta.env.VITE_SHEET_ID;
const BASE_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json`;

/**
 * Google Sheets 시트를 JSON으로 파싱
 * (Google Visualization API 응답에서 데이터 추출)
 */
function parseGoogleSheet(text) {
    const match = text.match(/google\.visualization\.Query\.setResponse\(({[\s\S]+})\)/);
    if (!match) throw new Error("Failed to parse Google Sheets response");
    
    const json = JSON.parse(match[1]);
    const cols = json.table.cols.map((c) => c.label);
    const rows = json.table.rows.map((r) =>
      Object.fromEntries(cols.map((col, i) => [col, r.c[i]?.v ?? ""]))
    );
    return rows;
  }

/**
 * 단어장 목록 가져오기 (시트 이름: "목록")
 * @returns [{ id, name, description }]
 */
export async function fetchVocabList() {
  const res = await fetch(`${BASE_URL}&sheet=목록`);
  const text = await res.text();
  return parseGoogleSheet(text);
}

/**
 * 특정 단어장의 단어 데이터 가져오기
 * @param sheetName 시트 이름 (예: "7과")
 * @returns [{ id, hanzi, pinyin, meaning, example, exPinyin, exMeaning }]
 */
export async function fetchWords(sheetName) {
  const res = await fetch(`${BASE_URL}&sheet=${encodeURIComponent(sheetName)}`);
  const text = await res.text();
  return parseGoogleSheet(text);
}