
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { 
  popularDestinations, 
  getPackagesByPopularity, 
  getSeasonalDestinations,
  TravelPackage 
} from "@/data/mockData";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const Index = () => {
  const [popularPackages, setPopularPackages] = useState<TravelPackage[]>([]);
  const [seasonalDestinations, setSeasonalDestinations] = useState<typeof popularDestinations>([]);
  
  useEffect(() => {
    // Get top 3 packages by popularity
    setPopularPackages(getPackagesByPopularity().slice(0, 3));
    
    // Get seasonal destinations
    setSeasonalDestinations(getSeasonalDestinations());
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Popular Destinations Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <Badge className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full mb-3">
              Top Picks
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Destinations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the most sought-after destinations around the world. These locations offer unforgettable experiences and are trending among travelers right now.
            </p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {popularDestinations.slice(0, 6).map((destination, index) => (
              <motion.div key={destination.name} variants={itemVariants}>
                <div className="group relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl hover:translate-y-[-5px]">
                  <div className="h-64 w-full overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-6">
                    <div className="mb-2 flex items-center">
                      <TrendingUp className="w-4 h-4 text-red-400 mr-2" />
                      <span className="text-sm font-medium text-red-300">Trending Now</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white">{destination.name}</h3>
                    <p className="text-gray-300 mb-4">{destination.country}</p>
                    <Link to={`/packages?destination=${destination.name}`}>
                      <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black transition-colors">
                        Explore
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-12 text-center">
            <Link to="/packages">
              <Button variant="outline" className="rounded-full border-gray-300">
                View All Destinations
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Seasonal Recommendations */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <Badge className="bg-green-100 text-green-700 px-3 py-1 rounded-full mb-3">
              Seasonal Picks
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Perfect For This Season</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our AI-powered system has analyzed current travel trends to recommend the best destinations for this time of year.
            </p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {seasonalDestinations.map((destination) => (
              <motion.div key={destination.name} variants={itemVariants}>
                <Card className="overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="h-48 w-full overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="h-full w-full object-cover object-center hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
                    <p className="text-gray-600 mb-4">{destination.country}</p>
                    <Link to={`/flights?to=${destination.name}`}>
                      <Button variant="outline" size="sm" className="text-sm">
                        Find Flights
                      </Button>
                    </Link>
                    <Link to={`/hotels?location=${destination.name}`}>
                      <Button variant="outline" size="sm" className="text-sm ml-2">
                        Browse Hotels
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Popular Packages Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="mb-12 text-center">
            <Badge className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full mb-3">
              Best Value
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Travel Packages</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              All-inclusive packages curated for the best travel experience. Flight, hotel, and activities all in one convenient booking.
            </p>
          </div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {popularPackages.map((pkg) => (
              <motion.div key={pkg.id} variants={itemVariants}>
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="h-64 w-full overflow-hidden relative">
                    <img
                      src={pkg.image}
                      alt={pkg.name}
                      className="h-full w-full object-cover object-center hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 bg-primary/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                      ${pkg.price}
                    </div>
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge className="bg-blue-100 text-blue-700">
                          {pkg.duration}
                        </Badge>
                        {pkg.flightIncluded && (
                          <Badge variant="outline" className="text-xs">
                            Flight Included
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-xl font-semibold">{pkg.name}</h3>
                      <p className="text-gray-500 text-sm">{pkg.destination}</p>
                    </div>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                      {pkg.description}
                    </p>
                    <div className="mt-auto">
                      <Link to={`/packages/${pkg.id}`}>
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          
          <div className="mt-12 text-center">
            <Link to="/packages">
              <Button variant="outline" className="rounded-full border-gray-300">
                Browse All Packages
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready for Your Next Adventure?</h2>
          <p className="text-white/80 max-w-2xl mx-auto mb-8">
            Start planning your dream vacation today. Our expert team is ready to help you create unforgettable travel experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/flights">
              <Button className="bg-white text-blue-600 hover:bg-white/90">
                Book a Flight
              </Button>
            </Link>
            <Link to="/hotels">
              <Button className="bg-white text-blue-600 hover:bg-white/90">
                Find a Hotel
              </Button>
            </Link>
            <Link to="/packages">
              <Button className="bg-white text-blue-600 hover:bg-white/90">
                Explore Packages
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
