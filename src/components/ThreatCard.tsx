import { AlertTriangle, Shield, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Threat {
  type_of_threat: string;
  description: string;
  affected_user_or_ip: string;
  severity: "low" | "medium" | "high";
  recommended_action: string;
}

interface ThreatCardProps {
  threat: Threat;
}

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case "high":
      return <AlertTriangle className="h-5 w-5 text-threat-high" />;
    case "medium":
      return <Zap className="h-5 w-5 text-threat-medium" />;
    case "low":
      return <Shield className="h-5 w-5 text-threat-low" />;
    default:
      return <Shield className="h-5 w-5" />;
  }
};

const getSeverityBadgeClass = (severity: string) => {
  switch (severity) {
    case "high":
      return "bg-threat-high/20 text-threat-high border-threat-high/30 shadow-alert";
    case "medium":
      return "bg-threat-medium/20 text-threat-medium border-threat-medium/30";
    case "low":
      return "bg-threat-low/20 text-threat-low border-threat-low/30";
    default:
      return "bg-muted text-muted-foreground";
  }
};

export function ThreatCard({ threat }: ThreatCardProps) {
  return (
    <Card className={`transition-smooth hover:shadow-cyber ${
      threat.severity === "high" ? "border-threat-high/30 shadow-alert" : ""
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-base">
            {getSeverityIcon(threat.severity)}
            {threat.type_of_threat}
          </CardTitle>
          <Badge 
            variant="outline" 
            className={getSeverityBadgeClass(threat.severity)}
          >
            {threat.severity.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground">
          {threat.description}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono bg-secondary px-2 py-1 rounded">
            {threat.affected_user_or_ip}
          </span>
        </div>
        <div className="bg-primary/5 border border-primary/20 rounded-md p-3">
          <p className="text-sm font-medium text-primary mb-1">Recommended Action:</p>
          <p className="text-sm text-foreground">{threat.recommended_action}</p>
        </div>
      </CardContent>
    </Card>
  );
}