'use client'

import { motion, useInView, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useEffect, useState, ReactNode } from 'react'
import { 
  Phone, Mail, MapPin, Clock, ChevronRight, Star, Shield, Award, Truck, 
  Factory, Users, Building2, School, Hospital, Home as HomeIcon, Briefcase, Check,
  Menu, X, Play, Pause, Volume2, VolumeX, Download, MessageCircle,
  Hammer, Paintbrush, Eye, Package, Settings, Sparkles, ChevronDown,
  Facebook, Instagram, Twitter, Youtube, ArrowRight, Quote, BadgeCheck
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  fadeIn, fadeInUp, fadeInDown, fadeInLeft, fadeInRight,
  scaleIn, popIn, bounceIn, staggerContainer, staggerContainerFast,
  slideInFromLeft, slideInFromRight, slideInFromBottom,
  viewportSettings, viewportSettingsOnce
} from '@/lib/animations'

// Animated counter component
function AnimatedCounter({ value, suffix = '', duration = 2 }: { value: number, suffix?: string, duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const springValue = useSpring(motionValue, { duration: duration * 1000 })
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  useEffect(() => {
    if (isInView) {
      motionValue.set(value)
    }
  }, [isInView, motionValue, value])
  
  const [displayValue, setDisplayValue] = useState(0)
  
  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayValue(Math.floor(latest))
    })
    return unsubscribe
  }, [springValue])
  
  return <span ref={ref}>{displayValue.toLocaleString()}{suffix}</span>
}

// Animated section wrapper
function AnimatedSection({ 
  children, 
  className = '', 
  variant = 'fadeInUp',
  delay = 0 
}: { 
  children: ReactNode, 
  className?: string, 
  variant?: 'fadeInUp' | 'fadeInDown' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'popIn' | 'bounceIn' | 'slideInFromLeft' | 'slideInFromRight' | 'slideInFromBottom',
  delay?: number
}) {
  const variants = {
    fadeInUp,
    fadeInDown,
    fadeInLeft,
    fadeInRight,
    scaleIn,
    popIn,
    bounceIn,
    slideInFromLeft,
    slideInFromRight,
    slideInFromBottom
  }
  
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      variants={variants[variant]}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Stagger container
function StaggerContainer({ children, className = '', fast = false }: { children: ReactNode, className?: string, fast?: boolean }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      variants={fast ? staggerContainerFast : staggerContainer}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Stagger item
function StaggerItem({ children, className = '', variant = 'fadeInUp' }: { children: ReactNode, className?: string, variant?: 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'popIn' }) {
  const variants = {
    fadeInUp,
    fadeInLeft,
    fadeInRight,
    scaleIn,
    popIn
  }
  
  return (
    <motion.div variants={variants[variant]} className={className}>
      {children}
    </motion.div>
  )
}

// Product images from the uploaded files
const productImages = [
  '/images/products/WhatsApp Image 2026-06-14 at 7.21.10 PM.jpeg',
  '/images/products/WhatsApp Image 2026-06-14 at 7.21.11 PM.jpeg',
  '/images/products/WhatsApp Image 2026-06-14 at 7.21.12 PM (1).jpeg',
  '/images/products/WhatsApp Image 2026-06-14 at 7.21.12 PM.jpeg',
  '/images/products/WhatsApp Image 2026-06-14 at 7.21.16 PM (1).jpeg',
  '/images/products/WhatsApp Image 2026-06-14 at 7.21.16 PM (2).jpeg',
  '/images/products/WhatsApp Image 2026-06-14 at 7.21.16 PM (3).jpeg',
  '/images/products/WhatsApp Image 2026-06-14 at 7.21.16 PM.jpeg',
  '/images/products/WhatsApp Image 2026-06-14 at 7.21.17 PM (1).jpeg',
  '/images/products/WhatsApp Image 2026-06-14 at 7.21.17 PM (2).jpeg',
  '/images/products/WhatsApp Image 2026-06-14 at 7.21.17 PM.jpeg',
  '/images/products/WhatsApp Image 2026-06-14 at 7.21.18 PM (1).jpeg',
  '/images/products/WhatsApp Image 2026-06-14 at 7.21.18 PM (2).jpeg',
  '/images/products/WhatsApp Image 2026-06-14 at 7.21.18 PM.jpeg',
  '/images/products/WhatsApp Image 2026-06-14 at 7.21.19 PM (1).jpeg',
  '/images/products/WhatsApp Image 2026-06-14 at 7.21.19 PM (2).jpeg',
  '/images/products/WhatsApp Image 2026-06-14 at 7.21.19 PM.jpeg',
  '/images/products/WhatsApp Image 2026-06-14 at 7.21.20 PM (1).jpeg',
  '/images/products/WhatsApp Image 2026-06-14 at 7.21.20 PM (2).jpeg',
  '/images/products/WhatsApp Image 2026-06-14 at 7.21.20 PM.jpeg',
  '/images/products/WhatsApp Image 2026-06-14 at 7.21.21 PM (1).jpeg',
  '/images/products/WhatsApp Image 2026-06-14 at 7.21.21 PM (2).jpeg',
  '/images/products/WhatsApp Image 2026-06-14 at 7.21.21 PM.jpeg',
  '/images/products/WhatsApp Image 2026-06-14 at 7.21.22 PM (1).jpeg',
  '/images/products/WhatsApp Image 2026-06-14 at 7.21.22 PM.jpeg',
  '/images/products/WhatsApp Image 2026-06-14 at 7.21.23 PM (1).jpeg',
  '/images/products/WhatsApp Image 2026-06-14 at 7.21.23 PM (2).jpeg',
  '/images/products/WhatsApp Image 2026-06-14 at 7.21.23 PM.jpeg',
  '/images/products/WhatsApp Image 2026-06-14 at 7.21.24 PM (1).jpeg',
  '/images/products/WhatsApp Image 2026-06-14 at 7.21.24 PM.jpeg'
]

const videos = [
  '/videos/WhatsApp Video 2026-06-14 at 7.21.12 PM.mp4',
  '/videos/WhatsApp Video 2026-06-14 at 7.21.13 PM (1).mp4',
  '/videos/WhatsApp Video 2026-06-14 at 7.21.13 PM (2).mp4',
  '/videos/WhatsApp Video 2026-06-14 at 7.21.13 PM (3).mp4',
  '/videos/WhatsApp Video 2026-06-14 at 7.21.13 PM.mp4',
  '/videos/WhatsApp Video 2026-06-14 at 7.21.14 PM (1).mp4',
  '/videos/WhatsApp Video 2026-06-14 at 7.21.14 PM (2).mp4',
  '/videos/WhatsApp Video 2026-06-14 at 7.21.14 PM.mp4',
  '/videos/WhatsApp Video 2026-06-14 at 7.21.15 PM (1).mp4'
]

// Header Component
function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Products', href: '#products' },
    { label: 'Process', href: '#process' },
    { label: 'Industries', href: '#industries' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' }
  ]
  
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.a 
            href="#home"
            className="flex items-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className={`font-bold text-2xl md:text-3xl ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              <span className="text-amber-500">राजदेव</span> Steel Furniture
            </div>
          </motion.a>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`font-medium transition-colors hover:text-amber-500 ${
                  isScrolled ? 'text-gray-700' : 'text-white'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 }}
            >
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-lg shadow-amber-500/30">
                Get Quote
              </Button>
            </motion.div>
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className={isScrolled ? 'text-gray-900' : 'text-white'} size={28} />
            ) : (
              <Menu className={isScrolled ? 'text-gray-900' : 'text-white'} size={28} />
            )}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-4 bg-white rounded-2xl shadow-xl p-6"
          >
            <nav className="flex flex-col gap-4">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="text-gray-700 font-medium py-2 hover:text-amber-500 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </motion.a>
              ))}
              <Button className="bg-gradient-to-r from-amber-500 to-orange-500 text-white mt-4">
                Get Quote
              </Button>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  )
}

// Hero Section
function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isVideoPlaying) {
        setCurrentSlide((prev) => (prev + 1) % productImages.length)
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [isVideoPlaying])
  
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Main Hero Background Image */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <img
          src="/images/hero-bg.png"
          alt="राजदेव Steel Furniture - Premium Steel Almirahs"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/85 via-gray-900/70 to-gray-900/85" />
      </motion.div>
      
      {/* Secondary Background Slideshow (subtle) */}
      <div className="absolute inset-0 opacity-0">
        {productImages.slice(0, 5).map((img, index) => (
          <motion.div
            key={img}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ 
              opacity: currentSlide === index ? 1 : 0,
              scale: currentSlide === index ? 1 : 1.1
            }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img
              src={img}
              alt={`Steel Furniture ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-900/60 to-gray-900/80" />
          </motion.div>
        ))}
      </div>
      
      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-10 w-32 h-32 bg-amber-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-1/4 right-10 w-48 h-48 bg-orange-500/20 rounded-full blur-3xl"
      />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm px-6 py-2 rounded-full mb-6"
          >
            <Award className="text-amber-400" size={20} />
            <span className="text-amber-100 font-medium">10+ Years of Excellence</span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Steel Furniture</span>
            <br />Manufacturing Excellence
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          >
            Transform your spaces with our high-quality steel almirahs, wardrobes, and custom furniture solutions. Trusted by 5000+ satisfied customers across Madhya Pradesh.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-6 text-lg shadow-2xl shadow-amber-500/30">
                Explore Products
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white px-8 py-6 text-lg hover:bg-white/20">
                <Play className="mr-2" size={20} />
                Watch Video
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto"
        >
          {[
            { value: 10000, suffix: '+', label: 'Products Delivered' },
            { value: 5000, suffix: '+', label: 'Happy Customers' },
            { value: 10, suffix: '+', label: 'Years Experience' },
            { value: 50, suffix: '+', label: 'Cities Served' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 md:p-6"
            >
              <div className="text-3xl md:text-4xl font-bold text-amber-400">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-gray-300 text-sm md:text-base mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <ChevronDown className="text-white/50" size={32} />
      </motion.div>
    </section>
  )
}

// About Section
function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <AnimatedSection variant="fadeInLeft">
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative rounded-3xl overflow-hidden shadow-2xl"
              >
                <img
                  src={productImages[2]}
                  alt="राजदेव Steel Furniture Factory"
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
              </motion.div>
              
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="absolute -bottom-8 -right-8 bg-white rounded-2xl shadow-xl p-6 max-w-xs"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Factory className="text-white" size={32} />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">10+</div>
                    <div className="text-gray-500">Years Experience</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
          
          {/* Content Side */}
          <AnimatedSection variant="fadeInRight">
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full mb-6"
              >
                <Sparkles className="text-amber-600" size={18} />
                <span className="text-amber-700 font-medium">About Our Company</span>
              </motion.div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
                Crafting Excellence in <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Steel Furniture</span>
              </h2>
              
              <p className="text-gray-600 text-lg mb-6">
                राजदेव Steel Furniture has been a trusted name in premium steel furniture manufacturing for over a decade. We specialize in creating durable, elegant, and functional steel almirahs, wardrobes, and custom furniture solutions for homes, offices, and institutions.
              </p>
              
              <p className="text-gray-600 mb-8">
                Our commitment to quality, innovation, and customer satisfaction has made us the preferred choice for thousands of customers across Madhya Pradesh. Every product is crafted with precision using high-grade steel and premium powder coating for lasting durability.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { icon: Shield, text: 'Quality Assured' },
                  { icon: Award, text: 'ISO Certified' },
                  { icon: Truck, text: 'Free Delivery' },
                  { icon: Users, text: 'Expert Team' }
                ].map((item, index) => (
                  <motion.div
                    key={item.text}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <item.icon className="text-amber-600" size={20} />
                    </div>
                    <span className="font-medium text-gray-700">{item.text}</span>
                  </motion.div>
                ))}
              </div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-6 text-lg">
                  Learn More About Us
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

// Why Choose Us Section
function WhyChooseUsSection() {
  const features = [
    {
      icon: Shield,
      title: 'Premium Quality Steel',
      description: 'We use high-grade steel with superior thickness for unmatched durability and strength.',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: Paintbrush,
      title: 'Powder Coated Finish',
      description: 'Advanced powder coating technology for rust resistance and beautiful, lasting colors.',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Settings,
      title: 'Custom Manufacturing',
      description: 'Get furniture tailored to your exact specifications - size, color, and features.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Truck,
      title: 'Free Delivery & Installation',
      description: 'Complimentary delivery and professional installation across Madhya Pradesh.',
      color: 'from-pink-500 to-purple-500'
    },
    {
      icon: Award,
      title: '10 Year Warranty',
      description: 'Industry-leading warranty coverage on all our steel furniture products.',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: BadgeCheck,
      title: 'Quality Inspection',
      description: 'Every product undergoes rigorous quality checks before delivery.',
      color: 'from-indigo-500 to-blue-500'
    }
  ]
  
  return (
    <section className="py-20 md:py-32 bg-gray-900 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <AnimatedSection className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-amber-500/20 px-4 py-2 rounded-full mb-6"
          >
            <Star className="text-amber-400" size={18} />
            <span className="text-amber-300 font-medium">Why Choose Us</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Why Customers Trust <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">राजदेव Steel Furniture</span>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            We are committed to delivering the highest quality steel furniture with exceptional service and support.
          </p>
        </AnimatedSection>
        
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <StaggerItem key={feature.title}>
              <motion.div
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 h-full"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6`}>
                  <feature.icon className="text-white" size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

// Featured Products Section
function FeaturedProductsSection() {
  const products = [
    { name: '2 Door Steel Almirah', image: productImages[0], price: '₹12,999', badge: 'Bestseller' },
    { name: '3 Door Steel Almirah', image: productImages[2], price: '₹18,999', badge: 'Popular' },
    { name: 'Mirror Almirah', image: productImages[4], price: '₹15,999', badge: 'New' },
    { name: 'Premium Designer Almirah', image: productImages[6], price: '₹24,999', badge: 'Premium' },
    { name: 'Steel Wardrobe', image: productImages[8], price: '₹22,999', badge: 'Trending' },
    { name: 'Office Cabinet', image: productImages[10], price: '₹14,999', badge: 'Commercial' }
  ]
  
  return (
    <section id="products" className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full mb-6"
          >
            <Sparkles className="text-amber-600" size={18} />
            <span className="text-amber-700 font-medium">Our Products</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Products</span>
          </h2>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Explore our range of premium steel furniture designed for durability, style, and functionality.
          </p>
        </AnimatedSection>
        
        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <StaggerItem key={product.name}>
              <motion.div
                whileHover={{ y: -10 }}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                      {product.badge}
                    </Badge>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Button className="w-full bg-white/90 text-gray-900 hover:bg-white">
                      Get Quote
                    </Button>
                  </motion.div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">Premium quality steel construction with powder coating</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-amber-600">{product.price}</span>
                    <span className="text-gray-400 text-sm">Starting Price</span>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="outline" size="lg" className="px-8 py-6 text-lg border-amber-500 text-amber-600 hover:bg-amber-50">
            View All Products
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

// Manufacturing Process Section
function ManufacturingProcessSection() {
  const steps = [
    {
      step: '01',
      title: 'Raw Material Selection',
      description: 'Premium grade steel sheets are carefully selected for durability and strength.',
      icon: Package
    },
    {
      step: '02',
      title: 'Steel Cutting & Fabrication',
      description: 'Precision cutting and expert fabrication ensure perfect dimensions and fit.',
      icon: Hammer
    },
    {
      step: '03',
      title: 'Powder Coating',
      description: 'Advanced powder coating process for rust resistance and beautiful finish.',
      icon: Paintbrush
    },
    {
      step: '04',
      title: 'Quality Inspection',
      description: 'Rigorous quality checks ensure every product meets our high standards.',
      icon: Eye
    },
    {
      step: '05',
      title: 'Packaging & Delivery',
      description: 'Safe packaging and timely delivery to your doorstep across MP.',
      icon: Truck
    }
  ]
  
  return (
    <section id="process" className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full mb-6"
          >
            <Factory className="text-amber-600" size={18} />
            <span className="text-amber-700 font-medium">Our Process</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Manufacturing <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Process</span>
          </h2>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Every product goes through a meticulous manufacturing process to ensure the highest quality standards.
          </p>
        </AnimatedSection>
        
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-orange-500 transform -translate-y-1/2 z-0" />
          
          <StaggerContainer className="grid md:grid-cols-3 lg:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, index) => (
              <StaggerItem key={step.step}>
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white rounded-2xl shadow-lg p-6 text-center relative"
                >
                  <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-amber-500/30">
                    <step.icon className="text-white" size={28} />
                  </div>
                  <div className="text-amber-500 font-bold text-sm mb-2">STEP {step.step}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-500 text-sm">{step.description}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}

// Product Comparison Section
function ProductComparisonSection() {
  const comparisons = [
    { feature: 'Storage Capacity', '2 Door': 'Medium', '3 Door': 'Large', 'Mirror': 'Medium', 'Premium': 'Extra Large' },
    { feature: 'Mirror Option', '2 Door': 'Optional', '3 Door': 'Yes', 'Mirror': 'Full Length', 'Premium': 'Designer Mirror' },
    { feature: 'Lock System', '2 Door': 'Standard', '3 Door': 'Double Lock', 'Mirror': 'Standard', 'Premium': 'Digital Lock' },
    { feature: 'Drawers', '2 Door': '2', '3 Door': '3', 'Mirror': '2', 'Premium': '4+' },
    { feature: 'Recommended For', '2 Door': 'Small Rooms', '3 Door': 'Family Use', 'Mirror': 'Bedroom', 'Premium': 'Luxury Homes' }
  ]
  
  return (
    <section className="py-20 md:py-32 bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-amber-500/20 px-4 py-2 rounded-full mb-6"
          >
            <Settings className="text-amber-400" size={18} />
            <span className="text-amber-300 font-medium">Compare Products</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Product <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Comparison</span>
          </h2>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Find the perfect almirah for your needs by comparing features across our product range.
          </p>
        </AnimatedSection>
        
        <AnimatedSection variant="scaleIn">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-4 px-6 text-left text-gray-400 font-medium">Features</th>
                  <th className="py-4 px-6 text-center text-amber-400 font-bold">2 Door</th>
                  <th className="py-4 px-6 text-center text-amber-400 font-bold">3 Door</th>
                  <th className="py-4 px-6 text-center text-amber-400 font-bold">Mirror</th>
                  <th className="py-4 px-6 text-center text-amber-400 font-bold">Premium</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, index) => (
                  <motion.tr
                    key={row.feature}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-gray-800 hover:bg-white/5 transition-colors"
                  >
                    <td className="py-4 px-6 text-gray-300 font-medium">{row.feature}</td>
                    <td className="py-4 px-6 text-center text-gray-400">{row['2 Door']}</td>
                    <td className="py-4 px-6 text-center text-gray-400">{row['3 Door']}</td>
                    <td className="py-4 px-6 text-center text-gray-400">{row['Mirror']}</td>
                    <td className="py-4 px-6 text-center text-gray-400">{row['Premium']}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// Industries We Serve Section
function IndustriesSection() {
  const industries = [
    { icon: HomeIcon, name: 'Homes', description: 'Residential furniture solutions' },
    { icon: Briefcase, name: 'Offices', description: 'Corporate and workspace furniture' },
    { icon: Building2, name: 'Hostels', description: 'Durable hostel furnishings' },
    { icon: School, name: 'Schools', description: 'Educational institution storage' },
    { icon: Users, name: 'Colleges', description: 'College and university solutions' },
    { icon: Hospital, name: 'Hospitals', description: 'Medical facility furniture' },
    { icon: Building2, name: 'Government', description: 'Government institution projects' },
    { icon: Factory, name: 'Commercial', description: 'Commercial building solutions' }
  ]
  
  return (
    <section id="industries" className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full mb-6"
          >
            <Building2 className="text-amber-600" size={18} />
            <span className="text-amber-700 font-medium">Industries We Serve</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Trusted Across <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Multiple Industries</span>
          </h2>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Our steel furniture solutions serve diverse sectors with customized offerings.
          </p>
        </AnimatedSection>
        
        <StaggerContainer fast className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {industries.map((industry, index) => (
            <StaggerItem key={industry.name} variant="popIn">
              <motion.div
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-gradient-to-br from-gray-50 to-white border border-gray-100 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all cursor-pointer group"
              >
                <div className="w-16 h-16 mx-auto bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <industry.icon className="text-white" size={28} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{industry.name}</h3>
                <p className="text-gray-500 text-sm">{industry.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

// Custom Manufacturing Section
function CustomManufacturingSection() {
  const options = [
    { icon: Paintbrush, title: 'Custom Colors', description: 'Choose from 50+ color options' },
    { icon: Settings, title: 'Custom Dimensions', description: 'Any size to fit your space' },
    { icon: Package, title: 'Additional Shelves', description: 'Extra storage as needed' },
    { icon: Shield, title: 'Special Lock Systems', description: 'Digital or mechanical locks' },
    { icon: Users, title: 'Bulk Orders', description: 'Special pricing for bulk' }
  ]
  
  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 relative overflow-hidden">
      {/* Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection variant="fadeInLeft">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                We Manufacture According To Your Requirements
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Get custom steel furniture designed specifically for your needs. Choose your colors, dimensions, and features to create the perfect storage solution.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {options.map((option, index) => (
                  <motion.div
                    key={option.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/20 backdrop-blur-sm rounded-xl p-4"
                  >
                    <option.icon className="text-white mb-2" size={24} />
                    <h3 className="text-white font-bold">{option.title}</h3>
                    <p className="text-white/80 text-sm">{option.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection variant="fadeInRight">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-3xl p-8 shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Request Custom Quote</h3>
              <form className="space-y-4">
                <div>
                  <Label htmlFor="custom-name">Your Name</Label>
                  <Input id="custom-name" placeholder="Enter your name" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="custom-phone">Phone Number</Label>
                  <Input id="custom-phone" placeholder="Enter phone number" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="custom-requirements">Your Requirements</Label>
                  <Textarea id="custom-requirements" placeholder="Describe your custom requirements..." className="mt-1" rows={4} />
                </div>
                <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-6 text-lg">
                  Submit Request
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </form>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Homeowner',
      location: 'Indore',
      message: 'Excellent quality steel almirah. The powder coating finish is amazing and the product is very durable. Highly recommended!',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'Interior Designer',
      location: 'Bhopal',
      message: 'I have been recommending राजदेव Steel Furniture to all my clients. Their custom manufacturing service is exceptional.',
      rating: 5
    },
    {
      name: 'Amit Patel',
      role: 'School Administrator',
      location: 'Ujjain',
      message: 'We ordered 50+ almirahs for our school hostel. Great quality, timely delivery, and excellent after-sales service.',
      rating: 5
    }
  ]
  
  return (
    <section className="py-20 md:py-32 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full mb-6"
          >
            <Quote className="text-amber-600" size={18} />
            <span className="text-amber-700 font-medium">Customer Reviews</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Customers Say</span>
          </h2>
        </AnimatedSection>
        
        <StaggerContainer className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <StaggerItem key={testimonial.name}>
              <motion.div
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl p-8 shadow-lg h-full"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="text-amber-400 fill-amber-400" size={20} />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">&ldquo;{testimonial.message}&rdquo;</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-500 text-sm">{testimonial.role}, {testimonial.location}</div>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

// Gallery Section with Videos
function GallerySection() {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  
  return (
    <section id="gallery" className="py-20 md:py-32 bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-amber-500/20 px-4 py-2 rounded-full mb-6"
          >
            <Play className="text-amber-400" size={18} />
            <span className="text-amber-300 font-medium">Gallery & Videos</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Product <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Gallery</span>
          </h2>
        </AnimatedSection>
        
        <StaggerContainer fast className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {productImages.slice(0, 8).map((img, index) => (
            <StaggerItem key={img} variant="scaleIn">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="aspect-square rounded-xl overflow-hidden cursor-pointer"
              >
                <img
                  src={img}
                  alt={`Gallery ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
        
        {/* Videos */}
        <AnimatedSection className="mt-12">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Product Videos</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {videos.slice(0, 3).map((video, index) => (
              <motion.div
                key={video}
                whileHover={{ scale: 1.02 }}
                className="relative rounded-xl overflow-hidden bg-gray-800 aspect-video cursor-pointer"
                onClick={() => setSelectedVideo(video)}
              >
                <video
                  src={video}
                  className="w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause()
                    e.currentTarget.currentTime = 0
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Play className="text-white" size={32} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>
      </div>
      
      {/* Video Modal */}
      {selectedVideo && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            className="relative max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={selectedVideo}
              className="w-full rounded-xl"
              controls
              autoPlay
            />
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 text-white hover:text-amber-400 transition-colors"
            >
              <X size={32} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}

// FAQ Section
function FAQSection() {
  const faqs = [
    {
      question: 'What is the steel thickness used in your products?',
      answer: 'We use high-grade steel with thickness ranging from 0.6mm to 1.2mm depending on the product. Our standard almirahs use 0.8mm steel for optimal durability.'
    },
    {
      question: 'Do you provide custom sizes?',
      answer: 'Yes, we specialize in custom manufacturing. You can specify your exact dimensions and we will create the furniture to your specifications.'
    },
    {
      question: 'What colors are available?',
      answer: 'We offer 50+ color options including classic shades like white, grey, and brown, as well as premium finishes like wooden textures and designer patterns.'
    },
    {
      question: 'Is delivery available in my area?',
      answer: 'We provide free delivery across all major cities in Madhya Pradesh including Indore, Bhopal, Ujjain, Dewas, Dhar, and Ratlam. Contact us for other locations.'
    },
    {
      question: 'What warranty do you offer?',
      answer: 'All our steel furniture comes with a 10-year warranty against manufacturing defects. This covers structural issues, coating problems, and hardware defects.'
    },
    {
      question: 'How long does manufacturing take?',
      answer: 'Standard products are available within 3-5 days. Custom orders typically take 7-14 days depending on the complexity and quantity.'
    }
  ]
  
  return (
    <section id="faq" className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full mb-6"
          >
            <Sparkles className="text-amber-600" size={18} />
            <span className="text-amber-700 font-medium">FAQ</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Questions</span>
          </h2>
        </AnimatedSection>
        
        <AnimatedSection className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`} className="bg-gray-50 rounded-xl px-6 border-none">
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:text-amber-600 hover:no-underline py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </AnimatedSection>
      </div>
    </section>
  )
}

// Contact Section
function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log('Form submitted:', formData)
  }
  
  return (
    <section id="contact" className="py-20 md:py-32 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full mb-6"
          >
            <Mail className="text-amber-600" size={18} />
            <span className="text-amber-700 font-medium">Contact Us</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Get In <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Touch</span>
          </h2>
        </AnimatedSection>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <AnimatedSection variant="fadeInLeft">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-3xl p-8 shadow-xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your name"
                      className="mt-1"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="Enter phone number"
                      className="mt-1"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    className="mt-1"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="message">Your Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your requirements..."
                    className="mt-1"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-6 text-lg">
                  Send Message
                  <ArrowRight className="ml-2" size={20} />
                </Button>
              </form>
            </motion.div>
          </AnimatedSection>
          
          {/* Contact Info */}
          <AnimatedSection variant="fadeInRight">
            <div className="space-y-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-lg flex items-start gap-4"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Phone</h4>
                  <p className="text-gray-600">+91 98765 43210</p>
                  <p className="text-gray-600">+91 98765 43211</p>
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-lg flex items-start gap-4"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Email</h4>
                  <p className="text-gray-600">info@lnsteelfurniture.com</p>
                  <p className="text-gray-600">sales@lnsteelfurniture.com</p>
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-lg flex items-start gap-4"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Address</h4>
                  <p className="text-gray-600">Industrial Area, Sector 25,<br />Indore, Madhya Pradesh - 452001</p>
                </div>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl p-6 shadow-lg flex items-start gap-4"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Business Hours</h4>
                  <p className="text-gray-600">Monday - Saturday: 9 AM - 7 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </motion.div>
            </div>
          </AnimatedSection>
        </div>
        
        {/* Google Map */}
        <AnimatedSection className="mt-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-xl h-96"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117925.35230513822!2d75.82548955000001!3d22.7239727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fcad1b410ddb%3A0x96ec4da356240f4!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1699999999999!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  )
}

// Bulk Order Section
function BulkOrderSection() {
  const [inquiryType, setInquiryType] = useState('dealer')
  
  return (
    <section className="py-20 md:py-32 bg-gray-900 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <AnimatedSection variant="fadeInLeft">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-amber-500/20 px-4 py-2 rounded-full mb-6"
              >
                <Users className="text-amber-400" size={18} />
                <span className="text-amber-300 font-medium">Partner With Us</span>
              </motion.div>
              
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                Bulk Orders & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Dealer Inquiry</span>
              </h2>
              
              <p className="text-gray-400 text-lg mb-8">
                We welcome inquiries from dealers, distributors, furniture shops, contractors, and institutions. Get special pricing for bulk orders.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                {['Dealers', 'Distributors', 'Furniture Shops', 'Contractors', 'Institutions', 'Hotels'].map((type, index) => (
                  <motion.div
                    key={type}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 text-gray-300"
                  >
                    <Check className="text-amber-400" size={18} />
                    <span>{type}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimatedSection>
          
          <AnimatedSection variant="fadeInRight">
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="bg-white rounded-3xl p-8 shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Submit Your Inquiry</h3>
              
              <Tabs defaultValue="dealer" onValueChange={setInquiryType}>
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="dealer">Dealer</TabsTrigger>
                  <TabsTrigger value="bulk">Bulk Order</TabsTrigger>
                  <TabsTrigger value="institution">Institution</TabsTrigger>
                </TabsList>
                
                <TabsContent value="dealer">
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Business Name</Label>
                        <Input placeholder="Your business name" className="mt-1" />
                      </div>
                      <div>
                        <Label>Contact Person</Label>
                        <Input placeholder="Contact person name" className="mt-1" />
                      </div>
                    </div>
                    <div>
                      <Label>Phone Number</Label>
                      <Input placeholder="Enter phone number" className="mt-1" />
                    </div>
                    <div>
                      <Label>City</Label>
                      <Input placeholder="Enter your city" className="mt-1" />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-6">
                      Submit Dealer Inquiry
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="bulk">
                  <form className="space-y-4">
                    <div>
                      <Label>Your Name</Label>
                      <Input placeholder="Enter your name" className="mt-1" />
                    </div>
                    <div>
                      <Label>Phone Number</Label>
                      <Input placeholder="Enter phone number" className="mt-1" />
                    </div>
                    <div>
                      <Label>Quantity Required</Label>
                      <Input placeholder="Number of units" className="mt-1" />
                    </div>
                    <div>
                      <Label>Product Requirements</Label>
                      <Textarea placeholder="Describe your requirements..." className="mt-1" />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-6">
                      Submit Bulk Inquiry
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="institution">
                  <form className="space-y-4">
                    <div>
                      <Label>Institution Name</Label>
                      <Input placeholder="Institution name" className="mt-1" />
                    </div>
                    <div>
                      <Label>Institution Type</Label>
                      <Select>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="school">School</SelectItem>
                          <SelectItem value="college">College</SelectItem>
                          <SelectItem value="hospital">Hospital</SelectItem>
                          <SelectItem value="hotel">Hotel</SelectItem>
                          <SelectItem value="government">Government</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Contact Details</Label>
                      <Input placeholder="Phone / Email" className="mt-1" />
                    </div>
                    <div>
                      <Label>Requirements</Label>
                      <Textarea placeholder="Describe your requirements..." className="mt-1" />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-6">
                      Submit Institution Inquiry
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  )
}

// Download Catalog Section
function DownloadCatalogSection() {
  const [showForm, setShowForm] = useState(false)
  
  return (
    <section className="py-16 bg-gradient-to-r from-amber-500 to-orange-500 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedSection className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Download Our Product Catalogue
            </h2>
            <p className="text-white/80">
              Get the complete product catalog with prices and specifications
            </p>
          </div>
          
          <Dialog>
            <DialogTrigger asChild>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-white text-amber-600 hover:bg-gray-100 px-8 py-6 text-lg shadow-xl">
                  <Download className="mr-2" size={20} />
                  Download Catalogue
                </Button>
              </motion.div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Download Catalogue</DialogTitle>
                <DialogDescription>
                  Please provide your details to download the catalogue.
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="catalog-name">Your Name</Label>
                  <Input id="catalog-name" placeholder="Enter your name" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="catalog-phone">Mobile Number</Label>
                  <Input id="catalog-phone" placeholder="Enter mobile number" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="catalog-email">Email (Optional)</Label>
                  <Input id="catalog-email" type="email" placeholder="Enter email" className="mt-1" />
                </div>
                <Button type="submit" className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white">
                  Download Now
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </AnimatedSection>
      </div>
    </section>
  )
}

// Location Coverage Section
function LocationCoverageSection() {
  const locations = [
    { name: 'Indore', type: 'Headquarters' },
    { name: 'Bhopal', type: 'Major City' },
    { name: 'Ujjain', type: 'Major City' },
    { name: 'Dewas', type: 'City' },
    { name: 'Dhar', type: 'City' },
    { name: 'Ratlam', type: 'City' },
    { name: 'Jabalpur', type: 'City' },
    { name: 'Gwalior', type: 'City' }
  ]
  
  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full mb-6"
          >
            <MapPin className="text-amber-600" size={18} />
            <span className="text-amber-700 font-medium">Our Reach</span>
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
            Areas We <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">Serve</span>
          </h2>
          
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We deliver premium steel furniture across Madhya Pradesh with free delivery in major cities.
          </p>
        </AnimatedSection>
        
        <StaggerContainer className="flex flex-wrap justify-center gap-4">
          {locations.map((location, index) => (
            <StaggerItem key={location.name} variant="popIn">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-full px-6 py-3 cursor-pointer hover:border-amber-300 hover:shadow-lg transition-all"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="text-amber-500" size={18} />
                  <span className="font-medium text-gray-900">{location.name}</span>
                  {location.type === 'Headquarters' && (
                    <Badge className="bg-amber-500 text-white text-xs">HQ</Badge>
                  )}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-full px-8 py-3 cursor-pointer shadow-lg"
          >
            <span className="font-medium text-white">Entire Madhya Pradesh</span>
          </motion.div>
        </StaggerContainer>
      </div>
    </section>
  )
}

// Footer
function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <AnimatedSection variant="fadeInUp">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white mb-4">
                <span className="text-amber-500">राजदेव</span> Steel Furniture
              </h3>
              <p className="text-gray-400 mb-4">
                Premium steel furniture manufacturer with 10+ years of experience. Trusted by 5000+ customers across Madhya Pradesh.
              </p>
              <div className="flex gap-4">
                {[Facebook, Instagram, Twitter, Youtube].map((Icon, index) => (
                  <motion.a
                    key={index}
                    href="#"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-amber-500 transition-colors"
                  >
                    <Icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </AnimatedSection>
          
          {/* Quick Links */}
          <AnimatedSection variant="fadeInUp" delay={0.1}>
            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {['About Us', 'Products', 'Manufacturing Process', 'Gallery', 'Contact Us', 'FAQ'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                    <ChevronRight size={16} />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </AnimatedSection>
          
          {/* Products */}
          <AnimatedSection variant="fadeInUp" delay={0.2}>
            <h4 className="text-lg font-bold text-white mb-4">Our Products</h4>
            <ul className="space-y-3">
              {['Steel Almirah', 'Steel Wardrobe', 'Office Cabinets', 'Custom Furniture', 'Hostel Furniture', 'Institutional Furniture'].map((product) => (
                <li key={product}>
                  <a href="#" className="hover:text-amber-400 transition-colors flex items-center gap-2">
                    <ChevronRight size={16} />
                    {product}
                  </a>
                </li>
              ))}
            </ul>
          </AnimatedSection>
          
          {/* Contact */}
          <AnimatedSection variant="fadeInUp" delay={0.3}>
            <h4 className="text-lg font-bold text-white mb-4">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="text-amber-500 mt-1 flex-shrink-0" size={18} />
                <span>Industrial Area, Sector 25, Indore, MP - 452001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-amber-500" size={18} />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-amber-500" size={18} />
                <span>info@lnsteelfurniture.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Clock className="text-amber-500" size={18} />
                <span>Mon-Sat: 9 AM - 7 PM</span>
              </li>
            </ul>
          </AnimatedSection>
        </div>
        
        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm">
              © 2024 राजदेव Steel Furniture. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-500 hover:text-amber-400 transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-amber-400 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// WhatsApp Floating Button
function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/919876543210?text=Hello,%20I%20am%20interested%20in%20your%20Steel%20Almirah%20collection.%20Please%20share%20details."
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50 hover:bg-green-600 transition-colors"
    >
      <MessageCircle className="text-white" size={32} />
      <motion.span
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute w-full h-full rounded-full border-4 border-green-400"
      />
    </motion.a>
  )
}

// Main Page Component
export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <AboutSection />
      <WhyChooseUsSection />
      <FeaturedProductsSection />
      <ManufacturingProcessSection />
      <ProductComparisonSection />
      <IndustriesSection />
      <CustomManufacturingSection />
      <TestimonialsSection />
      <GallerySection />
      <LocationCoverageSection />
      <BulkOrderSection />
      <FAQSection />
      <DownloadCatalogSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  )
}
