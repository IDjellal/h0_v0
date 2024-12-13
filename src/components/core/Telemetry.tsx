"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Telemetry() {
  const [activeNode, setActiveNode] = useState(0);
  const [pulseCount, setPulseCount] = useState(0);
  const [systemPhase, setSystemPhase] = useState("SCANNING");

  const phases = ["SCANNING", "ANALYZING", "PROCESSING", "SYNCING", "UPDATING"];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveNode(prev => (prev + 1) % 5);
      setPulseCount(prev => prev + 1);
      setSystemPhase(phases[Math.floor(Math.random() * phases.length)]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="fixed bottom-12 right-12 z-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      <div className="relative w-40 h-40">
        {/* Cercle extérieur rotatif */}
        <motion.div 
          className="absolute inset-0 border border-zinc-800/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />

        {/* Cercle intérieur avec effet de pulse */}
        <motion.div 
          className="absolute inset-4 border border-zinc-700/20 rounded-full"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Nodes avec leurs connexions */}
        <div className="relative w-full h-full">
          {[...Array(5)].map((_, i) => {
            const angle = (i * 2 * Math.PI) / 5;
            const x = 50 + 42 * Math.cos(angle);
            const y = 50 + 42 * Math.sin(angle);
            
            return (
              <div key={i}>
                <motion.div
                  className={`absolute w-2 h-2 ${
                    i === activeNode 
                      ? 'bg-cyan-400/70' 
                      : 'bg-zinc-700/50'
                  }`}
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%) rotate(45deg)',
                  }}
                  animate={{
                    scale: i === activeNode ? [1, 1.5, 1] : 1,
                    boxShadow: i === activeNode 
                      ? ['0 0 0px #22d3ee', '0 0 20px #22d3ee', '0 0 0px #22d3ee']
                      : 'none'
                  }}
                  transition={{ duration: 1 }}
                />
              </div>
            );
          })}

          {/* Lignes de connexion améliorées */}
          <svg className="absolute inset-0 w-full h-full" style={{ transform: 'rotate(-18deg)' }}>
            <motion.circle
              cx="50%"
              cy="50%"
              r="30%"
              fill="none"
              stroke="#27272710"
              strokeWidth="1"
              strokeDasharray="4 4"
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
            {[...Array(5)].map((_, i) => (
              <motion.line
                key={i}
                x1="50%"
                y1="50%"
                x2={`${50 + 42 * Math.cos((i * 2 * Math.PI) / 5)}%`}
                y2={`${50 + 42 * Math.sin((i * 2 * Math.PI) / 5)}%`}
                stroke={i === activeNode ? '#22d3ee30' : '#27272710'}
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                animate={{ 
                  pathLength: [0, 1, 0],
                  opacity: i === activeNode ? [0.1, 0.5, 0.1] : 0.1
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            ))}
          </svg>
        </div>

        {/* Interface centrale */}
        <div className="absolute inset-8 flex flex-col items-center justify-center">
          <motion.div 
            className="text-[0.65rem] text-cyan-500/70 tracking-[0.2em] font-light"
            key={systemPhase}
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
          >
            {systemPhase}
          </motion.div>
          <div className="text-[0.6rem] text-zinc-600 tracking-[0.1em] mt-1">
            {pulseCount.toString().padStart(4, '0')}
          </div>
        </div>

        {/* Indicateur de statut */}
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
          <div className="w-1 h-1 bg-emerald-500/50 rounded-full animate-pulse" />
          <div className="text-[0.65rem] text-zinc-600 tracking-[0.2em]">
            SYS_ACTIVE
          </div>
        </div>
      </div>
    </motion.div>
  );
}