'use client';

import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useBreakpoint } from '../../hooks/useMediaQuery';
import { gsap, ScrollTrigger } from '../../lib/gsap';

// Refined palette - softer, more premium
const PALETTE = {
  ink: '#0f172a',
  inkLight: '#1e293b',
  coral: '#e85d4c',
  coralSoft: '#f47564',
  slate: '#334155',
  stone: '#64748b',
  sand: '#94a3b8',
  ivory: '#f8fafc',
  cream: '#ffffff',
};

// Premium easing curves
const EASE = {
  premium: 'cubic-bezier(0.16, 1, 0.3, 1)',
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
};

export function ContactContent() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const isDesktop = useBreakpoint('md');

  // Refs for GSAP animations
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleLine1Ref = useRef(null);
  const titleLine2Ref = useRef(null);
  const subtitleRef = useRef(null);
  const dividerRef = useRef(null);
  const pathwaysRef = useRef(null);
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
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Hero entrance animation - Premium dramatic style
  useLayoutEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: EASE.premium },
        delay: 0.1,
      });

      // Eyebrow - subtle fade in first
      if (eyebrowRef.current) {
        gsap.set(eyebrowRef.current, { opacity: 0, y: 20 });
        tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0);
      }

      // Title Line 1 - dramatic slide up with slight scale
      if (titleLine1Ref.current) {
        gsap.set(titleLine1Ref.current, { opacity: 0, y: 80, scale: 0.95 });
        tl.to(
          titleLine1Ref.current,
          { opacity: 1, y: 0, scale: 1, duration: 1.2 },
          0.2
        );
      }

      // Title Line 2 - offset timing for rhythm
      if (titleLine2Ref.current) {
        gsap.set(titleLine2Ref.current, { opacity: 0, y: 60 });
        tl.to(titleLine2Ref.current, { opacity: 1, y: 0, duration: 1 }, 0.5);
      }

      // Subtitle - elegant fade
      if (subtitleRef.current) {
        gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
        tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.8);
      }

      // Divider line - draw in animation
      if (dividerRef.current) {
        gsap.set(dividerRef.current, { scaleX: 0, transformOrigin: 'left center' });
        tl.to(dividerRef.current, { scaleX: 1, duration: 1.2 }, 0.6);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  // Pathways entrance - staggered reveal
  useLayoutEffect(() => {
    if (!mounted || !pathwaysRef.current) return;

    const ctx = gsap.context(() => {
      const cards = pathwaysRef.current.querySelectorAll('.pathway-card');

      cards.forEach((card, index) => {
        gsap.set(card, { opacity: 0, y: 40 });
        gsap.to(card, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay: index * 0.15,
          ease: EASE.premium,
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

  // Form section animation
  useLayoutEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      if (formTitleRef.current) {
        gsap.set(formTitleRef.current, { opacity: 0, y: 50 });
        gsap.to(formTitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: EASE.premium,
          scrollTrigger: {
            trigger: formTitleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      formFieldsRef.current.forEach((field, index) => {
        if (!field) return;
        gsap.set(field, { opacity: 0, y: 30 });
        gsap.to(field, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: index * 0.06,
          ease: EASE.premium,
          scrollTrigger: {
            trigger: formSectionRef.current,
            start: 'top 65%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleGoal = (goal) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));
  };

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
    return (el) => {
      formFieldsRef.current[index] = el;
    };
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-ink overflow-hidden">
      {/* Premium Ambient Background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Soft gradient orbs - layered depth */}
        <div
          className="absolute w-[1000px] h-[1000px] rounded-full opacity-60"
          style={{
            background: `radial-gradient(circle, rgba(232, 93, 76, 0.06) 0%, transparent 55%)`,
            top: '-20%',
            right: '-10%',
            filter: 'blur(80px)',
          }}
        />
        <div
          className="absolute w-[800px] h-[800px] rounded-full opacity-40"
          style={{
            background: `radial-gradient(circle, rgba(30, 41, 59, 0.15) 0%, transparent 50%)`,
            bottom: '10%',
            left: '-15%',
            filter: 'blur(100px)',
          }}
        />
        {/* Subtle noise texture */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Hero Section - Premium Editorial Style */}
      <section
        ref={heroRef}
        className="relative flex items-center justify-center px-6 sm:px-8 lg:px-12 pt-32 sm:pt-40 lg:pt-48 pb-20 sm:pb-28"
      >
        <div className="max-w-6xl mx-auto text-center relative z-10">
          {/* Elegant Eyebrow - refined */}
          <div
            ref={eyebrowRef}
            className="inline-flex items-center gap-3 mb-10 sm:mb-14"
          >
            <span
              className="h-px w-8 sm:w-12"
              style={{ background: PALETTE.coral }}
            />
            <span
              className="text-[11px] sm:text-xs font-medium tracking-[0.2em] uppercase"
              style={{ color: PALETTE.coral }}
            >
              {t('contact.badge')}
            </span>
            <span
              className="h-px w-8 sm:w-12"
              style={{ background: PALETTE.coral }}
            />
          </div>

          {/* Title - Dramatic Split Typography */}
          <div className="mb-8 sm:mb-10">
            <h1
              ref={titleLine1Ref}
              className="block mb-2 sm:mb-3"
              style={{
                fontSize: isDesktop
                  ? 'clamp(3.5rem, 8vw, 7rem)'
                  : 'clamp(2.5rem, 10vw, 4rem)',
                fontWeight: 600,
                lineHeight: 1,
                letterSpacing: '-0.03em',
                color: '#ffffff',
              }}
            >
              {t('contact.title').split(' ')[0]}
            </h1>
            <span
              ref={titleLine2Ref}
              className="block"
              style={{
                fontSize: isDesktop
                  ? 'clamp(3rem, 7vw, 6rem)'
                  : 'clamp(2rem, 8vw, 3.5rem)',
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: PALETTE.coral,
                fontStyle: 'italic',
              }}
            >
              {t('contact.title').split(' ').slice(1).join(' ')}
            </span>
          </div>

          {/* Refined Subtitle */}
          <p
            ref={subtitleRef}
            className="text-base sm:text-lg max-w-md mx-auto leading-relaxed mb-10"
            style={{
              color: 'rgba(255,255,255,0.45)',
              fontWeight: 400,
              letterSpacing: '0.02em',
            }}
          >
            {t('contact.subtitle')}
          </p>

          {/* Animated Divider */}
          <div
            ref={dividerRef}
            className="h-px w-24 sm:w-32 mx-auto mb-16 sm:mb-20"
            style={{
              background: `linear-gradient(90deg, transparent, ${PALETTE.coral}40, transparent)`,
            }}
          />

          {/* Pathways Section - Integrated in Hero */}
          <div ref={pathwaysRef} className="max-w-4xl mx-auto">
            <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
              {/* Pathway 01 - Featured */}
              <div
                className="pathway-card group relative rounded-2xl p-8 sm:p-10 text-left transition-all duration-500 hover:translate-y-[-4px]"
                style={{
                  background: `linear-gradient(135deg, rgba(232, 93, 76, 0.08) 0%, rgba(232, 93, 76, 0.03) 100%)`,
                  border: '1px solid rgba(232, 93, 76, 0.15)',
                  boxShadow: '0 4px 30px rgba(232, 93, 76, 0.05)',
                }}
              >
                {/* Number badge */}
                <div
                  className="absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                  style={{
                    background: PALETTE.coral,
                    color: '#fff',
                    boxShadow: `0 4px 15px ${PALETTE.coral}50`,
                  }}
                >
                  {t('contact.pathways.invited.number')}
                </div>

                <div className="relative z-10">
                  <h3
                    className="font-semibold text-xl sm:text-2xl mb-4 transition-colors duration-300"
                    style={{ color: '#ffffff' }}
                  >
                    {t('contact.pathways.invited.title')}
                  </h3>
                  <p
                    className="text-sm sm:text-base leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.55)' }}
                  >
                    {t('contact.pathways.invited.description')}
                  </p>
                </div>

                {/* Hover accent line */}
                <div
                  className="absolute bottom-0 left-0 h-1 rounded-full transition-all duration-500 group-hover:w-full"
                  style={{
                    width: '0%',
                    background: PALETTE.coral,
                  }}
                />
              </div>

              {/* Pathway 02 - Secondary */}
              <div
                className="pathway-card group relative rounded-2xl p-8 sm:p-10 text-left transition-all duration-500 hover:translate-y-[-4px]"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                {/* Number badge */}
                <div
                  className="absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  {t('contact.pathways.signal.number')}
                </div>

                <div className="relative z-10">
                  <h3
                    className="font-semibold text-xl sm:text-2xl mb-4 transition-colors duration-300 group-hover:text-white"
                    style={{ color: 'rgba(255,255,255,0.9)' }}
                  >
                    {t('contact.pathways.signal.title')}
                  </h3>
                  <p
                    className="text-sm sm:text-base leading-relaxed"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                  >
                    {t('contact.pathways.signal.description')}
                  </p>
                </div>

                {/* Hover accent line */}
                <div
                  className="absolute bottom-0 left-0 h-1 rounded-full transition-all duration-500 group-hover:w-full"
                  style={{
                    width: '0%',
                    background: 'rgba(255,255,255,0.3)',
                  }}
                />
              </div>
            </div>

            {/* Disclaimer - Elegant styling */}
            <div
              className="mt-10 rounded-2xl px-8 py-6 text-center border border-dashed"
              style={{
                background: 'rgba(232, 93, 76, 0.03)',
                borderColor: 'rgba(232, 93, 76, 0.2)',
              }}
            >
              <p className="text-sm sm:text-base" style={{ color: 'rgba(232, 93, 76, 0.75)' }}>
                {t('contact.disclaimer')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Form Section - Clean Premium */}
      <section
        ref={formSectionRef}
        className="bg-white py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative"
      >
        {/* Smooth transition gradient */}
        <div
          className="absolute top-0 left-0 right-0 h-32 -translate-y-full"
          style={{
            background: `linear-gradient(to bottom, ${PALETTE.ink} 0%, ${PALETTE.ink} 100%)`,
          }}
        />

        <div className="max-w-2xl mx-auto">
          {/* Form header - Premium typography */}
          <div ref={formTitleRef} className="text-center mb-16">
            <span
              className="inline-block text-[11px] font-medium tracking-[0.2em] uppercase mb-4"
              style={{ color: PALETTE.coral }}
            >
              {t('contact.form.badge')}
            </span>
            <h2
              className="mb-4"
              style={{
                fontSize: isDesktop
                  ? 'clamp(2.5rem, 5vw, 3.5rem)'
                  : 'clamp(2rem, 7vw, 2.75rem)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: PALETTE.ink,
                lineHeight: 1.1,
              }}
            >
              {t('contact.form.title')}
            </h2>
            <p className="text-lg" style={{ color: PALETTE.stone }}>
              {t('contact.form.titleSuffix')}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-10">
            {/* Company info row */}
            <div ref={getFieldRef()} className="grid sm:grid-cols-2 gap-6">
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
            <div ref={getFieldRef()} className="grid sm:grid-cols-2 gap-6">
              <SelectField
                label={t('contact.form.sector')}
                value={formData.sector}
                onChange={(v) => handleInputChange('sector', v)}
                placeholder={t('contact.form.sectorPlaceholder')}
                options={sectors.map((s) => ({ value: s, label: t(`contact.form.sectors.${s}`) }))}
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
            <div ref={getFieldRef()} className="grid sm:grid-cols-2 gap-6">
              <SelectField
                label={t('contact.form.teamSize')}
                labelSuffix={t('contact.form.regionOptional')}
                value={formData.teamSize}
                onChange={(v) => handleInputChange('teamSize', v)}
                placeholder={t('contact.form.teamSizePlaceholder')}
                options={teamSizes.map((s) => ({ value: s, label: t(`contact.form.teamSizes.${s}`) }))}
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
                options={revenues.map((r) => ({ value: r, label: t(`contact.form.revenues.${r}`) }))}
                focused={focusedField === 'revenue'}
                onFocus={() => setFocusedField('revenue')}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            {/* Goals */}
            <div ref={getFieldRef()}>
              <label
                className="block text-sm font-medium mb-4"
                style={{ color: PALETTE.ink }}
              >
                {t('contact.form.goal')}
              </label>
              <div className="flex flex-wrap gap-3">
                {goals.map((goal) => (
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
              <label
                className="block text-sm font-medium mb-4"
                style={{ color: PALETTE.ink }}
              >
                {t('contact.form.timing')}
              </label>
              <div className="flex flex-wrap gap-3">
                {timings.map((time) => (
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

            {/* Divider */}
            <div
              ref={getFieldRef()}
              className="h-px relative overflow-hidden"
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, transparent 0%, #e2e8f0 20%, #e2e8f0 80%, transparent 100%)',
                }}
              />
            </div>

            {/* Contact info row */}
            <div ref={getFieldRef()} className="grid sm:grid-cols-2 gap-6">
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

            {/* Submit button */}
            <div ref={getFieldRef()}>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group w-full py-5 rounded-xl font-semibold text-lg text-white transition-all duration-300 flex items-center justify-center gap-3 min-h-[60px] hover:scale-[0.98] active:scale-[0.96]"
                style={{
                  background: PALETTE.ink,
                  boxShadow: isSubmitting
                    ? 'none'
                    : `0 8px 32px ${PALETTE.ink}30, 0 2px 8px ${PALETTE.ink}20`,
                  transitionTimingFunction: EASE.premium,
                }}
              >
                <span>{isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}</span>
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
                    background: 'rgba(34, 197, 94, 0.08)',
                    border: '1px solid rgba(34, 197, 94, 0.25)',
                    color: '#16a34a',
                  }}
                >
                  {t('contact.form.successMessage') ||
                    "Message sent successfully! We'll be in touch."}
                </div>
              )}
              {submitStatus === 'error' && (
                <div
                  className="mt-4 p-4 rounded-xl text-center"
                  style={{
                    background: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid rgba(239, 68, 68, 0.25)',
                    color: '#dc2626',
                  }}
                >
                  {t('contact.form.errorMessage') ||
                    'Something went wrong. Please try again.'}
                </div>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

function InputField({
  label,
  labelSuffix,
  value,
  onChange,
  placeholder,
  type = 'text',
  focused,
  onFocus,
  onBlur,
}) {
  return (
    <div className="group">
      <label className="block text-sm font-medium mb-2.5" style={{ color: PALETTE.ink }}>
        {label}
        {labelSuffix && (
          <span className="ml-1.5" style={{ color: PALETTE.stone, fontWeight: 400 }}>
            {labelSuffix}
          </span>
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
          className="w-full px-5 py-4 rounded-xl transition-all duration-300 focus:outline-none min-h-[56px]"
          style={{
            background: focused ? '#ffffff' : PALETTE.ivory,
            border: `2px solid ${focused ? PALETTE.coral : 'transparent'}`,
            boxShadow: focused
              ? `0 0 0 4px ${PALETTE.coral}12, 0 12px 24px ${PALETTE.coral}08`
              : '0 2px 8px rgba(0,0,0,0.04)',
            transform: focused ? 'translateY(-2px)' : 'translateY(0)',
          }}
        />
      </div>
    </div>
  );
}

function SelectField({
  label,
  labelSuffix,
  value,
  onChange,
  placeholder,
  options,
  focused,
  onFocus,
  onBlur,
}) {
  return (
    <div className="group">
      <label className="block text-sm font-medium mb-2.5" style={{ color: PALETTE.ink }}>
        {label}
        {labelSuffix && (
          <span className="ml-1.5" style={{ color: PALETTE.stone, fontWeight: 400 }}>
            {labelSuffix}
          </span>
        )}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          className="w-full px-5 py-4 rounded-xl transition-all duration-300 focus:outline-none appearance-none cursor-pointer min-h-[56px]"
          style={{
            background: focused ? '#ffffff' : PALETTE.ivory,
            border: `2px solid ${focused ? PALETTE.coral : 'transparent'}`,
            boxShadow: focused
              ? `0 0 0 4px ${PALETTE.coral}12, 0 12px 24px ${PALETTE.coral}08`
              : '0 2px 8px rgba(0,0,0,0.04)',
            color: value ? PALETTE.ink : PALETTE.stone,
            transform: focused ? 'translateY(-2px)' : 'translateY(0)',
          }}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
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
        boxShadow: selected ? `0 4px 16px ${PALETTE.ink}25` : 'none',
        transitionTimingFunction: EASE.premium,
      }}
    >
      {children}
    </button>
  );
}
