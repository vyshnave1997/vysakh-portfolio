import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroSection() {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const canvasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);
  
  const roles = ['Quality Analyst', 'TOSCA Automation Tester'];
  const staticText = ',\nfrom India.';

  // Typing effect
  useEffect(() => {
    const currentRole = roles[loopNum % roles.length];
    
    const handleType = () => {
      if (!isDeleting && displayedText === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
        return;
      }
      
      if (isDeleting && displayedText === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        return;
      }
      
      if (isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
      }
    };
    
    const timer = setTimeout(handleType, isDeleting ? 50 : 100);
    
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, loopNum]);

  // Three.js Hyperspeed Effect
  useEffect(() => {
    if (!canvasRef.current) return;

    const container = canvasRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    camera.position.z = 5;

    // Create star field with multiple colors
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 3000;
    const positions = new Float32Array(starCount * 3);
    const velocities = new Float32Array(starCount);
    const colors = new Float32Array(starCount * 3);
    const sizes = new Float32Array(starCount);

    const colorPalette = [
      new THREE.Color(0x22d3ee), // cyan
      new THREE.Color(0x3b82f6), // blue
      new THREE.Color(0x8b5cf6), // purple
      new THREE.Color(0xffffff), // white
    ];

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 150;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 150;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 150;
      velocities[i] = Math.random() * 0.8 + 0.3;
      sizes[i] = Math.random() * 0.15 + 0.05;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    starGeometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 1));
    starGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    starGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const starMaterial = new THREE.PointsMaterial({
      size: 0.1,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      sizeAttenuation: true
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Create road lines with glow
    const roadLines: THREE.Mesh[] = [];
    const roadLineGeometry = new THREE.PlaneGeometry(0.2, 10);

    for (let i = 0; i < 6; i++) {
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: i % 2 === 0 ? 0x22d3ee : 0x8b5cf6,
        transparent: true,
        opacity: 0.7,
        side: THREE.DoubleSide
      });
      
      const line = new THREE.Mesh(roadLineGeometry, glowMaterial);
      const xPos = (i - 2.5) * 2.5;
      line.position.set(xPos, 0, -5);
      line.rotation.x = -Math.PI / 2;
      roadLines.push(line);
      scene.add(line);
    }

    // Create light trails
    const trailGeometry = new THREE.BufferGeometry();
    const trailCount = 100;
    const trailPositions = new Float32Array(trailCount * 3);
    const trailColors = new Float32Array(trailCount * 3);

    for (let i = 0; i < trailCount; i++) {
      trailPositions[i * 3] = (Math.random() - 0.5) * 20;
      trailPositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      trailPositions[i * 3 + 2] = Math.random() * -50;

      const color = Math.random() > 0.5 ? new THREE.Color(0x22d3ee) : new THREE.Color(0x8b5cf6);
      trailColors[i * 3] = color.r;
      trailColors[i * 3 + 1] = color.g;
      trailColors[i * 3 + 2] = color.b;
    }

    trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
    trailGeometry.setAttribute('color', new THREE.BufferAttribute(trailColors, 3));

    const trailMaterial = new THREE.PointsMaterial({
      size: 0.3,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      vertexColors: true
    });

    const trails = new THREE.Points(trailGeometry, trailMaterial);
    scene.add(trails);

    // Animation
    let speedMultiplier = 1;
    let targetSpeed = 1;
    let time = 0;

    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Smooth speed transition
      speedMultiplier += (targetSpeed - speedMultiplier) * 0.05;

      // Animate stars
      const positions = starGeometry.attributes.position.array as Float32Array;
      const velocities = starGeometry.attributes.velocity.array as Float32Array;
      const sizes = starGeometry.attributes.size.array as Float32Array;

      for (let i = 0; i < starCount; i++) {
        positions[i * 3 + 2] += velocities[i] * speedMultiplier;
        
        // Pulse effect
        sizes[i] = Math.abs(Math.sin(time + i * 0.01)) * 0.15 + 0.05;
        
        if (positions[i * 3 + 2] > 50) {
          positions[i * 3 + 2] = -50;
          positions[i * 3] = (Math.random() - 0.5) * 150;
          positions[i * 3 + 1] = (Math.random() - 0.5) * 150;
        }
      }
      starGeometry.attributes.position.needsUpdate = true;
      starGeometry.attributes.size.needsUpdate = true;

      // Animate road lines with wave effect
      roadLines.forEach((line, idx) => {
        line.position.z += 0.5 * speedMultiplier;
        const material = line.material as THREE.MeshBasicMaterial;
        material.opacity = 0.5 + Math.sin(time * 2 + idx) * 0.3;
        
        if (line.position.z > 10) {
          line.position.z = -20;
        }
      });

      // Animate light trails
      const trailPositions = trailGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < trailCount; i++) {
        trailPositions[i * 3 + 2] += 0.8 * speedMultiplier;
        trailPositions[i * 3 + 1] += Math.sin(time + i * 0.1) * 0.02;
        
        if (trailPositions[i * 3 + 2] > 10) {
          trailPositions[i * 3 + 2] = -50;
          trailPositions[i * 3] = (Math.random() - 0.5) * 20;
          trailPositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
        }
      }
      trailGeometry.attributes.position.needsUpdate = true;

      // Camera shake on speed
      if (speedMultiplier > 2) {
        camera.position.x = Math.sin(time * 10) * 0.1;
        camera.position.y = Math.cos(time * 10) * 0.1;
      } else {
        camera.position.x += (0 - camera.position.x) * 0.1;
        camera.position.y += (0 - camera.position.y) * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Mouse interaction for speed
    const handleMouseDown = () => {
      targetSpeed = 3;
    };

    const handleMouseUp = () => {
      targetSpeed = 1;
    };

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    sceneRef.current = { scene, camera, renderer, container };

    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseup', handleMouseUp);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div id="home" className="relative h-screen bg-black text-white overflow-hidden">
      {/* Three.js Background */}
      <div ref={canvasRef} className="absolute inset-0 z-0" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-between px-8 py-8 pb-20">
          {/* Header */}
          <header className="pt-4">
            <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-extrabold lg:font-black">
              iamvysakh
            </h1>
          </header>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-16 md:gap-8">
            {/* Left: Typing Text */}
            <div className="flex-1">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-light leading-tight whitespace-pre-line">
                {displayedText}
                <span className="animate-pulse">|</span>
                {staticText}
              </h2>
            </div>

            {/* Right: Connect Button */}
            <div className="flex gap-4">
              <a 
                href="#info" 
                className="group flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-cyan-400 text-cyan-400 rounded-full font-medium text-lg hover:bg-cyan-400 hover:text-black transition-all duration-300 hover:gap-5"
              >
                <span>Connect</span>
                <svg 
                  className="w-5 h-5 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>


    </div>
  );
}