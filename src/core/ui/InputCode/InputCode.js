import React, { useState, useRef } from "react";

import styles from "./index.module.scss";

export const InputCode = ({ length, label, loading, onComplete }) => {
  const [code, setCode] = useState([...Array(length)].map(() => ""));
  const inputs = useRef([]);

  const processInput = (e, slot) => {
    const num = e.target.value;
    if (/[^0-9]/.test(num)) return;
    const newCode = [...code];
    newCode[slot] = num;
    setCode(newCode);
    if (slot !== length - 1) {
      inputs.current[slot + 1].focus();
    }
    if (newCode.every((num) => num !== "")) {
      onComplete(newCode.join(""));
    }
  };

  const onPaste = (e, slot) => {
    const pasted = e.clipboardData.getData("text/plain");
    if (slot == 0 && pasted.length == length) {
      setCode(pasted.split(""));
      onComplete(pasted);
    }
  };

  const onKeyUp = (e, slot) => {
    if (e.keyCode === 8 && !code[slot] && slot !== 0) {
      const newCode = [...code];
      newCode[slot - 1] = "";
      setCode(newCode);
      inputs.current[slot - 1].focus();
    }
  };

  return (
    <div className={styles.codeInput}>
      <label className={styles.codeLabel}>{label}</label>
      <div className={styles.codeInputs}>
        {code.map((num, idx) => {
          return (
            <input
              key={idx}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={num}
              autoFocus={!code[0].length && idx === 0}
              readOnly={loading}
              onChange={(e) => processInput(e, idx)}
              onKeyUp={(e) => onKeyUp(e, idx)}
              onPaste={(e) => onPaste(e, idx)}
              ref={(ref) => inputs.current.push(ref)}
            />
          );
        })}
      </div>
    </div>
  );
};
