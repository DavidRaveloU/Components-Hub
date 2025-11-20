import { ArrowRight, Clock, Star, Zap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";

import { Badge } from "../ui/Badge";
import type { ComponentInfo } from "@/types/component";
import { Link } from "react-router-dom";

interface ComponentCardProps {
  component: ComponentInfo;
}

const difficultyConfig = {
  easy: {
    icon: Zap,
    label: "Easy",
    variant: "success" as const,
  },
  medium: {
    icon: Clock,
    label: "Medium",
    variant: "warning" as const,
  },
  hard: {
    icon: Star,
    label: "Hard",
    variant: "danger" as const,
  },
};

export function ComponentCard({ component }: ComponentCardProps) {
  const difficulty = difficultyConfig[component.difficulty];
  const DifficultyIcon = difficulty.icon;

  return (
    <Link to={component.route} className="group">
      <Card className="h-full transition-all duration-300 hover:scale-[1.02] hover:border-gray-300">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
              {component.name}
            </CardTitle>
            <Badge
              variant={difficulty.variant}
              className="flex items-center fap-1"
            >
              <DifficultyIcon className="w-3 h-3" />
              {difficulty.label}
            </Badge>
          </div>
          <CardDescription className="mt-2">
            {component.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-xs mr-2 mt-3">
            <Badge className="mr-2" variant={"secondary"}>
              {component.category}
            </Badge>
            {component.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant={"outline"} className="text-xs mr-2 mt-3">
                {tag}
              </Badge>
            ))}
            {component.tags.length > 3 && (
              <Badge variant={"outline"} className="text-xs mr-2 mt-3">
                +{component.tags.length - 3}
              </Badge>
            )}
          </div>
          {component.dependencies && component.dependencies.length > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-500 mb-2">Dependencies:</p>
              {component.dependencies.map((dep) => (
                <code
                  key={dep}
                  className="text-xs bg-gray-100 px-2 py-1 rounded"
                >
                  {dep}
                </code>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter>
          <div className="flex items-center text-sm text-blue-600 group-hover:text-blue-700 font-medium">
            View Demo
          </div>
          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
        </CardFooter>
      </Card>
    </Link>
  );
}
