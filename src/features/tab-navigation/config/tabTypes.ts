import {
  BarChart3,
  Bell,
  CreditCard,
  LayoutDashboard,
  Lock,
  MessageSquare,
  Settings,
  User,
} from "lucide-react";

import type { TabTypeConfig } from "../types/tab.types";

/**
 * Configuración de todos los tipos de tabs disponibles
 */
export const TAB_TYPES: Record<string, TabTypeConfig> = {
  payment: {
    type: "payment",
    defaultLabel: "Payment",
    icon: CreditCard,
    color: "bg-orange-500", // Cambiado
    description: "Manage payment methods and transactions",
  },
  login: {
    type: "login",
    defaultLabel: "Login",
    icon: Lock,
    color: "bg-green-500",
    description: "User authentication and security",
  },
  dashboard: {
    type: "dashboard",
    defaultLabel: "Dashboard",
    icon: LayoutDashboard,
    color: "bg-blue-500", // Cambiado
    description: "Overview and main metrics",
  },
  profile: {
    type: "profile",
    defaultLabel: "Profile",
    icon: User,
    color: "bg-purple-500",
    description: "User profile and personal information",
  },
  settings: {
    type: "settings",
    defaultLabel: "Settings",
    icon: Settings,
    color: "bg-gray-500",
    description: "Application settings and preferences",
  },
  analytics: {
    type: "analytics",
    defaultLabel: "Analytics",
    icon: BarChart3,
    color: "bg-indigo-500",
    description: "Data analytics and reports",
  },
  notifications: {
    type: "notifications",
    defaultLabel: "Notifications",
    icon: Bell,
    color: "bg-red-500",
    description: "Alerts and notifications center",
  },
  messages: {
    type: "messages",
    defaultLabel: "Messages",
    icon: MessageSquare,
    color: "bg-cyan-500",
    description: "Direct messaging and conversations",
  },
};

/**
 * Obtener array de tipos disponibles
 */
export const getAvailableTabTypes = (): TabTypeConfig[] => {
  return Object.values(TAB_TYPES);
};

/**
 * Obtener configuración de un tipo específico
 */
export const getTabTypeConfig = (type: string): TabTypeConfig | undefined => {
  return TAB_TYPES[type];
};
