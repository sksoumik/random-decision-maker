import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Target, Zap, Users, Shield } from 'lucide-react';

const About: React.FC = () => {
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
            About Decision Spinner
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            The ultimate free online decision-making tool that helps millions make better choices 
            every day. No sign-ups, no downloads, just instant decisions.
          </p>
        </div>

        {/* Main Content */}
        <div className="prose prose-lg max-w-none">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Why Decision Spinner?</h2>
            <p className="text-gray-700 mb-6">
              Making decisions can be overwhelming, whether you're choosing what to eat for dinner, 
              picking a movie to watch, or selecting a random winner for a contest. Decision Spinner 
              eliminates choice paralysis by introducing an element of chance that makes deciding fun and fair.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              <div className="flex items-start space-x-4">
                <Target className="w-8 h-8 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Fair & Random</h3>
                  <p className="text-gray-600">
                    Our algorithm ensures truly random results with equal probability for each option.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Zap className="w-8 h-8 text-green-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Instant Access</h3>
                  <p className="text-gray-600">
                    No downloads or sign-ups required. Start making decisions in seconds.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Users className="w-8 h-8 text-purple-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Perfect for Groups</h3>
                  <p className="text-gray-600">
                    Ideal for group decisions, contests, classroom activities, and team building.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <Shield className="w-8 h-8 text-red-600 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Privacy Focused</h3>
                  <p className="text-gray-600">
                    Your choices stay private. We don't track or store your personal decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Popular Use Cases</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">🍕 Food Choices</h3>
                <p className="text-gray-600">Can't decide what to eat? Add your food options and let fate choose your next meal.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">🎬 Entertainment</h3>
                <p className="text-gray-600">Pick movies, TV shows, games, or activities for your next entertainment session.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">🏆 Contests & Giveaways</h3>
                <p className="text-gray-600">Randomly select winners for contests, giveaways, or prize drawings fairly.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">📚 Educational</h3>
                <p className="text-gray-600">Teachers use it for random student selection, quiz questions, and classroom activities.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">💼 Business</h3>
                <p className="text-gray-600">Team decisions, project assignments, meeting topics, and brainstorming sessions.</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">🎯 Personal</h3>
                <p className="text-gray-600">Daily choices, workout routines, travel destinations, and life decisions.</p>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Trusted by Millions</h2>
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 mb-2">1M+</div>
                <div className="text-gray-600">Decisions Made</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-600 mb-2">50K+</div>
                <div className="text-gray-600">Daily Users</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
                <div className="text-gray-600">Uptime</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-red-600 mb-2">0</div>
                <div className="text-gray-600">Cost to Use</div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Link 
              to="/" 
              className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              Try Decision Spinner Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;