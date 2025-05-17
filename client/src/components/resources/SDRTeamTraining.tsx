import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup } from "@/components/ui/radio-group";
import { Radio } from "@/components/ui/radio";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface SDRTeamTrainingProps {
  onClose: () => void;
}

type QuestionType = 'multiple-choice' | 'true-false' | 'open-ended';

interface Question {
  id: number;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer?: string | string[];
  userAnswer?: string | string[];
}

interface Section {
  id: number;
  title: string;
  content: string;
  completed: boolean;
  questions: Question[];
}

const EMAIL_MESSAGING_SECTION = `
# Email Messaging for SDRs

## The Stoic Approach to Cold Emails

Cold emailing is often viewed as one of the most challenging aspects of an SDR's role. Rejection is common, and responses can be rare. However, by applying Stoic principles, we can develop a more effective and resilient approach.

### Key Principles

1. **Focus on what you can control** - You cannot control whether someone opens your email or responds, but you can control the quality, clarity, and value of your message.

2. **Practice indifference to outcomes** - While tracking metrics is important, becoming emotionally attached to response rates creates unnecessary anxiety. Send emails with care, then detach from the results.

3. **Value-first communication** - Always lead with genuine value for the recipient. What insight or perspective can you offer that they might not have considered?

### Email Structure

1. **Subject Line (First Impressions Matter)**
   - Be specific and relevant to their business
   - Create curiosity without being misleading
   - Personalize when possible
   - Example: "Question about [Company]'s approach to [specific challenge]"

2. **Opening Line (Establish Relevance)**
   - Personalized to the individual or company
   - Reference a specific trigger event when possible
   - Example: "I noticed [Company] recently announced [specific initiative], and it made me think about..."

3. **Value Statement (Why This Matters)**
   - Clear articulation of the problem you solve
   - Backed by specific results/metrics when possible
   - Example: "We've helped companies like [similar company] reduce [specific pain point] by X%, resulting in..."

4. **Call-to-Action (Clear Next Step)**
   - Simple, low-friction request
   - Specific date/time options if requesting a meeting
   - Example: "Would you be open to a 15-minute conversation next Tuesday or Wednesday to explore if there might be a fit?"

### Best Practices

- **Research thoroughly** - The quality of your personalization directly correlates with response rates
- **Be concise** - Respect their time with brevity (3-5 sentences maximum)
- **Follow up thoughtfully** - Plan a sequence of 5-7 touches over 2-3 weeks
- **Test and iterate** - Continuously refine your approach based on data, not assumptions

### Examples of Effective Emails

**Example 1: Insight-Based Email**

Subject: Observation about [Company]'s customer acquisition strategy

Hi [Name],

I analyzed [Company]'s approach to [specific area] and noticed an opportunity around [specific insight].

We've helped similar [industry] companies like [reference company] address this by [brief value proposition], resulting in [specific outcome].

Would a 15-minute conversation next week make sense to explore if this might be valuable for your team?

Best,
[Your name]

**Example 2: Trigger Event Email**

Subject: Your recent [announcement/news/event]

Hi [Name],

Congratulations on your recent [specific announcement]. This type of initiative often creates challenges around [related challenge].

We've worked with several companies during similar transitions to ensure [specific benefit], preventing [common problem].

Are you available for a brief conversation this Thursday at 10am or 2pm to discuss how we might support your goals?

Regards,
[Your name]
`;

const LINKEDIN_MESSAGING_SECTION = `
# LinkedIn Messaging for SDRs

## The Stoic Approach to LinkedIn Outreach

LinkedIn represents a unique opportunity for SDRs to connect directly with prospects in a professional context. The platform combines elements of social media engagement with professional networking, requiring a balanced approach.

### Key Principles

1. **Authenticity over automation** - While tools exist to automate outreach, the Stoic approach values genuine connection. Quality over quantity.

2. **Respect for the platform context** - LinkedIn is a professional network, not an email inbox. Messages should reflect the social nature of the platform.

3. **Long-term perspective** - Build relationships and provide value first, rather than focusing solely on immediate meetings or sales.

### Connection Request Strategy

1. **Research-Based Personalization**
   - Reference specific content they've shared or engaged with
   - Mention mutual connections or groups
   - Note relevant professional achievements

2. **Clear Value in Connection**
   - Explain briefly why connecting would be beneficial (for them)
   - Example: "I've been following your insights on [topic] and would value connecting to share relevant research my team has compiled on this area."

3. **No Immediate Sales Pitch**
   - The connection request is not the place to sell
   - Focus on establishing the relationship first

### Messaging Approach

1. **Engagement Before Outreach**
   - Comment thoughtfully on their posts before messaging
   - Share or engage with their content
   - This warms the relationship before direct contact

2. **First Message Structure**
   - Reference a specific point of common interest
   - Share an insight or resource relevant to their recent activity
   - Ask a thoughtful question related to their expertise
   - Example: "Your recent post on [topic] resonated with me, particularly your point about [specific detail]. I recently came across this research that expands on that idea [link]. I'm curious - what's your view on [related question]?"

3. **Follow-Up Strategy**
   - Continue to engage with their content between messages
   - Reference the ongoing conversation
   - Gradually introduce your solution only when relevant

### Voice Messages and Video

LinkedIn offers voice message and video options that can help you stand out:

- **Voice messages** - Consider for follow-ups to add a personal touch (keep under 30 seconds)
- **Video messages** - Highly effective for personalization, showing you've invested time

### Best Practices

- **Be patient** - LinkedIn relationships develop over time
- **Add value consistently** - Share relevant insights, articles, and connections
- **Respect boundaries** - If someone doesn't respond, don't send multiple follow-ups
- **Quality content** - Your own profile and posts should demonstrate expertise

### Effective Message Sequences

**Example 1: Thought Leadership Approach**

*Connection request:* "Hi [Name], I've been following your insights on [topic]. I'm connecting with leaders in [industry] to share research on [relevant trend]. Would appreciate connecting."

*After connection (1-2 days):* "Thanks for connecting, [Name]! As mentioned, I've been researching [topic]. This article specifically addresses the challenge you mentioned in your recent post about [specific point]. Would love your thoughts."

*Follow-up (if engaged, 3-5 days later):* "Your perspective on [their response] was insightful. We've actually developed an approach that addresses [related challenge]. Would you be open to a brief conversation to explore how this might apply to your situation at [Company]?"

**Example 2: Mutual Connection Approach**

*Connection request:* "Hi [Name], I noticed we're both connected with [mutual connection]. I've been working with companies like yours on [specific challenge], and I'd appreciate connecting to share insights."

*After connection (1-2 days):* "Thanks for connecting, [Name]! [Mutual connection] speaks highly of your work at [Company]. I noticed you're focused on [specific initiative] - we recently helped [similar company] achieve [specific result] in this area. I thought you might find this case study valuable [link]."

*Follow-up (5-7 days later):* "Hope you found that case study helpful. I'm curious - are you currently facing similar challenges with [specific aspect]? I might be able to share some approaches that have worked well for others in your industry."
`;

const HANDLING_RESISTANCE_SECTION = `
# Handling Resistance for SDRs

## The Stoic Approach to Prospect Resistance

SDRs frequently encounter resistance rather than direct objections. Understanding the difference is crucial: resistance is often about timing, attention, or priorities rather than objections to your solution itself.

### Key Principles

1. **Acceptance without judgement** - Resistance is a natural part of the process, not a personal rejection. Accept it without emotional reaction.

2. **Curiosity over persuasion** - When meeting resistance, seek first to understand rather than immediately counter.

3. **Preparation conquers fear** - Anticipate common forms of resistance and prepare thoughtful responses ahead of time.

### Common Types of Resistance

1. **Brush-offs (Dismissive Responses)**
   - "Just send me some information."
   - "We're all set right now."
   - "Call me back in 6 months."

2. **Status Quo Defenders**
   - "What we have works fine."
   - "We've always done it this way."
   - "We don't have that problem."

3. **Gatekeepers**
   - "They're not interested."
   - "They don't take sales calls."
   - "I'll pass your information along."

4. **Non-Priority Signals**
   - "We don't have budget for this."
   - "We're too busy right now."
   - "We have other priorities at the moment."

### Effective Response Frameworks

#### The Acknowledge, Bridge, Curiosity (ABC) Framework

1. **Acknowledge** their position without challenging it
   - "I understand completely. Many of our current clients initially felt the same way."

2. **Bridge** to a relevant value point
   - "What we've found is that companies often don't realize how much [pain point] is costing until they see the data."

3. **Curiosity** question to continue dialogue
   - "I'm curious - has your team ever calculated the impact of [pain point] on your [relevant business metric]?"

#### The SPIN Approach for Resistance

1. **Situation** questions to understand context
   - "What tools are you currently using to address [challenge]?"

2. **Problem** questions to uncover pain
   - "What aspects of your current approach have been frustrating?"

3. **Implication** questions to amplify importance
   - "How does that challenge impact your ability to [achieve business goal]?"

4. **Need-payoff** questions to visualize solution value
   - "If you could solve that issue, what would that mean for your team's performance?"

### Response Examples for Common Resistance

**Example 1: "Just send me some information"**

"I'm happy to send information, [Name]. To make sure I send the most relevant materials, could you share what specific aspect of [challenge area] is most important for your team right now? This way I can customize what I send."

**Example 2: "We're all set with our current solution"**

"That's great to hear, [Name]. Most companies we work with had existing solutions too. What typically prompted them to explore alternatives was [specific industry challenge]. Has your team experienced any challenges with [specific aspect of their likely solution]?"

**Example 3: "Call me back in X months"**

"I understand timing is important, [Name]. Many of our clients initially suggested we reconnect later, but found value in a brief conversation to understand what might be possible in the future. Would it make sense to spend just 15 minutes now to explore if this should be on your roadmap when the timing is right?"

**Example 4: "We don't have budget for this"**

"I completely understand budget constraints, [Name]. That's actually why I reached out. Several companies in [industry] have found that our solution helps [specific measurable outcome], which has made it a revenue-positive investment even in tight budget environments. Would it be worth exploring if the potential ROI might justify finding budget if the value is clear?"

### Best Practices

- **Practice active listening** - Often, the prospect will tell you exactly how to move forward if you listen carefully
- **Maintain a calm, confident tone** - Your delivery matters as much as your words
- **Use thoughtful silence** - After asking a question, wait patiently for their response
- **Know when to step back** - Sometimes, the timing truly isn't right; respect that and maintain the relationship
`;

const CALL_OPENERS_SECTION = `
# Call Openers for SDRs

## The Stoic Approach to Opening Calls

The first 30 seconds of a call often determine its success. A Stoic approach emphasizes preparation, purpose, and presence rather than relying on manipulative techniques or high-pressure tactics.

### Key Principles

1. **Preparation eliminates anxiety** - Thoroughly research before each call to build confidence and relevance.

2. **Purpose-driven communication** - Begin with clear intentions about the value you're offering.

3. **Present-moment focus** - Give full attention to the conversation rather than worrying about outcomes.

### The Three-Part Call Opening Framework

1. **Introduction with Pattern Interrupt**
   - State your name and company clearly
   - Add an unexpected element that distinguishes from typical calls
   - Example: "Hi [Name], this is [Your name] from [Company]. I realize I'm interrupting your day, and I appreciate your taking my call..."

2. **Purpose Statement with Relevance**
   - Immediately state why you're calling
   - Include a specific reason why it's relevant to them
   - Example: "I'm reaching out because we've helped three other [specific role] at [similar companies] solve [specific challenge] and saw you might be facing similar issues based on your recent [LinkedIn post/company announcement/industry trend]."

3. **Permission Bridge**
   - Ask permission to continue the conversation
   - Frame as a question that's easy to say yes to
   - Example: "I'd like to ask a couple of questions to see if what we've done for them might be relevant for you as well. Would that be okay?"

### Opening Variations for Different Scenarios

#### For Cold Calls

"Hi [Name], I'm [Your name] with [Company]. I know I'm catching you out of the blue, so I'll be brief. We've been working with [similar companies] to help them [specific value proposition], and I noticed [specific trigger/research point] at [Their Company] that suggested you might be facing similar challenges. Is this something your team is currently working to address?"

#### For Referral-Based Calls

"Hi [Name], I'm [Your name] with [Company]. [Referrer Name] suggested I reach out to you directly. They mentioned you've been working on [specific initiative] and thought our approach to [value proposition] might align with your goals. Has [specific challenge] been a focus area for your team recently?"

#### For Follow-Up Calls

"Hi [Name], I'm [Your name] with [Company]. We exchanged [emails/LinkedIn messages] last week about [topic], and I wanted to follow up as promised. You mentioned [specific point from previous communication] - I'd love to learn more about the challenges you're facing in that area. Is now still a good time to talk?"

#### For Inbound Lead Calls

"Hi [Name], I'm [Your name] with [Company]. I'm calling because you recently [downloaded our guide/requested information/signed up for our webinar] about [topic]. Many people who show interest in that area are typically dealing with [specific challenge]. Is that something you're currently experiencing?"

### Advanced Techniques

1. **The Research Reference**
   - Open by mentioning a specific piece of research about their company
   - Example: "Hi [Name], I'm [Your name] with [Company]. I was reviewing your company's recent [specific announcement] and noticed the emphasis on [strategic priority]. This often indicates challenges with [related issue]..."

2. **The Industry Insight**
   - Begin with a relevant trend or benchmark
   - Example: "Hi [Name], I'm [Your name] with [Company]. We just completed research showing that [industry] companies are experiencing a 43% increase in [specific challenge]. I'm reaching out to selected leaders like yourself to share these findings..."

3. **The Mutual Connection**
   - Leverage social proof from shared connections
   - Example: "Hi [Name], I'm [Your name] with [Company]. We both know [mutual connection], who suggested I reach out after hearing about your initiatives in [area]. They thought our work helping companies with [specific value] might be relevant..."

### What to Avoid

- **The "How are you?" opener** - Feels insincere in cold calls
- **Asking "Did I catch you at a bad time?"** - Invites rejection
- **Apologizing for the call** - Undermines your value proposition
- **Vague statements** - "I'd like to talk about your business needs"
- **Feature-focused openings** - Leading with your solution rather than their challenge

### Final Call Opening Tips

1. **Speak slightly slower than your natural pace**
2. **Smile while speaking** - It affects your vocal tone positively
3. **Stand up during important calls** - Increases energy and confidence
4. **Have your research visible** - Keep notes on screen to reference
5. **Record your openings** - Review and refine your approach
`;

const GHOSTING_FOLLOWUPS_SECTION = `
# Ghosting & Follow-ups for SDRs

## The Stoic Approach to Prospect Ghosting

Being ignored by prospects (or "ghosted") is perhaps the most common challenge SDRs face. A Stoic approach helps manage the emotional impact while providing effective strategies to re-engage prospects.

### Key Principles

1. **Non-attachment to outcomes** - Your worth is not determined by prospect responses.

2. **Persistence without pestering** - There's a fine line between diligent follow-up and becoming an annoyance. Respect it.

3. **Value in every touch** - Each follow-up should provide new insight or value, not just "checking in."

### Understanding Why Prospects Ghost

1. **Timing Issues** - Your solution isn't a current priority
2. **Competing Priorities** - They're focused on more urgent matters
3. **Information Overload** - Your messages got lost in their inbox
4. **Value Not Clear** - Benefits weren't compelling enough
5. **Forgotten Context** - They don't remember the initial conversation

### Effective Follow-up Strategies

#### The 5-Touch Sequence Framework

1. **Initial Follow-up (Day 1-2)**
   - Reference specific points from previous conversation
   - Provide additional insight related to their challenge
   - Clear call-to-action

2. **Value-Add Follow-up (Day 3-4)**
   - Share relevant content (article, case study, industry report)
   - Connect to their specific situation
   - Soft call-to-action

3. **Question-Based Follow-up (Day 7)**
   - Ask a thought-provoking question related to their challenges
   - Position as seeking their expertise/perspective
   - No direct ask

4. **Alternative Contact Method (Day 10)**
   - Try a different channel (call if you've been emailing, LinkedIn if you've been calling)
   - Brief message acknowledging previous attempts
   - Clear, simple call-to-action

5. **Break-up Email (Day 14)**
   - Signal this is your final attempt for now
   - No guilt or pressure, just closing the loop
   - Leave door open for future contact

### Channel-Specific Follow-up Approaches

#### Email Follow-ups

- **Subject Line Strategies**
  - Use "Re:" only when actually replying to their email
  - Try pattern interrupts: "Question about [topic]" or "[Their name], thoughts?"
  - For final attempts: "Closing the loop" or "Last thing about [topic]"

- **Email Body Best Practices**
  - Keep to 3-5 sentences maximum
  - Bold key points or questions
  - Use numbered lists for clarity
  - Include one clear call-to-action

#### Phone Follow-ups

- **Voicemail Techniques**
  - 20-30 seconds maximum
  - State name and company clearly, twice if needed
  - Reference previous conversation specifically
  - Give a compelling reason to call back
  - Speak slightly slower than normal

- **Call Timing Strategies**
  - Early morning (7:30-8:30am) often works best
  - Try during lunch (12:00-1:00pm)
  - End of day can be effective (4:30-5:30pm)
  - Vary times with each attempt

#### LinkedIn Follow-ups

- **Engagement Approach**
  - Comment on their content before following up
  - Send short, conversational messages
  - Reference shared connections or groups
  - Consider voice messages for pattern interruption

### Example Follow-up Sequences

**Example 1: After Initial Discovery Call**

*Email 1 (Day 1):* "Thanks for our conversation about [specific challenge]. Attached is the [resource] I mentioned that addresses [specific point from call]. Would [specific day/time] work to continue our discussion about [next step]?"

*Email 2 (Day 4):* "I came across this article about [relevant topic] and thought of our conversation about [specific challenge]. The section about [specific point] seems particularly relevant to your situation at [Company]. Have you had a chance to consider [previously discussed next step]?"

*Call + Voicemail (Day 7):* "Hi [Name], it's [Your name] from [Company]. I wanted to follow up on our conversation about [specific challenge] and share a new insight about [related topic]. Please give me a call back at [number] when you have a moment. Thanks!"

*LinkedIn Message (Day 10):* "Hi [Name], I've been trying to reach you about our discussion on [topic]. I understand schedules get busy - would it make sense to reconnect next week instead? I have some new information about [specific value point] I think you'd find valuable."

*Break-up Email (Day 14):* "Hi [Name], I wanted to close the loop on our previous conversation about [topic]. I haven't heard back, so I assume priorities have shifted or timing isn't right. No problem at all. If circumstances change, I'm happy to pick up the conversation. Wishing you success with your [relevant initiative]."

**Example 2: After No Response to Initial Outreach**

*Email 1 (Day 1):* "Hi [Name], I reached out yesterday about how we've helped [similar companies] achieve [specific result]. I'm following up to see if [specific challenge] is something your team at [Company] is currently addressing. Would a brief conversation make sense?"

*Email 2 (Day 3):* "Hi [Name], I thought you might be interested in this case study about how [similar company] overcame [specific challenge] and achieved [specific result]. Is this an area your team is currently focused on improving?"

*Call (Day 6):* Brief call attempting to reach them directly, no voicemail if not answered.

*Email 3 (Day 8):* "Hi [Name], I've been trying to connect regarding [topic]. I'm curious - is it that [common reason 1], [common reason 2], or simply that [common reason 3]? Any quick response would be helpful in understanding if I should follow up later instead."

*Final Email (Day 12):* "Hi [Name], I've reached out a few times about [specific value proposition]. Since I haven't heard back, I'll assume the timing isn't right. If priorities change, feel free to reach out - I'd be happy to pick up the conversation. In the meantime, I'll share our [relevant resource] that might be useful regardless."

### Best Practices

1. **Track all follow-ups in your CRM** - Maintain a clean record of your outreach
2. **Personalize each message** - Avoid copying and pasting generic follow-ups
3. **Test different approaches** - Measure which follow-up sequences perform best
4. **Know when to move on** - After 5-7 attempts without response, focus elsewhere
5. **Always maintain professionalism** - Never express frustration or disappointment
`;

const SDRTeamTraining: React.FC<SDRTeamTrainingProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showPurchaseDialog, setShowPurchaseDialog] = useState(true);
  const [purchased, setPurchased] = useState(false);
  const [currentSection, setCurrentSection] = useState<Section | null>(null);
  const [testActive, setTestActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [testResults, setTestResults] = useState<{
    correct: number;
    total: number;
    passed: boolean;
  } | null>(null);
  const [userAnswers, setUserAnswers] = useState<{[key: number]: string | string[]}>({});

  // Training sections
  const sections: Section[] = [
    {
      id: 1,
      title: "Email Messaging",
      content: EMAIL_MESSAGING_SECTION,
      completed: false,
      questions: [
        {
          id: 1,
          type: 'true-false',
          question: "According to Stoic principles, you should focus primarily on response rates rather than message quality.",
          correctAnswer: "false"
        },
        {
          id: 2,
          type: 'multiple-choice',
          question: "What is the recommended maximum length for an effective cold email?",
          options: ["1-2 sentences", "3-5 sentences", "10 sentences", "As long as needed to explain your product"],
          correctAnswer: "3-5 sentences"
        },
        {
          id: 3,
          type: 'open-ended',
          question: "Describe how you would apply the Stoic principle of 'focusing on what you can control' to your email outreach strategy."
        }
      ]
    },
    {
      id: 2,
      title: "LinkedIn Messaging",
      content: LINKEDIN_MESSAGING_SECTION,
      completed: false,
      questions: [
        {
          id: 4,
          type: 'multiple-choice',
          question: "What should you do before sending a direct LinkedIn message to a prospect?",
          options: ["Send them a connection request with a sales pitch", "Engage with their content", "Message all their connections", "Send them multiple messages in one day"],
          correctAnswer: "Engage with their content"
        },
        {
          id: 5,
          type: 'true-false',
          question: "According to the training, LinkedIn relationships should develop quickly with immediate sales pitches.",
          correctAnswer: "false"
        },
        {
          id: 6,
          type: 'open-ended',
          question: "Write a sample LinkedIn connection request message applying the principles taught in this section."
        }
      ]
    },
    {
      id: 3,
      title: "Handling Resistance",
      content: HANDLING_RESISTANCE_SECTION,
      completed: false,
      questions: [
        {
          id: 7,
          type: 'multiple-choice',
          question: "What is the ABC framework for handling resistance?",
          options: ["Always Be Closing", "Acknowledge, Bridge, Curiosity", "Attack, Backtrack, Close", "All Business Communication"],
          correctAnswer: "Acknowledge, Bridge, Curiosity"
        },
        {
          id: 8,
          type: 'true-false',
          question: "When a prospect says 'just send me some information,' you should immediately send a generic brochure.",
          correctAnswer: "false"
        },
        {
          id: 9,
          type: 'open-ended',
          question: "How would you respond to a prospect who says 'We're all set with our current solution'? Apply the principles from this section."
        }
      ]
    },
    {
      id: 4,
      title: "Call Openers",
      content: CALL_OPENERS_SECTION,
      completed: false,
      questions: [
        {
          id: 10,
          type: 'multiple-choice',
          question: "What should you avoid when opening a cold call?",
          options: ["Stating your name and company", "Referring to research you've done", "Asking 'How are you?'", "Stating your purpose clearly"],
          correctAnswer: "Asking 'How are you?'"
        },
        {
          id: 11,
          type: 'true-false',
          question: "According to the training, you should apologize for interrupting the prospect's day when opening a call.",
          correctAnswer: "false"
        },
        {
          id: 12,
          type: 'open-ended',
          question: "Write a cold call opening script applying the three-part framework taught in this section."
        }
      ]
    },
    {
      id: 5,
      title: "Ghosting & Follow-ups",
      content: GHOSTING_FOLLOWUPS_SECTION,
      completed: false,
      questions: [
        {
          id: 13,
          type: 'multiple-choice',
          question: "How many touches are recommended in the follow-up sequence framework?",
          options: ["3", "5", "7", "10"],
          correctAnswer: "5"
        },
        {
          id: 14,
          type: 'true-false',
          question: "Each follow-up should provide new insight or value, not just 'checking in'.",
          correctAnswer: "true"
        },
        {
          id: 15,
          type: 'open-ended',
          question: "Draft a 'break-up email' following the principles described in this section."
        }
      ]
    }
  ];

  // Final assessment questions
  const finalAssessment: Question[] = [
    {
      id: 16,
      type: 'multiple-choice',
      question: "Which Stoic principle best applies to handling rejection in sales?",
      options: [
        "Focus only on success metrics", 
        "Take rejection personally to improve", 
        "Focus on what you can control", 
        "Avoid difficult prospects"
      ],
      correctAnswer: "Focus on what you can control"
    },
    {
      id: 17,
      type: 'true-false',
      question: "A good follow-up sequence should include at least 10 touchpoints within a week.",
      correctAnswer: "false"
    },
    {
      id: 18,
      type: 'multiple-choice',
      question: "What is the best approach when a prospect says 'call me back in 6 months'?",
      options: [
        "Call them back exactly 6 months later", 
        "Ignore their request and call weekly", 
        "Send them a calendar invite for 6 months later", 
        "Acknowledge their timeline but explore if a brief conversation now might be valuable"
      ],
      correctAnswer: "Acknowledge their timeline but explore if a brief conversation now might be valuable"
    },
    {
      id: 19,
      type: 'true-false',
      question: "Email subject lines should always mention your product or service directly.",
      correctAnswer: "false"
    },
    {
      id: 20,
      type: 'multiple-choice',
      question: "Which call opening approach is most effective according to the training?",
      options: [
        "Start with 'How are you today?'", 
        "Begin by apologizing for the interruption", 
        "Start with a clear introduction and purpose statement with relevance", 
        "Open with a detailed explanation of your product features"
      ],
      correctAnswer: "Start with a clear introduction and purpose statement with relevance"
    },
    {
      id: 21,
      type: 'multiple-choice',
      question: "What is the recommended approach for LinkedIn messaging?",
      options: [
        "Send connection requests with sales pitches", 
        "Message prospects multiple times per day", 
        "Engage with their content before direct messaging", 
        "Focus exclusively on decision-makers"
      ],
      correctAnswer: "Engage with their content before direct messaging"
    },
    {
      id: 22,
      type: 'true-false',
      question: "According to Stoic principles, you should become emotionally attached to each prospect's response.",
      correctAnswer: "false"
    },
    {
      id: 23,
      type: 'multiple-choice',
      question: "What is the ABC framework for handling resistance?",
      options: [
        "Always Be Closing", 
        "Acknowledge, Bridge, Curiosity", 
        "Attack, Backtrack, Close", 
        "Assert, Bargain, Convince"
      ],
      correctAnswer: "Acknowledge, Bridge, Curiosity"
    },
    {
      id: 24,
      type: 'true-false',
      question: "The quality of your personalization directly correlates with email response rates.",
      correctAnswer: "true"
    },
    {
      id: 25,
      type: 'multiple-choice',
      question: "What type of email is recommended as the final attempt in a follow-up sequence?",
      options: [
        "An aggressive demand for response", 
        "A break-up email", 
        "A message expressing disappointment", 
        "A detailed product brochure"
      ],
      correctAnswer: "A break-up email"
    }
  ];

  const handleStartSection = (section: Section) => {
    setCurrentSection(section);
    setActiveTab("section");
  };

  const handleStartTest = () => {
    if (!currentSection) return;
    
    setTestActive(true);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTestResults(null);
  };

  const handleFinishSection = () => {
    if (!currentSection) return;
    
    // Mark section as completed
    const updatedSections = sections.map(s => 
      s.id === currentSection.id ? {...s, completed: true} : s
    );
    
    setActiveTab("overview");
    setCurrentSection(null);
    setTestActive(false);
  };

  const handleAnswerChange = (questionId: number, answer: string | string[]) => {
    setUserAnswers({
      ...userAnswers,
      [questionId]: answer
    });
  };

  const handleNextQuestion = () => {
    if (!currentSection) return;
    
    if (currentQuestionIndex < currentSection.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate results for the section test
      const correct = currentSection.questions.filter(q => {
        if (q.type === 'open-ended') return true; // Open-ended questions are always marked as correct
        const userAnswer = userAnswers[q.id];
        return q.correctAnswer === userAnswer;
      }).length;
      
      setTestResults({
        correct,
        total: currentSection.questions.length,
        passed: correct / currentSection.questions.length >= 0.7 // Pass with 70%
      });
    }
  };

  const handleFinalAssessment = () => {
    setActiveTab("final-assessment");
    setCurrentSection(null);
    setTestActive(true);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setTestResults(null);
  };

  const handleFinalAssessmentSubmit = () => {
    // Calculate results for the final assessment
    const correct = finalAssessment.filter(q => {
      if (q.type === 'open-ended') return true; // Open-ended questions are always marked as correct
      const userAnswer = userAnswers[q.id];
      return q.correctAnswer === userAnswer;
    }).length;
    
    setTestResults({
      correct,
      total: finalAssessment.length,
      passed: correct / finalAssessment.length >= 0.7 // Pass with 70%
    });
  };

  const renderQuestion = (question: Question) => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-4">
            <p className="font-medium text-lg">{question.question}</p>
            <RadioGroup
              value={userAnswers[question.id] as string || ""}
              onValueChange={(value) => handleAnswerChange(question.id, value)}
            >
              {question.options?.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Radio id={`option-${index}`} value={option} />
                  <label htmlFor={`option-${index}`} className="text-sm">{option}</label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );
      
      case 'true-false':
        return (
          <div className="space-y-4">
            <p className="font-medium text-lg">{question.question}</p>
            <RadioGroup
              value={userAnswers[question.id] as string || ""}
              onValueChange={(value) => handleAnswerChange(question.id, value)}
            >
              <div className="flex items-center space-x-2">
                <Radio id="true" value="true" />
                <label htmlFor="true" className="text-sm">True</label>
              </div>
              <div className="flex items-center space-x-2">
                <Radio id="false" value="false" />
                <label htmlFor="false" className="text-sm">False</label>
              </div>
            </RadioGroup>
          </div>
        );
      
      case 'open-ended':
        return (
          <div className="space-y-4">
            <p className="font-medium text-lg">{question.question}</p>
            <Textarea
              value={userAnswers[question.id] as string || ""}
              onChange={(e) => handleAnswerChange(question.id, e.target.value)}
              placeholder="Type your answer here..."
              className="min-h-[100px]"
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  // Calculate overall progress
  const completedSections = sections.filter(s => s.completed).length;
  const progressPercentage = (completedSections / sections.length) * 100;

  // Purchase dialog content
  const renderPurchaseDialog = () => (
    <Dialog open={showPurchaseDialog && !purchased} onOpenChange={purchased ? undefined : setShowPurchaseDialog}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>SDR Team Training Program</DialogTitle>
          <DialogDescription>
            Unlock the complete training program for your SDR team. This premium resource includes 5 specialized modules with actionable strategies and assessment tools.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <h3 className="font-bold text-lg">What's Included:</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li>Email Messaging Strategies for SDRs</li>
            <li>LinkedIn Messaging Best Practices</li>
            <li>Handling Resistance Techniques</li>
            <li>Effective Call Openers</li>
            <li>Ghosting & Follow-up Frameworks</li>
            <li>Practice Assessments for Each Module</li>
            <li>Final Certification Test</li>
          </ul>
          
          <div className="bg-neutral-lightest p-4 rounded-lg">
            <p className="font-bold">Premium Resource: $99</p>
            <p className="text-sm text-neutral-medium">One-time purchase, team-wide access</p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => setShowPurchaseDialog(false)}>Cancel</Button>
          <Button onClick={() => setPurchased(true)}>Purchase Now</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

  // If not purchased, show the purchase promotion
  if (!purchased && !showPurchaseDialog) {
    return (
      <div className="p-6 md:p-10">
        <div className="mb-8">
          <Button variant="ghost" className="text-accent hover:text-accent-dark transition-colors" onClick={onClose}>
            &larr; Back to Resources
          </Button>
          <h1 className="font-heading text-3xl font-bold text-primary mt-4 mb-2">
            SDR Team Training Program
          </h1>
          <p className="text-neutral-medium mb-6">
            Complete training system for SDR teams applying Stoic principles to sales outreach
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="font-heading text-xl font-bold mb-4">What You'll Learn</h2>
            <ul className="space-y-3">
              {sections.map(section => (
                <li key={section.id} className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-neutral-light flex items-center justify-center mr-3">
                    {section.id}
                  </div>
                  <span>{section.title}</span>
                </li>
              ))}
              <li className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center mr-3">
                  ✓
                </div>
                <span>Final Assessment & Certification</span>
              </li>
            </ul>
            
            <div className="mt-8">
              <h2 className="font-heading text-xl font-bold mb-4">Training Includes</h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center mr-2 mt-0.5">✓</span>
                  <span>Practical frameworks for daily SDR activities</span>
                </li>
                <li className="flex items-start">
                  <span className="w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center mr-2 mt-0.5">✓</span>
                  <span>Script templates and example messages</span>
                </li>
                <li className="flex items-start">
                  <span className="w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center mr-2 mt-0.5">✓</span>
                  <span>Interactive assessments for each module</span>
                </li>
                <li className="flex items-start">
                  <span className="w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center mr-2 mt-0.5">✓</span>
                  <span>Team-wide access with progress tracking</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-neutral-lightest rounded-lg p-6">
            <h2 className="font-heading text-xl font-bold mb-4">Premium Resource</h2>
            <p className="mb-6">Unlock the complete SDR training program with 5 specialized modules and assessment tools.</p>
            
            <div className="mb-6">
              <div className="text-3xl font-bold mb-1">$99</div>
              <p className="text-neutral-medium">One-time purchase, team-wide access</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium">This program is perfect for:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center mr-2 mt-0.5">✓</span>
                  <span>New SDR teams looking for structured training</span>
                </li>
                <li className="flex items-start">
                  <span className="w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center mr-2 mt-0.5">✓</span>
                  <span>Experienced teams wanting to improve results</span>
                </li>
                <li className="flex items-start">
                  <span className="w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center mr-2 mt-0.5">✓</span>
                  <span>Sales leaders implementing new outreach strategies</span>
                </li>
              </ul>
            </div>
            
            <Button className="w-full mt-6" onClick={() => setPurchased(true)}>
              Purchase Now
            </Button>
            
            <p className="text-xs text-center mt-4 text-neutral-medium">
              Secure payment processing • Immediate access • 30-day guarantee
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Main training interface (after purchase)
  return (
    <div className="p-6 md:p-10">
      {renderPurchaseDialog()}
      
      <div className="mb-8">
        <Button variant="ghost" className="text-accent hover:text-accent-dark transition-colors" onClick={onClose}>
          &larr; Back to Resources
        </Button>
        <h1 className="font-heading text-3xl font-bold text-primary mt-4 mb-2">
          SDR Team Training Program
        </h1>
        <p className="text-neutral-medium">
          Complete training system for SDR teams applying Stoic principles to sales outreach
        </p>
      </div>
      
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium">Your Progress</span>
          <span className="text-sm font-medium">{completedSections} of {sections.length} modules</span>
        </div>
        <Progress value={progressPercentage} className="h-2 bg-neutral-light" />
      </div>
      
      {/* Content area */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map(section => (
            <Card key={section.id} className={`${section.completed ? 'border-accent' : ''}`}>
              <CardHeader>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${section.completed ? 'bg-accent text-white' : 'bg-neutral-light'}`}>
                    {section.completed ? '✓' : section.id}
                  </div>
                  <CardTitle>{section.title}</CardTitle>
                </div>
                <CardDescription>
                  {section.title === "Email Messaging" && "Strategies for effective cold emails"}
                  {section.title === "LinkedIn Messaging" && "Best practices for LinkedIn outreach"}
                  {section.title === "Handling Resistance" && "Techniques for addressing prospect hesitation"}
                  {section.title === "Call Openers" && "Effective ways to start prospecting calls"}
                  {section.title === "Ghosting & Follow-ups" && "Frameworks for re-engaging prospects"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center mb-4">
                  <div className="w-4 h-4 mr-2">
                    {section.completed ? 
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-accent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6L9 17l-5-5" />
                      </svg> : 
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-neutral-medium" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4M12 8h.01" />
                      </svg>
                    }
                  </div>
                  <span className={`text-sm ${section.completed ? 'text-accent' : 'text-neutral-medium'}`}>
                    {section.completed ? 'Module completed' : 'Not started'}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  variant={section.completed ? "outline" : "default"}
                  onClick={() => handleStartSection(section)}
                  className="w-full"
                >
                  {section.completed ? 'Review Module' : 'Start Module'}
                </Button>
              </CardFooter>
            </Card>
          ))}
          
          {/* Final Assessment Card */}
          <Card className={`${completedSections === sections.length ? '' : 'opacity-50'}`}>
            <CardHeader>
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3">
                  F
                </div>
                <CardTitle>Final Assessment</CardTitle>
              </div>
              <CardDescription>
                Comprehensive test covering all modules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-medium mb-4">
                Complete all modules to unlock the final assessment and earn your certification.
              </p>
              <div className="flex items-center">
                <div className="w-4 h-4 mr-2">
                  {completedSections === sections.length ? 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-accent" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="M8 12l3 3 5-5" />
                    </svg> : 
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-neutral-medium" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                  }
                </div>
                <span className="text-sm text-neutral-medium">
                  {completedSections === sections.length ? 'Available' : 'Locked'}
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                disabled={completedSections !== sections.length}
                onClick={handleFinalAssessment}
                className="w-full"
              >
                Take Final Assessment
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
      
      {/* Section content view */}
      {activeTab === "section" && currentSection && (
        <div>
          <div className="mb-6">
            <h2 className="font-heading text-2xl font-bold">
              {currentSection.title}
            </h2>
            <div className="flex items-center mt-2">
              <span className="text-sm text-neutral-medium">Module {currentSection.id} of {sections.length}</span>
              {currentSection.completed && (
                <span className="ml-4 inline-flex items-center text-sm text-accent">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  Completed
                </span>
              )}
            </div>
          </div>
          
          <Tabs defaultValue="content" className="mb-6">
            <TabsList>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="assessment">Assessment</TabsTrigger>
            </TabsList>
            
            <TabsContent value="content" className="min-h-[60vh]">
              <Card>
                <CardContent className="pt-6">
                  <div className="prose max-w-none">
                    {currentSection.content.split('\n').map((line, index) => {
                      if (line.startsWith('# ')) {
                        return <h1 key={index} className="text-2xl font-bold mt-6 mb-4">{line.substring(2)}</h1>;
                      } else if (line.startsWith('## ')) {
                        return <h2 key={index} className="text-xl font-bold mt-5 mb-3">{line.substring(3)}</h2>;
                      } else if (line.startsWith('### ')) {
                        return <h3 key={index} className="text-lg font-bold mt-4 mb-2">{line.substring(4)}</h3>;
                      } else if (line.startsWith('- ')) {
                        return <li key={index} className="ml-4">{line.substring(2)}</li>;
                      } else if (line.startsWith('**')) {
                        return <p key={index} className="font-bold">{line.replace(/\*\*/g, '')}</p>;
                      } else if (line.trim() === '') {
                        return <div key={index} className="h-3"></div>;
                      } else {
                        return <p key={index}>{line}</p>;
                      }
                    })}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setActiveTab("overview")}>
                    Back to Modules
                  </Button>
                  <Button onClick={() => handleStartTest()}>
                    Take Assessment
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="assessment" className="min-h-[60vh]">
              <Card>
                <CardContent className="pt-6">
                  {testActive ? (
                    <>
                      {testResults ? (
                        <div className="text-center py-8">
                          <div className={`text-6xl font-bold mb-4 ${testResults.passed ? 'text-green-500' : 'text-red-500'}`}>
                            {testResults.correct} / {testResults.total}
                          </div>
                          <h3 className="text-2xl font-bold mb-2">
                            {testResults.passed ? 'Assessment Passed!' : 'Assessment Not Passed'}
                          </h3>
                          <p className="mb-6">
                            {testResults.passed 
                              ? 'Great job! You've successfully completed this module.' 
                              : 'Review the material and try again.'}
                          </p>
                          <div className="flex justify-center space-x-4">
                            {!testResults.passed && (
                              <Button variant="outline" onClick={() => handleStartTest()}>
                                Try Again
                              </Button>
                            )}
                            <Button onClick={handleFinishSection}>
                              {testResults.passed ? 'Complete Module' : 'Review Module'}
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between mb-6">
                            <h3 className="text-xl font-bold">Question {currentQuestionIndex + 1} of {currentSection.questions.length}</h3>
                            <span className="text-neutral-medium">Module {currentSection.id} Assessment</span>
                          </div>
                          
                          {renderQuestion(currentSection.questions[currentQuestionIndex])}
                          
                          <div className="mt-8 flex justify-end">
                            <Button onClick={handleNextQuestion}>
                              {currentQuestionIndex < currentSection.questions.length - 1 ? 'Next Question' : 'Submit Answers'}
                            </Button>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <h3 className="text-xl font-bold mb-4">Module Assessment</h3>
                      <p className="mb-6">Ready to test your knowledge on {currentSection.title}?</p>
                      <p className="text-neutral-medium mb-8">
                        This assessment contains multiple choice, true/false, and open-ended questions.
                        You need to score at least 70% to pass.
                      </p>
                      <Button onClick={handleStartTest}>
                        Start Assessment
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
      
      {/* Final assessment view */}
      {activeTab === "final-assessment" && (
        <div>
          <div className="mb-6">
            <h2 className="font-heading text-2xl font-bold">
              Final Assessment
            </h2>
            <p className="text-neutral-medium">
              Comprehensive test covering all SDR training modules
            </p>
          </div>
          
          <Card>
            <CardContent className="pt-6">
              {testResults ? (
                <div className="text-center py-8">
                  <div className={`text-6xl font-bold mb-4 ${testResults.passed ? 'text-green-500' : 'text-red-500'}`}>
                    {testResults.correct} / {testResults.total}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">
                    {testResults.passed ? 'Certification Complete!' : 'Assessment Not Passed'}
                  </h3>
                  <p className="mb-6">
                    {testResults.passed 
                      ? 'Congratulations! You've successfully completed the SDR training program.' 
                      : 'Review the modules and try again.'}
                  </p>
                  
                  {testResults.passed && (
                    <div className="bg-neutral-lightest p-6 rounded-lg mb-6 inline-block">
                      <h4 className="font-bold text-lg mb-2">SDR Training Certification</h4>
                      <p className="text-neutral-medium mb-4">
                        This certifies that you have successfully completed the Stoic Seller SDR Training Program.
                      </p>
                      <Button>
                        Download Certificate
                      </Button>
                    </div>
                  )}
                  
                  <div className="flex justify-center">
                    {!testResults.passed ? (
                      <Button variant="outline" onClick={() => handleFinalAssessment()}>
                        Try Again
                      </Button>
                    ) : (
                      <Button variant="outline" onClick={() => setActiveTab("overview")}>
                        Return to Modules
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between mb-6">
                    <h3 className="text-xl font-bold">Question {currentQuestionIndex + 1} of {finalAssessment.length}</h3>
                    <span className="text-neutral-medium">Final Assessment</span>
                  </div>
                  
                  {renderQuestion(finalAssessment[currentQuestionIndex])}
                  
                  <div className="mt-8 flex justify-end">
                    {currentQuestionIndex < finalAssessment.length - 1 ? (
                      <Button onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}>
                        Next Question
                      </Button>
                    ) : (
                      <Button onClick={handleFinalAssessmentSubmit}>
                        Submit Final Assessment
                      </Button>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default SDRTeamTraining;