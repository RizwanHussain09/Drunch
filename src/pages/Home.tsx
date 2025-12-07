import { useEffect, useState, useRef } from 'react';
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

// Royalty-style images for slideshow
const royaltyImages = [
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80',
  'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80'
];

export default function Home({ onNavigate, onOpenReservation }: HomeProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [featuredItems, setFeaturedItems] = useState<MenuItem[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideInterval = useRef<NodeJS.Timeout>();

  useEffect(() => {
    fetchReviews();
    fetchFeaturedItems();
    
    // Auto slide
    startAutoSlide();
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, []);

  const startAutoSlide = () => {
    slideInterval.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % royaltyImages.length);
    }, 5000);
  };

  const handlePrevSlide = () => {
    if (slideInterval.current) clearInterval(slideInterval.current);
    setCurrentSlide((prev) => (prev - 1 + royaltyImages.length) % royaltyImages.length);
    startAutoSlide();
  };

  const handleNextSlide = () => {
    if (slideInterval.current) clearInterval(slideInterval.current);
    setCurrentSlide((prev) => (prev + 1) % royaltyImages.length);
    startAutoSlide();
  };

  const fetchReviews = async () => {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .eq('is_approved', true)
      .order('created_at', { ascending: false })
      .limit(4);

    if (data) setReviews(data);
  };

  const fetchFeaturedItems = async () => {
    const { data } = await supabase
      .from('menu_items')
      .select('*')
      .eq('is_available', true)
      .eq('is_featured', true)
      .limit(4);

    if (data) setFeaturedItems(data);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)',
          }}
        >
         
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className="mb-8">
              <span className="inline-block px-4 py-2 bg-cyan-600/20 text-cyan-300 text-sm font-semibold tracking-widest rounded-full mb-6 border border-cyan-500/30">
                PREMIUM DINING EXPERIENCE
              </span>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Savor Every <br />
                <span className="text-cyan-400">Moment</span>
              </h1>
              <p className="text-xl text-gray-300 mb-10 leading-relaxed max-w-lg">
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

      {/* Signature Dishes Slideshow */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
              <span className="text-cyan-600 font-semibold tracking-widest text-sm uppercase">
                Signature Collection
              </span>
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Royalty Dishes
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experience culinary artistry with our most exquisite creations, each a masterpiece
            </p>
          </div>

          {/* Slideshow Container */}
          <div className="relative max-w-6xl mx-auto">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              {/* Slides */}
              {royaltyImages.map((img, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentSlide ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Signature dish ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  {/* Slide content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <div className="max-w-2xl">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="px-4 py-2 bg-cyan-500/20 rounded-full text-sm font-semibold border border-cyan-400/30">
                          Signature #{index + 1}
                        </span>
                        <span className="text-xl font-bold text-cyan-300">PKR 2,499</span>
                      </div>
                      <h3 className="text-3xl font-bold mb-3">Truffle-infused Delight</h3>
                      <p className="text-gray-200 mb-6 max-w-lg">
                        An exquisite blend of premium ingredients with truffle essence, creating an unforgettable flavor profile.
                      </p>
                      <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-full font-medium hover:from-cyan-400 hover:to-cyan-500 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Navigation buttons */}
              <button
                onClick={handlePrevSlide}
                className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 rounded-full flex items-center justify-center hover:bg-black/60 transition-all duration-300 group"
              >
                <ChevronLeft className="w-6 h-6 text-white group-hover:text-cyan-300" />
              </button>
              <button
                onClick={handleNextSlide}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 rounded-full flex items-center justify-center hover:bg-black/60 transition-all duration-300 group"
              >
                <RightIcon className="w-6 h-6 text-white group-hover:text-cyan-300" />
              </button>

              {/* Slide indicators */}
              <div className="absolute bottom-8 right-8 flex gap-2">
                {royaltyImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (slideInterval.current) clearInterval(slideInterval.current);
                      setCurrentSlide(index);
                      startAutoSlide();
                    }}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-cyan-400 scale-125'
                        : 'bg-white/50 hover:bg-white/80'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Creations</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover our most celebrated dishes, crafted with passion and precision
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredItems.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image_url || 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-600 to-cyan-700 px-4 py-2 rounded-full shadow-lg">
                    <span className="text-white font-bold">PKR {item.price}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              onClick={() => onNavigate('menu')}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-700 to-cyan-800 text-white font-medium rounded-full hover:from-cyan-600 hover:to-cyan-700 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5"
            >
              View Complete Menu
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">The Drunch Experience</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              What sets us apart in creating memorable dining moments
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                className="text-center p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-100"
              >
                <div className={`w-20 h-20 ${feature.bg} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 group-hover:shadow-lg`}>
                  <feature.icon className={`w-10 h-10 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Guests Love Us</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Hear what our valued customers have to say about their experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating ? 'text-cyan-400 fill-cyan-400' : 'text-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500 ml-4">{review.date}</span>
                </div>
                <p className="text-gray-700 text-lg italic mb-6 leading-relaxed">
                  "{review.comment}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-gray-900">{review.name}</p>
                    <p className="text-gray-600 text-sm">Regular Guest</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Contact */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Visit Our Space</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Nestled in the heart of Gulshan-e-Iqbal, our café offers a serene escape with exceptional food and warm hospitality.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-cyan-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                    <p className="text-gray-600">B-12, Block 1, Near Practical Center,<br />Gulshan-e-Iqbal, Karachi</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <ClockIcon className="w-6 h-6 text-cyan-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Hours</h3>
                    <p className="text-gray-600">
                      Monday - Sunday: 8:00 AM - 11:00 PM<br />
                      Kitchen Last Order: 10:30 PM
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-cyan-600 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Contact</h3>
                    <p className="text-gray-600">+92 300 123 4567<br />info@drunchcafe.com</p>
                  </div>
                </div>
              </div>
              
              <button
                onClick={onOpenReservation}
                className="mt-8 px-8 py-3.5 bg-gradient-to-r from-cyan-700 to-cyan-800 text-white font-medium rounded-full hover:from-cyan-600 hover:to-cyan-700 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Make a Reservation
              </button>
            </div>
            
            <div className="rounded-2xl overflow-hidden shadow-2xl h-[500px] border border-gray-200">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3619.5986551234567!2d67.0804!3d24.9056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDU0JzIwLjIiTiA2N8KwMDQnNDkuNCJF!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience Drunch?
          </h2>
          <p className="text-gray-300 text-xl mb-10 max-w-2xl mx-auto">
            Whether it's a casual brunch, business meeting, or special celebration, we're here to make it memorable.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={onOpenReservation}
              className="px-10 py-4 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1"
            >
              Book Your Table Now
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-10 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white/30 hover:border-white transition-all duration-300 hover:bg-white/10"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
