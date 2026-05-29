/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BookOpen, Award, User, Menu, X, ShieldAlert, Search, Cloud, Code } from 'lucide-react';
import { StudentProgress } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  progress: StudentProgress;
  totalCompletionPercent: number;
}

export default function Navbar({ currentTab, setCurrentTab, progress, totalCompletionPercent }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Helper to choose right module icons in mini summary
  const getAvatarLetter = () => {
    return progress.studentName ? progress.studentName.charAt(0).toUpperCase() : 'A';
  };

  const menuItems = [
    { id: 'modulos', label: 'Módulos de TIC', icon: BookOpen },
    { id: 'progresso', label: 'O Meu Progresso', icon: Award },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40" id="nav-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => setCurrentTab('modulos')}
              className="flex items-center gap-2 cursor-pointer group text-left"
              id="logo-button"
            >
              <div className="bg-gradient-to-tr from-blue-600 to-indigo-600 p-2.5 rounded-xl text-white shadow-sm ring-4 ring-blue-50 group-hover:scale-105 transition-all">
                <Code className="h-5 w-5" />
              </div>
              <div>
                <span className="font-bold text-lg text-slate-800 block leading-tight">TIC 9º Ano</span>
                <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">Plataforma Escolar</span>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id || (item.id === 'modulos' && currentTab.startsWith('mod_'));
              return (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-slate-100 text-blue-600'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </button>
              );
            })}

            {/* Quick Profile Widget */}
            <div className="ml-4 pl-4 border-l border-slate-200 flex items-center gap-3">
              <div className="text-right">
                <span className="text-xs font-semibold text-slate-700 block max-w-[120px] truncate">
                  {progress.studentName || 'Aluno Desconhecido'}
                </span>
                <span className="text-[10px] font-semibold text-emerald-500 bg-emerald-50 px-1.5 py-0.5 rounded">
                  {totalCompletionPercent}% Completo
                </span>
              </div>
              <button
                onClick={() => setCurrentTab('progresso')}
                className="h-10 w-10 rounded-full bg-blue-100 border border-blue-200 hover:bg-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm transition-all shadow-inner"
                title="Configurar Perfil"
                id="btn-profile-widget"
              >
                {getAvatarLetter()}
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none"
              aria-expanded="false"
              id="mobile-menu-hamburger"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white" id="mobile-menu-container">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id || (item.id === 'modulos' && currentTab.startsWith('mod_'));
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-item-${item.id}`}
                  onClick={() => {
                    setCurrentTab(item.id);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-base font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              );
            })}

            {/* Mobile Profile Display */}
            <div className="p-3 border-t border-slate-100 mt-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700 font-bold text-sm">
                  {getAvatarLetter()}
                </div>
                <div>
                  <span className="text-sm font-semibold text-slate-800 block">
                    {progress.studentName || 'Aluno'}
                  </span>
                  <span className="text-xs text-slate-500">Progresso Geral: {totalCompletionPercent}%</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setCurrentTab('progresso');
                  setIsOpen(false);
                }}
                className="text-xs text-blue-600 font-bold hover:underline"
                id="btn-edit-mobile-profile"
              >
                Gerir Perfil
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
