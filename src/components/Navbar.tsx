import { Menu, X, ShoppingCart, Phone, MapPin, Clock, User } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenCart: () => void;
  cartItemsCount: number;
}

export default function Navbar({ currentPage, onNavigate, onOpenCart, cartItemsCount }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: 'home' },
    { name: 'Menu', path: 'menu' },
    { name: 'About', path: 'about' },
    { name: 'Gallery', path: 'gallery' },
    { name: 'Contact', path: 'contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-cyan-800/30">
      {/* Top info bar */}
      <div className="bg-gradient-to-r from-cyan-900/20 via-cyan-800/10 to-cyan-900/20 border-b border-cyan-800/20 py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between text-sm">
          <div className="flex items-center gap-6 mb-2 md:mb-0">
            <div className="flex items-center gap-2 text-cyan-200/90">
              <Phone className="w-3.5 h-3.5" />
              <span>+92 300 1234567</span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-cyan-200/90">
              <Clock className="w-3.5 h-3.5" />
              <span>8AM - 11PM Daily</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-cyan-200/90">
            <MapPin className="w-3.5 h-3.5" />
            <span>Gulshan-e-Iqbal, Karachi</span>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer group"
            onClick={() => onNavigate('home')}
          >
            <div className="relative">
              <img
                src="/461697621_930629142436128_3517842081896150469_n.jpg"
                alt="Drunch Café Logo"
                className="h-12 w-auto transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-600/0 to-cyan-600/0 group-hover:from-cyan-600/20 group-hover:to-transparent transition-all duration-500 rounded-lg" />
            </div>
            <div className="ml-4">
              <span className="text-2xl font-bold text-white tracking-tight block leading-tight font-serif">
                DRUNCH
              </span>
              <span className="text-xs text-cyan-300/80 font-light tracking-[0.2em] uppercase block">
                Café & Kitchen
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => onNavigate(link.path)}
                className="group relative"
              >
                <span className={`text-sm font-medium tracking-wider transition-all duration-300 ${
                  currentPage === link.path
                    ? 'text-cyan-300'
                    : 'text-gray-300 hover:text-cyan-200'
                }`}>
                  {link.name}
                </span>
                <span className={`absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-400 to-cyan-300 transition-all duration-300 ${
                  currentPage === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </button>
            ))}
            
            <div className="flex items-center space-x-6 pl-8 border-l border-cyan-800/50">
              <button
                onClick={onOpenCart}
                className="relative p-2.5 rounded-lg bg-gray-900 hover:bg-gray-800 transition-all duration-300 group border border-gray-800"
              >
                <ShoppingCart className="w-5 h-5 text-gray-300 group-hover:text-cyan-200 transition-colors" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-cyan-400 to-cyan-600 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse shadow-lg shadow-cyan-500/30">
                    {cartItemsCount}
                  </span>
                )}
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-sm font-medium tracking-wide rounded-lg hover:from-cyan-400 hover:to-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 transform hover:-translate-y-0.5 border border-cyan-400/30"
              >
                Reserve
              </button>
              <button className="p-2.5 rounded-lg bg-gray-900 hover:bg-gray-800 transition-all duration-300 border border-gray-800">
                <User className="w-5 h-5 text-gray-300 hover:text-cyan-200" />
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-4">
            <button
              onClick={onOpenCart}
              className="relative p-2.5 rounded-lg bg-gray-900 hover:bg-gray-800 transition-all duration-300 border border-gray-800"
            >
              <ShoppingCart className="w-6 h-6 text-gray-300 hover:text-cyan-200" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-cyan-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2.5 rounded-lg bg-gray-900 hover:bg-gray-800 text-gray-300 hover:text-white transition-all border border-gray-800"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-6 border-t border-cyan-800/30 pt-4 bg-black">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => {
                    onNavigate(link.path);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-3.5 text-sm font-medium transition-all duration-200 rounded-lg ${
                    currentPage === link.path
                      ? 'text-cyan-300 bg-gradient-to-r from-cyan-900/30 to-cyan-900/20 border-l-4 border-cyan-400'
                      : 'text-gray-300 hover:text-cyan-200 hover:bg-gray-900'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
              <button
                onClick={() => {
                  onNavigate('contact');
                  setIsMenuOpen(false);
                }}
                className="px-4 py-3.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-sm font-medium tracking-wide rounded-lg hover:from-cyan-400 hover:to-cyan-500 transition-all border border-cyan-400/30"
              >
                Book Table
              </button>
              <button className="px-4 py-3.5 bg-gray-900 text-gray-300 text-sm font-medium tracking-wide rounded-lg hover:bg-gray-800 transition-all border border-gray-800">
                Sign In
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}