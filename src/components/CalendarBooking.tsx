import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react';

export function CalendarBooking() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessType: '',
    message: ''
  });

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM'
  ];

  const businessTypes = [
    'E-commerce', 'SaaS', 'Consulting', 'Digital Marketing', 'Real Estate', 
    'Healthcare', 'Education', 'Manufacturing', 'Other'
  ];

  // Generate next 14 days for booking
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            month: 'long', 
            day: 'numeric' 
          })
        });
      }
    }
    return dates;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create Google Calendar URL
    const startDateTime = new Date(`${selectedDate} ${selectedTime}`);
    const endDateTime = new Date(startDateTime.getTime() + 30 * 60000); // 30 minutes later
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Optimus Auto AI Strategy Call&dates=${startDateTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z/${endDateTime.toISOString().replace(/[-:]/g, '').split('.')[0]}Z&details=Strategy call with ${formData.name} (${formData.email})%0A%0ABusiness Type: ${formData.businessType}%0A%0AMessage: ${formData.message}&location=Video Call`;
    
    // Also send data to team email (in real app, this would be an API call)
    const emailBody = `New strategy call booking:
    
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Business Type: ${formData.businessType}
Preferred Date: ${selectedDate}
Preferred Time: ${selectedTime}
Message: ${formData.message}

Calendar Link: ${calendarUrl}`;

    // Open email client
    window.open(`mailto:Team@optimusautoai.com?subject=New Strategy Call Booking - ${formData.name}&body=${encodeURIComponent(emailBody)}`);
    
    // Open Google Calendar
    window.open(calendarUrl, '_blank');
    
    alert('Your booking request has been sent! Please check your email for confirmation.');
  };

  return (
    <Card className="glass-dark text-white">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="h-6 w-6 text-orange-400" />
          <h3 className="text-2xl font-bold">Book Your Strategy Call</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-white">Full Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="email" className="text-white">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="phone" className="text-white">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="pl-10 bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
            
            <div>
              <Label htmlFor="business" className="text-white">Business Type</Label>
              <Select onValueChange={(value) => setFormData({...formData, businessType: value})}>
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent>
                  {businessTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date" className="text-white">Preferred Date *</Label>
              <Select onValueChange={setSelectedDate} required>
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="Choose a date" />
                </SelectTrigger>
                <SelectContent>
                  {getAvailableDates().map(date => (
                    <SelectItem key={date.value} value={date.value}>
                      {date.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="time" className="text-white">Preferred Time *</Label>
              <Select onValueChange={setSelectedTime} required>
                <SelectTrigger className="bg-white/20 border-white/30 text-white">
                  <SelectValue placeholder="Choose a time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map(time => (
                    <SelectItem key={time} value={time}>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        {time}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="message" className="text-white">Tell us about your goals</Label>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="pl-10 bg-white/20 border-white/30 text-white resize-none placeholder:text-gray-300"
                placeholder="What are your biggest business challenges? What would you like to achieve with Optimus Auto AI?"
                rows={4}
              />
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500/15 to-orange-500/15 border border-blue-400/40 rounded-lg p-4">
            <h4 className="font-semibold text-orange-400 mb-3">What to Expect:</h4>
            <ul className="text-sm space-y-2">
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 bg-orange-400 rounded-full flex-shrink-0"></div>
                <span className="font-medium text-orange-300">30-minute personalized consultation</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 bg-orange-400 rounded-full flex-shrink-0"></div>
                <span className="font-medium text-orange-300">Custom empire-building strategy</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 bg-orange-400 rounded-full flex-shrink-0"></div>
                <span className="font-medium text-orange-300">ROI projections for your business</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 bg-orange-400 rounded-full flex-shrink-0"></div>
                <span className="font-medium text-orange-300">Live demo of Optimus Auto AI platform</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 bg-orange-400 rounded-full flex-shrink-0"></div>
                <span className="font-medium text-orange-300">Advanced communication systems walkthrough</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-2 w-2 bg-orange-400 rounded-full flex-shrink-0"></div>
                <span className="font-medium text-orange-300">Exclusive Beta pricing discussion</span>
              </li>
            </ul>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-6"
            disabled={!selectedDate || !selectedTime || !formData.name || !formData.email}
          >
            <Calendar className="mr-2 h-5 w-5" />
            Schedule My Strategy Call
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10 text-center text-sm text-gray-400">
          <p>Calls are scheduled in Central Time (CT)</p>
          <p>You'll receive a confirmation email within 2 hours</p>
        </div>
      </CardContent>
    </Card>
  );
}