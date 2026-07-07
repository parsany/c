import React, { useState, useEffect, useCallback, useRef } from "react";

const BOOT_SCRIPT: { text: string; pre?: number }[] = [
  { text: "> LOADING PROFILE...", pre: 0 },
  { text: "", pre: 40 },
  { text: "  IDENTITY ..  PARSANY", pre: 220 },
  { text: "  ROLE     ..  FULLSTACK DEVELOPER", pre: 60 },
  { text: "  LOCATION ..  OPEN TO RELOCATION  /  REMOTE", pre: 60 },
  { text: "", pre: 100 },
  { text: "> i love building things.", pre: 200 },
  { text: "> sometimes solo. sometimes in a team.", pre: 80 },
  { text: "> shipped to real users. looking for the next one.", pre: 80 },
  { text: "", pre: 60 },
  { text: ">> PRESS [ENTER] TO ACCESS TERMINAL", pre: 300 },
];

const CHAR_DELAY = 22;
const BLINK_MS = 530;

interface Props {
  onDone: () => void;
}

export default function TerminalIntro({ onDone }: Props) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [cursorOn, setCursorOn] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [screenFlicker, setScreenFlicker] = useState(false);

  const done = currentLine >= BOOT_SCRIPT.length;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (done) return;

    const line = BOOT_SCRIPT[currentLine];
    const lineLen = line.text.length;

    if (currentChar === 0) {
      timerRef.current = setTimeout(() => {
        if (lineLen === 0) {
          setVisibleLines((prev) => {
            const next = [...prev];
            next[currentLine] = 0;
            return next;
          });
          setCurrentLine((l) => l + 1);
          setCurrentChar(0);
        } else {
          setCurrentChar(1);
          setVisibleLines((prev) => {
            const next = [...prev];
            next[currentLine] = 1;
            return next;
          });
        }
      }, line.pre ?? 0);
    } else if (currentChar < lineLen) {
      timerRef.current = setTimeout(() => {
        const next = currentChar + 1;
        setCurrentChar(next);
        setVisibleLines((prev) => {
          const arr = [...prev];
          arr[currentLine] = next;
          return arr;
        });
      }, CHAR_DELAY);
    } else {
      timerRef.current = setTimeout(() => {
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }, 18);
    }

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [currentLine, currentChar, done]);

  useEffect(() => {
    const id = setInterval(() => setCursorOn((v) => !v), BLINK_MS);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const flicker = () => {
      setScreenFlicker(true);
      setTimeout(() => setScreenFlicker(false), 60 + Math.random() * 80);
    };
    const id = setInterval(flicker, 3800 + Math.random() * 4000);
    return () => clearInterval(id);
  }, []);

  const dismiss = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    setTimeout(onDone, 600);
  }, [exiting, onDone]);

  const handleClick = useCallback(() => {
    if (!done) {
      if (timerRef.current) clearTimeout(timerRef.current);
      const full = BOOT_SCRIPT.map((l) => l.text.length);
      setVisibleLines(full);
      setCurrentLine(BOOT_SCRIPT.length);
      setCurrentChar(0);
    } else {
      dismiss();
    }
  }, [done, dismiss]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleClick();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClick]);

  return (
    <div
      onClick={handleClick}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#050c05",
        cursor: "pointer",
        opacity: exiting ? 0 : 1,
        transition: "opacity 0.55s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.28) 2px, rgba(0,0,0,0.28) 4px)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.75) 100%)",
          pointerEvents: "none",
          zIndex: 3,
        }}
      />

      {screenFlicker && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(57,255,100,0.04)",
            pointerEvents: "none",
            zIndex: 4,
          }}
        />
      )}

      <div
        style={{
          position: "relative",
          zIndex: 5,
          width: "min(680px, 95vw)",
          maxHeight: "80vh",
          overflowY: "auto",
          padding: "clamp(1.25rem, 5vw, 2.5rem) clamp(1rem, 4vw, 2rem)",
          fontFamily: "'VT323', 'Courier New', monospace",
          fontSize: "clamp(13px, 3.5vw, 22px)",
          lineHeight: 1.55,
          color: "#3ddc62",
          textShadow: "0 0 6px rgba(61,220,98,0.85), 0 0 18px rgba(61,220,98,0.35)",
          letterSpacing: "0.04em",
          border: "1px solid rgba(61,220,98,0.22)",
          boxShadow:
            "0 0 0 1px rgba(61,220,98,0.08), inset 0 0 60px rgba(0,0,0,0.6), 0 0 80px rgba(61,220,98,0.07)",
          background: "rgba(2,14,4,0.92)",
        }}
      >
        {BOOT_SCRIPT.slice(0, currentLine + 1).map((line, i) => {
          const chars = visibleLines[i] ?? 0;
          const shown = line.text.slice(0, chars);
          const isActive = i === currentLine && !done;

          return (
            <div key={i} style={{ minHeight: "1.55em", whiteSpace: "pre-wrap" }}>
              {shown}
              {isActive && (
                <span
                  style={{
                    display: "inline-block",
                    width: "0.55em",
                    height: "1em",
                    background: cursorOn ? "#3ddc62" : "transparent",
                    verticalAlign: "text-bottom",
                    marginLeft: "1px",
                    boxShadow: cursorOn
                      ? "0 0 6px rgba(61,220,98,0.9)"
                      : "none",
                    transition: "background 0.05s",
                  }}
                />
              )}
            </div>
          );
        })}

        {done && (
          <div style={{ marginTop: "0.2em" }}>
            <span style={{ opacity: cursorOn ? 1 : 0, transition: "opacity 0.1s" }}>█</span>
          </div>
        )}
      </div>

      {!done && (
        <div
          style={{
            position: "absolute",
            bottom: "1.6rem",
            right: "2rem",
            fontFamily: "'VT323', monospace",
            fontSize: "14px",
            color: "rgba(61,220,98,0.4)",
            letterSpacing: "0.08em",
            zIndex: 6,
            pointerEvents: "none",
          }}
        >
          CLICK TO SKIP
        </div>
      )}
    </div>
  );
}
