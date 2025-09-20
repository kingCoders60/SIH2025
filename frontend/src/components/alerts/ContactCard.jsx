import { Phone, Mail, MapPin, Clock, ExternalLink } from "lucide-react"

const ContactCard = ({ contact }) => {
  const getServiceIcon = (type) => {
    const icons = {
      emergency: "🚨",
      medical: "🏥",
      fire: "🚒",
      police: "👮",
      utility: "⚡",
      government: "🏛️",
      shelter: "🏠",
      support: "🤝",
    }
    return icons[type] || "📞"
  }

  const getServiceColor = (type) => {
    const colors = {
      emergency: "from-red-500 to-red-600",
      medical: "from-blue-500 to-blue-600",
      fire: "from-orange-500 to-orange-600",
      police: "from-indigo-500 to-indigo-600",
      utility: "from-yellow-500 to-yellow-600",
      government: "from-gray-500 to-gray-600",
      shelter: "from-green-500 to-green-600",
      support: "from-purple-500 to-purple-600",
    }
    return colors[type] || "from-gray-500 to-gray-600"
  }

  return (
    <div className="bg-card rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start space-x-4">
        <div className={`p-3 rounded-lg bg-gradient-to-r ${getServiceColor(contact.type)} text-white text-2xl`}>
          {getServiceIcon(contact.type)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">{contact.name}</h3>
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">{contact.type}</span>
          </div>

          <p className="text-gray-600 mb-4">{contact.description}</p>

          <div className="space-y-2">
            {contact.phone && (
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-gray-400" />
                <a href={`tel:${contact.phone}`} className="text-blue-600 hover:text-blue-800 font-medium">
                  {contact.phone}
                </a>
                {contact.available24h && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">24/7</span>
                )}
              </div>
            )}

            {contact.email && (
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <a href={`mailto:${contact.email}`} className="text-blue-600 hover:text-blue-800">
                  {contact.email}
                </a>
              </div>
            )}

            {contact.address && (
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{contact.address}</span>
              </div>
            )}

            {contact.hours && (
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{contact.hours}</span>
              </div>
            )}

            {contact.website && (
              <div className="flex items-center space-x-2 text-sm">
                <ExternalLink className="w-4 h-4 text-gray-400" />
                <a
                  href={contact.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Visit Website
                </a>
              </div>
            )}
          </div>

          {contact.priority === "high" && (
            <div className="mt-3 flex items-center space-x-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm text-red-600 font-medium">Priority Contact</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ContactCard
