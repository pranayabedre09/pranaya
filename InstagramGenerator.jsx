import React, { useState } from "react";
import { InvokeLLM } from "@/integrations/Core";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Instagram, Copy, RefreshCw, Hash, Heart, MessageCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function InstagramGenerator() {
  const [topic, setTopic] = useState("");
  const [captions, setCaptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateCaptions = async () => {
    if (!topic.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const prompt = `Create 3 engaging Instagram captions for a post about: "${topic}". 
      Each caption should:
      - Be engaging and authentic
      - Include relevant emojis
      - Have 5-8 relevant hashtags
      - Be different in tone (professional, casual, creative)
      - Be optimized for Instagram engagement
      
      Format each caption with the main text first, then hashtags at the end.`;

      const result = await InvokeLLM({
        prompt,
        response_json_schema: {
          type: "object",
          properties: {
            captions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  text: { type: "string" },
                  hashtags: { type: "string" },
                  tone: { type: "string" }
                }
              }
            }
          }
        }
      });
      
      setCaptions(result.captions || []);
    } catch (err) {
      setError("Failed to generate captions. Please try again.");
    }
    
    setIsLoading(false);
  };

  const copyToClipboard = (text, hashtags) => {
    const fullCaption = `${text}\n\n${hashtags}`;
    navigator.clipboard.writeText(fullCaption);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r from-pink-500 to-orange-500 flex items-center justify-center">
          <Instagram className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-600 to-orange-600 bg-clip-text text-transparent">
          Instagram Caption Generator
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Create engaging Instagram captions with trending hashtags that boost your reach and engagement
        </p>
      </div>

      {/* Input Section */}
      <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5 text-pink-600" />
            What's your post about?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Describe your Instagram post... (e.g., 'morning coffee routine', 'weekend hiking adventure', 'new product launch')"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="min-h-[100px] text-lg"
          />
          <Button 
            onClick={generateCaptions}
            disabled={!topic.trim() || isLoading}
            className="w-full bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 text-white text-lg py-6"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Generating Captions...
              </>
            ) : (
              <>
                <Instagram className="w-5 h-5 mr-2" />
                Generate Captions
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
      {captions.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center mb-8">
            Your Generated Captions
          </h2>
          
          {captions.map((caption, index) => (
            <Card key={index} className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <Badge variant="outline" className="bg-gradient-to-r from-pink-100 to-orange-100 text-pink-700 border-pink-200">
                    {caption.tone || `Caption ${index + 1}`}
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(caption.text, caption.hashtags)}
                    className="hover:bg-pink-50"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="text-gray-800 leading-relaxed">
                    {caption.text}
                  </div>
                  
                  {caption.hashtags && (
                    <div className="flex items-start gap-2 pt-4 border-t border-gray-100">
                      <Hash className="w-4 h-4 text-pink-600 mt-0.5" />
                      <div className="text-pink-600 font-medium">
                        {caption.hashtags}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    <span>Optimized for engagement</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Hash className="w-4 h-4" />
                    <span>Trending hashtags</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}