import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Shield, 
  Lock, 
  CheckCircle, 
  Globe, 
  Database, 
  Key, 
  FileCheck, 
  Users, 
  AlertTriangle,
  Download,
  ExternalLink,
  Clock,
  MapPin
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useSound } from './SoundManager';

interface SecurityTrustCenterProps {
  isVisible: boolean;
  onClose: () => void;
}

export function SecurityTrustCenter({ isVisible, onClose }: SecurityTrustCenterProps) {
  const { playSound } = useSound();
  const [activeTab, setActiveTab] = useState('compliance');

  if (!isVisible) return null;

  const securityCertifications = [
    {
      name: "SOC 2 Type II",
      status: "Certified",
      description: "Annual third-party security audits",
      icon: <Shield className="h-6 w-6" />,
      color: "text-green-400"
    },
    {
      name: "GDPR Compliant",
      status: "Verified",
      description: "European data protection standards",
      icon: <Globe className="h-6 w-6" />,
      color: "text-blue-400"
    },
    {
      name: "ISO 27001",
      status: "Certified",
      description: "Information security management",
      icon: <FileCheck className="h-6 w-6" />,
      color: "text-purple-400"
    },
    {
      name: "CCPA Compliant",
      status: "Verified",
      description: "California privacy protection",
      icon: <Users className="h-6 w-6" />,
      color: "text-orange-400"
    }
  ];

  const dataProtection = [
    {
      title: "256-bit AES Encryption",
      description: "Bank-grade encryption for all data in transit and at rest",
      icon: <Lock className="h-5 w-5" />
    },
    {
      title: "Zero-Trust Architecture",
      description: "Every access request verified and authenticated",
      icon: <Key className="h-5 w-5" />
    },
    {
      title: "Automated Backups",
      description: "Real-time backups with 99.99% uptime guarantee",
      icon: <Database className="h-5 w-5" />
    },
    {
      title: "Disaster Recovery",
      description: "Sub-15 minute recovery time objectives",
      icon: <Clock className="h-5 w-5" />
    }
  ];

  const dataResidency = [
    { region: "United States", locations: ["Virginia", "Oregon", "Texas"], flag: "🇺🇸" },
    { region: "European Union", locations: ["Ireland", "Germany", "Netherlands"], flag: "🇪🇺" },
    { region: "Asia Pacific", locations: ["Singapore", "Tokyo", "Sydney"], flag: "🌏" },
    { region: "Canada", locations: ["Toronto", "Montreal"], flag: "🇨🇦" }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-slate-900 rounded-2xl border border-white/10 max-w-6xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Security & Trust Center</h2>
              <p className="text-gray-300">Enterprise-grade security for your business empire</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => {
                playSound('tick');
                onClose();
              }}
              className="text-gray-400 hover:text-white"
            >
              ✕
            </Button>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-white/5">
              <TabsTrigger value="compliance" className="text-white data-[state=active]:bg-orange-500">
                Compliance
              </TabsTrigger>
              <TabsTrigger value="security" className="text-white data-[state=active]:bg-blue-500">
                Security
              </TabsTrigger>
              <TabsTrigger value="privacy" className="text-white data-[state=active]:bg-purple-500">
                Privacy
              </TabsTrigger>
              <TabsTrigger value="infrastructure" className="text-white data-[state=active]:bg-green-500">
                Infrastructure
              </TabsTrigger>
            </TabsList>

            <TabsContent value="compliance" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-4">Security Certifications</h3>
                  {securityCertifications.map((cert, index) => (
                    <Card key={index} className="bg-white/5 border-white/10">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className={cert.color}>
                            {cert.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-semibold text-white">{cert.name}</h4>
                              <Badge className="bg-green-500/20 text-green-400">
                                {cert.status}
                              </Badge>
                            </div>
                            <p className="text-gray-300 text-sm">{cert.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-white mb-4">Audit Reports</h3>
                  <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-white">SOC 2 Type II Report</h4>
                            <p className="text-gray-300 text-sm">Annual security audit by independent firm</p>
                          </div>
                          <Button variant="outline" size="sm" className="border-white/20 text-white">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-white">Penetration Test Report</h4>
                            <p className="text-gray-300 text-sm">Quarterly security vulnerability assessment</p>
                          </div>
                          <Button variant="outline" size="sm" className="border-white/20 text-white">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-semibold text-white">GDPR Compliance Certificate</h4>
                            <p className="text-gray-300 text-sm">EU data protection verification</p>
                          </div>
                          <Button variant="outline" size="sm" className="border-white/20 text-white">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="security" className="mt-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-6">Data Protection</h3>
                  <div className="space-y-4">
                    {dataProtection.map((item, index) => (
                      <Card key={index} className="bg-white/5 border-white/10">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="text-blue-400">
                              {item.icon}
                            </div>
                            <div>
                              <h4 className="font-semibold text-white mb-1">{item.title}</h4>
                              <p className="text-gray-300 text-sm">{item.description}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-6">Security Monitoring</h3>
                  <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-white">24/7 Security Operations Center</span>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-green-400 text-sm">Active</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white">Threat Detection & Response</span>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-green-400 text-sm">Monitoring</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white">Automated Security Updates</span>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-green-400 text-sm">Enabled</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-white">Incident Response Team</span>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-green-400 text-sm">Ready</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="privacy" className="mt-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-6">Privacy Commitments</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="p-6 text-center">
                        <Users className="h-8 w-8 text-blue-400 mx-auto mb-4" />
                        <h4 className="font-semibold text-white mb-2">No Data Selling</h4>
                        <p className="text-gray-300 text-sm">We never sell or share your business data with third parties</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="p-6 text-center">
                        <Key className="h-8 w-8 text-green-400 mx-auto mb-4" />
                        <h4 className="font-semibold text-white mb-2">Data Ownership</h4>
                        <p className="text-gray-300 text-sm">You retain full ownership and control of all your data</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="p-6 text-center">
                        <Shield className="h-8 w-8 text-purple-400 mx-auto mb-4" />
                        <h4 className="font-semibold text-white mb-2">Right to Delete</h4>
                        <p className="text-gray-300 text-sm">Complete data deletion available upon request</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-6">Data Processing</h3>
                  <Card className="bg-white/5 border-white/10">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <span className="text-white">Data processed only for platform functionality</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <span className="text-white">AI training uses anonymized, aggregated data only</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <span className="text-white">Full audit trails for all data access</span>
                        </div>
                        <div className="flex items-center gap-4">
                          <CheckCircle className="h-5 w-5 text-green-400" />
                          <span className="text-white">Automatic data retention policy enforcement</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="infrastructure" className="mt-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-6">Global Data Centers</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {dataResidency.map((region, index) => (
                      <Card key={index} className="bg-white/5 border-white/10">
                        <CardContent className="p-6">
                          <div className="flex items-center gap-3 mb-4">
                            <span className="text-2xl">{region.flag}</span>
                            <h4 className="font-semibold text-white">{region.region}</h4>
                          </div>
                          <div className="space-y-2">
                            {region.locations.map((location, locIndex) => (
                              <div key={locIndex} className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-blue-400" />
                                <span className="text-gray-300">{location}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-6">Uptime Guarantees</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-green-400 mb-2">99.99%</div>
                        <div className="text-white font-semibold mb-1">Platform Uptime</div>
                        <div className="text-gray-300 text-sm">SLA with financial penalties</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-blue-400 mb-2">&lt;15min</div>
                        <div className="text-white font-semibold mb-1">Recovery Time</div>
                        <div className="text-gray-300 text-sm">Disaster recovery objective</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-white/5 border-white/10">
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                        <div className="text-white font-semibold mb-1">Support</div>
                        <div className="text-gray-300 text-sm">Always available for enterprise</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-8 p-6 bg-gradient-to-r from-orange-500/20 to-blue-500/20 rounded-xl border border-orange-400/30">
            <div className="flex items-center gap-4">
              <Shield className="h-8 w-8 text-orange-400" />
              <div>
                <h4 className="font-semibold text-white mb-1">Enterprise Security Guarantee</h4>
                <p className="text-gray-300 text-sm">
                  Your business empire is protected by the same security standards used by Fortune 500 companies. 
                  Every tier includes enterprise-grade security at no additional cost.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
