// Internationalization system for The Stoic Seller
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'es' | 'fr' | 'de' | 'it' | 'pt' | 'nl' | 'ru' | 'zh' | 'ja' | 'ko' | 'ar';

export interface Translation {
  // Navigation
  nav: {
    modules: string;
    resources: string;
    salesCalls: string;
    breathwork: string;
    challenges: string;
    journal: string;
    progress: string;
  };
  
  // Dashboard
  dashboard: {
    welcome: string;
    dailyWisdom: string;
    continuelearning: string;
    viewAllModules: string;
    practiceSection: string;
    reflectSection: string;
    teamChallenge: string;
    daysRemaining: string;
    teamMembers: string;
    points: string;
  };
  
  // Ebook
  ebook: {
    title: string;
    subtitle: string;
    description: string;
    price: string;
    purchaseButton: string;
    features: {
      modules: string;
      scripts: string;
      exercises: string;
    };
    checkout: {
      title: string;
      processing: string;
      complete: string;
      success: string;
      download: string;
      backToResources: string;
    };
  };
  
  // Common
  common: {
    loading: string;
    error: string;
    backToDashboard: string;
    readMore: string;
    getStarted: string;
    completed: string;
    inProgress: string;
    notStarted: string;
    close: string;
    search: string;
    filter: string;
    all: string;
  };
  
  // Modules
  modules: {
    introduction: string;
    lesson: string;
    assignment: string;
    reflection: string;
    complete: string;
    next: string;
    previous: string;
  };
  
  // Resources
  resources: {
    title: string;
    description: string;
    searchPlaceholder: string;
    suggestResource: string;
    types: {
      book: string;
      article: string;
      video: string;
      podcast: string;
    };
  };
}

export const translations: Record<Language, Translation> = {
  en: {
    nav: {
      modules: 'Modules',
      resources: 'Resources',
      salesCalls: 'Sales Calls',
      breathwork: 'Breathwork',
      challenges: 'Challenges',
      journal: 'Journal',
      progress: 'Progress',
    },
    dashboard: {
      welcome: 'Welcome back',
      dailyWisdom: 'Daily Wisdom',
      continuelearning: 'Continue Learning',
      viewAllModules: 'View all modules',
      practiceSection: 'Practice',
      reflectSection: 'Reflect',
      teamChallenge: 'Team Challenge',
      daysRemaining: 'days remaining',
      teamMembers: 'team members',
      points: 'points',
    },
    ebook: {
      title: 'The Stoic Seller',
      subtitle: 'A Philosophical Guide to Sales Mastery',
      description: 'Master the art of sales through ancient Stoic wisdom. This comprehensive ebook contains all 6 modules, practical techniques, reflection exercises, and real-world scripts.',
      price: '$14.00',
      purchaseButton: 'Get Your Ebook Now',
      features: {
        modules: 'Complete 6-module curriculum',
        scripts: 'Practical sales scripts & techniques',
        exercises: 'Reflection exercises & assignments',
      },
      checkout: {
        title: 'Purchase The Stoic Seller Ebook',
        processing: 'Processing...',
        complete: 'Complete Purchase',
        success: 'Payment Successful!',
        download: 'Download Your Ebook',
        backToResources: 'Back to Resources',
      },
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      backToDashboard: 'Back to Dashboard',
      readMore: 'Read More',
      getStarted: 'Get Started',
      completed: 'Completed',
      inProgress: 'In Progress',
      notStarted: 'Not Started',
      close: 'Close',
      search: 'Search',
      filter: 'Filter',
      all: 'All',
    },
    modules: {
      introduction: 'Introduction',
      lesson: 'Lesson',
      assignment: 'Assignment',
      reflection: 'Reflection',
      complete: 'Complete',
      next: 'Next',
      previous: 'Previous',
    },
    resources: {
      title: 'Stoic Resources',
      description: 'Explore these resources to deepen your understanding of Stoic philosophy and its application to sales',
      searchPlaceholder: 'Search resources...',
      suggestResource: 'Suggest a Resource',
      types: {
        book: 'Book',
        article: 'Article',
        video: 'Video',
        podcast: 'Podcast',
      },
    },
  },
  es: {
    nav: {
      modules: 'Módulos',
      resources: 'Recursos',
      salesCalls: 'Llamadas de Ventas',
      breathwork: 'Respiración',
      challenges: 'Desafíos',
      journal: 'Diario',
      progress: 'Progreso',
    },
    dashboard: {
      welcome: 'Bienvenido de vuelta',
      dailyWisdom: 'Sabiduría Diaria',
      continuelearning: 'Continuar Aprendiendo',
      viewAllModules: 'Ver todos los módulos',
      practiceSection: 'Práctica',
      reflectSection: 'Reflexionar',
      teamChallenge: 'Desafío del Equipo',
      daysRemaining: 'días restantes',
      teamMembers: 'miembros del equipo',
      points: 'puntos',
    },
    ebook: {
      title: 'El Vendedor Estoico',
      subtitle: 'Una Guía Filosófica para el Dominio de las Ventas',
      description: 'Domina el arte de las ventas a través de la sabiduría estoica antigua. Este ebook integral contiene los 6 módulos, técnicas prácticas, ejercicios de reflexión y guiones del mundo real.',
      price: '$14.00',
      purchaseButton: 'Obtén tu Ebook Ahora',
      features: {
        modules: 'Currículo completo de 6 módulos',
        scripts: 'Guiones prácticos de ventas y técnicas',
        exercises: 'Ejercicios de reflexión y tareas',
      },
      checkout: {
        title: 'Comprar El Ebook del Vendedor Estoico',
        processing: 'Procesando...',
        complete: 'Completar Compra',
        success: '¡Pago Exitoso!',
        download: 'Descargar tu Ebook',
        backToResources: 'Volver a Recursos',
      },
    },
    common: {
      loading: 'Cargando...',
      error: 'Error',
      backToDashboard: 'Volver al Panel',
      readMore: 'Leer Más',
      getStarted: 'Comenzar',
      completed: 'Completado',
      inProgress: 'En Progreso',
      notStarted: 'No Iniciado',
      close: 'Cerrar',
      search: 'Buscar',
      filter: 'Filtrar',
      all: 'Todo',
    },
    modules: {
      introduction: 'Introducción',
      lesson: 'Lección',
      assignment: 'Tarea',
      reflection: 'Reflexión',
      complete: 'Completar',
      next: 'Siguiente',
      previous: 'Anterior',
    },
    resources: {
      title: 'Recursos Estoicos',
      description: 'Explora estos recursos para profundizar tu comprensión de la filosofía estoica y su aplicación a las ventas',
      searchPlaceholder: 'Buscar recursos...',
      suggestResource: 'Sugerir un Recurso',
      types: {
        book: 'Libro',
        article: 'Artículo',
        video: 'Video',
        podcast: 'Podcast',
      },
    },
  },
  fr: {
    nav: {
      modules: 'Modules',
      resources: 'Ressources',
      salesCalls: 'Appels de Vente',
      breathwork: 'Respiration',
      challenges: 'Défis',
      journal: 'Journal',
      progress: 'Progrès',
    },
    dashboard: {
      welcome: 'Bon retour',
      dailyWisdom: 'Sagesse Quotidienne',
      continuelearning: 'Continuer l\'Apprentissage',
      viewAllModules: 'Voir tous les modules',
      practiceSection: 'Pratique',
      reflectSection: 'Réfléchir',
      teamChallenge: 'Défi d\'Équipe',
      daysRemaining: 'jours restants',
      teamMembers: 'membres de l\'équipe',
      points: 'points',
    },
    ebook: {
      title: 'Le Vendeur Stoïque',
      subtitle: 'Un Guide Philosophique pour la Maîtrise des Ventes',
      description: 'Maîtrisez l\'art de la vente grâce à la sagesse stoïque ancienne. Cet ebook complet contient les 6 modules, techniques pratiques, exercices de réflexion et scripts du monde réel.',
      price: '14,00 $',
      purchaseButton: 'Obtenez votre Ebook Maintenant',
      features: {
        modules: 'Curriculum complet de 6 modules',
        scripts: 'Scripts de vente pratiques et techniques',
        exercises: 'Exercices de réflexion et devoirs',
      },
      checkout: {
        title: 'Acheter L\'Ebook du Vendeur Stoïque',
        processing: 'Traitement...',
        complete: 'Finaliser l\'Achat',
        success: 'Paiement Réussi!',
        download: 'Télécharger votre Ebook',
        backToResources: 'Retour aux Ressources',
      },
    },
    common: {
      loading: 'Chargement...',
      error: 'Erreur',
      backToDashboard: 'Retour au Tableau de Bord',
      readMore: 'Lire Plus',
      getStarted: 'Commencer',
      completed: 'Terminé',
      inProgress: 'En Cours',
      notStarted: 'Non Commencé',
      close: 'Fermer',
      search: 'Rechercher',
      filter: 'Filtrer',
      all: 'Tout',
    },
    modules: {
      introduction: 'Introduction',
      lesson: 'Leçon',
      assignment: 'Devoir',
      reflection: 'Réflexion',
      complete: 'Terminer',
      next: 'Suivant',
      previous: 'Précédent',
    },
    resources: {
      title: 'Ressources Stoïques',
      description: 'Explorez ces ressources pour approfondir votre compréhension de la philosophie stoïque et son application aux ventes',
      searchPlaceholder: 'Rechercher des ressources...',
      suggestResource: 'Suggérer une Ressource',
      types: {
        book: 'Livre',
        article: 'Article',
        video: 'Vidéo',
        podcast: 'Podcast',
      },
    },
  },
  de: {
    nav: {
      modules: 'Module',
      resources: 'Ressourcen',
      salesCalls: 'Verkaufsgespräche',
      breathwork: 'Atemarbeit',
      challenges: 'Herausforderungen',
      journal: 'Tagebuch',
      progress: 'Fortschritt',
    },
    dashboard: {
      welcome: 'Willkommen zurück',
      dailyWisdom: 'Tägliche Weisheit',
      continuelearning: 'Weiterlernen',
      viewAllModules: 'Alle Module anzeigen',
      practiceSection: 'Üben',
      reflectSection: 'Reflektieren',
      teamChallenge: 'Team-Herausforderung',
      daysRemaining: 'Tage verbleibend',
      teamMembers: 'Teammitglieder',
      points: 'Punkte',
    },
    ebook: {
      title: 'Der Stoische Verkäufer',
      subtitle: 'Ein Philosophischer Leitfaden zur Verkaufsmeisterschaft',
      description: 'Beherrschen Sie die Kunst des Verkaufs durch alte stoische Weisheit. Dieses umfassende Ebook enthält alle 6 Module, praktische Techniken, Reflexionsübungen und reale Skripte.',
      price: '14,00 $',
      purchaseButton: 'Holen Sie sich Ihr Ebook Jetzt',
      features: {
        modules: 'Vollständiger 6-Modul-Lehrplan',
        scripts: 'Praktische Verkaufsskripte und Techniken',
        exercises: 'Reflexionsübungen und Aufgaben',
      },
      checkout: {
        title: 'Das Stoische Verkäufer Ebook Kaufen',
        processing: 'Verarbeitung...',
        complete: 'Kauf Abschließen',
        success: 'Zahlung Erfolgreich!',
        download: 'Ihr Ebook Herunterladen',
        backToResources: 'Zurück zu Ressourcen',
      },
    },
    common: {
      loading: 'Laden...',
      error: 'Fehler',
      backToDashboard: 'Zurück zum Dashboard',
      readMore: 'Mehr Lesen',
      getStarted: 'Loslegen',
      completed: 'Abgeschlossen',
      inProgress: 'In Bearbeitung',
      notStarted: 'Nicht Begonnen',
      close: 'Schließen',
      search: 'Suchen',
      filter: 'Filter',
      all: 'Alle',
    },
    modules: {
      introduction: 'Einführung',
      lesson: 'Lektion',
      assignment: 'Aufgabe',
      reflection: 'Reflexion',
      complete: 'Abschließen',
      next: 'Weiter',
      previous: 'Zurück',
    },
    resources: {
      title: 'Stoische Ressourcen',
      description: 'Erkunden Sie diese Ressourcen, um Ihr Verständnis der stoischen Philosophie und ihrer Anwendung im Verkauf zu vertiefen',
      searchPlaceholder: 'Ressourcen suchen...',
      suggestResource: 'Eine Ressource Vorschlagen',
      types: {
        book: 'Buch',
        article: 'Artikel',
        video: 'Video',
        podcast: 'Podcast',
      },
    },
  },
  // Adding more languages with shorter implementations for space
  it: {
    nav: { modules: 'Moduli', resources: 'Risorse', salesCalls: 'Chiamate di Vendita', breathwork: 'Respirazione', challenges: 'Sfide', journal: 'Diario', progress: 'Progresso' },
    dashboard: { welcome: 'Bentornato', dailyWisdom: 'Saggezza Quotidiana', continuelearning: 'Continua Apprendimento', viewAllModules: 'Vedi tutti i moduli', practiceSection: 'Pratica', reflectSection: 'Rifletti', teamChallenge: 'Sfida del Team', daysRemaining: 'giorni rimanenti', teamMembers: 'membri del team', points: 'punti' },
    ebook: { title: 'Il Venditore Stoico', subtitle: 'Una Guida Filosofica alla Maestria delle Vendite', description: 'Padroneggia l\'arte della vendita attraverso l\'antica saggezza stoica.', price: '$14.00', purchaseButton: 'Ottieni il tuo Ebook Ora', features: { modules: 'Curriculum completo di 6 moduli', scripts: 'Script di vendita pratici e tecniche', exercises: 'Esercizi di riflessione e compiti' }, checkout: { title: 'Acquista L\'Ebook del Venditore Stoico', processing: 'Elaborazione...', complete: 'Completa Acquisto', success: 'Pagamento Riuscito!', download: 'Scarica il tuo Ebook', backToResources: 'Torna alle Risorse' } },
    common: { loading: 'Caricamento...', error: 'Errore', backToDashboard: 'Torna alla Dashboard', readMore: 'Leggi di Più', getStarted: 'Inizia', completed: 'Completato', inProgress: 'In Corso', notStarted: 'Non Iniziato', close: 'Chiudi', search: 'Cerca', filter: 'Filtra', all: 'Tutto' },
    modules: { introduction: 'Introduzione', lesson: 'Lezione', assignment: 'Compito', reflection: 'Riflessione', complete: 'Completa', next: 'Successivo', previous: 'Precedente' },
    resources: { title: 'Risorse Stoiche', description: 'Esplora queste risorse per approfondire la tua comprensione della filosofia stoica', searchPlaceholder: 'Cerca risorse...', suggestResource: 'Suggerisci una Risorsa', types: { book: 'Libro', article: 'Articolo', video: 'Video', podcast: 'Podcast' } }
  },
  pt: {
    nav: { modules: 'Módulos', resources: 'Recursos', salesCalls: 'Chamadas de Vendas', breathwork: 'Respiração', challenges: 'Desafios', journal: 'Diário', progress: 'Progresso' },
    dashboard: { welcome: 'Bem-vindo de volta', dailyWisdom: 'Sabedoria Diária', continuelearning: 'Continuar Aprendendo', viewAllModules: 'Ver todos os módulos', practiceSection: 'Prática', reflectSection: 'Refletir', teamChallenge: 'Desafio da Equipe', daysRemaining: 'dias restantes', teamMembers: 'membros da equipe', points: 'pontos' },
    ebook: { title: 'O Vendedor Estoico', subtitle: 'Um Guia Filosófico para o Domínio das Vendas', description: 'Domine a arte das vendas através da sabedoria estoica antiga.', price: '$14.00', purchaseButton: 'Obtenha seu Ebook Agora', features: { modules: 'Currículo completo de 6 módulos', scripts: 'Scripts de vendas práticos e técnicas', exercises: 'Exercícios de reflexão e tarefas' }, checkout: { title: 'Comprar O Ebook do Vendedor Estoico', processing: 'Processando...', complete: 'Completar Compra', success: 'Pagamento Bem-sucedido!', download: 'Baixar seu Ebook', backToResources: 'Voltar aos Recursos' } },
    common: { loading: 'Carregando...', error: 'Erro', backToDashboard: 'Voltar ao Painel', readMore: 'Ler Mais', getStarted: 'Começar', completed: 'Concluído', inProgress: 'Em Andamento', notStarted: 'Não Iniciado', close: 'Fechar', search: 'Pesquisar', filter: 'Filtrar', all: 'Todos' },
    modules: { introduction: 'Introdução', lesson: 'Lição', assignment: 'Tarefa', reflection: 'Reflexão', complete: 'Completar', next: 'Próximo', previous: 'Anterior' },
    resources: { title: 'Recursos Estoicos', description: 'Explore estes recursos para aprofundar sua compreensão da filosofia estoica', searchPlaceholder: 'Pesquisar recursos...', suggestResource: 'Sugerir um Recurso', types: { book: 'Livro', article: 'Artigo', video: 'Vídeo', podcast: 'Podcast' } }
  },
  nl: {
    nav: { modules: 'Modules', resources: 'Bronnen', salesCalls: 'Verkoop Gesprekken', breathwork: 'Ademwerk', challenges: 'Uitdagingen', journal: 'Dagboek', progress: 'Voortgang' },
    dashboard: { welcome: 'Welkom terug', dailyWisdom: 'Dagelijkse Wijsheid', continuelearning: 'Doorgaan met Leren', viewAllModules: 'Alle modules bekijken', practiceSection: 'Oefenen', reflectSection: 'Reflecteren', teamChallenge: 'Team Uitdaging', daysRemaining: 'dagen over', teamMembers: 'teamleden', points: 'punten' },
    ebook: { title: 'De Stoïsche Verkoper', subtitle: 'Een Filosofische Gids voor Verkoop Meesterschap', description: 'Beheers de kunst van verkopen door oude stoïsche wijsheid.', price: '$14.00', purchaseButton: 'Krijg je Ebook Nu', features: { modules: 'Volledig 6-module curriculum', scripts: 'Praktische verkoop scripts & technieken', exercises: 'Reflectie oefeningen & opdrachten' }, checkout: { title: 'Koop Het Stoïsche Verkoper Ebook', processing: 'Verwerken...', complete: 'Aankoop Voltooien', success: 'Betaling Succesvol!', download: 'Download je Ebook', backToResources: 'Terug naar Bronnen' } },
    common: { loading: 'Laden...', error: 'Fout', backToDashboard: 'Terug naar Dashboard', readMore: 'Lees Meer', getStarted: 'Beginnen', completed: 'Voltooid', inProgress: 'Bezig', notStarted: 'Niet Begonnen', close: 'Sluiten', search: 'Zoeken', filter: 'Filter', all: 'Alle' },
    modules: { introduction: 'Introductie', lesson: 'Les', assignment: 'Opdracht', reflection: 'Reflectie', complete: 'Voltooien', next: 'Volgende', previous: 'Vorige' },
    resources: { title: 'Stoïsche Bronnen', description: 'Verken deze bronnen om je begrip van stoïsche filosofie te verdiepen', searchPlaceholder: 'Zoek bronnen...', suggestResource: 'Suggereer een Bron', types: { book: 'Boek', article: 'Artikel', video: 'Video', podcast: 'Podcast' } }
  },
  ru: {
    nav: { modules: 'Модули', resources: 'Ресурсы', salesCalls: 'Звонки по продажам', breathwork: 'Дыхательные упражнения', challenges: 'Вызовы', journal: 'Журнал', progress: 'Прогресс' },
    dashboard: { welcome: 'Добро пожаловать', dailyWisdom: 'Ежедневная мудрость', continuelearning: 'Продолжить обучение', viewAllModules: 'Посмотреть все модули', practiceSection: 'Практика', reflectSection: 'Размышления', teamChallenge: 'Командный вызов', daysRemaining: 'дней осталось', teamMembers: 'участников команды', points: 'очков' },
    ebook: { title: 'Стоический продавец', subtitle: 'Философский гид к мастерству продаж', description: 'Овладейте искусством продаж через древнюю стоическую мудрость.', price: '$14.00', purchaseButton: 'Получить электронную книгу', features: { modules: 'Полный курс из 6 модулей', scripts: 'Практические скрипты продаж и техники', exercises: 'Упражнения для размышлений и задания' }, checkout: { title: 'Купить электронную книгу "Стоический продавец"', processing: 'Обработка...', complete: 'Завершить покупку', success: 'Платеж успешен!', download: 'Скачать книгу', backToResources: 'Назад к ресурсам' } },
    common: { loading: 'Загрузка...', error: 'Ошибка', backToDashboard: 'Назад к панели', readMore: 'Читать далее', getStarted: 'Начать', completed: 'Завершено', inProgress: 'В процессе', notStarted: 'Не начато', close: 'Закрыть', search: 'Поиск', filter: 'Фильтр', all: 'Все' },
    modules: { introduction: 'Введение', lesson: 'Урок', assignment: 'Задание', reflection: 'Размышление', complete: 'Завершить', next: 'Далее', previous: 'Назад' },
    resources: { title: 'Стоические ресурсы', description: 'Изучите эти ресурсы для углубления понимания стоической философии', searchPlaceholder: 'Поиск ресурсов...', suggestResource: 'Предложить ресурс', types: { book: 'Книга', article: 'Статья', video: 'Видео', podcast: 'Подкаст' } }
  },
  zh: {
    nav: { modules: '模块', resources: '资源', salesCalls: '销售电话', breathwork: '呼吸练习', challenges: '挑战', journal: '日志', progress: '进度' },
    dashboard: { welcome: '欢迎回来', dailyWisdom: '每日智慧', continuelearning: '继续学习', viewAllModules: '查看所有模块', practiceSection: '练习', reflectSection: '反思', teamChallenge: '团队挑战', daysRemaining: '天剩余', teamMembers: '团队成员', points: '积分' },
    ebook: { title: '斯多葛销售员', subtitle: '销售掌握的哲学指南', description: '通过古老的斯多葛智慧掌握销售艺术。', price: '$14.00', purchaseButton: '立即获取电子书', features: { modules: '完整的6模块课程', scripts: '实用销售脚本和技巧', exercises: '反思练习和作业' }, checkout: { title: '购买斯多葛销售员电子书', processing: '处理中...', complete: '完成购买', success: '支付成功！', download: '下载电子书', backToResources: '返回资源' } },
    common: { loading: '加载中...', error: '错误', backToDashboard: '返回仪表板', readMore: '阅读更多', getStarted: '开始', completed: '已完成', inProgress: '进行中', notStarted: '未开始', close: '关闭', search: '搜索', filter: '过滤', all: '全部' },
    modules: { introduction: '介绍', lesson: '课程', assignment: '作业', reflection: '反思', complete: '完成', next: '下一个', previous: '上一个' },
    resources: { title: '斯多葛资源', description: '探索这些资源以加深对斯多葛哲学的理解', searchPlaceholder: '搜索资源...', suggestResource: '建议资源', types: { book: '书籍', article: '文章', video: '视频', podcast: '播客' } }
  },
  ja: {
    nav: { modules: 'モジュール', resources: 'リソース', salesCalls: 'セールスコール', breathwork: '呼吸法', challenges: 'チャレンジ', journal: 'ジャーナル', progress: '進捗' },
    dashboard: { welcome: 'おかえりなさい', dailyWisdom: '日々の知恵', continuelearning: '学習を続ける', viewAllModules: '全てのモジュールを見る', practiceSection: '練習', reflectSection: '振り返り', teamChallenge: 'チームチャレンジ', daysRemaining: '日残り', teamMembers: 'チームメンバー', points: 'ポイント' },
    ebook: { title: 'ストイック・セラー', subtitle: 'セールス習得の哲学的ガイド', description: '古代ストイック哲学の知恵を通じてセールスの技術を習得しましょう。', price: '$14.00', purchaseButton: '電子書籍を今すぐ入手', features: { modules: '完全な6モジュールカリキュラム', scripts: '実用的なセールススクリプトとテクニック', exercises: '振り返り練習と課題' }, checkout: { title: 'ストイック・セラー電子書籍を購入', processing: '処理中...', complete: '購入を完了', success: '支払い成功！', download: '電子書籍をダウンロード', backToResources: 'リソースに戻る' } },
    common: { loading: '読み込み中...', error: 'エラー', backToDashboard: 'ダッシュボードに戻る', readMore: '続きを読む', getStarted: '開始する', completed: '完了', inProgress: '進行中', notStarted: '未開始', close: '閉じる', search: '検索', filter: 'フィルター', all: '全て' },
    modules: { introduction: '紹介', lesson: 'レッスン', assignment: '課題', reflection: '振り返り', complete: '完了', next: '次へ', previous: '前へ' },
    resources: { title: 'ストイックリソース', description: 'これらのリソースを探索してストイック哲学の理解を深めましょう', searchPlaceholder: 'リソースを検索...', suggestResource: 'リソースを提案', types: { book: '本', article: '記事', video: '動画', podcast: 'ポッドキャスト' } }
  },
  ko: {
    nav: { modules: '모듈', resources: '자료', salesCalls: '영업 통화', breathwork: '호흡법', challenges: '도전', journal: '일지', progress: '진행률' },
    dashboard: { welcome: '다시 오신 것을 환영합니다', dailyWisdom: '일일 지혜', continuelearning: '학습 계속하기', viewAllModules: '모든 모듈 보기', practiceSection: '연습', reflectSection: '성찰', teamChallenge: '팀 도전', daysRemaining: '일 남음', teamMembers: '팀 멤버', points: '포인트' },
    ebook: { title: '스토익 셀러', subtitle: '영업 숙련을 위한 철학적 가이드', description: '고대 스토익 철학의 지혜를 통해 영업의 기술을 습득하세요.', price: '$14.00', purchaseButton: '지금 전자책 받기', features: { modules: '완전한 6개 모듈 커리큘럼', scripts: '실용적인 영업 스크립트와 기법', exercises: '성찰 연습과 과제' }, checkout: { title: '스토익 셀러 전자책 구매', processing: '처리 중...', complete: '구매 완료', success: '결제 성공!', download: '전자책 다운로드', backToResources: '자료로 돌아가기' } },
    common: { loading: '로딩 중...', error: '오류', backToDashboard: '대시보드로 돌아가기', readMore: '더 읽기', getStarted: '시작하기', completed: '완료됨', inProgress: '진행 중', notStarted: '시작되지 않음', close: '닫기', search: '검색', filter: '필터', all: '전체' },
    modules: { introduction: '소개', lesson: '레슨', assignment: '과제', reflection: '성찰', complete: '완료', next: '다음', previous: '이전' },
    resources: { title: '스토익 자료', description: '이러한 자료를 탐색하여 스토익 철학에 대한 이해를 깊게 하세요', searchPlaceholder: '자료 검색...', suggestResource: '자료 제안', types: { book: '책', article: '기사', video: '비디오', podcast: '팟캐스트' } }
  },
  ar: {
    nav: { modules: 'الوحدات', resources: 'الموارد', salesCalls: 'مكالمات المبيعات', breathwork: 'تمارين التنفس', challenges: 'التحديات', journal: 'اليومية', progress: 'التقدم' },
    dashboard: { welcome: 'مرحباً بعودتك', dailyWisdom: 'الحكمة اليومية', continuelearning: 'متابعة التعلم', viewAllModules: 'عرض جميع الوحدات', practiceSection: 'الممارسة', reflectSection: 'التأمل', teamChallenge: 'تحدي الفريق', daysRemaining: 'أيام متبقية', teamMembers: 'أعضاء الفريق', points: 'نقاط' },
    ebook: { title: 'البائع الرواقي', subtitle: 'دليل فلسفي لإتقان المبيعات', description: 'اتقن فن البيع من خلال الحكمة الرواقية القديمة.', price: '$14.00', purchaseButton: 'احصل على الكتاب الإلكتروني الآن', features: { modules: 'منهج كامل من 6 وحدات', scripts: 'نصوص مبيعات عملية وتقنيات', exercises: 'تمارين تأمل ومهام' }, checkout: { title: 'شراء كتاب البائع الرواقي الإلكتروني', processing: 'جاري المعالجة...', complete: 'إتمام الشراء', success: 'تم الدفع بنجاح!', download: 'تحميل الكتاب الإلكتروني', backToResources: 'العودة إلى الموارد' } },
    common: { loading: 'جاري التحميل...', error: 'خطأ', backToDashboard: 'العودة إلى لوحة القيادة', readMore: 'قراءة المزيد', getStarted: 'البدء', completed: 'مكتمل', inProgress: 'قيد التقدم', notStarted: 'لم يبدأ', close: 'إغلاق', search: 'بحث', filter: 'مرشح', all: 'الكل' },
    modules: { introduction: 'مقدمة', lesson: 'درس', assignment: 'مهمة', reflection: 'تأمل', complete: 'إكمال', next: 'التالي', previous: 'السابق' },
    resources: { title: 'الموارد الرواقية', description: 'استكشف هذه الموارد لتعميق فهمك للفلسفة الرواقية', searchPlaceholder: 'البحث في الموارد...', suggestResource: 'اقتراح مورد', types: { book: 'كتاب', article: 'مقال', video: 'فيديو', podcast: 'بودكاست' } }
  },
};

// Language context and hook
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('stoic-seller-language');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('stoic-seller-language', lang);
  };

  const t = translations[language];

  useEffect(() => {
    // Set document direction for RTL languages
    document.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  return React.createElement(
    LanguageContext.Provider,
    { value: { language, setLanguage, t } },
    children
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const languageNames: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  pt: 'Português',
  nl: 'Nederlands',
  ru: 'Русский',
  zh: '中文',
  ja: '日本語',
  ko: '한국어',
  ar: 'العربية',
};