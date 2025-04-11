import { LucideIcon } from "lucide-react";

export interface FloatingIconProps {
  Icon: LucideIcon;
  initialPosition: { x: number; y: number };
  speed: { x: number; y: number };
}
