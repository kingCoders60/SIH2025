
import React from "react";
import { Separator } from "@radix-ui/react-separator";
import FooterLogo from "./FooterLogo";
import { Github, Twitter, Linkedin } from "lucide-react";

const currentYear = new Date().getFullYear();

const navLinks = [
  {
    title: "Platform",
    links: [
      { name: "Features", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Drills", href: "#" },
      { name: "Alerts", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "#" },
      { name: "Blog", href: "#" },
      { name: "Support Center", href: "#" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
    ],
  },
];

const socialLinks = [
  { icon: Github, label: "GitHub", href: "#" },
  { icon: Twitter, label: "Twitter/X", href: "#" },
  { icon: Linkedin, label: "LinkedIn", href: "#" },
];

const ShadcnFooter = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-200 mt-12">
      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row gap-10 md:gap-0 items-center md:items-start justify-between">
        {/* Left: Logo & Name */}
        <div className="flex flex-col items-center md:items-start gap-3 md:w-1/4">
          <div className="flex items-center gap-2">
            <FooterLogo />
            <span className="font-bold text-lg md:text-xl text-gray-900">Disaster Preparedness Platform</span>
          </div>
        </div>
        {/* Middle: Navigation Columns */}
        <div className="flex flex-col sm:flex-row justify-center items-center md:items-start gap-8 md:w-2/4 w-full">
          {navLinks.map((col, idx) => (
            <div key={col.title} className="flex flex-col items-center md:items-start">
              <span className="font-semibold text-gray-700 mb-2 text-sm">{col.title}</span>
              {col.links.map(link => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-primary-600 transition-colors mb-1"
                >
                  {link.name}
                </a>
              ))}
            </div>
          ))}
        </div>
        {/* Right: Social Links */}
        <div className="flex flex-row gap-4 md:w-1/4 justify-center md:justify-end items-center">
          {socialLinks.map(({ icon: Icon, label, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="text-muted-foreground hover:text-primary-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon className="w-6 h-6" />
            </a>
          ))}
        </div>
      </div>
      {/* Bottom Bar */}
      <Separator className="bg-gray-200" />
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
        <div className="mb-2 md:mb-0 text-center md:text-left">
          &copy; {currentYear} Disaster Preparedness Platform. All Rights Reserved.
        </div>
        <div className="text-center md:text-right">
          Made with <span className="text-red-500">❤️</span> in Bhubaneswar, India
        </div>
      </div>
    </footer>
  );
};

export default ShadcnFooter;
