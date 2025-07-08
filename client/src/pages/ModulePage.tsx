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
  },
  "3": {
    id: 3,
    title: "Module 3: Mindful Communication",
    lessons: [
      {
        id: "3-1",
        title: "The Art of Listening",
        content: "\"We have two ears and one mouth so that we can listen twice as much as we speak.\" – Epictetus\n\nTrue listening is rare in sales. Most of us are planning our next question, waiting for our turn to speak, or mentally rehearsing our pitch. But the Stoic Seller knows that listening is not just a technique — it's a form of service.\n\nWhen you truly listen, you're giving someone the gift of being heard. You're creating space for them to think out loud, to discover their own needs, and to feel understood. This isn't about gathering information to use against them later. It's about honoring their experience and perspective.\n\nListening requires presence, patience, and genuine curiosity. It means setting aside your agenda long enough to understand theirs.",
        assignment: "For the next three sales conversations, commit to asking one follow-up question for every statement the prospect makes. Instead of moving to your next planned question, dig deeper into what they just shared.\n\nFor example:\nThem: 'We're struggling with efficiency.'\nYou: 'What does that struggle look like day-to-day?'\n\nThem: 'The team is frustrated.'\nYou: 'Help me understand what's driving that frustration.'\n\nNotice how this changes the dynamic of the conversation.",
        reflection: "When was the last time you felt truly heard by a salesperson? What did they do differently?"
      },
      {
        id: "3-2",
        title: "Speaking with Intention",
        content: "\"Think before you speak. Read before you think.\" – Fran Lebowitz (adapted)\n\nEvery word you speak in a sales conversation either adds value or takes it away. There is no neutral. The Stoic Seller chooses their words carefully, speaking only when they have something meaningful to contribute.\n\nThis doesn't mean being silent or passive. It means being intentional. Before you speak, ask yourself: Will this help them think more clearly about their situation? Will this move us toward mutual understanding? Or am I speaking to fill silence, to sound smart, or to push my agenda?\n\nIntentional speaking is about quality over quantity. It's about choosing words that serve the conversation, not your ego.",
        assignment: "Before your next sales call, write down three questions you want to ask. But here's the challenge: you can only ask these three questions during the entire conversation. Everything else must be follow-up questions based on what they share.\n\nThis forces you to make every question count and to really listen to their answers.",
        reflection: "What would change about your sales conversations if you spoke 50% less but listened 100% more?"
      }
    ]
  },
  "4": {
    id: 4,
    title: "Module 4: Emotional Regulation",
    lessons: [
      {
        id: "4-1",
        title: "Managing Rejection",
        content: "\"It's not what happens to you, but how you react to it that matters.\" – Epictetus\n\nRejection is not personal, even when it feels personal. The prospect is not rejecting you as a human being — they're making a business decision based on their current priorities, constraints, and information.\n\nThe Stoic Seller develops a healthy relationship with rejection. They see it as data, not judgment. Each 'no' teaches them something about their approach, their targeting, or their timing. They use rejection as fuel for improvement, not fuel for discouragement.\n\nThis doesn't mean rejection doesn't sting. It means you don't let that sting define you or derail you.",
        assignment: "Keep a 'rejection journal' for one week. After each rejection, write down:\n\n1. What specifically was rejected (your timing, your solution, your approach?)\n2. What you learned from the interaction\n3. How you can use this information to improve\n4. One thing you did well, regardless of the outcome\n\nAt the end of the week, review your entries. Look for patterns and insights.",
        reflection: "How would your relationship with rejection change if you saw every 'no' as valuable market research?"
      },
      {
        id: "4-2",
        title: "Staying Present Under Pressure",
        content: "\"You have power over your mind — not outside events. Realize this, and you will find strength.\" – Marcus Aurelius\n\nSales can be high-pressure. Quotas, competition, difficult conversations, technical problems during demos — there are countless ways a sales situation can become stressful. The Stoic Seller learns to find calm in the storm.\n\nPresence under pressure comes from preparation and practice. It comes from knowing that you cannot control outcomes, only your effort and attitude. It comes from trusting in your ability to handle whatever comes up.\n\nWhen you're present under pressure, you make better decisions, ask better questions, and respond more thoughtfully. You become a calm, steady force that prospects can trust.",
        assignment: "Practice the '4-7-8 breathing technique' before your next high-stakes call:\n\n- Inhale for 4 counts\n- Hold for 7 counts  \n- Exhale for 8 counts\n- Repeat 3 times\n\nNotice how this affects your state of mind and your performance during the call.",
        reflection: "Describe a time when you stayed calm under pressure in sales. What was the result?"
      }
    ]
  },
  "5": {
    id: 5,
    title: "Module 5: Building Authentic Relationships",
    lessons: [
      {
        id: "5-1",
        title: "Trust Through Transparency",
        content: "\"Honesty is the first chapter in the book of wisdom.\" – Thomas Jefferson\n\nAuthentic relationships in sales are built on trust, and trust is built on transparency. This means being honest about your solution's limitations, clear about your pricing, and upfront about your process.\n\nTransparency doesn't mean oversharing or highlighting every flaw. It means being truthful when asked direct questions, setting clear expectations, and not making promises you can't keep.\n\nThe Stoic Seller knows that short-term gains from being less than transparent always lead to long-term losses in trust and reputation.",
        assignment: "In your next sales conversation, find one opportunity to be more transparent than you normally would be. This might mean:\n\n- Acknowledging a limitation of your solution\n- Being upfront about pricing before they ask\n- Sharing a relevant challenge another client faced\n- Admitting when you don't know something\n\nNotice how this transparency affects the dynamic of the conversation.",
        reflection: "Think of a salesperson you trust completely. What specific behaviors make them trustworthy?"
      },
      {
        id: "5-2",
        title: "Serving vs. Selling",
        content: "\"The best way to find yourself is to lose yourself in the service of others.\" – Mahatma Gandhi\n\nThe highest form of selling is when it doesn't feel like selling at all — when it feels like service. This happens when your primary focus shifts from getting something (a sale, a commission, a quota) to giving something (insight, clarity, value).\n\nService-oriented selling means sometimes recommending a competitor if they're a better fit. It means walking away from deals that aren't right for the prospect. It means prioritizing their success over your commission.\n\nThis approach may seem counterintuitive, but it builds the kind of trust and reputation that leads to more referrals, better relationships, and ultimately more success than any aggressive sales tactic ever could.",
        assignment: "In your next sales opportunity, ask yourself: 'How can I serve this person, regardless of whether they buy from me?' Then take one specific action based on that question.\n\nThis might be introducing them to a useful contact, sharing a relevant resource, or simply asking better questions to help them think through their challenge.",
        reflection: "Describe a time when someone 'sold' to you by truly serving your needs. How did that experience feel different?"
      }
    ]
  },
  "6": {
    id: 6,
    title: "Module 6: Long-term Success and Wisdom",
    lessons: [
      {
        id: "6-1",
        title: "Building a Sustainable Practice",
        content: "\"It is not the man who has too little, but the man who craves more, who is poor.\" – Seneca\n\nSustainable success in sales comes from building systems and habits that you can maintain over the long term. It's not about grinding harder or working longer hours — it's about working more thoughtfully and efficiently.\n\nThe Stoic Seller builds a practice around consistency rather than intensity. They develop daily habits that compound over time: regular prospecting, continuous learning, mindful preparation, and honest self-reflection.\n\nThey also know when to rest, when to say no, and how to maintain their energy and enthusiasm for the work.",
        assignment: "Design a daily practice that you can maintain for the next 30 days. Include:\n\n- One prospecting activity (15-30 minutes)\n- One learning activity (reading, podcast, course - 10-15 minutes)\n- One mindfulness practice (meditation, journaling, breathing - 5-10 minutes)\n\nCommit to this practice for 30 days and track your consistency.",
        reflection: "What does sustainable success look like for you? How would you know when you've achieved it?"
      },
      {
        id: "6-2",
        title: "Wisdom Through Experience",
        content: "\"Every new beginning comes from some other beginning's end.\" – Seneca\n\nTrue sales wisdom comes not from knowing all the answers, but from asking better questions. It comes from learning from every interaction, every mistake, every success, and every failure.\n\nThe Stoic Seller maintains a beginner's mind throughout their career. They stay curious, humble, and open to learning. They know that every prospect can teach them something, every lost deal contains a lesson, and every success reveals an opportunity to improve.\n\nWisdom is the ability to see patterns, to understand people, and to respond appropriately to each unique situation. It cannot be rushed or faked — it must be earned through experience and reflection.",
        assignment: "At the end of each week for the next month, spend 15 minutes reflecting on:\n\n1. What did I learn about myself this week?\n2. What did I learn about selling this week?\n3. What did I learn about people this week?\n4. How can I apply these lessons next week?\n\nWrite down your insights and review them regularly.",
        reflection: "What's the most important lesson you've learned in your sales career so far? How has it changed your approach?"
      },
      {
        id: "6-3",
        title: "Your Stoic Seller Journey",
        content: "\"You could leave life right now. Let that determine what you do and say and think.\" – Marcus Aurelius\n\nCongratulations. You've completed your introduction to the Stoic Seller approach. But this is not an ending — it's a beginning.\n\nThe principles you've learned here are not techniques to master once and move on. They are practices to return to daily, habits to refine continuously, and wisdom to deepen over time.\n\nThe path of the Stoic Seller is one of constant growth, service, and authentic connection. It's about showing up fully in every conversation, treating every interaction as an opportunity to serve, and maintaining your integrity regardless of the outcome.\n\nRemember: You are not just a salesperson. You are a guide, a consultant, a problem-solver, and a trusted advisor. Carry that responsibility with honor.",
        reflection: "How will you continue to develop as a Stoic Seller? What's your next step on this journey?"
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
      // Load module and lessons from API
      const loadModuleData = async () => {
        try {
          const moduleResponse = await fetch(`/api/modules/${params.id}`);
          const lessonsResponse = await fetch(`/api/modules/${params.id}/lessons`);
          
          if (moduleResponse.ok && lessonsResponse.ok) {
            const moduleData = await moduleResponse.json();
            const lessonsData = await lessonsResponse.json();
            
            setModule({
              id: moduleData.id,
              title: moduleData.title,
              lessons: lessonsData
            });
          } else {
            setModule(null);
          }
        } catch (error) {
          console.error('Failed to load module:', error);
          setModule(null);
        } finally {
          setLoading(false);
        }
      };
      
      loadModuleData();
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
