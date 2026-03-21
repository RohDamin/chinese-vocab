const STORAGE_KEY = "chinese-vocab-status";
  
  export const loadStatuses = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  };
  
  export const saveStatuses = (statuses) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(statuses));
    } catch {
      console.error("Failed to save statuses");
    }
  };