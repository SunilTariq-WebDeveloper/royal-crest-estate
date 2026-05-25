 import { ShieldCheck, Users, Home, Clock } from "lucide-react";
 import {motion} from "framer-motion";
 import {TeamOutlined} from "@ant-design/icons";
const WhyChoose = () => {
  const features = [
    {
      icon: <ShieldCheck size={28} className="text-white" />,
      title: "Trusted & Secure",
      description:
        "We ensure transparency and reliability in every property transaction, keeping your investment safe.",
    },
    {
      icon: <Users size={28} className="text-white" />,
      title: "Expert Agents",
      description:
        "Our professional agents have extensive market knowledge to guide you in making the right decision.",
    },
    {
      icon: <Home size={28} className="text-white" />,
      title: "Wide Range of Properties",
      description:
        "Access a diverse portfolio of residential and commercial properties to find the perfect match.",
    },
    {
      icon: <Clock size={28} className="text-white" />,
      title: "24/7 Support",
      description:
        "Our team is available round the clock to assist you with queries, property visits, and after-sales support.",
    },
  ];

  return (
    <section id="choose" className="py-20 min-h-screen w-full bg-gray-50 px-12 sm:px-6 lg:px-8  dark:bg-black text-gray-900 overflow-hidden transition-colors duration-300 dark:text-white">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ infinity: true }}
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Why Choose <span className="text-orange-500">Royal Crest?</span>
          </h2>

          <div className="space-y-4">
            {[
              {
                title: "Premium Locations",
                desc: "Properties in the most desirable neighborhoods",
              },
              {
                title: "Quality Assurance",
                desc: "Rigorous quality checks at every stage",
              },
              {
                title: "Expert Guidance",
                desc: "Professional advice from industry experts",
              },
              {
                title: "Legal Compliance",
                desc: "100% clear titles and legal documentation",
              },
              {
                title: "After-Sales Support",
                desc: "Comprehensive support even after purchase",
              },
              {
                title: "Best ROI",
                desc: "High returns on your real estate investment",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start space-x-3 p-4 bg-white dark:bg-black/40 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-orange-500/30 transition-all shadow-sm"
              >
                <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <div>
                  <h3 className="text-gray-900 dark:text-white font-semibold">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <img
            src="https://i.pinimg.com/736x/ed/96/5b/ed965bf7c94acf90ad27ea0b15c499cc.jpg"
            alt="Luxury Home"
            className="rounded-2xl shadow-2xl shadow-orange-500/20"
          />

          {/* Floating Badges */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-xl"
          >
            <div className="text-center text-white">
              <div className="text-2xl font-bold">13+</div>
              <div className="text-xs">Years</div>
            </div>
          </motion.div>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -bottom-6 -left-6 bg-white dark:bg-black/90 backdrop-blur-sm p-4 rounded-xl border border-orange-500 shadow-xl"
          >
            <div className="flex items-center space-x-3">
              <TeamOutlined className="text-orange-500 text-2xl" />
              <div>
                <div className="text-gray-900 dark:text-white font-semibold">
                  5000+
                </div>
                <div className="text-orange-500 text-sm">Happy Families</div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
export default WhyChoose;

