// Full revised App.tsx with CTA section for Free Checklist

import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { ArrowRight, Bot, Zap, Users, BarChart3, ChevronDown, Brain, BarChart2, MessageSquare, Code2, X, FileSpreadsheet, GitCompare, Database, LineChart } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import Solutions from './components/Solutions';
import About from './components/About';
import Contact from './components/Contact';

function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    contact_name: '',
    email: '',
    phone: '',
    company_name: '',
    company_size: '',
    service_interests: [] as string[],
    budget_range: '',
    project_timeline: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceInterestChange = (service: string) => {
    setFormData(prev => {
      const currentInterests = prev.service_interests;
      const newInterests = currentInterests.includes(service)
        ? currentInterests.filter(s => s !== service)
        : [...currentInterests, service];

      return {
        ...prev,
        service_interests: newInterests
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.service_interests.length === 0) {
      toast.error('Please select at least one service of interest');
      return;
    }

    setIsSubmitting(true);

    try {
      const formattedData = {
        _subject: `New Business Inquiry from ${formData.contact_name} at ${formData.company_name}`,
        _template: 'table',
        Contact_Information: {
          Name: formData.contact_name,
          Email: formData.email,
          Phone: formData.phone || 'Not provided'
        },
        Company_Information: {
          Company_Name: formData.company_name,
          Company_Size: formData.company_size || 'Not specified'
        },
        Project_Details: {
          Services_of_Interest: formData.service_interests.join(', '),
          Budget_Range: formData.budget_range || 'Not specified',
          Project_Timeline: formData.project_timeline || 'Not specified'
        }
      };

      const response = await fetch('https://formsubmit.co/ajax/toddbrannon@trusponse.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formattedData)
      });

      const responseData = await response.json().catch(() => null);

      if (!response.ok) {
        console.error('Form submission failed:', {
          status: response.status,
          statusText: response.statusText,
          responseData
        });
        throw new Error(`Failed to submit form: ${response.status} ${response.statusText}`);
      }

      toast.success("Thank you for your submission! We'll be in touch soon.");
      setIsModalOpen(false);
      setFormData({
        contact_name: '',
        email: '',
        phone: '',
        company_name: '',
        company_size: '',
        service_interests: [],
        budget_range: '',
        project_timeline: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error(error instanceof Error ? error.message : 'There was an error submitting your form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  const services = [
    {
      id: 'excel-automation',
      label: 'Excel Automation',
      description: 'Transform manual spreadsheet and data workflows into automated solutions'
    },
    {
      id: 'reporting-dashboards',
      label: 'Reporting & Dashboards',
      description: 'Automated reports and interactive business dashboards'
    },
    {
      id: 'data-integration',
      label: 'Data Integration',
      description: 'Connect and automate data from multiple sources'
    },
    {
      id: 'custom-software',
      label: 'Custom Software Solutions',
      description: 'Scale beyond Excel with tailored applications'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Toaster position="top-right" />

      {/* Hero Section */}
      <section className="pt-32 pb-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Transform Your Excel Workflows into Powerful Business Solutions
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              From automated Excel templates to custom software applications, we help businesses escape manual processes and embrace efficient, scalable solutions.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center"
              >
                Automate Your Business
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button 
                onClick={() => window.open('https://checklist.trusponse.com', '_blank')}
                className="bg-white text-gray-800 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-gray-200 hover:border-blue-400 transition flex items-center justify-center"
              >
                Get Free Checklist
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Checklist CTA Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Are Your Spreadsheets Costing You Time & Money?
          </h3>
          <p className="text-lg text-gray-700 mb-6">
            Download our free checklist to discover automation opportunities that can save hours and boost accuracy.
          </p>
          <a 
            href="https://checklist.trusponse.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition"
          >
            Get the Free Checklist
          </a>
        </div>
      </section>

      {/* Rest of your content... */}
    </div>
  );
}

function App() {
  return (
    <>
      <nav className="fixed w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <Bot className="h-8 w-8 text-blue-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">TruSponse</span>
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/solutions" className="text-gray-600 hover:text-gray-900">Solutions</Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900">About</Link>
              <Link to="/contact" className="text-gray-600 hover:text-gray-900">Contact</Link>
              <a href="https://checklist.trusponse.com" className="text-gray-600 hover:text-blue-600 font-semibold">
                Free Checklist
              </a>
              <button 
                onClick={() => window.location.href = '/'}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
}

export default App;
