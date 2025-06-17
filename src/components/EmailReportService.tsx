import React, { useState } from 'react';
import { Mail, Calendar, TrendingUp, Award, Clock, Send, CheckCircle } from 'lucide-react';

interface EmailReport {
  type: 'weekly' | 'achievement' | 'concern' | 'milestone';
  recipient: string;
  childName: string;
  subject: string;
  content: string;
  data: any;
}

export class EmailReportService {
  private static instance: EmailReportService;

  public static getInstance(): EmailReportService {
    if (!EmailReportService.instance) {
      EmailReportService.instance = new EmailReportService();
    }
    return EmailReportService.instance;
  }

  // Generate weekly summary email
  generateWeeklyReport(childName: string, weeklyData: any): EmailReport {
    const subject = `${childName}'s Week in Review - ${weeklyData.topicsCompleted} topics completed`;
    
    const content = `
Dear Parent/Guardian,

Here's ${childName}'s learning summary for this week:

📊 WEEKLY HIGHLIGHTS
• Questions Completed: ${weeklyData.questionsThisWeek}
• Time Spent Learning: ${weeklyData.timeThisWeek} minutes
• Topics Mastered: ${weeklyData.topicsCompleted}
• Average Score: ${weeklyData.averageScore}%
• Current Streak: ${weeklyData.streakDays} days

🎯 CURRICULUM PROGRESS
${weeklyData.strandProgress.map((strand: any) => 
  `• ${strand.name}: ${strand.progress}% complete`
).join('\n')}

🌟 ACHIEVEMENTS THIS WEEK
${weeklyData.achievements.length > 0 
  ? weeklyData.achievements.map((achievement: string) => `• ${achievement}`).join('\n')
  : '• Keep practicing to unlock new achievements!'
}

📈 NEXT WEEK'S FOCUS
• Continue building on ${weeklyData.strongestStrand}
• Extra practice recommended for ${weeklyData.weakestStrand}
• Goal: ${weeklyData.nextWeekGoal} questions

🇦🇺 Australian Curriculum v9.0 Aligned
All activities align with official Year 7 Mathematics standards.

Keep up the great work!

Your AI Tutor Team
    `;

    return {
      type: 'weekly',
      recipient: 'parent@example.com',
      childName,
      subject,
      content,
      data: weeklyData
    };
  }

  // Generate achievement alert email
  generateAchievementAlert(childName: string, achievement: string): EmailReport {
    const subject = `🎉 ${childName} just ${achievement}!`;
    
    const content = `
Dear Parent/Guardian,

Exciting news! ${childName} has achieved a new milestone:

🏆 ${achievement}

This achievement shows ${childName}'s dedication to learning and consistent practice. 
Achievements like this help build confidence and motivation for continued learning.

🎯 WHAT THIS MEANS
• ${childName} is making excellent progress in Year 7 Mathematics
• Consistent practice is paying off
• Ready for more challenging topics

💡 HOW TO CELEBRATE
• Acknowledge their hard work and dedication
• Encourage them to share what they've learned
• Consider setting a new learning goal together

Keep encouraging ${childName}'s learning journey!

Your AI Tutor Team
    `;

    return {
      type: 'achievement',
      recipient: 'parent@example.com',
      childName,
      subject,
      content,
      data: { achievement }
    };
  }

  // Generate concern flag email
  generateConcernAlert(childName: string, concern: string, daysInactive: number): EmailReport {
    const subject = `Learning Check-in: ${childName} needs encouragement`;
    
    const content = `
Dear Parent/Guardian,

We wanted to reach out regarding ${childName}'s recent learning activity.

⚠️ CONCERN: ${concern}

${childName} hasn't practiced in ${daysInactive} days. Consistent practice is key to 
maintaining momentum and building confidence in mathematics.

💡 GENTLE SUGGESTIONS
• Ask ${childName} about their favorite math topics
• Suggest a quick 10-minute practice session
• Remind them of their recent achievements
• Offer to practice together for a few minutes

🎯 GETTING BACK ON TRACK
• Start with easier topics to rebuild confidence
• Set small, achievable daily goals
• Celebrate small wins to rebuild motivation

We're here to support ${childName}'s learning journey. If you have any concerns, 
please don't hesitate to reach out.

Your AI Tutor Team
    `;

    return {
      type: 'concern',
      recipient: 'parent@example.com',
      childName,
      subject,
      content,
      data: { concern, daysInactive }
    };
  }

  // Generate milestone celebration email
  generateMilestoneAlert(childName: string, milestone: string, totalQuestions: number): EmailReport {
    const subject = `🎊 Milestone Celebration: ${childName} - ${milestone}!`;
    
    const content = `
Dear Parent/Guardian,

What an incredible achievement! ${childName} has reached a major milestone:

🎊 ${milestone}

With ${totalQuestions} questions completed, ${childName} has shown remarkable 
dedication to learning Year 7 Mathematics.

📊 IMPRESSIVE STATS
• Total Questions: ${totalQuestions}
• Curriculum Coverage: Excellent progress across all strands
• Learning Consistency: Building strong study habits
• Problem-Solving Skills: Continuously improving

🎯 WHAT'S NEXT
• Ready for more advanced topics
• Building toward Year 8 readiness
• Developing strong mathematical foundations

🏆 CELEBRATION IDEAS
• Share this achievement with family
• Consider a special reward for their hard work
• Encourage them to help others with their learning

${childName} should be very proud of this accomplishment!

Your AI Tutor Team
    `;

    return {
      type: 'milestone',
      recipient: 'parent@example.com',
      childName,
      subject,
      content,
      data: { milestone, totalQuestions }
    };
  }

  // Send email (mock implementation)
  async sendEmail(report: EmailReport): Promise<boolean> {
    try {
      // In a real implementation, this would integrate with an email service
      console.log('Sending email:', report);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Log email for demo purposes
      this.logEmailSent(report);
      
      return true;
    } catch (error) {
      console.error('Failed to send email:', error);
      return false;
    }
  }

  private logEmailSent(report: EmailReport) {
    const emailLog = {
      timestamp: new Date(),
      type: report.type,
      recipient: report.recipient,
      subject: report.subject,
      sent: true
    };
    
    // Store in localStorage for demo
    const existingLogs = JSON.parse(localStorage.getItem('emailLogs') || '[]');
    existingLogs.push(emailLog);
    localStorage.setItem('emailLogs', JSON.stringify(existingLogs));
  }

  // Get email history
  getEmailHistory(): any[] {
    return JSON.parse(localStorage.getItem('emailLogs') || '[]');
  }
}

// Email Preview Component
interface EmailPreviewProps {
  report: EmailReport;
  onSend: () => void;
  onClose: () => void;
}

export const EmailPreview: React.FC<EmailPreviewProps> = ({ report, onSend, onClose }) => {
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async () => {
    setIsSending(true);
    const success = await EmailReportService.getInstance().sendEmail(report);
    setIsSending(false);
    
    if (success) {
      setSent(true);
      setTimeout(() => {
        onSend();
        onClose();
      }, 2000);
    }
  };

  const getTypeIcon = () => {
    switch (report.type) {
      case 'weekly': return <Calendar className="h-5 w-5 text-blue-600" />;
      case 'achievement': return <Award className="h-5 w-5 text-yellow-600" />;
      case 'concern': return <Clock className="h-5 w-5 text-orange-600" />;
      case 'milestone': return <TrendingUp className="h-5 w-5 text-green-600" />;
    }
  };

  const getTypeColor = () => {
    switch (report.type) {
      case 'weekly': return 'bg-blue-50 border-blue-200';
      case 'achievement': return 'bg-yellow-50 border-yellow-200';
      case 'concern': return 'bg-orange-50 border-orange-200';
      case 'milestone': return 'bg-green-50 border-green-200';
    }
  };

  if (sent) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Email Sent!</h3>
          <p className="text-gray-600">
            The report has been sent to the parent's email address.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className={`${getTypeColor()} p-6 border-b`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getTypeIcon()}
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Email Preview</h3>
                <p className="text-sm text-gray-600 capitalize">{report.type} Report</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              ×
            </button>
          </div>
        </div>

        {/* Email Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">To:</label>
              <div className="text-gray-900">{report.recipient}</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subject:</label>
              <div className="text-gray-900 font-medium">{report.subject}</div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message:</label>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans">
                  {report.content}
                </pre>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-gray-200 flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={isSending}
            className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center space-x-2"
          >
            {isSending ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Send Email</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};