import React, { useEffect, useState } from "react";
import { useRoute } from "wouter";
import ModuleContent from "@/components/modules/ModuleContent";
import { Skeleton } from "@/components/ui/skeleton";

interface Module {
  id: number;
  title: string;
  lessons: {
    id: string;
    title: string;
    content: string;
    assignment?: string;
    reflection?: string;
  }[];
}

const modules: Record<string, Module> = {
  "1": {
    id: 1,
    title: "Module 1: Introduction to Stoic Selling",
    lessons: [
      {
        id: "1-1",
        title: "What is The Stoic Seller?",
        content: "The Stoic Seller is a new way of approaching sales, not as manipulation, pressure, or process, but as presence, practice, and philosophy. It's about replacing anxiety with clarity, desperation with discipline, and ego with empathy. Rooted in ancient Stoic principles and refined by over a decade of real-world sales experience, this guide is for anyone who wants to sell with intention, not just ambition.\n\nThis isn't a method. It's a mindset.\n\nAfter 10+ years in sales, I've seen what happens when the system prioritizes speed over substance. Salespeople are overwhelmed, prospects feel unheard, and conversations become mechanical. It's all pressure, numbers, and playbooks, with no room for human nuance.\n\nToo often, sales feels like a performance where we're pretending to care, asking scripted questions, and pushing toward our own goals without truly understanding the other person. Even as a buyer, I often feel like I'm talking to a chatbot, not a human being.\n\nWe've drifted too far from what sales was meant to be: a human exchange based on curiosity, service, and alignment.",
        reflection: "When was the last time you had a sales conversation that felt real, not rehearsed, rushed, or rigid?\n\nWhat if that became your standard, not the exception?"
      },
      {
        id: "1-2",
        title: "Reframing Sales: From Persuasion to Service",
        content: "This guide isn't about tricks or hacks. It's about seeing sales as an opportunity to serve, to help others make decisions that benefit them, even if the decision is \"no.\"\n\nThe Stoic Seller is:\n\n- Calm, not reactive\n- Curious, not assumptive\n- Present, not performative\n- Clear, not clever\n\nIf we can embody these principles, in our mindset, language, and presence, we can start building something that's both effective and ethical. This is sales with soul.",
        assignment: "Draw a line down the center of a page or digital document. On the left side, list 5 traditional sales behaviors or attitudes you've observed or been taught. On the right side, reframe each one through the lens of service rather than persuasion.\n\nFor example:\nTraditional: Overcome objections → Service-oriented: Explore concerns to understand if there's a genuine fit"
      },
      {
        id: "1-3",
        title: "What to Expect",
        content: "In the following modules, we'll explore key Stoic principles that can ground your sales approach, practical techniques rooted in empathy and clarity, mindful practices to regulate your state before calls or meetings, and real-world language to use in your outreach. It's a journey of unlearning, relearning, and reconnecting to the human side of selling.\n\nOr as Epictetus wrote, \"We have two ears and one mouth so that we can listen twice as much as we speak.\"\n\nLet this be a quiet revolution, in how you sell, and how you show up.",
        reflection: "What aspects of your current sales approach feel most misaligned with how you'd like to show up as a person? What would a more authentic approach look like for you?"
      }
    ]
  },
  "2": {
    id: 2,
    title: "Module 2: Core Stoic Principles for Sales",
    lessons: [
      {
        id: "2-1",
        title: "The Dichotomy of Control",
        content: "\"Some things are up to us and some things are not.\" – Epictetus\n\nIn sales, we often obsess over what we cannot control: a prospect's budget, their decision timeline, the market, our quota. The Stoic Seller learns to let go of what is not theirs to carry, and to double down on what is: effort, attitude, preparation, clarity, and presence.",
        assignment: "Draw a line down the center of a page. On the left, list everything about your current pipeline or process that feels stressful or uncertain. On the right, next to each item, write either \"within my control\" or \"not within my control.\" Then highlight the ones you can influence, and commit to a small action on each this week.\n\nShift your energy to where it matters most. That's the Stoic way.",
        reflection: "What parts of your sales process create stress because you're trying to control what you cannot?"
      },
      {
        id: "2-2",
        title: "Premeditatio Malorum (Pre-meditation of Evils)",
        content: "\"The wise man looks ahead and prepares.\" – Seneca\n\nSales rarely goes exactly as planned. No-shows, objections, pricing pushback, tech failures, they're all part of the game. Instead of fearing these outcomes, the Stoic Seller mentally rehearses them. Not to dwell on failure, but to build resilience.\n\nPremeditatio Malorum means picturing what could go wrong, so you're less surprised, more composed, and better prepared when it happens. This isn't negative thinking. It's strategic preparation.\n\nThe Stoics saw this as a strength, not weakness. Seneca himself would regularly reflect on potential setbacks not to become paranoid, but to maintain emotional composure and reduce the element of surprise. By rehearsing adversity in advance, he created a kind of psychological shock-absorber.\n\nIn today's terms, think of it like pre-installing an emotional buffer. You're not hoping for failure, you're preparing for how to meet it if it shows up.",
        assignment: "Before your next sales call, take two minutes to visualize three things that could go wrong, and how you'll respond with calm, clarity, and control. Write them down. For example:\n\nIf they challenge my price, I will respond: \"Totally fair question. Can I ask what you're comparing it to so I can better understand where you're coming from?\"\n\nIf they show up distracted or impatient, I will say: \"You've probably had a full day. Want to pause for a breath before we dive in?\"\n\nIf I feel nervous or thrown off, I will ground myself with a breath and silently repeat: \"Be present, not perfect.\"\n\nRepeat this practice before each call for one week. Track how you feel after each one. Notice where you stayed composed, and where there's room to adapt further.",
        reflection: "What's one recurring obstacle in your sales calls that always catches you off guard? How do you usually respond, and how would you like to respond?"
      },
      {
        id: "2-3",
        title: "Amor Fati (Love of Fate)",
        content: "\"A blazing fire makes flame and brightness out of everything that is thrown into it.\" – Marcus Aurelius\n\nIn sales, we are constantly being tested by rejection, no-shows, ghosting, or silence. It's easy to get discouraged or take it personally. But the Stoic Seller chooses a different lens — Amor Fati, the love of fate. Not just accepting what happens, but embracing it as fuel for growth.\n\nAmor Fati means seeing each \"no,\" each disappointment, as part of a necessary process. Instead of resisting outcomes, we integrate them into our practice, trusting that every interaction, good or bad, is shaping us into better professionals and more resilient humans.\n\nWhen a call doesn't go well, when a deal falls through, ask: What is this teaching me? What strength is being forged right now?",
        assignment: "The next time something doesn't go your way — a deal lost, a prospect goes cold, a miscommunication occurs — write down what happened. Then ask yourself:\n\nWhat part of this is asking me to grow?\n\nWhat would a Stoic learn from this?\n\nWhat can I practice next time?\n\nBonus: If you're up for it, end your entry with the phrase, \"Amor Fati,\" as a quiet act of acceptance. Let it become your emotional signature in the face of adversity.",
        reflection: "Can you recall a rejection that, in hindsight, taught you something essential or led to an unexpected opportunity?"
      },
      {
        id: "2-4",
        title: "Memento Mori (Remember You Will Die)",
        content: "\"You could leave life right now. Let that determine what you do and say and think.\" – Marcus Aurelius\n\nMemento Mori is not morbid, it is liberating. It reminds us that time is finite, and that awareness can fuel urgency, clarity, and presence in everything we do — including how we sell.\n\nSales is often filled with waiting. Waiting for replies, for budgets, for decisions. We stretch timelines, we delay truth, we stall on uncomfortable conversations. Memento Mori cuts through the delay. If today were your last opportunity to serve this client, what kind of presence would you bring?\n\nAs a Stoic Seller, this principle reminds you that the value of your time — and theirs — is sacred. You are not here to perform, chase, or people-please. You are here to connect honestly, to guide thoughtfully, and to leave a meaningful impression, regardless of the outcome.",
        assignment: "Before your next meeting or call, take 30 seconds to pause and breathe. Then ask yourself:\n\nIf I had only this one shot to connect with this person, how can I make it count?\n\nWhat would I say if I had nothing to prove, only something to offer?\n\nAfter the call, journal one insight or moment where you were truly present. Let it be a reminder: you're not just selling, you're showing up fully — and that matters.",
        reflection: "If this were the last sales conversation you ever had, how would you want it to feel? What would you say differently?"
      }
    ]
  }
};

const ModulePage: React.FC = () => {
  const [match, params] = useRoute("/modules/:id");
  const [loading, setLoading] = useState(true);
  const [module, setModule] = useState<Module | null>(null);
  
  useEffect(() => {
    if (match && params?.id) {
      // Simulate API call
      setTimeout(() => {
        setModule(modules[params.id] || null);
        setLoading(false);
      }, 500);
    }
  }, [match, params?.id]);
  
  if (loading) {
    return (
      <div className="p-6 md:p-10 max-w-4xl mx-auto">
        <Skeleton className="h-8 w-64 mb-6" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-10" />
        
        <div className="flex mb-8">
          <div className="w-64 hidden md:block pr-6 border-r border-neutral-light">
            <Skeleton className="h-6 w-32 mb-6" />
            <div className="space-y-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
          
          <div className="flex-1 md:pl-8">
            <Skeleton className="h-8 w-3/4 mb-6" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (!module) {
    return (
      <div className="p-6 md:p-10 text-center">
        <h1 className="font-heading text-2xl font-bold text-primary mb-4">Module Not Found</h1>
        <p className="text-neutral-medium mb-6">The module you're looking for doesn't exist.</p>
        <Link href="/">
          <a className="bg-primary hover:bg-primary-dark text-white rounded-lg px-6 py-3 text-sm font-medium transition duration-200">
            Return to Dashboard
          </a>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="p-6 md:p-10">
      <ModuleContent 
        moduleId={module.id}
        moduleTitle={module.title}
        lessons={module.lessons}
      />
    </div>
  );
};

export default ModulePage;
