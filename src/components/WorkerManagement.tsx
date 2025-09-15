import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { motion } from 'framer-motion';
import { useSound } from './SoundManager';
import {
  Users,
  Plus,
  Search,
  Filter,
  MoreVertical,
  Mail,
  Phone,
  Calendar,
  Clock,
  TrendingUp,
  Settings,
  Edit,
  Trash2,
  UserPlus,
  Activity
} from 'lucide-react';

interface Worker {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  lastActive: string;
  productivity: number;
  avatar?: string;
}

const mockWorkers: Worker[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@company.com',
    role: 'AI Specialist',
    department: 'Engineering',
    status: 'active',
    joinDate: '2024-01-15',
    lastActive: '2 hours ago',
    productivity: 95
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@company.com',
    role: 'Revenue Manager',
    department: 'Sales',
    status: 'active',
    joinDate: '2024-02-01',
    lastActive: '30 minutes ago',
    productivity: 88
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike@company.com',
    role: 'Growth Strategist',
    department: 'Marketing',
    status: 'inactive',
    joinDate: '2024-01-20',
    lastActive: '2 days ago',
    productivity: 76
  }
];

interface WorkerManagementProps {
  onClose?: () => void;
}

export function WorkerManagement({ onClose }: WorkerManagementProps) {
  const { playSound } = useSound();
  const [workers, setWorkers] = useState<Worker[]>(mockWorkers);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showAddWorker, setShowAddWorker] = useState(false);

  const filteredWorkers = workers.filter(worker => {
    const matchesSearch = worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         worker.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || worker.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const departments = ['all', ...new Set(workers.map(w => w.department))];

  const getStatusColor = (status: Worker['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400';
      case 'inactive': return 'bg-gray-500/20 text-gray-400';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getProductivityColor = (productivity: number) => {
    if (productivity >= 90) return 'text-green-400';
    if (productivity >= 75) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-slate-900 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Worker Management</h1>
            <p className="text-gray-400">Manage your team and track productivity</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => {
                playSound('tick');
                setShowAddWorker(true);
              }}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add Worker
            </Button>
            {onClose && (
              <Button
                variant="ghost"
                onClick={() => {
                  playSound('tick');
                  onClose();
                }}
                className="text-gray-400 hover:text-white"
              >
                Close
              </Button>
            )}
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Workers', value: workers.length, icon: <Users className="h-5 w-5" />, color: 'blue' },
            { label: 'Active Now', value: workers.filter(w => w.status === 'active').length, icon: <Activity className="h-5 w-5" />, color: 'green' },
            { label: 'Avg Productivity', value: `${Math.round(workers.reduce((acc, w) => acc + w.productivity, 0) / workers.length)}%`, icon: <TrendingUp className="h-5 w-5" />, color: 'orange' },
            { label: 'Departments', value: departments.length - 1, icon: <Settings className="h-5 w-5" />, color: 'purple' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/5 backdrop-blur-xl border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full bg-${stat.color}-500/20 text-${stat.color}-400`}>
                      {stat.icon}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Filters and Search */}
        <Card className="bg-white/5 backdrop-blur-xl border-white/10 mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search" className="text-white">Search Workers</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="search"
                    placeholder="Search by name, email, or role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="department" className="text-white">Department</Label>
                <select
                  id="department"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="w-full p-2 bg-white/10 border border-white/20 rounded-md text-white"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept} className="bg-slate-800">
                      {dept === 'all' ? 'All Departments' : dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Workers List */}
        <Card className="bg-white/5 backdrop-blur-xl border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="h-5 w-5" />
              Workers ({filteredWorkers.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-white/10">
                  <tr className="text-gray-400 text-sm">
                    <th className="text-left p-4">Worker</th>
                    <th className="text-left p-4">Role & Department</th>
                    <th className="text-left p-4">Status</th>
                    <th className="text-left p-4">Productivity</th>
                    <th className="text-left p-4">Last Active</th>
                    <th className="text-left p-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredWorkers.map((worker) => (
                    <motion.tr
                      key={worker.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-orange-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                            <span className="text-white font-semibold">
                              {worker.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p className="text-white font-medium">{worker.name}</p>
                            <p className="text-gray-400 text-sm">{worker.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-white font-medium">{worker.role}</p>
                        <p className="text-gray-400 text-sm">{worker.department}</p>
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusColor(worker.status)}>
                          {worker.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <span className={`font-bold ${getProductivityColor(worker.productivity)}`}>
                          {worker.productivity}%
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-gray-400 text-sm">{worker.lastActive}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => playSound('tick')}
                            className="text-gray-400 hover:text-white"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => playSound('tick')}
                            className="text-gray-400 hover:text-red-400"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => playSound('tick')}
                            className="text-gray-400 hover:text-white"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
