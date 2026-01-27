'use client';

import { useTranslation } from '../../hooks/useTranslation';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

function FloatingShape({ delay, duration, size, color, startX, startY }) {
  return (
    <div
      className="absolute rounded-full opacity-20 blur-xl"
      style={{
        width: size,
        height: size,
        background: color,
        left: startX,
        top: startY,
        animation: `float-shape ${duration}s ease-in-out ${delay}s infinite`,
      }}
    />
  );
}

function AnimatedWord({ word, delay, isVisible }) {
  return (
    <span
      className="inline-block transition-all duration-700"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {word}&nbsp;
    </span>
  );
}

export function StatementSection() {
  const { t } = useTranslation();
  const { ref, isVisible: isInView } = useScrollAnimation({ threshold: 0.2 });

  const title1Words = t('home.statement.title1').split(' ');
  const title2Words = t('home.statement.title2').split(' ');
  const descriptionWords = t('home.statement.description').split(' ');

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 flex items-center justify-center px-6 overflow-hidden"
      style={{ background: '#0f172a' }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 30% 20%, rgba(232, 93, 76, 0.15) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
          animation: 'pulse-gradient 8s ease-in-out infinite',
        }}
      />

      <div className="absolute inset-0 pointer-events-none">
        <FloatingShape delay={0} duration={20} size="300px" color="#e85d4c" startX="10%" startY="20%" />
        <FloatingShape delay={2} duration={25} size="200px" color="#3b82f6" startX="70%" startY="60%" />
        <FloatingShape delay={4} duration={18} size="150px" color="#22c55e" startX="80%" startY="10%" />
        <FloatingShape delay={1} duration={22} size="250px" color="#e85d4c" startX="20%" startY="70%" />
        <FloatingShape delay={3} duration={15} size="100px" color="#3b82f6" startX="50%" startY="40%" />
      </div>

      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <h2
          className="text-[clamp(2.5rem,8vw,5rem)] font-semibold leading-[1.1] tracking-tight mb-8"
          style={{ color: '#ffffff' }}
        >
          <span className="block">
            {title1Words.map((word, i) => (
              <AnimatedWord key={i} word={word} delay={i * 100} isVisible={isInView} />
            ))}
          </span>
          <span className="block" style={{ color: '#e85d4c' }}>
            {title2Words.map((word, i) => (
              <AnimatedWord key={i} word={word} delay={(title1Words.length + i) * 100 + 200} isVisible={isInView} />
            ))}
          </span>
        </h2>

        <p
          className="text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto transition-all duration-1000"
          style={{
            color: 'rgba(255,255,255,0.7)',
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '800ms',
          }}
        >
          <strong className="font-bold" style={{ color: '#ffffff' }}>maemo</strong>{' '}
          {descriptionWords.map((word, i) => (
            <span
              key={i}
              className="inline-block transition-all duration-500"
              style={{
                opacity: isInView ? 1 : 0,
                transitionDelay: `${900 + i * 30}ms`,
              }}
            >
              {word}&nbsp;
            </span>
          ))}
        </p>

        <div
          className="mt-12 mx-auto h-px transition-all duration-1000"
          style={{
            width: isInView ? '120px' : '0px',
            background: 'linear-gradient(90deg, transparent, #e85d4c, transparent)',
            transitionDelay: '1200ms',
          }}
        />
      </div>

      <style>{`
        @keyframes float-shape {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(30px, -30px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 10px) scale(1.05); }
        }
        @keyframes pulse-gradient {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
      `}</style>
    </section>
  );
}
