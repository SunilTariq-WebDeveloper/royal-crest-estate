import React, { useState } from "react";
import {
  HomeOutlined,
  QuestionCircleOutlined,
  FileTextOutlined,
  UserOutlined,
  DollarOutlined,
  KeyOutlined,
  EnvironmentOutlined,
  SafetyOutlined,
  CreditCardOutlined,
  TeamOutlined,
  SearchOutlined,
  PlusOutlined,
  MinusOutlined,
  RightOutlined,
  LeftOutlined,
} from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const FAQPage = () => {
  const [activeCategory, setActiveCategory] = useState("general");
  const [openItems, setOpenItems] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  // FAQ Categories
  const categories = [
    { id: "general", label: "General", icon: <HomeOutlined />, count: 6 },
    { id: "buying", label: "Buying", icon: <KeyOutlined />, count: 8 },
    { id: "selling", label: "Selling", icon: <DollarOutlined />, count: 7 },
    { id: "agents", label: "Agents", icon: <TeamOutlined />, count: 4 },
    {
      id: "payments",
      label: "Payments",
      icon: <CreditCardOutlined />,
      count: 6,
    },
    { id: "legal", label: "Legal", icon: <SafetyOutlined />, count: 5 },
  ];

  // FAQ Data organized by category
  const faqData = {
    general: [
      {
        id: 1,
        question: "What is Royal Crest Estate?",
        answer:
          "Royal Crest Estate is a premier real estate platform that connects buyers, sellers, and renters with luxury properties. We offer verified listings, professional agent support, and a seamless property search experience.",
      },
      {
        id: 2,
        question: "How do I create an account?",
        answer:
          "Creating an account is free and easy! Click on the 'Sign Up' button in the top right corner, fill in your details, and verify your email address. Once done, you can start saving properties and contacting agents.",
      },
      {
        id: 3,
        question: "Is Royal Crest Estate available in my city?",
        answer:
          "We currently operate in major cities across the Lahore, Faislabad, Karachi, Islamabad, and Sargodha. We're constantly expanding to new locations.",
      },
      {
        id: 4,
        question: "How do I contact customer support?",
        answer:
          "You can reach our customer support team through the Contact page, email us at suniltariq08@gmail.com, or call us at +92 3251987313. We're available Monday-Friday from 9AM to 8PM EST.",
      },
      {
        id: 5,
        question: "Are the property listings verified?",
        answer:
          "Yes, all property listings on our platform are verified by our team of experts. We ensure that each listing meets our quality standards and that the information provided is accurate.",
      },
      {
        id: 6,
        question: "Can I list my property for free?",
        answer:
          "We offer both free and premium listing options. Free listings include basic features, while premium listings offer enhanced visibility, professional photography, and priority placement.",
      },
    ],
    buying: [
      {
        id: 7,
        question: "How do I start the home buying process?",
        answer:
          "Start by browsing properties on our platform, saving your favorites, and contacting agents for viewings. We recommend getting pre-approved for a mortgage and working with one of our experienced agents.",
      },
      {
        id: 8,
        question: "What documents do I need to buy a home?",
        answer:
          "Typically you'll need: government ID, proof of income (pay stubs, tax returns), bank statements, credit report, and pre-approval letter from your lender. Our agents can guide you through the specific requirements.",
      },
      {
        id: 9,
        question: "How much down payment do I need?",
        answer:
          "Down payment requirements vary by loan type and lender. Conventional loans typically require 5-20% down, FHA loans require 3.5%, and VA loans may require 0% down for eligible veterans.",
      },
      {
        id: 10,
        question: "What is a pre-approval and why do I need it?",
        answer:
          "A pre-approval is a letter from a lender stating how much they're willing to lend you. It shows sellers you're a serious buyer and gives you an advantage in competitive markets.",
      },
      {
        id: 11,
        question: "How long does the home buying process take?",
        answer:
          "The typical home buying process takes 30-45 days from offer acceptance to closing. This includes inspection, appraisal, loan processing, and final paperwork.",
      },
      {
        id: 12,
        question: "What are closing costs?",
        answer:
          "Closing costs are fees paid at the end of the real estate transaction. They typically include loan origination fees, appraisal, title search, insurance, and taxes. Buyers usually pay 2-5% of the home's price.",
      },
      {
        id: 13,
        question: "Should I get a home inspection?",
        answer:
          "Absolutely! A home inspection is crucial to identify any potential issues with the property. It can save you from expensive surprises and give you negotiating power.",
      },
      {
        id: 14,
        question: "What is earnest money?",
        answer:
          "Earnest money is a deposit made to the seller showing your good faith in purchasing the home. It's typically 1-3% of the purchase price and is credited toward your down payment at closing.",
      },
    ],
    selling: [
      {
        id: 15,
        question: "How do I list my property?",
        answer:
          "To list your property, create an account, click on 'List Property', and fill out the property details form. You can upload photos, set your price, and choose between free or premium listing options.",
      },
      {
        id: 16,
        question: "How do you determine my property's value?",
        answer:
          "We use a combination of factors including recent comparable sales in your area, current market trends, property condition, location, and unique features. You can also get a professional appraisal.",
      },
      {
        id: 17,
        question: "What are the costs of selling a home?",
        answer:
          "Selling costs typically include agent commission (5-6%), closing costs (1-3%), potential repairs, staging, and photography. We provide transparent pricing with no hidden fees.",
      },
      {
        id: 18,
        question: "How long will it take to sell my home?",
        answer:
          "The time to sell varies by market, price, and property condition. On average, homes sell in 30-90 days. Our marketing strategies can help speed up the process.",
      },
      {
        id: 19,
        question: "Should I make repairs before selling?",
        answer:
          "Minor repairs and updates can significantly impact your sale price and speed. We recommend focusing on curb appeal, fresh paint, and fixing obvious issues. Our agents can provide a pre-listing consultation.",
      },
      {
        id: 20,
        question: "What is staging and is it necessary?",
        answer:
          "Staging is arranging furniture and decor to showcase your home's potential. Staged homes often sell faster and for higher prices. We can connect you with professional stagers.",
      },
      {
        id: 21,
        question: "How do you market my property?",
        answer:
          "We market your property through multiple channels: our website, social media, email newsletters, professional networks, and partnerships with other real estate platforms. Premium listings get additional exposure.",
      },
    ],
    agents: [
      {
        id: 27,
        question: "How do I become an agent on Royal Crest?",
        answer:
          "Visit our 'Become an Agent' page, fill out the application, and our team will review your credentials. Licensed agents with proven experience are welcome to join our network.",
      },
      {
        id: 28,
        question: "What are the benefits of being an agent?",
        answer:
          "Agents get access to our client network, marketing tools, analytics dashboard, and priority support. Top performers receive featured profiles and premium placement.",
      },
      {
        id: 29,
        question: "How do I get more clients?",
        answer:
          "Complete your profile, respond promptly to inquiries, maintain high ratings, and use our marketing tools. Active agents with good reviews are featured more prominently.",
      },
      {
        id: 30,
        question: "What is the commission structure?",
        answer:
          "Commission rates vary by market and transaction. Contact our agent support team for detailed information about our competitive commission structure.",
      },
    ],
    payments: [
      {
        id: 31,
        question: "What payment methods do you accept?",
        answer:
          "We accept all major credit cards (Visa, Mastercard, American Express), PayPal, bank transfers, and cashier's checks for deposits and payments.",
      },
      {
        id: 32,
        question: "Is my payment information secure?",
        answer:
          "Yes, we use industry-standard encryption and security measures to protect your payment information. We never store sensitive payment details on our servers.",
      },
      {
        id: 33,
        question: "When will I be charged?",
        answer:
          "Listing fees are charged upon publication. Agent commissions are processed at closing. All charges are clearly displayed before you confirm any payment.",
      },
      {
        id: 34,
        question: "Can I get a refund?",
        answer:
          "Refund policies vary by service. Please review our refund policy or contact support for specific situations. We aim to resolve any issues fairly.",
      },
      {
        id: 35,
        question: "Do you offer payment plans?",
        answer:
          "Yes, for premium listings and certain services, we offer flexible payment plans. Contact our sales team to discuss options that work for your budget.",
      },
      {
        id: 36,
        question: "Are there any hidden fees?",
        answer:
          "No, we believe in transparent pricing. All fees are clearly stated upfront. There are no hidden charges or surprise fees.",
      },
    ],
    legal: [
      {
        id: 37,
        question: "What are my rights as a buyer?",
        answer:
          "Buyers have the right to a fair housing process, full disclosure of property defects, and the opportunity for inspections. Your agent can explain all your legal protections.",
      },
      {
        id: 38,
        question: "What disclosures are required when selling?",
        answer:
          "Sellers must disclose known material defects, lead-based paint (for pre-1978 homes), and any other issues that could affect the property's value or safety.",
      },
      {
        id: 39,
        question: "What is the Fair Housing Act?",
        answer:
          "The Fair Housing Act prohibits discrimination based on race, color, religion, sex, disability, familial status, or national origin in housing transactions.",
      },
      {
        id: 40,
        question: "Do I need a lawyer for real estate transactions?",
        answer:
          "While not always required, having a real estate attorney can provide valuable protection, especially for complex transactions or unique situations.",
      },
      {
        id: 41,
        question: "What should be in a purchase agreement?",
        answer:
          "A purchase agreement should include price, contingencies (inspection, financing), closing date, included items, and any special terms negotiated between parties.",
      },
    ],
  };

  // Toggle accordion item
  const toggleItem = (category, itemId) => {
    const key = `${category}-${itemId}`;
    setOpenItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // Filter FAQs based on search term
  const getFilteredFAQs = () => {
    if (!searchTerm.trim()) {
      return faqData[activeCategory] || [];
    }

    const allFAQs = Object.values(faqData).flat();
    return allFAQs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  };

  const filteredFAQs = getFilteredFAQs();
  const totalResults = filteredFAQs.length;

  return (
    <div id="faq" className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-orange-50 dark:from-black dark:via-gray-900 dark:to-orange-950 transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative h-[300px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="FAQ"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white px-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-lg md:text-xl max-w-2xl mx-auto">
              Find answers to common questions about buying & selling
             properties
            </p>
          </motion.div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-black/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-xl shadow-lg p-2 flex items-center"
        >
          <SearchOutlined className="text-gray-400 ml-3" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-3 py-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="mr-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              ✕
            </button>
          )}
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories - Horizontal Scroll on Mobile */}
        <div className="mb-8 overflow-x-auto pb-2 hide-scrollbar">
          <div className="flex gap-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => {
                  setActiveCategory(category.id);
                  setSearchTerm("");
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeCategory === category.id && !searchTerm
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30"
                    : "bg-white dark:bg-black/60 border border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-orange-500"
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                <span className="font-medium whitespace-nowrap">
                  {category.label}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    activeCategory === category.id && !searchTerm
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        {searchTerm && (
          <div className="mb-4 text-gray-600 dark:text-gray-400">
            Found {totalResults} result{totalResults !== 1 ? "s" : ""} for "
            {searchTerm}"
          </div>
        )}

        {/* FAQ Accordions */}
        <div className="space-y-3">
          <AnimatePresence mode="wait">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => {
                const itemKey = `${activeCategory}-${faq.id}`;
                const isOpen = openItems[itemKey] || false;

                return (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white dark:bg-black/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                  >
                    {/* Question */}
                    <button
                      onClick={() => toggleItem(activeCategory, faq.id)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left group"
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <QuestionCircleOutlined className="text-orange-500 mt-1" />
                        <span className="text-gray-900 dark:text-white font-medium flex-1">
                          {faq.question}
                        </span>
                      </div>
                      <div
                        className={`ml-4 w-6 h-6 rounded-full bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        {isOpen ? (
                          <MinusOutlined className="text-orange-500 text-xs" />
                        ) : (
                          <PlusOutlined className="text-orange-500 text-xs" />
                        )}
                      </div>
                    </button>

                    {/* Answer (Collapsible) */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-4 pt-2 border-t border-gray-200 dark:border-gray-800">
                            <div className="flex items-start gap-3">
                              <FileTextOutlined className="text-gray-400 mt-1" />
                              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <QuestionCircleOutlined className="text-6xl text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No results found
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Try searching with different keywords or browse by category
                </p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-4 px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Clear Search
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Still Have Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-center text-white"
        >
          <h2 className="text-2xl font-bold mb-3">Still Have Questions?</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Can't find the answer you're looking for? Our support team is here
            to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-3 bg-white text-orange-500 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Support
            </Link>
            <a
              href="suniltariq08@gmail.com"
              className="px-8 py-3 border border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors"
            >
              Email Us
            </a>
          </div>
        </motion.div>

        {/* Quick Links */}
        {/* <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: <UserOutlined />,
              label: "Create Account",
              link: "/signup",
            },
            {
              icon: <KeyOutlined />,
              label: "List Property",
              link: "/list-property",
            },
            {
              icon: <DollarOutlined />,
              label: "Mortgage Calculator",
              link: "/calculator",
            },
            {
              icon: <EnvironmentOutlined />,
              label: "Find Agents",
              link: "/agents",
            },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.link}
              className="bg-white dark:bg-black/60 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center hover:border-orange-500 transition-all group"
            >
              <div className="text-2xl text-orange-500 mb-2 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {item.label}
              </span>
            </Link>
          ))}
        </div> */}
      </div>

      {/* Hide scrollbar for categories */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default FAQPage;
