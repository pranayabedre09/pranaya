import React, { useState } from "react";
import { InvokeLLM } from "@/integrations/Core";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { FileText, Copy, RefreshCw, BookOpen, Clock, User } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function BlogGenerator() {
  const [topic, setTopic] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("professional");
  const [blogPost, setBlogPost] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateBlog = async () => {
    if (!topic.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const prompt = `Write a comprehensive, well-structured blog post about: "${topic}".
      
      Target audience: ${audience || "general audience"}
      Tone: ${tone}
      
      The blog post should include:
      1. An engaging title
      2. A compelling introduction hook
      3. Well-organized sections with subheadings
      4. Actionable insights and practical tips
      5. A strong conclusion with call-to-action
      6. Estimated reading time
      
      Make it informative, engaging, and valuable to readers. Aim for 800-1200 words.`;

      const result = await InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            title: { type: "string" },
            content: { type: "string" },
            reading_time: { type: "string" },
            word_count: { type: "number" }
          }
        }
      });
      
      setBlogPost(result);
    } catch (err) {
      setError("Failed to generate blog post. Please try again.");
    }
    
    setIsLoading(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
          <FileText className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Blog Post Generator
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Create comprehensive, well-structured blog posts on any topic with proper formatting and engaging content
        </p>
      </div>

      {/* Input Section */}
      <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-blue-600" />
            Blog Post Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <Label htmlFor="topic" className="text-sm font-medium text-gray-700 mb-2 block">
              Blog Topic *
            </Label>
            <Input
              id="topic"
              placeholder="Enter your blog post topic (e.g., 'sustainable living tips', 'remote work productivity')"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="text-lg"
            />
          </div>

          <div>
            <Label htmlFor="audience" className="text-sm font-medium text-gray-700 mb-2 block">
              Target Audience (Optional)
            </Label>
            <Input
              id="audience"
              placeholder="Who is this for? (e.g., 'small business owners', 'college students', 'parents')"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700 mb-3 block">
              Writing Tone
            </Label>
            <div className="flex flex-wrap gap-2">
              {["professional", "casual", "friendly", "authoritative", "conversational"].map((toneOption) => (
                <Button
                  key={toneOption}
                  variant={tone === toneOption ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTone(toneOption)}
                  className={tone === toneOption ? "bg-blue-600 text-white" : ""}
                >
                  {toneOption.charAt(0).toUpperCase() + toneOption.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <Button 
            onClick={generateBlog}
            disabled={!topic.trim() || isLoading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg py-6"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Generating Blog Post...
              </>
            ) : (
              <>
                <FileText className="w-5 h-5 mr-2" />
                Generate Blog Post
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive" className="mb-8">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Results */}
      {blogPost && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center mb-8">
            Your Generated Blog Post
          </h2>
          
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {blogPost.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{blogPost.reading_time || "5 min read"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      <span>{blogPost.word_count || "800+"} words</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span className="capitalize">{tone} tone</span>
                    </div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => copyToClipboard(`${blogPost.title}\n\n${blogPost.content}`)}
                  className="ml-4"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Post
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <div className="bg-gray-50 rounded-lg p-8">
                  <pre className="whitespace-pre-wrap text-gray-800 leading-relaxed font-medium">
                    {blogPost.content}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-6">
              <h4 className="font-bold text-gray-900 mb-2">💡 Pro Tips:</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Add relevant images and infographics to enhance readability</li>
                <li>• Include internal and external links for better SEO</li>
                <li>• Break up long paragraphs for better mobile experience</li>
                <li>• Add a compelling meta description for search engines</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}