'use client';

import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { useBreakpoint } from '../../hooks/useMediaQuery';
import { gsap } from '../../lib/gsap';

export function ContactContent() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const isDesktop = useBreakpoint('md');

  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const pathwaysRef = useRef(null);
  const formRef = useRef(null);

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
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: 'cubic-bezier(.215,.61,.355,1)' }
      );

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: 'cubic-bezier(.215,.61,.355,1)' }
      );

      // Pathways animation
      if (pathwaysRef.current) {
        const items = pathwaysRef.current.querySelectorAll('.pathway-item');
        items.forEach((item, index) => {
          gsap.fromTo(
            item,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              delay: 0.3 + index * 0.1,
              ease: 'cubic-bezier(.215,.61,.355,1)',
              scrollTrigger: {
                trigger: pathwaysRef.current,
                start: 'top 80%',
                toggleActions: 'play none none none',
              },
            }
          );
        });
      }

      // Form animation
      if (formRef.current) {
        gsap.fromTo(
          formRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'cubic-bezier(.215,.61,.355,1)',
            scrollTrigger: {
              trigger: formRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
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

  return (
    <div ref={containerRef} className="min-h-screen bg-ink">
      {/* Hero Section */}
      <section className="px-6 md:px-12 pt-32 md:pt-40 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Title */}
          <h1
            ref={titleRef}
            className="text-white mb-6"
            style={{
              fontSize: isDesktop ? 'clamp(3rem, 8vw, 6rem)' : 'clamp(2.5rem, 10vw, 4rem)',
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: '-0.03em',
              opacity: 0,
            }}
          >
            {t('contact.title')}
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-white/50 text-lg md:text-xl max-w-md mx-auto"
            style={{ opacity: 0 }}
          >
            {t('contact.subtitle')}
          </p>
        </div>
      </section>

      {/* Pathways Section */}
      <section ref={pathwaysRef} className="px-6 md:px-12 pb-16 md:pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Pathway 01 */}
            <div className="pathway-item" style={{ opacity: 0 }}>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-coral font-medium">01</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h3 className="text-white text-xl font-semibold mb-3">
                {t('contact.pathways.invited.title')}
              </h3>
              <p className="text-white/50 leading-relaxed">
                {t('contact.pathways.invited.description')}
              </p>
            </div>

            {/* Pathway 02 */}
            <div className="pathway-item" style={{ opacity: 0 }}>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-white/30 font-medium">02</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              <h3 className="text-white text-xl font-semibold mb-3">
                {t('contact.pathways.signal.title')}
              </h3>
              <p className="text-white/50 leading-relaxed">
                {t('contact.pathways.signal.description')}
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="mt-12 text-white/40 text-sm text-center max-w-xl mx-auto">
            {t('contact.disclaimer')}
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="bg-white py-20 md:py-28 px-6 md:px-12">
        <div ref={formRef} className="max-w-2xl mx-auto" style={{ opacity: 0 }}>
          {/* Form header */}
          <div className="text-center mb-12">
            <h2
              className="mb-4"
              style={{
                fontSize: isDesktop ? 'clamp(2rem, 5vw, 3rem)' : 'clamp(1.75rem, 6vw, 2.5rem)',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: '#0f172a',
                lineHeight: 1.1,
              }}
            >
              {t('contact.form.title')}
            </h2>
            <p className="text-stone">{t('contact.form.titleSuffix')}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Company info */}
            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                label={t('contact.form.companyName')}
                value={formData.companyName}
                onChange={(v) => handleInputChange('companyName', v)}
                placeholder={t('contact.form.companyNamePlaceholder')}
              />
              <InputField
                label={t('contact.form.website')}
                value={formData.website}
                onChange={(v) => handleInputChange('website', v)}
                placeholder={t('contact.form.websitePlaceholder')}
                type="url"
              />
            </div>

            {/* Sector & Region */}
            <div className="grid md:grid-cols-2 gap-6">
              <SelectField
                label={t('contact.form.sector')}
                value={formData.sector}
                onChange={(v) => handleInputChange('sector', v)}
                placeholder={t('contact.form.sectorPlaceholder')}
                options={sectors.map((s) => ({ value: s, label: t(`contact.form.sectors.${s}`) }))}
              />
              <InputField
                label={t('contact.form.region')}
                labelSuffix={t('contact.form.regionOptional')}
                value={formData.region}
                onChange={(v) => handleInputChange('region', v)}
                placeholder={t('contact.form.regionPlaceholder')}
              />
            </div>

            {/* Team & Revenue */}
            <div className="grid md:grid-cols-2 gap-6">
              <SelectField
                label={t('contact.form.teamSize')}
                labelSuffix={t('contact.form.regionOptional')}
                value={formData.teamSize}
                onChange={(v) => handleInputChange('teamSize', v)}
                placeholder={t('contact.form.teamSizePlaceholder')}
                options={teamSizes.map((s) => ({ value: s, label: t(`contact.form.teamSizes.${s}`) }))}
              />
              <SelectField
                label={t('contact.form.revenue')}
                labelSuffix={t('contact.form.regionOptional')}
                value={formData.revenue}
                onChange={(v) => handleInputChange('revenue', v)}
                placeholder={t('contact.form.revenuePlaceholder')}
                options={revenues.map((r) => ({ value: r, label: t(`contact.form.revenues.${r}`) }))}
              />
            </div>

            {/* Goals */}
            <div>
              <label className="block text-sm font-medium mb-4 text-ink">
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
            <div>
              <label className="block text-sm font-medium mb-4 text-ink">
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
            <div className="h-px bg-gray-100" />

            {/* Contact info */}
            <div className="grid md:grid-cols-2 gap-6">
              <InputField
                label={t('contact.form.name')}
                value={formData.name}
                onChange={(v) => handleInputChange('name', v)}
                placeholder={t('contact.form.namePlaceholder')}
              />
              <InputField
                label={t('contact.form.email')}
                value={formData.email}
                onChange={(v) => handleInputChange('email', v)}
                placeholder={t('contact.form.emailPlaceholder')}
                type="email"
              />
            </div>

            {/* Invitation code */}
            <InputField
              label={t('contact.form.invitationCode')}
              labelSuffix={t('contact.form.invitationCodeOptional')}
              value={formData.invitationCode}
              onChange={(v) => handleInputChange('invitationCode', v)}
              placeholder={t('contact.form.invitationCodePlaceholder')}
            />

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 bg-ink text-white font-semibold text-lg transition-opacity duration-200 hover:opacity-80 disabled:opacity-50 flex items-center justify-center gap-3"
              >
                <span>{isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}</span>
                {!isSubmitting && (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                )}
                {isSubmitting && (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                )}
              </button>

              {/* Status messages */}
              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-50 text-green-700 text-center">
                  {t('contact.form.successMessage')}
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-50 text-red-700 text-center">
                  {t('contact.form.errorMessage')}
                </div>
              )}
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}

function InputField({ label, labelSuffix, value, onChange, placeholder, type = 'text' }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-ink">
        {label}
        {labelSuffix && <span className="ml-1 text-stone font-normal">{labelSuffix}</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-4 bg-gray-50 border-0 focus:outline-none focus:ring-2 focus:ring-coral/20 transition-all"
      />
    </div>
  );
}

function SelectField({ label, labelSuffix, value, onChange, placeholder, options }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 text-ink">
        {label}
        {labelSuffix && <span className="ml-1 text-stone font-normal">{labelSuffix}</span>}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-4 bg-gray-50 border-0 focus:outline-none focus:ring-2 focus:ring-coral/20 transition-all appearance-none cursor-pointer text-ink"
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone pointer-events-none"
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
      className="px-5 py-3 text-sm font-medium transition-all duration-200"
      style={{
        background: selected ? '#0f172a' : '#f8fafc',
        color: selected ? '#ffffff' : '#64748b',
      }}
    >
      {children}
    </button>
  );
}
