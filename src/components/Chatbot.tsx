import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  text: string;
  isBot: boolean;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hello! How can I help you today?', isBot: true },
  ]);
  const [input, setInput] = useState('');

  const faqs = [
    {
      keywords: ['hours', 'open', 'time', 'timing'],
      response: 'We are open Monday-Friday: 8:00 AM - 11:00 PM, and Saturday-Sunday: 9:00 AM - 12:00 AM.',
    },
    {
      keywords: ['location', 'address', 'where'],
      response: 'We are located at B-12, Block 1, Near Practical Center & Total Parco Petrol Pump, Gulshan-e-Iqbal, Karachi, Pakistan.',
    },
    {
      keywords: ['phone', 'contact', 'call', 'number'],
      response: 'You can reach us at 0312 2323244 or email us at drunch.pakistan@gmail.com.',
    },
    {
      keywords: ['reservation', 'book', 'table', 'reserve'],
      response: 'You can book a table through our website by clicking the "Book a Table" button on the home page, or call us at 0312 2323244.',
    },
    {
      keywords: ['menu', 'food', 'dishes', 'items'],
      response: 'We offer a variety of dishes including breakfast items, lunch specials, beverages, and desserts. Check out our Menu page for the full selection!',
    },
    {
      keywords: ['delivery', 'order', 'online'],
      response: 'Yes! You can place an online order through our website. Just browse our menu and add items to your cart.',
    },
    {
      keywords: ['payment', 'pay', 'accept'],
      response: 'We accept cash on delivery for online orders. For dine-in, we accept cash and all major cards.',
    },
    {
      keywords: ['wifi', 'internet'],
      response: 'Yes, we offer free WiFi to all our customers. Just ask our staff for the password.',
    },
  ];

  const getResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();

    for (const faq of faqs) {
      if (faq.keywords.some(keyword => lowerInput.includes(keyword))) {
        return faq.response;
      }
    }

    return "I'm sorry, I didn't understand that. You can ask me about our hours, location, menu, reservations, or contact information. Or you can contact us directly at 0312 2323244.";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      const botResponse: Message = {
        text: getResponse(input),
        isBot: true,
      };
      setMessages(prev => [...prev, botResponse]);
    }, 500);

    setInput('');
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-all hover:shadow-blue-500/50 z-40 flex items-center justify-center"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl z-40 flex flex-col h-[500px]">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4 rounded-t-2xl">
            <h3 className="text-white font-bold flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <span>Drunch Café Assistant</span>
            </h3>
            <p className="text-blue-100 text-sm mt-1">Ask us anything!</p>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    message.isBot
                      ? 'bg-gray-800 text-gray-200'
                      : 'bg-blue-500 text-white'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="space-y-2 mt-4">
                <p className="text-xs text-gray-400 text-center mb-2">Quick questions:</p>
                {[
                  'What are your hours?',
                  'Where are you located?',
                  'How do I make a reservation?',
                  'Do you offer delivery?',
                ].map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left px-4 py-2 bg-gray-800 hover:bg-gray-750 text-gray-300 text-sm rounded-lg transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-800">
            <div className="flex space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your question..."
                className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button
                onClick={handleSend}
                className="w-10 h-10 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
