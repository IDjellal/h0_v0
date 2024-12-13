"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";

type SystemStatus = {
  phase: string;
  subPhase: string;
  integrity: number;
  frequency: number;
};

export default function Navigation() {
  const [pulseCount, setPulseCount] = useState(0);
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    phase: "SYSTEM",
    subPhase: "OPERATIONAL",
    integrity: 100,
    frequency: 144.0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCount(prev => prev + 1);
      setSystemStatus(prev => ({
        ...prev,
        integrity: Math.min(100, prev.integrity + (Math.random() * 2 - 1)),
        frequency: Math.max(0, prev.frequency + (Math.random() * 0.4 - 0.2))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -20 }}
      animate={{ y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="bg-black/20 backdrop-blur-md border-b border-zinc-800/30">
        <div className="flex items-center justify-between px-8 py-3">
          {/* Logo */}
          <Link href="/">
            <motion.div 
              className="text-zinc-400 tracking-[0.3em] text-sm font-light w-[200px]"
              whileHover={{ color: "#fff" }}
            >
              HORUS
            </motion.div>
          </Link>

          {/* Enhanced Telemetry - Centered */}
          <div className="flex items-center gap-8">
            <motion.div 
              className="flex items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {/* Status Indicator */}
              <div className="flex items-center gap-3">
                <motion.div 
                  className="relative w-2 h-2"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="absolute inset-0 bg-emerald-500/50 rounded-full" />
                  <div className="absolute inset-0 bg-emerald-500/20 rounded-full animate-ping" />
                </motion.div>
                <div className="h-[20px] w-[1px] bg-zinc-800" />
              </div>

              {/* Phase Display */}
              <div className="flex flex-col items-start gap-0.5">
                <div className="text-[0.65rem] text-zinc-400 tracking-[0.2em]">
                  {systemStatus.phase}
                </div>
                <div className="text-[0.6rem] text-zinc-600 tracking-[0.15em]">
                  {systemStatus.subPhase}
                </div>
              </div>

              {/* Metrics */}
              <div className="flex items-center gap-4 border-l border-zinc-800/50 pl-4">
                <div className="flex flex-col items-end gap-0.5">
                  <div className="text-[0.6rem] text-zinc-500 tracking-[0.1em]">
                    INTEGRITY
                  </div>
                  <div className="text-[0.65rem] text-zinc-400 font-mono">
                    {systemStatus.integrity.toFixed(1)}%
                  </div>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <div className="text-[0.6rem] text-zinc-500 tracking-[0.1em]">
                    FREQ
                  </div>
                  <div className="text-[0.65rem] text-zinc-400 font-mono">
                    {systemStatus.frequency.toFixed(1)}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <div className="text-[0.6rem] text-zinc-500 tracking-[0.1em]">
                    PULSE
                  </div>
                  <div className="text-[0.65rem] text-zinc-400 font-mono">
                    {pulseCount.toString().padStart(4, '0')}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-12 w-[200px] justify-end">
            {["VISION", "PROTOCOLS", "INITIATION"].map((item) => (
              <motion.a
                key={item}
                href={`/${item.toLowerCase()}`}
                className="text-zinc-500 text-[0.65rem] tracking-[0.2em] hover:text-zinc-300 transition-colors relative group"
                whileHover={{ x: 5 }}
              >
                {item}
                <motion.div 
                  className="absolute -bottom-1 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"
                  layoutId="underline"
                />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}