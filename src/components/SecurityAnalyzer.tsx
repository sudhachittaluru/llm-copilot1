import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThreatCard } from "./ThreatCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Shield, AlertTriangle, FileText, Activity } from "lucide-react";
import { toast } from "sonner";

interface Threat {
  type_of_threat: string;
  description: string;
  affected_user_or_ip: string;
  severity: "low" | "medium" | "high";
  recommended_action: string;
}

interface AnalysisResult {
  threats: Threat[];
  summary: string;
}

export function SecurityAnalyzer() {
  const [logs, setLogs] = useState("");
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeLogs = () => {
    if (!logs.trim()) {
      toast.error("Please enter some logs to analyze");
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis with realistic cybersecurity threats
    setTimeout(() => {
      const mockThreats: Threat[] = [
        {
          type_of_threat: "Failed login attempt",
          description: "Multiple failed SSH login attempts detected from external source",
          affected_user_or_ip: "192.168.1.150",
          severity: "high",
          recommended_action: "Block IP immediately and review authentication logs"
        },
        {
          type_of_threat: "Privilege escalation",
          description: "User attempted to access root privileges without authorization",
          affected_user_or_ip: "user123",
          severity: "high",
          recommended_action: "Investigate user account and review sudo access logs"
        },
        {
          type_of_threat: "Suspicious file access",
          description: "Unusual access pattern to sensitive configuration files",
          affected_user_or_ip: "admin_service",
          severity: "medium",
          recommended_action: "Monitor file access patterns and verify service legitimacy"
        },
        {
          type_of_threat: "Network anomaly",
          description: "Unexpected outbound connections to unknown hosts",
          affected_user_or_ip: "10.0.0.25",
          severity: "medium",
          recommended_action: "Analyze network traffic and check for malware"
        }
      ];

      const result: AnalysisResult = {
        threats: mockThreats,
        summary: "Analysis complete: Detected 4 security events including 2 high-risk incidents requiring immediate attention. Failed login attempts and privilege escalation detected from multiple sources."
      };

      setAnalysis(result);
      setIsAnalyzing(false);
      toast.success("Analysis complete - threats detected!");
    }, 2000);
  };

  const getOverallThreatLevel = () => {
    if (!analysis) return "secure";
    const highThreats = analysis.threats.filter(t => t.severity === "high").length;
    if (highThreats > 0) return "critical";
    const mediumThreats = analysis.threats.filter(t => t.severity === "medium").length;
    if (mediumThreats > 0) return "elevated";
    return "low";
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 rounded-full gradient-cyber">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            CyberGuard AI Assistant
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Advanced threat detection and security analysis for your systems
          </p>
        </div>

        {/* Log Input */}
        <Card className="shadow-cyber">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              System Logs Input
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Paste your system logs here for analysis..."
              value={logs}
              onChange={(e) => setLogs(e.target.value)}
              className="min-h-[200px] font-mono text-sm"
            />
            <Button 
              onClick={analyzeLogs} 
              disabled={isAnalyzing}
              className="w-full gradient-cyber text-primary-foreground shadow-cyber"
            >
              {isAnalyzing ? (
                <>
                  <Activity className="h-4 w-4 mr-2 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Analyze Threats
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Analysis Results */}
        {analysis && (
          <div className="space-y-6">
            {/* Threat Overview */}
            <Card className="shadow-cyber">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Threat Overview
                  </span>
                  <Badge 
                    variant="outline" 
                    className={
                      getOverallThreatLevel() === "critical" 
                        ? "bg-threat-high/20 text-threat-high border-threat-high/30 shadow-alert" 
                        : getOverallThreatLevel() === "elevated"
                        ? "bg-threat-medium/20 text-threat-medium border-threat-medium/30"
                        : "bg-success/20 text-success border-success/30"
                    }
                  >
                    {getOverallThreatLevel().toUpperCase()}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-4 bg-threat-high/10 rounded-lg border border-threat-high/20">
                    <div className="text-2xl font-bold text-threat-high">
                      {analysis.threats.filter(t => t.severity === "high").length}
                    </div>
                    <div className="text-sm text-muted-foreground">High Risk</div>
                  </div>
                  <div className="text-center p-4 bg-threat-medium/10 rounded-lg border border-threat-medium/20">
                    <div className="text-2xl font-bold text-threat-medium">
                      {analysis.threats.filter(t => t.severity === "medium").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Medium Risk</div>
                  </div>
                  <div className="text-center p-4 bg-threat-low/10 rounded-lg border border-threat-low/20">
                    <div className="text-2xl font-bold text-threat-low">
                      {analysis.threats.filter(t => t.severity === "low").length}
                    </div>
                    <div className="text-sm text-muted-foreground">Low Risk</div>
                  </div>
                </div>
                <p className="text-sm bg-primary/5 border border-primary/20 rounded-md p-3">
                  <strong>Executive Summary:</strong> {analysis.summary}
                </p>
              </CardContent>
            </Card>

            {/* Detailed Results */}
            <Tabs defaultValue="threats" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="threats">Threat Analysis</TabsTrigger>
                <TabsTrigger value="json">JSON Output</TabsTrigger>
              </TabsList>
              
              <TabsContent value="threats" className="space-y-4">
                <div className="grid gap-4">
                  {analysis.threats.map((threat, index) => (
                    <ThreatCard key={index} threat={threat} />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="json">
                <Card className="shadow-cyber">
                  <CardHeader>
                    <CardTitle>JSON Analysis Output</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-secondary/50 p-4 rounded-lg text-sm overflow-auto max-h-96 font-mono">
                      {JSON.stringify(analysis, null, 2)}
                    </pre>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>
    </div>
  );
}