
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Plane, Hotel, Package, User } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";
import LoginModal from "./LoginModal";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const location = useLocation();
  const { isLoggedIn, logout } = useAuthContext();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLoginClick = () => {
    setLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false);
  };

  const navLinks = [
    { path: "/", label: "Home", icon: null },
    { path: "/flights", label: "Flights", icon: <Plane className="h-4 w-4 mr-1" /> },
    { path: "/hotels", label: "Hotels", icon: <Hotel className="h-4 w-4 mr-1" /> },
    { path: "/packages", label: "Packages", icon: <Package className="h-4 w-4 mr-1" /> },
  ];

  if (isLoggedIn) {
    navLinks.push({ path: "/admin", label: "Admin", icon: <User className="h-4 w-4 mr-1" /> });
  }

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
          isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="text-2xl font-semibold bg-gradient-to-r from-blue-500 to-sky-400 bg-clip-text text-transparent"
              >
                TicketTurtle
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center text-sm font-medium transition-colors hover:text-primary ${
                    location.pathname === link.path ? "text-primary" : "text-foreground/80"
                  }`}
                >
                  {link.icon}
                  {link.label}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-[-5px] h-[2px] w-full bg-primary"
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Login/Logout Button */}
            <div className="hidden md:block">
              {isLoggedIn ? (
                <Button 
                  variant="ghost" 
                  onClick={logout}
                  className="text-sm hover:bg-secondary/60"
                >
                  Logout
                </Button>
              ) : (
                <Button 
                  variant="ghost" 
                  onClick={handleLoginClick}
                  className="text-sm hover:bg-secondary/60"
                >
                  Admin Login
                </Button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="fixed top-16 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg shadow-lg md:hidden"
        >
          <div className="container mx-auto py-4 px-6">
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center py-2 text-sm font-medium ${
                    location.pathname === link.path ? "text-primary" : "text-foreground/80"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
              {/* Mobile Login/Logout Button */}
              {isLoggedIn ? (
                <Button 
                  variant="ghost" 
                  onClick={logout}
                  className="justify-start p-0 text-sm hover:bg-transparent"
                >
                  Logout
                </Button>
              ) : (
                <Button 
                  variant="ghost" 
                  onClick={handleLoginClick}
                  className="justify-start p-0 text-sm hover:bg-transparent"
                >
                  Admin Login
                </Button>
              )}
            </nav>
          </div>
        </motion.div>
      )}

      {/* Login Modal */}
      <LoginModal isOpen={loginModalOpen} onClose={handleCloseLoginModal} />
    </>
  );
};

export default Navigation;
