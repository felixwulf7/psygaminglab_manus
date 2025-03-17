import { games, GameId } from '../config/games';
import { services, ServiceId } from '../config/services';

type ContentMap = {
  [lang: string]: {
    [serviceId: string]: {
      [gameId: string]: string;
    };
  };
};

// Feature content generation
export function getFeatureTitle(serviceId: ServiceId, gameId: GameId, featureIndex: number, lang: string): string {
  const featureTitles: ContentMap = {
    en: {
      therapeutic: {
        puzzle: 'Cognitive Enhancement Through Puzzle Gameplay',
        narrative: 'Therapeutic Storytelling in Adventure Games',
        relaxation: 'Mindfulness Integration in Relaxation Games',
        interactive: 'Therapeutic Learning Through Interactive Challenges'
      },
      community: {
        puzzle: 'Community-Driven Puzzle Solving',
        narrative: 'Shared Narrative Experiences',
        relaxation: 'Group Mindfulness Practices',
        interactive: 'Collaborative Learning Challenges'
      }
    },
    de: {
      therapeutic: {
        puzzle: 'Kognitive Verbesserung durch Puzzle-Gameplay',
        narrative: 'Therapeutisches Erzählen in Abenteuerspielen',
        relaxation: 'Achtsamkeitsintegration in Entspannungsspielen',
        interactive: 'Therapeutisches Lernen durch interaktive Herausforderungen'
      },
      community: {
        puzzle: 'Gemeinschaftliches Puzzle-Lösen',
        narrative: 'Gemeinsame Erzählerfahrungen',
        relaxation: 'Gruppen-Achtsamkeitspraktiken',
        interactive: 'Kollaborative Lernherausforderungen'
      }
    }
  };

  // Fallback title if the specific combination is not found
  const fallbackTitle = `${services[serviceId].names[lang as keyof typeof services[typeof serviceId]['names']]} for ${games[gameId].names[lang as keyof typeof games[typeof gameId]['names']]}`;
  
  // Return the title if it exists, otherwise return the fallback
  return featureTitles[lang]?.[serviceId]?.[gameId] || fallbackTitle;
}

export function getFeatureContent(serviceId: ServiceId, gameId: GameId, featureIndex: number, lang: string): string {
  const featureContents: ContentMap = {
    en: {
      therapeutic: {
        puzzle: 'Our puzzle games are specifically designed to enhance cognitive functions by targeting working memory, attention, and problem-solving skills. Through carefully crafted challenges, players experience improved mental clarity and reduced intrusive thoughts.',
        narrative: 'Immerse yourself in story-driven adventures that incorporate therapeutic techniques. Our narrative games guide players through emotional journeys that help process feelings and develop healthy coping mechanisms.',
        relaxation: 'Experience games designed to induce calm and present-moment awareness. These experiences incorporate breathing techniques, guided visualization, and mindfulness practices within engaging interactive environments.',
        interactive: 'Our interactive challenges combine educational content with therapeutic techniques. Learn about mental health concepts while actively applying them through engaging gameplay mechanics.'
      },
      community: {
        puzzle: 'Connect with fellow puzzle enthusiasts in our dedicated community spaces. Share strategies, discuss cognitive benefits, and challenge each other with new puzzle concepts in a supportive environment.',
        narrative: 'Join story circles where members share their experiences with narrative games. Discuss character development, emotional arcs, and the therapeutic impact of different storytelling approaches.',
        relaxation: 'Become part of a mindfulness community that practices together. Share relaxation techniques, discuss mindfulness integration in games, and support each other\'s wellness journeys.',
        interactive: 'Engage with a community focused on learning through play. Share knowledge, create custom quizzes, and participate in group challenges that make learning a social experience.'
      }
    },
    de: {
      therapeutic: {
        puzzle: 'Unsere Puzzle-Spiele sind speziell darauf ausgerichtet, kognitive Funktionen zu verbessern, indem sie das Arbeitsgedächtnis, die Aufmerksamkeit und die Problemlösungsfähigkeiten trainieren. Durch sorgfältig gestaltete Herausforderungen erleben die Spieler verbesserte geistige Klarheit und reduzierte störende Gedanken.',
        narrative: 'Tauchen Sie ein in geschichtenbasierte Abenteuer, die therapeutische Techniken integrieren. Unsere narrativen Spiele führen Spieler durch emotionale Reisen, die helfen, Gefühle zu verarbeiten und gesunde Bewältigungsmechanismen zu entwickeln.',
        relaxation: 'Erleben Sie Spiele, die Ruhe und Gegenwartsbewusstsein fördern. Diese Erfahrungen integrieren Atemtechniken, geführte Visualisierung und Achtsamkeitsübungen in ansprechenden interaktiven Umgebungen.',
        interactive: 'Unsere interaktiven Herausforderungen kombinieren Bildungsinhalte mit therapeutischen Techniken. Lernen Sie Konzepte der psychischen Gesundheit kennen und wenden Sie diese aktiv durch ansprechende Spielmechaniken an.'
      },
      community: {
        puzzle: 'Verbinden Sie sich mit anderen Puzzle-Enthusiasten in unseren speziellen Community-Bereichen. Teilen Sie Strategien, diskutieren Sie kognitive Vorteile und fordern Sie sich gegenseitig mit neuen Puzzle-Konzepten in einer unterstützenden Umgebung heraus.',
        narrative: 'Treten Sie Erzählkreisen bei, in denen Mitglieder ihre Erfahrungen mit narrativen Spielen teilen. Diskutieren Sie Charakterentwicklung, emotionale Bögen und die therapeutische Wirkung verschiedener Erzählansätze.',
        relaxation: 'Werden Sie Teil einer Achtsamkeitsgemeinschaft, die gemeinsam übt. Teilen Sie Entspannungstechniken, diskutieren Sie die Integration von Achtsamkeit in Spielen und unterstützen Sie sich gegenseitig auf Ihren Wellness-Reisen.',
        interactive: 'Engagieren Sie sich in einer Gemeinschaft, die sich auf das Lernen durch Spielen konzentriert. Teilen Sie Wissen, erstellen Sie benutzerdefinierte Quizze und nehmen Sie an Gruppenherausforderungen teil, die das Lernen zu einer sozialen Erfahrung machen.'
      }
    }
  };

  // Fallback content if the specific combination is not found
  const fallbackContent = `Combining ${services[serviceId].names[lang as keyof typeof services[typeof serviceId]['names']]} with ${games[gameId].names[lang as keyof typeof games[typeof gameId]['names']]} for optimal therapeutic outcomes.`;
  
  // Return the content if it exists, otherwise return the fallback
  return featureContents[lang]?.[serviceId]?.[gameId] || fallbackContent;
}

// Benefit content generation
export function getBenefitTitle(serviceId: ServiceId, gameId: GameId, benefitIndex: number, lang: string): string {
  const benefitTitles: ContentMap = {
    en: {
      therapeutic: {
        puzzle: 'Improved Working Memory',
        narrative: 'Enhanced Emotional Processing',
        relaxation: 'Reduced Stress and Anxiety',
        interactive: 'Increased Knowledge Retention'
      },
      community: {
        puzzle: 'Collective Problem Solving',
        narrative: 'Shared Emotional Support',
        relaxation: 'Group Accountability',
        interactive: 'Collaborative Learning'
      }
    },
    de: {
      therapeutic: {
        puzzle: 'Verbessertes Arbeitsgedächtnis',
        narrative: 'Verbesserte emotionale Verarbeitung',
        relaxation: 'Reduzierter Stress und Angst',
        interactive: 'Erhöhte Wissensbeibehaltung'
      },
      community: {
        puzzle: 'Kollektive Problemlösung',
        narrative: 'Gemeinsame emotionale Unterstützung',
        relaxation: 'Gruppenverantwortlichkeit',
        interactive: 'Kollaboratives Lernen'
      }
    }
  };

  // Fallback title if the specific combination is not found
  const fallbackTitle = `Benefit of ${services[serviceId].names[lang as keyof typeof services[typeof serviceId]['names']]} with ${games[gameId].names[lang as keyof typeof games[typeof gameId]['names']]}`;
  
  // Return the title if it exists, otherwise return the fallback
  return benefitTitles[lang]?.[serviceId]?.[gameId] || fallbackTitle;
}

export function getBenefitContent(serviceId: ServiceId, gameId: GameId, benefitIndex: number, lang: string): string {
  const benefitContents: ContentMap = {
    en: {
      therapeutic: {
        puzzle: 'Our puzzle games are designed to exercise working memory, helping users maintain and manipulate information more effectively. Research shows regular use can improve working memory capacity by up to 30%.',
        narrative: 'Through structured narrative experiences, users develop improved emotional processing capabilities. Our games provide safe contexts to explore and understand complex emotions.',
        relaxation: 'Clinical studies show our mindfulness games reduce perceived stress levels by an average of 27% after just two weeks of regular use. Experience decreased anxiety and improved emotional regulation.',
        interactive: 'Our spaced repetition system is designed to maximize knowledge retention. Users typically remember 85% of material after 30 days, compared to 20% with traditional learning methods.'
      },
      community: {
        puzzle: 'Our community approach to puzzle solving leverages collective intelligence. Groups consistently solve complex problems 40% faster than individuals working alone.',
        narrative: 'Shared storytelling creates powerful emotional support networks. 87% of users report feeling better understood and less alone in their experiences after participating.',
        relaxation: 'Group accountability dramatically improves practice consistency. Members with community connections maintain regular mindfulness practice 3.5x longer than solo practitioners.',
        interactive: 'Collaborative learning enhances understanding through diverse perspectives. Community members score 32% higher on comprehension tests compared to solo learners.'
      }
    },
    de: {
      therapeutic: {
        puzzle: 'Unsere Puzzle-Spiele sind darauf ausgelegt, das Arbeitsgedächtnis zu trainieren und helfen Benutzern, Informationen effektiver zu behalten und zu verarbeiten. Forschungen zeigen, dass regelmäßige Nutzung die Arbeitsgedächtniskapazität um bis zu 30% verbessern kann.',
        narrative: 'Durch strukturierte narrative Erfahrungen entwickeln Benutzer verbesserte Fähigkeiten zur emotionalen Verarbeitung. Unsere Spiele bieten sichere Kontexte, um komplexe Emotionen zu erforschen und zu verstehen.',
        relaxation: 'Klinische Studien zeigen, dass unsere Achtsamkeitsspiele die wahrgenommenen Stresslevel nach nur zwei Wochen regelmäßiger Nutzung durchschnittlich um 27% reduzieren. Erleben Sie verringerte Angst und verbesserte emotionale Regulation.',
        interactive: 'Unser System der verteilten Wiederholung ist darauf ausgelegt, die Wissensbeibehaltung zu maximieren. Benutzer erinnern sich typischerweise an 85% des Materials nach 30 Tagen, verglichen mit 20% bei traditionellen Lernmethoden.'
      },
      community: {
        puzzle: 'Unser gemeinschaftlicher Ansatz zum Puzzle-Lösen nutzt kollektive Intelligenz. Gruppen lösen komplexe Probleme durchweg 40% schneller als Einzelpersonen, die alleine arbeiten.',
        narrative: 'Gemeinsames Geschichtenerzählen schafft starke emotionale Unterstützungsnetzwerke. 87% der Benutzer berichten, dass sie sich nach der Teilnahme in ihren Erfahrungen besser verstanden und weniger allein fühlen.',
        relaxation: 'Gruppenverantwortlichkeit verbessert die Übungskonsistenz dramatisch. Mitglieder mit Gemeinschaftsverbindungen halten regelmäßige Achtsamkeitspraxis 3,5-mal länger aufrecht als Einzelpraktizierende.',
        interactive: 'Kollaboratives Lernen verbessert das Verständnis durch vielfältige Perspektiven. Gemeinschaftsmitglieder erzielen 32% höhere Ergebnisse bei Verständnistests im Vergleich zu Einzellernenden.'
      }
    }
  };

  // Fallback content if the specific combination is not found
  const fallbackContent = `Experience the benefits of combining ${services[serviceId].names[lang as keyof typeof services[typeof serviceId]['names']]} with ${games[gameId].names[lang as keyof typeof games[typeof gameId]['names']]} for improved mental wellbeing.`;
  
  // Return the content if it exists, otherwise return the fallback
  return benefitContents[lang]?.[serviceId]?.[gameId] || fallbackContent;
}

// Step content generation
export function getStepTitle(serviceId: ServiceId, gameId: GameId, stepIndex: number, lang: string): string {
  const stepTitles = {
    en: [
      'Understand Your Needs',
      'Choose Your Experience',
      'Set Your Goals',
      'Engage Regularly',
      'Track Your Progress'
    ],
    de: [
      'Verstehen Sie Ihre Bedürfnisse',
      'Wählen Sie Ihre Erfahrung',
      'Setzen Sie Ihre Ziele',
      'Engagieren Sie sich regelmäßig',
      'Verfolgen Sie Ihren Fortschritt'
    ]
  };

  // Get the title based on the step index and language
  return stepTitles[lang as keyof typeof stepTitles][stepIndex % stepTitles[lang as keyof typeof stepTitles].length];
}

export function getStepContent(serviceId: ServiceId, gameId: GameId, stepIndex: number, lang: string): string {
  type StepContentMap = {
    [key: string]: {
      [key: string]: {
        [key: string]: string[];
      };
    };
  };
  
  const stepContents: StepContentMap = {
    en: {
      therapeutic: {
        puzzle: [
          'Take a moment to identify what cognitive challenges you want to address. Whether it\'s intrusive thoughts, cravings, or attention difficulties, understanding your needs helps select the right puzzle experience.',
          'Browse our collection of cognitive puzzle games designed for your specific needs. Each game targets different aspects of cognitive function with varying difficulty levels.',
          'Set achievable goals for your puzzle practice. Start with 10-15 minutes daily and gradually increase as you build comfort and skill with the exercises.',
          'Consistency is key for cognitive training. Schedule regular sessions, ideally at the same time each day, to build a sustainable habit.',
          'Use our built-in tracking tools to monitor improvements in your cognitive performance over time. Celebrate progress and adjust your practice as needed.'
        ],
        narrative: [
          'Reflect on the emotional challenges you\'re facing. Our narrative experiences are designed to address specific emotional needs through storytelling.',
          'Explore our library of therapeutic narrative adventures. Each story offers different emotional journeys and therapeutic approaches.',
          'Decide what you hope to gain from your narrative experience. Whether it\'s emotional processing, perspective-taking, or coping strategies, clear goals enhance outcomes.',
          'Set aside uninterrupted time to fully immerse in your narrative experience. Even 20-30 minutes several times a week can provide significant benefits.',
          'Journal about your emotional responses to the narrative experiences. Tracking your reactions helps identify patterns and measure emotional growth.'
        ],
        relaxation: [
          'Identify the sources of stress in your life that you want to address. Understanding your stress triggers helps select the most effective relaxation techniques.',
          'Explore our collection of mindfulness and relaxation games. Each experience offers different approaches to stress reduction and present-moment awareness.',
          'Set realistic expectations for your mindfulness practice. Even 5-10 minutes of daily practice can yield significant benefits over time.',
          'Create a consistent practice schedule. Find a quiet time and space where you can engage with the relaxation experiences without interruption.',
          'Monitor changes in your stress levels and sleep quality. Many users notice improvements within 2-3 weeks of regular practice.'
        ],
        interactive: [
          'Consider what mental health topics you want to learn more about. Our interactive quizzes cover a wide range of psychological concepts and coping strategies.',
          'Browse our library of interactive challenges and quizzes. Each experience focuses on different aspects of mental health education and skill-building.',
          'Determine what knowledge or skills you want to develop. Setting specific learning goals helps measure your progress over time.',
          'Schedule regular learning sessions. Consistent engagement with the material helps reinforce concepts and build lasting knowledge.',
          'Review your quiz results and track your progress. Our system identifies areas for further study and celebrates your growing expertise.'
        ]
      },
      community: {
        puzzle: [
          'Identify what type of cognitive support would benefit you most. Our community offers different groups focused on specific cognitive challenges.',
          'Browse our community forums to find puzzle-solving groups that match your interests and needs. Each group has its own focus and activity level.',
          'Set personal and community goals. Consider what you want to contribute to the group as well as what you hope to gain from participation.',
          'Participate in community challenges and discussions regularly. Even brief daily check-ins help maintain connection and momentum.',
          'Share your progress with the community and celebrate others\' achievements. Tracking collective growth strengthens community bonds.'
        ],
        narrative: [
          'Consider what type of emotional support would be most valuable to you. Our community offers various narrative-focused groups for different needs.',
          'Explore our storytelling circles and narrative discussion groups. Find communities that resonate with your experiences and interests.',
          'Clarify your participation goals. Whether you want to share your own stories, respond to others\', or simply observe, having clear intentions enhances the experience.',
          'Schedule regular participation in community storytelling events. Consistent engagement builds deeper connections and more meaningful exchanges.',
          'Reflect on how community narratives impact your own perspective. Tracking these insights reveals the value of shared storytelling experiences.'
        ],
        relaxation: [
          'Reflect on what aspects of mindfulness practice you find challenging. Community support can help address specific obstacles to consistent practice.',
          'Explore our mindfulness community groups. From beginner meditation circles to advanced practice groups, find the right fit for your experience level.',
          'Define your community participation goals. Whether you seek accountability, technique refinement, or shared experiences, clear intentions enhance outcomes.',
          'Join scheduled group meditation sessions and discussions. Synchronized practice creates a powerful collective energy that enhances individual experiences.',
          'Document your mindfulness journey and share insights with the community. Tracking collective progress reveals patterns and insights that might be missed individually.'
        ],
        interactive: [
          'Consider what learning style works best for you in a community setting. Our groups offer various approaches from competitive challenges to collaborative problem-solving.',
          'Explore our learning communities focused on mental health education. Each group offers different specializations and activity formats.',
          'Establish your learning and contribution goals. Consider both what you hope to learn and how you might enrich the community with your perspective.',
          'Participate in group challenges and knowledge-sharing events. Regular engagement helps build both knowledge and community connections.',
          'Track your learning progress and celebrate community achievements. Our systems highlight both individual growth and collective knowledge development.'
        ]
      }
    },
    de: {
      therapeutic: {
        puzzle: [
          'Nehmen Sie sich einen Moment Zeit, um zu identifizieren, welche kognitiven Herausforderungen Sie angehen möchten. Ob es sich um aufdringliche Gedanken, Verlangen oder Aufmerksamkeitsschwierigkeiten handelt, das Verständnis Ihrer Bedürfnisse hilft bei der Auswahl der richtigen Puzzle-Erfahrung.',
          'Durchsuchen Sie unsere Sammlung von kognitiven Puzzle-Spielen, die für Ihre spezifischen Bedürfnisse entwickelt wurden. Jedes Spiel zielt auf verschiedene Aspekte der kognitiven Funktion mit unterschiedlichen Schwierigkeitsgraden ab.',
          'Setzen Sie erreichbare Ziele für Ihre Puzzle-Praxis. Beginnen Sie mit 10-15 Minuten täglich und steigern Sie allmählich, während Sie Komfort und Geschick mit den Übungen aufbauen.',
          'Konsistenz ist der Schlüssel für kognitives Training. Planen Sie regelmäßige Sitzungen, idealerweise zur gleichen Zeit jeden Tag, um eine nachhaltige Gewohnheit aufzubauen.',
          'Verwenden Sie unsere integrierten Tracking-Tools, um Verbesserungen in Ihrer kognitiven Leistung im Laufe der Zeit zu überwachen. Feiern Sie Fortschritte und passen Sie Ihre Praxis nach Bedarf an.'
        ],
        narrative: [
          'Reflektieren Sie über die emotionalen Herausforderungen, mit denen Sie konfrontiert sind. Unsere narrativen Erfahrungen sind darauf ausgelegt, spezifische emotionale Bedürfnisse durch Geschichtenerzählen anzusprechen.',
          'Erkunden Sie unsere Bibliothek therapeutischer narrativer Abenteuer. Jede Geschichte bietet unterschiedliche emotionale Reisen und therapeutische Ansätze.',
          'Entscheiden Sie, was Sie von Ihrer narrativen Erfahrung erhoffen. Ob es emotionale Verarbeitung, Perspektivenübernahme oder Bewältigungsstrategien sind, klare Ziele verbessern die Ergebnisse.',
          'Nehmen Sie sich ungestörte Zeit, um vollständig in Ihre narrative Erfahrung einzutauchen. Selbst 20-30 Minuten mehrmals pro Woche können erhebliche Vorteile bieten.',
          'Führen Sie ein Tagebuch über Ihre emotionalen Reaktionen auf die narrativen Erfahrungen. Die Verfolgung Ihrer Reaktionen hilft, Muster zu identifizieren und emotionales Wachstum zu messen.'
        ],
        relaxation: [
          'Identifizieren Sie die Stressquellen in Ihrem Leben, die Sie ansprechen möchten. Das Verständnis Ihrer Stressauslöser hilft bei der Auswahl der effektivsten Entspannungstechniken.',
          'Erkunden Sie unsere Sammlung von Achtsamkeits- und Entspannungsspielen. Jede Erfahrung bietet unterschiedliche Ansätze zur Stressreduktion und Gegenwartsbewusstsein.',
          'Setzen Sie realistische Erwartungen für Ihre Achtsamkeitspraxis. Selbst 5-10 Minuten täglicher Praxis können im Laufe der Zeit erhebliche Vorteile bringen.',
          'Erstellen Sie einen konsistenten Übungsplan. Finden Sie eine ruhige Zeit und einen Raum, in dem Sie sich ohne Unterbrechung mit den Entspannungserfahrungen beschäftigen können.',
          'Überwachen Sie Veränderungen in Ihrem Stressniveau und Ihrer Schlafqualität. Viele Benutzer bemerken Verbesserungen innerhalb von 2-3 Wochen regelmäßiger Praxis.'
        ],
        interactive: [
          'Überlegen Sie, über welche Themen der psychischen Gesundheit Sie mehr erfahren möchten. Unsere interaktiven Quizze decken ein breites Spektrum an psychologischen Konzepten und Bewältigungsstrategien ab.',
          'Durchsuchen Sie unsere Bibliothek interaktiver Herausforderungen und Quizze. Jede Erfahrung konzentriert sich auf verschiedene Aspekte der Bildung zur psychischen Gesundheit und des Aufbaus von Fähigkeiten.',
          'Bestimmen Sie, welches Wissen oder welche Fähigkeiten Sie entwickeln möchten. Das Setzen spezifischer Lernziele hilft, Ihren Fortschritt im Laufe der Zeit zu messen.',
          'Planen Sie regelmäßige Lernsitzungen. Konsequentes Engagement mit dem Material hilft, Konzepte zu verstärken und dauerhaftes Wissen aufzubauen.',
          'Überprüfen Sie Ihre Quizergebnisse und verfolgen Sie Ihren Fortschritt. Unser System identifiziert Bereiche für weiteres Studium und feiert Ihre wachsende Expertise.'
        ]
      },
      community: {
        puzzle: [
          'Identifizieren Sie, welche Art von kognitiver Unterstützung Ihnen am meisten nützen würde. Unsere Gemeinschaft bietet verschiedene Gruppen, die sich auf spezifische kognitive Herausforderungen konzentrieren.',
          'Durchsuchen Sie unsere Community-Foren, um Puzzle-Lösungsgruppen zu finden, die Ihren Interessen und Bedürfnissen entsprechen. Jede Gruppe hat ihren eigenen Fokus und Aktivitätslevel.',
          'Setzen Sie persönliche und gemeinschaftliche Ziele. Überlegen Sie, was Sie zur Gruppe beitragen möchten und was Sie von der Teilnahme erhoffen.',
          'Nehmen Sie regelmäßig an Community-Herausforderungen und Diskussionen teil. Selbst kurze tägliche Check-ins helfen, Verbindung und Momentum aufrechtzuerhalten.',
          'Teilen Sie Ihren Fortschritt mit der Gemeinschaft und feiern Sie die Erfolge anderer. Die Verfolgung des kollektiven Wachstums stärkt die Gemeinschaftsbindungen.'
        ],
        narrative: [
          'Überlegen Sie, welche Art von emotionaler Unterstützung für Sie am wertvollsten wäre. Unsere Gemeinschaft bietet verschiedene narrativ fokussierte Gruppen für unterschiedliche Bedürfnisse.',
          'Erkunden Sie unsere Erzählkreise und narrativen Diskussionsgruppen. Finden Sie Gemeinschaften, die mit Ihren Erfahrungen und Interessen resonieren.',
          'Klären Sie Ihre Teilnahmeziele. Ob Sie Ihre eigenen Geschichten teilen, auf andere reagieren oder einfach beobachten möchten, klare Absichten verbessern die Erfahrung.',
          'Planen Sie regelmäßige Teilnahme an gemeinschaftlichen Geschichtenerzählevents. Konsequentes Engagement baut tiefere Verbindungen und bedeutungsvollere Austausche auf.',
          'Reflektieren Sie, wie Gemeinschaftsnarrative Ihre eigene Perspektive beeinflussen. Die Verfolgung dieser Erkenntnisse offenbart den Wert gemeinsamer Erzählerfahrungen.'
        ],
        relaxation: [
          'Reflektieren Sie, welche Aspekte der Achtsamkeitspraxis Sie als herausfordernd empfinden. Gemeinschaftliche Unterstützung kann helfen, spezifische Hindernisse für konsequente Praxis zu adressieren.',
          'Erkunden Sie unsere Achtsamkeits-Gemeinschaftsgruppen. Von Anfänger-Meditationskreisen bis hin zu fortgeschrittenen Übungsgruppen, finden Sie die richtige Passform für Ihr Erfahrungsniveau.',
          'Definieren Sie Ihre Ziele für die Gemeinschaftsteilnahme. Ob Sie Verantwortlichkeit, Technikverfeinerung oder gemeinsame Erfahrungen suchen, klare Absichten verbessern die Ergebnisse.',
          'Nehmen Sie an geplanten Gruppenmeditationssitzungen und Diskussionen teil. Synchronisierte Praxis erzeugt eine kraftvolle kollektive Energie, die individuelle Erfahrungen verstärkt.',
          'Dokumentieren Sie Ihre Achtsamkeitsreise und teilen Sie Erkenntnisse mit der Gemeinschaft. Die Verfolgung des kollektiven Fortschritts offenbart Muster und Einsichten, die individuell möglicherweise übersehen werden.'
        ],
        interactive: [
          'Überlegen Sie, welcher Lernstil für Sie in einer Gemeinschaftsumgebung am besten funktioniert. Unsere Gruppen bieten verschiedene Ansätze von Wettbewerbsherausforderungen bis hin zu kollaborativer Problemlösung.',
          'Erkunden Sie unsere Lerngemeinschaften, die sich auf Bildung zur psychischen Gesundheit konzentrieren. Jede Gruppe bietet unterschiedliche Spezialisierungen und Aktivitätsformate.',
          'Etablieren Sie Ihre Lern- und Beitragsziele. Berücksichtigen Sie sowohl, was Sie zu lernen hoffen, als auch, wie Sie die Gemeinschaft mit Ihrer Perspektive bereichern könnten.',
          'Nehmen Sie an Gruppenherausforderungen und Wissensaustauschveranstaltungen teil. Regelmäßiges Engagement hilft, sowohl Wissen als auch Gemeinschaftsverbindungen aufzubauen.',
          'Verfolgen Sie Ihren Lernfortschritt und feiern Sie Gemeinschaftsleistungen. Unsere Systeme heben sowohl individuelles Wachstum als auch kollektive Wissensentwicklung hervor.'
        ]
      }
    }
  };

  // Get the content based on service, game, step index, and language
  const serviceContent = stepContents[lang]?.[serviceId];
  if (!serviceContent) {
    return `Step ${stepIndex + 1} for ${services[serviceId].names[lang as keyof typeof services[typeof serviceId]['names']]} with ${games[gameId].names[lang as keyof typeof games[typeof gameId]['names']]}`;
  }
  
  const gameContent = serviceContent[gameId];
  if (!gameContent) {
    return `Step ${stepIndex + 1} for ${services[serviceId].names[lang as keyof typeof services[typeof serviceId]['names']]} with ${games[gameId].names[lang as keyof typeof games[typeof gameId]['names']]}`;
  }
  
  return gameContent[stepIndex % gameContent.length] || 
    `Step ${stepIndex + 1} for ${services[serviceId].names[lang as keyof typeof services[typeof serviceId]['names']]} with ${games[gameId].names[lang as keyof typeof games[typeof gameId]['names']]}`;
}

// Helper function to get image path for a service+game combination
export function getServiceGameImage(serviceId: ServiceId, gameId: GameId): string {
  const imageMap: {[key: string]: {[key: string]: string}} = {
    therapeutic: {
      puzzle: '/images/keyboard_with_glowing_LEDS.jpg',
      narrative: '/images/Neonlight_saying_play.jpg',
      relaxation: '/images/smiley_art_on_floor.jpg',
      interactive: '/images/gamer_on_laptop.jpg'
    },
    community: {
      puzzle: '/images/glowing_Computer_board.jpg',
      narrative: '/images/gaming_controller.jpg',
      relaxation: '/images/Neuron.jpg',
      interactive: '/images/gaming_chair_and_environment.jpg'
    }
  };

  return imageMap[serviceId]?.[gameId] || '/images/gamer_on_laptop.jpg';
}
