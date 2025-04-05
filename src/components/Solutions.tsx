import React from 'react';
import { ArrowUpRight, ArrowRight, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Project {
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
}

const projects: Project[] = [
  {
    title: "Woody Acres Quote Tool Demo",
    description: "A comprehensive quoting tool designed for streamlined business operations, demonstrating automated pricing and quote generation capabilities.",
    videoUrl: "https://youtu.be/it8WBSf7ztk?si=RK-Hjy_u86HyjOas",
    thumbnailUrl: `https://img.youtube.com/vi/it8WBSf7ztk/maxresdefault.jpg`
  },
  {
    title: "Nutrition Form Demo",
    description: "An automated nutrition tracking system showcasing data collection and analysis for health professionals.",
    videoUrl: "https://youtu.be/6LW4gGAx_8g",
    thumbnailUrl: `https://img.youtube.com/vi/6LW4gGAx_8g/maxresdefault.jpg`
  },
  {
    title: "Excel VBA Folder Name List and File Count",
    description: "Automated file management solution using VBA to track and organize folder contents efficiently.",
    videoUrl: "https://youtu.be/C0WNXiHj9_k",
    thumbnailUrl: `https://img.youtube.com/vi/C0WNXiHj9_k/maxresdefault.jpg`
  },
  {
    title: "Prime Conduit On-Time/Lead-Time Dashboard",
    description: "Real-time performance tracking dashboard for monitoring delivery metrics and lead times.",
    videoUrl: "https://youtu.be/WynQCd76V_Y",
    thumbnailUrl: `https://img.youtube.com/vi/WynQCd76V_Y/maxresdefault.jpg`
  }
];

const Solutions: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Solutions in Action</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our portfolio of successful implementations, from Excel automation to custom business applications.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img 
                  src={project.thumbnailUrl} 
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                  <a 
                    href={project.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
                  >
                    Watch Demo
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center py-16 bg-white rounded-2xl shadow-sm mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Business?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can automate your workflows and scale your business operations.
          </p>
          <Link 
            to="/"
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition inline-flex items-center"
          >
            Start Your Digital Transformation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>

        {/* Footer */}
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
                  <li><a href="#" className="hover:text-white transition">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition">Contact</a></li>
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
              <p>&copy; 2024 TruSponse Solutions. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Solutions;