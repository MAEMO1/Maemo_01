'use client';

import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useBreakpoint } from '../../hooks/useMediaQuery';
import { gsap, ScrollTrigger } from '../../lib/gsap';

// Palette matching homepage
const PALETTE = {
  ink: '#1e293b',
  coral: '#e85d4c',
  slate: '#334155',
  stone: '#64748b',
  ivory: '#f8fafc',
};

export function ContactContent() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const isDesktop = useBreakpoint('md');

  // Refs for GSAP animations
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const pathwayRefs = useRef([]);
  const dividerRef = useRef(null);
  const formSectionRef = useRef(null);
  const formTitleRef = useRef(null);
  const formFieldsRef = useRef([]);

  const [formData, setFormData] = useState({
    companyName: '',
    website: '',
    sector: '',
    region: '',
    teamSize: '',
    revenue: '',
    goals: [],
    timing: '',
    name: '',
    email: '',
    invitationCode: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hero entrance animation - Premium dramatic style
  useLayoutEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ 
        defaults: { ease: 'power3.out' }
      });

      // Background elements float in
      tl.fromTo('.hero-orb-1', 
        { opacity: 0, scale: 0.8, x: 100 },
        { opacity: 1, scale: 1, x: 0, duration: 1.5 },
        0
      );
      tl.fromTo('.hero-orb-2', 
        { opacity: 0, scale: 0.8, y: 100 },
        { opacity: 1, scale: 1, y: 0, duration: 1.5 },
        0.2
      );
      tl.fromTo('.hero-grid',
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        0.5
      );

      // Left content - staggered entrance
      tl.fromTo('.hero-eyebrow',
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.8 },
        0.3
      );
      
      tl.fromTo('.hero-title-line',
        { opacity: 0, y: 80, rotateX: 15 },
        { opacity: 1, y: 0, rotateX: 0, duration: 1, stagger: 0.1 },
        0.4
      );

      tl.fromTo('.hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        0.8
      );

      // Right visual elements
      tl.fromTo('.hero-visual-card',
        { opacity: 0, y: 60, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.9, stagger: 0.15, ease: 'back.out(1.4)' },
        0.6
      );

      tl.fromTo('.hero-signal-line',
        { opacity: 0, strokeDashoffset: 300 },
        { opacity: 1, strokeDashoffset: 0, duration: 1.2, ease: 'power2.inOut' },
        1
      );

      // Scroll indicator
      tl.fromTo('.scroll-indicator',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        1.4
      );
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  // Pathway cards scroll animation - Subtle entrance
  useLayoutEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      pathwayRefs.current.forEach((card, index) => {
        if (!card) return;

        gsap.set(card, {
          opacity: 0,
          y: 30,
        });

        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: index * 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  // Big text divider parallax
  useLayoutEffect(() => {
    if (!mounted || !dividerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(dividerRef.current, { opacity: 0, scale: 0.8, y: 60 });

      gsap.to(dividerRef.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: dividerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      // Parallax effect on scroll
      gsap.to(dividerRef.current, {
        y: -30,
        scrollTrigger: {
          trigger: dividerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  // Form section staggered reveal
  useLayoutEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // Form title
      if (formTitleRef.current) {
        gsap.set(formTitleRef.current, { opacity: 0, y: 60 });
        gsap.to(formTitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formTitleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Form fields staggered entrance
      formFieldsRef.current.forEach((field, index) => {
        if (!field) return;

        gsap.set(field, { opacity: 0, y: 40 });
        gsap.to(field, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: index * 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formSectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleGoal = (goal) => {
    setFormData(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal]
    }));
  };

  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        // Reset form
        setFormData({
          companyName: '',
          website: '',
          sector: '',
          region: '',
          teamSize: '',
          revenue: '',
          goals: [],
          timing: '',
          name: '',
          email: '',
          invitationCode: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Submit error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const goals = ['leads', 'repositioning', 'tools', 'website'];
  const timings = ['0-30', '30-90', '90+'];
  const sectors = ['saas', 'ecommerce', 'services', 'manufacturing', 'healthcare', 'finance', 'other'];
  const teamSizes = ['1-10', '11-50', '51-200', '200+'];
  const revenues = ['0-500k', '500k-2m', '2m-10m', '10m+'];

  let fieldIndex = 0;
  const getFieldRef = () => {
    const index = fieldIndex++;
    return (el) => { formFieldsRef.current[index] = el; };
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-ink overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Large gradient orb - top right */}
        <div
          className="hero-orb-1 absolute"
          style={{
            width: 'clamp(500px, 60vw, 900px)',
            height: 'clamp(500px, 60vw, 900px)',
            background: 'radial-gradient(circle, rgba(232, 93, 76, 0.08) 0%, rgba(232, 93, 76, 0.02) 40%, transparent 70%)',
            top: '-10%',
            right: '-15%',
            filter: 'blur(80px)',
            animation: 'float-gentle 20s ease-in-out infinite',
          }}
        />
        
        {/* Secondary orb - bottom left */}
        <div
          className="hero-orb-2 absolute"
          style={{
            width: 'clamp(400px, 50vw, 700px)',
            height: 'clamp(400px, 50vw, 700px)',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.06) 0%, transparent 60%)',
            bottom: '10%',
            left: '-10%',
            filter: 'blur(100px)',
            animation: 'float-gentle 25s ease-in-out infinite reverse',
          }}
        />

        {/* Animated grid pattern */}
        <div 
          className="hero-grid absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            maskImage: 'radial-gradient(ellipse at 30% 50%, black 0%, transparent 70%)',
            WebkitMaskImage: 'radial-gradient(ellipse at 30% 50%, black 0%, transparent 70%)',
          }}
        />

        {/* Noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Hero Section - Asymmetric Premium Design */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center px-6 sm:px-8 lg:px-16 xl:px-24 pt-24 pb-16"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Left: Typography Content */}
            <div className="relative z-10 order-2 lg:order-1">
              {/* Eyebrow badge */}
              <div className="hero-eyebrow inline-flex items-center gap-3 mb-8">
                <div className="h-px w-8 bg-gradient-to-r from-coral to-transparent" />
                <span 
                  className="text-[11px] font-semibold tracking-[0.2em] uppercase"
                  style={{ color: PALETTE.coral }}
                >
                  {t('contact.badge')}
                </span>
              </div>

              {/* Title - Dramatic typography */}
              <h1 className="mb-8" style={{ perspective: '1000px' }}>
                <span 
                  className="hero-title-line block"
                  style={{
                    fontSize: isDesktop ? 'clamp(3.5rem, 6vw, 6rem)' : 'clamp(2.5rem, 10vw, 4rem)',
                    fontWeight: 300,
                    lineHeight: 0.95,
                    letterSpacing: '-0.03em',
                    color: 'rgba(255,255,255,0.7)',
                    transformOrigin: 'left center',
                  }}
                >
                  {t('contact.title').split(' ')[0]}
                </span>
                <span 
                  className="hero-title-line block"
                  style={{
                    fontSize: isDesktop ? 'clamp(3.5rem, 6vw, 6rem)' : 'clamp(2.5rem, 10vw, 4rem)',
                    fontWeight: 600,
                    lineHeight: 0.95,
                    letterSpacing: '-0.03em',
                    color: '#ffffff',
                    transformOrigin: 'left center',
                  }}
                >
                  {t('contact.title').split(' ').slice(1).join(' ')}
                </span>
              </h1>

              {/* Subtitle with decorative element */}
              <div className="hero-subtitle relative">
                <div 
                  className="absolute -left-4 top-0 bottom-0 w-1 rounded-full"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(232, 93, 76, 0.5), transparent)',
                  }}
                />
                <p 
                  className="text-base sm:text-lg leading-relaxed pl-6"
                  style={{ 
                    color: 'rgba(255,255,255,0.45)',
                    fontWeight: 400,
                    maxWidth: '420px',
                  }}
                >
                  {t('contact.subtitle')}
                </p>
              </div>

              {/* Signal pulse indicator */}
              <div className="hero-subtitle mt-12 flex items-center gap-4">
                <div className="relative">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ background: PALETTE.coral }}
                  />
                  <div 
                    className="absolute inset-0 w-3 h-3 rounded-full animate-ping"
                    style={{ background: PALETTE.coral, opacity: 0.5 }}
                  />
                </div>
                <span 
                  className="text-xs tracking-[0.15em] uppercase"
                  style={{ color: 'rgba(255,255,255,0.3)' }}
                >
                  {t('contact.pathways.signal.number')} — {t('contact.pathways.signal.title')}
                </span>
              </div>
            </div>

            {/* Right: Abstract Visual Composition */}
            <div className="relative order-1 lg:order-2 h-[400px] sm:h-[500px] lg:h-[600px]">
              {/* Main floating card - Invited pathway */}
              <div 
                className="hero-visual-card absolute top-[5%] right-[5%] lg:right-[10%] w-[240px] sm:w-[280px] rounded-2xl p-6 backdrop-blur-sm"
                style={{
                  background: 'linear-gradient(135deg, rgba(232, 93, 76, 0.15) 0%, rgba(232, 93, 76, 0.05) 100%)',
                  border: '1px solid rgba(232, 93, 76, 0.2)',
                  boxShadow: '0 25px 80px rgba(232, 93, 76, 0.15), inset 0 1px 0 rgba(255,255,255,0.1)',
                  animation: 'float-gentle 8s ease-in-out infinite',
                }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="flex items-center justify-center w-12 h-12 rounded-xl text-white font-bold text-lg flex-shrink-0"
                    style={{ background: PALETTE.coral }}
                  >
                    {t('contact.pathways.invited.number')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1 text-white">
                      {t('contact.pathways.invited.title')}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {t('contact.pathways.invited.description').slice(0, 60)}...
                    </p>
                  </div>
                </div>
                {/* Decorative corner accent */}
                <div 
                  className="absolute -top-px -right-px w-16 h-16 overflow-hidden rounded-tr-2xl"
                  style={{
                    background: 'linear-gradient(135deg, transparent 50%, rgba(232, 93, 76, 0.3) 50%)',
                  }}
                />
              </div>

              {/* Secondary floating card - Signal */}
              <div 
                className="hero-visual-card absolute bottom-[15%] left-[0%] lg:left-[5%] w-[220px] sm:w-[260px] rounded-2xl p-6"
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
                  animation: 'float-gentle 10s ease-in-out infinite reverse',
                }}
              >
                <div className="flex items-start gap-4">
                  <div 
                    className="flex items-center justify-center w-12 h-12 rounded-xl font-bold text-lg flex-shrink-0"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.5)',
                    }}
                  >
                    {t('contact.pathways.signal.number')}
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1 text-white">
                      {t('contact.pathways.signal.title')}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
                      {t('contact.pathways.signal.description').slice(0, 50)}...
                    </p>
                  </div>
                </div>
              </div>

              {/* Abstract geometric shapes */}
              <div 
                className="hero-visual-card absolute top-[40%] left-[30%] w-20 h-20 rounded-2xl opacity-60"
                style={{
                  background: 'linear-gradient(135deg, rgba(232, 93, 76, 0.2), transparent)',
                  border: '1px solid rgba(232, 93, 76, 0.15)',
                  transform: 'rotate(12deg)',
                  animation: 'float-gentle 12s ease-in-out infinite',
                }}
              />
              
              <div 
                className="hero-visual-card absolute bottom-[35%] right-[20%] w-14 h-14 rounded-full opacity-40"
                style={{
                  background: 'radial-gradient(circle, rgba(232, 93, 76, 0.3), transparent)',
                  animation: 'float-gentle 15s ease-in-out infinite 2s',
                }}
              />

              {/* SVG Connection Lines */}
              <svg 
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 600 600"
                preserveAspectRatio="xMidYMid slice"
              >
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(232, 93, 76, 0.3)" />
                    <stop offset="100%" stopColor="rgba(232, 93, 76, 0)" />
                  </linearGradient>
                </defs>
                <path
                  className="hero-signal-line"
                  d="M 100 400 Q 200 350 300 200 Q 380 80 500 100"
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="1.5"
                  strokeDasharray="300"
                  strokeDashoffset="300"
                  strokeLinecap="round"
                />
                <path
                  className="hero-signal-line"
                  d="M 120 420 Q 220 370 320 220"
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                  strokeDasharray="200"
                  strokeDashoffset="200"
                  strokeLinecap="round"
                />
              </svg>

              {/* Stats mini cards */}
              <div 
                className="hero-visual-card absolute top-[60%] right-[5%] px-4 py-3 rounded-xl backdrop-blur-md"
                style={{
                  background: 'rgba(30, 41, 59, 0.6)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  animation: 'float-gentle 7s ease-in-out infinite 1s',
                }}
              >
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Response Rate
                </div>
                <div className="text-xl font-semibold text-white">Selective</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          style={{ opacity: 0 }}
        >
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
            <div 
              className="w-1 h-2 rounded-full animate-float"
              style={{ background: 'rgba(232, 93, 76, 0.6)' }}
            />
          </div>
          <span className="text-[10px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.3)' }}>
            {t('common.scroll')}
          </span>
        </div>
      </section>

      {/* Pathways Section - Refined cards */}
      <section className="relative px-6 sm:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-5">
            {/* Card 1 - Uitgenodigd */}
            <div
              ref={(el) => { pathwayRefs.current[0] = el; }}
              className="group relative rounded-2xl p-7 transition-all duration-300 hover:translate-y-[-2px] cursor-pointer"
              style={{
                background: 'rgba(232, 93, 76, 0.06)',
                border: '1px solid rgba(232, 93, 76, 0.12)',
              }}
            >
              <div className="relative z-10">
                <div className="flex items-start gap-4">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-xl text-white font-semibold text-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: PALETTE.coral,
                    }}
                  >
                    {t('contact.pathways.invited.number')}
                  </div>
                  <div>
                    <h3
                      className="font-medium text-lg mb-2 transition-colors duration-300 group-hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.95)' }}
                    >
                      {t('contact.pathways.invited.title')}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {t('contact.pathways.invited.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - Waag je kans */}
            <div
              ref={(el) => { pathwayRefs.current[1] = el; }}
              className="group relative rounded-2xl p-7 transition-all duration-300 hover:translate-y-[-2px] cursor-pointer"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}
            >
              <div className="relative z-10">
                <div className="flex items-start gap-4">
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-xl font-semibold text-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
                    style={{
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'rgba(255,255,255,0.5)',
                    }}
                  >
                    {t('contact.pathways.signal.number')}
                  </div>
                  <div>
                    <h3
                      className="font-medium text-lg mb-2 transition-colors duration-300 group-hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.95)' }}
                    >
                      {t('contact.pathways.signal.title')}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      {t('contact.pathways.signal.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Disclaimer - Subtle styling */}
          <div
            className="mt-6 rounded-xl px-6 py-4 text-center"
            style={{
              background: 'rgba(232, 93, 76, 0.04)',
              border: '1px solid rgba(232, 93, 76, 0.1)',
            }}
          >
            <p className="text-sm" style={{ color: 'rgba(232, 93, 76, 0.8)' }}>
              {t('contact.disclaimer')}
            </p>
          </div>
        </div>
      </section>

      {/* Form Section - White with premium animations */}
      <section
        ref={formSectionRef}
        className="bg-white py-16 md:py-20 px-4 sm:px-6 relative"
      >
        {/* Subtle top gradient transition */}
        <div
          className="absolute top-0 left-0 right-0 h-24 -translate-y-full"
          style={{
            background: `linear-gradient(to bottom, ${PALETTE.ink} 0%, ${PALETTE.ink} 100%)`,
          }}
        />

        <div className="max-w-2xl mx-auto">
          {/* Form header */}
          <div ref={formTitleRef} className="text-center mb-14">
            <h2
              className="mb-4"
              style={{
                fontSize: isDesktop ? 'clamp(2.5rem, 5vw, 4rem)' : 'clamp(2rem, 8vw, 3rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: PALETTE.ink,
                lineHeight: 1.1,
              }}
            >
              {t('contact.form.title')}
            </h2>
            <p className="text-xl" style={{ color: PALETTE.stone }}>
              {t('contact.form.titleSuffix')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Company info row */}
            <div ref={getFieldRef()} className="grid sm:grid-cols-2 gap-5">
              <InputField
                label={t('contact.form.companyName')}
                value={formData.companyName}
                onChange={(v) => handleInputChange('companyName', v)}
                placeholder={t('contact.form.companyNamePlaceholder')}
                focused={focusedField === 'companyName'}
                onFocus={() => setFocusedField('companyName')}
                onBlur={() => setFocusedField(null)}
              />
              <InputField
                label={t('contact.form.website')}
                value={formData.website}
                onChange={(v) => handleInputChange('website', v)}
                placeholder={t('contact.form.websitePlaceholder')}
                type="url"
                focused={focusedField === 'website'}
                onFocus={() => setFocusedField('website')}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            {/* Sector & Region row */}
            <div ref={getFieldRef()} className="grid sm:grid-cols-2 gap-5">
              <SelectField
                label={t('contact.form.sector')}
                value={formData.sector}
                onChange={(v) => handleInputChange('sector', v)}
                placeholder={t('contact.form.sectorPlaceholder')}
                options={sectors.map(s => ({ value: s, label: t(`contact.form.sectors.${s}`) }))}
                focused={focusedField === 'sector'}
                onFocus={() => setFocusedField('sector')}
                onBlur={() => setFocusedField(null)}
              />
              <InputField
                label={t('contact.form.region')}
                labelSuffix={t('contact.form.regionOptional')}
                value={formData.region}
                onChange={(v) => handleInputChange('region', v)}
                placeholder={t('contact.form.regionPlaceholder')}
                focused={focusedField === 'region'}
                onFocus={() => setFocusedField('region')}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            {/* Team size & Revenue row */}
            <div ref={getFieldRef()} className="grid sm:grid-cols-2 gap-5">
              <SelectField
                label={t('contact.form.teamSize')}
                labelSuffix={t('contact.form.regionOptional')}
                value={formData.teamSize}
                onChange={(v) => handleInputChange('teamSize', v)}
                placeholder={t('contact.form.teamSizePlaceholder')}
                options={teamSizes.map(s => ({ value: s, label: t(`contact.form.teamSizes.${s}`) }))}
                focused={focusedField === 'teamSize'}
                onFocus={() => setFocusedField('teamSize')}
                onBlur={() => setFocusedField(null)}
              />
              <SelectField
                label={t('contact.form.revenue')}
                labelSuffix={t('contact.form.regionOptional')}
                value={formData.revenue}
                onChange={(v) => handleInputChange('revenue', v)}
                placeholder={t('contact.form.revenuePlaceholder')}
                options={revenues.map(r => ({ value: r, label: t(`contact.form.revenues.${r}`) }))}
                focused={focusedField === 'revenue'}
                onFocus={() => setFocusedField('revenue')}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            {/* Goals */}
            <div ref={getFieldRef()}>
              <label className="block text-sm font-medium mb-4" style={{ color: PALETTE.ink }}>
                {t('contact.form.goal')}
              </label>
              <div className="flex flex-wrap gap-3">
                {goals.map(goal => (
                  <ChipButton
                    key={goal}
                    selected={formData.goals.includes(goal)}
                    onClick={() => toggleGoal(goal)}
                  >
                    {t(`contact.form.goals.${goal}`)}
                  </ChipButton>
                ))}
              </div>
            </div>

            {/* Timing */}
            <div ref={getFieldRef()}>
              <label className="block text-sm font-medium mb-4" style={{ color: PALETTE.ink }}>
                {t('contact.form.timing')}
              </label>
              <div className="flex flex-wrap gap-3">
                {timings.map(time => (
                  <ChipButton
                    key={time}
                    selected={formData.timing === time}
                    onClick={() => handleInputChange('timing', time)}
                  >
                    {t(`contact.form.timings.${time}`)}
                  </ChipButton>
                ))}
              </div>
            </div>

            {/* Animated divider */}
            <div
              ref={getFieldRef()}
              className="h-px relative overflow-hidden"
            >
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, #e2e8f0 20%, #e2e8f0 80%, transparent 100%)',
                }}
              />
            </div>

            {/* Contact info row */}
            <div ref={getFieldRef()} className="grid sm:grid-cols-2 gap-5">
              <InputField
                label={t('contact.form.name')}
                value={formData.name}
                onChange={(v) => handleInputChange('name', v)}
                placeholder={t('contact.form.namePlaceholder')}
                focused={focusedField === 'name'}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
              />
              <InputField
                label={t('contact.form.email')}
                value={formData.email}
                onChange={(v) => handleInputChange('email', v)}
                placeholder={t('contact.form.emailPlaceholder')}
                type="email"
                focused={focusedField === 'email'}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            {/* Invitation code */}
            <div ref={getFieldRef()}>
              <InputField
                label={t('contact.form.invitationCode')}
                labelSuffix={t('contact.form.invitationCodeOptional')}
                value={formData.invitationCode}
                onChange={(v) => handleInputChange('invitationCode', v)}
                placeholder={t('contact.form.invitationCodePlaceholder')}
                focused={focusedField === 'invitationCode'}
                onFocus={() => setFocusedField('invitationCode')}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            {/* Submit button - jeton.com style */}
            <div ref={getFieldRef()}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full py-5 rounded-xl font-semibold text-lg text-white transition-all duration-300 flex items-center justify-center gap-3 min-h-[56px] hover:scale-[0.98] active:scale-[0.96]"
                style={{
                  background: PALETTE.ink,
                  boxShadow: isSubmitting ? 'none' : `0 8px 32px ${PALETTE.ink}30`,
                  transitionTimingFunction: 'cubic-bezier(.215,.61,.355,1)',
                }}
              >
                <span>
                  {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                </span>
                {!isSubmitting && (
                  <svg
                    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                )}
                {isSubmitting && (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
              </button>

              {/* Success/Error messages */}
              {submitStatus === 'success' && (
                <div
                  className="mt-4 p-4 rounded-xl text-center"
                  style={{
                    background: 'rgba(34, 197, 94, 0.1)',
                    border: '1px solid rgba(34, 197, 94, 0.3)',
                    color: '#16a34a',
                  }}
                >
                  {t('contact.form.successMessage') || 'Message sent successfully! We\'ll be in touch.'}
                </div>
              )}
              {submitStatus === 'error' && (
                <div
                  className="mt-4 p-4 rounded-xl text-center"
                  style={{
                    background: 'rgba(239, 68, 68, 0.1)',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    color: '#dc2626',
                  }}
                >
                  {t('contact.form.errorMessage') || 'Something went wrong. Please try again.'}
                </div>
              )}
            </div>
          </form>
        </div>
      </section>

    </div>
  );
}

function InputField({ label, labelSuffix, value, onChange, placeholder, type = 'text', focused, onFocus, onBlur }) {
  return (
    <div className="group">
      <label className="block text-sm font-medium mb-2.5" style={{ color: PALETTE.ink }}>
        {label}
        {labelSuffix && (
          <span className="ml-1.5" style={{ color: PALETTE.stone, fontWeight: 400 }}>{labelSuffix}</span>
        )}
      </label>
      <div className="relative">
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          className="w-full px-5 py-4 rounded-2xl transition-all duration-300 focus:outline-none min-h-[56px]"
          style={{
            background: focused ? '#ffffff' : PALETTE.ivory,
            border: `2px solid ${focused ? PALETTE.coral : 'transparent'}`,
            boxShadow: focused
              ? `0 0 0 4px ${PALETTE.coral}15, 0 8px 24px ${PALETTE.coral}10`
              : '0 2px 8px rgba(0,0,0,0.04)',
            transform: focused ? 'translateY(-2px)' : 'translateY(0)',
          }}
        />
        {/* Focus indicator line */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 rounded-full transition-all duration-300"
          style={{
            width: focused ? '80%' : '0%',
            background: PALETTE.coral,
          }}
        />
      </div>
    </div>
  );
}

function SelectField({ label, labelSuffix, value, onChange, placeholder, options, focused, onFocus, onBlur }) {
  return (
    <div className="group">
      <label className="block text-sm font-medium mb-2.5" style={{ color: PALETTE.ink }}>
        {label}
        {labelSuffix && (
          <span className="ml-1.5" style={{ color: PALETTE.stone, fontWeight: 400 }}>{labelSuffix}</span>
        )}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          className="w-full px-5 py-4 rounded-2xl transition-all duration-300 focus:outline-none appearance-none cursor-pointer min-h-[56px]"
          style={{
            background: focused ? '#ffffff' : PALETTE.ivory,
            border: `2px solid ${focused ? PALETTE.coral : 'transparent'}`,
            boxShadow: focused
              ? `0 0 0 4px ${PALETTE.coral}15, 0 8px 24px ${PALETTE.coral}10`
              : '0 2px 8px rgba(0,0,0,0.04)',
            color: value ? PALETTE.ink : PALETTE.stone,
            transform: focused ? 'translateY(-2px)' : 'translateY(0)',
          }}
        >
          <option value="">{placeholder}</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <svg
          className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none transition-transform duration-300"
          style={{
            color: focused ? PALETTE.coral : PALETTE.stone,
            transform: focused ? 'translateY(-50%) rotate(180deg)' : 'translateY(-50%)',
          }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

function ChipButton({ children, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-5 py-3 rounded-xl text-sm font-medium transition-all duration-300 min-h-[48px] hover:scale-[0.98] active:scale-[0.96]"
      style={{
        background: selected ? PALETTE.ink : '#ffffff',
        color: selected ? '#ffffff' : PALETTE.stone,
        border: `2px solid ${selected ? PALETTE.ink : '#e2e8f0'}`,
        boxShadow: selected ? `0 4px 16px ${PALETTE.ink}30` : 'none',
        transitionTimingFunction: 'cubic-bezier(.215,.61,.355,1)',
      }}
    >
      {children}
    </button>
  );
}
