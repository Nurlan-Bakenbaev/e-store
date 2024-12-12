const containerVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.3,
    },
  },
};

const itemVariants = (index) => ({
  hidden: {
    opacity: 0,
    y: index % 2 === 0 ? 20 : -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
    },
  },
});
export { containerVariants, itemVariants };
