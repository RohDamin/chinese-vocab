// utils/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

/**
 * 특정 단어장의 모든 학습 상태 가져오기
 * @returns { [wordId]: { meaning_memorized, hanzi_written, hanzi_memorized, updated_at } }
 */
export async function loadStatuses(sheetId) {
  const { data, error } = await supabase
    .from("word_status")
    .select("*")
    .eq("sheet_id", sheetId);

  if (error) {
    console.error("Failed to load statuses:", error);
    return {};
  }

  const map = {};
  data.forEach((row) => {
    map[row.word_id] = {
      meaning_memorized: row.meaning_memorized,
      hanzi_written: row.hanzi_written,
      hanzi_memorized: row.hanzi_memorized,
      updated_at: row.updated_at,
    };
  });
  return map;
}

/**
 * 학습 상태 업데이트 (upsert)
 */
export async function updateStatus(sheetId, wordId, field, value) {
  const { error } = await supabase
    .from("word_status")
    .upsert(
      {
        sheet_id: sheetId,
        word_id: wordId,
        [field]: value,
      },
      { onConflict: "sheet_id,word_id" }
    );

  if (error) {
    console.error("Failed to update status:", error);
  }
}