// animations.js - Main animation file for the Bomfather website
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Initialize all animations
export function initAnimations() {
  // Wait for DOM to be fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      setupAnimations();
    });
  } else {
    setupAnimations();
  }
}

// Set up all animations
function setupAnimations() {
  // Hero section animations
  initHeroAnimations();
}

// Hero section animations
function initHeroAnimations() {
  // 1. Text reveal animation for hero headings and paragraphs
  const heroTitle = document.querySelector('.hero-title');
  const heroSubtitle = document.querySelector('.hero-subtitle');
  const heroButtons = document.querySelectorAll('.hero-cta .btn');
  
  if (heroTitle && heroSubtitle) {
    // Create a timeline for text animations
    const textTl = gsap.timeline({ defaults: { ease: 'power3.out' }});
    
    textTl
      .from(heroTitle, { 
        y: 30, 
        opacity: 0, 
        duration: 0.8 
      })
      .from(heroSubtitle, { 
        y: 20, 
        opacity: 0, 
        duration: 0.8 
      }, '-=0.4')
      .from(heroButtons, { 
        y: 20, 
        opacity: 0, 
        duration: 0.6,
        stagger: 0.2
      }, '-=0.4');
  }

  // 2. Merkle tree visualization animation
  animateMerkleTree();
  
  // 3. CTA button subtle animation
  const primaryCta = document.querySelector('.btn-primary');
  if (primaryCta) {
    // Create a repeating pulse animation for the primary CTA button
    gsap.to(primaryCta, {
      boxShadow: '0 0 15px rgba(27, 38, 59, 0.45)',
      scale: 1.03,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }
}

// Merkle tree visualization animation
function animateMerkleTree() {
  const merkleTreeContainer = document.querySelector('.merkle-visualization');
  if (!merkleTreeContainer) return;
  
  const nodes = merkleTreeContainer.querySelectorAll('.merkle-node');
  const connections = merkleTreeContainer.querySelectorAll('.merkle-connection');
  
  if (nodes.length === 0 || connections.length === 0) return;
  
  // Set initial state
  gsap.set(nodes, { opacity: 0, scale: 0 });
  gsap.set(connections, { opacity: 0, strokeDasharray: '100%', strokeDashoffset: '100%' });
  
  // Create a timeline for the merkle tree animation
  const merkleTl = gsap.timeline({
    scrollTrigger: {
      trigger: merkleTreeContainer,
      start: 'top 70%',
      end: 'bottom 20%',
      toggleActions: 'play none none reverse'
    }
  });
  
  merkleTl
    .to(nodes, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.7)'
    })
    .to(connections, {
      opacity: 1,
      strokeDashoffset: 0,
      duration: 0.8,
      stagger: 0.05
    }, '-=0.5');
}

// Initialize animations when this module is imported
initAnimations(); 