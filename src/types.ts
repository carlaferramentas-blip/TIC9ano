/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'single' | 'boolean';
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export type ExerciseType = 'html-editor' | 'code-blocks' | 'spreadsheet-query';

export interface CodeBlock {
  id: string;
  code: string;
  order: number;
}

export interface PracticalExercise {
  id: string;
  type: ExerciseType;
  title: string;
  description: string;
  task: string;
  initialCode?: string;
  targetOutput?: string;
  blocks?: CodeBlock[]; // For drag and drop code block arrangement
  spreadsheetData?: {
    headers: string[];
    rows: string[][];
  };
  spreadsheetQuestion?: {
    task: string;
    targetFormula: string;
    correctResult: string;
    feedback: string;
  };
}

export interface Subtopic {
  title: string;
  content: string[]; // List of paragraphs + bullet points
  keyConcepts: string[];
}

export interface CourseModule {
  id: string;
  title: string;
  category: 'Segurança' | 'Pesquisa' | 'Colaboração' | 'Programação';
  shortDescription: string;
  icon: string; // Lucide icon name
  objectives: string[];
  subtopics: Subtopic[];
  quiz: QuizQuestion[];
  exercise: PracticalExercise;
}

export interface StudentProgress {
  studentName: string;
  avatarId: string;
  completedSubtopics: string[]; // module_subtopicName
  quizHighScores: Record<string, number>; // moduleId -> percentage
  completedExercises: string[]; // exerciseId
}
