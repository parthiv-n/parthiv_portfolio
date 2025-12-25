import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import TextType from './TextType';
import { SmoothCursor } from '@/components/lightswind/smooth-cursor';
import WalkingSprite from './WalkingSprite';

const Portfolio = () => {
  // Available animals with their vertical positions (adjust these values)
  const animalConfig = {
    'Deer': { bottomPosition: -8 },
    'Boar': { bottomPosition: -12 },
    'Fox': { bottomPosition: -12 },
    'Hare': { bottomPosition: -12 },
    'Black_grouse': { bottomPosition: -16 },
  };
  
  const animals = Object.keys(animalConfig);

  // State to manage the active content section
  const [activeSection, setActiveSection] = useState('home');
  // State to manage selected project for modal
  const [selectedProject, setSelectedProject] = useState(null);
  // State to manage carousel image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  // State to manage leadership carousel indices (one per item)
  const [leadershipImageIndices, setLeadershipImageIndices] = useState({});
  // State for image viewer modal
  const [viewerImage, setViewerImage] = useState(null);
  const [viewerImageCircular, setViewerImageCircular] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const viewerImageRef = useRef(null);
  
  // Refs for turtle animation
  const cursorRef = useRef(null);
  const headerRef = useRef(null);

  // Navigation Items
  const navItems = [
    { id: 'home', label: 'home' },
    { id: 'work', label: "projects i've worked on" },
    { id: 'leadership', label: 'leadership' },
  ];

  // Projects Data - Easy to edit and add new projects
  const projects = [

    {
      id: 1,
      title: 'DXTR (W.I.P)',
      year: 'Oct 2025 - May 2026',
      event: 'UCL 4th Year Final Project',
      skills: ['JavaScript', 'REST API','CAD','react', 'typescript'],
      description: 'A gamified rehabilitation device for stroke survivors. This is our final year project at UCL, and as a team of 6, we are aiming to redefine the status quo of physiotherapy.',
      thumbnail: '/DXTR CAD.png',
      placeholder: '[ project_thumbnail_3.png ]',
      details: `**DXTR – Gamified Hand Rehabilitation Device**

DXTR is a handheld rehab device for stroke survivors who still have some voluntary hand and wrist movement and want to improve strength, range, and dexterity. Force sensors and an IMU capture key movements (grip, pronation/supination, wrist motion, finger extension, thumb contraction) and send them to a web app. The app turns these exercises into simple 2D games and "daily missions," helping patients stay engaged while giving clinicians clear data on repetitions, range of motion, and adherence.

**My Role – UI & Game Layer**
I am responsible for the web interface and mini-games. This includes designing the patient dashboard, implementing simple in-browser games driven by real-time sensor input, and building clinician views that visualize key rehab metrics. I will integrate the UI with the device’s local API so that sensor data becomes live feedback for patients and meaningful progress summaries for clinicians.`,
      images: ['/DXTR CAD.png','/DXTR welcome.png','/DXTR patient dashboard.png','/DXTR clinician dashboard.png'],
    },
    {
      id: 2,
      title: 'pibblepay',
      year: 'Dec 2025',
      event: 'SpoonOS x ElevenLabs Hackathon',
      skills: ['SpoonOS Core','SpoonOS Toolkit', 'NEO Blockchain', 'Python', 'ElevenLabs', 'gemini API', 'react'],
      description: 'An AI-powered, visual smart contract builder that lets non-technical freelancers create Neo smart contracts through chat and interactive blocks, powered by SpoonOS multi-agent workflows.',
      thumbnail: '/images and content/pibblepaylogo.png',
      placeholder: '[ project_thumbnail.png ]',
      details: `Pibblepay is built as a graph-based multi-agent system using SpoonOS.
A central StateGraph orchestrates specialised agents responsible for:

- Extracting structured contract data from natural language input

- Driving a visual block representation derived directly from that state

- Generating Neo-compatible smart contract code (Python/TypeScript)

- Validating completeness and producing plain-English explanations

Persistent user context is handled via SpoonOS Mem0 memory tools, enabling long-term memory across sessions. Audio output is integrated using the SpoonOS ElevenLabs TTS tool, ensuring native tool usage within the agent framework. The system cleanly separates user interaction, state management, and contract generation, resulting in a scalable, extensible architecture for non-technical Web3 creation.`,
      images: ['/images and content/pibblepay slidecover.jpg','/images and content/pibblepay webimage.jpg','/images and content/pibblepay winning.jpg', ],
      demoLink: 'https://pibblepay.vercel.app/',
      githubLink: 'https://github.com/parthiv-n/pibblepay',
      videoLink: 'https://www.youtube.com/watch?v=uIDGJ7ybDLo',
      videoLink: 'https://www.youtube.com/watch?v=uIDGJ7ybDLo'
    },
    {
      id: 3,
      title: 'pharmamiku',
      year: 'Nov 2025',
      event: 'The Great Agent Hack',
      skills: ['Amazon Bedrock','LangGraph','Python','Bedrock SDK', 'react', 'typescript', 'tailwind CSS'],
      description:  'PharmaMiku is a multi-agent AI system built on Amazon Bedrock that delivers medically grounded health explanations with full decision traceability. The system offers security through observable agent trajectories and systematic red-team testing.',
      thumbnail: '/images and content/pharmamiku cover.png',
      placeholder: '[ project_thumbnail_2.png ]',
      details: `PharmaMiku is a glass-box, multi-agent AI assistant designed to safely explain medical and pharmaceutical information to users of all ages, from children to elderly patients.

Rather than relying on a single opaque model, the system is architected as a multi-stage agent pipeline, where each agent has a narrowly defined responsibility. This design enables full observability, explainability, and security assessment at every step.

**The system processes each user query through a sequence of specialized agents:**

**Input Classifier Agent**
Identifies user intent, estimates risk level, and detects when a question should be escalated to a healthcare professional.

**Safety Supervisor Agent**
Applies policy and safety constraints to determine whether a request can be answered, softened, or blocked.

**Medical Reasoning & Evidence Agent**
Retrieves trusted medical information via external tools and synthesizes a canonical, medically correct answer.

**Response Agent (PharmaMiku)**

Converts the canonical medical answer into a friendly, kawaii, age-appropriate explanation, adapting tone and complexity based on user context while preserving safety boundaries.

**Safety Judge Agent**
Performs a final review of the user-facing response to catch unsafe phrasing or policy violations.

**Glass-Box Reasoning Agent**
Generates human-readable explanations of the agent's internal decision path, enabling auditability and failure analysis.

All agent decisions, tool calls, and transformations are logged and visualized, enabling stakeholders to trace exactly why the system responded the way it did.`,
      images: ['/images and content/pharmamiku cover.png', '/images and content/pharmamiku poster.jpg', '/images and content/pharmamiku demo pic.jpg', '/images and content/pharmamiku certificate.jpg', '/images and content/pharmamiku figdetspinner.jpg'],
    },
    {
      id: 4,
      title: 'Weightcut Wizard',
      year: 'Oct 2025',
      event: 'loveable x gemini workshop',
      skills: ['gemini API', 'react', 'REST API', 'typescript', 'tailwind CSS', 'supabase'],
      description: 'Weightcut Wizard is an AI-assisted training and nutrition system designed to help combat sport athletes manage weight cuts safely and effectively. The system combines sports-science–based calculations, structured data tracking, and an AI coaching layer to guide users through weight management without relying on extreme or unsafe practices.',
      thumbnail: '/images and content/wizard logo.png',
      placeholder: '[ project_thumbnail_3.png ]',
      details: `Weightcut Wizard was built around real problems fighters deal with: unclear timelines, unrealistic targets, and not knowing whether a cut is on track until it's already gone wrong.

The system starts with simple inputs—current weight, target weight, fight date, and training load—and turns them into a structured plan grounded in sports-science basics. From there, it tracks progress over time and highlights when things are moving too fast or drifting off course.

Instead of dumping raw numbers on the user, Weightcut Wizard uses an AI coaching layer to explain what's happening in plain language and suggest adjustments that actually make sense for someone in camp. Weight trends, hydration risk, and timeline pressure are visualised clearly, so fighters can see at a glance whether they're in a safe zone or pushing too hard.

It's a straightforward tool meant to support smarter cuts, better preparation, and fewer bad surprises on the scale.`,
      images: ['/images and content/wizard logo.png', '/images and content/wizard present.jpg', '/images and content/wizard dashboard.jpg', '/images and content/wizard mepresent.jpg', '/images and content/wizard mealprep.jpg', '/images and content/wizard nutrition.jpg', '/images and content/wizard fightweek.jpg'],
    },
    {
      id: 5,
      title: 'Prostate Cancer Detection from mpMRI Images',
      year: '2025',
      event: 'UCL 3rd Year Dissertation',
      skills: ['Python', 'PyTorch', 'MR Imaging', 'Segmentation', 'Dice Loss'],
      description: 'My dissertation: can an AI model highlight likely prostate cancer lesions on MRI to help clinicians read scans more consistently? I trained a baseline 3D U-Net on 851 UCL cases and evaluated where it helps (clearer tumours) and where it fails (subtle cases).',
      thumbnail: '/images and content/prostateresult2.png',
      placeholder: '[ dissertation_cover.png ]',
      details: `
I built a baseline AI model that segments prostate cancer lesions on prostate MRI scans. The goal of this model is to act like a consistent second opinion that could help with triage and reduce reader-to-reader variability.

**What It Does**
- Input: multiparametric MRI (T2, ADC, high b-value DWI)
- Output: a 3D segmentation mask of the suspected lesion

**Technical Details**
**Objective**
Compare model segmentations against expert radiologist annotations.

**Dataset**
- 851 patients (UCL clinical trial datasets)
- Multi-sequence 3D input (T2W + ADC + high b-value DWI)

**Preprocessing**
- Co-registration & resampling to a shared grid
- Normalization + data augmentation

**Model**
- Architecture: 3D U-Net (encoder–decoder with skip connections)
- Loss: Dice loss (handles class imbalance)
- Optimizer: Adam (lr = 0.001)
- Training: single GPU (~20 hours)

**Results**
- Bimodal behaviour: either decent performance or near-total failure
- Clear, larger tumours (especially peripheral zone) worked moderately well
- Dice Similarity Coefficient (DSC) ~0.50 when excluding complete failures
- ~20% complete misses; weaker on subtle/small and transition-zone lesions

**Conclusion**
As a baseline, a simple 3D U-Net can reach performance comparable to human agreement in the “easier” cases. It’s promising for consistent triage/workflow support, but not a standalone diagnostic tool.`,
      demoLink: '/Final Report Final.pdf',
      images: [
        //'/images and content/titlepicdis.png',
        '/images and content/prostateresult.png',
        '/images and content/disresults.png',
        '/images and content/prostatezones.png',
        '/images and content/prostateresult2.png',
        '/images and content/unetarchitecture.png',

      ],
    }
  ];

  // Leadership Data - Easy to edit and add new leadership items
  const leadershipItems = [
    {
      id: 1,
      title: 'Marketing Director',
      organization: 'UCL Engineering Society',
      year: '2024 – 2025',
      description: 'Led marketing for 3,000+ members, secured £8,000+ in sponsorships from Qualcomm, Bloomberg, and Shell, and grew engagement by 20% through a full brand refresh.',
      details: '',
      thumbnail: '/images and content/ucl_eng_society_logo.png',
      placeholder: '[ UCL Engineering Society logo ]',
      images: ['/images and content/ucl_eng_society_logo.png'],
    },
    {
      id: 2,
      title: 'Vice President',
      organization: 'UCL Surgery and Interventional Science Society',
      year: '2023 – 2024',
      description: 'Refounded the society with a peer after a period of inactivity, rebuilt its committee, and grew membership from 0 to 50+ within one year through targeted outreach and events.',
      details: '',
      thumbnail: '/images and content/ucl_surgery_society_logo.png',
      placeholder: '[ UCL Surgery and Interventional Science Society logo ]',
      images: ['/images and content/ucl_surgery_society_logo.png'],
    },
    {
      id: 3,
      title: 'Welfare Officer',
      organization: 'UCL Muay Thai Club',
      year: '2025 – 2026',
      description: 'Promoted member wellbeing by supporting inclusion, managing welfare initiatives, and helping maintain a positive club culture.',
      details: '',
      thumbnail: '/images and content/ucl_muaythai_logo.png',
      placeholder: '[ UCL Muay Thai Club logo ]',
      images: ['/images and content/ucl_muaythai_logo.png'],
    },
    {
      id: 4,
      title: 'Gear Secretary',
      organization: 'UCL Muay Thai Club',
      year: '2024 – 2025',
      description: 'Oversaw club equipment management and logistics, ensuring safety and readiness for all training sessions and competitions.',
      details: '',
      thumbnail: '/images and content/ucl_muaythai_logo.png',
      placeholder: '[ UCL Muay Thai Club logo ]',
      images: ['/images and content/ucl_muaythai_logo.png'],
    },
  ];

  // Reset turtle position and clear selected project when section changes
  useEffect(() => {
    if (cursorRef.current) {
      gsap.set(cursorRef.current, { x: 0 });
    }
    setSelectedProject(null);
    setCurrentImageIndex(0);
    setViewerImage(null);
    setViewerImageCircular(false);
    setZoomLevel(1);
  }, [activeSection]);

  // Reset carousel index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
    setViewerImage(null);
    setViewerImageCircular(false);
    setZoomLevel(1);
  }, [selectedProject]);

  // Handle zoom with mouse wheel
  useEffect(() => {
    if (!viewerImage) return;

    const handleWheel = (e) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setZoomLevel((prev) => Math.max(0.5, Math.min(5, prev + delta)));
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [viewerImage]);

  return (
    <div className="min-h-screen bg-[#FAFFFA] text-green-950 font-serif p-2 sm:p-4 md:p-8 selection:bg-green-200 selection:text-green-900">
      <SmoothCursor
        size={17}
        color="#028A0F"
        rotateOnMove={true}
        scaleOnClick={true}
        glowEffect={true}
        showTrail={true}
        trailLength={3}
        springConfig={{
          damping: 20,
          stiffness: 200,
          mass: 0.6,
          restDelta: 0.001
        }}
      />
      {/* Main Container with a "Paper" border effect */}
      <div className="max-w-7xl mx-auto border-2 border-green-900 min-h-[85vh] sm:h-[90vh] flex flex-col md:flex-row relative shadow-[4px_4px_0px_0px_rgba(20,83,45,0.2)] md:shadow-[10px_10px_0px_0px_rgba(20,83,45,0.2)] overflow-hidden">
        
        {/* Walking Animal Sprites - only on home page */}
        {activeSection === 'home' && animals.map((animal, index) => (
          <WalkingSprite 
            key={animal}
            animal={animal}
            columns={6}
            rows={4}
            sheetWidth={192}
            sheetHeight={128}
            scale={2}
            initialOffset={index * 50}
            bottomPosition={animalConfig[animal].bottomPosition}
          />
        ))}

        {/* LEFT COLUMN: Main Content Area (Bigger Section) */}
        <main className={`flex-grow ${selectedProject ? 'md:w-full' : 'md:w-3/4'} border-b-2 md:border-b-0 ${selectedProject ? '' : 'md:border-r-2'} border-green-900 ${selectedProject ? 'p-0' : 'p-3 sm:p-4 md:p-6'} overflow-y-auto hide-scrollbar relative order-2 md:order-1 bg-[#fdfbf7]`}>
          
          {/* Background Image Overlay */}
          <div className="absolute inset-0 bg-[url('/backgroundimage.jpg')] bg-cover bg-center opacity-15 pointer-events-none z-0"></div>
          
          {/* Decorative corner flourish */}
          <div className="absolute top-0 left-0 w-3 h-3 sm:w-4 sm:h-4 border-r-2 border-b-2 border-green-900 bg-[#fdfbf7] z-10"></div>
          
          {/* Project Detail View - Replaces entire content area */}
          {activeSection === 'work' && selectedProject && (
            <div className="absolute inset-0 bg-[#fdfbf7] p-6 sm:p-8 md:p-10 overflow-y-auto hide-scrollbar z-10">
              {/* Background Image Overlay for Modal */}
              <div className="absolute inset-0 bg-[url('/backgroundimage.jpg')] bg-cover bg-center opacity-15 pointer-events-none z-0"></div>
              
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-0 left-0 border-2 border-green-900 border-t-0 border-l-0 px-5 py-3 bg-[#fdfbf7] hover:bg-green-100 active:bg-green-100 transition-all duration-300 lowercase text-lg sm:text-xl font-bold text-green-950 shadow-[2px_2px_0px_0px_rgba(20,83,45,0.2)] hover:shadow-[4px_4px_0px_0px_rgba(20,83,45,0.3)] z-20"
              >
                ← back to projects
              </button>

              {/* Project Title and Year */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 mb-6 pt-6 sm:pt-9 md:pt-10 relative z-10">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">{selectedProject.title}</h2>
                <span className="text-sm sm:text-base font-mono">{selectedProject.year}</span>
              </div>

              {/* Project Image Carousel */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div className="mb-6 relative z-10">
                  <div className="flex justify-center items-center gap-4">
                    {/* Navigation Arrows */}
                    {selectedProject.images.length > 1 && (
                      <>
                        {/* Previous Button */}
                        <button
                          onClick={() => setCurrentImageIndex((prev) => 
                            prev === 0 ? selectedProject.images.length - 1 : prev - 1
                          )}
                          className="border-2 border-green-900 bg-white hover:bg-green-100 active:bg-green-100 transition-all duration-300 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(20,83,45,0.2)]"
                          aria-label="Previous image"
                        >
                          <span className="text-green-900 text-xl sm:text-2xl font-bold">←</span>
                        </button>
                      </>
                    )}

                    <div className="border-2 border-green-900 relative" style={{ width: '62.5%' }}>
                      {/* Carousel Container */}
                      <div className="relative overflow-hidden">
                        {/* Images Container */}
                        <div 
                          className="flex transition-transform duration-500 ease-in-out"
                          style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}
                        >
                          {selectedProject.images.map((image, index) => (
                            <div 
                              key={index}
                              className="w-full flex-shrink-0 aspect-video bg-stone-200 cursor-pointer"
                              onClick={() => {
                                setViewerImage(image);
                                setZoomLevel(1);
                              }}
                            >
                              <img 
                                src={image} 
                                alt={`${selectedProject.title} - Image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Navigation Arrows */}
                    {selectedProject.images.length > 1 && (
                      <>
                        {/* Next Button */}
                        <button
                          onClick={() => setCurrentImageIndex((prev) => 
                            prev === selectedProject.images.length - 1 ? 0 : prev + 1
                          )}
                          className="border-2 border-green-900 bg-white hover:bg-green-100 active:bg-green-100 transition-all duration-300 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(20,83,45,0.2)]"
                          aria-label="Next image"
                        >
                          <span className="text-green-900 text-xl sm:text-2xl font-bold">→</span>
                        </button>
                      </>
                    )}
                  </div>

                  {/* Indicator Dots - Outside the bordered container */}
                  {selectedProject.images.length > 1 && (
                    <div className="flex justify-center gap-2 mt-3">
                      {selectedProject.images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full border-2 border-green-900 transition-all duration-300 ${
                            index === currentImageIndex 
                              ? 'bg-green-900' 
                              : 'bg-white hover:bg-green-100'
                          }`}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Project Thumbnail (fallback if no images array) */}
              {(!selectedProject.images || selectedProject.images.length === 0) && selectedProject.thumbnail && (
                <div className="w-full h-48 sm:h-64 md:h-80 border-2 border-green-900 bg-stone-200 mb-6 relative z-10">
                  <img 
                    src={selectedProject.thumbnail} 
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* YouTube Video Embed */}
              {selectedProject.videoLink && (
                <div className="relative z-10 mb-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 border-b border-green-900 pb-2">Demo Video</h3>
                  <div className="border-2 border-green-900 relative bg-black" style={{ paddingBottom: '56.25%', height: 0 }}>
                    <iframe
                      src={selectedProject.videoLink.replace('watch?v=', 'embed/')}
                      title="Demo Video"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute top-0 left-0 w-full h-full"
                    />
                  </div>
                </div>
              )}

              {/* Project Links */}
              {(selectedProject.demoLink || selectedProject.githubLink) && (
                <div className="relative z-10 mb-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-3 border-b border-green-900 pb-2">Links</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProject.demoLink && (
                      <a
                        href={selectedProject.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 border-2 border-green-900 bg-transparent hover:bg-green-100 active:bg-green-100 transition-all duration-300 text-sm sm:text-base font-medium text-center text-green-950 shadow-[2px_2px_0px_0px_rgba(20,83,45,0.2)] hover:shadow-[4px_4px_0px_0px_rgba(20,83,45,0.3)]"
                      >
                        {selectedProject.demoLink.toLowerCase().endsWith('.pdf') ? 'Read PDF' : 'See Website'}
                      </a>
                    )}
                    {selectedProject.githubLink && (
                      <a
                        href={selectedProject.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2 border-2 border-green-900 bg-transparent hover:bg-green-100 active:bg-green-100 transition-all duration-300 text-sm sm:text-base font-medium text-center text-green-950 shadow-[2px_2px_0px_0px_rgba(20,83,45,0.2)] hover:shadow-[4px_4px_0px_0px_rgba(20,83,45,0.3)]"
                      >
                        View on GitHub
                      </a>
                    )}
                  </div>
                </div>
              )}

              {/* Project Description */}
              <div className="mb-6 relative z-10">
                <h3 className="text-lg sm:text-xl font-bold mb-3 border-b border-green-900 pb-2">Overview</h3>
                <p className="text-base sm:text-lg leading-relaxed font-[500] mb-4">{selectedProject.description}</p>
              </div>

              {/* Project Details */}
              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-bold mb-3 border-b border-green-900 pb-2">Details</h3>
                <div className="text-base sm:text-lg leading-relaxed whitespace-pre-line">
                  {selectedProject.details.split('\n').map((line, lineIndex) => {
                    // Parse **bold** syntax
                    const parts = line.split(/(\*\*.*?\*\*)/g);
                    return (
                      <div key={lineIndex} className={line.trim() ? 'mb-2' : 'mb-4'}>
                        {parts.map((part, partIndex) => {
                          if (part.startsWith('**') && part.endsWith('**')) {
                            return <strong key={partIndex}>{part.slice(2, -2)}</strong>;
                          }
                          return <span key={partIndex}>{part}</span>;
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* DYNAMIC CONTENT AREA */}
          {!selectedProject && (
          <div className={`h-full flex flex-col justify-between relative z-10 ${selectedProject ? 'justify-start' : ''}`}>
            
            {/* Header/Title Area */}
            {!selectedProject && (
            <header ref={headerRef} className={`mb-6 sm:mb-8 md:mb-12 pb-3 sm:pb-4 relative ${activeSection !== 'work' ? 'border-b border-green-900/30' : ''}`}>
               <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-light tracking-tighter break-words">
                 <TextType 
                   key={activeSection}
                   text={activeSection === 'home' ? "welcome to my page!" : activeSection === 'work' ? "projects i've worked on" : activeSection}
                   typingSpeed={150}
                   pauseDuration={1500}
                   showCursor={true}
                   cursorCharacter={
                     <img 
                       src="/turtleshrunk.png" 
                       alt="Turtle" 
                       className="inline-block w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain align-middle ml-1"
                     />
                   }
                  loop={false}
                  as="span"
                  onCursorRef={(ref) => { cursorRef.current = ref; }}
                />
              </h1>
            </header>
            )}

            {/* Content Render Logic */}
            <div className="flex-grow">
              {activeSection === 'home' && (
                <div className="space-y-4 sm:space-y-6 md:space-y-8 animate-in fade-in duration-500 flex flex-col items-start">

<p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight max-w-prose text-green-500 text-justify">
        Hi, I'm Parthiv!
                  </p>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed w-11/12  text-center">
                  I'm interested in the intersection of design and creating AI tools, accessible to the everyday person.
                  </p>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed w-11/12  text-center">
                  I'm a 4th year MEng Biomedical Engineer at UCL in London. My degree is interdisciplinary, covering apspects of every engineering discipline all with a focus on healthcare.
                  In my coursework, I've build neural networks for detecting cancers, as well as even creating videogames and more!
                  Have a look at my projects for more info :)
                
                  </p>

                  <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed w-11/12  text-center">
                  I enjoy solving user centered problems in healthtech and working at the intersection of people, data and product.
                  </p>
                </div>
              )}

              {activeSection === 'leadership' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 animate-in fade-in duration-500 -mt-6 sm:-mt-8 md:-mt-12">
                  {[...leadershipItems].sort((a, b) => {
                    // Extract start year from year string (e.g., "Jun 2024 – Jun 2025" -> 2024, "2025 – 2026" -> 2025)
                    const getStartYear = (yearStr) => {
                      const match = yearStr.match(/(\d{4})/);
                      return match ? parseInt(match[1]) : 0;
                    };
                    return getStartYear(b.year) - getStartYear(a.year); // Most recent first
                  }).map((item) => {
                    const currentIndex = leadershipImageIndices[item.id] || 0;
                    const images = item.images || (item.thumbnail ? [item.thumbnail] : []);
                    return (
                      <div 
                        key={item.id}
                        className="border-2 border-green-900 p-3 sm:p-4 bg-white shadow-[2px_2px_0px_0px_rgba(20,83,45,0.1)] hover:shadow-[4px_4px_0px_0px_rgba(20,83,45,0.2)] hover:border-green-700 hover:scale-[1.01] transition-all duration-300 aspect-[2/1] flex flex-col relative"
                      >
                        {/* Logo Carousel - Top Left Profile Pic Style */}
                        <div className="absolute top-3 left-3 w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 z-10">
                          {images.length > 0 ? (
                            <div className="border-2 border-green-900 bg-stone-200 rounded-full relative group flex items-center justify-center p-1 overflow-hidden">
                              {/* Carousel Image */}
                              <img 
                                src={images[currentIndex]} 
                                alt={item.title}
                                className="w-full h-full object-contain rounded-full cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setViewerImage(images[currentIndex]);
                                  setViewerImageCircular(true);
                                  setZoomLevel(1);
                                }}
                              />
                              
                              {/* Navigation Arrows - Smaller for profile pic */}
                              {images.length > 1 && (
                                <>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
                                      setLeadershipImageIndices({ ...leadershipImageIndices, [item.id]: newIndex });
                                    }}
                                    className="absolute left-0 top-1/2 -translate-y-1/2 border border-green-900 bg-white/90 hover:bg-green-100 active:bg-green-100 transition-all duration-300 w-5 h-5 flex items-center justify-center flex-shrink-0 shadow-[1px_1px_0px_0px_rgba(20,83,45,0.2)] z-20 text-xs"
                                    aria-label="Previous image"
                                  >
                                    ←
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
                                      setLeadershipImageIndices({ ...leadershipImageIndices, [item.id]: newIndex });
                                    }}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 border border-green-900 bg-white/90 hover:bg-green-100 active:bg-green-100 transition-all duration-300 w-5 h-5 flex items-center justify-center flex-shrink-0 shadow-[1px_1px_0px_0px_rgba(20,83,45,0.2)] z-20 text-xs"
                                    aria-label="Next image"
                                  >
                                    →
                                  </button>
                                </>
                              )}
                              
                              {/* Dots Indicator - Smaller for profile pic */}
                              {images.length > 1 && (
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1 z-20">
                                  {images.map((_, index) => (
                                    <button
                                      key={index}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setLeadershipImageIndices({ ...leadershipImageIndices, [item.id]: index });
                                      }}
                                      className={`w-1 h-1 rounded-full border border-green-900 transition-all duration-300 ${
                                        index === currentIndex 
                                          ? 'bg-green-900' 
                                          : 'bg-white hover:bg-green-100'
                                      }`}
                                      aria-label={`Go to image ${index + 1}`}
                                    />
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="border-2 border-green-900 bg-stone-200 rounded-full flex items-center justify-center p-1 w-full h-full">
                              <span className="italic text-[8px] text-center opacity-50">{item.placeholder}</span>
                            </div>
                          )}
                        </div>
                        
                      <div className="flex flex-col flex-1 gap-2 sm:gap-3 pl-20 sm:pl-24">
                        {/* Content */}
                        <div className="flex-1 flex flex-col">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1 mb-1 sm:mb-2">
                            <span className="text-lg sm:text-xl font-bold break-words">{item.title}</span>
                            <span className="text-xs font-mono text-right">{item.year}</span>
                          </div>
                          
                          {item.organization && (
                            <p className="text-base sm:text-lg text-green-900/70 mb-2 font-bold">{item.organization}</p>
                          )}
                          
                          <p className="text-xs sm:text-sm leading-relaxed font-[500] mb-2 flex-1">{item.description}</p>
                          
                          {item.details && (
                            <p className="text-xs leading-relaxed text-green-900/80">{item.details}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    );
                  })}
                </div>
              )}

              {activeSection === 'work' && !selectedProject && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 animate-in fade-in duration-500 -mt-6 sm:-mt-8 md:-mt-12">
                  {projects.map((project) => (
                    <div 
                      key={project.id} 
                      onClick={() => setSelectedProject(project)}
                      className="border-2 border-green-900 p-4 sm:p-5 md:p-6 bg-white shadow-[2px_2px_0px_0px_rgba(20,83,45,0.1)] hover:shadow-[4px_4px_0px_0px_rgba(20,83,45,0.2)] hover:border-green-700 hover:scale-[1.02] transition-all duration-300 cursor-pointer"
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-2 mb-3 sm:mb-4">
                        <span className="text-2xl sm:text-3xl font-bold break-words">{project.title}</span>
                        <span className="text-xs sm:text-sm font-mono text-right">{project.year}</span>
                      </div>
                      
                      {/* Event */}
                      {project.event && (
                        <p className="text-xs sm:text-sm text-green-900/70 mb-3 sm:mb-4">{project.event}</p>
                      )}
                      
                      <div className="w-full h-40 sm:h-48 md:h-56 border-2 border-green-900 bg-stone-200 mb-3 sm:mb-4 relative group">
                        {project.thumbnail ? (
                          <img 
                            src={project.thumbnail} 
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity">
                            <span className="italic text-xs sm:text-sm text-center px-2">{project.placeholder}</span>
                          </div>
                        )}
                      </div>
                      
                      {/* Skills/Tools Tags */}
                      {project.skills && project.skills.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                          {project.skills.map((skill, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 text-xs sm:text-sm bg-green-50 border border-green-900/30 text-green-900 rounded-md"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      )}
                      
                      <p className="text-base sm:text-xl leading-relaxed font-[500]">{project.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          )}
        </main>

        {/* RIGHT COLUMN: Sidebar (Smaller Section) */}
        {!selectedProject && (
        <aside className="md:w-1/4 flex flex-col bg-[#f4f1ea] order-1 md:order-2">
          
          {/* 1. NAVIGATION SECTION */}
          <div className="p-3 sm:p-4 md:p-6 border-b-2 border-green-900">
            <nav className="flex flex-row sm:flex-col gap-2 sm:gap-3 overflow-x-auto sm:overflow-x-visible">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`
                    text-left px-3 sm:px-4 py-2.5 sm:py-3 border-2 transition-all duration-300 lowercase text-base sm:text-lg font-medium whitespace-nowrap min-w-[120px] sm:min-w-0 touch-manipulation
                    ${activeSection === item.id 
                      ? 'bg-green-900 text-[#fdfbf7] border-green-900 sm:translate-x-2 shadow-[-2px_2px_0px_0px_rgba(0,0,0,0.1)] sm:shadow-[-4px_4px_0px_0px_rgba(0,0,0,0.1)]' 
                      : 'bg-transparent border-green-900 active:bg-green-100 sm:hover:bg-green-100 sm:hover:translate-x-1 text-green-950'}
                  `}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* 2. SOCIAL LINKS & CV SECTION - Hidden on mobile, shown on desktop */}
          <div className="hidden md:flex flex-grow p-3 sm:p-4 md:p-6 flex-col justify-end">
            <div className="border-2 border-green-900 p-3 sm:p-4 bg-white space-y-4">
              {/* CV Download Button */}
              <a
                href="/Parthiv_Naidu_CV_Product.pdf"
                download="Parthiv_Naidu_CV_Product.pdf"
                className="block w-full px-4 py-2.5 border-2 border-green-900 bg-transparent hover:bg-green-100 active:bg-green-100 transition-all duration-300 lowercase text-sm sm:text-base font-medium text-center text-green-950"
              >
                get CV
              </a>

              {/* Social Links */}
              <div className="flex gap-3 justify-center">
                {/* GitHub Link */}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ filter: 'brightness(0) saturate(100%) invert(65%) sepia(25%) saturate(600%) hue-rotate(75deg) brightness(105%) contrast(95%)' }}
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>

                {/* LinkedIn Link */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:opacity-80 transition-opacity"
                >
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ filter: 'brightness(0) saturate(100%) invert(65%) sepia(25%) saturate(600%) hue-rotate(75deg) brightness(105%) contrast(95%)' }}
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

        </aside>
        )}

        {/* SOCIAL LINKS & CV - Mobile only, appears at bottom */}
        {!selectedProject && (
        <div className="md:hidden order-3 p-3 sm:p-4 bg-[#f4f1ea] border-t-2 border-green-900">
          <div className="border-2 border-green-900 p-3 sm:p-4 bg-white space-y-4">
            {/* CV Download Button */}
            <a
              href="/Parthiv_Naidu_CV_Product.pdf"
              download="Parthiv_Naidu_CV_Product.pdf"
              className="block w-full px-4 py-2.5 border-2 border-green-900 bg-transparent hover:bg-green-100 active:bg-green-100 transition-all duration-300 lowercase text-sm sm:text-base font-medium text-center text-green-950"
            >
              get CV
            </a>

            {/* Social Links */}
            <div className="flex gap-3 justify-center">
              {/* GitHub Link */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <svg
                  className="w-full h-full"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ filter: 'brightness(0) saturate(100%) invert(65%) sepia(25%) saturate(600%) hue-rotate(75deg) brightness(105%) contrast(95%)' }}
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>

              {/* LinkedIn Link */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center hover:opacity-80 transition-opacity"
              >
                <svg
                  className="w-full h-full"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ filter: 'brightness(0) saturate(100%) invert(65%) sepia(25%) saturate(600%) hue-rotate(75deg) brightness(105%) contrast(95%)' }}
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        )}
        
      </div>

      {/* Image Viewer Modal */}
      {viewerImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center p-4"
          onClick={() => {
            setViewerImage(null);
            setViewerImageCircular(false);
            setZoomLevel(1);
          }}
        >
          {/* Controls Bar - Fixed at top */}
          <div className="absolute top-4 left-0 right-0 flex justify-between items-center px-4 z-10">
            {/* Zoom Controls */}
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomLevel((prev) => Math.max(0.5, prev - 0.25));
                }}
                className="border-2 border-white text-white hover:bg-white hover:text-black px-3 py-1 text-sm font-bold transition-colors"
                aria-label="Zoom out"
              >
                −
              </button>
              <span className="border-2 border-white text-white px-3 py-1 text-sm font-bold">
                {Math.round(zoomLevel * 100)}%
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomLevel((prev) => Math.min(5, prev + 0.25));
                }}
                className="border-2 border-white text-white hover:bg-white hover:text-black px-3 py-1 text-sm font-bold transition-colors"
                aria-label="Zoom in"
              >
                +
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={() => {
                setViewerImage(null);
                setViewerImageCircular(false);
                setZoomLevel(1);
              }}
              className="text-white hover:text-green-200 text-2xl font-bold w-10 h-10 flex items-center justify-center border-2 border-white hover:border-green-200 transition-colors"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          {/* Image Container */}
          <div className="flex items-center justify-center w-full h-full overflow-auto">
            <img 
              ref={viewerImageRef}
              src={viewerImage} 
              alt="Full size view"
              className={`max-w-full max-h-full object-contain cursor-move ${viewerImageCircular ? 'rounded-full border-4 border-white' : ''}`}
              style={{ 
                transform: `scale(${zoomLevel})`,
                transition: 'transform 0.2s ease-out',
                ...(viewerImageCircular && { aspectRatio: '1/1', width: 'min(80vh, 80vw)', height: 'min(80vh, 80vw)' })
              }}
              onClick={(e) => e.stopPropagation()}
              draggable={false}
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default Portfolio;

