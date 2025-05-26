import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const features = [
  {
    id: 1,
    title: 'Fast Delivery',
    description:
      'Get your products delivered in record time with our efficient shipping.',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-indigo-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10h1l3 6h11v-6H6l-3-6H3"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Secure Payments',
    description:
      'Safe and encrypted payment options for a worry-free experience.',
    icon: (
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-indigo-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        whileHover={{ scale: 1.2, rotate: 10, color: '#6366F1' }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 11c0-2.21-1.79-4-4-4s-4 1.79-4 4v3a4 4 0 008 0v-3z"
        />
      </motion.svg>
    ),
  },
  {
    id: 3,
    title: '24/7 Support',
    description:
      'Our support team is always ready to help you with any issues.',
    icon: (
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-12 w-12 text-indigo-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        whileHover={{ scale: 1.2, rotate: -10, color: '#6366F1' }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M18 8a6 6 0 01-12 0"
        />
      </motion.svg>
    ),
  },
];

const cardVariants = {
  initial: { scale: 1, boxShadow: '0 0 10px rgba(0,0,0,0.1)' },
  hover: {
    scale: 1.05,
    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
  active: {
    scale: 1.1,
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
    transition: { type: 'spring', stiffness: 300, damping: 15 },
  },
};

const descriptionVariants = {
  hidden: { opacity: 0, height: 0, overflow: 'hidden' },
  visible: { opacity: 1, height: 'auto', overflow: 'visible', transition: { duration: 0.3 } },
};

function Feature() {
  const [activeId, setActiveId] = useState(null);

  const toggleFeature = (id) => {
    setActiveId(activeId === id ? null : id);
  };

  return (
    <section className="bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map(({ id, title, description, icon }) => {
            const isActive = id === activeId;

            return (
              <motion.div
                key={id}
                onClick={() => toggleFeature(id)}
                className="bg-white rounded-lg p-6 cursor-pointer select-none"
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    toggleFeature(id);
                  }
                }}
                variants={cardVariants}
                initial="initial"
                animate={isActive ? 'active' : 'initial'}
                whileHover="hover"
              >
                <div className="mb-4 mx-auto w-12 h-12">{icon}</div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.p
                      key="desc"
                      className="text-gray-600 mt-2"
                      variants={descriptionVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      {description}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Feature;
