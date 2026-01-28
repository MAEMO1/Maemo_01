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
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
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

  // Hero entrance animation
  useLayoutEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Badge entrance
      if (badgeRef.current) {
        gsap.set(badgeRef.current, { opacity: 0, y: 30, scale: 0.9 });
        tl.to(badgeRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.8 }, 0.2);
      }

      // Title dramatic entrance with 3D perspective
      if (titleRef.current) {
        gsap.set(titleRef.current, {
          opacity: 0,
          y: 80,
          rotationX: 15,
          transformPerspective: 1200,
          transformOrigin: 'center bottom',
        });
        tl.to(titleRef.current, {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 1.2,
        }, 0.3);
      }

      // Subtitle fade in
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { opacity: 0, y: 40 });
        tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 1 }, 0.6);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  // Pathway cards scroll animation
  useLayoutEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      pathwayRefs.current.forEach((card, index) => {
        if (!card) return;

        const direction = index === 0 ? -1 : 1;

        gsap.set(card, {
          opacity: 0,
          x: direction * 100,
          y: 50,
          rotationY: direction * 10,
          transformPerspective: 1000,
        });

        gsap.to(card, {
          opacity: 1,
          x: 0,
          y: 0,
          rotationY: 0,
          duration: 1,
          ease: 'power3.out',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('Form submitted:', formData);
    setIsSubmitting(false);
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
      {/* Animated background orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.04] animate-pulse"
          style={{
            background: `radial-gradient(circle, ${PALETTE.coral} 0%, transparent 70%)`,
            top: '5%',
            right: '-200px',
            filter: 'blur(80px)',
            animation: 'pulse 8s ease-in-out infinite',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)',
            bottom: '10%',
            left: '-100px',
            filter: 'blur(60px)',
            animation: 'pulse 10s ease-in-out infinite reverse',
          }}
        />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Hero Section - Premium entrance */}
      <section
        ref={heroRef}
        className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center px-4 sm:px-6 pt-28 sm:pt-36 pb-16 sm:pb-20"
      >
        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Animated badge */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-10"
            style={{
              background: 'linear-gradient(135deg, rgba(232, 93, 76, 0.15) 0%, rgba(232, 93, 76, 0.08) 100%)',
              border: '1px solid rgba(232, 93, 76, 0.3)',
              backdropFilter: 'blur(20px)',
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: PALETTE.coral,
                boxShadow: `0 0 12px ${PALETTE.coral}`,
                animation: 'pulse 2s ease-in-out infinite',
              }}
            />
            <span
              className="text-xs font-semibold tracking-[0.2em] uppercase"
              style={{ color: PALETTE.coral }}
            >
              {t('contact.badge')}
            </span>
          </div>

          {/* Title with dramatic typography */}
          <h1
            ref={titleRef}
            className="mb-8"
            style={{
              fontSize: isDesktop ? 'clamp(3.5rem, 10vw, 7rem)' : 'clamp(2.5rem, 12vw, 4rem)',
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              color: '#ffffff',
            }}
          >
            {t('contact.title').split(' ')[0]}{' '}
            <span
              style={{
                color: PALETTE.coral,
                textShadow: `0 0 80px ${PALETTE.coral}40`,
              }}
            >
              {t('contact.title').split(' ').slice(1).join(' ')}
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg sm:text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: 'rgba(255,255,255,0.5)' }}
          >
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Decorative elements */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: 'linear-gradient(to top, rgba(30,41,59,1) 0%, transparent 100%)',
          }}
        />
      </section>

      {/* Pathways Section with 3D card animations */}
      <section className="relative px-4 sm:px-6 pb-20">
        <div className="max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-2 gap-6">
            {/* Card 1 - Uitgenodigd */}
            <div
              ref={(el) => { pathwayRefs.current[0] = el; }}
              className="group relative rounded-3xl p-8 transition-all duration-500 hover:scale-[1.02] cursor-pointer"
              style={{
                background: 'linear-gradient(145deg, rgba(232, 93, 76, 0.12) 0%, rgba(232, 93, 76, 0.04) 100%)',
                border: '1px solid rgba(232, 93, 76, 0.2)',
                backdropFilter: 'blur(20px)',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Glow effect on hover */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${PALETTE.coral}30 0%, transparent 60%)`,
                  filter: 'blur(20px)',
                }}
              />
              <div className="relative z-10">
                <div className="flex items-start gap-5">
                  <div
                    className="flex items-center justify-center w-16 h-16 rounded-2xl text-white font-bold text-xl flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      background: `linear-gradient(135deg, ${PALETTE.coral} 0%, #d44a3a 100%)`,
                      boxShadow: `0 12px 32px ${PALETTE.coral}50`,
                    }}
                  >
                    {t('contact.pathways.invited.number')}
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-xl mb-3 transition-colors duration-300 group-hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.9)' }}
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
              className="group relative rounded-3xl p-8 transition-all duration-500 hover:scale-[1.02] cursor-pointer"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                transformStyle: 'preserve-3d',
              }}
            >
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                style={{
                  background: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.08) 0%, transparent 60%)',
                  filter: 'blur(20px)',
                }}
              />
              <div className="relative z-10">
                <div className="flex items-start gap-5">
                  <div
                    className="flex items-center justify-center w-16 h-16 rounded-2xl font-bold text-xl flex-shrink-0 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '2px solid rgba(255,255,255,0.15)',
                      color: 'rgba(255,255,255,0.4)',
                    }}
                  >
                    {t('contact.pathways.signal.number')}
                  </div>
                  <div>
                    <h3
                      className="font-semibold text-xl mb-3 transition-colors duration-300 group-hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.9)' }}
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

          {/* Disclaimer with animated border */}
          <div
            className="mt-8 rounded-2xl px-8 py-5 text-center relative overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(232, 93, 76, 0.08) 0%, rgba(232, 93, 76, 0.03) 100%)',
            }}
          >
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                border: '1px solid rgba(232, 93, 76, 0.2)',
                animation: 'borderPulse 3s ease-in-out infinite',
              }}
            />
            <p className="text-sm relative z-10" style={{ color: `${PALETTE.coral}cc` }}>
              {t('contact.disclaimer')}
            </p>
          </div>
        </div>
      </section>

      {/* Big Text Divider - Parallax effect */}
      <section className="py-24 md:py-32 px-4 sm:px-6 overflow-hidden">
        <h2
          ref={dividerRef}
          className="text-center max-w-5xl mx-auto will-change-transform"
          style={{
            fontSize: isDesktop ? 'clamp(3rem, 8vw, 6rem)' : 'clamp(2rem, 10vw, 3rem)',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            lineHeight: 1.1,
            color: 'rgba(255,255,255,0.06)',
            textShadow: '0 0 80px rgba(255,255,255,0.03)',
          }}
        >
          {t('contact.form.badge')}
        </h2>
      </section>

      {/* Form Section - White with premium animations */}
      <section
        ref={formSectionRef}
        className="bg-white py-20 md:py-28 px-4 sm:px-6 relative"
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

            {/* Submit button with premium animation */}
            <div ref={getFieldRef()}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full py-5 rounded-full font-semibold text-lg text-white transition-all duration-500 flex items-center justify-center gap-3 min-h-[56px] relative overflow-hidden"
                style={{
                  background: PALETTE.ink,
                  boxShadow: isSubmitting ? 'none' : `0 8px 32px ${PALETTE.ink}30`,
                }}
              >
                {/* Animated gradient on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${PALETTE.slate} 0%, ${PALETTE.ink} 100%)`,
                  }}
                />
                <span className="relative z-10">
                  {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
                </span>
                {!isSubmitting && (
                  <svg
                    className="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:translate-x-2"
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
            </div>
          </form>
        </div>
      </section>

      {/* CSS for custom animations */}
      <style jsx global>{`
        @keyframes borderPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
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
      className="px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 min-h-[48px] relative overflow-hidden group"
      style={{
        background: selected ? PALETTE.ink : '#ffffff',
        color: selected ? '#ffffff' : PALETTE.stone,
        border: `2px solid ${selected ? PALETTE.ink : '#e2e8f0'}`,
        transform: selected ? 'scale(1.05)' : 'scale(1)',
        boxShadow: selected ? `0 4px 16px ${PALETTE.ink}30` : 'none',
      }}
    >
      {/* Hover effect */}
      {!selected && (
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: PALETTE.ivory }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
}
