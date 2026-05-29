/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, CheckCircle, XCircle, ArrowRight, HelpCircle, Trophy, RotateCcw } from 'lucide-react';
import { QuizQuestion } from '../types';

interface QuizViewProps {
  moduleId: string;
  moduleTitle: string;
  questions: QuizQuestion[];
  highestScore: number | undefined;
  onQuizCompleted: (scorePercentage: number) => void;
  onClose: () => void;
}

export default function QuizView({ moduleId, moduleTitle, questions, highestScore, onQuizCompleted, onClose }: QuizViewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [answersLog, setAnswersLog] = useState<{ questionIndex: number; selectedIndex: number; isCorrect: boolean }[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  // Fallback if questions list is empty (should not happen)
  if (questions.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
        <p className="text-slate-500">Este módulo não tem testes de avaliação atualmente.</p>
        <button onClick={onClose} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-xl">Voltar</button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleSelectAnswer = (index: number) => {
    if (isAnswerSubmitted) return; // Prevent changing after submission
    setSelectedAnswerIndex(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswerIndex === null) return;
    
    const isCorrect = selectedAnswerIndex === currentQuestion.correctAnswerIndex;
    setAnswersLog([
      ...answersLog,
      {
        questionIndex: currentQuestionIndex,
        selectedIndex: selectedAnswerIndex,
        isCorrect
      }
    ]);
    setIsAnswerSubmitted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswerIndex(null);
      setIsAnswerSubmitted(false);
    } else {
      // Calculate final score
      const correctAnswersCount = answersLog.filter(a => a.isCorrect).length;
      const finalScorePercentage = Math.round((correctAnswersCount / questions.length) * 100);
      onQuizCompleted(finalScorePercentage);
      setIsFinished(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setIsAnswerSubmitted(false);
    setAnswersLog([]);
    setIsFinished(false);
  };

  if (isFinished) {
    const correctCount = answersLog.filter(a => a.isCorrect).length;
    const finalScore = Math.round((correctCount / questions.length) * 100);
    const passed = finalScore >= 75;

    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm text-center max-w-2xl mx-auto space-y-6" id="quiz-result-screen">
        <div className="flex justify-center">
          <div className={`p-4 rounded-full ${passed ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-500'}`}>
            <Trophy className="h-16 w-16 animate-pulse-soft" />
          </div>
        </div>

        <div className="space-y-2">
          <span className="text-[10px] font-bold tracking-wider font-mono text-slate-400 uppercase block">Teste Concluído • {moduleTitle}</span>
          <h2 className="text-3xl font-extrabold text-slate-800">
            {passed ? 'Bom Trabalho! Parabéns!' : 'Continua a Praticar!'}
          </h2>
          <p className="text-sm text-slate-500 max-w-sm mx-auto">
            {passed 
              ? 'Conseguiste uma excelente classificação no teste de avaliação de TIC de 9º ano' 
              : 'Podes reler os tópicos do módulo e repetir o teste para aumentares a tua nota escolar.'}
          </p>
        </div>

        {/* Visual score ring */}
        <div className="bg-slate-50 py-4 px-6 rounded-2xl max-w-xs mx-auto border border-slate-100 flex items-center justify-between">
          <div className="text-left">
            <span className="text-xs text-slate-400 block font-semibold uppercase">Pontuação Conseguida</span>
            <span className={`text-3xl font-black font-mono ${passed ? 'text-emerald-600' : 'text-amber-500'}`}>{finalScore}%</span>
          </div>
          <div className="text-right border-l border-slate-200 pl-4">
            <span className="text-xs text-slate-400 block font-semibold">Respostas</span>
            <span className="text-sm font-bold text-slate-700">{correctCount} de {questions.length} certas</span>
          </div>
        </div>

        {highestScore !== undefined && (
          <p className="text-xs text-slate-400">
            O teu recorde anterior neste módulo: <strong className="font-semibold">{highestScore}%</strong>
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={handleRestartQuiz}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1 text-sm shadow-sm"
            id="btn-restart-quiz"
          >
            <RotateCcw className="h-4 w-4" />
            Repetir Teste
          </button>
          <button
            onClick={onClose}
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-6 py-2.5 rounded-xl cursor-pointer transition-all text-sm"
            id="btn-quit-quiz-finished"
          >
            Voltar às Matérias
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden max-w-2xl mx-auto flex flex-col" id={`quiz-view-active-${moduleId}`}>
      {/* Quiz info banner */}
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold text-blue-600 font-mono tracking-wider uppercase bg-blue-50 px-2 py-0.5 rounded">Teste Interativo</span>
          <h2 className="text-sm font-bold text-slate-700 mt-1 lines-clamp-1">{moduleTitle}</h2>
        </div>
        <div className="text-right">
          <span className="text-xs text-slate-400 font-mono">Pergunta</span>
          <span className="text-sm font-bold text-slate-700 block font-mono">
            {currentQuestionIndex + 1} de {questions.length}
          </span>
        </div>
      </div>

      {/* Progress pipeline indicator */}
      <div className="w-full bg-slate-100 h-1">
        <div 
          className="bg-blue-600 h-full transition-all duration-300"
          style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
        />
      </div>

      {/* Main question body */}
      <div className="p-6 sm:p-8 space-y-6 flex-1">
        <div className="flex items-start gap-3">
          <div className="text-blue-500 bg-blue-50 p-2.5 rounded-xl shrink-0">
            <HelpCircle className="h-5 w-5" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-slate-800 text-left leading-snug">
            {currentQuestion.question}
          </h3>
        </div>

        {/* Options list */}
        <div className="space-y-3 pt-2">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedAnswerIndex === idx;
            const isCorrectOption = idx === currentQuestion.correctAnswerIndex;
            
            let btnStyle = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 bg-white text-slate-700';
            let checkIcon = null;

            if (isAnswerSubmitted) {
              if (isCorrectOption) {
                // Highlight the correct answer in green ALWAYS
                btnStyle = 'border-emerald-500 bg-emerald-50/50 text-emerald-800 ring-2 ring-emerald-50';
                checkIcon = <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0" />;
              } else if (isSelected && !isCorrectOption) {
                // Highlight the selected wrong answer in red
                btnStyle = 'border-rose-500 bg-rose-50/50 text-rose-800 ring-2 ring-rose-50';
                checkIcon = <XCircle className="h-5 w-5 text-rose-600 shrink-0" />;
              } else {
                // Mute rest of options after submission
                btnStyle = 'border-slate-200 bg-slate-50/20 text-slate-400 opacity-60';
              }
            } else if (isSelected) {
              // Option currently selected but not submitted
              btnStyle = 'border-blue-600 ring-2 ring-blue-100 bg-blue-50/30 text-blue-800';
            }

            return (
              <button
                key={idx}
                id={`option-choice-${idx}`}
                disabled={isAnswerSubmitted}
                onClick={() => handleSelectAnswer(idx)}
                className={`w-full text-left p-4 rounded-2xl border text-sm font-semibold flex items-center justify-between gap-3 transition-all ${btnStyle} ${
                  !isAnswerSubmitted && 'cursor-pointer'
                }`}
              >
                <span>{option}</span>
                {checkIcon}
              </button>
            );
          })}
        </div>

        {/* Informational Answer feedback box */}
        {isAnswerSubmitted && (
          <div className={`p-4 rounded-2xl border text-xs leading-relaxed space-y-1.5 transition-all text-left ${
            selectedAnswerIndex === currentQuestion.correctAnswerIndex 
              ? 'bg-emerald-50/80 border-emerald-100 text-emerald-800' 
              : 'bg-amber-50/80 border-amber-100 text-amber-850'
          }`} id="quiz-feedback-box">
            <h4 className="font-bold flex items-center gap-1 text-sm">
              {selectedAnswerIndex === currentQuestion.correctAnswerIndex ? '✓ Resposta Correta!' : '✗ Ups, resposta errada!'}
            </h4>
            <p>{currentQuestion.explanation}</p>
          </div>
        )}
      </div>

      {/* Control panel buttons */}
      <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
        <button
          onClick={onClose}
          className="text-slate-500 hover:text-slate-800 text-xs font-semibold cursor-pointer py-2 px-1"
          id="btn-quiz-exit-premature"
        >
          Desistir e Sair
        </button>

        {isAnswerSubmitted ? (
          <button
            onClick={handleNextQuestion}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-xl flex items-center gap-1 text-xs cursor-pointer shadow-sm ml-auto"
            id="btn-quiz-next"
          >
            {currentQuestionIndex + 1 === questions.length ? 'Ver Resultados' : 'Seguinte'}
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button
            disabled={selectedAnswerIndex === null}
            onClick={handleSubmitAnswer}
            className={`font-bold px-5 py-2 rounded-xl text-xs flex items-center gap-1 border transition-all ${
              selectedAnswerIndex === null 
                ? 'bg-slate-200 text-slate-400 border-slate-200 cursor-not-allowed' 
                : 'bg-emerald-600 hover:bg-emerald-700 border-emerald-600 text-white cursor-pointer shadow-sm'
            }`}
            id="btn-quiz-verify"
          >
            Validar Resposta
          </button>
        )}
      </div>
    </div>
  );
}
