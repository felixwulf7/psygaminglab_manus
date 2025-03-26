'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

import { getTranslation } from '@/app/utils/translations';
import type { Language } from '@/app/config/languages';

// Form data type
interface FormData {
  name: string;
  goal: string;
  positiveThoughts: string;
  negativeThoughts: string;
  email: string;
}

export default function CreateGamePage() {
  const params = useParams();
  const router = useRouter();
  const [lang, setLang] = useState<Language>('en');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [gameUrl, setGameUrl] = useState<string | null>(null);
  
  // Initialize language from URL params
  useEffect(() => {
    if (params.lang) {
      const langParam = params.lang as string;
      const validLang = ['en', 'de'].includes(langParam) ? langParam as Language : 'en';
      setLang(validLang);
    }
  }, [params]);

  // Translation helper
  const t = (key: string, defaultValue: string) => {
    try {
      return getTranslation(key as any, lang) || defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/games/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          lang
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create game');
      }
      
      const result = await response.json();
      setGameUrl(result.gameUrl);
      setSuccess(true);
      reset();
    } catch (err: any) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900">
      {/* Hero Section */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            {t('createGameTitle', 'Create Your Custom Therapeutic Game')}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl">
            {t('createGameDescription', 'Design a personalized game to address your specific therapeutic needs and goals.')}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container-custom max-w-4xl">
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-6">
                    {t('formTitle', 'Tell us about your therapeutic goals')}
                  </h2>
                  
                  {error && (
                    <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-md">
                      <p>{error}</p>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block mb-2 font-medium">
                        {t('nameLabel', 'Your Name')}
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="w-full p-3 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900"
                        placeholder={t('namePlaceholder', 'Enter your name')}
                        {...register('name', { required: t('nameRequired', 'Name is required') })}
                      />
                      {errors.name && <p className="mt-1 text-red-600 dark:text-red-400 text-sm">{errors.name.message}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block mb-2 font-medium">
                        {t('emailLabel', 'Email Address')}
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full p-3 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900"
                        placeholder={t('emailPlaceholder', 'Enter your email')}
                        {...register('email', { 
                          required: t('emailRequired', 'Email is required'),
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: t('emailInvalid', 'Invalid email address')
                          }
                        })}
                      />
                      {errors.email && <p className="mt-1 text-red-600 dark:text-red-400 text-sm">{errors.email.message}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="goal" className="block mb-2 font-medium">
                        {t('goalLabel', 'Therapeutic Goal')}
                      </label>
                      <textarea
                        id="goal"
                        className="w-full p-3 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 min-h-[100px]"
                        placeholder={t('goalPlaceholder', 'Describe what you want to achieve with this game (e.g., manage anxiety, improve focus)')}
                        {...register('goal', { required: t('goalRequired', 'Therapeutic goal is required') })}
                      ></textarea>
                      {errors.goal && <p className="mt-1 text-red-600 dark:text-red-400 text-sm">{errors.goal.message}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="negativeThoughts" className="block mb-2 font-medium">
                        {t('negativeThoughtsLabel', 'Negative Thoughts to Address')}
                      </label>
                      <textarea
                        id="negativeThoughts"
                        className="w-full p-3 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 min-h-[100px]"
                        placeholder={t('negativeThoughtsPlaceholder', 'List negative thoughts or beliefs you want to address')}
                        {...register('negativeThoughts', { required: t('negativeThoughtsRequired', 'Negative thoughts are required') })}
                      ></textarea>
                      {errors.negativeThoughts && <p className="mt-1 text-red-600 dark:text-red-400 text-sm">{errors.negativeThoughts.message}</p>}
                    </div>
                    
                    <div>
                      <label htmlFor="positiveThoughts" className="block mb-2 font-medium">
                        {t('positiveThoughtsLabel', 'Positive Replacement Thoughts')}
                      </label>
                      <textarea
                        id="positiveThoughts"
                        className="w-full p-3 border border-neutral-300 dark:border-neutral-700 rounded-md bg-white dark:bg-neutral-900 min-h-[100px]"
                        placeholder={t('positiveThoughtsPlaceholder', 'What positive thoughts would you like to reinforce?')}
                        {...register('positiveThoughts', { required: t('positiveThoughtsRequired', 'Positive thoughts are required') })}
                      ></textarea>
                      {errors.positiveThoughts && <p className="mt-1 text-red-600 dark:text-red-400 text-sm">{errors.positiveThoughts.message}</p>}
                    </div>
                    
                    <div className="pt-4">
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary py-3 flex justify-center items-center"
                      >
                        {loading ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {t('creating', 'Creating your game...')}
                          </>
                        ) : (
                          t('createButton', 'Create My Custom Game')
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6 md:p-8 text-center"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                
                <h2 className="text-2xl font-bold mb-4">
                  {t('successTitle', 'Your game has been created!')}
                </h2>
                
                <p className="mb-6 text-lg">
                  {t('successMessage', 'Your custom therapeutic game is ready to play. You can access it at any time using the link below.')}
                </p>
                
                {gameUrl && (
                  <div className="mb-8">
                    <a 
                      href={gameUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="btn-primary inline-block mb-4"
                    >
                      {t('playGameButton', 'Play Your Game Now')}
                    </a>
                    
                    <div className="mt-4 p-4 bg-neutral-100 dark:bg-neutral-700 rounded-md break-all">
                      <p className="text-sm mb-1">{t('gameLink', 'Your game link:')}</p>
                      <p className="font-medium select-all">{gameUrl}</p>
                    </div>
                  </div>
                )}
                
                <button
                  onClick={() => setSuccess(false)}
                  className="btn-outline"
                >
                  {t('createAnotherButton', 'Create Another Game')}
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
      
      {/* Back to Games */}
      <section className="py-8 bg-neutral-100 dark:bg-neutral-800">
        <div className="container-custom text-center">
          <Link href={`/${lang}/games/play`} className="btn-outline">
            {t('backToGames', 'Back to Games')}
          </Link>
        </div>
      </section>
    </div>
  );
} 