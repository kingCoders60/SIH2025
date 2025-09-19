import { Link } from "react-router-dom";
import {
  Shield,
  BookOpen,
  Target,
  Users,
  AlertTriangle,
  Award,
} from "lucide-react";
import ShadcnFooter from "../components/ShadcnFooter";
import Testimonials from "../components/Testimonials";

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Interactive Learning",
      description:
        "Comprehensive disaster preparedness modules tailored to your region",
    },
    {
      icon: Target,
      title: "Drill Simulations",
      description:
        "Practice emergency procedures with realistic drill scenarios",
    },
    {
      icon: Award,
      title: "Gamification",
      description: "Earn badges, XP points, and compete on leaderboards",
    },
    {
      icon: AlertTriangle,
      title: "Real-time Alerts",
      description: "Stay informed with emergency notifications and updates",
    },
    {
      icon: Users,
      title: "Community",
      description: "Connect with students, teachers, and emergency responders",
    },
    {
      icon: Shield,
      title: "Safety First",
      description: "Evidence-based content from disaster management experts",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <section
        className="relative w-full min-h-screen text-white bg-cover bg-center bg-no-repeat flex items-center justify-center"
        style={{
          backgroundImage: "url('/diaster.gif')",
        }}>
        <div className="absolute inset-0 bg-black/60"></div>

        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Be Prepared, Stay Safe
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-primary-100">
            Master disaster preparedness through interactive learning, realistic
            drills, and community engagement. Your safety education starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/login"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors text-black">
              Get Started
            </Link>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-black transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      <Testimonials />

      <section className="py-20 bg-gray-100 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Ready to Start Your Safety Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of students, teachers, and communities building
            resilience through education and preparation.
          </p>
          <Link
            to="/login"
            className="btn-primary text-lg px-8 py-4 inline-block">
            Join Now – It's Free
          </Link>
        </div>
      </section>

      <ShadcnFooter />
    </div>
  );
};

export default Home;
