const { useState, useMemo, useEffect } = React;

const resolveFramerMotion = () => {
  const framerExport =
    window.framerMotion ||
    window.FramerMotion ||
    window._window$framerMotion ||
    window.framerMotionUmd;

  if (framerExport) {
    return {
      motion: framerExport.motion,
      AnimatePresence: framerExport.AnimatePresence,
    };
  }

  const animationProps = new Set([
    'initial',
    'animate',
    'exit',
    'transition',
    'whileHover',
    'whileTap',
    'layout',
    'layoutId',
    'variants',
  ]);

  const createElementProxy = new Proxy(
    {},
    {
      get: (_, tag) =>
        React.forwardRef(({ children, ...props }, ref) => {
          const sanitizedProps = { ...props };
          animationProps.forEach((key) => {
            if (key in sanitizedProps) {
              delete sanitizedProps[key];
            }
          });
          return React.createElement(tag, { ref, ...sanitizedProps }, children);
        }),
    }
  );

  return {
    motion: createElementProxy,
    AnimatePresence: ({ children }) => React.createElement(React.Fragment, null, children),
  };
};

const { motion, AnimatePresence } = resolveFramerMotion();

const sportsData = {
  soccer: {
    label: 'Soccer',
    description:
      'Soccer players drive power from the ground up. Every cut, strike, and sprint pushes force through the feet, spirals through the hips and core, and finishes with precise control in the upper body.',
    injuries: ['Hamstring strains during explosive sprints', 'Anterior cruciate ligament (ACL) tears with cutting maneuvers', 'Lateral ankle sprains from uneven planting'],
    training:
      ['Blend ankle mobility with resisted band work before training to prime push-off mechanics.', 'Build eccentric hamstring strength with Nordic curls and single-leg RDLs twice per week.', 'Integrate anti-rotation core drills to stabilize the pelvis during change of direction.'],
  },
  basketball: {
    label: 'Basketball',
    description:
      'Basketball’s vertical demands rely on seamless kinetic sequencing. Power starts at the feet, travels through the knees and hips, stores in the core, and explodes upward for take-offs, rebounds, and shots.',
    injuries: ['Patellar tendinopathy from repetitive jumping', 'High ankle sprains on landings and lateral stops', 'Lower back irritation from rotational loads'],
    training: ['Prioritize calf raises with tempo control to reinforce landing resilience.', 'Use hip-dominant plyometrics, such as box jumps and depth drops, to refine triple extension.', 'Add Jefferson curls and controlled thoracic rotations to maintain spinal mobility.'],
  },
  tennis: {
    label: 'Tennis',
    description:
      'A tennis stroke winds energy from the ground through the legs, transfers torque across the hips and core, and releases it through the shoulder, arm, and racquet for precision and pace.',
    injuries: ['Rotator cuff overuse from repeated serves', 'Medial epicondylitis (golfer’s elbow) with forehand loading', 'Meniscus stress from abrupt lateral decelerations'],
    training: ['Program diagonal lunge patterns to mimic loading angles at the baseline.', 'Perform banded shoulder external rotations between matches to sustain cuff endurance.', 'Use medicine ball rotational throws to coordinate hip-to-shoulder power transfer.'],
  },
  running: {
    label: 'Running',
    description:
      'Running efficiency depends on rhythmic force cycling from foot strike through the posterior chain and trunk. A balanced kinetic chain keeps cadence light and stride mechanics economical.',
    injuries: ['Iliotibial (IT) band irritation from hip instability', 'Tibial stress reactions during mileage spikes', 'Achilles tendinopathy from poor calf loading'],
    training: ['Rotate soft-tissue calf work with progressive calf raises to manage tendon load.', 'Add single-leg bridge progressions to maintain hip extension strength.', 'Schedule cadence drills and metronome runs to refine midfoot strike consistency.'],
  },
  baseball: {
    label: 'Baseball',
    description:
      'Pitching and hitting recruit the entire kinetic chain. Ground reaction forces spiral through the legs, hips, and trunk before whipping through the shoulder, elbow, and wrist for velocity.',
    injuries: ['Ulnar collateral ligament (UCL) stress in pitchers', 'Oblique strains with rapid trunk rotation', 'Labrum irritation during overhead throwing'],
    training: ['Use staggered stance med-ball throws to sync lower-body drive with torso rotation.', 'Incorporate scapular stability drills like wall slides and serratus punches daily.', 'Balance throwing volume with posterior cuff isometrics and soft-tissue recovery.'],
  },
  swimming: {
    label: 'Swimming',
    description:
      'In the water, propulsion begins with the kick, flows through the hips and trunk, and channels into long, connected strokes from the shoulders to the fingertips.',
    injuries: ['Shoulder impingement from repeated overhead reach', 'Lumbar hyperextension discomfort with dolphin kicking', 'Knee stress during breaststroke turns'],
    training: ['Combine kickboard intervals with ankle mobility drills to improve flutter efficiency.', 'Integrate dryland pillar circuits that connect ribcage control with hip stability.', 'Use resistance-band scapular retraction and depression work to support shoulder glide.'],
  },
};

const deepDiveTopics = [
  {
    id: 'soccer',
    href: 'movement-deep-dives/soccer.html',
    title: 'Soccer: Ground-up power sequencing',
    summary:
      'See how planted feet, rotating hips, and a braced core keep every strike sharp while reducing soft-tissue setbacks.',
  },
  {
    id: 'basketball',
    href: 'movement-deep-dives/basketball.html',
    title: 'Basketball: Vertical energy flow',
    summary:
      'Break down how triple extension, landing control, and trunk stability protect joints through relentless jump volume.',
  },
  {
    id: 'tennis',
    href: 'movement-deep-dives/tennis.html',
    title: 'Tennis: Coiled precision mechanics',
    summary:
      'Unpack the serve and groundstroke sequence so rotational power reaches the racquet without overloading the elbow.',
  },
  {
    id: 'running',
    href: 'movement-deep-dives/running.html',
    title: 'Running: Rhythm and force recycling',
    summary:
      'Follow how stride cadence, hip drive, and trunk control recycle energy efficiently across high-mileage weeks.',
  },
  {
    id: 'baseball',
    href: 'movement-deep-dives/baseball.html',
    title: 'Baseball: Rotational velocity chain',
    summary:
      'Track how lower-body drive, trunk coil, and arm whip sync to keep velocity high and protect throwing shoulders.',
  },
  {
    id: 'swimming',
    href: 'movement-deep-dives/swimming.html',
    title: 'Swimming: Streamlined propulsion',
    summary:
      'Explore how hip roll, pillar control, and shoulder glide combine for smooth strokes and fewer overuse flare-ups.',
  },
];

const chainSegments = [
  {
    id: 'feet',
    label: 'Feet & Ankles',
    line: { x1: 120, y1: 250, x2: 120, y2: 290 },
    joint: { cx: 120, cy: 300 },
  },
  {
    id: 'shins',
    label: 'Lower Legs',
    line: { x1: 120, y1: 200, x2: 120, y2: 250 },
    joint: { cx: 120, cy: 200 },
  },
  {
    id: 'thighs',
    label: 'Thighs',
    line: { x1: 120, y1: 150, x2: 120, y2: 200 },
    joint: { cx: 120, cy: 150 },
  },
  {
    id: 'hips',
    label: 'Hips & Pelvis',
    line: { x1: 120, y1: 110, x2: 120, y2: 150 },
    joint: { cx: 120, cy: 110 },
  },
  {
    id: 'core',
    label: 'Core',
    line: { x1: 120, y1: 70, x2: 120, y2: 110 },
    joint: { cx: 120, cy: 70 },
  },
  {
    id: 'shoulders',
    label: 'Shoulders',
    line: { x1: 120, y1: 30, x2: 120, y2: 70 },
    joint: { cx: 120, cy: 30 },
  },
  {
    id: 'arms',
    label: 'Arms',
    extra: [
      { x1: 120, y1: 70, x2: 80, y2: 110 },
      { x1: 120, y1: 70, x2: 160, y2: 110 },
    ],
  },
];

const SportSelector = ({ value, onChange }) => (
  <div className="w-full max-w-xs">
    <label
      htmlFor="sport"
      className="mb-2 block text-xs font-semibold uppercase tracking-[0.3em] text-tealAccent/80"
    >
      Choose your sport
    </label>
    <select
      id="sport"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="w-full rounded-2xl border border-[#1f1f1f] bg-[#0b0b0c] px-4 py-3 text-sm font-medium text-white shadow-[0_16px_40px_-26px_rgba(0,0,0,0.8)] transition focus:border-tealAccent focus:outline-none focus:ring-2 focus:ring-tealAccent/60"
    >
      {Object.entries(sportsData).map(([key, sport]) => (
        <option key={key} value={key}>
          {sport.label}
        </option>
      ))}
    </select>
  </div>
);

const KineticChainVisualizer = ({ activeIndex }) => {
  const baseStroke = '#1f2937';

  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#1f1f1f] bg-[#141414] p-6 shadow-[0_26px_60px_-36px_rgba(0,0,0,0.9)]">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Kinetic Chain Visualizer</h3>
        <span className="text-sm font-medium text-tealAccent">Energy Flow</span>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-[300px_auto] md:items-center">
        <motion.svg
          viewBox="0 0 240 320"
          className="mx-auto h-72 w-56"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {chainSegments.map((segment, index) => {
            const isActive = index === activeIndex;
            const color = isActive ? '#00d4b0' : baseStroke;
            const strokeWidth = isActive ? 6 : 4;

            return (
              <React.Fragment key={segment.id}>
                {segment.line && (
                  <motion.line
                    x1={segment.line.x1}
                    y1={segment.line.y1}
                    x2={segment.line.x2}
                    y2={segment.line.y2}
                    strokeLinecap="round"
                    stroke={color}
                    strokeWidth={strokeWidth}
                    initial={false}
                    animate={{ stroke: color, strokeWidth, opacity: isActive ? 1 : 0.6 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />
                )}
                {segment.joint && (
                  <motion.circle
                    cx={segment.joint.cx}
                    cy={segment.joint.cy}
                    r={isActive ? 12 : 9}
                    fill={isActive ? '#00d4b0' : baseStroke}
                    initial={false}
                    animate={{
                      fill: isActive ? '#00d4b0' : baseStroke,
                      r: isActive ? 12 : 9,
                      opacity: isActive ? 1 : 0.7,
                    }}
                    transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                  />
                )}
                {segment.extra &&
                  segment.extra.map((line, extraIndex) => (
                    <motion.line
                      key={`${segment.id}-extra-${extraIndex}`}
                      x1={line.x1}
                      y1={line.y1}
                      x2={line.x2}
                      y2={line.y2}
                      strokeLinecap="round"
                      stroke={isActive ? '#00d4b0' : baseStroke}
                      strokeWidth={isActive ? 5 : 3}
                      initial={false}
                      animate={{
                        stroke: isActive ? '#00d4b0' : baseStroke,
                        strokeWidth: isActive ? 5 : 3,
                        opacity: isActive ? 1 : 0.5,
                      }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                    />
                  ))}
              </React.Fragment>
            );
          })}
        </motion.svg>

        <div className="space-y-3">
          <p className="text-sm text-slate-400">
            Follow the teal highlight to watch how energy rises segment-by-segment.
          </p>
          <ul className="grid gap-2 text-sm font-medium">
            {chainSegments.map((segment, index) => {
              const isActive = index === activeIndex;
              return (
                <motion.li
                  key={segment.id}
                  className={`rounded-2xl px-4 py-3 ${
                    isActive
                      ? 'bg-tealAccent/20 text-tealAccent shadow-[0_0_25px_rgba(0,212,176,0.35)]'
                      : 'bg-[#0f0f10] text-slate-300'
                  }`}
                  initial={false}
                  animate={{
                    scale: isActive ? 1.02 : 1,
                    opacity: isActive ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.25 }}
                >
                  {segment.label}
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

const InjuryList = ({ injuries }) => (
  <div className="rounded-3xl border border-[#1f1f1f] bg-[#141414] p-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.85)] transition">
    <h3 className="text-lg font-semibold">Common Injury Watchlist</h3>
    <ul className="mt-4 space-y-3 text-sm leading-relaxed">
      {injuries.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-1 inline-block h-2 w-2 flex-none rounded-full bg-tealAccent"></span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

const TrainingTips = ({ tips }) => (
  <div className="rounded-3xl border border-[#1f1f1f] bg-[#141414] p-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.85)] transition">
    <h3 className="text-lg font-semibold">Training Recommendations</h3>
    <ul className="mt-4 space-y-3 text-sm leading-relaxed">
      {tips.map((tip) => (
        <li key={tip} className="flex items-start gap-3">
          <span className="mt-1 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-tealAccent/20 text-xs font-semibold text-tealAccent">
            ✓
          </span>
          <span>{tip}</span>
        </li>
      ))}
    </ul>
  </div>
);

const ReadMore = ({ sportId }) => {
  const activeTopic = deepDiveTopics.find((topic) => topic.id === sportId);
  const topicsToRender = activeTopic ? [activeTopic] : deepDiveTopics;

  return (
    <div className="rounded-3xl border border-[#1f1f1f] bg-[#141414] p-6 shadow-[0_20px_50px_-30px_rgba(0,0,0,0.85)] transition">
      <h3 className="text-lg font-semibold">Sport-Specific Deep Dives</h3>
      <p className="mt-2 text-sm text-slate-400">
        Explore how each sport moves energy through the body, common breakdowns to watch, and the drills that keep the chain
        synchronized.
      </p>
      <ul className="mt-4 space-y-3 text-sm">
        {topicsToRender.map((topic) => (
          <li key={topic.id} className="rounded-2xl bg-[#0f0f10] p-4 transition hover:bg-[#111]">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-base font-semibold text-white">{topic.title}</p>
                <p className="mt-1 text-xs text-slate-400">{topic.summary}</p>
              </div>
              <a
                href={topic.href}
                className="inline-flex items-center gap-2 self-start rounded-full border border-tealAccent px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-tealAccent transition hover:bg-tealAccent/10"
              >
                <span>Read</span>
                <span aria-hidden="true">→</span>
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const MovementLabApp = () => {
  const [selectedSport, setSelectedSport] = useState(() => {
    if (typeof window === 'undefined') return 'soccer';
    return localStorage.getItem('movementLabSport') || 'soccer';
  });
  const [activeSegment, setActiveSegment] = useState(0);

  useEffect(() => {
    localStorage.setItem('movementLabSport', selectedSport);
    setActiveSegment(0);
  }, [selectedSport]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSegment((prev) => (prev + 1) % chainSegments.length);
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  const sportContent = useMemo(() => sportsData[selectedSport], [selectedSport]);

  return (
    <div className="min-h-screen bg-[#0e0e0f] text-[#eaeaea]">
      <header className="site-header">
        <div className="header-inner">
          <img src="images/logo.png" alt="Court to Clinic logo" className="logo" />
          <nav className="topnav">
            <a href="index.html">Home</a>
            <a href="about.html">About</a>
            <a href="movement-lab.html" className="active">
              Movement Lab
            </a>
            <a href="contact.html">Contact</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <section className="rounded-3xl border border-[#1f1f1f] bg-[#141414] p-8 shadow-[0_40px_70px_-45px_rgba(0,0,0,0.85)]">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.4em] text-tealAccent/80">Court to Clinic</p>
              <h1 className="text-3xl font-semibold text-white sm:text-4xl">The Movement Lab</h1>
              <p className="max-w-2xl text-sm text-[#d6d6d6] sm:text-base">
                Explore how your sport affects your kinetic chain and discover ways to prevent injury.
              </p>
            </div>
            <SportSelector value={selectedSport} onChange={setSelectedSport} />
          </div>

          <div className="mt-8 space-y-4 text-base leading-relaxed text-[#d6d6d6]">
            <AnimatePresence mode="wait">
              <motion.p
                key={selectedSport}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                {sportContent.description}
              </motion.p>
            </AnimatePresence>
          </div>
        </section>

        <div className="mt-10 grid gap-8 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <KineticChainVisualizer activeIndex={activeSegment} />

          <div className="space-y-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedSport}-details`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="space-y-8"
              >
                <InjuryList injuries={sportContent.injuries} />
                <TrainingTips tips={sportContent.training} />
              </motion.div>
            </AnimatePresence>

            <ReadMore sportId={selectedSport} />
          </div>
        </div>
      </main>

      <footer className="site-footer">
        © {new Date().getFullYear()} Court to Clinic. Train smart, move better.
      </footer>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MovementLabApp />);
