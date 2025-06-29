import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Settings, RotateCcw, Trophy } from 'lucide-react';

const HowItWorks: React.FC = () => {
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
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            How Decision Spinner Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Learn how to use our free online decision wheel to make random choices, 
            pick winners, and solve decision paralysis in just 4 simple steps.
          </p>
        </div>

        {/* Step by Step Guide */}
        <div className="space-y-12 mb-16">
          {/* Step 1 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                1
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Add Your Options</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-700 mb-4">
                  Start by adding your choices to the decision wheel. You can add anything you're trying to decide between:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Restaurant names for dinner choices</li>
                  <li>Movie titles for entertainment</li>
                  <li>Names for random winner selection</li>
                  <li>Activities for weekend plans</li>
                  <li>Any options you're considering</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 text-center">
                <Plus className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-700 font-medium">Click "Add" or press Enter to add each option</p>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                2
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Customize (Optional)</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg p-6 text-center">
                <Settings className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <p className="text-gray-700 font-medium">Adjust settings for your perfect spin</p>
              </div>
              <div>
                <p className="text-gray-700 mb-4">
                  Personalize your decision wheel experience:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Edit option names by clicking on them</li>
                  <li>Remove unwanted options</li>
                  <li>Clear all options to start fresh</li>
                  <li>View your decision history</li>
                  <li>Adjust wheel settings as needed</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                3
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Spin the Wheel</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-gray-700 mb-4">
                  Once you have at least 2 options, hit the spin button:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Click "Spin the Wheel!" button</li>
                  <li>Watch the wheel spin with anticipation</li>
                  <li>Random algorithm ensures fair results</li>
                  <li>Wheel gradually slows down dramatically</li>
                  <li>Building suspense until the final choice</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6 text-center">
                <RotateCcw className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                <p className="text-gray-700 font-medium">Experience the thrill of the spin!</p>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
                4
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Get Your Result</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-lg p-6 text-center">
                <Trophy className="w-16 h-16 text-red-600 mx-auto mb-4" />
                <p className="text-gray-700 font-medium">Celebrate your random decision!</p>
              </div>
              <div>
                <p className="text-gray-700 mb-4">
                  Discover your random choice and take action:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>See the winning option highlighted</li>
                  <li>Enjoy confetti celebration animation</li>
                  <li>Check your decision history</li>
                  <li>Spin again for different results</li>
                  <li>Share the result with friends</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Pro Tips */}
        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Pro Tips for Better Decisions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="font-semibold text-gray-800">Keep It Simple</h3>
                  <p className="text-gray-600">Use clear, concise option names for better visibility on the wheel.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="font-semibold text-gray-800">Balanced Options</h3>
                  <p className="text-gray-600">Include 3-8 options for the best wheel balance and user experience.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="font-semibold text-gray-800">Trust the Process</h3>
                  <p className="text-gray-600">Accept the random result - it often reveals your true preference!</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex-shrink-0 mt-1"></div>
                <div>
                  <h3 className="font-semibold text-gray-800">Use History</h3>
                  <p className="text-gray-600">Check past decisions to track patterns and favorite choices.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Is the decision wheel truly random?</h3>
              <p className="text-gray-600">Yes! Our algorithm uses cryptographically secure random number generation to ensure completely fair and unbiased results.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Can I save my wheel configurations?</h3>
              <p className="text-gray-600">Your options are automatically saved in your browser's local storage, so they'll be there when you return.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">How many options can I add?</h3>
              <p className="text-gray-600">You can add up to 20 options to maintain good wheel readability and performance.</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Does it work on mobile devices?</h3>
              <p className="text-gray-600">Absolutely! Decision Spinner is fully responsive and optimized for all devices including phones and tablets.</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Ready to Make Your Decision?</h2>
          <Link 
            to="/" 
            className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            Start Using Decision Spinner
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;