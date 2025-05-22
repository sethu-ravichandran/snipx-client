import React from 'react';
import { Github, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-6 border-t border-gray-200 dark:border-gray-800 transition-colors">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600 dark:text-gray-400">
        <div className="mb-4 sm:mb-0">
          <p>© {new Date().getFullYear()} Snip'X. All rights reserved.</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <span className="flex items-center">
            Built with <Heart className="w-4 h-4 mx-1 text-red-500" /> by Sethu Ravichandran
          </span>
          
          <a
            href="https://github.com/sethu-ravichandran"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
