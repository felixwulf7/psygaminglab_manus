'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface Model {
  id: string;
  name: string;
}

export default function CreateGamePage({ params }: { params: { lang: string } }) {
  const router = useRouter();
  const [userInput, setUserInput] = useState('');
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resultUrl, setResultUrl] = useState('');
  const { lang } = params;

  const examples = [
    'Anxiety about job loss',
    'Feeling overwhelmed by responsibilities',
    'Perfectionism',
    'Impostor syndrome',
    'Fear of rejection'
  ];

  useEffect(() => {
    // Fetch available models
    axios.get('/api/games/models')
      .then(response => {
        if (response.data.models && response.data.models.length > 0) {
          setModels(response.data.models);
          setSelectedModel(response.data.models[0].id);
        }
      })
      .catch(err => {
        console.error('Error fetching models:', err);
        setError('Failed to load AI models. Using default model instead.');
        // Set a default model if API fails
        setSelectedModel('mistralai/Mixtral-8x7B-Instruct-v0.1');
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userInput.trim()) {
      setError('Please enter what you are struggling with.');
      return;
    }
    
    setIsLoading(true);
    setError('');
    setResultUrl('');
    
    try {
      const response = await axios.post('/api/games/create', {
        userInput,
        model: selectedModel
      });
      
      if (response.data.success && response.data.url) {
        setResultUrl(response.data.url);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Error creating game:', err);
      setError('Failed to create game. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-custom py-8">
      <div className="max-w-3xl mx-auto bg-white dark:bg-neutral-800 rounded-lg shadow-md p-6 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-center text-primary-800 dark:text-primary-200">
          {lang === 'en' ? 'Create Your Custom Therapeutic Game' : 'Erstellen Sie Ihr benutzerdefiniertes therapeutisches Spiel'}
        </h1>
        
        <p className="mb-6 text-neutral-600 dark:text-neutral-300">
          {lang === 'en' 
            ? 'Transform your emotional challenges into an interactive 3D gaming experience. Enter a situation, emotion, or belief you\'re struggling with, and our system will generate a personalized therapeutic game to help you process and reframe negative thoughts.'
            : 'Verwandeln Sie Ihre emotionalen Herausforderungen in ein interaktives 3D-Spielerlebnis. Geben Sie eine Situation, Emotion oder Überzeugung ein, mit der Sie zu kämpfen haben, und unser System generiert ein personalisiertes therapeutisches Spiel, das Ihnen hilft, negative Gedanken zu verarbeiten und neu zu gestalten.'}
        </p>
        
        {!resultUrl ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="userInput" className="block font-medium mb-1 text-neutral-700 dark:text-neutral-200">
                {lang === 'en' ? 'What are you struggling with?' : 'Womit kämpfen Sie?'}
              </label>
              <textarea 
                id="userInput"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-neutral-800 dark:text-white"
                rows={4}
                placeholder={lang === 'en' 
                  ? 'Example: anxiety about job interview, feeling overwhelmed by work, etc.'
                  : 'Beispiel: Angst vor Vorstellungsgespräch, Überforderung durch Arbeit, usw.'}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {examples.map((example, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setUserInput(example)}
                  className="inline-block px-3 py-1 bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-full text-sm"
                >
                  {example}
                </button>
              ))}
            </div>
            
            {models.length > 0 && (
              <div>
                <label htmlFor="modelSelect" className="block font-medium mb-1 text-neutral-700 dark:text-neutral-200">
                  {lang === 'en' ? 'Choose AI Model' : 'KI-Modell auswählen'}
                </label>
                <select
                  id="modelSelect"
                  value={selectedModel}
                  onChange={(e) => setSelectedModel(e.target.value)}
                  className="w-full p-3 border border-neutral-300 dark:border-neutral-600 rounded-md bg-white dark:bg-neutral-700 text-neutral-800 dark:text-white"
                >
                  {models.map((model) => (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
            
            {error && (
              <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md text-red-800 dark:text-red-200">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={isLoading || !userInput.trim()}
              className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 disabled:bg-neutral-400 rounded-md text-white font-medium transition-colors"
            >
              {isLoading 
                ? (lang === 'en' ? 'Creating Game...' : 'Spiel wird erstellt...') 
                : (lang === 'en' ? 'Generate Custom Game' : 'Benutzerdefiniertes Spiel generieren')}
            </button>
          </form>
        ) : (
          <div className="text-center p-6 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
            <h2 className="text-xl font-bold mb-4 text-primary-700 dark:text-primary-300">
              {lang === 'en' ? 'Your Custom Game is Ready!' : 'Ihr benutzerdefiniertes Spiel ist bereit!'}
            </h2>
            <p className="mb-4 text-neutral-600 dark:text-neutral-300">
              {lang === 'en'
                ? 'We\'ve created a personalized therapeutic game experience based on your input.'
                : 'Wir haben ein personalisiertes therapeutisches Spielerlebnis basierend auf Ihrer Eingabe erstellt.'}
            </p>
            <div className="flex justify-center gap-4">
              <a
                href={resultUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-3 px-6 bg-primary-600 hover:bg-primary-700 rounded-md text-white font-medium transition-colors"
              >
                {lang === 'en' ? 'Play Your Custom Game' : 'Spielen Sie Ihr benutzerdefiniertes Spiel'}
              </a>
              <button
                onClick={() => {
                  setResultUrl('');
                  setUserInput('');
                }}
                className="inline-block py-3 px-6 bg-neutral-200 dark:bg-neutral-600 hover:bg-neutral-300 dark:hover:bg-neutral-500 rounded-md font-medium transition-colors"
              >
                {lang === 'en' ? 'Create Another Game' : 'Weiteres Spiel erstellen'}
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="max-w-3xl mx-auto text-center text-sm text-neutral-500 dark:text-neutral-400">
        <p>
          {lang === 'en'
            ? 'Powered by AI technology. For educational and therapeutic purposes only. Not a substitute for professional mental health care.'
            : 'Unterstützt durch KI-Technologie. Nur für Bildungs- und therapeutische Zwecke. Kein Ersatz für professionelle psychische Gesundheitsversorgung.'}
        </p>
      </div>
    </div>
  );
} 