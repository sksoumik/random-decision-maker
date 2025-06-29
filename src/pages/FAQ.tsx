import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    category: "General Usage",
    question: "What is Decision Spinner and how does it work?",
    answer: "Decision Spinner is a free online tool that helps you make random choices by spinning a virtual wheel. Simply add your options, click spin, and let the wheel decide for you. It uses advanced random algorithms to ensure fair and unbiased results every time."
  },
  {
    category: "General Usage", 
    question: "Is Decision Spinner really free to use?",
    answer: "Yes! Decision Spinner is completely free with no hidden costs, subscriptions, or premium features. You can use it unlimited times without any restrictions."
  },
  {
    category: "General Usage",
    question: "Do I need to create an account or sign up?",
    answer: "No account needed! Decision Spinner works instantly without any registration. Just visit the site and start adding your options right away."
  },
  {
    category: "Technical",
    question: "How random are the results?",
    answer: "Our decision wheel uses cryptographically secure random number generation (Math.random() with additional entropy) to ensure truly random and fair results. Each option has an exactly equal chance of being selected."
  },
  {
    category: "Technical",
    question: "Does it work on mobile phones and tablets?",
    answer: "Absolutely! Decision Spinner is fully responsive and optimized for all devices including smartphones, tablets, and desktop computers. The wheel spins smoothly on touch devices."
  },
  {
    category: "Technical",
    question: "Can I use it offline?",
    answer: "Decision Spinner requires an internet connection to load initially, but once loaded, it can work with limited connectivity. Your saved options are stored locally in your browser."
  },
  {
    category: "Features",
    question: "How many options can I add to the wheel?",
    answer: "You can add between 2 and 20 options to maintain optimal wheel readability and performance. For best results, we recommend 3-8 options."
  },
  {
    category: "Features",
    question: "Can I edit or remove options after adding them?",
    answer: "Yes! You can easily edit option names by clicking on them, remove individual options, or clear all options to start fresh."
  },
  {
    category: "Features",
    question: "Does it save my options and history?",
    answer: "Your options are automatically saved in your browser's local storage and will be there when you return. You can also view your spin history to see past results."
  },
  {
    category: "Features",
    question: "Can I share my wheel with others?",
    answer: "Currently, Decision Spinner saves options locally to your device. We're working on sharing features for future updates."
  },
  {
    category: "Use Cases",
    question: "What can I use Decision Spinner for?",
    answer: "Perfect for choosing restaurants, movies, picking contest winners, classroom activities, team decisions, travel destinations, workout routines, or any situation where you need to make a random choice."
  },
  {
    category: "Use Cases",
    question: "Is it suitable for contests and giveaways?",
    answer: "Yes! Many users use Decision Spinner for fair contest winner selection, giveaways, and random drawings. The provably random algorithm ensures fairness."
  },
  {
    category: "Use Cases",
    question: "Can teachers use it in classrooms?",
    answer: "Absolutely! Teachers love using Decision Spinner for random student selection, choosing discussion topics, picking team captains, and making classroom activities more engaging."
  },
  {
    category: "Privacy",
    question: "Do you track or store my decisions?",
    answer: "No, we respect your privacy! Your decisions, options, and choices are stored only in your browser's local storage. We don't track, collect, or store any personal decision data on our servers."
  },
  {
    category: "Privacy",
    question: "Is my data secure?",
    answer: "Yes! All your data stays on your device. We use HTTPS encryption and follow web security best practices to protect your browsing experience."
  },
  {
    category: "Troubleshooting",
    question: "The wheel won't spin - what's wrong?",
    answer: "Make sure you have at least 2 options added to the wheel. If the issue persists, try refreshing the page or clearing your browser cache."
  },
  {
    category: "Troubleshooting",
    question: "I lost my saved options - how do I recover them?",
    answer: "Options are saved in your browser's local storage. If you cleared browser data or used incognito mode, the options may be lost. We recommend bookmarking frequently used option sets."
  },
  {
    category: "Troubleshooting",
    question: "The site loads slowly - how can I fix this?",
    answer: "Decision Spinner is optimized for speed. Slow loading may be due to internet connectivity. Try refreshing the page or checking your internet connection."
  }
];

const FAQ: React.FC = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(faqData.map(item => item.category)))];
  
  const filteredFAQ = selectedCategory === 'All' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Decision Spinner
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about using Decision Spinner, 
            our free online random choice maker and decision wheel tool.
          </p>
        </div>

        {/* Category Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Browse by Category:</h2>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQ.map((item, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-800 pr-4">
                  {item.question}
                </h3>
                {openItems.includes(index) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {openItems.includes(index) && (
                <div className="px-6 pb-4">
                  <div className="border-t pt-4">
                    <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                    <span className="inline-block mt-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Still Have Questions?</h2>
          <p className="text-gray-600 mb-6">
            Can't find what you're looking for? Try using Decision Spinner - sometimes the best way 
            to learn is by doing!
          </p>
          <Link 
            to="/" 
            className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
          >
            Try Decision Spinner Now
          </Link>
        </div>

        {/* Quick Tips */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Tips for New Users</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-green-500 rounded-full flex-shrink-0 mt-0.5"></div>
              <div>
                <h3 className="font-semibold text-gray-800">Start Simple</h3>
                <p className="text-gray-600 text-sm">Begin with 3-4 easy options like food choices</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex-shrink-0 mt-0.5"></div>
              <div>
                <h3 className="font-semibold text-gray-800">Trust the Result</h3>
                <p className="text-gray-600 text-sm">Go with the wheel's choice - it often reveals your true preference</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex-shrink-0 mt-0.5"></div>
              <div>
                <h3 className="font-semibold text-gray-800">Use History</h3>
                <p className="text-gray-600 text-sm">Check past spins to see patterns in your decisions</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-red-500 rounded-full flex-shrink-0 mt-0.5"></div>
              <div>
                <h3 className="font-semibold text-gray-800">Have Fun</h3>
                <p className="text-gray-600 text-sm">Remember - it's about making decisions easier and more enjoyable!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;