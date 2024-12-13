"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Navigation from "@/components/navigation/Navigation";
import { useRef } from "react";
import Link from "next/link";

export default function Home() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Transformations pour l'effet d'entrée
  const gridScale = useTransform(scrollYProgress, [0, 0.5], [1, 25]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.3], [0.1, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const backgroundScale = useTransform(scrollYProgress, [0.2, 0.8], [1, 1.5]);
  const gradientOpacity = useTransform(scrollYProgress, [0, 0.3, 0.5], [0.3, 1, 0]);


  return (
    <main className="min-h-screen bg-[#030303] text-white" ref={containerRef}>
      <Navigation />

      {/* Hero Section avec effet de transition */}
      <section className="h-screen flex items-center justify-center sticky overflow-hidden  top-0">
        {/* Background Effects */}
        <motion.div 
          className="absolute inset-0"
          style={{ scale: backgroundScale }}
        >
          {/* Grid Pattern */}
          <motion.div 
            className="absolute inset-0"
            style={{ 
              opacity: gridOpacity,
              scale: gridScale,
            }}
          >
            <div className="h-full w-full" 
                 style={{ 
                   backgroundImage: 'linear-gradient(to right, #00ff9d 1px, transparent 1px), linear-gradient(to bottom, #00ff9d 1px, transparent 1px)',
                   backgroundSize: '40px 40px'
                 }} 
            />
          </motion.div>
          
          {/* Radial Gradients */}
          <motion.div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(0,255,157,0.15) 0%, transparent 60%)',
              opacity: gradientOpacity,
              scale: backgroundScale
            }}
          />
          <motion.div 
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 70% 70%, rgba(0,136,255,0.1) 0%, transparent 60%)',
              opacity: gradientOpacity,
              scale: backgroundScale
            }}
          />
        </motion.div>

        {/* Contenu Hero */}
        <motion.div 
          className="text-center z-10 relative"
          style={{ opacity: contentOpacity }}
        >
          <h1 className="text-[12rem] font-light tracking-[0.2em] text-zinc-300 mb-20">
            HORUS
          </h1>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          style={{ opacity: contentOpacity }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-zinc-500 to-transparent mx-auto" />
        </motion.div>
      </section>

      {/* Transition Section */}
      <motion.div 
        className="h-screen bg-[#030303]"
        style={{
          opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1])
        }}
      />


      {/* Section Contact/CTA */}
      <motion.section 
        className="relative z-10 min-h-screen bg-[#030303] py-32 px-8 flex items-center"
        style={{
          opacity: useTransform(scrollYProgress, [0.8, 1], [0, 1])
        }}
      >
        <div className="max-w-screen-xl mx-auto text-center">
          <motion.h2 
            className="text-4xl font-light tracking-[0.2em] text-zinc-300 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            REJOIGNEZ LE FUTUR
          </motion.h2>
          <motion.p 
            className="text-xl text-zinc-500 tracking-wider mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Découvrez comment votre vision peut façonner l'avenir de l'investissement
          </motion.p>
          <Link href="/initiation">
            <motion.button
              className="px-8 py-3 border border-zinc-800/50 bg-black/20 backdrop-blur-sm text-zinc-400 text-sm tracking-[0.2em] hover:text-zinc-200 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              COMMENCER MAINTENANT
            </motion.button>
          </Link>
        </div>
      </motion.section>
    </main>
  );
}
