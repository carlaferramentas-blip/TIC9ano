/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Check, Code, HelpCircle, RefreshCw, Smartphone, Play, Sparkles, ChevronUp, ChevronDown, CheckCircle, AlertTriangle, BookOpen, Layers } from 'lucide-react';
import { PracticalExercise as ExerciseType, CodeBlock } from '../types';

interface PracticalExerciseProps {
  exercise: ExerciseType;
  isCompletedBefore: boolean;
  onExerciseCompleted: () => void;
  onClose: () => void;
}

export default function PracticalExercise({ exercise, isCompletedBefore, onExerciseCompleted, onClose }: PracticalExerciseProps) {
  // Common states
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  // States for HTML Editor Exercise
  const [htmlCode, setHtmlCode] = useState(exercise.initialCode || '');
  const [previewKey, setPreviewKey] = useState(0);

  // States for Code Blocks Sorting Exercise
  const [draggableBlocks, setDraggableBlocks] = useState<CodeBlock[]>([]);

  // States for Spreadsheet Exercise
  const [selectedFormulaIndex, setSelectedFormulaIndex] = useState<number | null>(null);

  // Initialize specific exercise elements
  useEffect(() => {
    setIsSuccess(false);
    setErrorMessage(null);
    setShowHint(false);

    if (exercise.type === 'code-blocks' && exercise.blocks) {
      // Shuffle the blocks initially, making sure they are NOT already in the correct order!
      let shuffled = [...exercise.blocks];
      let attempts = 0;
      do {
        shuffled = shuffled.sort(() => Math.random() - 0.5);
        attempts++;
      } while (isCorrectSequence(shuffled) && attempts < 10);

      setDraggableBlocks(shuffled);
    }
    
    if (exercise.type === 'html-editor') {
      setHtmlCode(exercise.initialCode || '');
    }

    setSelectedFormulaIndex(null);
  }, [exercise]);

  // Helper to check if block sequence is correct
  const isCorrectSequence = (blocksArr: CodeBlock[]) => {
    return blocksArr.every((block, idx) => block.order === idx + 1);
  };

  // Up/Down movement triggers for sorting block puzzle (accessible & solid everywhere)
  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === draggableBlocks.length - 1) return;

    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const newBlocks = [...draggableBlocks];
    // Swap
    const temp = newBlocks[index];
    newBlocks[index] = newBlocks[targetIdx];
    newBlocks[targetIdx] = temp;

    setDraggableBlocks(newBlocks);
    setErrorMessage(null);
  };

  // Validations
  const handleValidateHtml = () => {
    // Check if they has edited the default name placeholder and has valid basic tags
    const normalized = htmlCode.toLowerCase();
    
    if (normalized.includes('nome é...')) {
      setErrorMessage('Ainda não personalizaste o teu nome! Substitui o texto "O Meu Nome é..." pelo teu nome real no código HTML.');
      return;
    }

    if (!normalized.includes('<h1') || !normalized.includes('</h1>')) {
      setErrorMessage('Oops! Precisas de manter ou incluir a tag de título principal <h1> para o cabeçalho virtual.');
      return;
    }

    if (!normalized.includes('<p') || !normalized.includes('</p>')) {
      setErrorMessage('Não removas a tag de parágrafo <p>. Adiciona um pequeno conteúdo ou explicação sobre ti.');
      return;
    }

    // Success!
    setIsSuccess(true);
    setErrorMessage(null);
    onExerciseCompleted();
  };

  const handleValidateBlocks = () => {
    if (isCorrectSequence(draggableBlocks)) {
      setIsSuccess(true);
      setErrorMessage(null);
      onExerciseCompleted();
    } else {
      setErrorMessage('Ups, a lógica do algoritmo ainda não está correta. Analisa a ordem linear das operações e das identações (espaços interiores) e tenta novamente!');
    }
  };

  const handleValidateSpreadsheet = () => {
    if (selectedFormulaIndex === null) {
      setErrorMessage('Por favor, seleciona um dos rascunhos de fórmulas do Excel apresentados para testar.');
      return;
    }

    if (selectedFormulaIndex === 0) { // First formula index has =CONTAR.SE
      setIsSuccess(true);
      setErrorMessage(null);
      onExerciseCompleted();
    } else {
      setErrorMessage('Incorreto. Essa fórmula retornará um erro ou fará uma operação errada. Tem atenção às colunas e aos critérios no Excel!');
    }
  };

  const handleResetHtml = () => {
    if (window.confirm('Queres repor o código HTML inicial? As tuas alterações serão perdidas.')) {
      setHtmlCode(exercise.initialCode || '');
      setPreviewKey(prev => prev + 1);
      setErrorMessage(null);
      setIsSuccess(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm max-w-5xl mx-auto overflow-hidden flex flex-col md:flex-row min-h-[500px]" id={`exercise-portal-${exercise.id}`}>
      
      {/* Left pane: Task description & Guidelines */}
      <div className="w-full md:w-5/12 bg-slate-50 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col justify-between">
        <div className="space-y-5">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-emerald-600 font-mono tracking-wider uppercase bg-emerald-100 px-2.5 py-0.5 rounded">Execução Prática</span>
            {isSuccess && (
              <span className="text-[10px] font-bold text-white font-mono uppercase bg-emerald-600 px-2 py-0.5 rounded flex items-center gap-0.5">
                <Check className="h-2.5 w-2.5" /> Resolvido
              </span>
            )}
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-800 text-left leading-tight">
            {exercise.title}
          </h2>

          <div className="text-sm text-slate-600 space-y-3 font-semibold text-left">
            <p className="leading-relaxed">{exercise.description}</p>
            <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-100 text-emerald-950 space-y-1.5">
              <h4 className="text-xs uppercase font-extrabold font-mono text-emerald-800">O Teu Objetivo:</h4>
              <p className="text-xs leading-relaxed font-normal">{exercise.task}</p>
            </div>
          </div>
        </div>

        {/* Buttons / Hints footer */}
        <div className="pt-6 border-t border-slate-200 mt-6 space-y-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowHint(!showHint)}
              className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
              id="btn-toggle-exercise-hint"
            >
              <HelpCircle className="h-4 w-4" />
              {showHint ? 'Ocultar Dica Útil' : 'Mostrar uma Dica'}
            </button>
            <span className="text-[10px] text-slate-400 font-mono">TIC 9º Ano</span>
          </div>

          {showHint && (
            <div className="bg-blue-50/85 border border-blue-100 text-blue-900 text-xs p-3.5 rounded-2xl leading-relaxed text-left" id="exercise-hint-text">
              {exercise.type === 'html-editor' && (
                <p><strong>Dica HTML:</strong> Altera o título <code>&lt;h1&gt;O Meu Nome é...&lt;/h1&gt;</code> para conter o teu nome verdadeiro, por exemplo, <code>O Meu Nome é Rodrigo</code>, e depois clica em "Verificar Solução"! Podes adicionar novos parágrafos se quiseres explorar.</p>
              )}
              {exercise.type === 'code-blocks' && (
                <p><strong>Dica de Algoritmia:</strong> O fluxo começa lendo os dados, depois verifica a condição de menor segurança (menor do que 8 car.), de seguida trata o caso de password forte enviando o código por SMS e, no fim, guarda no browser.</p>
              )}
              {exercise.type === 'spreadsheet-query' && (
                <p><strong>Dica de Cálculo:</strong> A correspondência de critérios em tabelas portuguesas utiliza <code>=CONTAR.SE(Intervalo; Critério)</code>. Recorda-te de fechar o critério em aspas "Sim".</p>
              )}
            </div>
          )}

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={onClose}
              className="text-xs text-slate-500 hover:text-slate-700 font-semibold cursor-pointer"
              id="btn-return-school-subjects"
            >
              Sair do Laboratório
            </button>
          </div>
        </div>
      </div>

      {/* Right pane: Playground / Interactive area */}
      <div className="flex-1 p-6 sm:p-8 flex flex-col justify-between" id="active-playground-canvas">
        <div className="space-y-6 flex-1">
          {/* HTML EDITOR LAB */}
          {exercise.type === 'html-editor' && (
            <div className="space-y-4 h-full flex flex-col" id="layout-html-editor">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 font-mono uppercase">Janela de Código HTML</span>
                <button
                  onClick={handleResetHtml}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer font-semibold"
                  id="btn-reset-html-code"
                >
                  <RefreshCw className="h-3 w-3" /> Repor Inicial
                </button>
              </div>

              {/* Code TextArea Editor Input */}
              <div className="relative">
                <textarea
                  value={htmlCode}
                  onChange={(e) => {
                    setHtmlCode(e.target.value);
                    setErrorMessage(null);
                  }}
                  className="w-full h-44 p-4 font-mono text-xs text-slate-800 bg-slate-900 border border-slate-700 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white leading-relaxed resize-none"
                  style={{ color: '#38bdf8' }}
                  spellCheck={false}
                  placeholder="Escreve o teu código HTML..."
                  id="textarea-html-code-input"
                />
              </div>

              {/* LIVE PREVIEW AREA */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-slate-500 font-mono uppercase flex items-center gap-1">
                  <Play className="h-3 w-3 text-emerald-500" /> Resultado Web em Tempo Real (Live Preview)
                </span>
                
                <div className="border border-slate-200 rounded-2xl min-h-[140px] bg-white p-4 overflow-y-auto max-h-[220px]" id="iframe-live-sandbox">
                  {/* Safely inject the current live HTML editor states */}
                  <div dangerouslySetInnerHTML={{ __html: htmlCode }} />
                </div>
              </div>
            </div>
          )}

          {/* CODE BLOCKS SORTING LAB */}
          {exercise.type === 'code-blocks' && (
            <div className="space-y-4" id="layout-code-blocks">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-bold text-slate-500 font-mono uppercase">Ordenar Linhas de Algoritmo</span>
                <span className="text-[10px] text-slate-400">Ordena utilizando os botões de subir/descer</span>
              </div>

              <div className="space-y-2" id="sorting-pool">
                {draggableBlocks.map((block, idx) => (
                  <div
                    key={block.id}
                    id={`block-line-${block.id}`}
                    className="flex items-center justify-between border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 p-3 rounded-xl transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center font-mono font-bold text-xs text-slate-500">
                        {idx + 1}
                      </span>
                      <pre className="font-mono text-xs text-slate-800 font-semibold overflow-x-auto">
                        {block.code}
                      </pre>
                    </div>

                    {/* Up/Down buttons block organizer */}
                    <div className="flex gap-1 shrink-0">
                      <button
                        onClick={() => moveBlock(idx, 'up')}
                        disabled={idx === 0}
                        className={`p-1 rounded-md border ${
                          idx === 0 
                            ? 'text-slate-300 border-slate-100 bg-slate-50 opacity-40 cursor-not-allowed' 
                            : 'text-slate-600 border-slate-200 bg-white hover:bg-slate-50 cursor-pointer'
                        }`}
                        title="Subir Bloco"
                        id={`btn-up-block-${idx}`}
                      >
                        <ChevronUp className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => moveBlock(idx, 'down')}
                        disabled={idx === draggableBlocks.length - 1}
                        className={`p-1 rounded-md border ${
                          idx === draggableBlocks.length - 1 
                            ? 'text-slate-300 border-slate-100 bg-slate-50 opacity-40 cursor-not-allowed' 
                            : 'text-slate-600 border-slate-200 bg-white hover:bg-slate-50 cursor-pointer'
                        }`}
                        title="Descer Bloco"
                        id={`btn-down-block-${idx}`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SPREADSHEET LAB */}
          {exercise.type === 'spreadsheet-query' && exercise.spreadsheetData && (
            <div className="space-y-5" id="layout-spreadsheet">
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-inner" id="spreadsheet-table-container">
                <div className="bg-slate-100 border-b border-slate-200 p-2.5 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 font-mono">Microsoft Excel Online - TIC 9ºANO.xlsx</span>
                  <div className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-slate-55 bg-slate-50 border-b border-slate-200">
                        <th className="p-2 border-r border-slate-200 text-slate-400 text-center font-mono w-8">#</th>
                        {exercise.spreadsheetData.headers.map((h, i) => (
                          <th key={i} className="p-2 px-3 font-semibold text-slate-600 border-r border-slate-200 font-mono">
                            {String.fromCharCode(65 + i)}
                          </th>
                        ))}
                      </tr>
                      <tr className="bg-slate-10 border-b border-slate-200 text-slate-400 text-[10px]">
                        <th className="p-1 border-r border-slate-200 text-center font-mono font-normal">1</th>
                        {exercise.spreadsheetData.headers.map((h, i) => (
                          <th key={i} className="p-1 px-3 font-bold border-r border-slate-200 text-slate-500 tracking-wide uppercase bg-slate-200/50">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {exercise.spreadsheetData.rows.map((row, rowIdx) => (
                        <tr key={rowIdx} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="p-2 border-r border-slate-200 text-slate-400 font-mono text-center bg-slate-50">{rowIdx + 2}</td>
                          {row.map((cell, cellIdx) => (
                            <td key={cellIdx} className="p-2 px-3 border-r border-slate-100 font-medium font-mono text-slate-700">
                              {cellIdx === 4 ? (
                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                  cell === 'Sim' ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'
                                }`}>
                                  {cell}
                                </span>
                              ) : cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Multiple choice form question selector */}
              {exercise.spreadsheetQuestion && (
                <div className="space-y-3 pt-2 text-left bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <h4 className="text-sm font-bold text-slate-800">
                    {exercise.spreadsheetQuestion.task}
                  </h4>

                  <div className="space-y-2 mt-4">
                    {[
                      { idx: 0, text: '=CONTAR.SE(E2:E5; "Sim")', desc: 'Fórmula padrão em Português' },
                      { idx: 1, text: '=SOMAR.SE(E2:E5; "Sim"; 1)', desc: 'Tenta somar o texto, provocando erro' },
                      { idx: 2, text: '=VERIFICAR(E2:E5 == "Sim")', desc: 'Inexistente no motor' },
                      { idx: 3, text: '=CONTAR.VALORES(E2:E5)', desc: 'Conta todos os valores, resultando em 4' }
                    ].map((formula) => {
                      const isOptionSelected = selectedFormulaIndex === formula.idx;
                      return (
                        <button
                          key={formula.idx}
                          id={`formula-option-${formula.idx}`}
                          disabled={isSuccess}
                          onClick={() => {
                            setSelectedFormulaIndex(formula.idx);
                            setErrorMessage(null);
                          }}
                          className={`w-full text-left p-3 px-4 rounded-xl border text-xs font-semibold font-mono flex items-center justify-between gap-3 transition-all ${
                            isOptionSelected 
                              ? 'border-blue-600 bg-blue-50/50 text-blue-800 ring-2 ring-blue-50' 
                              : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div>
                            <span className="block font-bold">{formula.text}</span>
                            <span className="block font-sans text-[10px] text-slate-400 mt-0.5 font-normal">{formula.desc}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Feedback Area & Final Activation Controls */}
        <div className="space-y-4 pt-4 border-t border-slate-200 mt-6 shrink-0">
          {/* Error Message Feedback Banner */}
          {errorMessage && (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-3 text-xs leading-relaxed text-amber-900 text-left" id="exercise-error-feedback">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0" />
              <div>
                <h4 className="font-bold text-amber-950">Validação Incompleta</h4>
                <p className="mt-0.5">{errorMessage}</p>
              </div>
            </div>
          )}

          {/* SUCCESS MESSAGE MODAL-LIKE BANNER PANEL */}
          {isSuccess && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-emerald-900 text-left space-y-2 animate-pulse-soft" id="exercise-success-feedback">
              <h3 className="font-extrabold text-sm flex items-center gap-1.5 text-emerald-950">
                <Sparkles className="h-5 w-5 text-emerald-600 shrink-0" /> Parabéns! Exercício Concluído!
              </h3>
              <p className="text-xs leading-relaxed">
                Excelente trabalho! Concluíste o desafio prático proposto para este módulo e demonstraste total domínio do conhecimento essencial de TIC do 9º Ano. {exercise.spreadsheetQuestion?.feedback}
              </p>
              <div className="pt-1.5">
                <span className="text-[10px] font-bold text-white font-mono uppercase bg-emerald-600 px-2.5 py-1 rounded-full">
                  Prática Registada +30% Progresso
                </span>
              </div>
            </div>
          )}

          {/* Main action submit validators buttons */}
          <div className="flex gap-3 justify-end">
            {isSuccess ? (
              <button
                onClick={onClose}
                className="bg-emerald-600 hover:bg-emerald-700 hover:scale-102 text-white font-extrabold px-6 py-3 rounded-2xl shadow-md cursor-pointer transition-all flex items-center gap-1.5 text-sm"
                id="btn-dismiss-success-exercise"
              >
                Voltar à Unidade de Estudo
              </button>
            ) : (
              <button
                onClick={
                  exercise.type === 'html-editor' 
                    ? handleValidateHtml 
                    : exercise.type === 'code-blocks' 
                      ? handleValidateBlocks 
                      : handleValidateSpreadsheet
                }
                className="bg-slate-900 hover:bg-slate-950 text-white font-extrabold px-6 py-3 rounded-2xl shadow-md cursor-pointer transition-all flex items-center gap-1 text-sm"
                id="btn-test-exercise-logic"
              >
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                Testar & Verificar Exercício
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
