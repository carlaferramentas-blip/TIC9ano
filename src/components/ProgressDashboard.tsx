/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Award, CheckCircle, RefreshCw, Trophy, User, Calendar, BookOpen, Star, AlertCircle, FileText } from 'lucide-react';
import { StudentProgress, CourseModule } from '../types';

interface ProgressDashboardProps {
  progress: StudentProgress;
  modules: CourseModule[];
  updateProgress: (updated: Partial<StudentProgress>) => void;
  resetProgress: () => void;
}

const AVATAR_OPTIONS = [
  { id: '1', color: 'bg-blue-500 text-white', label: '💻 Ciber-Estudante' },
  { id: '2', color: 'bg-emerald-500 text-white', label: '🛡️ Especialista Segurança' },
  { id: '3', color: 'bg-indigo-500 text-white', label: '⚡ Guru do HTML' },
  { id: '4', color: 'bg-rose-500 text-white', label: '🐍 Dev Python' },
  { id: '5', color: 'bg-amber-500 text-white', label: '☁️ Cloud Manager' }
];

export default function ProgressDashboard({ progress, modules, updateProgress, resetProgress }: ProgressDashboardProps) {
  const [nameInput, setNameInput] = useState(progress.studentName);
  const [isEditingName, setIsEditingName] = useState(false);
  const [selectedAvatarId, setSelectedAvatarId] = useState(progress.avatarId || '1');
  const [showCertificate, setShowCertificate] = useState(false);

  // Calculate detailed stats
  const totalSubtopics = modules.reduce((acc, mod) => acc + mod.subtopics.length, 0);
  const completedSubtopicsCount = progress.completedSubtopics.length;
  const subtopicPercent = totalSubtopics > 0 ? Math.round((completedSubtopicsCount / totalSubtopics) * 100) : 0;

  const totalExercises = modules.length;
  const completedExercisesCount = progress.completedExercises.length;
  const exercisePercent = totalExercises > 0 ? Math.round((completedExercisesCount / totalExercises) * 100) : 0;

  // Calculte Quiz stats
  const quizScoresList = Object.values(progress.quizHighScores);
  const averageQuizScore = quizScoresList.length > 0 
    ? Math.round(quizScoresList.reduce((acc, val) => acc + val, 0) / quizScoresList.length) 
    : 0;

  // Total calculated overall progression
  const totalCompletionPercent = Math.round((subtopicPercent * 0.4) + (exercisePercent * 0.3) + (averageQuizScore * 0.3));

  // Determine if student qualifies for certificate (e.g. let's say 80% progression or at least finish some main activities)
  const isQualifedForCertificate = totalCompletionPercent >= 70;

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      updateProgress({ studentName: nameInput.trim() });
      setIsEditingName(false);
    }
  };

  const handleSelectAvatar = (id: string) => {
    setSelectedAvatarId(id);
    updateProgress({ avatarId: id });
  };

  const currentAvatar = AVATAR_OPTIONS.find(av => av.id === selectedAvatarId) || AVATAR_OPTIONS[0];

  const todayStr = new Date().toLocaleDateString('pt-PT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-6 px-4" id="progress-dashboard-view">
      {/* Upper Profile and Avatar section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 relative overflow-hidden" id="profile-container">
        <div className="absolute top-0 right-0 w-64 h-64 bg-slate-50 rounded-full translate-x-32 -translate-y-32 -z-0 opacity-80" />
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            {/* Avatar Circle */}
            <div className={`h-24 w-24 rounded-2xl flex items-center justify-center font-black text-3xl shadow-inner ${currentAvatar.color}`}>
              {progress.studentName ? progress.studentName.charAt(0).toUpperCase() : 'A'}
            </div>
            
            <div className="space-y-2">
              <span className="text-[10px] font-bold tracking-widest text-[#2563eb] font-mono bg-blue-50 px-2.5 py-1 rounded-full uppercase">
                Perfil de Estudante
              </span>
              
              {isEditingName ? (
                <form onSubmit={handleSaveName} className="flex gap-2 items-center mt-1">
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="border-2 border-blue-500 rounded-xl px-3 py-1.5 text-base font-semibold focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="O teu nome completo"
                    maxLength={32}
                    required
                    id="input-student-name"
                  />
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm px-4 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
                    id="btn-save-name"
                  >
                    Gravar
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2 mt-1 justify-center sm:justify-start">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800" id="display-student-name">
                    {progress.studentName || 'Aluno Desconhecido'}
                  </h1>
                  <button
                    type="button"
                    onClick={() => {
                      setNameInput(progress.studentName);
                      setIsEditingName(true);
                    }}
                    className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 transition-all cursor-pointer"
                    title="Editar Nome"
                    id="btn-edit-name"
                  >
                    ✍️
                  </button>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start pt-1 text-xs text-slate-500">
                <span>Avatar: <strong>{currentAvatar.label}</strong></span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 min-w-[200px] w-full md:w-auto">
            <span className="text-xs font-semibold text-slate-400 font-mono tracking-wide uppercase block text-center md:text-right">
              Progresso Geral Integrado
            </span>
            <div className="flex items-baseline justify-center md:justify-end gap-1">
              <span className="text-5xl font-black text-blue-600 font-mono leading-none">{totalCompletionPercent}</span>
              <span className="text-xl font-bold text-slate-400 font-mono">%</span>
            </div>
            
            <div className="w-full md:w-56 bg-slate-100 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${totalCompletionPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Avatar customizer selection */}
        <div className="mt-8 border-t border-slate-100 pt-6">
          <label className="text-xs font-bold text-slate-500 font-mono tracking-wider uppercase block mb-3">
            Escolhe o teu Crachá de Aluno
          </label>
          <div className="flex flex-wrap gap-2.5">
            {AVATAR_OPTIONS.map((av) => (
              <button
                key={av.id}
                id={`avatar-choice-${av.id}`}
                onClick={() => handleSelectAvatar(av.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  selectedAvatarId === av.id
                    ? 'border-blue-600 ring-2 ring-blue-100 bg-blue-50 text-blue-700'
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-600 bg-white'
                }`}
              >
                <span className={`w-3 h-3 rounded-full ${av.color.split(' ')[0]}`} />
                {av.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid of Key Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6" id="stats-grid">
        {/* Readings */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm" id="stat-readings">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-sm font-semibold">Tópicos Estudados</span>
            <BookOpen className="h-5 w-5 text-indigo-500" />
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-bold text-slate-800">{completedSubtopicsCount}</span>
            <span className="text-sm text-slate-400">/ {totalSubtopics} lidos</span>
          </div>
          <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-indigo-500 h-full transition-all duration-500"
              style={{ width: `${subtopicPercent}%` }}
            />
          </div>
          <span className="text-[10px] text-indigo-500 font-mono mt-1.5 block font-semibold">{subtopicPercent}% do programa curricular escolar</span>
        </div>

        {/* Exercises */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm" id="stat-exercises">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-sm font-semibold">Exercícios Práticos</span>
            <CheckCircle className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-bold text-slate-800">{completedExercisesCount}</span>
            <span className="text-sm text-slate-400">/ {totalExercises} concluídos</span>
          </div>
          <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-505 h-full bg-emerald-500 transition-all duration-500"
              style={{ width: `${exercisePercent}%` }}
            />
          </div>
          <span className="text-[10px] text-emerald-500 font-mono mt-1.5 block font-semibold">{exercisePercent}% das metas computacionais completas</span>
        </div>

        {/* Quiz average */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm" id="stat-quizzes">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-sm font-semibold">Nota Média Testes</span>
            <Star className="h-5 w-5 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-1 mt-1">
            <span className="text-3xl font-bold text-slate-800">{averageQuizScore}</span>
            <span className="text-sm text-slate-400">% de nota final</span>
          </div>
          <div className="mt-3 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div 
              className="bg-amber-500 h-full transition-all duration-500"
              style={{ width: `${averageQuizScore}%` }}
            />
          </div>
          <span className="text-[10px] text-amber-500 font-mono mt-1.5 block font-semibold">
            {quizScoresList.length} de {modules.length} testes respondidos
          </span>
        </div>
      </div>

      {/* Diploma certificate unlock status */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative" id="certificate-unlock-panel">
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-500 rounded-full opacity-10 translate-x-40 -translate-y-40 pointer-events-none" />
        <div className="flex items-start gap-4">
          <div className="bg-amber-500/20 p-3.5 rounded-2xl text-amber-400 shrink-0">
            <Trophy className="h-8 w-8 animate-pulse-soft" />
          </div>
          <div className="space-y-2">
            <h2 className="text-lg sm:text-xl font-bold">Diploma de Competências TIC - 9º Ano</h2>
            <p className="text-sm text-slate-300 max-w-xl">
              Consolida a tua aprendizagem. Lê todos os tópicos das aulas, realiza os testes interativos de avaliação e conclui os desafios interativos para desbloquear o teu certificado escolar oficial.
            </p>
            {!isQualifedForCertificate && (
              <span className="text-xs text-amber-400 bg-amber-400/10 px-2 py-1 rounded inline-flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                Precisas de pelo menos 70% de progresso integrado (Presente em {totalCompletionPercent}%)
              </span>
            )}
          </div>
        </div>

        <div>
          {isQualifedForCertificate ? (
            <button
              onClick={() => setShowCertificate(true)}
              className="bg-amber-500 hover:bg-amber-600 hover:scale-102 text-slate-950 font-extrabold px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2 cursor-pointer inline-flex whitespace-nowrap self-stretch w-full sm:w-auto"
              id="btn-open-certificate"
            >
              <FileText className="h-5 w-5" />
              Obter Certificado
            </button>
          ) : (
            <button
              disabled
              className="bg-slate-800 text-slate-400 px-6 py-3 rounded-xl border border-slate-700 cursor-not-allowed text-xs font-semibold block"
              id="btn-blocked-certificate"
            >
              🔒 Bloqueado ({totalCompletionPercent}% de 70%)
            </button>
          )}
        </div>
      </div>

      {/* Subject checklist tracking per Module */}
      <div className="space-y-4" id="module-progress-checklist">
        <h2 className="text-lg font-bold text-slate-800 text-left">Progresso Detalhado por Módulo</h2>
        <div className="space-y-3">
          {modules.map((m) => {
            const modScore = progress.quizHighScores[m.id];
            const hasScore = modScore !== undefined;
            const exerciseCompleted = progress.completedExercises.includes(m.exercise.id);
            const readSubtopics = m.subtopics.filter((st, index) => 
              progress.completedSubtopics.includes(`${m.id}_${index}`)
            ).length;

            return (
              <div key={m.id} className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col md:flex-row justify-between gap-4" id={`checkpoint-modulo-${m.id}`}>
                <div className="space-y-1">
                  <h3 className="font-bold text-slate-800 text-left leading-snug">{m.title}</h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1.5">
                    {/* Reading Check */}
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      📚 <span className="font-semibold text-slate-700">{readSubtopics} de {m.subtopics.length}</span> leituras
                    </span>
                    {/* Exercise completion checkbox indicator */}
                    <span className="text-xs flex items-center gap-1 text-slate-500">
                      🛠️ Prática: {exerciseCompleted ? (
                        <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Resolvido</span>
                      ) : (
                        <span className="font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">Pendente</span>
                      )}
                    </span>
                    {/* Quiz score badge */}
                    <span className="text-xs flex items-center gap-1 text-slate-500">
                      📝 Teste: {hasScore ? (
                        <span className={`font-semibold px-2 py-0.5 rounded ${
                          modScore >= 75 ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'
                        }`}>
                          {modScore}% pontuação
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">Não realizado</span>
                      )}
                    </span>
                  </div>
                </div>

                <div className="flex items-center md:justify-end gap-2 shrink-0">
                  <div className="w-24 text-right pr-2">
                    <span className="text-xs text-slate-400 block font-mono">Conclusão</span>
                    <span className="text-sm font-bold text-slate-700 font-mono">
                      {Math.round(
                        (readSubtopics/m.subtopics.length * 40) + 
                        (exerciseCompleted ? 30 : 0) + 
                        (hasScore ? modScore * 0.3 : 0)
                      )}%
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Warning and Reset option */}
      <div className="border border-slate-200 rounded-2xl bg-white p-5 flex flex-col sm:flex-row items-center justify-between gap-4" id="admin-actions">
        <div className="text-center sm:text-left">
          <h4 className="text-sm font-bold text-slate-800">Recomeçar Aprendizagens</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-lg">
            Queres praticar tudo novamente ou partilhar este computador com outro aluno da turma? Podes apagar o histórico de progresso guardado localmente neste browser.
          </p>
        </div>
        <button
          onClick={() => {
            if (window.confirm('Tens a certeza absoluta que queres apagar todo o teu progresso escolar na plataforma do 9º Ano? Esta ação é irreversível.')) {
              resetProgress();
            }
          }}
          className="text-xs text-rose-600 hover:text-white border border-rose-200 hover:bg-rose-600 hover:border-rose-600 transition-all font-bold px-4 py-2 rounded-xl cursor-pointer flex items-center gap-1.5 shrink-0"
          id="btn-hard-reset-progress"
        >
          <RefreshCw className="h-3.5 w-3.5 animate-spin-hover" />
          Reiniciar Histórico
        </button>
      </div>

      {/* Printable / Viewable Certificate Modal Overlay */}
      {showCertificate && (
        <div className="fixed inset-0 bg-slate-950/80 z-50 flex items-center justify-center p-4 overflow-y-auto" id="certificate-modal">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-4 sm:p-8 relative">
            <button
              onClick={() => setShowCertificate(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800 cursor-pointer text-lg font-bold"
              id="close-certificate-modal"
              title="Fechar"
            >
              ✕
            </button>

            {/* Certificate proper */}
            <div className="bg-orange-50 border-[10px] border-amber-800 p-6 sm:p-12 text-slate-900 text-center rounded-2xl space-y-6 shadow-xl relative overflow-hidden" id="diploma-proper">
              {/* Internal graphical decorations for diploma */}
              <div className="absolute top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-amber-800/30 -translate-x-4 -translate-y-4" />
              <div className="absolute bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-amber-800/30 translate-x-4 translate-y-4" />

              <span className="text-[10px] font-black tracking-widest text-amber-800 font-mono block uppercase">
                REPÚBLICA PORTUGUESA • APRENDIZAGENS ESSENCIAIS
              </span>

              <h1 className="text-3xl sm:text-4xl font-serif font-extrabold text-amber-900">
                Certificado de Aproveitamento
              </h1>

              <div className="pt-2">
                <span className="text-slate-500 italic block text-sm">Certifica-se para todos os devidos efeitos legais que,</span>
                <span className="text-lg font-bold text-slate-600 font-mono block mt-1">O(A) ALUNO(A)</span>
                <h3 className="text-2xl sm:text-3xl font-black text-blue-900 border-b-2 border-amber-800/20 max-w-md mx-auto py-2">
                  {progress.studentName || 'Estudante Dedicado'}
                </h3>
              </div>

              <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                concluiu com sucesso o plano de estudos autodidata e interativo da disciplina de <strong className="text-slate-800">Tecnologias de Informação e Comunicação (TIC)</strong> do <strong className="text-slate-800">9º Ano de Escolaridade</strong>, com foco nas competências de segurança digital, investigação documental, trabalho colaborativo corporativo em nuvem e pensamento computacional algorítmico do século XXI.
              </p>

              {/* Badges indicators inside certificate */}
              <div className="flex justify-center gap-8 py-3">
                <div className="text-center">
                  <span className="text-xs text-slate-400 block">Classificação</span>
                  <span className="text-lg font-black font-mono text-emerald-600">Aproveit. Excelente ({averageQuizScore || 90}%)</span>
                </div>
                <div className="text-center">
                  <span className="text-xs text-slate-400 block">Emissão</span>
                  <span className="text-sm font-bold text-slate-600">{todayStr}</span>
                </div>
              </div>

              {/* Signatures and Stamp */}
              <div className="pt-4 grid grid-cols-2 gap-8 items-end max-w-md mx-auto">
                <div className="text-center border-t border-slate-300 pt-3">
                  <span className="text-xs text-slate-600 italic block font-serif">O Sistema Escolar Virtual</span>
                  <span className="text-[10px] text-slate-400 block font-mono font-semibold">CÓDIGO: TIC9-COMPLETO</span>
                </div>

                {/* Golden Badge Stamp */}
                <div className="flex justify-center shrink-0">
                  <div className="w-16 h-16 rounded-full bg-amber-400 border-4 border-dashed border-amber-600 flex items-center justify-center shadow rotate-12 relative animate-pulse-soft">
                    <span className="text-[10px] font-black text-amber-950 block text-center leading-tight">TIC 9º<br />APROVADO</span>
                    <div className="absolute -bottom-1 w-2 h-4 bg-amber-600 rounded-b-sm rotate-45 transform origin-top translate-x-1" />
                    <div className="absolute -bottom-1 w-2 h-4 bg-amber-600 rounded-b-sm -rotate-45 transform origin-top -translate-x-1" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.print()}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2.5 rounded-xl cursor-pointer transition-all flex items-center justify-center gap-1 text-sm shadow inline-flex"
                id="btn-print-certificate-real"
              >
                📥 Descarregar / Imprimir Documento
              </button>
              <button
                onClick={() => setShowCertificate(false)}
                className="bg-slate-800 text-slate-300 hover:text-white font-bold px-5 py-2.5 rounded-xl cursor-pointer transition-all text-sm"
                id="btn-dismiss-certificate-modal"
              >
                Voltar ao Progresso
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
