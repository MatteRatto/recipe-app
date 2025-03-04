import { useEffect, useRef } from "react";
import {
  ChefHat,
  Search,
  Coffee,
  Apple,
  Utensils,
  Pizza,
  Cake,
  LucideIcon,
} from "lucide-react";

interface FloatingIconProps {
  Icon: LucideIcon;
  initialPosition: { x: number; y: number };
  speed: { x: number; y: number };
}

const BouncingIcon = ({ Icon, initialPosition, speed }: FloatingIconProps) => {
  const iconRef = useRef<HTMLDivElement>(null);
  const positionRef = useRef(initialPosition);
  const speedRef = useRef(speed);

  useEffect(() => {
    let animationFrameId: number;
    const containerWidth = 100;
    const iconSize = 32;

    const getWaveY = (x: number) => {
      const amplitude = 15;
      const frequency = 0.02;
      return 85 - Math.sin(x * frequency) * amplitude;
    };

    const updatePosition = () => {
      if (!iconRef.current) return;

      let newX = positionRef.current.x + speedRef.current.x;
      let newY = positionRef.current.y + speedRef.current.y;

      if (
        newX <= 0 ||
        newX >= containerWidth - (iconSize / window.innerWidth) * 100
      ) {
        speedRef.current.x *= -1;
        newX = positionRef.current.x + speedRef.current.x;
      }

      if (newY <= 0) {
        speedRef.current.y *= -1;
        newY = 0;
      }

      const waveY = getWaveY(newX);
      if (newY >= waveY - (iconSize / window.innerHeight) * 100) {
        speedRef.current.y *= -1;
        newY = waveY - (iconSize / window.innerHeight) * 100;
      }

      positionRef.current = { x: newX, y: newY };

      const rotation =
        Math.atan2(speedRef.current.y, speedRef.current.x) * (180 / Math.PI);
      iconRef.current.style.transform = `rotate(${rotation}deg)`;
      iconRef.current.style.left = `${newX}%`;
      iconRef.current.style.top = `${newY}%`;

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <div
      ref={iconRef}
      className="absolute"
      style={{
        left: `${initialPosition.x}%`,
        top: `${initialPosition.y}%`,
        transition: "transform 0.3s ease-out",
      }}
    >
      <Icon className="w-8 h-8 text-orange-400 opacity-30" />
    </div>
  );
};

const Header = () => {
  const icons = [
    { Icon: Coffee, pos: { x: 10, y: 20 }, speed: { x: 0.08, y: 0.05 } },
    { Icon: Apple, pos: { x: 70, y: 30 }, speed: { x: -0.07, y: 0.06 } },
    { Icon: Utensils, pos: { x: 30, y: 50 }, speed: { x: 0.09, y: -0.07 } },
    { Icon: Pizza, pos: { x: 50, y: 15 }, speed: { x: -0.06, y: 0.08 } },
    { Icon: Cake, pos: { x: 80, y: 40 }, speed: { x: -0.08, y: -0.06 } },
  ];

  return (
    <div className="relative bg-gradient-to-b from-orange-50/80 to-orange-100/50">
      <div className="absolute inset-0 overflow-hidden">
        {icons.map((icon, index) => (
          <BouncingIcon
            key={index}
            Icon={icon.Icon}
            initialPosition={icon.pos}
            speed={icon.speed}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto px-4 pt-8">
        <div className="flex flex-col items-center space-y-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500/20 rounded-full blur-xl"></div>
              <div className="relative bg-white p-4 rounded-full shadow-lg">
                <ChefHat className="w-12 h-12 text-orange-500" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-orange-500">
              Recipe Explorer
            </h1>
          </div>

          <div className="flex items-center gap-2 text-gray-600">
            <p className="text-xl">
              Discover delicious recipes for any occasion
            </p>
            <Search className="w-5 h-5" />
          </div>

          <div className="flex gap-4 pt-4 pb-16">
            {["Quick & Easy", "Healthy Options", "Global Cuisine"].map(
              (feature) => (
                <div
                  key={feature}
                  className="px-6 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all
                          text-sm font-medium text-orange-800 border border-orange-100/50"
                >
                  {feature}
                </div>
              )
            )}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <svg
          className="w-full h-12"
          viewBox="0 0 1440 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            d="M0 32C240 0 480 64 720 32C960 0 1200 64 1440 32V64H0V32Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};

export default Header;
