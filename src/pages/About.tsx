import { Target, Heart, Award, ChefHat } from 'lucide-react';

export default function About() {
  const teamMembers = [
    {
      name: 'Chef Ahmed Khan',
      role: 'Head Chef',
      image: 'https://images.pexels.com/photos/2102934/pexels-photo-2102934.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      name: 'Saad Ali',
      role: 'Pastry Chef',
      image: 'https://images.pexels.com/photos/3814446/pexels-photo-3814446.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
    {
      name: 'Hassan Raza',
      role: 'Sous Chef',
      image: 'https://images.pexels.com/photos/2102934/pexels-photo-2102934.jpeg?auto=compress&cs=tinysrgb&w=600',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 pt-20">
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          }}
        />

        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-6">About Drunch Café</h1>
            <div className="w-24 h-1 bg-blue-500 mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white">Our Story</h2>
              <p className="text-gray-300 leading-relaxed">
                Drunch Café began with a simple vision: to create a warm, welcoming space where
                friends and family could gather to enjoy exceptional food in a cozy atmosphere.
                Located in the heart of Gulshan-e-Iqbal, Karachi, we've become a beloved destination
                for food lovers seeking quality and comfort.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Our journey started with a passion for bringing together the best of breakfast and
                lunch, creating a unique dining experience that celebrates fresh ingredients,
                innovative recipes, and traditional flavors. Every dish we serve is crafted with
                care and attention to detail, ensuring that each visit is memorable.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Today, Drunch Café stands as a testament to our commitment to excellence, combining
                a modern aesthetic with warm hospitality. We pride ourselves on being more than just
                a café – we're a community gathering place where memories are made over great food
                and even better company.
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Café Interior"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
            <div className="bg-gray-800 p-10 rounded-xl hover:bg-gray-750 transition-all">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
              <p className="text-gray-300 leading-relaxed">
                To provide an exceptional dining experience by serving high-quality, delicious food
                in a warm and inviting atmosphere. We strive to make every guest feel like family
                while maintaining the highest standards of service and culinary excellence.
              </p>
            </div>

            <div className="bg-gray-800 p-10 rounded-xl hover:bg-gray-750 transition-all">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                <Heart className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-gray-300 leading-relaxed">
                To become Karachi's most beloved café, known for our commitment to quality,
                innovation, and community. We envision a future where Drunch Café is synonymous
                with memorable dining experiences and serves as a cornerstone of the local food scene.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-10 rounded-2xl mb-20">
            <div className="flex items-center justify-center mb-6">
              <Award className="w-12 h-12 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white text-center mb-4">Our Values</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
              {['Quality', 'Hospitality', 'Innovation', 'Community'].map((value) => (
                <div key={value} className="text-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mx-auto mb-3" />
                  <p className="text-white font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="text-center mb-12">
              <ChefHat className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Our talented chefs bring years of experience and passion to every dish
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-blue-500/20 transition-all transform hover:-translate-y-2"
                >
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                    <p className="text-blue-400 font-medium">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
