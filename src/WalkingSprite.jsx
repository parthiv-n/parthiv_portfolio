import React, { useEffect, useRef, useState, useCallback } from 'react';

const WalkingSprite = ({ 
  animal = 'Deer',
  columns = 6,
  rows = 4,
  sheetWidth = 192,
  sheetHeight = 128,
  scale = 2,
  initialOffset = 0,
  bottomPosition = -12,
}) => {
  // Normalize animal name for file paths (handle case variations and special cases)
  const isGrouse = animal.toLowerCase().includes('grouse');
  const animalName = isGrouse ? 'Black_grouse' : animal.charAt(0).toUpperCase() + animal.slice(1).toLowerCase();
  
  // Build sprite sheet paths dynamically
  const getSpritePath = (action) => {
    // Grouse uses "Flight" instead of "Run"
    if (isGrouse && (action === 'run' || action === 'flight')) {
      return `/animals/Black_grouse_Flight.png`;
    }
    // Handle Fox_walk.png (lowercase 'w')
    if (animalName === 'Fox' && action === 'walk') {
      return `/animals/Fox_walk.png`;
    }
    // Standard naming: AnimalName_Action.png
    const actionName = action.charAt(0).toUpperCase() + action.slice(1);
    return `/animals/${animalName}_${actionName}.png`;
  };

  const spriteSheets = {
    idle: getSpritePath('idle'),
    walk: getSpritePath('walk'),
    run: isGrouse ? getSpritePath('flight') : getSpritePath('run'),
    flight: getSpritePath('flight'), // For grouse flying action
  };

  // Get action settings based on animal and action
  // Some animals have different sprite sheet dimensions
  const getActionSettings = (action) => {
    // Special cases for specific animal-action combinations
    if (animalName === 'Boar' && action === 'run') {
      return { frameDelay: 5, speed: 2.5, columns: 5, sheetWidth: 160 }; // 5x4
    }
    if (animalName === 'Hare' && action === 'walk') {
      return { frameDelay: 8, speed: 1, columns: 5, sheetWidth: 160 }; // 5x4
    }
    
    // Default settings
    const defaults = {
      idle: { frameDelay: 12, speed: 0, columns: 4, sheetWidth: 128 },
      walk: { frameDelay: 8, speed: 1, columns: 6, sheetWidth: 192 },
      run: { frameDelay: 5, speed: 2.5, columns: 6, sheetWidth: 192 },
      flight: { frameDelay: 5, speed: 2.5, columns: 6, sheetWidth: 192 }, // For grouse
    };
    return defaults[action] || defaults.idle;
  };

  // Randomize initial direction for variety
  const initialDirection = Math.random() < 0.5 ? 'left' : 'right';
  
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState(initialDirection);
  const [frame, setFrame] = useState(0);
  const [action, setAction] = useState('idle');
  const [initialized, setInitialized] = useState(false);
  
  const animationRef = useRef(null);
  const frameCountRef = useRef(0);
  const positionRef = useRef(0);
  const directionRef = useRef(initialDirection);
  const actionRef = useRef('idle');
  const actionTimeRef = useRef(Math.floor(Math.random() * 100)); // Random start time
  const nextActionTimeRef = useRef(getRandomActionDuration());
  const containerRef = useRef(null);

  // Calculate individual sprite dimensions
  const spriteWidth = sheetWidth / columns;
  const spriteHeight = sheetHeight / rows;
  const displayWidth = spriteWidth * scale;
  const displayHeight = spriteHeight * scale;

  // Map direction to row index (0-indexed)
  // Row 1: front, Row 2: back, Row 3: left, Row 4: right
  const getDirectionRow = (direction, currentAction) => {
    // Fox_walk.png uses normal mapping (confirmed correct)
    if (animalName === 'Fox' && currentAction === 'walk') {
      const foxWalkMapping = { front: 0, back: 1, left: 2, right: 3 };
      return foxWalkMapping[direction];
    }
    // Fox_Run.png has left/right swapped
    if (animalName === 'Fox' && currentAction === 'run') {
      const foxRunMapping = { front: 0, back: 1, left: 3, right: 2 };
      return foxRunMapping[direction];
    }
    const normalMapping = { front: 0, back: 1, left: 2, right: 3 };
    return normalMapping[direction];
  };

  // Get random duration for current action (in frames)
  function getRandomActionDuration() {
    return Math.floor(Math.random() * 300) + 150; // 150-450 frames (~2.5-7.5 seconds at 60fps)
  }

  // Initialize position off-screen once container is mounted
  useEffect(() => {
    if (containerRef.current && !initialized) {
      const parentWidth = containerRef.current.parentElement.offsetWidth;
      const offscreenMargin = 100;
      
      // Spawn off-screen based on direction
      const startPos = directionRef.current === 'right' 
        ? -offscreenMargin - initialOffset 
        : parentWidth + offscreenMargin + initialOffset;
      
      positionRef.current = startPos;
      setPosition(startPos);
      setInitialized(true);
    }
  }, [initialized, initialOffset]);

  // Choose next action based on current state
  const chooseNextAction = useCallback(() => {
    const currentAction = actionRef.current;
    const rand = Math.random();
    // For grouse, "run" is actually "flight"
    const fastAction = isGrouse ? 'flight' : 'run';
    
    if (currentAction === 'idle') {
      // From idle: 60% walk, 20% run/flight, 20% stay idle
      if (rand < 0.6) return 'walk';
      if (rand < 0.8) return fastAction;
      return 'idle';
    } else if (currentAction === 'walk') {
      // From walk: 40% idle, 30% keep walking, 30% run/flight
      if (rand < 0.4) return 'idle';
      if (rand < 0.7) return 'walk';
      return fastAction;
    } else {
      // From run/flight: 50% walk, 40% idle, 10% keep running/flying
      if (rand < 0.5) return 'walk';
      if (rand < 0.9) return 'idle';
      return fastAction;
    }
  }, [isGrouse]);

  useEffect(() => {
    // Don't start animating until position is initialized
    if (!initialized) return;

    const animate = () => {
      frameCountRef.current++;
      actionTimeRef.current++;

      // Check if it's time to change action
      if (actionTimeRef.current >= nextActionTimeRef.current) {
        const newAction = chooseNextAction();
        actionRef.current = newAction;
        setAction(newAction);
        setFrame(0); // Reset frame when changing action to avoid out-of-bounds
        actionTimeRef.current = 0;
        nextActionTimeRef.current = getRandomActionDuration();
        
        // Animals maintain their direction to walk across screen
        // Very small chance to turn around (5% when starting to move)
        if (newAction !== 'idle' && Math.random() < 0.05) {
          const newDir = directionRef.current === 'right' ? 'left' : 'right';
          directionRef.current = newDir;
          setDirection(newDir);
        }
      }

      // Get action settings for current action
      const currentSettings = getActionSettings(actionRef.current);

      // Update sprite frame (use action-specific column count)
      if (frameCountRef.current % currentSettings.frameDelay === 0) {
        setFrame((prev) => (prev + 1) % currentSettings.columns);
      }

      // Move sprite based on direction and speed
      const speed = currentSettings.speed;
      if (speed > 0) {
        if (directionRef.current === 'right') {
          positionRef.current += speed;
        } else if (directionRef.current === 'left') {
          positionRef.current -= speed;
        }

        // Wrap around when animals go off-screen (relative to parent container)
        if (containerRef.current) {
          const parentWidth = containerRef.current.parentElement.offsetWidth;
          const offscreenMargin = 200; // Distance off-screen before wrapping
          
          // If animal goes too far off the right side, wrap to left side
          if (positionRef.current > parentWidth + offscreenMargin) {
            positionRef.current = -displayWidth - offscreenMargin;
          }
          // If animal goes too far off the left side, wrap to right side
          else if (positionRef.current < -displayWidth - offscreenMargin) {
            positionRef.current = parentWidth + offscreenMargin;
          }
        }

        setPosition(positionRef.current);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [columns, displayWidth, chooseNextAction, initialized]);

  const row = getDirectionRow(direction, action);
  const currentActionSettings = getActionSettings(action);
  const currentSpriteWidth = currentActionSettings.sheetWidth / currentActionSettings.columns;
  const backgroundX = -frame * currentSpriteWidth * scale;
  const backgroundY = -row * spriteHeight * scale;

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        bottom: `${bottomPosition}px`,
        left: `${position}px`,
        width: `${currentSpriteWidth * scale}px`,
        height: `${displayHeight}px`,
        backgroundImage: `url(${spriteSheets[action]})`,
        backgroundPosition: `${backgroundX}px ${backgroundY}px`,
        backgroundSize: `${currentActionSettings.sheetWidth * scale}px ${sheetHeight * scale}px`,
        backgroundRepeat: 'no-repeat',
        imageRendering: 'pixelated',
        zIndex: 1000,
        pointerEvents: 'none',
        opacity: initialized ? 1 : 0,
        transition: 'background-image 0.1s ease, opacity 0.3s ease',
      }}
    />
  );
};

export default WalkingSprite;
