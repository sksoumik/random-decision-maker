import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Info, HelpCircle, Shield, FileText, BookOpen } from 'lucide-react';
import { trackNavigation, trackPageView } from '../utils/analytics';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  // Track page views
  React.useEffect(() => {
    trackPageView(location.pathname, document.title);
  }, [location.pathname]);
  
  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'How It Works', href: '/how-it-works', icon: BookOpen },
    { name: 'About', href: '/about', icon: Info },
    { name: 'FAQ', href: '/faq', icon: HelpCircle },
    { name: 'Privacy', href: '/privacy', icon: Shield },
    { name: 'Terms', href: '/terms', icon: FileText },
  ];

  const isHomePage = location.pathname === '/';

  return (
    <div className={`min-h-screen ${isHomePage ? '' : 'bg-gradient-to-br from-blue-50 to-purple-50'}`}>
      {/* Navigation Header - Always show */}
        <nav className={`shadow-sm border-b sticky top-0 z-50 ${isHomePage ? 'bg-black/20 backdrop-blur-md border-white/20' : 'bg-white'}`}>
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo/Brand */}
              <Link to="/" className={`flex items-center space-x-2 text-xl font-bold ${isHomePage ? 'text-white' : 'text-gray-800'}`}>
                <span className="text-2xl">🎯</span>
                <span>Decision Spinner</span>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => trackNavigation(item.name)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 ${
                        isActive
                          ? (isHomePage ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-800')
                          : (isHomePage ? 'text-white/80 hover:text-white hover:bg-white/10' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100')
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Navigation Button */}
              <div className="md:hidden">
                <details className="relative">
                  <summary className={`flex items-center px-3 py-2 border rounded-md cursor-pointer ${isHomePage ? 'border-white/30 text-white/80 hover:text-white hover:bg-white/10' : 'border-gray-300 text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>
                    <span className="sr-only">Open menu</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </summary>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                    {navigation.map((item) => {
                      const isActive = location.pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`flex items-center space-x-2 px-4 py-2 text-sm transition-colors ${
                            isActive
                              ? 'bg-blue-100 text-blue-800'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                          }`}
                        >
                          <item.icon className="w-4 h-4" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </details>
              </div>
            </div>
          </div>
        </nav>

      {/* Main Content */}
      <main className={isHomePage ? '' : 'pt-0'}>
        {children}
      </main>

      {/* Footer - Only show on non-home pages */}
      {!isHomePage && (
        <footer className="bg-white border-t mt-16">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div className="md:col-span-2">
                <div className="flex items-center space-x-2 text-xl font-bold text-gray-800 mb-4">
                  <span className="text-2xl">🎯</span>
                  <span>Decision Spinner</span>
                </div>
                <p className="text-gray-600 mb-4">
                  The ultimate free online decision-making tool. Make choices fun, fair, and easy with our random decision wheel.
                </p>
                <p className="text-sm text-gray-500">
                  © 2024 Neuralix. All rights reserved.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  {navigation.slice(0, 3).map((item) => (
                    <li key={item.name}>
                      <Link to={item.href} className="text-gray-600 hover:text-blue-600 transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Legal</h3>
                <ul className="space-y-2">
                  {navigation.slice(3).map((item) => (
                    <li key={item.name}>
                      <Link to={item.href} className="text-gray-600 hover:text-blue-600 transition-colors">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Layout;