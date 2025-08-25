import React, { useState } from "react";
import { InvokeLLM } from "@/integrations/Core";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Youtube, Copy, RefreshCw, PlayCircle, Eye, Clock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function YouTubeGenerator() {
  const [topic, setTopic] = useState("");
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateContent = async () => {
    if (!topic.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const prompt = `Create YouTube content for a video about: "${topic}". 
      Generate:
      1. 5 click-worthy, SEO-optimized titles (under 60 characters)
      2. A comprehensive video description with:
         - Engaging introduction
         - Video breakdown/timestamps
         - Call-to-action
         - Relevant keywords
         - Social media links placeholders
      3. 10-15 relevant tags for SEO
      
      Make it engaging and optimized for YouTube's algorithm.`;

      const result = await InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            titles: {
              type: "array",
              items: { type: "string" }
            },
            description: { type: "string" },
            tags: {
              type: "array", 
              items: { type: "string" }
            }
          }
        }
      });
      
      setResults(result);
    } catch (err) {
      setError("Failed to generate YouTube content. Please try again.");
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
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
          <Youtube className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
          YouTube Title & Description Generator
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Create click-worthy titles and SEO-optimized descriptions that boost your video's visibility and engagement
        </p>
      </div>

      {/* Input Section */}
      <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PlayCircle className="w-5 h-5 text-red-600" />
            What's your video about?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Describe your YouTube video... (e.g., 'iPhone 15 review', 'chocolate chip cookie recipe', 'productivity tips for students')"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="min-h-[100px] text-lg"
          />
          <Button 
            onClick={generateContent}
            disabled={!topic.trim() || isLoading}
            className="w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white text-lg py-6"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Generating Content...
              </>
            ) : (
              <>
                <Youtube className="w-5 h-5 mr-2" />
                Generate Title & Description
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
      {results && (
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-center mb-8">
            Your YouTube Content
          </h2>
          
          {/* Titles */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5 text-red-600" />
                  Click-Worthy Titles
                </CardTitle>
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  SEO Optimized
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.titles?.map((title, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{title}</p>
                    <p className="text-sm text-gray-500 mt-1">{title.length} characters</p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(title)}
                    className="ml-4"
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Description */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <PlayCircle className="w-5 h-5 text-red-600" />
                  Video Description
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(results.description)}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Description
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 rounded-lg p-6">
                <pre className="whitespace-pre-wrap text-gray-800 font-medium leading-relaxed">
                  {results.description}
                </pre>
              </div>
            </CardContent>
          </Card>

          {/* Tags */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-red-600" />
                  SEO Tags
                </CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(results.tags?.join(", "))}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Tags
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {results.tags?.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}