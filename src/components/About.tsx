import React from 'react';
import { Bot, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About TruSponse</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transforming business operations through intelligent automation solutions
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8 mb-16">
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 mb-6">
              Todd Brannon founded TruSponse after more than a decade of experience in analytics, process improvement, and automation. His journey began in healthcare, where he spent 16 years in direct patient care before transitioning into analyst roles in 2010. That shift followed a period of side contracting with a major healthcare group purchasing organization, which sparked his interest in solving operational challenges from a systems perspective.
            </p>
            
            <p className="text-gray-600 mb-6">
              Over the years, Todd discovered a passion not just for analyzing data—but for improving the processes behind it. He sharpened his development skills while working for organizations like HCA Healthcare and AutoNation, and began taking on freelance projects that allowed him to create custom solutions for clients across various industries. From automating reports and building dashboards to developing lightweight internal tools, he steadily built a reputation for making complex problems feel manageable.
            </p>
            
            <p className="text-gray-600 mb-6">
              TruSponse exists to help businesses see what they don't yet realize is possible. Todd believes that many organizations are just a few key improvements away from major gains in efficiency and performance—and he's on a mission to help uncover and implement those opportunities.
            </p>
          </div>
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
                  <li><Link to="/about" className="hover:text-white transition">About Us</Link></li>
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

export default About;