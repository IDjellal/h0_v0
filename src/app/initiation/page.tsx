"use client";

import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/navigation/Navigation";
import { useEffect, useState } from "react";

interface InitiationStep {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'active' | 'completed';
  progress: number;
}

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  status: string;
  completion: number;
}

export default function InitiationPage() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [steps, setSteps] = useState<InitiationStep[]>([
    {
      id: 1,
      title: "NEURAL LINK",
      description: "Establishing secure connection to neural interface",
      status: 'active',
      progress: 0
    },
    {
      id: 2,
      title: "QUANTUM SYNC",
      description: "Synchronizing quantum state matrices",
      status: 'pending',
      progress: 0
    },
    {
      id: 3,
      title: "CORE ACCESS",
      description: "Initializing core system protocols",
      status: 'pending',
      progress: 0
    }
  ]);

  const projects: Project[] = [
    {
      id: 1,
      title: "NEURAL NETWORK ARCHITECTURE",
      category: "QUANTUM COMPUTING",
      description: "Advanced neural pathways optimization through quantum entanglement",
      status: "IN DEVELOPMENT",
      completion: 78
    },
    {
      id: 2,
      title: "TEMPORAL MATRIX",
      category: "CORE SYSTEMS",
      description: "Time-space manipulation framework for advanced computations",
      status: "EXPERIMENTAL",
      completion: 45
    },
    {
      id: 3,
      title: "CONSCIOUSNESS TRANSFER",
      category: "NEURAL INTERFACE",
      description: "Bi-directional consciousness streaming protocol",
      status: "CLASSIFIED",
      completion: 92
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSteps(prevSteps => {
        const newSteps = [...prevSteps];
        const activeStep = newSteps.find(step => step.status === 'active');
        
        if (activeStep) {
          activeStep.progress += 1;
          
          if (activeStep.progress >= 100) {
            activeStep.status = 'completed';
            const nextStep = newSteps.find(step => step.status === 'pending');
            if (nextStep) {
              nextStep.status = 'active';
            } else {
              setTimeout(() => setIsInitialized(true), 1000);
            }
          }
        }
        
        return newSteps;
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <Navigation />
      
      <main className="pt-32 px-8 pb-32">
        <motion.div 
          className="max-w-screen-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="mb-16">
            <motion.h1 
              className="text-2xl font-light tracking-[0.2em] text-zinc-400 mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              SYSTEM INITIATION
            </motion.h1>
            <motion.p 
              className="text-sm text-zinc-600 tracking-wider max-w-xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Initiating secure connection to HORUS core systems. Please maintain connection stability during the process.
            </motion.p>
          </div>

          <div className="grid gap-8">
            {steps.map((step, index) => (
              <motion.div 
                key={step.id}
                className="border border-zinc-800/50 bg-black/20 backdrop-blur-sm"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 * index }}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-sm font-mono text-zinc-500">
                        {String(step.id).padStart(2, '0')}
                      </div>
                      <div className="text-sm tracking-[0.2em] text-zinc-300">
                        {step.title}
                      </div>
                    </div>
                    <div className="text-sm text-zinc-600">
                      {step.status === 'completed' ? '100%' : 
                       step.status === 'active' ? `${step.progress}%` : 
                       'PENDING'}
                    </div>
                  </div>

                  <div className="relative h-[2px] bg-zinc-800/50">
                    <motion.div 
                      className="absolute inset-y-0 left-0 bg-emerald-500/50"
                      initial={{ width: 0 }}
                      animate={{ width: `${step.progress}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>

                  <div className="mt-4 text-xs text-zinc-600 tracking-wider">
                    {step.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-16 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <button className="px-12 py-4 border border-zinc-800/50 bg-black/20 backdrop-blur-sm text-zinc-400 text-sm tracking-[0.2em] hover:text-zinc-200 transition-colors">
              INITIALIZE SEQUENCE
            </button>
          </motion.div>

          <AnimatePresence>
            {isInitialized && (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-32"
              >
                <motion.h2 
                  className="text-xl font-light tracking-[0.2em] text-zinc-400 mb-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  ACTIVE PROJECTS
                </motion.h2>

                <div className="grid gap-8">
                  {projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.2 + index * 0.2 }}
                      className="border border-zinc-800/50 bg-black/20 backdrop-blur-sm hover:bg-black/30 transition-colors"
                    >
                      <div className="p-8">
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <div className="text-xs text-emerald-500/70 tracking-[0.2em] mb-2">
                              {project.category}
                            </div>
                            <h3 className="text-lg text-zinc-300 tracking-[0.1em]">
                              {project.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-xs text-zinc-500 tracking-[0.1em]">
                              {project.status}
                            </div>
                            <div className="text-xs font-mono text-zinc-400">
                              {project.completion}%
                            </div>
                          </div>
                        </div>

                        <p className="text-sm text-zinc-600 tracking-wide mb-6">
                          {project.description}
                        </p>

                        <div className="relative h-[2px] bg-zinc-800/50">
                          <div 
                            className="absolute inset-y-0 left-0 bg-emerald-500/30"
                            style={{ width: `${project.completion}%` }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
}
