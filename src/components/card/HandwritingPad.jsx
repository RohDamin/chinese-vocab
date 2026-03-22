import { useRef, useCallback, useEffect } from "react";
import { COLORS } from "../../styles/theme";

const DEFAULT_CANVAS_CSS = 140;
/** 상단 툴바(패딩+한 줄) 대략 높이 */
const TOOLBAR_CSS = 32;

/**
 * @param {string} wordKey - 단어 바뀔 때 캔버스 초기화
 * @param {number} [slotHeight] - 부모 슬롯 전체 높이(px). 주면 여기에 맞춰 캔버스 높이 계산, margin 없음
 */
export function HandwritingPad({ wordKey, slotHeight }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const drawingRef = useRef(false);
  const lastRef = useRef({ x: 0, y: 0 });

  const canvasCss =
    slotHeight != null
      ? Math.max(72, slotHeight - TOOLBAR_CSS - 2)
      : DEFAULT_CANVAS_CSS;

  const setupContext = useCallback(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const dpr = window.devicePixelRatio || 1;
    const w = Math.max(1, Math.floor(wrap.getBoundingClientRect().width));
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(canvasCss * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${canvasCss}px`;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = "#2a2a2a";
    ctx.lineWidth = 2.4;
  }, [canvasCss]);

  const clearCanvas = useCallback(
    (e) => {
      e?.stopPropagation?.();
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.restore();
      setupContext();
    },
    [setupContext]
  );

  useEffect(() => {
    setupContext();
    const wrap = wrapRef.current;
    if (!wrap || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => setupContext());
    ro.observe(wrap);
    return () => ro.disconnect();
  }, [setupContext, wordKey]);

  const getPos = useCallback((e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const r = canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }, []);

  const onPointerDown = useCallback(
    (e) => {
      e.stopPropagation();
      if (e.button !== undefined && e.button !== 0) return;
      drawingRef.current = true;
      lastRef.current = getPos(e);
      try {
        canvasRef.current?.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
    },
    [getPos]
  );

  const onPointerMove = useCallback(
    (e) => {
      e.stopPropagation();
      if (!drawingRef.current) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const p = getPos(e);
      ctx.beginPath();
      ctx.moveTo(lastRef.current.x, lastRef.current.y);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
      lastRef.current = p;
    },
    [getPos]
  );

  const onPointerUp = useCallback((e) => {
    e.stopPropagation();
    drawingRef.current = false;
    try {
      canvasRef.current?.releasePointerCapture(e.pointerId);
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <div
      ref={wrapRef}
      style={{
        height: slotHeight != null ? slotHeight : undefined,
        marginTop: slotHeight != null ? 0 : 10,
        borderRadius: 10,
        border: `1px solid ${COLORS.border}`,
        overflow: "hidden",
        background: "#fafafa",
        touchAction: "none",
        display: "flex",
        flexDirection: "column",
        boxSizing: "border-box",
      }}
      onPointerDown={(e) => e.stopPropagation()}
    >
      <div
        onPointerDown={(e) => e.stopPropagation()}
        style={{
          flexShrink: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "6px 10px",
          background: "#f0f0f0",
          fontSize: 11,
          fontWeight: 600,
          color: COLORS.textMuted,
        }}
      >
        <span>한자쓰기</span>
        <button
          type="button"
          onClick={clearCanvas}
          style={{
            border: `1px solid ${COLORS.border}`,
            background: COLORS.white,
            borderRadius: 8,
            padding: "4px 10px",
            fontSize: 11,
            fontWeight: 600,
            color: COLORS.textMuted,
            cursor: "pointer",
          }}
        >
          지우기
        </button>
      </div>
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: canvasCss,
          flexShrink: 0,
          cursor: "crosshair",
          touchAction: "none",
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      />
    </div>
  );
}
