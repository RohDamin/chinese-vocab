export const speak = (text) => {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "zh-CN";
    u.rate = 0.85;
  
    const voices = window.speechSynthesis.getVoices();
    const zhVoices = voices.filter(
      (v) => v.lang === "zh-CN" || v.lang === "zh_CN" || v.lang.startsWith("zh-CN")
    );
    const female = zhVoices.find((v) =>
      /ting-ting|lili|huihui|xiaoxiao|female/i.test(v.name)
    );
    u.voice = female || zhVoices[0] || voices.find((v) => v.lang.startsWith("zh")) || null;
  
    window.speechSynthesis.speak(u);
  };