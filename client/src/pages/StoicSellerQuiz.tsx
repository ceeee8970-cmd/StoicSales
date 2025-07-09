import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Award, BookOpen, Target } from "lucide-react";

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  principle: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "According to Stoic philosophy, what should a salesperson focus on during a difficult conversation?",
    options: [
      "Convincing the prospect at all costs",
      "What they can control: their effort, attitude, and clarity",
      "The prospect's budget and timeline",
      "Closing the deal quickly"
    ],
    correctAnswer: 1,
    explanation: "The Dichotomy of Control teaches us to focus energy on what we can influence: our preparation, presence, and response.",
    principle: "Dichotomy of Control"
  },
  {
    id: 2,
    question: "What is Premeditatio Malorum in sales?",
    options: [
      "Negative thinking about prospects",
      "Avoiding difficult conversations",
      "Mentally rehearsing potential obstacles to build resilience",
      "Planning aggressive sales tactics"
    ],
    correctAnswer: 2,
    explanation: "Premeditatio Malorum means preparing for challenges in advance to maintain composure and reduce surprise.",
    principle: "Premeditatio Malorum"
  },
  {
    id: 3,
    question: "When a prospect ghosts you, what does Amor Fati teach you to do?",
    options: [
      "Follow up aggressively until they respond",
      "Take it personally and feel rejected",
      "Accept the silence as part of the process and send one honest, pressure-free message",
      "Immediately move on to the next prospect"
    ],
    correctAnswer: 2,
    explanation: "Amor Fati means loving fate - accepting outcomes as learning opportunities and responding with grace.",
    principle: "Amor Fati"
  },
  {
    id: 4,
    question: "What does Memento Mori remind the Stoic Seller about time?",
    options: [
      "To rush every conversation",
      "That time is finite and should be used meaningfully and respectfully",
      "To pressure prospects into quick decisions",
      "To fill every moment with selling activities"
    ],
    correctAnswer: 1,
    explanation: "Memento Mori reminds us that time is sacred - both ours and our prospects' - leading to more intentional interactions.",
    principle: "Memento Mori"
  },
  {
    id: 5,
    question: "In human-centered sales, what should you do instead of assuming what a prospect needs?",
    options: [
      "Present your best features immediately",
      "Ask genuine questions from curiosity, not to qualify",
      "Share case studies from similar companies",
      "Focus on price and timeline"
    ],
    correctAnswer: 1,
    explanation: "Curiosity over assumption builds trust and understanding. Ask real questions to truly understand their situation.",
    principle: "Ask, Don't Assume"
  },
  {
    id: 6,
    question: "What is the purpose of mirroring a prospect's language?",
    options: [
      "To manipulate them into buying",
      "To show you're listening and confirm understanding",
      "To sound more professional",
      "To control the conversation"
    ],
    correctAnswer: 1,
    explanation: "Mirroring their words shows you've heard them and creates a sense of being understood, which builds trust.",
    principle: "Mirror Their Words"
  },
  {
    id: 7,
    question: "How should a Stoic Seller approach urgency in sales?",
    options: [
      "Create artificial urgency with time pressure",
      "Always push for immediate decisions",
      "Create calm environments where trust can emerge",
      "Use scarcity tactics to motivate action"
    ],
    correctAnswer: 2,
    explanation: "Calm environments allow for better decision-making and deeper trust, leading to more aligned outcomes.",
    principle: "Create Calm, Not Urgency"
  },
  {
    id: 8,
    question: "What does 'closing with alignment' mean?",
    options: [
      "Using pressure tactics to get a yes",
      "Ensuring the decision feels mutual and comfortable for both parties",
      "Focusing only on features and benefits",
      "Asking for the sale multiple times"
    ],
    correctAnswer: 1,
    explanation: "Alignment means both parties feel good about the decision. A 'yes' should come with clarity and energy, not obligation.",
    principle: "Close with Alignment"
  },
  {
    id: 9,
    question: "According to the Stoic Seller approach, what should you prioritize in your language?",
    options: [
      "Industry jargon to sound professional",
      "Clever wordplay and sales techniques",
      "Clarity and simplicity over cleverness",
      "Complex explanations to show expertise"
    ],
    correctAnswer: 2,
    explanation: "Clear, simple language serves the message and the relationship. Avoid jargon that creates distance.",
    principle: "Clarity Over Cleverness"
  },
  {
    id: 10,
    question: "What is the fundamental reframe of the Stoic Seller approach?",
    options: [
      "Sales as persuasion and winning",
      "Sales as service and helping others make good decisions",
      "Sales as a numbers game",
      "Sales as competitive strategy"
    ],
    correctAnswer: 1,
    explanation: "The Stoic Seller sees sales as service - helping others make decisions that benefit them, even if that decision is 'no'.",
    principle: "Service Over Persuasion"
  }
];

const StoicSellerQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    QUIZ_QUESTIONS.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const getScoreInterpretation = (score: number) => {
    if (score >= 9) {
      return {
        title: "🏆 Master Stoic Seller",
        description: "Exceptional! You've mastered the Stoic Seller principles. You understand the philosophy deeply and can apply it effectively in sales situations.",
        color: "text-green-600",
        bgColor: "bg-green-50"
      };
    } else if (score >= 7) {
      return {
        title: "🎯 Skilled Stoic Seller",
        description: "Great work! You have a solid understanding of Stoic sales principles. Continue practicing to deepen your mastery.",
        color: "text-blue-600",
        bgColor: "bg-blue-50"
      };
    } else if (score >= 5) {
      return {
        title: "📚 Developing Stoic Seller",
        description: "Good foundation! You're on the right track. Review the ebook content and practice applying the principles in your daily sales work.",
        color: "text-yellow-600",
        bgColor: "bg-yellow-50"
      };
    } else {
      return {
        title: "🌱 Beginning Stoic Seller",
        description: "This is your starting point! Review the ebook carefully and focus on understanding the core principles. Growth comes through practice.",
        color: "text-orange-600",
        bgColor: "bg-orange-50"
      };
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizStarted(false);
  };

  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100;

  if (!quizStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold text-primary">
              The Stoic Seller Mastery Quiz
            </CardTitle>
            <CardDescription className="text-lg">
              Test your understanding of Stoic sales principles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Target className="w-6 h-6 text-primary" />
                <div>
                  <div className="font-semibold">10 Questions</div>
                  <div className="text-sm text-gray-600">Multiple choice</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <BookOpen className="w-6 h-6 text-primary" />
                <div>
                  <div className="font-semibold">Ebook Based</div>
                  <div className="text-sm text-gray-600">Core principles</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <Award className="w-6 h-6 text-primary" />
                <div>
                  <div className="font-semibold">Mastery Level</div>
                  <div className="text-sm text-gray-600">Instant results</div>
                </div>
              </div>
            </div>
            
            <div className="text-center space-y-4">
              <p className="text-gray-600 max-w-2xl mx-auto">
                This quiz will test your understanding of the key Stoic principles applied to sales. 
                Each question is based on content from The Stoic Seller ebook and will help you 
                assess your mastery of this philosophical approach to selling.
              </p>
              
              <Button 
                onClick={() => setQuizStarted(true)}
                size="lg"
                className="px-8"
              >
                Start Quiz
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    const interpretation = getScoreInterpretation(score);
    
    return (
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold">Quiz Results</CardTitle>
            <CardDescription>Your Stoic Seller mastery level</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-6xl font-bold text-primary mb-2">
                {score}/10
              </div>
              <div className={`text-xl font-semibold ${interpretation.color}`}>
                {interpretation.title}
              </div>
            </div>
            
            <div className={`p-6 rounded-lg ${interpretation.bgColor}`}>
              <p className="text-center text-lg">{interpretation.description}</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Review Your Answers</h3>
              {QUIZ_QUESTIONS.map((question, index) => (
                <div key={question.id} className="border rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    {selectedAnswers[index] === question.correctAnswer ? (
                      <CheckCircle className="w-5 h-5 text-green-600 mt-1" />
                    ) : (
                      <div className="w-5 h-5 rounded-full bg-red-500 mt-1 flex items-center justify-center">
                        <span className="text-white text-xs">✗</span>
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="font-medium mb-2">{question.question}</div>
                      <div className="text-sm text-gray-600 mb-2">
                        <span className="font-semibold">Your answer:</span> {question.options[selectedAnswers[index]]}
                      </div>
                      {selectedAnswers[index] !== question.correctAnswer && (
                        <div className="text-sm text-gray-600 mb-2">
                          <span className="font-semibold">Correct answer:</span> {question.options[question.correctAnswer]}
                        </div>
                      )}
                      <div className="text-sm text-gray-700 bg-gray-50 p-3 rounded">
                        <span className="font-semibold">Principle:</span> {question.principle}<br />
                        <span className="font-semibold">Explanation:</span> {question.explanation}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center space-x-4">
              <Button onClick={resetQuiz} variant="outline">
                Retake Quiz
              </Button>
              <Button onClick={() => window.location.href = '/practice'}>
                Back to Practice
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const question = QUIZ_QUESTIONS[currentQuestion];
  const isAnswered = selectedAnswers[currentQuestion] !== undefined;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Stoic Seller Quiz</h1>
          <div className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
          </div>
        </div>
        <Progress value={progress} className="w-full" />
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{question.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <RadioGroup 
            value={selectedAnswers[currentQuestion]?.toString()}
            onValueChange={(value) => handleAnswerSelect(parseInt(value))}
          >
            {question.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className="cursor-pointer flex-1">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
          
          <div className="flex justify-between pt-4">
            <Button 
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              variant="outline"
            >
              Previous
            </Button>
            <Button 
              onClick={handleNext}
              disabled={!isAnswered}
            >
              {currentQuestion === QUIZ_QUESTIONS.length - 1 ? 'Finish Quiz' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StoicSellerQuiz;