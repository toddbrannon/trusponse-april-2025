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
      // Format the message for better email readability
      const formattedData = {
        _subject: New Business Inquiry from ${formData.contact_name} at ${formData.company_name},
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
        throw new Error(Failed to submit form: ${response.status} ${response.statusText});
      }
      
      toast.success('Thank you for your submission! We\'ll be in touch soon.');
      setIsModalOpen(false);
      
      // Reset form
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
                onClick={scrollToServices}
                className="bg-white text-gray-800 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-gray-200 hover:border-gray-300 transition flex items-center justify-center"
              >
                Explore Solutions
                <ChevronDown className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Business Solutions That Scale With You</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From optimizing Excel workflows to building custom applications, we provide solutions that grow with your business needs.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {[
              {
                icon: <FileSpreadsheet className="h-12 w-12 text-blue-600" />,
                title: "Excel Automation",
                description: "Transform complex Excel workflows into automated, error-free solutions that save hours of manual work.",
                features: ["Custom Excel Templates", "VBA Automation", "Formula Optimization"]
              },
              {
                icon: <LineChart className="h-12 w-12 text-blue-600" />,
                title: "Reporting & Analytics",
                description: "Automated reports and interactive dashboards that deliver real-time business insights.",
                features: ["Automated Reports", "Interactive Dashboards", "Data Visualization"]
              },
              {
                icon: <Database className="h-12 w-12 text-blue-600" />,
                title: "Data Integration",
                description: "Connect and automate data flow between Excel, databases, and other business systems.",
                features: ["Multi-source Integration", "Automated Updates", "Data Validation"]
              },
              {
                icon: <GitCompare className="h-12 w-12 text-blue-600" />,
                title: "Digital Transformation",
                description: "Graduate from Excel to custom software solutions when your business needs scale.",
                features: ["Web Applications", "Process Automation", "Cloud Solutions"]
              }
            ].map((service, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100"
              >
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      <Zap className="h-4 w-4 text-blue-600 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="text-center">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition inline-flex items-center"
            >
              Start Your Digital Transformation
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Solutions</h2>
            <p className="text-xl text-gray-600">From Excel to Enterprise: Solutions That Grow With Your Business</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FileSpreadsheet className="h-8 w-8 text-blue-600" />,
                title: "Excel Solutions",
                description: "Custom templates, automation, and optimization for your Excel-based workflows."
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-blue-600" />,
                title: "Business Intelligence",
                description: "Transform your data into actionable insights with automated reports and dashboards."
              },
              {
                icon: <GitCompare className="h-8 w-8 text-blue-600" />,
                title: "Software Solutions",
                description: "Scale beyond Excel with custom web applications and automated systems."
              }
            ].map((service, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition">
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Growing Businesses</h2>
            <p className="text-xl text-gray-600">Join other businesses transforming their operations with TruSponse</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="flex items-center justify-center p-4">
              <img 
                src="/images/JonBeerContracting.PNG"
                alt="Jon Beer Contracting" 
                className="h-12 object-contain"
              />
            </div>
            <div className="flex items-center justify-center p-4">
              <img 
                src="/images/WPI.PNG"
                alt="WPI" 
                className="h-12 object-contain"
              />
            </div>
            <div className="flex items-center justify-center p-4">
              <img 
                src="/images/lumen.png"
                alt="Lumen Doors & Windows" 
                className="h-12 object-contain"
              />
            </div>
            <div className="flex items-center justify-center p-4">
              <img 
                src="/images/lcr.png"
                alt="LCR Capital Partners" 
                className="h-12 object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <footer className="bg-gray-900 text-white py-12 rounded-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center mb-4">
                  <Bot className="h-8 w-8 text-blue-400" />
                  <span className="ml-2 text-xl font-bold">TruSponse</span>
                </div>
                <p className="text-gray-400">Empowering businesses with intelligent automation solutions.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Solutions</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/" className="hover:text-white transition">Excel Automation</Link></li>
                  <li><Link to="/" className="hover:text-white transition">Reporting & Analytics</Link></li>
                  <li><Link to="/" className="hover:text-white transition">Custom Software</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
                  <li><a href="#" className="hover:text-white transition">Careers</a></li>
                  <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Connect</h3>
                <ul className="space-y-2 text-gray-400">
                  <li><a href="#" className="hover:text-white transition">LinkedIn</a></li>
                  <li><a href="#" className="hover:text-white transition">Twitter</a></li>
                  <li><a href="#" className="hover:text-white transition">Blog</a></li>
                </ul>
              </div>
            </div>
           <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} TruSponse Solutions. All rights reserved.</p>
          </div>

          </div>
        </footer>
      </div>

      {/* Lead Qualification Survey Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white rounded-t-xl">
              <h2 className="text-2xl font-bold text-gray-900">Get Started with Automation</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact_name" className="block text-sm font-medium text-gray-700">Name *</label>
                    <input
                      type="text"
                      id="contact_name"
                      name="contact_name"
                      required
                      value={formData.contact_name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Company Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Company Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="company_name" className="block text-sm font-medium text-gray-700">Company Name *</label>
                    <input
                      type="text"
                      id="company_name"
                      name="company_name"
                      required
                      value={formData.company_name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="company_size" className="block text-sm font-medium text-gray-700">Company Size</label>
                    <select
                      id="company_size"
                      name="company_size"
                      value={formData.company_size}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select...</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-50">11-50 employees</option>
                      <option value="51-200">51-200 employees</option>
                      <option value="201-500">201-500 employees</option>
                      <option value="501+">501+ employees</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Service Interests */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Services of Interest</h3>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What services are you interested in? *
                  </label>
                  <div className="space-y-3">
                    {services.map((service) => (
                      <label
                        key={service.id}
                        className="flex items-start space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        <input
                          type="checkbox"
                          checked={formData.service_interests.includes(service.label)}
                          onChange={() => handleServiceInterestChange(service.label)}
                          className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900">{service.label}</p>
                          <p className="text-sm text-gray-500">{service.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                  {formData.service_interests.length === 0 && (
                    <p className="text-sm text-red-500 mt-1">
                      Please select at least one service
                    </p>
                  )}
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Project Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="budget_range" className="block text-sm font-medium text-gray-700">Budget Range</label>
                    <select
                      id="budget_range"
                      name="budget_range"
                      value={formData.budget_range}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select...</option>
                      <option value="<25k">Less than $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="100k+">$100,000+</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="project_timeline" className="block text-sm font-medium text-gray-700">Project Timeline</label>
                    <select
                      id="project_timeline"
                      name="project_timeline"
                      value={formData.project_timeline}
                      onChange={handleInputChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select...</option>
                      <option value="immediate">Immediate</option>
                      <option value="1-3months">1-3 months</option>
                      <option value="3-6months">3-6 months</option>
                      <option value="6months+">6+ months</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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
