'use client';

import { useState, useTransition } from 'react';
import { useTranslations } from 'next-intl';
import { EmailIcon } from '@/components/ui';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  privacy: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  privacy?: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const SUBJECT_OPTIONS = [
  'volunteer',
  'participate',
  'collaboration',
  'partner',
  'info',
  'other',
] as const;

export function ContactForm() {
  const t = useTranslations('contact.form');
  const tCommon = useTranslations('common');

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
    privacy: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [isPending, startTransition] = useTransition();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = t('errors.nameRequired');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('errors.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('errors.emailInvalid');
    }

    if (!formData.subject) {
      newErrors.subject = t('errors.subjectRequired');
    }

    if (!formData.message.trim()) {
      newErrors.message = t('errors.messageRequired');
    } else if (formData.message.trim().length < 10) {
      newErrors.message = t('errors.messageTooShort');
    }

    if (!formData.privacy) {
      newErrors.privacy = t('errors.privacyRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setStatus('submitting');

    startTransition(async () => {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          setStatus('success');
          setFormData({
            name: '',
            email: '',
            subject: '',
            message: '',
            privacy: false,
          });
        } else {
          setStatus('error');
        }
      } catch {
        setStatus('error');
      }
    });
  };

  if (status === 'success') {
    return (
      <div
        className="bg-lima-pastel rounded-2xl p-8 text-center"
        role="status"
        aria-live="polite"
      >
        <div className="w-16 h-16 bg-lima/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-lima-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-lima-dark mb-2">{t('success.title')}</h3>
        <p className="text-gris-600 mb-4">{t('success.message')}</p>
        <button
          onClick={() => setStatus('idle')}
          className="text-lima-dark hover:text-lima font-medium underline focus:outline-none focus:ring-2 focus:ring-lima/50 focus:ring-offset-2 rounded"
        >
          {t('success.sendAnother')}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gris-700 mb-1.5">
          {t('name')} <span className="text-terracota" aria-hidden="true">{t('required')}</span>
          <span className="sr-only">(obligatorio)</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder={t('namePlaceholder')}
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
          className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
            errors.name
              ? 'border-terracota bg-terracota/5 focus:border-terracota focus:ring-terracota/20'
              : 'border-gris-200 hover:border-gris-300 focus:border-azul focus:ring-azul/20'
          } focus:outline-none focus:ring-3`}
        />
        {errors.name && (
          <p id="name-error" className="mt-1.5 text-sm text-terracota flex items-center gap-1" role="alert">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gris-700 mb-1.5">
          {t('email')} <span className="text-terracota" aria-hidden="true">{t('required')}</span>
          <span className="sr-only">(obligatorio)</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder={t('emailPlaceholder')}
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
          autoComplete="email"
          className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
            errors.email
              ? 'border-terracota bg-terracota/5 focus:border-terracota focus:ring-terracota/20'
              : 'border-gris-200 hover:border-gris-300 focus:border-azul focus:ring-azul/20'
          } focus:outline-none focus:ring-3`}
        />
        {errors.email && (
          <p id="email-error" className="mt-1.5 text-sm text-terracota flex items-center gap-1" role="alert">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.email}
          </p>
        )}
      </div>

      {/* Subject */}
      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-gris-700 mb-1.5">
          {t('subject')} <span className="text-terracota" aria-hidden="true">{t('required')}</span>
          <span className="sr-only">(obligatorio)</span>
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          aria-required="true"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 bg-white appearance-none cursor-pointer ${
            errors.subject
              ? 'border-terracota bg-terracota/5 focus:border-terracota focus:ring-terracota/20'
              : 'border-gris-200 hover:border-gris-300 focus:border-azul focus:ring-azul/20'
          } focus:outline-none focus:ring-3`}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236B7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 1rem center',
            backgroundSize: '1.25rem',
          }}
        >
          <option value="">{t('subjectPlaceholder')}</option>
          {SUBJECT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {t(`subjectOptions.${option}`)}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p id="subject-error" className="mt-1.5 text-sm text-terracota flex items-center gap-1" role="alert">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.subject}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gris-700 mb-1.5">
          {t('message')} <span className="text-terracota" aria-hidden="true">{t('required')}</span>
          <span className="sr-only">(obligatorio)</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={t('messagePlaceholder')}
          rows={5}
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 resize-none ${
            errors.message
              ? 'border-terracota bg-terracota/5 focus:border-terracota focus:ring-terracota/20'
              : 'border-gris-200 hover:border-gris-300 focus:border-azul focus:ring-azul/20'
          } focus:outline-none focus:ring-3`}
        />
        {errors.message && (
          <p id="message-error" className="mt-1.5 text-sm text-terracota flex items-center gap-1" role="alert">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.message}
          </p>
        )}
      </div>

      {/* Privacy */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer group min-h-[44px]">
          {/* Touch target wrapper para checkbox */}
          <span className="relative flex items-center justify-center w-11 h-11 -m-3">
            <input
              type="checkbox"
              name="privacy"
              checked={formData.privacy}
              onChange={handleChange}
              aria-required="true"
              aria-invalid={!!errors.privacy}
              aria-describedby={errors.privacy ? 'privacy-error' : undefined}
              className="w-5 h-5 rounded border-gris-300 text-azul focus:ring-3 focus:ring-azul/20 focus:border-azul cursor-pointer transition-colors"
            />
          </span>
          <span className="text-sm text-gris-600 dark:text-gris-400 group-hover:text-gris-800 dark:group-hover:text-gris-200 transition-colors pt-2.5">
            {t('privacy')} <span className="text-terracota" aria-hidden="true">{t('required')}</span>
            <span className="sr-only">(obligatorio)</span>
          </span>
        </label>
        {errors.privacy && (
          <p id="privacy-error" className="mt-1.5 text-sm text-terracota flex items-center gap-1" role="alert">
            <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors.privacy}
          </p>
        )}
      </div>

      {/* Error message */}
      {status === 'error' && (
        <div
          className="bg-terracota/10 border border-terracota/20 rounded-xl p-4 text-center"
          role="alert"
          aria-live="assertive"
        >
          <p className="text-terracota font-medium flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {t('error.title')}
          </p>
          <p className="text-sm text-terracota/80 mt-1">{t('error.message')}</p>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isPending || status === 'submitting'}
        className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {(isPending || status === 'submitting') ? (
          <>
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {t('submitting')}
          </>
        ) : (
          <>
            <EmailIcon className="w-5 h-5" />
            {tCommon('sendMessage')}
          </>
        )}
      </button>
    </form>
  );
}
