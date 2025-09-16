import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BookOpen, Target, Award, AlertTriangle, Users, Shield } from "lucide-react";

const features = [
  { icon: BookOpen, title: "Interactive Learning", description: "Comprehensive disaster preparedness modules tailored to your region" },
  { icon: Target, title: "Drill Simulations", description: "Practice emergency procedures with realistic drill scenarios" },
  { icon: Award, title: "Gamification", description: "Earn badges, XP points, and compete on leaderboards" },
  { icon: AlertTriangle, title: "Real-time Alerts", description: "Stay informed with emergency notifications and updates" },
  { icon: Users, title: "Community", description: "Connect with students, teachers, and emergency responders" },
  { icon: Shield, title: "Safety First", description: "Evidence-based content from disaster management experts" },
];

const Testimonials = () => (
  <section className="max-w-7xl mx-auto px-4 py-16">
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Comprehensive Disaster Preparedness</h2>
      <p className="text-lg text-muted-foreground text-white">
        Our platform combines education, practice, and community to create the most effective disaster
        preparedness experience.
      </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map(({ icon: Icon, title, description }, idx) => (
        <motion.div
          key={title}
          whileHover={{
            scale: 1.03,
            boxShadow: "0 8px 32px rgba(37,99,235,0.12)",
            borderColor: "#2563eb"
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <Card className="group transition-all duration-200 border border-gray-200 hover:border-primary-600 hover:shadow-lg">
            <CardHeader className="flex flex-col items-center justify-center">
              <motion.div
                whileHover={{ scale: 1.2, rotate: 8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="mb-4"
              >
                <Icon className="w-12 h-12 text-primary-600" />
              </motion.div>
              <CardTitle className="text-center">{title}</CardTitle>
              <CardDescription className="text-center">{description}</CardDescription>
            </CardHeader>
          </Card>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Testimonials;
