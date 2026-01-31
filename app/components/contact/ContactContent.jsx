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

  // Hero entrance animation - Premium subtle style
  useLayoutEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ 
        defaults: { ease: 'power2.out' } // Smoother, more subtle easing
      });

      // Badge entrance - subtle fade up
      if (badgeRef.current) {
        gsap.set(badgeRef.current, { opacity: 0, y: 16 });
        tl.to(badgeRef.current, { 
          opacity: 1, 
          y: 0, 
          duration: 0.6 
        }, 0.1);
      }

      // Title entrance - elegant slide up without 3D effects
      if (titleRef.current) {
        gsap.set(titleRef.current, {
          opacity: 0,
          y: 40,
        });
        tl.to(titleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        }, 0.25);
      }

      // Subtitle fade in - very subtle
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { opacity: 0, y: 24 });
        tl.to(subtitleRef.current, { 
          opacity: 1, 
          y: 0, 
          duration: 0.7 
        }, 0.5);
      }
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
      {/* Premium subtle background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Single subtle gradient orb - jeton.com style */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: `radial-gradient(circle, rgba(232, 93, 76, 0.04) 0%, transparent 60%)`,
            top: '-10%',
            right: '-20%',
            filter: 'blur(100px)',
          }}
        />
        {/* Very subtle noise texture overlay */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Hero Section - Premium jeton.com style */}
      <section
        ref={heroRef}
        className="relative flex items-center justify-center px-6 sm:px-8 pt-32 sm:pt-40 pb-16 sm:pb-20"
      >
        <div className="max-w-4xl mx-auto text-center relative z-10">
          {/* Refined badge - minimal and elegant */}
          <div
            ref={badgeRef}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: 'rgba(232, 93, 76, 0.08)',
              border: '1px solid rgba(232, 93, 76, 0.15)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{
                background: PALETTE.coral,
              }}
            />
            <span
              className="text-[11px] font-medium tracking-[0.15em] uppercase"
              style={{ color: PALETTE.coral }}
            >
              {t('contact.badge')}
            </span>
          </div>

          {/* Title - Premium typography with lighter weight */}
          <h1
            ref={titleRef}
            className="mb-6"
            style={{
              fontSize: isDesktop ? 'clamp(3rem, 6vw, 5rem)' : 'clamp(2.25rem, 8vw, 3.5rem)',
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              color: '#ffffff',
            }}
          >
            {t('contact.title').split(' ')[0]}{' '}
            <span
              style={{
                color: PALETTE.coral,
                fontWeight: 400, // Lighter weight for accent word
              }}
            >
              {t('contact.title').split(' ').slice(1).join(' ')}
            </span>
          </h1>

          {/* Subtitle - Refined and readable */}
          <p
            ref={subtitleRef}
            className="text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mx-auto"
            style={{ 
              color: 'rgba(255,255,255,0.55)',
              fontWeight: 400,
              letterSpacing: '0.01em',
            }}
          >
            {t('contact.subtitle')}
          </p>
        </div>

        {/* Subtle bottom gradient fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24"
          style={{
            background: 'linear-gradient(to top, rgba(30,41,59,1) 0%, transparent 100%)',
          }}
        />
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
