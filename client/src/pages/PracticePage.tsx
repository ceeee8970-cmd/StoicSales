import React from 'react';
import { Link } from 'wouter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MicrophoneIcon, ChallengesIcon } from "@/assets/icons";
import { BookOpen, Target, Clock, Users } from 'lucide-react';

const PracticePage: React.FC = () => {
  const practiceOptions = [
    {
      title: "Sales Call Practice",
      description: "Practice your sales conversations with realistic scenarios and get AI-powered feedback on your approach.",
      icon: <MicrophoneIcon className="w-8 h-8" />,
      path: "/practice/sales-calls",
      duration: "5-10 minutes",
      difficulty: "All levels",
      features: [
        "30-second voice recordings",
        "AI analysis and feedback",
        "Stoic principles application",
        "Performance scoring"
      ]
    },
    {
      title: "Stoic Seller Quiz",
      description: "Test your knowledge of Stoic sales principles with this comprehensive 10-question quiz based on the ebook content.",
      icon: <BookOpen className="w-8 h-8" />,
      path: "/practice/quiz",
      duration: "10-15 minutes",
      difficulty: "All levels",
      features: [
        "10 multiple choice questions",
        "Instant detailed feedback",
        "Mastery level assessment",
        "Review explanations"
      ]
    }
  ];

  return (
    <div className="p-6 md:p-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary mb-4">Practice & Assessment</h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Strengthen your Stoic sales skills through hands-on practice and knowledge assessment. 
          Choose from interactive scenarios or test your understanding of core principles.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {practiceOptions.map((option, index) => (
          <Card key={index} className="h-full">
            <CardHeader>
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  {option.icon}
                </div>
                <div>
                  <CardTitle className="text-xl">{option.title}</CardTitle>
                  <div className="flex space-x-4 text-sm text-gray-600 mt-1">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{option.duration}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Target className="w-4 h-4" />
                      <span>{option.difficulty}</span>
                    </span>
                  </div>
                </div>
              </div>
              <CardDescription className="text-base">
                {option.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Features:</h4>
                <ul className="space-y-1">
                  {option.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-4">
                <Link href={option.path}>
                  <Button className="w-full">
                    Start Practice
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <CardTitle className="text-lg text-blue-800">Practice Regularly</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-700 text-center">
              Consistent practice builds muscle memory and confidence in applying Stoic principles.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-lg text-green-800">Focus on Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-700 text-center">
              Use feedback to identify areas for improvement and track your progress over time.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="text-center">
            <div className="mx-auto mb-2">
              <BookOpen className="w-8 h-8 text-purple-600" />
            </div>
            <CardTitle className="text-lg text-purple-800">Apply Learning</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-purple-700 text-center">
              Bridge the gap between theory and practice by applying what you've learned in real situations.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PracticePage;