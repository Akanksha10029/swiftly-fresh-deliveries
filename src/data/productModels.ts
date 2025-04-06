
export interface ProductModel {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: string;
  color: string;
  type: '3d-cube' | '3d-sphere' | '3d-laptop' | '3d-phone';
  position: [number, number, number];
  features: string[];
}

export const productModels: ProductModel[] = [
  {
    id: "smart-cube",
    name: "SmartCube",
    description: "AI-powered inventory management",
    longDescription: "Our SmartCube uses advanced AI to track and manage your grocery inventory, automatically reordering items when they run low and suggesting recipes based on what you have.",
    icon: "📊",
    color: "#4ade80",
    type: "3d-cube",
    position: [-2.5, 0, 0],
    features: [
      "Automated inventory tracking",
      "Smart reordering system",
      "Recipe suggestions based on inventory",
      "Expiration date tracking",
      "Voice-controlled interface"
    ]
  },
  {
    id: "fresh-tracker",
    name: "FreshTracker",
    description: "Monitor freshness of produce",
    longDescription: "The FreshTracker uses specialized sensors to monitor the freshness of your fruits and vegetables, sending alerts when items are about to spoil and suggesting ways to use them.",
    icon: "🥦",
    color: "#34d399",
    type: "3d-sphere",
    position: [0, 1, 0],
    features: [
      "Real-time freshness monitoring",
      "Spoilage alerts and notifications",
      "Produce-specific storage recommendations",
      "Recipe suggestions for ripening produce",
      "Temperature and humidity sensors"
    ]
  },
  {
    id: "delivery-dashboard",
    name: "Delivery Dashboard",
    description: "Track orders in real-time",
    longDescription: "Our Delivery Dashboard gives you complete control over your deliveries with real-time tracking, customizable delivery windows, and instant communication with your delivery person.",
    icon: "💻",
    color: "#0ea5e9",
    type: "3d-laptop",
    position: [0, -1.5, 0],
    features: [
      "Real-time delivery tracking",
      "Live map integration",
      "Delivery time estimates",
      "Instant messenger with delivery personnel",
      "Delivery history and analytics"
    ]
  },
  {
    id: "swift-app",
    name: "SwiftFresh App",
    description: "Order groceries on the go",
    longDescription: "The SwiftFresh mobile app puts our entire grocery catalog in your pocket, with personalized recommendations, easy reordering, and exclusive mobile-only deals and promotions.",
    icon: "📱",
    color: "#3b82f6",
    type: "3d-phone",
    position: [2, 0, 0],
    features: [
      "One-tap reordering",
      "Personalized recommendations",
      "Mobile-exclusive deals",
      "Voice search capability",
      "Barcode scanning for easy additions"
    ]
  }
];
