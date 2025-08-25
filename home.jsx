import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Instagram, Youtube, FileText, ArrowRight, Sparkles, Zap, Target } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tools = [
  {
    title: "Instagram Caption Generator",
    description: "Create engaging captions with trending hashtags for your Instagram posts",
    icon: Instagram,
    url: createPageUrl("InstagramGenerator"),
    gradient: "from-pink-500 to-orange-500",
    features: ["Engaging captions", "Trending hashtags", "Multiple variations"]
  },
  {
    title: "YouTube Title & Description",
    description: "Generate click-worthy titles and SEO-optimized descriptions for your videos",
    icon: Youtube,
    url: createPageUrl("YouTubeGenerator"),
    gradient: "from-red-500 to-pink-500",
    features: ["SEO optimization", "Click-worthy titles", "Detailed descriptions"]
  },
  {
    title: "Blog Post Generator",
    description: "Create comprehensive blog posts on any topic with proper structure",
    icon: FileText,
    url: createPageUrl("BlogGenerator"),
    gradient: "from-blue-500 to-purple-500",
    features: ["Full blog posts", "Proper structure", "Any topic"]
  }
];

const stats = [
  { label: "Content Generated", value: "10K+", icon: Sparkles },
  { label: "Time Saved", value: "1000+ hrs", icon: Zap },
  { label: "Success Rate", value: "99.9%", icon: Target }
];

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          AI-Powered Content Creation
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Create Amazing Content
          <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            In Seconds
          </span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          Transform your content creation process with our AI-powered tools. Generate Instagram captions, 
          YouTube titles, and blog posts that engage your audience and drive results.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 flex items-center justify-center">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {tools.map((tool, index) => (
          <Card key={index} className="group hover:shadow-2xl transition-all duration-500 border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
            <CardContent className="p-0">
              <div className={`h-32 bg-gradient-to-br ${tool.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute top-6 left-6">
                  <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <tool.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-4 right-4">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm" />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {tool.title}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {tool.description}
                </p>
                
                <div className="space-y-2 mb-6">
                  {tool.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Link to={tool.url}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 group-hover:scale-105 transition-all duration-300">
                    Get Started
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Transform Your Content?
        </h2>
        <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
          Join thousands of creators who are already using AI to create better content faster.
        </p>
        <Link to={createPageUrl("InstagramGenerator")}>
          <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-50 border-white">
            Start Creating Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  );
}