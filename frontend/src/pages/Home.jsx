import { Link } from "react-router-dom"
import { Shield, BookOpen, Target, Users, AlertTriangle, Award } from "lucide-react"

const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Interactive Learning",
      description: "Comprehensive disaster preparedness modules tailored to your region",
    },
    {
      icon: Target,
      title: "Drill Simulations",
      description: "Practice emergency procedures with realistic drill scenarios",
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
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">Be Prepared, Stay Safe</h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto text-pretty">
              Master disaster preparedness through interactive learning, realistic drills, and community engagement.
              Your safety education starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
              >
                Get Started
              </Link>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary-600 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Comprehensive Disaster Preparedness</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform combines education, practice, and community to create the most effective disaster
              preparedness experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div key={index} className="card hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center mb-4">
                    <div className="bg-primary-100 p-3 rounded-lg">
                      <Icon className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Ready to Start Your Safety Journey?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of students, teachers, and communities building resilience through education and preparation.
          </p>
          <Link to="/login" className="btn-primary text-lg px-8 py-4 inline-block">
            Join Now - It's Free
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
