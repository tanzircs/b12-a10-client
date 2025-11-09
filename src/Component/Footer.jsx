import React from 'react';

const Footer = () => {
    return (
      <footer className="bg-[#0f172a] text-gray-300 mt-16 py-10 text-sm">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand */}
            <div>
              <h2 className="text-lg font-semibold text-white">EcoTrack</h2>
              <p className="text-gray-400 mt-2 text-xs">
                Track. Improve. Live Sustainably.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-white font-medium mb-3">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="hover:underline">
                    About
                  </a>
                </li>
                <li>
                  <a href="/contact" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="text-white font-medium mb-3">Connect</h3>
              <div className="flex gap-4 text-xl">
                <a href="#" aria-label="Facebook">
                  🌍
                </a>
                <a href="#" aria-label="Twitter">
                  🐦
                </a>
                <a href="#" aria-label="Instagram">
                  📸
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-700 mt-8 pt-4 flex flex-col md:flex-row justify-between text-xs text-gray-500">
            <p>© 2025 EcoTrack • All rights reserved.</p>
            <p>Committed to accessibility and privacy.</p>
          </div>
        </div>
      </footer>
    );
};

export default Footer;