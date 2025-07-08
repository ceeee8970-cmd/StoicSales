import React from 'react';
import { Button } from '@/components/ui/button';

interface StoicSellerEbookProps {
  onClose: () => void;
}

// Using the fixed version with commas instead of em dashes
const StoicSellerEbook: React.FC<StoicSellerEbookProps> = ({ onClose }) => {
  // Function to trigger download
  const handleDownload = () => {
    // Create a blob with the HTML content with all em dashes replaced with commas
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
      border-radius: 0 4px 4px 0;
    }
    
    .reflection-title {
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--primary);
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .reflection-title::before {
      content: "✓";
      color: var(--accent);
    }
    
    ul, ol {
      margin: 1.5rem 0 1.5rem 2rem;
    }
    
    li {
      margin-bottom: 0.75rem;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 2rem 0;
    }
    
    th, td {
      padding: 0.75rem;
      border: 1px solid var(--neutral-light);
    }
    
    th {
      background-color: var(--secondary);
      color: white;
      font-weight: 600;
    }
    
    tr:nth-child(even) {
      background-color: var(--neutral-bg);
    }
    
    .chapter-divider {
      display: flex;
      align-items: center;
      margin: 4rem 0;
      color: var(--neutral-medium);
    }
    
    .chapter-divider::before,
    .chapter-divider::after {
      content: "";
      flex: 1;
      border-bottom: 1px solid var(--neutral-light);
    }
    
    .chapter-divider::before {
      margin-right: 1rem;
    }
    
    .chapter-divider::after {
      margin-left: 1rem;
    }
    
    .challenge-box {
      background-color: var(--primary-light);
      color: white;
      padding: 1.5rem;
      margin: 2rem 0;
      border-radius: 4px;
    }
    
    .challenge-title {
      font-weight: 600;
      margin-bottom: 1rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
      padding-bottom: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .challenge-title::before {
      content: "🛠️";
    }
    
    .bonus-title::before {
      content: "🎯";
    }

    .breathwork-title::before {
      content: "🧘‍♂️";
    }
    
    .table-of-contents {
      margin: 2rem 0;
      padding: 2rem;
      background-color: var(--neutral-bg);
      border-radius: 4px;
    }
    
    .table-of-contents h3 {
      margin-top: 0;
      margin-bottom: 1.5rem;
      color: var(--primary);
    }
    
    .toc-item {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      border-bottom: 1px dotted var(--neutral-light);
    }
    
    .toc-page {
      color: var(--accent);
      font-weight: 600;
    }
    
    .chapter-number {
      display: inline-block;
      width: 2.5rem;
      height: 2.5rem;
      background-color: var(--accent);
      color: white;
      border-radius: 50%;
      text-align: center;
      line-height: 2.5rem;
      margin-right: 0.75rem;
      font-weight: 600;
    }
    
    .chapter-title {
      display: flex;
      align-items: center;
    }
    
    .script-box {
      background-color: #f5f5f5;
      padding: 1.5rem;
      border-radius: 4px;
      margin: 2rem 0;
      font-family: 'Lora', serif;
    }
    
    .script-speaker {
      font-weight: 600;
      color: var(--primary);
    }
    
    .principle-annotation {
      font-size: 0.85rem;
      color: var(--accent);
      font-style: italic;
      margin-left: 0.5rem;
    }
    
    .footer {
      text-align: center;
      padding: 2rem;
      color: var(--neutral-medium);
      font-size: 0.9rem;
      border-top: 1px solid var(--neutral-light);
    }

    .resources-section {
      background-color: var(--neutral-bg);
      padding: 2rem;
      border-radius: 4px;
      margin: 3rem 0;
    }

    .book-recommendation {
      margin-bottom: 1.5rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .book-icon {
      width: 50px;
      height: 60px;
      background-color: var(--primary);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      color: white;
      font-weight: bold;
      font-size: 1.5rem;
    }

    .book-details h4 {
      margin: 0 0 0.25rem 0;
      color: var(--primary);
    }

    .book-details p {
      margin: 0;
      font-size: 0.9rem;
      color: var(--neutral-medium);
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
          <div class="toc-page">1</div>
        </div>
        <div class="toc-item">
          <div>Module 1: Core Stoic Principles for Sales</div>
          <div class="toc-page">7</div>
        </div>
        <div class="toc-item">
          <div>Module 2: Human-Centered Sales Techniques</div>
          <div class="toc-page">19</div>
        </div>
        <div class="toc-item">
          <div>Module 3: Real-World Language & Messaging</div>
          <div class="toc-page">27</div>
        </div>
        <div class="toc-item">
          <div>Module 4: The 5-Day Stoic Seller Practice Challenge</div>
          <div class="toc-page">35</div>
        </div>
        <div class="toc-item">
          <div>Bonus Resources</div>
          <div class="toc-page">45</div>
        </div>
        <div class="toc-item">
          <div>Conclusion</div>
          <div class="toc-page">49</div>
        </div>
      </div>

      <!-- Introduction -->
      <div class="chapter-title">
        <span class="chapter-number">1</span>
        <h2>Introduction</h2>
      </div>
      
      <h3>The Stoic Seller</h3>
      
      <p>Before diving into the modules, a brief note for those new to Stoicism.</p>
      
      <p><strong>What is Stoicism?</strong> Stoicism is an ancient Greek philosophy that teaches the development of self-control, clarity, and resilience by focusing only on what we can control, accepting what we cannot, and approaching life with wisdom and virtue. Stoics like Epictetus, Seneca, and Marcus Aurelius didn't preach detachment from life, they practiced deeper engagement with it, grounded in awareness and purpose.</p>
      
      <p><strong>Why combine it with sales?</strong> After over a decade in sales, I noticed a growing disconnect: conversations were fast, transactional, and full of pressure. There was little room for pause, reflection, or meaningful interaction. At the same time, I had been studying Stoicism, first for personal growth, then as a mindset for life and work.</p>
      
      <p>It became clear that Stoic practices could directly support the challenges we face in sales: dealing with rejection, staying present, managing pressure, and building trust. The decision to combine the two came from a simple question: What would sales look like if it was rooted in philosophy, not performance? This is my answer.</p>
      
      <div class="reflection-box">
        <div class="reflection-title">Reflective Prompt</div>
        <p>When was the last time you had a sales conversation that felt real, not rehearsed, rushed, or rigid?</p>
        <p>What if that became your standard, not the exception?</p>
      </div>
      
      <h3>What is The Stoic Seller?</h3>
      
      <p>The Stoic Seller is a new way of approaching sales, not as manipulation, pressure, or process, but as presence, practice, and philosophy. It's about replacing anxiety with clarity, desperation with discipline, and ego with empathy. Rooted in ancient Stoic principles and refined by over a decade of real-world sales experience, this guide is for anyone who wants to sell with intention, not just ambition.</p>
      
      <div class="quote">
        This isn't a method. It's a mindset.
      </div>
      
      <h3>Why This Matters Now</h3>
      
      <p>After 10+ years in sales, I've seen what happens when the system prioritizes speed over substance. Salespeople are overwhelmed, prospects feel unheard, and conversations become mechanical. It's all pressure, numbers, and playbooks, with no room for human nuance.</p>
      
      <p>Too often, sales feels like a performance where we're pretending to care, asking scripted questions, and pushing toward our own goals without truly understanding the other person. Even as a buyer, I often feel like I'm talking to a chatbot, not a human being.</p>
      
      <p>We've drifted too far from what sales was meant to be: a human exchange based on curiosity, service, and alignment.</p>
      
      <p>The Stoic Seller is a return to roots. A return to stillness before action. A return to asking because we care, not because it converts. A return to detaching from outcomes and focusing on the work itself.</p>
      
      <h3>Reframing Sales: From Persuasion to Service</h3>
      
      <p>This guide isn't about tricks or hacks. It's about seeing sales as an opportunity to serve, to help others make decisions that benefit them, even if the decision is "no."</p>
      
      <p>The Stoic Seller is:</p>
      
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
        We have two ears and one mouth so that we can listen twice as much as we speak.
        <div class="quote-attribution">– Epictetus</div>
      </div>
      
      <p>Let this be a quiet revolution, in how you sell, and how you show up.</p>
      
      <div class="chapter-divider">•••</div>
      
      <!-- Module 1: Core Stoic Principles for Sales -->
      <div class="chapter-title">
        <span class="chapter-number">2</span>
        <h2>Core Stoic Principles for Sales</h2>
      </div>
      
      <p>This chapter distills timeless Stoic teachings into practical lenses for modern sellers. These are not abstract theories, but tested philosophies that can transform your mindset, emotional response, and day-to-day decision-making. Each principle is explored in depth, with practices and assignments to help you internalize the shift.</p>
      
      <h3>1. The Dichotomy of Control</h3>
      
      <div class="quote">
        Some things are up to us and some things are not.
        <div class="quote-attribution">– Epictetus</div>
      </div>
      
      <p>In sales, we often obsess over what we cannot control: a prospect's budget, their decision timeline, the market, our quota. The Stoic Seller learns to let go of what is not theirs to carry, and to double down on what is: effort, attitude, preparation, clarity, and presence.</p>
      
      <p>A real example: You've been nurturing a promising lead for weeks. You've followed up thoughtfully, shared relevant resources, and finally get on a decision call. Suddenly, they say they've chosen a cheaper competitor. The natural response? Frustration, disappointment, or even desperation.</p>
      
      <p>But take a Stoic pause: Can you control their internal budget discussion? Their leadership's shift in direction? No. What is in your control is how well you understood their needs, how clearly you communicated, and how professionally you respond.</p>
      
      <div class="quote">
        You have power over your mind — not outside events. Realize this, and you will find strength.
        <div class="quote-attribution">– Marcus Aurelius</div>
      </div>
      
      <div class="reflection-box">
        <div class="reflection-title">Reflect</div>
        <p>What parts of your sales process create stress because you're trying to control what you cannot?</p>
      </div>
      
      <div class="challenge-box">
        <div class="challenge-title">Assignment</div>
        <p>Draw a line down the center of a page. On the left, list everything about your current pipeline or process that feels stressful or uncertain. On the right, next to each item, write either "within my control" or "not within my control." Then highlight the ones you can influence, and commit to a small action on each this week.</p>
        <p>Shift your energy to where it matters most. That's the Stoic way.</p>
      </div>
      
      <h3>2. Premeditatio Malorum (Pre-meditation of Evils)</h3>
      
      <div class="quote">
        The wise man looks ahead and prepares.
        <div class="quote-attribution">– Seneca</div>
      </div>
      
      <p>Sales rarely goes exactly as planned. No-shows, objections, pricing pushback, tech failures, they're all part of the game. Instead of fearing these outcomes, the Stoic Seller mentally rehearses them. Not to dwell on failure, but to build resilience.</p>
      
      <p>Premeditatio Malorum means picturing what could go wrong, so you're less surprised, more composed, and better prepared when it happens. This isn't negative thinking. It's strategic preparation.</p>
      
      <p>The Stoics saw this as a strength, not weakness. Seneca himself would regularly reflect on potential setbacks not to become paranoid, but to maintain emotional composure and reduce the element of surprise. By rehearsing adversity in advance, he created a kind of psychological shock-absorber.</p>
      
      <p>In today's terms, think of it like pre-installing an emotional buffer. You're not hoping for failure, you're preparing for how to meet it if it shows up.</p>
      
      <div class="reflection-box">
        <div class="reflection-title">Reflect</div>
        <p>What's one recurring obstacle in your sales calls that always catches you off guard? How do you usually respond, and how would you like to respond?</p>
      </div>
      
      <div class="challenge-box">
        <div class="challenge-title">Assignment</div>
        <p>Before your next sales call, take two minutes to visualize three things that could go wrong, and how you'll respond with calm, clarity, and control. Write them down. For example:</p>
        <ul>
          <li>If they challenge my price, I will respond: "Totally fair question. Can I ask what you're comparing it to so I can better understand where you're coming from?"</li>
          <li>If they show up distracted or impatient, I will say: "You've probably had a full day. Want to pause for a breath before we dive in?"</li>
          <li>If I feel nervous or thrown off, I will ground myself with a breath and silently repeat: "Be present, not perfect."</li>
        </ul>
        <p>Repeat this practice before each call for one week. Track how you feel after each one. Notice where you stayed composed, and where there's room to adapt further.</p>
        <p>Premeditation builds presence. When the worst doesn't catch you off guard, you're free to show up at your best.</p>
      </div>
      
      <h3>3. Amor Fati (Love of Fate)</h3>
      
      <div class="quote">
        A blazing fire makes flame and brightness out of everything that is thrown into it.
        <div class="quote-attribution">– Marcus Aurelius</div>
      </div>
      
      <p>In sales, we are constantly being tested by rejection, no-shows, ghosting, or silence. It's easy to get discouraged or take it personally. But the Stoic Seller chooses a different lens — Amor Fati, the love of fate. Not just accepting what happens, but embracing it as fuel for growth.</p>
      
      <p>Amor Fati means seeing each "no," each disappointment, as part of a necessary process. Instead of resisting outcomes, we integrate them into our practice, trusting that every interaction, good or bad, is shaping us into better professionals and more resilient humans.</p>
      
      <p>When a call doesn't go well, when a deal falls through, ask: What is this teaching me? What strength is being forged right now?</p>
      
      <div class="reflection-box">
        <div class="reflection-title">Reflect</div>
        <p>Can you recall a rejection that, in hindsight, taught you something essential or led to an unexpected opportunity?</p>
      </div>
      
      <div class="challenge-box">
        <div class="challenge-title">Assignment</div>
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
        It is not events that disturb people, it is their judgments concerning them.
        <div class="quote-attribution">– Epictetus</div>
      </div>
      
      <div class="reflection-box">
        <div class="reflection-title">On Ghosting</div>
        <p>Silence can be more uncomfortable than rejection. It triggers doubt and over-analysis. But Amor Fati teaches us to accept even silence as useful. When someone ghosts, instead of chasing, pause. Let the silence speak for both of you.</p>
      </div>
      
      <div class="challenge-box">
        <div class="challenge-title">Exercise</div>
        <p>Send one message to a prospect who's gone quiet. Choose honesty over pressure:</p>
        <p>"Hi [Name], I'm mindful of your time and priorities. If this is no longer a fit or not the right moment, that's completely okay. I appreciate the conversation we've had — and if it makes sense later on, I'll be here."</p>
        <p>Then let it go. Amor Fati.</p>
      </div>
      
      <div class="challenge-box">
        <div class="bonus-title">Bonus Message Template: Scheduled Check-Ins</div>
        <p>When a prospect disappears but you still feel there's potential, try this message to maintain presence without pressure:</p>
        <p>"Hi [Name], I understand things can get busy. Since I haven't heard back, I'll plan to check in again in [X days/weeks] unless I hear otherwise. That way we both stay in the loop, and I'm also honoring both our time. If priorities have shifted, just let me know — either way, I really appreciated the dialogue so far."</p>
        <p>This kind of message communicates two things: you respect their silence, and you respect your time. It also establishes a gentle boundary and gives them a graceful way to opt out or reengage — without pressure.</p>
      </div>
      
      <h3>4. Memento Mori (Remember You Will Die)</h3>
      
      <div class="quote">
        You could leave life right now. Let that determine what you do and say and think.
        <div class="quote-attribution">– Marcus Aurelius</div>
      </div>
      
      <p>Memento Mori is not morbid, it is liberating. It reminds us that time is finite, and that awareness can fuel urgency, clarity, and presence in everything we do — including how we sell.</p>
      
      <p>Sales is often filled with waiting. Waiting for replies, for budgets, for decisions. We stretch timelines, we delay truth, we stall on uncomfortable conversations. Memento Mori cuts through the delay. If today were your last opportunity to serve this client, what kind of presence would you bring?</p>
      
      <p>As a Stoic Seller, this principle reminds you that the value of your time — and theirs — is sacred. You are not here to perform, chase, or people-please. You are here to connect honestly, to guide thoughtfully, and to leave a meaningful impression, regardless of the outcome.</p>
      
      <div class="reflection-box">
        <div class="reflection-title">Reflect</div>
        <p>If this were the last sales conversation you ever had, how would you want it to feel? What would you say differently?</p>
      </div>
      
      <div class="challenge-box">
        <div class="challenge-title">Assignment</div>
        <p>Before your next meeting or call, take 30 seconds to pause and breathe. Then ask yourself:</p>
        <ul>
          <li>If I had only this one shot to connect with this person, how can I make it count?</li>
          <li>What would I say if I had nothing to prove, only something to offer?</li>
        </ul>
        <p>After the call, journal one insight or moment where you were truly present. Let it be a reminder: you're not just selling, you're showing up fully — and that matters.</p>
      </div>
      
      <p>But presence also means patience.</p>
      
      <p>In a world of instant responses and aggressive follow-ups, the Stoic Seller practices restraint. How do you feel when someone pushes you, follows up repeatedly, or makes you feel rushed into a decision? It creates resistance, not trust. Don't become the thing you dislike. Respect the other person's timeline as much as your own.</p>
      
      <p>There's nothing passive about patience — it's an active choice to honor the pace of real human decision-making.</p>
      
      <div class="reflection-box">
        <div class="reflection-title">Reflect</div>
        <p>When was the last time you were pressured in a buying situation? How did it make you feel?</p>
      </div>
      
      <div class="challenge-box">
        <div class="challenge-title">Assignment</div>
        <p>If you're in a waiting phase with a prospect, try this script instead of a push:</p>
        <ul>
          <li>"I know your time and priorities matter. Just wanted to check in and see if this is still on your radar — no rush, happy to pick this up whenever it feels right."</li>
          <li>"No pressure at all — I simply want to make sure I'm showing up when it's helpful, not adding noise. Let me know if you'd like to revisit this next week or further ahead."</li>
          <li>"I trust your timing, and I'm here when you're ready. Let me know how I can support your decision-making process."</li>
        </ul>
        <p>These are not delays. These are trust deposits.</p>
        <p>Patience is not waiting passively — it's waiting with presence, readiness, and respect.</p>
      </div>
      
      <p>To bring this into perspective, think of Cato the Younger — a Roman Stoic senator known for his calm resistance and incredible patience. In politics, he often chose principle over pressure, holding his ground in silence when others were swept away by emotion or impulse. His patience wasn't passivity, it was strength rooted in clarity. In a world where rushing decisions was the norm, he chose timing over tension.</p>
      
      <p>Or take Abraham Lincoln. He often endured months of political and military pressure before acting, because he believed true understanding required time. That patience led to some of the most profound and lasting decisions in U.S. history.</p>
      
      <p>In your sales practice, ask yourself: Are you trying to win quickly, or are you trying to build something that lasts?</p>
      
      <p>Rushed sales close fast and fall apart faster. Relationships, trust, and aligned timing — those take patience. But they stay closed, because they were never forced open.</p>
      
      <div class="chapter-divider">•••</div>
      
      <!-- Module 3: Human-Centered Sales Techniques -->
      <div class="chapter-title">
        <span class="chapter-number">3</span>
        <h2>Human-Centered Sales Techniques</h2>
      </div>
      
      <p>The Stoic Seller doesn't sell to impress, persuade, or win. They sell to serve. This module translates your inner mindset into outer action — a way of speaking, listening, and guiding that builds trust and unlocks genuine connection.</p>
      
      <p>Where traditional sales relies on pressure and persuasion, human-centered sales starts with presence and permission. It's not about what you say — it's about how you show up.</p>
      
      <p>This chapter focuses on four foundational techniques:</p>
      
      <h3>1. Ask, Don't Assume</h3>
      
      <div class="quote">
        If you want to improve, be content to be thought foolish and stupid.
        <div class="quote-attribution">– Epictetus</div>
      </div>
      
      <p>Epictetus reminds us that true understanding comes from humility. By asking instead of assuming, you let go of the need to appear smart, and step into the mindset of service. Curiosity isn't weakness — it's a form of respect.</p>
      
      <p>Great sellers ask real questions — not as a tactic, but from genuine curiosity. Instead of "qualifying" a lead, you're trying to understand a person. The goal isn't to prove your solution is right — it's to explore if it's right for them.</p>
      
      <p>Try:</p>
      <ul>
        <li>"Can I ask what made you open to this conversation in the first place?"</li>
        <li>"What's happening in your world right now that brought this topic up?"</li>
      </ul>
      
      <div class="reflection-box">
        <div class="reflection-title">Reflect</div>
        <p>Do your questions serve your prospect — or just your pipeline?</p>
      </div>
      
      <div class="challenge-box">
        <div class="challenge-title">Assignment</div>
        <p>Record your next call. Count how many open-ended vs. leading questions you ask. Rewrite 3 of them with more curiosity and less control.</p>
      </div>
      
      <h3>2. Mirror Their Words</h3>
      
      <div class="quote">
        Nature gave us one tongue and two ears so we could listen twice as much as we speak.
        <div class="quote-attribution">– Epictetus</div>
      </div>
      
      <p>In a noisy world, being deeply heard is rare — and powerful. Stoics practiced listening not to reply, but to understand. Mirroring isn't mimicry, it's confirmation: I heard you. I'm with you.</p>
      
      <p>People feel heard when they hear their own language reflected back. You don't need to paraphrase perfectly — you just need to stay close to their reality.</p>
      
      <p>Try:</p>
      <ul>
        <li>"You mentioned earlier that [insert phrasing] — can we explore that a little more?"</li>
        <li>"When you say [key phrase], what does that mean to you in practice?"</li>
      </ul>
      
      <div class="challenge-box">
        <div class="challenge-title">Assignment</div>
        <p>After a call, review your notes. Highlight 3 phrases your prospect used. In your next follow-up message, use those exact words.</p>
      </div>
      
      <h3>3. Create Calm, Not Urgency</h3>
      
      <div class="quote">
        No man is free who is not master of himself.
        <div class="quote-attribution">– Epictetus</div>
      </div>
      
      <p>Urgency often comes from fear — fear of losing the deal, of running out of time. The Stoic Seller calms the room by calming themselves first. In that space, trust emerges.</p>
      
      <p>Urgency is often manufactured. But trust grows in calm. The Stoic Seller creates an environment where people feel safe to think, speak, and decide.</p>
      
      <p>Try:</p>
      <ul>
        <li>"There's no rush here — I want you to feel this is the right next step, not just the next one."</li>
        <li>"If you need more time to think it through, that's totally fine. Want to set a touchpoint in a few days?"</li>
      </ul>
      
      <div class="challenge-box">
        <div class="challenge-title">Assignment</div>
        <p>Identify one moment where you usually push (a second follow-up, a closing call). Practice using a slower, more spacious line instead.</p>
      </div>
      
      <h3>4. Close with Alignment, Not Pressure</h3>
      
      <div class="quote">
        Waste no more time arguing what a good man should be. Be one.
        <div class="quote-attribution">– Marcus Aurelius</div>
      </div>
      
      <p>Don't push to close. Stand still, and let alignment emerge. Closing with clarity and care is an act of integrity — not just for you, but for your buyer. That's what Stoic leadership looks like.</p>
      
      <p>Closing should feel like a mutual decision, not a victory lap. A yes should come with clarity and energy — not obligation.</p>
      
      <p>Try:</p>
      <ul>
        <li>"Based on everything we've discussed, do you feel this is aligned with what you need?"</li>
        <li>"What would you need to feel 100% comfortable moving forward from here?"</li>
      </ul>
      
      <div class="challenge-box">
        <div class="challenge-title">Assignment</div>
        <p>Reflect on your last 3 closes. Were they mutual agreements — or did they require a final push? How could you invite more transparency next time?</p>
      </div>
      
      <h3>Book & Voice Mastery: Calm as a Sales Advantage</h3>
      
      <p>One of the most overlooked aspects of Stoic communication is the mastery of tone. Your voice is a direct reflection of your inner state. Before words even land, your tone has already spoken for you.</p>
      
      <p>Marcus Aurelius reminds us: "If you are distressed by anything external, the pain is not due to the thing itself, but to your estimate of it." This includes how we speak under pressure.</p>
      
      <p>When your tone is calm, slow, and grounded — especially in moments when others might rush or panic — you create contrast. That contrast builds credibility.</p>
      
      <div class="reflection-box">
        <div class="reflection-title">Real Example</div>
        <p>You enter a meeting where the prospect is tense, speaks quickly, and tries to control the tempo. Most sellers speed up to match them. The Stoic Seller slows down, breathes between sentences, and lets their voice remain clear, measured, and non-defensive.</p>
      </div>
      
      <div class="challenge-box">
        <div class="challenge-title">Practice</div>
        <p>Record yourself reading a simple sales intro three times: once rushed, once neutral, and once slowly and intentionally with pauses.</p>
        <p>Play them back and feel the difference. Which version would you trust?</p>
      </div>
      
      <div class="challenge-box">
        <div class="challenge-title">Script Tip</div>
        <p>"Let's pause for a moment — what would be most helpful for you right now?"</p>
        <p>That one line, delivered with calm confidence, can reset an entire call.</p>
      </div>
      
      <div class="reflection-box">
        <div class="reflection-title">Personal Reflection</div>
        <p>Think of a time outside of sales — maybe in your personal life — when someone's tone made you feel heard, respected, or safe. That's the effect you want to create.</p>
      </div>
      
      <p>Sales isn't just about what you say. It's how you say it. And how you say it depends on who you are when you say it.</p>
      
      <div class="chapter-divider">•••</div>
      
      <!-- Module 5: Real-World Language & Messaging -->
      <div class="chapter-title">
        <span class="chapter-number">4</span>
        <h2>Real-World Language & Messaging</h2>
      </div>
      
      <div class="quote">
        Speech is the mirror of the soul. As a man speaks, so is he.
        <div class="quote-attribution">– Publilius Syrus</div>
      </div>
      
      <p>Your language reflects your mindset. In Stoicism, clarity and simplicity are virtues. Your words should serve the message — not distract from it.</p>
      
      <h3>Principle 1: Clarity Over Cleverness</h3>
      
      <p>Jargon vs. Real-World Language Table:</p>
      
      <table>
        <tr>
          <th>Jargon/Template Phrase</th>
          <th>Stoic-Inspired, Real Language</th>
        </tr>
        <tr>
          <td>We're the leading provider of...</td>
          <td>We might be a good fit if...</td>
        </tr>
        <tr>
          <td>Let me tell you why this matters...</td>
          <td>Would it be helpful if I shared how this works for others?</td>
        </tr>
        <tr>
          <td>I'd love to steal 15 minutes of your time...</td>
          <td>Open to a quick intro call if it makes sense?</td>
        </tr>
        <tr>
          <td>What keeps you up at night?</td>
          <td>What are you currently navigating that feels challenging?</td>
        </tr>
        <tr>
          <td>We're trusted by companies like...</td>
          <td>Companies in similar positions have found this useful because...</td>
        </tr>
        <tr>
          <td>You'll increase ROI by X%</td>
          <td>Here's the tangible impact we've seen in similar cases</td>
        </tr>
        <tr>
          <td>Just checking in...</td>
          <td>Wanted to make sure my last message landed alright</td>
        </tr>
        <tr>
          <td>Does this sound like a priority for you now?</td>
          <td>Is this worth exploring together at this point?</td>
        </tr>
        <tr>
          <td>I'll follow up next week...</td>
          <td>If now isn't the right time, I'm happy to revisit this later — your call</td>
        </tr>
        <tr>
          <td>Let's get you onboarded ASAP</td>
          <td>Shall we move forward only if it feels like a good fit?</td>
        </tr>
      </table>
      
      <h3>Adapting Tone to Your Prospect</h3>
      
      <p>The Stoic Seller meets people where they are — without losing themselves.</p>
      
      <p>If a prospect is rushed and speaks fast, you don't need to match their pace. Instead, slow your rhythm slightly. Your calm creates contrast — and contrast creates awareness.</p>
      
      <p>If someone is analytical, mirror their logic. If they're casual, match their warmth. But always stay anchored in authenticity. Adjusting tone is not manipulation — it's recognition.</p>
      
      <div class="challenge-box">
        <div class="challenge-title">Tip</div>
        <p>Write down three tone traits after your next call (e.g., fast-paced, skeptical, friendly). Reflect: Did you respond with presence or with performance?</p>
      </div>
      
      <h3>On Confidence</h3>
      
      <div class="quote">
        Man is not worried by real problems so much as by his imagined anxieties about real problems.
        <div class="quote-attribution">– Epictetus</div>
      </div>
      
      <p>Confidence doesn't come from being flawless. It comes from knowing what you stand for, and being okay with not being for everyone.</p>
      
      <p>Ways to sound confident:</p>
      <ul>
        <li>Lower your tone slightly and slow your pace</li>
        <li>Pause after key points — don't rush to fill silence</li>
        <li>Replace fillers with breathing ("um" becomes space)</li>
        <li>Let your message land instead of pushing it</li>
      </ul>
      
      <div class="challenge-box">
        <div class="challenge-title">Practice</div>
        <p>End your next call with one calm, confident statement — not to convince, but to close the moment with clarity. Example: "Whatever you decide, I appreciate the time you gave this."</p>
      </div>
      
      <h3>It's Okay to Say 'I Don't Know'</h3>
      
      <p>The Stoic Seller embraces imperfection. In fact, admitting you don't know something in a conversation — rather than bluffing — builds trust. It shows humility and makes you more relatable. People don't buy from robots. They buy from humans.</p>
      
      <p>If you fumble a line, pause awkwardly, or admit you need to check something and get back to them, you show you're real. And that's powerful. Research even shows that people tend to trust — and buy from — those who display vulnerability in small ways. Confidence doesn't require perfection. It thrives in honesty.</p>
      
      <p>Try saying:</p>
      <ul>
        <li>"That's a great question — and I want to give you the most accurate answer. Let me double-check and circle back shortly."</li>
        <li>"I hadn't considered that. Would you mind sharing more of your thinking?"</li>
      </ul>
      
      <p>Imperfection invites connection. Own it.</p>
      
      <p>Sales isn't just about what you say. It's how you say it. And how you say it depends on who you are when you say it.</p>
      
      <h3>Bonus Roleplay: Cold Call – The Stoic Seller in Action</h3>
      
      <p>The scene: A calm, composed SDR calls a Sales Director who is rushed, skeptical, and fast-paced. This roleplay shows how Stoic principles — presence, patience, control of tone, and detachment from outcomes — turn a tense moment into a meaningful interaction.</p>
      
      <div class="script-box">
        <p><span class="script-speaker">SDR (Alex):</span> Hi, this is Alex from The Stoic Seller. I know you weren't expecting my call. Would you prefer I try again later?</p>
        
        <p><span class="script-speaker">Sales Director:</span> What's this about? I've got literally one minute.</p>
        
        <p><span class="script-speaker">SDR:</span> I appreciate that. I'll keep it respectful — and brief. <span class="principle-annotation">(Dichotomy of Control)</span></p>
        
        <p>I'm reaching out to introduce a course that combines Stoic philosophy with real-world sales skills. It's built for directors like you who want their team to stay grounded while still hitting numbers. Before I go further — can I ask: what kind of pressure is your team facing right now?</p>
        
        <p><span class="script-speaker">Sales Director:</span> (sighs) Honestly, it's chaos. Targets are up. Team's burning out. But I don't have time for another soft-skills course.</p>
        
        <p><span class="script-speaker">SDR:</span> That makes complete sense. And I'm not here to sell you fluff. The course is practical. It focuses on how to regulate stress, listen with intent, and sell without sounding like a machine. <span class="principle-annotation">(Amor Fati + Book & Voice Mastery)</span></p>
        
        <p><span class="script-speaker">Sales Director:</span> Sounds nice, but we don't have time to slow down.</p>
        
        <p><span class="script-speaker">SDR:</span> I get that. But what if slowing down helped them connect more — and perform better? When reps show up with clarity, they don't burn out. They build trust. <span class="principle-annotation">(Premeditatio Malorum)</span></p>
        
        <p><span class="script-speaker">Sales Director:</span> Maybe. I'm skeptical.</p>
        
        <p><span class="script-speaker">SDR:</span> Fair. And you have every right to be. That's why I'd rather share a quick sample of the material and let you decide in your own time. <span class="principle-annotation">(Invite, Don't Impose)</span></p>
        
        <p><span class="script-speaker">Sales Director:</span> Alright. Send it. If I like it, maybe we can chat next week.</p>
        
        <p><span class="script-speaker">SDR:</span> Sounds great. I'll send it over with no pressure. Thanks for your honesty — and for giving me a shot. <span class="principle-annotation">(Letting Go of Outcome)</span></p>
        
        <p>[Hangs up. Breathes. Amor Fati.]</p>
      </div>
      
      <div class="chapter-divider">•••</div>
      
      <!-- Module 6: The 5-Day Stoic Seller Practice Challenge -->
      <div class="chapter-title">
        <span class="chapter-number">5</span>
        <h2>The 5-Day Stoic Seller Practice Challenge</h2>
      </div>
      
      <p>Reading is one thing — practicing is another. This is your real-world dojo. Each day below is a hands-on challenge that helps you embody Stoic principles in action — through interactions, personal reflection, roleplay, and real conversation. Invite a friend or colleague to join, or go solo and keep a journal.</p>
      
      <h3>Day 1 – The Circle of Control (Epictetus)</h3>
      
      <div class="challenge-box">
        <div class="challenge-title">Challenge</div>
        <p>Write down 10 things stressing you in your current pipeline or quota. Then use a highlighter to mark which are actually under your control. Share this list with a teammate or mentor and ask them to call you out if you spiral on what's not yours.</p>
      </div>
      
      <div class="challenge-box">
        <div class="bonus-title">Bonus Exercise</div>
        <p>For 24 hours, anytime you catch yourself saying "I hope," reframe it into "I will focus on…"</p>
      </div>
      
      <div class="challenge-box">
        <div class="bonus-title">Optional App</div>
        <p>Download Stoic. (available on iOS/Android) and log one reflection today under "Control."</p>
      </div>
      
      <h3>Day 2 – Practice Discomfort (Premeditatio Malorum)</h3>
      
      <div class="challenge-box">
        <div class="challenge-title">Challenge</div>
        <p>Record yourself handling a worst-case objection (price, timing, skepticism). No script. Just your breath, your clarity, your calm. Watch it back — alone or with a friend — and rate your tone, patience, and presence.</p>
      </div>
      
      <div class="challenge-box">
        <div class="bonus-title">Bonus Game</div>
        <p>Have a colleague throw 3 curveball objections at you live. Respond only with questions, not defense.</p>
      </div>
      
      <div class="quote">
        The wise man looks ahead and prepares.
        <div class="quote-attribution">– Seneca</div>
      </div>
      
      <div class="challenge-box">
        <div class="challenge-title">Tool Tip</div>
        <p>Use Vocaroo or the Voice Memos app to record and review your tone.</p>
      </div>
      
      <h3>Day 3 – Embrace the 'No' (Amor Fati)</h3>
      
      <div class="challenge-box">
        <div class="challenge-title">Challenge</div>
        <p>Pick one slow deal in your pipeline. Call or message the prospect to invite a "no." Say: "It's totally fine if this isn't a fit. Would you prefer we close the loop for now and revisit later?"</p>
        <p>Then reflect: how did that feel in your body? Freeing? Scary? Liberating?</p>
      </div>
      
      <div class="challenge-box">
        <div class="bonus-title">Reflection Prompt</div>
        <p>What rejection shaped you most in your sales journey?</p>
      </div>
      
      <div class="challenge-box">
        <div class="bonus-title">Optional</div>
        <p><a href="https://www.youtube.com/watch?v=5EIo3BzGAs8" target="_blank">Listen to Ryan Holiday's talk "The Obstacle is the Way" on YouTube.</a></p>
      </div>
      
      <h3>Day 4 – Listen Twice, Speak Once</h3>
      
      <div class="challenge-box">
        <div class="challenge-title">Challenge</div>
        <p>Have a real-time conversation (with a friend, partner, or prospect) where you do two things:</p>
        <p>Speak only after a 2-second pause.</p>
        <p>Paraphrase back what they said before you reply.</p>
      </div>
      
      <div class="challenge-box">
        <div class="bonus-title">Team Exercise</div>
        <p>Pair with a teammate and roleplay a discovery call — but your only goal is to mirror. Not sell.</p>
      </div>
      
      <div class="quote">
        Nature gave us one tongue and two ears so that we could listen twice as much as we speak.
        <div class="quote-attribution">– Epictetus</div>
      </div>
      
      <h3>Day 5 – Speak with Integrity & Calm</h3>
      
      <div class="challenge-box">
        <div class="challenge-title">Challenge</div>
        <p>Choose one outreach email and rewrite it with absolute honesty and calm. Avoid hype, promises, or push. Then send it.</p>
      </div>
      
      <div class="challenge-box">
        <div class="bonus-title">Alternative</div>
        <p>Call someone you trust and tell them why you're doing this challenge. Use your real voice. No masks.</p>
      </div>
      
      <div class="challenge-box">
        <div class="bonus-title">Recommended Listen</div>
        <p>The Daily Stoic Podcast — "Confidence Without Arrogance."</p>
      </div>
      
      <h3>Bonus Practices</h3>
      
      <div class="challenge-box">
        <div class="breathwork-title">Box Breathing (Step-by-step)</div>
        <ul>
          <li>Inhale deeply through your nose for 4 seconds</li>
          <li>Hold your breath for 4 seconds</li>
          <li>Exhale slowly through your mouth for 4 seconds</li>
          <li>Hold again at the bottom for 4 seconds</li>
          <li>Repeat for 4–5 cycles, staying mentally focused on each phase</li>
        </ul>
        <p>This technique calms your nervous system, slows your heart rate, and centers your attention before a call or meeting.</p>
      </div>
      
      <div class="challenge-box">
        <div class="breathwork-title">10-minute Yoga Nidra practice</div>
        <p><a href="https://www.youtube.com/watch?v=M0u9GST_j3s" target="_blank">Box Breathing tutorial by Huberman Lab (YouTube)</a></p>
      </div>
      
      <div class="resources-section">
        <h3>Book List</h3>
        
        <div class="book-recommendation">
          <div class="book-icon">📖</div>
          <div class="book-details">
            <h4><a href="https://www.amazon.com/Meditations-New-Translation-Marcus-Aurelius/dp/0812968255" target="_blank">Meditations by Marcus Aurelius</a></h4>
            <p>A series of personal reflections by a Roman emperor on discipline, duty, and inner strength. This is the philosophical backbone of leadership through calm.</p>
          </div>
        </div>
        
        <div class="book-recommendation">
          <div class="book-icon">📖</div>
          <div class="book-details">
            <h4><a href="https://www.amazon.com/Letters-Penguin-Classics-Lucius-Annaeus/dp/0140442103" target="_blank">Letters from a Stoic by Seneca</a></h4>
            <p>Practical life and mindset advice written in letter form. Clear, modern-feeling insights on dealing with anxiety, wealth, anger, and loss.</p>
          </div>
        </div>
        
        <div class="book-recommendation">
          <div class="book-icon">📖</div>
          <div class="book-details">
            <h4><a href="https://www.amazon.com/Discourses-Selected-Writings-Penguin-Classics/dp/0140449469" target="_blank">Discourses by Epictetus</a></h4>
            <p>A sharp, no-excuses guide to self-control, humility, and what it means to live well, straight from the mouth of a former slave turned philosopher.</p>
          </div>
        </div>
        
        <div class="book-recommendation">
          <div class="book-icon">📖</div>
          <div class="book-details">
            <h4><a href="https://www.amazon.com/Daily-Stoic-Meditations-Wisdom-Perseverance/dp/0735211736" target="_blank">The Daily Stoic by Ryan Holiday</a></h4>
            <p>One meditation for each day of the year, blending ancient wisdom with modern business and personal growth insights.</p>
          </div>
        </div>
        
        <h3>Bonus Resources</h3>
        <ul>
          <li><a href="https://www.youtube.com/c/DailyStoic" target="_blank">The Daily Stoic YouTube Channel</a></li>
          <li><a href="https://www.youtube.com/playlist?list=PL7IctvKqA25JTyM7RzQFK2fGPGYMxZGRd" target="_blank">Modern Wisdom: Stoicism playlist</a></li>
        </ul>
        
        <h3>AI Tools to Support You</h3>
        <ul>
          <li><a href="https://chat.openai.com/" target="_blank">ChatGPT</a> – to rewrite outreach emails, practice objection handling, or reflect on your progress</li>
          <li><a href="https://www.rewind.ai/" target="_blank">Rewind AI</a> – to log and replay calls to evaluate tone and presence</li>
          <li><a href="https://otter.ai/" target="_blank">Otter.ai</a> – to transcribe and analyze your own sales calls for keyword patterns and clarity</li>
        </ul>
      </div>
      
      <h3>Bonus Scripts</h3>
      
      <div class="script-box">
        <p><strong>Cold Call Intro (New Prospect)</strong></p>
        <p>"Hi [Name], this is Alex from The Stoic Seller. You weren't expecting my call, so I want to respect your time. Would you prefer I try again later, or can I ask you a 30-second question about how your team handles sales mindset?"</p>
      </div>
      
      <div class="script-box">
        <p><strong>Final Call Script (Prospect Doesn't Convert)</strong></p>
        <p>"Thanks again for exploring this with me. I completely respect where you're at — sometimes it's not the right time or the right fit. I'm here if things shift. Either way, I'm grateful we connected."</p>
      </div>
      
      <h3>Your Daily Journal Template</h3>
      <p>Use this simple format during your 5-day challenge or beyond:</p>
      
      <div class="reflection-box">
        <div class="reflection-title">Morning Check-In</div>
        <ul>
          <li>What mindset do I want to bring into today's calls?</li>
          <li>What's within my control today?</li>
          <li>One breath or phrase to ground me:</li>
        </ul>
      </div>
      
      <div class="reflection-box">
        <div class="reflection-title">Mid-Day Reflection</div>
        <ul>
          <li>What did I notice about how I listened?</li>
          <li>Where did I act with calm vs. react with stress?</li>
          <li>A small win (mindset, tone, language):</li>
        </ul>
      </div>
      
      <div class="reflection-box">
        <div class="reflection-title">Evening Wrap-Up</div>
        <ul>
          <li>What moment felt most aligned with Stoic values?</li>
          <li>What surprised me about myself?</li>
          <li>What will I let go of before tomorrow?</li>
        </ul>
      </div>
      
      <div class="quote">
        You are not your number. You are your presence. You are not your script. You are your silence. You are not your wins. You are how you show up.
      </div>
      
      <div class="quote">
        Don't explain your philosophy. Embody it.
        <div class="quote-attribution">– Epictetus</div>
      </div>
      
      <h3>What Skeptics Might Say</h3>
      
      <p>Not everyone will resonate with the Stoic Seller approach. Some might argue that this mindset sounds too soft, too slow, or incompatible with the urgent nature of modern sales. They may believe that strong results come from high-pressure tactics, tight control, and persuasive mastery — not calm presence and philosophical reflection.</p>
      
      <p>But that's exactly the point: pressure works in the short term, until it doesn't. This approach isn't about abandoning ambition — it's about sustaining it. It's about leading with presence instead of performance, and seeing long-term trust as a better conversion tool than short-term urgency.</p>
      
      <div class="chapter-divider">•••</div>
      
      <!-- Conclusion -->
      <div class="chapter-title">
        <span class="chapter-number">6</span>
        <h2>Conclusion</h2>
      </div>
      
      <p>The Stoic Seller is not a script, a trick, or a hack. It's a mindset rooted in ancient wisdom and modern emotional intelligence. It's about showing up differently — with patience, presence, and principles — in a world that moves too fast and listens too little.</p>
      
      <p>You won't always get the deal. But you can always choose to be grounded, curious, and clear. You can choose to treat people like people, not targets. And over time, that choice becomes your competitive edge.</p>
      
      <div class="quote">
        Waste no more time arguing what a good person should be. Be one.
        <div class="quote-attribution">– Marcus Aurelius</div>
      </div>
      
      <p>This is your invitation to bring intention back into your sales career — and your life.</p>
      
      <p>Let this be your edge. Let this be your practice. Let this be your philosophy in motion.</p>
      
      <div class="footer">
        <p>© 2025 The Stoic Seller. All rights reserved.</p>
        <p>Created with purpose, not pressure.</p>
      </div>
    </div>
  </div>
</body>
</html>`;

    // Create the blob 
    const blob = new Blob([htmlContent], { type: 'text/html' });
    
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.download = 'the-stoic-seller-ebook.html';
    
    // Append to body, click and remove
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };
  
  return (
    <div className="h-full flex flex-col">
      <div className="mb-8">
        <Button
          variant="ghost"
          className="text-accent hover:text-accent-dark transition-colors"
          onClick={onClose}
        >
          &larr; Back to Resources
        </Button>
        <h1 className="font-heading text-3xl font-bold text-primary mt-4 mb-2">
          The Stoic Seller Ebook
        </h1>
        <p className="text-neutral-medium mb-4">
          A comprehensive guide to applying Stoic philosophy to sales mastery
        </p>
      </div>
      
      <div className="bg-white p-8 rounded-lg shadow-lg mb-8">
        <div className="bg-primary text-white p-10 rounded-lg text-center mb-6">
          <h2 className="font-heading text-4xl font-bold mb-3">THE STOIC SELLER</h2>
          <p className="font-serif italic text-lg">A Philosophical Guide to Sales Mastery through Presence, Practice, and Perspective</p>
        </div>
        
        <p className="mb-6">
          This beautifully styled ebook contains your complete 6-module guide on applying Stoic principles to sales, 
          including all the reflection exercises, practical techniques, scripts, and challenges from your original document.
        </p>
        
        <h3 className="font-heading text-xl font-semibold mb-4">Contents Include:</h3>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Introduction to Stoicism in Sales</li>
          <li>Core Stoic Principles for Sales Professionals</li>
          <li>Human-Centered Sales Techniques</li>
          <li>Real-World Language & Messaging Templates</li>
          <li>The 5-Day Stoic Seller Practice Challenge</li>
          <li>Bonus Resources and Exercises</li>
        </ul>
        
        <p className="mb-8">
          The ebook features professional typography, elegant styling, and a layout that makes your content more 
          engaging and easier to navigate. It's ready for download as an HTML file that can be viewed in any browser.
        </p>
        
        <div className="flex justify-center">
          <Button 
            size="lg" 
            className="bg-accent hover:bg-accent-dark text-white font-semibold"
            onClick={handleDownload}
          >
            Purchase Ebook - $14
          </Button>
        </div>
      </div>
      
      <div className="bg-neutral-bg p-6 rounded-lg">
        <h3 className="font-heading text-lg font-semibold mb-2">Usage Rights</h3>
        <p className="text-sm text-neutral-medium">
          This ebook can be shared with your audience, used for lead generation, or sold as a standalone product.
          All content is based on your original document with enhanced formatting and styling for professional presentation.
        </p>
      </div>
    </div>
  );
};

export default StoicSellerEbook;