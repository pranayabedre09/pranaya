import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Sparkles, Instagram, Youtube, FileText, Home } from "lucide-react";

const navigationItems = [
  {
    title: "Home",
    url: createPageUrl("Home"),
    icon: Home,
    description: "Dashboard"
  },
  {
    title: "Instagram",
    url: createPageUrl("InstagramGenerator"),
    icon: Instagram,
    description: "Caption Generator"
  },
  {
    title: "YouTube",
    url: createPageUrl("YouTubeGenerator"), 
    icon: Youtube,
    description: "Title & Description"
  },
  {
    title: "Blog",
    url: createPageUrl("BlogGenerator"),
    icon: FileText,
    description: "Blog Posts"
  }
];

export default function Layout({ children, currentPageName }) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <style>
        {`
          :root {
            --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            --accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          }
        `}
      </style>
      
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to={createPageUrl("Home")} className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  ContentAI
                </h1>
                <p className="text-xs text-gray-500">AI Content Creator</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.url}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 group ${
                    location.pathname === item.url
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'hover:bg-white/60 text-gray-700 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <div className="text-left">
                    <div className="text-sm font-medium">{item.title}</div>
                    <div className="text-xs opacity-75">{item.description}</div>
                  </div>
                </Link>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <div className="w-4 h-0.5 bg-white"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-white/90 backdrop-blur-md border-b border-white/20">
        <div className="flex overflow-x-auto px-6 py-3 gap-4">
          {navigationItems.map((item) => (
            <Link
              key={item.title}
              to={item.url}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl whitespace-nowrap transition-all duration-300 ${
                location.pathname === item.url
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'text-gray-600'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.title}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white/60 backdrop-blur-md border-t border-white/20 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Powered by AI • Built with ❤️ for creators
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}