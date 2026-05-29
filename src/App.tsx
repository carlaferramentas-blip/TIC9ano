/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import ModuleList from './components/ModuleList';
import ModuleDetail from './components/ModuleDetail';
import ProgressDashboard from './components/ProgressDashboard';
import { StudentProgress, CourseModule } from './types';
import { modulesData } from './data/modulesData';

const LOCAL_STORAGE_KEY = 'tic_9ano_plataforma_alunos';

const DEFAULT_PROGRESS: StudentProgress = {
  studentName: 'Aluno de TIC',
  avatarId: '1',
  completedSubtopics: [],
  quizHighScores: {},
  completedExercises: []
};

export default function App() {
  const [progress, setProgress] = useState<StudentProgress>(DEFAULT_PROGRESS);
  const [currentTab, setCurrentTab] = useState<string>('modulos'); // 'modulos' | 'progresso'
  const [selectedModule, setSelectedModule] = useState<CourseModule | null>(null);

  // Load progress from browser localStorage on start
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure defaults if fields are missing
        setProgress({
          studentName: parsed.studentName || DEFAULT_PROGRESS.studentName,
          avatarId: parsed.avatarId || DEFAULT_PROGRESS.avatarId,
          completedSubtopics: parsed.completedSubtopics || [],
          quizHighScores: parsed.quizHighScores || {},
          completedExercises: parsed.completedExercises || []
        });
      } catch (e) {
        console.error('Error reading localStorage student progress', e);
      }
    }
  }, []);

  // Sync state to local storage when changed
  const saveProgressState = (updatedState: StudentProgress) => {
    setProgress(updatedState);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedState));
  };

  const updateProgress = (partial: Partial<StudentProgress>) => {
    const next = { ...progress, ...partial };
    saveProgressState(next);
  };

  const resetProgress = () => {
    saveProgressState(DEFAULT_PROGRESS);
    setCurrentTab('modulos');
    setSelectedModule(null);
  };

  // Checkbox toggle handler for topic units
  const handleToggleSubtopicRead = (moduleId: string, subtopicIndex: number) => {
    const lookupKey = `${moduleId}_${subtopicIndex}`;
    let updatedCompleted = [...progress.completedSubtopics];
    
    if (updatedCompleted.includes(lookupKey)) {
      updatedCompleted = updatedCompleted.filter(k => k !== lookupKey);
    } else {
      updatedCompleted.push(lookupKey);
    }

    updateProgress({ completedSubtopics: updatedCompleted });
  };

  // Quiz completed score registry
  const handleQuizCompleted = (moduleId: string, scorePercentage: number) => {
    const updatedScores = { ...progress.quizHighScores };
    const currentHigh = updatedScores[moduleId] || 0;
    
    // Save only if it is a new highscore for that module exam!
    if (scorePercentage > currentHigh) {
      updatedScores[moduleId] = scorePercentage;
      updateProgress({ quizHighScores: updatedScores });
    }
  };

  // Practical exercise registry
  const handleExerciseCompleted = (exerciseId: string) => {
    if (!progress.completedExercises.includes(exerciseId)) {
      updateProgress({
        completedExercises: [...progress.completedExercises, exerciseId]
      });
    }
  };

  // Helper calculation formulas
  const totalSubtopics = modulesData.reduce((acc, mod) => acc + mod.subtopics.length, 0);
  const completedSubtopicsCount = progress.completedSubtopics.length;
  const subtopicPercent = totalSubtopics > 0 ? Math.round((completedSubtopicsCount / totalSubtopics) * 100) : 0;

  const totalExercises = modulesData.length;
  const completedExercisesCount = progress.completedExercises.length;
  const exercisePercent = totalExercises > 0 ? Math.round((completedExercisesCount / totalExercises) * 100) : 0;

  const quizScoresList = Object.values(progress.quizHighScores) as number[];
  const averageQuizScore = quizScoresList.length > 0 
    ? Math.round(quizScoresList.reduce((acc, val) => acc + val, 0) / quizScoresList.length) 
    : 0;

  // Integrated progression rating (Weighted formula: 40% readings + 30% quizzes + 30% lab practices)
  const totalCompletionPercent = Math.round((subtopicPercent * 0.4) + (exercisePercent * 0.3) + (averageQuizScore * 0.3));

  const handleSelectModuleFromList = (mod: CourseModule) => {
    setSelectedModule(mod);
    setCurrentTab(`mod_${mod.id}`);
  };

  const handleReturnToModuleList = () => {
    setSelectedModule(null);
    setCurrentTab('modulos');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans" id="applet-viewport">
      {/* Visual Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setCurrentTab(tab);
          if (tab === 'modulos') {
            setSelectedModule(null);
          }
        }}
        progress={progress}
        totalCompletionPercent={totalCompletionPercent}
      />

      {/* Main active workspace viewport */}
      <main className="flex-grow pb-16">
        <AnimatePresence mode="wait">
          {currentTab === 'modulos' && (
            <motion.div
              key="modulos-list-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ModuleList
                modules={modulesData}
                progress={progress}
                onSelectModule={handleSelectModuleFromList}
                setCurrentTab={setCurrentTab}
                totalCompletionPercent={totalCompletionPercent}
              />
            </motion.div>
          )}

          {currentTab === 'progresso' && (
            <motion.div
              key="progress-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ProgressDashboard
                progress={progress}
                modules={modulesData}
                updateProgress={updateProgress}
                resetProgress={resetProgress}
              />
            </motion.div>
          )}

          {currentTab.startsWith('mod_') && selectedModule && (
            <motion.div
              key={`mod-detail-view-${selectedModule.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <ModuleDetail
                module={selectedModule}
                progress={progress}
                onBack={handleReturnToModuleList}
                onToggleSubtopicRead={(subIndex) => handleToggleSubtopicRead(selectedModule.id, subIndex)}
                onQuizCompleted={(score) => handleQuizCompleted(selectedModule.id, score)}
                onExerciseCompleted={() => handleExerciseCompleted(selectedModule.exercise.id)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Humble Portuguese Platform footer */}
      <footer className="bg-white border-t border-slate-200 py-6" id="applet-footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-slate-400">
          <div>
            <span>© 2026 Plataforma de Estudo TIC 9º Ano Portugal</span>
            <span className="mx-2">•</span>
            <span>Apoio Digital ao Aluno</span>
          </div>
          <div className="font-mono text-[10px]">
            <span>Local Storage Ativo</span>
            <span className="mx-2">|</span>
            <span>Estática GitHub Pages Compatível</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
