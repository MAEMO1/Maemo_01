'use client';

import { useState } from 'react';
import { useTranslation } from '../../hooks/useTranslation';
import { AnimatedSection } from '../ui/AnimatedSection';

export function ContactContent() {
  const { t } = useTranslation();
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

  return (
    <div className="min-h-screen bg-ink overflow-hidden">
      {/* Floating background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute w-[600px] h-[600px] rounded-full opacity-[0.03]"
          style={{
            background: 'radial-gradient(circle, #e85d4c 0%, transparent 70%)',
            top: '10%',
            right: '-200px',
            filter: 'blur(60px)',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.02]"
          style={{
            background: 'radial-gradient(circle, #ffffff 0%, transparent 70%)',
            bottom: '20%',
            left: '-100px',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center px-6 pt-32 pb-16">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <AnimatedSection animation="fade-in-scale">
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full mb-10"
              style={{
                background: 'rgba(232, 93, 76, 0.12)',
                border: '1px solid rgba(232, 93, 76, 0.25)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#e85d4c' }} />
              <span className="text-xs font-semibold tracking-[0.2em] uppercase" style={{ color: '#e85d4c' }}>
                {t('contact.badge')}
              </span>
            </div>

            <h1 className="text-headline mb-8" style={{ color: '#ffffff', lineHeight: 1.1 }}>
              {t('contact.title').split(' ')[0]}{' '}
              <span style={{ color: '#e85d4c' }}>
                {t('contact.title').split(' ').slice(1).join(' ')}
              </span>
            </h1>

            <p className="text-xl md:text-2xl leading-relaxed max-w-2xl mx-auto" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {t('contact.subtitle')}
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Pathways Section */}
      <section className="relative px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-5">
              {/* Card 1 - Uitgenodigd */}
              <div
                className="group relative rounded-3xl p-8 transition-all duration-500 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(circle at 30% 30%, rgba(232, 93, 76, 0.15) 0%, transparent 60%)' }}
                />
                <div className="relative z-10">
                  <div className="flex items-start gap-5">
                    <div
                      className="flex items-center justify-center w-14 h-14 rounded-2xl text-white font-bold text-lg flex-shrink-0"
                      style={{
                        background: 'linear-gradient(135deg, #e85d4c 0%, #d44a3a 100%)',
                        boxShadow: '0 8px 24px rgba(232, 93, 76, 0.3)',
                      }}
                    >
                      {t('contact.pathways.invited.number')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-3" style={{ color: '#ffffff' }}>
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
                className="group relative rounded-3xl p-8 transition-all duration-500 hover:scale-[1.02]"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <div
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: 'radial-gradient(circle at 70% 30%, rgba(255, 255, 255, 0.05) 0%, transparent 60%)' }}
                />
                <div className="relative z-10">
                  <div className="flex items-start gap-5">
                    <div
                      className="flex items-center justify-center w-14 h-14 rounded-2xl font-bold text-lg flex-shrink-0"
                      style={{
                        background: 'rgba(255,255,255,0.05)',
                        border: '2px solid rgba(255,255,255,0.15)',
                        color: 'rgba(255,255,255,0.4)',
                      }}
                    >
                      {t('contact.pathways.signal.number')}
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-3" style={{ color: '#ffffff' }}>
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

            <div
              className="mt-8 rounded-2xl px-8 py-5 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(232, 93, 76, 0.08) 0%, rgba(232, 93, 76, 0.04) 100%)',
                border: '1px solid rgba(232, 93, 76, 0.15)',
              }}
            >
              <p className="text-sm" style={{ color: 'rgba(232, 93, 76, 0.9)' }}>
                {t('contact.disclaimer')}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Big Text Divider */}
      <section className="py-24 px-6">
        <AnimatedSection animation="fade-in-scale">
          <h2
            className="text-center max-w-4xl mx-auto"
            style={{
              fontFamily: "'Outfit', system-ui, sans-serif",
              fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              color: 'rgba(255,255,255,0.08)',
            }}
          >
            {t('contact.form.badge')}
          </h2>
        </AnimatedSection>
      </section>

      {/* Form Section */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-14">
              <h2 className="text-headline mb-4" style={{ color: '#1e293b' }}>
                {t('contact.form.title')}
              </h2>
              <p className="text-xl" style={{ color: '#94a3b8' }}>
                {t('contact.form.titleSuffix')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-5">
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

              <div className="grid md:grid-cols-2 gap-5">
                <SelectField
                  label={t('contact.form.sector')}
                  value={formData.sector}
                  onChange={(v) => handleInputChange('sector', v)}
                  placeholder={t('contact.form.sectorPlaceholder')}
                  options={sectors.map(s => ({ value: s, label: t(`contact.form.sectors.${s}`) }))}
                />
                <InputField
                  label={t('contact.form.region')}
                  labelSuffix={t('contact.form.regionOptional')}
                  value={formData.region}
                  onChange={(v) => handleInputChange('region', v)}
                  placeholder={t('contact.form.regionPlaceholder')}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <SelectField
                  label={t('contact.form.teamSize')}
                  labelSuffix={t('contact.form.regionOptional')}
                  value={formData.teamSize}
                  onChange={(v) => handleInputChange('teamSize', v)}
                  placeholder={t('contact.form.teamSizePlaceholder')}
                  options={teamSizes.map(s => ({ value: s, label: t(`contact.form.teamSizes.${s}`) }))}
                />
                <SelectField
                  label={t('contact.form.revenue')}
                  labelSuffix={t('contact.form.regionOptional')}
                  value={formData.revenue}
                  onChange={(v) => handleInputChange('revenue', v)}
                  placeholder={t('contact.form.revenuePlaceholder')}
                  options={revenues.map(r => ({ value: r, label: t(`contact.form.revenues.${r}`) }))}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-4" style={{ color: '#1e293b' }}>
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

              <div>
                <label className="block text-sm font-medium mb-4" style={{ color: '#1e293b' }}>
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

              <div className="h-px" style={{ background: 'linear-gradient(90deg, transparent, #e2e8f0, transparent)' }} />

              <div className="grid md:grid-cols-2 gap-5">
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

              <InputField
                label={t('contact.form.invitationCode')}
                labelSuffix={t('contact.form.invitationCodeOptional')}
                value={formData.invitationCode}
                onChange={(v) => handleInputChange('invitationCode', v)}
                placeholder={t('contact.form.invitationCodePlaceholder')}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-5 rounded-full font-semibold text-lg text-white transition-all duration-300 flex items-center justify-center gap-3 group"
                style={{ background: '#1e293b', opacity: isSubmitting ? 0.7 : 1 }}
                onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.background = '#334155'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#1e293b'; }}
              >
                {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
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
              </button>
            </form>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}

function InputField({ label, labelSuffix, value, onChange, placeholder, type = 'text' }) {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium mb-2" style={{ color: '#1e293b' }}>
        {label}
        {labelSuffix && (
          <span className="ml-1" style={{ color: '#94a3b8', fontWeight: 400 }}>{labelSuffix}</span>
        )}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder={placeholder}
        className="w-full px-5 py-4 rounded-2xl transition-all duration-300 focus:outline-none"
        style={{
          background: '#f8fafc',
          border: `2px solid ${focused ? '#e85d4c' : '#e2e8f0'}`,
          boxShadow: focused ? '0 0 0 4px rgba(232, 93, 76, 0.1)' : 'none',
        }}
      />
    </div>
  );
}

function SelectField({ label, labelSuffix, value, onChange, placeholder, options }) {
  const [focused, setFocused] = useState(false);

  return (
    <div>
      <label className="block text-sm font-medium mb-2" style={{ color: '#1e293b' }}>
        {label}
        {labelSuffix && (
          <span className="ml-1" style={{ color: '#94a3b8', fontWeight: 400 }}>{labelSuffix}</span>
        )}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full px-5 py-4 rounded-2xl transition-all duration-300 focus:outline-none appearance-none cursor-pointer"
          style={{
            background: '#f8fafc',
            border: `2px solid ${focused ? '#e85d4c' : '#e2e8f0'}`,
            boxShadow: focused ? '0 0 0 4px rgba(232, 93, 76, 0.1)' : 'none',
            color: value ? '#1e293b' : '#94a3b8',
          }}
        >
          <option value="">{placeholder}</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <svg
          className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none"
          style={{ color: '#94a3b8' }}
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
      className="px-5 py-3 rounded-full text-sm font-medium transition-all duration-300"
      style={{
        background: selected ? '#1e293b' : '#ffffff',
        color: selected ? '#ffffff' : '#64748b',
        border: `2px solid ${selected ? '#1e293b' : '#e2e8f0'}`,
        transform: selected ? 'scale(1.02)' : 'scale(1)',
      }}
    >
      {children}
    </button>
  );
}
