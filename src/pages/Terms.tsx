import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Terms: React.FC = () => {
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
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
              <p className="text-blue-800">
                <strong>Summary:</strong> Decision Spinner is free to use for any lawful purpose. 
                Use it responsibly and don't rely on it for critical life decisions.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Acceptance of Terms</h2>
            <p className="text-gray-700 mb-4">
              By accessing and using Decision Spinner, you accept and agree to be bound by the terms 
              and provision of this agreement. If you do not agree to these terms, please do not use our service.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Description of Service</h2>
            <p className="text-gray-700 mb-4">
              Decision Spinner is a free online tool that helps users make random choices by spinning 
              a virtual wheel. The service includes:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Interactive decision wheel with customizable options</li>
              <li>Random selection algorithm for fair results</li>
              <li>Local storage of user preferences and history</li>
              <li>Mobile-responsive interface</li>
              <li>No registration or sign-up required</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Acceptable Use</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Permitted Uses</h3>
            <p className="text-gray-700 mb-4">You may use Decision Spinner for:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Personal decision making (food, entertainment, activities)</li>
              <li>Educational purposes in schools and training</li>
              <li>Team building and group activities</li>
              <li>Fair selection for contests and giveaways</li>
              <li>Creative inspiration and brainstorming</li>
              <li>Any lawful purpose that doesn't violate these terms</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Prohibited Uses</h3>
            <p className="text-gray-700 mb-4">You may NOT use Decision Spinner for:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Illegal gambling or wagering activities</li>
              <li>Making critical medical, legal, or financial decisions</li>
              <li>Harmful, offensive, or inappropriate content</li>
              <li>Harassment, discrimination, or hate speech</li>
              <li>Attempting to hack, disrupt, or damage the service</li>
              <li>Commercial use without permission</li>
              <li>Any activity that violates local laws or regulations</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Disclaimers and Limitations</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Random Nature</h3>
            <p className="text-gray-700 mb-4">
              While we strive to provide truly random results, Decision Spinner is intended for 
              entertainment and simple decision-making purposes. Do not rely on it for:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Critical life decisions</li>
              <li>Financial investments or trading</li>
              <li>Medical or health-related choices</li>
              <li>Legal or regulatory compliance</li>
              <li>Safety-critical situations</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Service Availability</h3>
            <p className="text-gray-700 mb-4">
              Decision Spinner is provided "as is" without warranty of any kind. We do not guarantee:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Continuous availability or uptime</li>
              <li>Error-free operation</li>
              <li>Compatibility with all devices or browsers</li>
              <li>Preservation of saved data</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Intellectual Property</h2>
            <p className="text-gray-700 mb-4">
              Decision Spinner, including its design, code, and content, is owned by Neuralix and 
              protected by copyright and other intellectual property laws. You may:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Use the service for personal and non-commercial purposes</li>
              <li>Share links to the service</li>
              <li>Take screenshots for personal use</li>
            </ul>
            <p className="text-gray-700 mb-4">You may NOT:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Copy, modify, or distribute our code</li>
              <li>Create derivative works</li>
              <li>Use our branding or logos</li>
              <li>Reverse engineer the service</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">User Content</h2>
            <p className="text-gray-700 mb-4">
              Users can input custom options into the decision wheel. By adding content, you represent that:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>You own or have the right to use the content</li>
              <li>The content doesn't violate any laws or rights</li>
              <li>The content is appropriate and non-offensive</li>
            </ul>
            <p className="text-gray-700 mb-4">
              Since content is stored locally on your device, we don't monitor or control user-generated content. 
              However, we reserve the right to remove access if we become aware of violations.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Privacy</h2>
            <p className="text-gray-700 mb-4">
              Your privacy is important to us. Please review our <Link to="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link> 
              to understand how we handle your information. Key points:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>We don't collect personal information</li>
              <li>Your decisions stay on your device</li>
              <li>We may collect anonymous usage statistics</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Limitation of Liability</h2>
            <p className="text-gray-700 mb-4">
              To the fullest extent permitted by law, Neuralix and Decision Spinner shall not be liable for:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Any indirect, incidental, or consequential damages</li>
              <li>Loss of data, profits, or business opportunities</li>
              <li>Decisions made based on wheel results</li>
              <li>Service interruptions or technical issues</li>
              <li>Third-party actions or content</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Indemnification</h2>
            <p className="text-gray-700 mb-4">
              You agree to indemnify and hold harmless Neuralix from any claims, damages, or expenses 
              arising from your use of Decision Spinner, violation of these terms, or infringement of any rights.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Modifications</h2>
            <p className="text-gray-700 mb-4">
              We reserve the right to modify these terms at any time. Changes will be posted on this page 
              with an updated date. Continued use after changes constitutes acceptance of the new terms.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Termination</h2>
            <p className="text-gray-700 mb-4">
              We may terminate or suspend access to Decision Spinner at any time, with or without cause. 
              Upon termination, your right to use the service ceases immediately.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Governing Law</h2>
            <p className="text-gray-700 mb-4">
              These terms are governed by and construed in accordance with applicable laws. 
              Any disputes will be resolved through appropriate legal channels.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about these terms, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> legal@neuralix.app<br/>
                <strong>Website:</strong> <Link to="/" className="text-blue-600 hover:underline">Decision Spinner</Link>
              </p>
            </div>

            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-8">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Important Reminder</h3>
              <p className="text-yellow-700">
                Decision Spinner is a fun tool for simple choices. For important decisions, 
                always use your best judgment and consider multiple factors beyond random chance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;