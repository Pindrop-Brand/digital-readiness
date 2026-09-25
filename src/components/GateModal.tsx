import { useRef, useEffect, useState, useCallback } from 'react';

const PARDOT_URL = 'https://go.pindrop.com/l/1002751/2026-09-02/d97tq';

type Props = {
  onComplete: () => void;
  onDismiss: () => void;
};

export function GateModal({ onComplete, onDismiss }: Props) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [country, setCountry] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);

  // Lock body scroll while modal is open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Focus first input on open
  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  // Escape → dismiss
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onDismiss]);

  // Focus trap
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const el = dialogRef.current;
    if (!el) return;
    const focusable = Array.from(
      el.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) { e.preventDefault(); last.focus(); }
    } else {
      if (document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!firstName.trim()) e.first_name = 'Required';
    if (!lastName.trim()) e.last_name = 'Required';
    if (!email.trim()) e.email = 'Required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'Enter a valid email address';
    if (!company.trim()) e.company = 'Required';
    if (!consent) e.consent = 'Please accept to continue';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitting(true);
    // Fire-and-forget: Pardot captures the lead regardless of response
    fetch(PARDOT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        first_name: firstName,
        last_name: lastName,
        email,
        company,
        job_title: jobTitle,
        country,
        consent: '1',
      }).toString(),
    }).catch(() => {});
    onComplete();
  };

  const clearError = (key: string) =>
    setErrors((prev) => ({ ...prev, [key]: '' }));

  return (
    <div
      role="presentation"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(20,7,0,.62)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onDismiss(); }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="gate-title"
        onKeyDown={handleKeyDown}
        style={{
          background: '#FFFFFF',
          borderRadius: 4,
          overflow: 'hidden',
          width: '100%',
          maxWidth: 520,
          maxHeight: '92vh',
          overflowY: 'auto',
          border: '1px solid #E3DED3',
          boxShadow: '0 12px 40px rgba(20,7,0,.22)',
        }}
      >
        {/* Header */}
        <div
          style={{
            background: 'linear-gradient(135deg,#F0FF91,#FF5100,#8E2D00)',
            padding: '28px 26px 22px',
          }}
        >
          <h2
            id="gate-title"
            style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: 22,
              fontWeight: 600,
              color: '#FFFFFF',
              margin: '0 0 6px',
              lineHeight: 1.2,
            }}
          >
            See your results
          </h2>
          <p
            style={{
              fontFamily: "'Geist', sans-serif",
              fontSize: 14,
              color: '#FFFFFF',
              opacity: 0.92,
              margin: 0,
              lineHeight: 1.5,
            }}
          >
            Share a few details to unlock your Deepfake Readiness score and
            personalized recommendations.
          </p>
        </div>

        {/* Form */}
        <form
          id="wf-form-Content-Download"
          data-pardot-form=""
          onSubmit={handleSubmit}
          noValidate
          style={{ padding: '22px 26px 26px' }}
        >
          {/* First / Last name row */}
          <div className="gate-form-grid">
            <div>
              <label htmlFor="gate-first_name" style={labelStyle}>
                First name *
              </label>
              <input
                ref={firstInputRef}
                id="gate-first_name"
                name="first_name"
                type="text"
                autoComplete="given-name"
                required
                value={firstName}
                onChange={(e) => { setFirstName(e.target.value); clearError('first_name'); }}
                className={`gate-form-input${errors.first_name ? ' has-error' : ''}`}
                aria-describedby={errors.first_name ? 'err-first_name' : undefined}
                aria-invalid={errors.first_name ? true : undefined}
              />
              {errors.first_name && (
                <p id="err-first_name" role="alert" style={errorStyle}>
                  {errors.first_name}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="gate-last_name" style={labelStyle}>
                Last name *
              </label>
              <input
                id="gate-last_name"
                name="last_name"
                type="text"
                autoComplete="family-name"
                required
                value={lastName}
                onChange={(e) => { setLastName(e.target.value); clearError('last_name'); }}
                className={`gate-form-input${errors.last_name ? ' has-error' : ''}`}
                aria-describedby={errors.last_name ? 'err-last_name' : undefined}
                aria-invalid={errors.last_name ? true : undefined}
              />
              {errors.last_name && (
                <p id="err-last_name" role="alert" style={errorStyle}>
                  {errors.last_name}
                </p>
              )}
            </div>
          </div>

          {/* Work email */}
          <div style={{ marginBottom: 14 }}>
            <label htmlFor="gate-email" style={labelStyle}>
              Work email *
            </label>
            <input
              id="gate-email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearError('email'); }}
              className={`gate-form-input${errors.email ? ' has-error' : ''}`}
              aria-describedby={errors.email ? 'err-email' : undefined}
              aria-invalid={errors.email ? true : undefined}
            />
            {errors.email && (
              <p id="err-email" role="alert" style={errorStyle}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Company */}
          <div style={{ marginBottom: 14 }}>
            <label htmlFor="gate-company" style={labelStyle}>
              Company *
            </label>
            <input
              id="gate-company"
              name="company"
              type="text"
              autoComplete="organization"
              required
              value={company}
              onChange={(e) => { setCompany(e.target.value); clearError('company'); }}
              className={`gate-form-input${errors.company ? ' has-error' : ''}`}
              aria-describedby={errors.company ? 'err-company' : undefined}
              aria-invalid={errors.company ? true : undefined}
            />
            {errors.company && (
              <p id="err-company" role="alert" style={errorStyle}>
                {errors.company}
              </p>
            )}
          </div>

          {/* Job title / Country row */}
          <div className="gate-form-grid">
            <div>
              <label htmlFor="gate-job_title" style={labelStyle}>
                Job title
              </label>
              <input
                id="gate-job_title"
                name="job_title"
                type="text"
                autoComplete="organization-title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="gate-form-input"
              />
            </div>
            <div>
              <label htmlFor="gate-country" style={labelStyle}>
                Country
              </label>
              <input
                id="gate-country"
                name="country"
                type="text"
                autoComplete="country-name"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="gate-form-input"
              />
            </div>
          </div>

          {/* Consent */}
          <div
            style={{
              background: '#FBF9F5',
              border: `1px solid ${errors.consent ? '#D94F00' : '#E3DED3'}`,
              borderRadius: 3,
              padding: '12px 14px',
              marginBottom: 22,
            }}
          >
            <label
              style={{
                display: 'flex',
                gap: 10,
                alignItems: 'flex-start',
                cursor: 'pointer',
              }}
            >
              <input
                id="gate-consent"
                name="consent"
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => { setConsent(e.target.checked); clearError('consent'); }}
                style={{
                  marginTop: 2,
                  accentColor: '#FF5100',
                  width: 16,
                  height: 16,
                  flexShrink: 0,
                  cursor: 'pointer',
                }}
                aria-describedby={errors.consent ? 'err-consent' : undefined}
                aria-invalid={errors.consent ? true : undefined}
              />
              <span
                style={{
                  fontFamily: "'Geist', sans-serif",
                  fontSize: 13,
                  color: '#7A7166',
                  lineHeight: 1.55,
                }}
              >
                I have read and agree to the{' '}
                <a
                  href="https://www.pindrop.com/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#FF5100', textDecoration: 'underline' }}
                >
                  Privacy Policy
                </a>{' '}
                and agree to receive Pindrop emails that I can opt-out of at any
                time.
              </span>
            </label>
            {errors.consent && (
              <p
                id="err-consent"
                role="alert"
                style={{ ...errorStyle, marginTop: 6, marginLeft: 26 }}
              >
                {errors.consent}
              </p>
            )}
          </div>

          {/* Actions */}
          <div
            style={{
              display: 'flex',
              gap: 12,
              alignItems: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary-hover"
              style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                padding: '12px 24px',
                borderRadius: 999,
                border: 'none',
                background: submitting ? '#DAD5C9' : '#FF5100',
                color: submitting ? '#93897A' : '#FFFFFF',
                cursor: submitting ? 'default' : 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {submitting ? 'Submitting…' : 'See my results'}
            </button>
            <button
              type="button"
              onClick={onDismiss}
              className="btn-secondary"
              style={{
                fontFamily: "'Geist', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                padding: '12px 22px',
                borderRadius: 999,
                background: 'transparent',
                color: '#140700',
                border: '1px solid #E3DED3',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: "'Geist', sans-serif",
  fontSize: 13,
  fontWeight: 500,
  color: '#140700',
  marginBottom: 5,
};

const errorStyle: React.CSSProperties = {
  fontFamily: "'Geist Mono', monospace",
  fontSize: 11,
  color: '#D94F00',
  margin: '4px 0 0',
};
