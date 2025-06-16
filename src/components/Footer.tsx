import React from 'react';
import { GraduationCap, Mail, MessageCircle, Info, HelpCircle, Star } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <GraduationCap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Your AI Tutor
                </h3>
                <p className="text-gray-400">Multi-subject learning companion</p>
              </div>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Empowering students with AI-powered step-by-step explanations across multiple subjects. 
              Learn concepts, not just answers.
            </p>
            <p className="text-sm text-gray-400">
              Designed for students grades 7-12 • Available 24/7 • Trusted by thousands
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Learn More</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center space-x-2 group"
                >
                  <Info className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>About Us</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center space-x-2 group"
                >
                  <HelpCircle className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>FAQ</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('testimonials')}
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center space-x-2 group"
                >
                  <Star className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>Testimonials</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Get in Touch</h4>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center space-x-2 group"
                >
                  <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>Contact Us</span>
                </button>
              </li>
              <li>
                <a
                  href="mailto:zeyad.sweidan@itaura.com.au"
                  className="text-gray-300 hover:text-blue-400 transition-colors flex items-center space-x-2 group"
                >
                  <MessageCircle className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span>Support</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} Your AI Tutor. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">Made with ❤️ for students worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};