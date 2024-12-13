"use client";

import { motion } from "framer-motion";
import Navigation from "@/components/navigation/Navigation";
import { useEffect, useRef } from "react";

// Fonction pour créer l'animation des particules
const createParticleAnimation = (canvas: HTMLCanvasElement, startColor: string, endColor: string) => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles: any[] = [];
  const particleCount = 50;
  const connectionDistance = 100;
  const particleSize = 2;

  // Création des particules
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
    });
  }

  // Animation
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Mise à jour et dessin des particules
    particles.forEach((particle, i) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Rebond sur les bords
      if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

      // Dessin des particules
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particleSize, 0, Math.PI * 2);
      ctx.fillStyle = startColor;
      ctx.fill();

      // Connexions
      particles.forEach((particle2, j) => {
        if (i === j) return;
        const dx = particle.x - particle2.x;
        const dy = particle.y - particle2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.5;
          const gradient = ctx.createLinearGradient(
            particle.x, particle.y, particle2.x, particle2.y
          );
          gradient.addColorStop(0, `${startColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
          gradient.addColorStop(1, `${endColor}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
          
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(particle2.x, particle2.y);
          ctx.strokeStyle = gradient;
          ctx.stroke();
        }
      });
    });

    requestAnimationFrame(animate);
  };

  animate();

  return () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
};

export default function Vision() {
  const canvasRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  useEffect(() => {
    canvasRefs.current.forEach((canvas, index) => {
      if (canvas) {
        const colors = [
          ['#00ff9d', '#ff00b3'],
          ['#ff00b3', '#0088ff'],
          ['#0088ff', '#00ff9d']
        ];
        createParticleAnimation(canvas, colors[index][0], colors[index][1]);
      }
    });
  }, []);

  const visionSteps = [
    {
      id: "capture",
      title: "CAPTURE",
      subtitle: "VOTRE VISION",
      description: "Partagez votre vision du futur à travers notre interface intuitive. Que ce soit des tendances technologiques, sociétales ou environnementales, chaque aspect est analysé.",
      metrics: [
        { label: "PRÉCISION", value: "99.8%" },
        { label: "DIMENSIONS", value: "∞" }
      ],
      color: "#00ff9d"
    },
    {
      id: "analyze",
      title: "ANALYSE",
      subtitle: "QUANTIQUE",
      description: "Notre intelligence artificielle décompose votre vision en millions de points de données quantifiables, créant une empreinte unique de votre perspective.",
      metrics: [
        { label: "DONNÉES", value: "8.4M" },
        { label: "PATTERNS", value: "2.4K" }
      ],
      color: "#ff00b3"
    },
    {
      id: "transform",
      title: "TRANSFORMATION",
      subtitle: "STRATÉGIQUE",
      description: "Conversion de votre vision en stratégie d'investissement optimisée, alignant parfaitement vos convictions avec les opportunités du marché.",
      metrics: [
        { label: "OPTIMISATION", value: "97.2%" },
        { label: "ALIGNEMENT", value: "99.4%" }
      ],
      color: "#0088ff"
    }
  ];

  return (
    <div className="min-h-screen bg-[#030303] text-white">
      <Navigation />
      
      <main className="pt-32">
        {/* Hero Section */}
        <motion.section 
          className="px-8 mb-32"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="max-w-screen-xl mx-auto">
            <motion.h1 
              className="text-7xl font-light tracking-[0.2em] text-zinc-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              VISION
            </motion.h1>
            <motion.p 
              className="text-xl text-zinc-500 tracking-wider max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Transformez votre vision du futur en stratégie d'investissement optimisée grâce à notre intelligence quantique
            </motion.p>
          </div>
        </motion.section>

        {/* Vision Steps */}
        <section className="relative">
          {visionSteps.map((step, index) => (
            <motion.div
              key={step.id}
              className="min-h-screen flex items-center relative overflow-hidden"
            >
              {/* Canvas pour les particules */}
              <canvas
                ref={el => canvasRefs.current[index] = el}
                className="absolute inset-0 z-0"
              />

              <div className="w-full px-8 relative z-10">
                <div className="max-w-screen-xl mx-auto">
                  <div className={`flex ${index % 2 ? 'justify-end' : 'justify-start'}`}>
                    <motion.div 
                      className="max-w-xl"
                      initial={{ opacity: 0, x: index % 2 ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      <motion.div 
                        className="text-sm tracking-[0.2em] mb-2"
                        style={{ color: step.color }}
                      >
                        {step.subtitle}
                      </motion.div>
                      
                      <h2 className="text-4xl text-zinc-300 tracking-[0.1em] mb-6">
                        {step.title}
                      </h2>
                      
                      <p className="text-zinc-500 tracking-wide mb-12">
                        {step.description}
                      </p>

                      <div className="grid grid-cols-2 gap-4">
                        {step.metrics.map((metric) => (
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
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </section>

        {/* CTA Section */}
        <motion.section 
          className="py-32 px-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="max-w-screen-xl mx-auto text-center">
            <h2 className="text-3xl text-zinc-300 tracking-[0.2em] mb-8">
              COMMENCEZ VOTRE VOYAGE
            </h2>
            <p className="text-zinc-500 tracking-wider mb-12 max-w-2xl mx-auto">
              Découvrez comment votre vision unique peut façonner l'avenir de vos investissements
            </p>
            <motion.button
              className="px-8 py-3 border border-zinc-800/50 bg-black/20 backdrop-blur-sm text-zinc-400 text-sm tracking-[0.2em] hover:text-zinc-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              DÉMARRER MAINTENANT
            </motion.button>
          </div>
        </motion.section>
      </main>
    </div>
  );
}