import { Layout } from "@/react-app/components/layout/Layout";
import { HeroSlider } from "@/react-app/components/home/HeroSlider";
import { NewsGrid } from "@/react-app/components/home/NewsGrid";
import { CategoryStrip } from "@/react-app/components/home/CategoryStrip";
import { VideoSection } from "@/react-app/components/home/VideoSection";
import { GallerySection } from "@/react-app/components/home/GallerySection";
import { NewsletterSignup } from "@/react-app/components/home/NewsletterSignup";
import { StudioLocations } from "@/react-app/components/home/StudioLocations";
import { Chatbot } from "@/react-app/components/ui/Chatbot";
import { LiveReel } from "@/react-app/components/home/LiveReel";
import { AIPulse } from "@/react-app/components/home/AIPulse";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5
    }
  }
};

export default function Home() {
  return (
    <Layout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-0"
      >
        <motion.div variants={itemVariants}><HeroSlider /></motion.div>
        <motion.div variants={itemVariants}><LiveReel /></motion.div>
        <motion.div variants={itemVariants}><CategoryStrip /></motion.div>
        <motion.div variants={itemVariants}><NewsGrid /></motion.div>
        <motion.div variants={itemVariants}><VideoSection /></motion.div>
        <motion.div variants={itemVariants}><AIPulse /></motion.div>
        <motion.div variants={itemVariants}><GallerySection /></motion.div>
        <motion.div variants={itemVariants}><StudioLocations /></motion.div>
        <motion.div variants={itemVariants}><NewsletterSignup /></motion.div>
        <Chatbot />
      </motion.div>
    </Layout>
  );
}



