"use client";

import { motion } from "framer-motion";

export default function SystemStatus() {
  return (
    <div className="fixed bottom-12 left-12 space-y-2">
      <motion.div 
        className="text-[0.65rem] text-zinc-800 tracking-[0.5em] uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Ver. 0.1.0
      </motion.div>
      <motion.div 
        className="flex items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <div className="w-1 h-1 bg-emerald-500/50 rounded-full animate-pulse"></div>
        <span className="text-[0.65rem] text-zinc-800 tracking-[0.2em] uppercase">
          SYS • NOMINAL
        </span>
      </motion.div>
    </div>
  );
}