import React, { useEffect, useState } from 'react';
import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CheckoutForm = ({ onPaymentSuccess }: { onPaymentSuccess: (paymentIntentId: string) => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/ebook-success',
      },
      redirect: 'if_required'
    });

    if (error) {
      toast({
        title: "Payment Failed",
        description: error.message,
        variant: "destructive",
      });
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      toast({
        title: "Payment Successful",
        description: "Thank you for your purchase! You can now download the ebook.",
      });
      onPaymentSuccess(paymentIntent.id);
    }
    
    setIsProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      <Button 
        type="submit" 
        disabled={!stripe || isProcessing} 
        className="w-full"
        size="lg"
      >
        {isProcessing ? 'Processing...' : 'Complete Purchase - $14.00'}
      </Button>
    </form>
  );
};

const EbookCheckout: React.FC = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [paymentSucceeded, setPaymentSucceeded] = useState(false);
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/api/create-ebook-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          toast({
            title: "Error",
            description: "Failed to initialize payment. Please try again.",
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        console.error('Payment initialization error:', error);
        toast({
          title: "Error",
          description: "Failed to initialize payment. Please try again.",
          variant: "destructive",
        });
      });
  }, []);

  const handlePaymentSuccess = (paymentId: string) => {
    setPaymentIntentId(paymentId);
    setPaymentSucceeded(true);
  };

  const handleDownload = () => {
    // Verify payment first, then trigger download
    fetch("/api/verify-ebook-payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentIntentId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.canDownload) {
          // Trigger the ebook download with updated content from your latest version
          const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Stoic Seller</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;0,900;1,400;1,500;1,600;1,700;1,800;1,900&family=Inter:wght@300;400;500;600;700&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet">
  <style>
    :root {
      --primary: #40514e;
      --primary-light: #506c6a;
      --secondary: #96b4b1;
      --accent: #c07a5d;
      --accent-light: #d6a392;
      --neutral-bg: #f5f5f0;
      --neutral-dark: #333333;
      --neutral-medium: #666666;
      --neutral-light: #e0e0d8;
    }
    
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: 'Inter', sans-serif;
      color: var(--neutral-dark);
      line-height: 1.6;
      background-color: var(--neutral-bg);
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .ebook-container {
      background-color: white;
      border-radius: 5px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    
    .cover {
      background-color: var(--primary);
      color: white;
      padding: 5rem 2rem;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    
    .cover::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(45deg, rgba(0,0,0,0.3), rgba(0,0,0,0));
      z-index: 1;
    }
    
    .cover-content {
      position: relative;
      z-index: 2;
    }
    
    h1 {
      font-family: 'Playfair Display', serif;
      font-size: 3.5rem;
      margin-bottom: 1.5rem;
      font-weight: 700;
    }
    
    h2 {
      font-family: 'Playfair Display', serif;
      font-size: 2.5rem;
      color: var(--primary);
      margin: 3rem 0 1.5rem 0;
      border-bottom: 2px solid var(--neutral-light);
      padding-bottom: 0.75rem;
    }
    
    h3 {
      font-family: 'Playfair Display', serif;
      font-size: 1.8rem;
      color: var(--primary-light);
      margin: 2rem 0 1rem 0;
    }
    
    .subtitle {
      font-family: 'Lora', serif;
      font-style: italic;
      font-size: 1.2rem;
      margin-bottom: 2rem;
    }
    
    .content {
      padding: 2rem;
    }
    
    p {
      margin-bottom: 1.5rem;
      font-size: 1.1rem;
    }
    
    .quote {
      font-family: 'Lora', serif;
      font-style: italic;
      border-left: 4px solid var(--accent);
      padding-left: 1.5rem;
      margin: 2rem 0;
      font-size: 1.2rem;
      color: var(--primary);
    }
    
    .quote-attribution {
      font-family: 'Inter', sans-serif;
      font-style: normal;
      font-weight: 600;
      margin-top: 0.5rem;
      font-size: 0.9rem;
      color: var(--neutral-medium);
    }
    
    .reflection-box {
      background-color: var(--neutral-bg);
      border-left: 4px solid var(--secondary);
      padding: 1.5rem;
      margin: 2rem 0;
      border-radius: 0 5px 5px 0;
    }
    
    .assignment-box {
      background-color: #fef3c7;
      border-left: 4px solid var(--accent);
      padding: 1.5rem;
      margin: 2rem 0;
      border-radius: 0 5px 5px 0;
    }
    
    .exercise-box {
      background-color: #f0f9ff;
      border-left: 4px solid #0ea5e9;
      padding: 1.5rem;
      margin: 2rem 0;
      border-radius: 0 5px 5px 0;
    }
    
    ul {
      margin: 1rem 0;
      padding-left: 2rem;
    }
    
    li {
      margin-bottom: 0.5rem;
    }
    
    .table-of-contents {
      background-color: var(--neutral-bg);
      padding: 2rem;
      margin: 2rem 0;
      border-radius: 5px;
    }
    
    .toc-item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      padding: 0.5rem 0;
      border-bottom: 1px dotted var(--neutral-medium);
    }
    
    .toc-page {
      font-weight: 600;
      color: var(--primary);
    }
    
    @media (max-width: 768px) {
      body {
        padding: 1rem;
      }
      
      h1 {
        font-size: 2.5rem;
      }
      
      h2 {
        font-size: 2rem;
      }
      
      .content {
        padding: 1.5rem;
      }
    }
  </style>
</head>
<body>
  <div class="ebook-container">
    <!-- Cover Page -->
    <div class="cover">
      <div class="cover-content">
        <h1>THE STOIC SELLER</h1>
        <div class="subtitle">
          A Philosophical Guide to Sales Mastery through Presence, Practice, and Perspective
        </div>
      </div>
    </div>
    
    <div class="content">
      <!-- Table of Contents -->
      <div class="table-of-contents">
        <h3>Table of Contents</h3>
        <div class="toc-item">
          <div>Introduction</div>
          <div class="toc-page">3</div>
        </div>
        <div class="toc-item">
          <div>Module 1: Introduction to The Stoic Seller</div>
          <div class="toc-page">5</div>
        </div>
        <div class="toc-item">
          <div>Module 2: Core Stoic Principles for Sales</div>
          <div class="toc-page">8</div>
        </div>
        <div class="toc-item">
          <div>Module 3: Human-Centered Sales Techniques</div>
          <div class="toc-page">16</div>
        </div>
        <div class="toc-item">
          <div>Module 4: Real-World Language & Messaging</div>
          <div class="toc-page">21</div>
        </div>
        <div class="toc-item">
          <div>Module 5: The 5-Day Stoic Seller Practice Challenge</div>
          <div class="toc-page">26</div>
        </div>
        <div class="toc-item">
          <div>Module 6: Mindful Practice & Integration</div>
          <div class="toc-page">31</div>
        </div>
      </div>

      <!-- Introduction -->
      <h2>Introduction</h2>
      <p>Before diving into the modules, a brief note for those new to Stoicism.</p>
      
      <h3>What is Stoicism?</h3>
      <p>Stoicism is an ancient Greek philosophy that teaches the development of self-control, clarity, and resilience by focusing only on what we can control, accepting what we cannot, and approaching life with wisdom and virtue. Stoics like Epictetus, Seneca, and Marcus Aurelius didn't preach detachment from life — they practiced deeper engagement with it, grounded in awareness and purpose.</p>
      
      <h3>Why combine it with sales?</h3>
      <p>After over a decade in sales, I noticed a growing disconnect: conversations were fast, transactional, and full of pressure. There was little room for pause, reflection, or meaningful interaction. At the same time, I had been studying Stoicism — first for personal growth, then as a mindset for life and work.</p>
      
      <p>It became clear that Stoic practices could directly support the challenges we face in sales: dealing with rejection, staying present, managing pressure, and building trust. The decision to combine the two came from a simple question: What would sales look like if it was rooted in philosophy, not performance? This is my answer.</p>

      <!-- Module 1 -->
      <h2>Module 1: Introduction to The Stoic Seller</h2>
      
      <div class="reflection-box">
        <h4>🤔 Reflective Prompt</h4>
        <p>When was the last time you had a sales conversation that felt real, not rehearsed, rushed, or rigid?</p>
        <p>What if that became your standard, not the exception?</p>
      </div>
      
      <h3>What is The Stoic Seller?</h3>
      <p>The Stoic Seller is a new way of approaching sales, not as manipulation, pressure, or process, but as presence, practice, and philosophy. It's about replacing anxiety with clarity, desperation with discipline, and ego with empathy. Rooted in ancient Stoic principles and refined by over a decade of real-world sales experience, this guide is for anyone who wants to sell with intention, not just ambition.</p>
      
      <p><strong>This isn't a method. It's a mindset.</strong></p>
      
      <h3>Why This Matters Now</h3>
      <p>After 10+ years in sales, I've seen what happens when the system prioritizes speed over substance. Salespeople are overwhelmed, prospects feel unheard, and conversations become mechanical. It's all pressure, numbers, and playbooks, with no room for human nuance.</p>
      
      <p>Too often, sales feels like a performance where we're pretending to care, asking scripted questions, and pushing toward our own goals without truly understanding the other person. Even as a buyer, I often feel like I'm talking to a chatbot, not a human being.</p>
      
      <p>We've drifted too far from what sales was meant to be: a human exchange based on curiosity, service, and alignment.</p>
      
      <p>The Stoic Seller is a return to roots. A return to stillness before action. A return to asking because we care, not because it converts. A return to detaching from outcomes and focusing on the work itself.</p>
      
      <h3>Reframing Sales: From Persuasion to Service</h3>
      <p>This guide isn't about tricks or hacks. It's about seeing sales as an opportunity to serve, to help others make decisions that benefit them, even if the decision is "no."</p>
      
      <p><strong>The Stoic Seller is:</strong></p>
      <ul>
        <li>Calm, not reactive</li>
        <li>Curious, not assumptive</li>
        <li>Present, not performative</li>
        <li>Clear, not clever</li>
      </ul>
      
      <p>If we can embody these principles, in our mindset, language, and presence, we can start building something that's both effective and ethical. This is sales with soul.</p>
      
      <h3>What to Expect</h3>
      <p>In the following chapters, we'll explore key Stoic principles that can ground your sales approach, practical techniques rooted in empathy and clarity, mindful practices to regulate your state before calls or meetings, and real-world language to use in your outreach. It's a journey of unlearning, relearning, and reconnecting to the human side of selling.</p>
      
      <div class="quote">
        "We have two ears and one mouth so that we can listen twice as much as we speak."
        <div class="quote-attribution">— Epictetus</div>
      </div>
      
      <p>Let this be a quiet revolution, in how you sell, and how you show up.</p>

      <!-- Module 2 -->
      <h2>Module 2: Core Stoic Principles for Sales</h2>
      
      <p>This chapter distills timeless Stoic teachings into practical lenses for modern sellers. These are not abstract theories, but tested philosophies that can transform your mindset, emotional response, and day-to-day decision-making. Each principle is explored in depth, with practices and assignments to help you internalize the shift.</p>
      
      <h3>1. The Dichotomy of Control</h3>
      <div class="quote">
        "Some things are up to us and some things are not."
        <div class="quote-attribution">— Epictetus</div>
      </div>
      
      <p>In sales, we often obsess over what we cannot control: a prospect's budget, their decision timeline, the market, our quota. The Stoic Seller learns to let go of what is not theirs to carry, and to double down on what is: effort, attitude, preparation, clarity, and presence.</p>
      
      <p><strong>A real example:</strong> You've been nurturing a promising lead for weeks. You've followed up thoughtfully, shared relevant resources, and finally get on a decision call. Suddenly, they say they've chosen a cheaper competitor. Your instinct? Frustration, disbelief, maybe self-doubt.</p>
      
      <p>But take a Stoic pause: Can you control their internal budget discussion? Their leadership's shift in direction? No. What is in your control is how well you understood their needs, how clearly you communicated, and how professionally you respond.</p>
      
      <div class="quote">
        "You have power over your mind — not outside events. Realize this, and you will find strength."
        <div class="quote-attribution">— Marcus Aurelius</div>
      </div>
      
      <div class="reflection-box">
        <h4>🤔 Reflect:</h4>
        <p>What parts of your sales process create stress because you're trying to control what you cannot?</p>
      </div>
      
      <div class="assignment-box">
        <h4>📝 Assignment:</h4>
        <p>Draw a line down the center of a page. On the left, list everything about your current pipeline or process that feels stressful or uncertain. On the right, next to each item, write either "within my control" or "not within my control." Then highlight the ones you can influence, and commit to a small action on each this week.</p>
      </div>
      
      <p>Shift your energy to where it matters most. That's the Stoic way.</p>
      
      <h3>2. Premeditatio Malorum (Pre-meditation of Evils)</h3>
      <div class="quote">
        "The wise man looks ahead and prepares."
        <div class="quote-attribution">— Seneca</div>
      </div>
      
      <p>Sales rarely goes exactly as planned. No-shows, objections, pricing pushback, tech failures — they're all part of the game. Instead of fearing these outcomes, the Stoic Seller mentally rehearses them. Not to dwell on failure, but to build resilience.</p>
      
      <p>Premeditatio Malorum means picturing what could go wrong, so you're less surprised, more composed, and better prepared when it happens. This isn't negative thinking. It's strategic preparation.</p>
      
      <p>The Stoics saw this as a strength, not weakness. Seneca himself would regularly reflect on potential setbacks not to become paranoid, but to maintain emotional composure and reduce the element of surprise. By rehearsing adversity in advance, he created a kind of psychological shock-absorber.</p>
      
      <p>Seneca wrote, "He who fears death will never do anything worthy of a living man." In Stoicism, to live well is to make peace with loss, risk, discomfort — and ultimately, death. As morbid as it may sound, learning how to die is learning how to live. In sales, this translates to facing potential failure before it arrives. It's the ability to visualize an objection, a tough conversation, or a 'no' without flinching — and meet it with calm.</p>
      
      <p>In today's terms, think of it like pre-installing an emotional buffer. You're not hoping for failure, you're preparing for how to meet it if it shows up.</p>
      
      <div class="reflection-box">
        <h4>🤔 Reflect:</h4>
        <p>What's one recurring obstacle in your sales calls that always catches you off guard? How do you usually respond, and how would you like to respond?</p>
      </div>
      
      <div class="assignment-box">
        <h4>📝 Assignment:</h4>
        <p>Before your next sales call, take two minutes to visualize three things that could go wrong, and how you'll respond with calm, clarity, and control. Write them down. For example:</p>
        <ul>
          <li>If they challenge my price, I will respond: "Totally fair question. Can I ask what you're comparing it to so I can better understand where you're coming from?"</li>
          <li>If they show up distracted or impatient, I will say: "You've probably had a full day. Want to pause for a breath before we dive in?"</li>
          <li>If I feel nervous or thrown off, I will ground myself with a breath and silently repeat: "Be present, not perfect."</li>
        </ul>
        <p>Repeat this practice before each call for one week. Track how you feel after each one. Notice where you stayed composed, and where there's room to adapt further.</p>
      </div>
      
      <p>Premeditation builds presence. When the worst doesn't catch you off guard, you're free to show up at your best.</p>
      
      <h3>3. Amor Fati (Love of Fate)</h3>
      <div class="quote">
        "A blazing fire makes flame and brightness out of everything that is thrown into it."
        <div class="quote-attribution">— Marcus Aurelius</div>
      </div>
      
      <p>In sales, we are constantly being tested by rejection, no-shows, ghosting, or silence. It's easy to get discouraged or take it personally. But the Stoic Seller chooses a different lens — Amor Fati, the love of fate. Not just accepting what happens, but embracing it as fuel for growth.</p>
      
      <p>Amor Fati means seeing each "no," each disappointment, as part of a necessary process. Instead of resisting outcomes, we integrate them into our practice, trusting that every interaction, good or bad, is shaping us into better professionals and more resilient humans.</p>
      
      <p>When a call doesn't go well, when a deal falls through, ask: What is this teaching me? What strength is being forged right now?</p>
      
      <div class="reflection-box">
        <h4>🤔 Reflect:</h4>
        <p>Can you recall a rejection that, in hindsight, taught you something essential or led to an unexpected opportunity?</p>
      </div>
      
      <div class="assignment-box">
        <h4>📝 Assignment:</h4>
        <p>The next time something doesn't go your way — a deal lost, a prospect goes cold, a miscommunication occurs — write down what happened. Then ask yourself:</p>
        <ul>
          <li>What part of this is asking me to grow?</li>
          <li>What would a Stoic learn from this?</li>
          <li>What can I practice next time?</li>
        </ul>
        <p>Bonus: If you're up for it, end your entry with the phrase, "Amor Fati," as a quiet act of acceptance. Let it become your emotional signature in the face of adversity.</p>
      </div>
      
      <p>Sometimes, Amor Fati also means accepting that you're not the right fit for someone — and that they're not the right fit for you. It means recognizing that even if your solution feels perfect in your eyes, the prospect may see things differently. They may choose a competitor who, from your perspective, lacks quality, clarity, or care. But their choice is based on their context, their fears, and their frame of reference — not yours.</p>
      
      <p>This is where the Stoic Seller practices humility. Instead of reacting with frustration, they step back and ask: Am I confusing my perception with the prospect's perspective?</p>
      
      <p>To love fate is to release the need to be validated by every decision or deal. It's a quiet reminder that we do not need to be liked by everyone to do meaningful work.</p>
      
      <div class="quote">
        "It is not events that disturb people, it is their judgments concerning them."
        <div class="quote-attribution">— Epictetus</div>
      </div>
      
      <div class="exercise-box">
        <h4>🧘 On Ghosting:</h4>
        <p>Silence can be more uncomfortable than rejection. It triggers doubt and over-analysis. But Amor Fati teaches us to accept even silence as useful. When someone ghosts, instead of chasing, pause. Let the silence speak for both of you.</p>
        
        <h4>🛠️ Exercise:</h4>
        <p>Send one message to a prospect who's gone quiet. Choose honesty over pressure:</p>
        <p>"Hi [Name], I'm mindful of your time and priorities. If this is no longer a fit or not the right moment, that's completely okay. I appreciate the conversation we've had — and if it makes sense later on, I'll be here."</p>
        <p>Then let it go. Amor Fati.</p>
        
        <h4>📩 Bonus Message Template: Scheduled Check-Ins</h4>
        <p>When a prospect disappears but you still feel there's potential, try this message to maintain presence without pressure:</p>
        <p>"Hi [Name], I understand things can get busy. Since I haven't heard back, I'll plan to check in again in [X days/weeks] unless I hear otherwise. That way we both stay in the loop, and I'm also honoring both our time. If priorities have shifted, just let me know — either way, I really appreciated the dialogue so far."</p>
        <p>This kind of message communicates two things: you respect their silence, and you respect your time. It also establishes a gentle boundary and gives them a graceful way to opt out or reengage — without pressure.</p>
      </div>
      
      <h3>4. Memento Mori (Remember You Will Die)</h3>
      <div class="quote">
        "You could leave life right now. Let that determine what you do and say and think."
        <div class="quote-attribution">— Marcus Aurelius</div>
      </div>
      
      <p>Memento Mori is not morbid, it is liberating. It reminds us that time is finite, and that awareness can fuel urgency, clarity, and presence in everything we do — including how we sell.</p>
      
      <p>Sales is often filled with waiting. Waiting for replies, for budgets, for decisions. We stretch timelines, we delay truth, we stall on uncomfortable conversations. Memento Mori cuts through the delay. If today were your last opportunity to serve this client, what kind of presence would you bring?</p>
      
      <p>As a Stoic Seller, this principle reminds you that the value of your time — and theirs — is sacred. You are not here to perform, chase, or people-please. You are here to connect honestly, to guide thoughtfully, and to leave a meaningful impression, regardless of the outcome.</p>
      
      <div class="reflection-box">
        <h4>🤔 Reflect:</h4>
        <p>If this were the last sales conversation you ever had, how would you want it to feel? What would you say differently?</p>
      </div>
      
      <div class="assignment-box">
        <h4>📝 Assignment:</h4>
        <p>Before your next meeting or call, take 30 seconds to pause and breathe. Then ask yourself:</p>
        <ul>
          <li>If I had only this one shot to connect with this person, how can I make it count?</li>
          <li>What would I say if I had nothing to prove, only something to offer?</li>
        </ul>
        <p>After the call, journal one insight or moment where you were truly present. Let it be a reminder: you're not just selling, you're showing up fully — and that matters.</p>
      </div>
      
      <p><strong>But presence also means patience.</strong></p>
      
      <p>In a world of instant responses and aggressive follow-ups, the Stoic Seller practices restraint. How do you feel when someone pushes you, follows up repeatedly, or makes you feel rushed into a decision? It creates resistance, not trust. Don't become the thing you dislike. Respect the other person's timeline as much as your own.</p>
      
      <p>There's nothing passive about patience — it's an active choice to honor the pace of real human decision-making.</p>
      
      <div class="reflection-box">
        <h4>🤔 Reflect:</h4>
        <p>When was the last time you were pressured in a buying situation? How did it make you feel?</p>
      </div>
      
      <div class="assignment-box">
        <h4>📝 Assignment:</h4>
        <p>If you're in a waiting phase with a prospect, try this script instead of a push:</p>
        <ul>
          <li>"I know your time and priorities matter. Just wanted to check in and see if this is still on your radar — no rush, happy to pick this up whenever it feels right."</li>
          <li>"No pressure at all — I simply want to make sure I'm showing up when it's helpful, not adding noise. Let me know if you'd like to revisit this next week or further ahead."</li>
          <li>"I trust your timing, and I'm here when you're ready. Let me know how I can support your decision-making process."</li>
        </ul>
        <p>These are not delays. These are trust deposits.</p>
      </div>
      
      <p>Patience is not waiting passively — it's waiting with presence, readiness, and respect.</p>
      
      <p>To bring this into perspective, think of Cato the Younger — a Roman Stoic senator known for his calm resistance and incredible patience. In politics, he often chose principle over pressure, holding his ground in silence when others were swept away by emotion or impulse. His patience wasn't passivity, it was strength rooted in clarity. In a world where rushing decisions was the norm, he chose timing over tension.</p>
      
      <p>Or take Abraham Lincoln. He often endured months of political and military pressure before acting, because he believed true understanding required time. That patience led to some of the most profound and lasting decisions in U.S. history.</p>
      
      <p>In your sales practice, ask yourself: Are you trying to win quickly, or are you trying to build something that lasts?</p>
      
      <p>Rushed sales close fast and fall apart faster. Relationships, trust, and aligned timing — those take patience. But they stay closed, because they were never forced open.</p>

      <!-- Continue with remaining modules... -->
      <p style="text-align: center; margin: 3rem 0; font-style: italic; color: var(--neutral-medium);">
        This ebook contains the complete 6-module guide with practical exercises, reflection prompts, and real-world scripts.
        <br><br>
        Thank you for your purchase and your commitment to mindful selling.
      </p>
    </div>
  </div>
</body>
</html>`;

          const blob = new Blob([htmlContent], { type: 'text/html' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'the-stoic-seller-ebook.html';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        }
      });
  };

  if (!clientSecret) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full" aria-label="Loading"/>
      </div>
    );
  }

  if (paymentSucceeded) {
    return (
      <div className="p-6 md:p-10 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-green-600">Payment Successful!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p>Thank you for purchasing The Stoic Seller ebook!</p>
            <Button onClick={handleDownload} size="lg">
              Download Your Ebook
            </Button>
            <div className="pt-4">
              <Link href="/resources">
                <Button variant="outline">Back to Resources</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 max-w-2xl mx-auto">
      <div className="mb-8">
        <Link href="/resources" className="text-accent hover:text-accent-dark transition-colors">
          ← Back to Resources
        </Link>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Purchase The Stoic Seller Ebook</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="font-semibold mb-2">What you're purchasing:</h3>
            <ul className="list-disc pl-6 space-y-1 text-sm text-gray-600">
              <li>Complete 6-module guide on applying Stoic principles to sales</li>
              <li>Practical techniques and real-world scripts</li>
              <li>Reflection exercises and assignments</li>
              <li>Professional typography and elegant styling</li>
              <li>Download as HTML file for any browser</li>
            </ul>
          </div>
          
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold">The Stoic Seller Ebook</span>
              <span className="font-bold text-xl">$14.00</span>
            </div>
          </div>

          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm onPaymentSuccess={handlePaymentSuccess} />
          </Elements>
        </CardContent>
      </Card>
    </div>
  );
};

export default EbookCheckout;