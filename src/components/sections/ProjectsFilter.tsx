'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ColorVariant } from '@/types/ui';
import { ProjectCard } from '@/components/cards';

export interface ProjectItem {
  key: string;
  titulo: string;
  tipo: string;
  descripcion: string;
  estado: string;
  category: 'erasmus' | 'local';
  color: ColorVariant;
}

export interface ProjectsFilterProps {
  projects: ProjectItem[];
  filterLabels: {
    all: string;
    erasmus: string;
    local: string;
  };
}

export default function ProjectsFilter({ projects, filterLabels }: ProjectsFilterProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'erasmus' | 'local'>('all');

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.category === activeFilter;
  });

  const filters = [
    { key: 'all' as const, label: filterLabels.all },
    { key: 'erasmus' as const, label: filterLabels.erasmus },
    { key: 'local' as const, label: filterLabels.local },
  ];

  return (
    <div className="space-y-12">
      {/* Contenedor de Botones de Filtro */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 bg-gris-100 dark:bg-gris-900/50 rounded-full border border-gris-200/50 dark:border-gris-800/50 relative">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.key;
            return (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300 focus:outline-none z-10 cursor-pointer ${
                  isActive
                    ? 'text-white'
                    : 'text-gris-600 hover:text-negro dark:text-gris-400 dark:hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeFilterBg"
                    className="absolute inset-0 bg-gradient-to-r from-naranja to-terracota rounded-full shadow-md -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Animada de Proyectos */}
      <motion.div 
        layout 
        className="grid md:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.key}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCard
                type={project.tipo}
                title={project.titulo}
                description={project.descripcion}
                status={project.estado}
                color={project.color}
                className="h-full border border-gris-100 dark:border-gris-800 hover:shadow-lg dark:hover:shadow-black/30 transition-all duration-300"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
