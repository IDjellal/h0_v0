"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/navigation/Navigation";

export default function Protocols() {
  const protocols = [
    {
      id: "alpha",
      name: "ALPHA PROTOCOL",
      description: "Analyse prédictive des tendances de marché basée sur l'intelligence collective",
      status: "ACTIVE",
      metrics: [
        { label: "ACCURACY", value: "98.2%" },
        { label: "SIGNALS", value: "24/7" },
        { label: "CONFIDENCE", value: "96.5%" }
      ],
      color: "#00ff9d"
    },
    {
      id: "beta",
      name: "BETA PROTOCOL",
      description: "Optimisation dynamique des portefeuilles en temps réel",
      status: "LEARNING",
      metrics: [
        { label: "EFFICIENCY", value: "99.1%" },
        { label: "TRADES", value: "1.2M" },
        { label: "PRECISION", value: "97.8%" }
      ],
      color: "#ff00b3"
    },
    {
      id: "omega",
      name: "OMEGA PROTOCOL",
      description: "Détection avancée des opportunités émergentes",
      status: "EVOLVING",
      metrics: [
        { label: "DETECTION", value: "94.7%" },
        { label: "PATTERNS", value: "3.4M" },
        { label: "RELIABILITY", value: "95.9%" }
      ],
      color: "#0088ff"
    }
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <Navigation />
      
      <main className="pt-32 px-8">
        <div className="max-w-screen-xl mx-auto">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-24"
          >
            <h1 className="text-4xl font-light tracking-[0.2em] text-zinc-300 mb-6">
              PROTOCOLS
            </h1>
            <p className="text-zinc-500 tracking-wider max-w-2xl">
              Suite d&apos;algorithmes quantiques interconnectés pour une optimisation maximale de vos investissements
            </p>
          </motion.div>

          {/* Protocols Grid */}
          <div className="grid gap-8">
            {protocols.map((protocol, index) => (
              <motion.div
                key={protocol.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className="border border-zinc-800/50 bg-black/20 backdrop-blur-sm p-8 relative group"
              >
                {/* Background Gradient */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${protocol.color} 0%, transparent 70%)`
                  }}
                />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-8">
                    <div>
                      <motion.div 
                        className="text-xs tracking-[0.2em] mb-2"
                        style={{ color: protocol.color }}
                      >
                        {protocol.status}
                      </motion.div>
                      <h2 className="text-2xl text-zinc-300 tracking-[0.1em]">
                        {protocol.name}
                      </h2>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-zinc-500 tracking-wide mb-8">
                    {protocol.description}
                  </p>

                  {/* Metrics */}
                  <div className="grid grid-cols-3 gap-8">
                    {protocol.metrics.map((metric) => (
                      <motion.div
                        key={metric.label}
                        whileHover={{ scale: 1.05 }}
                        className="border border-zinc-800/50 bg-black/20 backdrop-blur-sm p-4"
                      >
                        <div className="text-xs text-zinc-500 tracking-[0.2em] mb-2">
                          {metric.label}
                        </div>
                        <div className="text-xl text-zinc-300 font-light">
                          {metric.value}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <motion.button
                    className="mt-8 px-6 py-2 border border-zinc-800/50 text-zinc-400 text-sm tracking-[0.2em] hover:text-zinc-200 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    EXPLORER
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}