"use client";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import AlertCard from "../components/alerts/AlertCard";
import ContactCard from "../components/alerts/ContactCard";
import {
  emergencyContacts,
  alertFilters,
  contactFilters,
} from "../data/alertsData";
import {
  AlertTriangle,
  Phone,
  Search,
  Filter,
  Bell,
  Users,
} from "lucide-react";

const Alerts = () => {
  const [activeTab, setActiveTab] = useState("alerts");
  const [alertFilter, setAlertFilter] = useState("all");
  const [contactFilter, setContactFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [alerts, setAlerts] = useState([]);

  // The useEffect hook must be inside the component function
  // Empty dependency array ensures it runs only once on mount
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/alerts");
        const mapped = res.data.map((alert) => ({
          id: alert._id,
          title: alert.type || "Untitled Alert",
          description: alert.message || "No description provided",
          severity: alert.severity?.toLowerCase() || "low",
          region: alert.region || "Unknown",
          source: alert.source || "Unknown",
          timestamp: alert.timestamp || new Date().toISOString(),
          status: alert.status || "Active",
        }));
        setAlerts(mapped);
      } catch (err) {
        console.error("❌ Failed to fetch alerts:", err.message);
      }
    };

    fetchAlerts();
  }, []);

  const handleDismissAlert = (alertId) => {
    setAlerts(alerts.filter((alert) => alert.id !== alertId));
  };

  const filteredAlerts = alerts.filter((alert) => {
    const matchesFilter =
      alertFilter === "all" || alert.severity === alertFilter;
    const matchesSearch =
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const filteredContacts = emergencyContacts.filter((contact) => {
    const matchesFilter =
      contactFilter === "all" || contact.type === contactFilter;
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const criticalAlerts = alerts.filter(
    (alert) => alert.severity === "critical"
  ).length;
  const highPriorityContacts = emergencyContacts.filter(
    (contact) => contact.priority === "high"
  ).length;

  const tabs = [
    {
      id: "alerts",
      label: "Emergency Alerts",
      icon: AlertTriangle,
      count: alerts.length,
    },
    {
      id: "contacts",
      label: "Emergency Contacts",
      icon: Phone,
      count: emergencyContacts.length,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Emergency Center
          </h1>
          <p className="text-gray-600">
            Stay informed with real-time alerts and emergency contact
            information
          </p>
        </div>

        {/* Critical Alert Banner */}
        {criticalAlerts > 0 && (
          <div className="mb-6 bg-red-600 text-white rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-6 h-6 animate-pulse" />
              <div>
                <h3 className="font-semibold">Critical Alert Active</h3>
                <p className="text-sm opacity-90">
                  {criticalAlerts} critical alert{criticalAlerts > 1 ? "s" : ""}{" "}
                  requiring immediate attention
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-red-100 rounded-lg">
                <Bell className="w-6 h-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Alerts</p>
                <p className="text-2xl font-bold text-gray-900">
                  {alerts.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-orange-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Critical Alerts</p>
                <p className="text-2xl font-bold text-gray-900">
                  {criticalAlerts}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Priority Contacts</p>
                <p className="text-2xl font-bold text-gray-900">
                  {highPriorityContacts}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm border">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-md font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-500 text-white shadow-sm"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}>
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    activeTab === tab.id
                      ? "bg-white bg-opacity-20"
                      : "bg-gray-100 text-gray-600"
                  }`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-lg p-4 shadow-sm border mb-6">
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder={`Search ${
                  activeTab === "alerts" ? "alerts" : "contacts"
                }...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={activeTab === "alerts" ? alertFilter : contactFilter}
                onChange={(e) =>
                  activeTab === "alerts"
                    ? setAlertFilter(e.target.value)
                    : setContactFilter(e.target.value)
                }
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                {(activeTab === "alerts" ? alertFilters : contactFilters).map(
                  (filter) => (
                    <option key={filter.value} value={filter.value}>
                      {filter.label}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        {activeTab === "alerts" && (
          <div className="space-y-4">
            {filteredAlerts.length > 0 ? (
              filteredAlerts
                .sort((a, b) => {
                  const severityOrder = {
                    critical: 4,
                    high: 3,
                    medium: 2,
                    low: 1,
                  };
                  return severityOrder[b.severity] - severityOrder[a.severity];
                })
                .map((alert) => (
                  <AlertCard
                    key={alert.id}
                    alert={alert}
                    onDismiss={handleDismissAlert}
                  />
                ))
            ) : (
              <div className="bg-white rounded-lg p-12 text-center shadow-sm border">
                <AlertTriangle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Alerts Found
                </h3>
                <p className="text-gray-600">
                  {searchTerm || alertFilter !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "No active alerts at this time. Stay prepared!"}
                </p>
              </div>
            )}
          </div>
        )}

        {activeTab === "contacts" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredContacts.length > 0 ? (
              filteredContacts
                .sort((a, b) => {
                  if (a.priority === "high" && b.priority !== "high") return -1;
                  if (b.priority === "high" && a.priority !== "high") return 1;
                  return a.name.localeCompare(b.name);
                })
                .map((contact) => (
                  <ContactCard key={contact.id} contact={contact} />
                ))
            ) : (
              <div className="col-span-2 bg-white rounded-lg p-12 text-center shadow-sm border">
                <Phone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No Contacts Found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Alerts;
