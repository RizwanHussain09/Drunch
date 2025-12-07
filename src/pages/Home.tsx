import { useEffect, useState, useRef, useCallback } from 'react';
import { Star, Leaf, Users, ChevronRight, MapPin, Phone, Clock as ClockIcon, Award, ChevronLeft, ChevronRight as RightIcon } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface HomeProps {
  onNavigate: (page: string) => void;
  onOpenReservation: () => void;
}

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
}

// Optimized royalty images with lower quality placeholders
const royaltyImages = [
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60'
];

// Optimized hero image
const HERO_IMAGE = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=70';

export default function Home({ onNavigate, onOpenReservation }: HomeProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Set<number>>(new Set());
  const slideInterval = useRef<NodeJS.Timeout>();
  const isFirstRender = useRef(true);

  // Memoized functions
  const startAutoSlide = useCallback(() => {
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
    
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % royaltyImages.length);
    }, 5000);
  }, []);

  const handlePrevSlide = useCallback(() => {
    startAutoSlide();
    setCurrentSlide((prev) => (prev - 1 + royaltyImages.length) % royaltyImages.length);
  }, [startAutoSlide]);

  const handleNextSlide = useCallback(() => {
    startAutoSlide();
    setCurrentSlide((prev) => (prev + 1) % royaltyImages.length);
  }, [startAutoSlide]);

  const fetchReviews = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('id, name, rating, comment, date')
        .eq('is_approved', true)
        .order('created_at', { ascending: false })
        .limit(4);

      if (!error && data) {
        setReviews(data);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  }, []);

  const fetchFeaturedItems = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('menu_items')
        .select('id, name, description, price, image_url, category')
        .eq('is_available', true)
        .eq('is_featured', true)
        .limit(4);

      if (!error && data) {
        setFeaturedItems(data);
      }
    } catch (error) {
      console.error('Error fetching featured items:', error);
    }
  }, []);

  // Image preloading
  useEffect(() => {
    // Preload hero image
    const heroImg = new Image();
    heroImg.src = HERO_IMAGE;
    
    // Preload royalty images
    royaltyImages.forEach((img, index) => {
      const image = new Image();
      image.src = img;
      image.onload = () => {
        setImagesLoaded(prev => new Set(prev).add(index));
      };
    });

    // Cleanup
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, []);

  // Fetch data on mount
  useEffect(() => {
    if (isFirstRender.current) {
      Promise.all([fetchReviews(), fetchFeaturedItems()]);
      isFirstRender.current = false;
    }
  }, [fetchReviews, fetchFeaturedItems]);

  // Start slideshow after images load
  useEffect(() => {
    if (imagesLoaded.size === royaltyImages.length) {
      startAutoSlide();
    }
  }, [imagesLoaded, startAutoSlide]);

  // Lazy load component for featured items
  const FeaturedItem = ({ item }: { item: MenuItem }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    
    return (
      <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100">
        <div className="relative h-64 overflow-hidden bg-gray-100">
          {/* Blur placeholder */}
          {!imageLoaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 to-gray-300" />
          )}
          <img
            src={item.image_url ? `${item.image_url}?w=400&q=75` : 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=70'}
            alt={item.name}
            loading="lazy"
            width={400}
            height={256}
            className={`w-full h-full object-cover transition-transform duration-700 ${imageLoaded ? 'group-hover:scale-110' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
          />
          <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-600 to-cyan-700 px-4 py-2 rounded-full shadow-lg">
            <span className="text-white font-bold">PKR {item.price}</span>
          </div>
        </div>
        <div className="p-6">
          <span className="text-xs text-cyan-600 font-semibold tracking-widest uppercase mb-2 block">
            {item.category}
          </span>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{item.description}</p>
          <button className="text-cyan-600 hover:text-cyan-700 font-medium text-sm flex items-center gap-1 group">
            View Details
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Optimized with CSS background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gray-900">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${HERO_IMAGE})`,
            backgroundColor: '#0d9488' // Fallback color matching the image
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/50 to-gray-900/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-cyan-600/20 text-cyan-300 text-sm font-semibold tracking-widest rounded-full mb-6 border border-cyan-500/30">
                PREMIUM DINING EXPERIENCE
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Savor Every <br />
                <span className="text-cyan-400">Moment</span>
              </h1>
              <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-lg">
                Where exceptional flavors meet sophisticated ambiance. Perfect for casual brunches, intimate dinners, and memorable gatherings.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onNavigate('menu')}
                className="group px-8 py-4 bg-gradient-to-r from-cyan-600 to-cyan-700 text-white font-semibold rounded-full shadow-lg hover:from-cyan-500 hover:to-cyan-600 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-600/30 transform hover:-translate-y-1 flex items-center justify-center gap-2"
              >
                Explore Our Menu
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onOpenReservation}
                className="px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white/30 hover:border-cyan-300 transition-all duration-300 hover:bg-cyan-900/20"
              >
                Reserve a Table
              </button>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="animate-bounce">
            <div className="w-1 h-10 bg-cyan-300/50 rounded-full mx-auto" />
          </div>
        </div>
      </section>

      {/* Signature Dishes Slideshow - Optimized */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Royalty Dishes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience culinary artistry with our most exquisite creations
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            <div className="relative h-[400px] md:h-[450px] rounded-2xl md:rounded-3xl overflow-hidden shadow-xl">
              {/* Slides - Optimized with loading states */}
              {royaltyImages.map((img, index) => {
                const isActive = index === currentSlide;
                const isLoaded = imagesLoaded.has(index);
                
                return (
                  <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    {!isLoaded && (
                      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 to-gray-300" />
                    )}
                    <img
                      src={img}
                      alt={`Signature dish ${index + 1}`}
                      loading="lazy"
                      width={1200}
                      height={450}
                      className={`w-full h-full object-cover transition-opacity duration-300 ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
                      <div className="max-w-2xl">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span className="px-3 py-1.5 bg-cyan-500/20 rounded-full text-sm font-semibold border border-cyan-400/30">
                            Signature #{index + 1}
                          </span>
                          <span className="text-lg font-bold text-cyan-300">PKR 2,499</span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold mb-2">Truffle-infused Delight</h3>
                        <p className="text-gray-200 mb-4 max-w-lg text-sm md:text-base">
                          An exquisite blend of premium ingredients with truffle essence.
                        </p>
                        <button className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full font-medium hover:from-cyan-400 hover:to-cyan-500 transition-all duration-300 text-sm">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Navigation buttons */}
              <button
                onClick={handlePrevSlide}
                className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/40 rounded-full flex items-center justify-center hover:bg-black/60 transition-all duration-300 group"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-cyan-300" />
              </button>
              <button
                onClick={handleNextSlide}
                className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-black/40 rounded-full flex items-center justify-center hover:bg-black/60 transition-all duration-300 group"
                aria-label="Next slide"
              >
                <RightIcon className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:text-cyan-300" />
              </button>

              {/* Slide indicators */}
              <div className="absolute bottom-6 right-6 flex gap-1.5">
                {royaltyImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentSlide(index);
                      startAutoSlide();
                    }}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-cyan-400 scale-125'
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes - Optimized with Lazy Loading */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Creations</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most celebrated dishes, crafted with passion and precision
            </p>
          </div>

          {featuredItems.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100">
                  <div className="h-64 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse" />
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-4 animate-pulse" />
                    <div className="h-6 bg-gray-200 rounded mb-2 animate-pulse" />
                    <div className="h-12 bg-gray-200 rounded mb-4 animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredItems.map((item) => (
                <FeaturedItem key={item.id} item={item} />
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate('menu')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-700 to-cyan-800 text-white font-medium rounded-full hover:from-cyan-600 hover:to-cyan-700 transition-all duration-300 hover:shadow-xl"
            >
              View Complete Menu
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Static content, already optimized */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">The Drunch Experience</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              What sets us apart in creating memorable dining moments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Leaf,
                title: 'Farm Fresh',
                description: 'Daily sourced ingredients from local farms and trusted suppliers',
                color: 'text-teal-600',
                bg: 'bg-teal-50'
              },
              {
                icon: Award,
                title: 'Award Winning',
                description: 'Recognized for culinary excellence and exceptional service',
                color: 'text-cyan-600',
                bg: 'bg-cyan-50'
              },
              {
                icon: Users,
                title: 'Expert Team',
                description: 'Passionate chefs and attentive staff dedicated to your experience',
                color: 'text-blue-600',
                bg: 'bg-blue-50'
              },
              {
                icon: ClockIcon,
                title: 'Always Fresh',
                description: 'Made-to-order dishes ensuring peak freshness and flavor',
                color: 'text-sky-600',
                bg: 'bg-sky-50'
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group border border-gray-100"
              >
                <div className={`w-16 h-16 ${feature.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Guests Love Us</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear what our valued customers have to say
            </p>
          </div>

          {reviews.length === 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded mb-6 w-1/3" />
                  <div className="h-16 bg-gray-200 rounded mb-6" />
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full" />
                    <div className="ml-4">
                      <div className="h-4 bg-gray-200 rounded mb-2 w-20" />
                      <div className="h-3 bg-gray-200 rounded w-16" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-center mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'text-cyan-400 fill-cyan-400' : 'text-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-3">{review.date}</span>
                  </div>
                  <p className="text-gray-700 italic mb-4 leading-relaxed line-clamp-3">
                    "{review.comment}"
                  </p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {review.name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                      <p className="text-gray-600 text-xs">Regular Guest</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Location & Contact - Optimized map */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Visit Our Space</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Nestled in the heart of Gulshan-e-Iqbal, our café offers a serene escape with exceptional food and warm hospitality.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-cyan-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">Location</h3>
                    <p className="text-gray-600 text-sm">B-12, Block 1, Near Practical Center, Gulshan-e-Iqbal, Karachi</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <ClockIcon className="w-5 h-5 text-cyan-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">Hours</h3>
                    <p className="text-gray-600 text-sm">
                      Monday - Sunday: 8:00 AM - 11:00 PM
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-cyan-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1 text-sm">Contact</h3>
                    <p className="text-gray-600 text-sm">+92 300 123 4567 • info@drunchcafe.com</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={onOpenReservation}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-cyan-700 to-cyan-800 text-white font-medium rounded-full hover:from-cyan-600 hover:to-cyan-700 transition-all duration-300 hover:shadow-lg text-sm"
              >
                Make a Reservation
              </button>
            </div>
            
            <div className="rounded-2xl overflow-hidden shadow-lg h-[350px] md:h-[400px] border border-gray-200">
              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                <p className="text-gray-500">Interactive map location</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to Experience Drunch?
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Whether it's a casual brunch, business meeting, or special celebration, we're here to make it memorable.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={onOpenReservation}
              className="px-6 py-3 bg-white text-gray-900 font-medium rounded-full hover:bg-gray-100 transition-all duration-300 text-sm"
            >
              Book Your Table Now
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 bg-transparent text-white font-medium rounded-full border border-white/30 hover:border-white transition-all duration-300 hover:bg-white/10 text-sm"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
