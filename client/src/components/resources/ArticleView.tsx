import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";

interface ArticleViewProps {
  articleId: string;
  onClose: () => void;
}

const ArticleView: React.FC<ArticleViewProps> = ({ articleId, onClose }) => {
  const articles = {
    "linkedin-group": {
      title: "The Stoic Seller LinkedIn Group",
      author: "The Stoic Seller Team",
      date: "May 17, 2025",
      content: `
        <h2>Join Our LinkedIn Community</h2>
        
        <p>We're excited to announce the launch of "The Stoic Seller" LinkedIn Group - a dedicated space for sales professionals interested in applying Stoic philosophy to their daily practice.</p>
        
        <h3>What to Expect</h3>
        
        <ul>
          <li><strong>Weekly Content:</strong> Every Monday, we post new content exploring how specific Stoic principles apply to common sales scenarios</li>
          <li><strong>Interactive Discussions:</strong> Sales professionals from around the world share their experiences applying philosophical principles to client interactions</li>
          <li><strong>Expert Q&As:</strong> Monthly live sessions with authors, philosophers, and top sales leaders who incorporate Stoicism into their approach</li>
          <li><strong>Resource Sharing:</strong> Members share articles, books, podcasts, and other resources that have helped them develop philosophical resilience</li>
        </ul>
        
        <h3>Upcoming Weekly Topics</h3>
        
        <ul>
          <li>Week 1: "The Dichotomy of Control in Prospecting" - Focus your energy where it matters most</li>
          <li>Week 2: "Negative Visualization for Objection Handling" - Prepare for difficult conversations</li>
          <li>Week 3: "Stoic Responses to Rejection" - Maintaining equanimity when deals fall through</li>
          <li>Week 4: "Virtue Ethics in Sales Negotiations" - Win with integrity</li>
        </ul>
        
        <h3>How to Join</h3>
        
        <p>Our LinkedIn group is free to join for all sales professionals interested in philosophical approaches to sales excellence.</p>
        
        <p>To join:</p>
        <ol>
          <li>Visit <a href="https://www.linkedin.com/groups/stoicseller" target="_blank">linkedin.com/groups/stoicseller</a></li>
          <li>Click "Request to join"</li>
          <li>Answer a quick question about why you're interested in Stoicism and sales</li>
        </ol>
        
        <p>We review and approve new members daily. Once approved, introduce yourself to the community and join the conversation!</p>
      `
    },
    "stoic-seller-article": {
      title: "The Stoic Seller: Applying Ancient Wisdom to Modern Sales",
      author: "The Stoic Seller Team",
      date: "May 16, 2025",
      content: `
        <h2>Introduction: Why Stoicism Matters for Sales Professionals</h2>
        
        <p>In the high-pressure world of sales, professionals often face rejection, uncertainty, and challenging targets. These conditions can create stress, anxiety, and burnout - all enemies of sustainable performance. This is where the ancient philosophy of Stoicism offers a powerful framework for not just surviving in sales, but thriving.</p>
        
        <p>Stoicism isn't about suppressing emotions or maintaining a cold exterior. Rather, it's a practical philosophy that focuses on developing inner resilience and virtue through wisdom, courage, justice, and temperance. For sales professionals, these principles provide a foundation for maintaining effectiveness regardless of external circumstances.</p>
        
        <h2>The Four Stoic Virtues in Sales</h2>
        
        <h3>1. Wisdom (Sophia) - Making Better Sales Decisions</h3>
        
        <p>Stoic wisdom involves seeing things clearly and making good decisions based on that clarity. In sales, this means:</p>
        
        <ul>
          <li><strong>Understanding true value:</strong> Recognizing the genuine benefits your product or service offers customers, not just focusing on quotas or commissions.</li>
          <li><strong>Qualifying prospects effectively:</strong> Using discernment to identify which opportunities are worth pursuing based on actual need and fit, not just potential commission.</li>
          <li><strong>Learning from every interaction:</strong> Treating each sales conversation as a learning opportunity, regardless of outcome.</li>
        </ul>
        
        <blockquote>"We suffer more often in imagination than in reality." - Seneca</blockquote>
        
        <p>This Stoic insight reminds us that many sales anxieties come from catastrophizing outcomes. Wisdom helps us separate fact from fiction in our thinking.</p>
        
        <h3>2. Courage (Andreia) - Resilience in the Face of Rejection</h3>
        
        <p>Courage is not the absence of fear but acting virtuously despite it. For sales professionals, this virtue manifests as:</p>
        
        <ul>
          <li><strong>Embracing cold outreach:</strong> Making those difficult calls or sending those challenging emails despite discomfort.</li>
          <li><strong>Handling rejection constructively:</strong> Viewing "no" as information rather than personal failure.</li>
          <li><strong>Addressing objections directly:</strong> Confronting difficult conversations rather than avoiding them.</li>
        </ul>
        
        <blockquote>"If you are distressed by anything external, the pain is not due to the thing itself, but to your estimate of it; and this you have the power to revoke at any moment." - Marcus Aurelius</blockquote>
        
        <p>This reminds us that rejection in sales is neutral - our interpretation makes it painful or instructive.</p>
        
        <h3>3. Justice (Dikaiosyne) - Ethical Sales Practices</h3>
        
        <p>Justice in Stoicism relates to fairness and integrity in dealings with others. In sales, this includes:</p>
        
        <ul>
          <li><strong>Honest representation:</strong> Portraying products and services truthfully, without exaggeration.</li>
          <li><strong>Customer-centric focus:</strong> Prioritizing client needs over immediate commission.</li>
          <li><strong>Keeping commitments:</strong> Following through on promises made during the sales process.</li>
        </ul>
        
        <blockquote>"How much more grievous are the consequences of anger than the causes of it." - Marcus Aurelius</blockquote>
        
        <p>This reminds sales professionals that pressuring customers or using manipulative tactics for short-term gain undermines long-term success.</p>
        
        <h3>4. Temperance (Sophrosyne) - Balance and Self-Control</h3>
        
        <p>Temperance involves moderation and self-discipline. For sales professionals:</p>
        
        <ul>
          <li><strong>Consistent prospecting:</strong> Maintaining regular outreach rather than boom-and-bust cycles.</li>
          <li><strong>Emotional stability:</strong> Not becoming overconfident with success or dejected with failure.</li>
          <li><strong>Work-life balance:</strong> Setting boundaries to prevent burnout and maintain sustainable performance.</li>
        </ul>
        
        <blockquote>"He who is not contented with what he has, would not be contented with what he would like to have." - Socrates</blockquote>
        
        <p>This reminds us that constantly chasing the next big deal without appreciation for current achievements leads to dissatisfaction.</p>
        
        <h2>Practical Stoic Techniques for Sales Professionals</h2>
        
        <h3>1. The Dichotomy of Control</h3>
        
        <p>Epictetus taught that some things are within our control while others are not. Sales professionals can apply this by:</p>
        
        <ul>
          <li><strong>What you control:</strong> Your preparation, your follow-up, your attitude, your knowledge of the product</li>
          <li><strong>What you don't control:</strong> Whether someone buys, budget constraints, competitor actions, market conditions</li>
        </ul>
        
        <p>Focusing energy exclusively on what you can control reduces anxiety and improves effectiveness.</p>
        
        <h3>2. Negative Visualization (Premeditatio Malorum)</h3>
        
        <p>This Stoic practice involves imagining potential negative outcomes in advance. For sales:</p>
        
        <ul>
          <li>Mentally rehearsing tough objections and preparing responses</li>
          <li>Considering what you'll do if you miss targets</li>
          <li>Planning how to handle lost deals constructively</li>
        </ul>
        
        <p>This practice reduces the shock of setbacks and improves adaptability.</p>
        
        <h3>3. The View From Above</h3>
        
        <p>This technique involves taking a broader perspective. In sales:</p>
        
        <ul>
          <li>Seeing individual rejections as small parts of a larger career journey</li>
          <li>Understanding that one customer's reaction doesn't define your professional worth</li>
          <li>Maintaining perspective about the relative importance of work challenges</li>
        </ul>
        
        <h2>Conclusion: The Stoic Advantage in Sales</h2>
        
        <p>By embracing Stoic principles, sales professionals gain several distinct advantages:</p>
        
        <ul>
          <li><strong>Resilience:</strong> Bouncing back quickly from rejection and setbacks</li>
          <li><strong>Consistency:</strong> Maintaining steady performance regardless of external conditions</li>
          <li><strong>Authenticity:</strong> Building genuine connections based on value rather than manipulation</li>
          <li><strong>Sustainability:</strong> Avoiding burnout through emotional regulation and proper perspective</li>
        </ul>
        
        <p>In a profession where mental toughness and ethical conduct are increasingly valued, the ancient wisdom of Stoicism provides a timeless framework for sales excellence that benefits both the professional and their customers.</p>
      `
    },
    "rejection-resilience": {
      title: "Handling Rejection Like a Stoic: A Sales Professional's Guide",
      author: "The Stoic Seller Team",
      date: "May 10, 2025",
      content: `
        <h2>Introduction: The Inevitability of Rejection in Sales</h2>
        
        <p>For sales professionals, rejection isn't just an occasional obstacle—it's a daily reality. Even the most successful salespeople hear "no" far more often than "yes." This constant exposure to rejection can wear down resilience, diminish confidence, and lead to burnout if not properly managed.</p>
        
        <p>Enter Stoicism—an ancient philosophy particularly well-suited to the challenges of sales. As Epictetus taught, "It's not what happens to you, but how you respond to it that matters." This article explores practical Stoic techniques for developing rejection resilience in your sales practice.</p>
        
        <!-- More content would go here -->
        
        <p>This is a preview of the full article. The complete version covers Stoic techniques for reframing rejection, practical exercises, and case studies of successful Stoic-inspired sales professionals.</p>
      `
    },
    "dichotomy-of-control": {
      title: "The Dichotomy of Control in Sales: Focus on What You Can Change",
      author: "The Stoic Seller Team",
      date: "May 5, 2025",
      content: `
        <h2>Introduction: The Sales Professional's Dilemma</h2>
        
        <p>Sales is a profession filled with uncertainty. You can deliver the perfect pitch to a prospect who seems enthusiastic, only to have the deal fall through because of budget cuts. You can work diligently on your territory, only to have a competitor release a game-changing product. This uncertainty is a major source of stress for many sales professionals.</p>
        
        <p>The ancient Stoics developed a powerful mental model for navigating uncertainty: the dichotomy of control. As Epictetus wrote in his Enchiridion: "Some things are within our power, while others are not. Within our power are opinion, motivation, desire, aversion, and, in a word, whatever is of our own doing; not within our power are our body, our property, reputation, office, and, in a word, whatever is not of our own doing."</p>
        
        <!-- More content would go here -->
        
        <p>This is a preview of the full article. The complete version provides a detailed framework for applying the dichotomy of control to common sales scenarios, with practical exercises and implementation strategies.</p>
      `
    }
  };

  const selectedArticle = articles[articleId as keyof typeof articles];

  if (!selectedArticle) {
    return (
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Article Not Found</CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p>Sorry, the requested article could not be found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl mb-2">{selectedArticle.title}</CardTitle>
            <p className="text-sm text-neutral-medium">By {selectedArticle.author} • {selectedArticle.date}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div 
          className="prose prose-stone max-w-none" 
          dangerouslySetInnerHTML={{ __html: selectedArticle.content }} 
        />
      </CardContent>
    </Card>
  );
};

export default ArticleView;