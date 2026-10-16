import React, { useState } from 'react';
import { Delete, History } from 'lucide-react';
import { soundEngine } from '../../design-system/soundEngine';

export const CalculatorApp: React.FC<{ windowId: string }> = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const handleDigit = (digit: string) => {
    soundEngine.play('click');
    setDisplay((prev) => (prev === '0' || prev === 'Error' ? digit : prev + digit));
  };

  const handleOperator = (op: string) => {
    soundEngine.play('click');
    setEquation(`${display} ${op} `);
    setDisplay('0');
  };

  const handleClear = () => {
    soundEngine.play('click');
    setDisplay('0');
    setEquation('');
  };

  const handleBackspace = () => {
    soundEngine.play('click');
    setDisplay((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
  };

  const handleCalculate = () => {
    soundEngine.play('click');
    if (!equation) return;
    try {
      const fullExpr = `${equation}${display}`.replace(/×/g, '*').replace(/÷/g, '/');
      const sanitized = fullExpr.replace(/[^0-9+\-*/().]/g, '');
      // eslint-disable-next-line no-eval
      const result = Function(`'use strict'; return (${sanitized})`)();
      const resultStr = String(Number(result.toFixed(8)));
      setHistory((prev) => [`${fullExpr} = ${resultStr}`, ...prev.slice(0, 9)]);
      setDisplay(resultStr);
      setEquation('');
    } catch {
      setDisplay('Error');
    }
  };

  const handleSquare = () => {
    soundEngine.play('click');
    const val = parseFloat(display);
    if (!isNaN(val)) setDisplay(String(val * val));
  };

  const handleSqrt = () => {
    soundEngine.play('click');
    const val = parseFloat(display);
    if (!isNaN(val) && val >= 0) setDisplay(String(Math.sqrt(val)));
  };

  const handleInvert = () => {
    soundEngine.play('click');
    const val = parseFloat(display);
    if (!isNaN(val) && val !== 0) setDisplay(String(1 / val));
  };

  return (
    <div className="flex flex-col h-full bg-[var(--surface-base)] text-[var(--text-primary)] select-none">
      {/* Top Display */}
      <div className="p-4 border-b border-[var(--border-subtle)] bg-[var(--surface-acrylic)] flex flex-col items-end justify-center min-h-[90px]">
        <span className="text-xs text-[var(--text-muted)] font-mono min-h-[16px]">{equation}</span>
        <span className="text-3xl font-bold font-mono tracking-tight text-[var(--text-primary)] overflow-x-auto max-w-full">
          {display}
        </span>
      </div>

      {/* Calculator Buttons Grid */}
      <div className="flex-1 p-3 grid grid-cols-4 gap-2 bg-[var(--surface-base)]">
        {/* Row 1: Sci Operations */}
        <button
          onClick={handleInvert}
          className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:bg-[var(--border-medium)] text-xs font-semibold"
        >
          1/x
        </button>
        <button
          onClick={handleSquare}
          className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:bg-[var(--border-medium)] text-xs font-semibold"
        >
          x²
        </button>
        <button
          onClick={handleSqrt}
          className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:bg-[var(--border-medium)] text-xs font-semibold"
        >
          √x
        </button>
        <button
          onClick={() => handleOperator('÷')}
          className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] hover:bg-[var(--border-medium)] text-sm font-bold text-[var(--accent-primary)]"
        >
          ÷
        </button>

        {/* Row 2 */}
        <button
          onClick={handleClear}
          className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:bg-[var(--border-medium)] text-xs font-semibold text-amber-400"
        >
          C
        </button>
        <button
          onClick={handleBackspace}
          className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:bg-[var(--border-medium)] flex items-center justify-center"
        >
          <Delete className="w-4 h-4 text-[var(--text-secondary)]" />
        </button>
        <button
          onClick={() => { soundEngine.play('click'); setDisplay(String(-parseFloat(display))); }}
          className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:bg-[var(--border-medium)] text-xs font-semibold"
        >
          ±
        </button>
        <button
          onClick={() => handleOperator('×')}
          className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] hover:bg-[var(--border-medium)] text-sm font-bold text-[var(--accent-primary)]"
        >
          ×
        </button>

        {/* Row 3 */}
        <button onClick={() => handleDigit('7')} className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:bg-[var(--border-medium)] text-sm font-medium">7</button>
        <button onClick={() => handleDigit('8')} className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:bg-[var(--border-medium)] text-sm font-medium">8</button>
        <button onClick={() => handleDigit('9')} className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:bg-[var(--border-medium)] text-sm font-medium">9</button>
        <button onClick={() => handleOperator('-')} className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] hover:bg-[var(--border-medium)] text-sm font-bold text-[var(--accent-primary)]">-</button>

        {/* Row 4 */}
        <button onClick={() => handleDigit('4')} className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:bg-[var(--border-medium)] text-sm font-medium">4</button>
        <button onClick={() => handleDigit('5')} className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:bg-[var(--border-medium)] text-sm font-medium">5</button>
        <button onClick={() => handleDigit('6')} className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:bg-[var(--border-medium)] text-sm font-medium">6</button>
        <button onClick={() => handleOperator('+')} className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-elevated)] hover:bg-[var(--border-medium)] text-sm font-bold text-[var(--accent-primary)]">+</button>

        {/* Row 5 */}
        <button onClick={() => handleDigit('1')} className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:bg-[var(--border-medium)] text-sm font-medium">1</button>
        <button onClick={() => handleDigit('2')} className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:bg-[var(--border-medium)] text-sm font-medium">2</button>
        <button onClick={() => handleDigit('3')} className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:bg-[var(--border-medium)] text-sm font-medium">3</button>
        <button
          onClick={handleCalculate}
          className="row-span-2 p-3 rounded-xl bg-[var(--accent-primary)] hover:bg-[var(--accent-hover)] text-white text-lg font-bold shadow-md transition-colors flex items-center justify-center"
        >
          =
        </button>

        {/* Row 6 */}
        <button onClick={() => handleDigit('0')} className="col-span-2 p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:bg-[var(--border-medium)] text-sm font-medium">0</button>
        <button onClick={() => handleDigit('.')} className="p-3 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-card)] hover:bg-[var(--border-medium)] text-sm font-bold">.</button>
      </div>

      {/* History Drawer toggle */}
      {history.length > 0 && (
        <div className="p-2 border-t border-[var(--border-subtle)] bg-[var(--surface-acrylic)] text-[11px] text-[var(--text-muted)] flex items-center justify-between">
          <div className="flex items-center gap-1">
            <History className="w-3.5 h-3.5" />
            <span className="truncate">{history[0]}</span>
          </div>
        </div>
      )}
    </div>
  );
};
