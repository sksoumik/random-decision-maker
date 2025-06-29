import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Privacy: React.FC = () => {
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
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>

            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8">
              <p className="text-blue-800">
                <strong>TL;DR:</strong> We don't collect, store, or track your personal data. 
                Your decisions stay private and are only stored locally in your browser.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Personal Information</h3>
            <p className="text-gray-700 mb-4">
              Decision Spinner does <strong>not</strong> collect any personal information. We do not require:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Names, email addresses, or contact information</li>
              <li>User accounts or registration</li>
              <li>Personal preferences or settings</li>
              <li>Location data</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Decision Data</h3>
            <p className="text-gray-700 mb-4">
              Your wheel options and decision history are stored locally in your browser's storage only. 
              This data never leaves your device and is not transmitted to our servers.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Usage Analytics</h3>
            <p className="text-gray-700 mb-4">
              We may collect anonymous, aggregated usage statistics to improve our service, including:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Page views and session duration</li>
              <li>Browser type and device information</li>
              <li>General geographic region (country/state level)</li>
              <li>Feature usage patterns (anonymized)</li>
            </ul>
            <p className="text-gray-700 mb-4">
              This data cannot be used to identify individual users and contains no personal information.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">How We Use Information</h2>
            <p className="text-gray-700 mb-4">Since we collect minimal data, our use is limited to:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Providing and improving the Decision Spinner service</li>
              <li>Understanding how users interact with our tool</li>
              <li>Fixing bugs and technical issues</li>
              <li>Optimizing performance and user experience</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Data Storage and Security</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Local Storage</h3>
            <p className="text-gray-700 mb-4">
              Your wheel options and history are stored in your browser's local storage. This means:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>Data stays on your device only</li>
              <li>We cannot access or view your decisions</li>
              <li>Clearing browser data will remove your saved options</li>
              <li>Incognito/private browsing won't save your data</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Security Measures</h3>
            <p className="text-gray-700 mb-4">
              We implement standard web security practices:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>HTTPS encryption for all connections</li>
              <li>Regular security updates and monitoring</li>
              <li>No server-side storage of personal data</li>
              <li>Secure hosting infrastructure</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Third-Party Services</h2>
            <p className="text-gray-700 mb-4">
              Decision Spinner may use third-party services for:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li><strong>Hosting:</strong> Website hosting and content delivery</li>
              <li><strong>Analytics:</strong> Anonymous usage statistics (if enabled)</li>
              <li><strong>Fonts:</strong> Web fonts for better typography</li>
            </ul>
            <p className="text-gray-700 mb-4">
              These services operate under their own privacy policies and we share no personal data with them.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Cookies</h2>
            <p className="text-gray-700 mb-4">
              Decision Spinner uses minimal cookies:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li><strong>Essential cookies:</strong> Required for basic site functionality</li>
              <li><strong>Preference cookies:</strong> Remember your wheel options locally</li>
              <li><strong>No tracking cookies:</strong> We don't use advertising or tracking cookies</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Your Rights</h2>
            <p className="text-gray-700 mb-4">
              Since we don't collect personal data, most data protection rights don't apply. However:
            </p>
            <ul className="list-disc list-inside text-gray-700 mb-4">
              <li>You can clear your local data anytime through your browser settings</li>
              <li>You can use the app without accepting non-essential cookies</li>
              <li>You can contact us with privacy concerns</li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Children's Privacy</h2>
            <p className="text-gray-700 mb-4">
              Decision Spinner is safe for all ages. We don't knowingly collect any information from children under 13. 
              Since no personal data is collected, the service is COPPA compliant.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Changes to Privacy Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this privacy policy occasionally. Changes will be posted on this page with 
              an updated date. Continued use of Decision Spinner after changes constitutes acceptance.
            </p>

            <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have questions about this privacy policy or our privacy practices, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                <strong>Email:</strong> privacy@neuralix.app<br/>
                <strong>Website:</strong> <Link to="/" className="text-blue-600 hover:underline">Decision Spinner</Link>
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 mt-8">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Privacy-First Approach</h3>
              <p className="text-green-700">
                Decision Spinner was built with privacy in mind. Your decisions are yours alone, 
                and we're committed to keeping it that way.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;