import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container-custom px-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Rukshan Perera. All rights reserved.
          </p>
          
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            Built with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> using React & Tailwind
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
