'use client';

import { useState, FormEvent } from 'react';
import { Language } from '../config/languages';
import { getTranslation, TranslationKey } from '../utils/translations';

interface ContactFormProps {
  lang: Language;
}

export default function ContactForm({ lang }: ContactFormProps) {
  const t = (key: TranslationKey) => getTranslation(key, lang);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // In a real application, you would send the form data to a server
    // For this demo, we'll simulate a successful submission
    setFormStatus('submitting');
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      
      setFormStatus('success');
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    } catch {
      setFormStatus('error');
      
      // Reset status after 5 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 5000);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          {t('fullName')}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-800 dark:focus:ring-primary-700"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          {t('emailAddress')}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-800 dark:focus:ring-primary-700"
        />
      </div>
      
      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-1">
          {t('subject')}
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-800 dark:focus:ring-primary-700"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">
          {t('message')}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-2 border border-neutral-300 dark:border-neutral-700 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-neutral-800 dark:focus:ring-primary-700"
        ></textarea>
      </div>
      
      <div>
        <button
          type="submit"
          disabled={formStatus === 'submitting'}
          className="btn-primary w-full flex justify-center items-center"
        >
          {formStatus === 'submitting' ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {lang === 'en' ? 'Sending...' : 'Senden...'}
            </>
          ) : (
            t('send')
          )}
        </button>
      </div>
      
      {formStatus === 'success' && (
        <div className="p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 rounded-md">
          {lang === 'en'
            ? 'Thank you for your message! We will get back to you soon.'
            : 'Vielen Dank für Ihre Nachricht! Wir werden uns in Kürze bei Ihnen melden.'}
        </div>
      )}
      
      {formStatus === 'error' && (
        <div className="p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100 rounded-md">
          {lang === 'en'
            ? 'There was an error sending your message. Please try again later.'
            : 'Beim Senden Ihrer Nachricht ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.'}
        </div>
      )}
    </form>
  );
}
