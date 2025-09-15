import React from 'react';
import { motion } from 'motion/react';
import { 
  Mail, Phone, MapPin, Globe, Twitter, Linkedin, 
  Youtube, Crown, Star, Shield, Award, Zap 
} from 'lucide-react';
import optimusLogo from 'figma:asset/4101bd8920ce09aecc73a8ec1b5a69c8c3327fa2.png';

const footerLinks = {
  platform: [
    { name: "Empire Builder", href: "#" },
    { name: "AI Apps Suite", href: "#" },
    { name: "Business Intelligence", href: "#" },
    { name: "Strategic Assessment", href: "#" },
    { name: "Premium Features", href: "#" }
  ],
  company: [
    { name: "About Optimus", href: "#" },
    { name: "Leadership Team", href: "#" },
    { name: "Success Stories", href: "#" },
    { name: "Partner Program", href: "#" },
    { name: "Careers", href: "#" }
  ],
  resources: [
    { name: "Empire Academy", href: "#" },
    { name: "Strategy Guides", href: "#" },
    { name: "API Documentation", href: "#" },
    { name: "Support Center", href: "#" },
    { name: "Community Forum", href: "#" }
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "Compliance", href: "#" },
    { name: "Security", href: "#" }
  ]
};

const socialLinks = [
  { icon: <Twitter className="h-5 w-5" />, href: "#", name: "Twitter" },
  { icon: <Linkedin className="h-5 w-5" />, href: "#", name: "LinkedIn" },
  { icon: <Youtube className="h-5 w-5" />, href: "#", name: "YouTube" }
];

const certifications = [
  { icon: <Shield className="h-6 w-6" />, name: "SOC 2 Certified" },
  { icon: <Award className="h-6 w-6" />, name: "ISO 27001" },
  { icon: <Star className="h-6 w-6" />, name: "G2 Leader" },
  { icon: <Crown className="h-6 w-6" />, name: "Enterprise Grade" }
];

export function EnhancedFooter() {
  return (
    <footer className="bg-slate-950 border-t border-white/10 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-6 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <img src={optimusLogo} alt="Optimus Auto AI" className="h-16 w-auto mb-6" />
              
              <h3 className="text-2xl font-bold text-white mb-4">
                The World's First BOSaaS Platform
              </h3>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                Revolutionizing how entrepreneurs build business empires through 
                AI-powered automation and strategic intelligence.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="h-5 w-5 text-orange-400" />
                  <a href="mailto:Team@optimusautoai.com" className="hover:text-orange-400 transition-colors">
                    Team@optimusautoai.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="h-5 w-5 text-blue-400" />
                  <a href="tel:918-293-3352" className="hover:text-blue-400 transition-colors">
                    918-293-3352
                  </a>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Globe className="h-5 w-5 text-purple-400" />
                  <span>Global Operations</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 mt-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-orange-500/20 transition-all duration-300"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-4 grid md:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="font-bold text-white mb-4">Platform</h4>
              <ul className="space-y-3">
                {footerLinks.platform.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-orange-400 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="font-bold text-white mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="font-bold text-white mb-4">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-purple-400 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-green-400 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-white/10 pt-8 mb-8"
        >
          <h4 className="text-center text-white font-semibold mb-6">
            Trusted by Fortune 500 Companies & Startups Worldwide
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div key={index} className="flex items-center justify-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="text-orange-400">{cert.icon}</div>
                <span className="text-gray-300 font-medium">{cert.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="text-gray-400 text-center md:text-left">
            <p>&copy; 2024 Optimus Auto AI. All rights reserved.</p>
            <p className="text-sm mt-1">
              Building the future of business automation, one empire at a time.
            </p>
          </div>

          <div className="flex items-center gap-2 text-gray-400">
            <Zap className="h-4 w-4 text-orange-400" />
            <span className="text-sm">Powered by Advanced AI</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}