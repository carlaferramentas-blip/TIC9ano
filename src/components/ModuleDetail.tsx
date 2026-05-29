/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, BookOpen, CheckCircle, ShieldAlert, Search, Cloud, Code, HelpCircle, GraduationCap, ChevronRight, PlayCircle, Star, AlertCircle } from 'lucide-react';
import { CourseModule, StudentProgress } from '../types';
import QuizView from './QuizView';
import PracticalExercise from './PracticalExercise';

interface ModuleDetailProps {
  module: CourseModule;
  progress: StudentProgress;
  onBack: () => void;
  onToggleSubtopicRead: (subtopicIndex: number) => void;
  onQuizCompleted: (scorePercentage: number) => void;
  onExerciseCompleted: () => void;
}

// Icon dictionary lookup helper
const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldAlert: ShieldAlert,
  Search: Search,
  Cloud: Cloud,
  Code: Code
};

export default function ModuleDetail({
  module,
  progress,
  onBack,
  onToggleSubtopicRead,
  onQuizCompleted,
  onExerciseCompleted
}: ModuleDetailProps) {
  const [activeSubtopicIdx, setActiveSubtopicIdx] = useState(0);
  const [activeMode, setActiveMode] = useState<'study' | 'quiz' | 'exercise'>('study');

  const HeroIcon = ICON_MAP[module.icon] || BookOpen;
  const currentSubtopic = module.subtopics[activeSubtopicIdx];

  // Check state helper
  const isSubtopicRead = (idx: number) => {
    return progress.completedSubtopics.includes(`${module.id}_${idx}`);
  };

  const isExerciseDone = () => {
    return progress.completedExercises.includes(module.exercise.id);
  };

  const getQuizHighScore = () => {
    return progress.quizHighScores[module.id];
  };

  // Stats calculation
  const totalSubtopics = module.subtopics.length;
  const completedSubtopicsCount = module.subtopics.filter((_, idx) => isSubtopicRead(idx)).length;
  const completionPercent = Math.round((completedSubtopicsCount / totalSubtopics) * 100);

  if (activeMode === 'quiz') {
    return (
      <div className="py-6" id="quiz-view-active-container">
        <div className="max-w-3xl mx-auto px-4 mb-4">
          <button
            onClick={() => setActiveMode('study')}
            className="text-slate-500 hover:text-slate-800 text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
            id="btn-quit-quiz-header"
          >
            ← Cancelar e Voltar à Aula
          </button>
        </div>
        <QuizView
          moduleId={module.id}
          moduleTitle={module.title}
          questions={module.quiz}
          highestScore={getQuizHighScore()}
          onQuizCompleted={onQuizCompleted}
          onClose={() => setActiveMode('study')}
        />
      </div>
    );
  }

  if (activeMode === 'exercise') {
    return (
      <div className="py-6" id="exercise-view-active-container">
        <div className="max-w-5xl mx-auto px-4 mb-4">
          <button
            onClick={() => setActiveMode('study')}
            className="text-slate-500 hover:text-slate-800 text-xs font-bold flex items-center gap-1 cursor-pointer transition-all"
            id="btn-quit-exercise-header"
          >
            ← Abandonar Laboratório Prático
          </button>
        </div>
        <PracticalExercise
          exercise={module.exercise}
          isCompletedBefore={isExerciseDone()}
          onExerciseCompleted={onExerciseCompleted}
          onClose={() => setActiveMode('study')}
        />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 space-y-8" id={`module-detail-${module.id}`}>
      {/* Upper Module header */}
      <div className="flex flex-col gap-6 md:flex-row md:items-center justify-between border-b border-slate-200 pb-6" id="detail-header">
        <div className="space-y-3">
          <button
            onClick={onBack}
            className="text-slate-500 hover:text-slate-800 text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
            id="btn-back-to-list"
          >
            ← Voltar para a Lista de Temas
          </button>

          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-2xl text-blue-700">
              <HeroIcon className="h-7 w-7" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-blue-600 font-mono tracking-wider">Unidade Curricular Escolar</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight text-left">
                {module.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Mini stats ring card */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 min-w-[240px]">
          <div className="flex-1 space-y-1">
            <span className="text-xs text-slate-400 block font-semibold text-left">Leitura de Tópicos</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-slate-800">{completedSubtopicsCount}</span>
              <span className="text-xs text-slate-400">de {totalSubtopics} lidos</span>
            </div>
            <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-500 h-full transition-all"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>
          <span className="text-2xl font-black text-emerald-500 font-mono shrink-0">{completionPercent}%</span>
        </div>
      </div>

      {/* Main double column container layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="module-body-split">
        
        {/* LEFT COLUMN: Subtopics reading list selection / Objectives sidebar */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Objectives Card */}
          <div className="bg-blue-50/70 border border-blue-100 p-5 rounded-2xl text-left" id="objectives-list-box">
            <h4 className="text-xs font-black tracking-wider uppercase text-blue-800 font-mono mb-3 flex items-center gap-1.5 header-objectivos">
              <GraduationCap className="h-4 w-4" /> Objetivos de Aprendizagem
            </h4>
            <ul className="space-y-2.5">
              {module.objectives.map((obj, i) => (
                <li key={i} className="text-xs text-slate-700 leading-relaxed flex items-start gap-2 select-none">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                  {obj}
                </li>
              ))}
            </ul>
          </div>

          {/* Subtopics clickable pipeline list */}
          <div className="space-y-3 text-left">
            <h4 className="text-xs font-bold text-slate-400 font-mono tracking-wider uppercase pl-1 block mb-2">
              Tópicos de Estudo (TIC 9º Ano)
            </h4>

            <div className="space-y-2" id="subtopics-sidebar-selector">
              {module.subtopics.map((st, idx) => {
                const isActive = activeSubtopicIdx === idx;
                const isRead = isSubtopicRead(idx);

                return (
                  <button
                    key={idx}
                    id={`subtopic-nav-btn-${idx}`}
                    onClick={() => setActiveSubtopicIdx(idx)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isActive
                        ? 'border-blue-600 bg-blue-50/20 text-blue-900 shadow-sm ring-2 ring-blue-50'
                        : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                        isRead ? 'bg-emerald-500' : 'bg-slate-300'
                      }`} />
                      <div>
                        <span className="text-xs font-bold text-slate-400 font-mono uppercase block">Unidade {idx + 1}</span>
                        <span className="text-sm font-semibold lines-clamp-1">{st.title}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {isRead && <span className="text-[10px] font-bold text-emerald-600 font-mono uppercase bg-emerald-50 px-1.5 py-0.5 rounded">Lido</span>}
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* QUIZ & EXERCISE ACCELERATOR BUTTONS PANEL */}
          <div className="bg-slate-900 text-white rounded-3xl p-5 space-y-4" id="module-evaluation-panel">
            <h4 className="text-xs font-extrabold tracking-widest text-slate-400 font-mono uppercase header-avaliacao">
              Avaliação do Módulo
            </h4>

            <div className="space-y-2.5">
              {/* Practical Exercise Box */}
              <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 flex flex-col justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded uppercase font-mono">
                    Atividade Prática
                  </span>
                  <h5 className="font-bold text-sm text-slate-100 text-left truncate">{module.exercise.title}</h5>
                  <p className="text-[11px] text-slate-400 text-left line-clamp-2">Laboratório prático computacional interativo.</p>
                </div>
                
                <button
                  onClick={() => setActiveMode('exercise')}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  id="btn-goto-exercise"
                >
                  {isExerciseDone() ? '🛠️ Repetir Laboratório' : '⚡ Iniciar Laboratório'}
                </button>
              </div>

              {/* Quiz Module Box */}
              <div className="bg-slate-800 rounded-2xl p-4 border border-slate-700 flex flex-col justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold bg-blue-500/20 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded uppercase font-mono">
                    Teste Teórico
                  </span>
                  <h5 className="font-bold text-sm text-slate-100 text-left">Ficha Autoavaliação</h5>
                  {getQuizHighScore() !== undefined ? (
                    <span className="text-xs text-amber-400 font-mono block text-left">Recorde: <strong>{getQuizHighScore()}%</strong></span>
                  ) : (
                    <p className="text-[11px] text-slate-400 text-left">Teste os seus conhecimentos com 4 perguntas.</p>
                  )}
                </div>
                
                <button
                  onClick={() => setActiveMode('quiz')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  id="btn-goto-quiz"
                >
                  <PlayCircle className="h-4 w-4" />
                  {getQuizHighScore() !== undefined ? '📝 Repetir Teste' : '📝 Iniciar Teste'}
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Actual content rendering of selected Subtopic */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 text-left space-y-8 min-h-[460px] flex flex-col justify-between" id="subtopic-content-canvas">
            
            <div className="space-y-6">
              {/* Header inside canvas */}
              <div className="border-b border-slate-100 pb-5">
                <span className="text-xs font-extrabold text-blue-600 font-mono uppercase bg-blue-50 px-2.5 py-1 rounded-full inline-block">
                  Tema {activeSubtopicIdx + 1} de {totalSubtopics}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-800 mt-2">
                  {currentSubtopic.title}
                </h3>
              </div>

              {/* Structured body paragraphs */}
              <div className="space-y-4 text-slate-600 text-sm leading-relaxed" id="subtopic-paragraphs">
                {currentSubtopic.content.map((paragraph, i) => (
                  <p key={i} className="align-left">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Key concepts highlight tags lists */}
              <div className="bg-slate-50 border border-slate-150 p-5 rounded-2xl space-y-2">
                <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-widest">Conceitos Chave do Tópico</h4>
                <div className="flex flex-wrap gap-2 pt-1">
                  {currentSubtopic.keyConcepts.map((concept, i) => (
                    <span
                      key={i}
                      className="bg-slate-200 text-slate-800 text-xs px-2.5 py-1 rounded-xl font-bold border border-slate-300"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Read completion checker controls */}
            <div className="pt-6 border-t border-slate-100 mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-left">
                <h5 className="text-sm font-bold text-slate-800">Concluíste a leitura do tópico?</h5>
                <p className="text-xs text-slate-400">Assinala por autoavaliação para registar no teu progresso de TIC!</p>
              </div>

              <button
                type="button"
                onClick={() => onToggleSubtopicRead(activeSubtopicIdx)}
                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-extrabold cursor-pointer transition-all ${
                  isSubtopicRead(activeSubtopicIdx)
                    ? 'bg-emerald-100 border border-emerald-200 text-emerald-800 hover:bg-emerald-200'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md ring-4 ring-emerald-50'
                }`}
                id="btn-toggle-read"
              >
                <CheckCircle className="h-4.5 w-4.5" />
                {isSubtopicRead(activeSubtopicIdx) ? '✓ Lido e Assinalado' : 'Marcar como Lido (+10% Progresso)'}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
