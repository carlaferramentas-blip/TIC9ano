/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShieldAlert, Search, Cloud, Code, BookOpen, ChevronRight, Award, GraduationCap, Check } from 'lucide-react';
import { CourseModule, StudentProgress } from '../types';

interface ModuleListProps {
  modules: CourseModule[];
  progress: StudentProgress;
  onSelectModule: (module: CourseModule) => void;
  setCurrentTab: (tab: string) => void;
  totalCompletionPercent: number;
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  ShieldAlert: ShieldAlert,
  Search: Search,
  Cloud: Cloud,
  Code: Code
};

const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Segurança': { bg: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-100' },
  'Pesquisa': { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-100' },
  'Colaboração': { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-100' },
  'Programação': { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-100' }
};

export default function ModuleList({ modules, progress, onSelectModule, setCurrentTab, totalCompletionPercent }: ModuleListProps) {
  // Determine greeting depending on current time
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Bom dia';
    if (hours < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto py-6 px-4" id="modules-list-homepage">
      
      {/* Welcome Banner Card with custom details */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white rounded-3xl p-6 sm:p-10 shadow-md relative overflow-hidden text-left" id="welcome-banner">
        {/* Absolute design patterns */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full translate-x-12 -translate-y-12 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-44 h-44 bg-white/5 rounded-full translate-y-24 pointer-events-none" />

        <div className="relative z-10 space-y-4 max-w-xl">
          <span className="text-[10px] font-bold tracking-widest text-blue-200 font-mono bg-white/15 px-3 py-1 rounded-full uppercase">
            3.º Ciclo do Ensino Básico • 9.º Ano
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Aprende TIC de forma interativa!
          </h1>
          <p className="text-sm text-blue-100 leading-relaxed font-medium">
            {getGreeting()}, <strong className="text-white">{progress.studentName || 'Estudante'}</strong>! Esta plataforma foi desenhada pelo teu professor de Tecnologias de Informação e Comunicação para te ajudar a dominar as aprendizagens essenciais. Explore os temas abaixo, resolva os laboratórios e obtenha o teu diploma!
          </p>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={() => setCurrentTab('progresso')}
              className="bg-white text-blue-700 hover:bg-blue-50 font-extrabold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-sm flex items-center gap-1"
              id="btn-nav-to-profile-welcome"
            >
              Configurar Perfil Escolar
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid of the curricular Modules cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-800 text-left pl-1">Módulos Curriculares Oficiais</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="modules-card-grid">
          {modules.map((m) => {
            const RenderIcon = ICON_MAP[m.icon] || BookOpen;
            const colors = CATEGORY_COLORS[m.category] || CATEGORY_COLORS['Segurança'];

            // Calculate precise modular progression
            const readSubtopics = m.subtopics.filter((st, index) => 
              progress.completedSubtopics.includes(`${m.id}_${index}`)
            ).length;
            
            const exerciseCompleted = progress.completedExercises.includes(m.exercise.id);
            const quizScore = progress.quizHighScores[m.id];
            const hasQuizScore = quizScore !== undefined;

            const modProgPercent = Math.round(
              (readSubtopics / m.subtopics.length * 40) + 
              (exerciseCompleted ? 30 : 0) + 
              (hasQuizScore ? quizScore * 0.3 : 0)
            );

            return (
              <div 
                key={m.id}
                id={`module-card-${m.id}`}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300 transition-all p-6 sm:p-7 text-left space-y-6 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Badge & Icon upper line */}
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
                      {m.category}
                    </span>
                    <div className="p-2.5 rounded-xl bg-slate-50 text-slate-600 border border-slate-100">
                      <RenderIcon className="h-5 w-5" />
                    </div>
                  </div>

                  {/* Text labels */}
                  <div className="space-y-1.5">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 leading-tight">
                      {m.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {m.shortDescription}
                    </p>
                  </div>

                  {/* Checklist Summary */}
                  <div className="pt-2 border-t border-slate-100 grid grid-cols-3 gap-2 text-[10px] text-slate-400 font-mono">
                    <div>
                      <span>Leituras</span>
                      <strong className="block text-slate-700 text-xs mt-0.5">{readSubtopics} de {m.subtopics.length}</strong>
                    </div>
                    <div>
                      <span>Laboratório</span>
                      <strong className={`block text-xs mt-0.5 ${exerciseCompleted ? 'text-emerald-600 font-bold' : 'text-slate-600'}`}>
                        {exerciseCompleted ? 'Completo ✓' : 'Pendente'}
                      </strong>
                    </div>
                    <div>
                      <span>Ficha Aval.</span>
                      <strong className="block text-slate-700 text-xs mt-0.5">
                        {hasQuizScore ? `${quizScore}%` : '---'}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Card completion progress bar and button */}
                <div className="pt-2 space-y-4">
                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-slate-400 font-semibold font-mono">
                      <span>Progresso do Módulo</span>
                      <span>{modProgPercent}%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-blue-600 h-full rounded-full transition-all duration-300"
                        style={{ width: `${modProgPercent}%` }}
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectModule(m)}
                    className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-1 cursor-pointer"
                    id={`btn-studymodule-${m.id}`}
                  >
                    Estudar Módulo
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick guide and information card */}
      <div className="bg-emerald-50 rounded-3xl border border-emerald-100 p-6 flex flex-col sm:flex-row items-center gap-5 justify-between max-w-4xl mx-auto text-left" id="student-summary-strip">
        <div className="flex items-center gap-3.5">
          <div className="h-12 w-12 rounded-2xl bg-emerald-100 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-slate-800">Aprendizagens Prontas</h4>
            <p className="text-xs text-slate-650 text-slate-600">
              A plataforma está configurada para salvar dados localmente no teu navegador. Não precisas de registo ou da internet para manter os teus dados de escola salvos!
            </p>
          </div>
        </div>

        <div className="text-center sm:text-right">
          <span className="text-[10px] text-slate-400 font-mono uppercase block font-semibold">Progresso de Ano</span>
          <span className="text-2xl font-black text-emerald-600 font-mono">{totalCompletionPercent}%</span>
        </div>
      </div>

    </div>
  );
}
