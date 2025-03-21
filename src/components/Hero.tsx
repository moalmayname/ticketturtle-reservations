
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Plane, Hotel, Package } from "lucide-react";
import SearchBar from "./SearchBar";

const Hero = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1503220317375-aaad61436b1b?q=80&w=2070&auto=format&fit=crop')", 
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-transparent z-0"></div>
      </div>

      {/* Hero content */}
      <div className="container relative z-10 mx-auto px-4 pt-40 pb-24 h-full flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-block px-3 py-1 mb-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium"
          >
            Discover the world with TicketTurtle
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight"
          >
            Travel Simplified, <br />
            <span className="bg-gradient-to-r from-blue-400 to-sky-300 bg-clip-text text-transparent">
              Destinations Amplified
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-lg text-white/80 mb-8 max-w-2xl mx-auto"
          >
            Book flights, hotels, and complete travel packages with ease. Experience seamless travel planning with our intuitive platform.
          </motion.p>
        </motion.div>
        
        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="w-full max-w-4xl mx-auto mt-8"
        >
          <SearchBar />
        </motion.div>
        
        {/* Quick links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="flex flex-wrap justify-center gap-4 mt-12"
        >
          <Link to="/flights">
            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-2 px-5 py-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white"
            >
              <Plane className="h-4 w-4" />
              <span>Flights</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </motion.div>
          </Link>
          <Link to="/hotels">
            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-2 px-5 py-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white"
            >
              <Hotel className="h-4 w-4" />
              <span>Hotels</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </motion.div>
          </Link>
          <Link to="/packages">
            <motion.div
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-2 px-5 py-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 text-white"
            >
              <Package className="h-4 w-4" />
              <span>Packages</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
      
      {/* Curved divider */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-background z-10">
        <svg 
          className="absolute -top-20 w-full h-20 text-background" 
          preserveAspectRatio="none" 
          viewBox="0 0 1440 48" 
          fill="currentColor" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M0 48L60 42.6667C120 37.3333 240 26.6667 360 21.3333C480 16 600 16 720 21.3333C840 26.6667 960 37.3333 1080 42.6667C1200 48 1320 48 1380 48H1440V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V48Z"/>
        </svg>
      </div>
    </div>
  );
};

export default Hero;
