import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Heart,
  Gift,
  Music,
  Pause,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Star,
  ArrowDown,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useInView,
} from "framer-motion";

import "./styles.css";

/* =========================
   MEMORY PHOTOS
========================= */

const memories = [
  {
    image: "/memories/photo1.jpeg",
    caption: "That random day ❤️",
  },
  {
    image: "/memories/photo2.jpeg",
    caption: "The laughs 🫶🏻",
  },
  {
    image: "/memories/photo3.jpeg",
    caption: "Core memory ✨",
  },
  {
    image: "/memories/photo4.jpeg",
    caption: "Us being us 💗",
  },
];

/* =========================
   STORY
========================= */

const storyItems = [
  {
    year: "Chapter 01",
    title: "The Beginning",
    text: "Somehow, two people who were just supposed to cross paths became an important part of each other's lives.",
  },
  {
    year: "Chapter 02",
    title: "The Random Conversations",
    text: "From completely meaningless conversations to talks that somehow lasted forever.",
  },
  {
    year: "Chapter 03",
    title: "The Laughs",
    text: "The kind of laughter where you forget what you were even laughing about.",
  },
  {
    year: "Chapter 04",
    title: "The Memories",
    text: "Little moments that looked ordinary at the time but became some of the best memories.",
  },
];

/* =========================
   REASONS
========================= */

const reasons = [
  {
    icon: "💗",
    title: "Your Heart",
    text: "You care about people in a way that makes them feel genuinely special.",
  },
  {
    icon: "✨",
    title: "Your Energy",
    text: "You somehow make ordinary moments feel a little more fun.",
  },
  {
    icon: "🫶🏻",
    title: "Your Presence",
    text: "Some people don't need to do anything special. Just having them around is enough.",
  },
  {
    icon: "🌷",
    title: "Your Smile",
    text: "One smile from you can completely change the mood of a moment.",
  },
];

/* =========================
   REVEAL
========================= */

function Reveal({ children, className = "" }) {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-80px",
  });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
            }
          : {}
      }
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

/* =========================
   PARTICLES
========================= */

function Particles() {
  const particles = useMemo(() => {
    return Array.from({ length: 45 }, (_, index) => ({
      id: index,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 5 + 2,
      duration: Math.random() * 8 + 6,
      delay: Math.random() * 5,
    }));
  }, []);

  return (
    <div className="particles" aria-hidden="true">
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="particle"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            animationDuration: `${particle.duration}s`,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* =========================
   CONFETTI
========================= */

function Confetti({ active }) {
  const pieces = useMemo(() => {
    return Array.from({ length: 70 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      delay: Math.random() * 0.8,
      duration: Math.random() * 2 + 2,
      rotate: Math.random() * 360,
    }));
  }, []);

  if (!active) return null;

  return (
    <div className="confetti-container">
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="confetti-piece"
          style={{
            left: `${piece.left}%`,
            animationDelay: `${piece.delay}s`,
            animationDuration: `${piece.duration}s`,
            transform: `rotate(${piece.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
}

/* =========================
   MUSIC PLAYER
========================= */

function MusicPlayer() {
  const audioRef = useRef(null);

  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);

  useEffect(() => {
    const audio = new Audio("/music/birthday.mpeg");

    audio.loop = true;
    audio.preload = "auto";

    audio.addEventListener("play", () => {
      setPlaying(true);
      setAudioError(false);
    });

    audio.addEventListener("pause", () => {
      setPlaying(false);
    });

    audio.addEventListener("error", () => {
      console.error(
        "Could not load /music/birthday.mpeg"
      );

      setAudioError(true);
      setPlaying(false);
    });

    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const startMusic = async () => {
      const audio = audioRef.current;

      if (!audio) return;

      try {
        await audio.play();
        setPlaying(true);
        setAudioError(false);
      } catch (error) {
        console.error(
          "Could not start birthday music:",
          error
        );
      }
    };

    window.addEventListener(
      "birthday-start-music",
      startMusic
    );

    return () => {
      window.removeEventListener(
        "birthday-start-music",
        startMusic
      );
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
      return;
    }

    try {
      await audio.play();
      setPlaying(true);
      setAudioError(false);
    } catch (error) {
      console.error(
        "Could not play birthday music:",
        error
      );

      setAudioError(true);
      setPlaying(false);
    }
  };

  return (
    <button
      className={`music-button ${
        playing ? "music-playing" : ""
      }`}
      onClick={toggleMusic}
      aria-label={
        playing ? "Pause music" : "Play music"
      }
      title={
        audioError
          ? "Could not load birthday.mpeg"
          : playing
          ? "Pause music"
          : "Play birthday music"
      }
    >
      {playing ? (
        <Pause size={17} />
      ) : (
        <Music size={17} />
      )}

      <span>
        {playing ? "Music On" : "Music"}
      </span>
    </button>
  );
}

/* =========================
   NAVIGATION
========================= */

function Nav() {
  const [open, setOpen] = useState(false);

  const links = [
    ["Home", "home"],
    ["Message", "message"],
    ["Memories", "memories"],
    ["Our Story", "story"],
    ["Surprise", "surprise"],
  ];

  const scrollTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
      });

    setOpen(false);
  };

  return (
    <nav className="nav">
      <button
        className="nav-logo"
        onClick={() => scrollTo("home")}
      >
        <Heart size={17} fill="currentColor" />
        <span>Aditi</span>
      </button>

      <div
        className={`nav-links ${
          open ? "nav-open" : ""
        }`}
      >
        {links.map(([label, id]) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <button
        className="menu-button"
        onClick={() => setOpen(!open)}
        aria-label="Menu"
      >
        {open ? <X /> : <Menu />}
      </button>
    </nav>
  );
}

/* =========================
   INTRO
========================= */

function Intro({ onOpen }) {
  return (
    <section id="home" className="hero-section">
      <div className="hero-glow glow-one" />
      <div className="hero-glow glow-two" />

      <motion.div
        className="hero-content"
        initial={{
          opacity: 0,
          y: 30,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
        }}
      >
        <motion.div
          className="tiny-label"
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          <Sparkles size={15} />
          A little something for you
        </motion.div>

        <h1 className="hero-title">
          Hey Aditi...
          <span>💗</span>
        </h1>

        <p className="hero-subtitle">
          Someone special has a birthday today...
          <span>✨</span>
        </p>

        <motion.div
          className="hero-name"
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            delay: 0.5,
            duration: 0.8,
          }}
        >
          Happy Birthday, Aditi!
        </motion.div>

        <div className="hero-date">
          🎂 ❤️ ✨
        </div>

        <motion.button
          className="surprise-button"
          onClick={onOpen}
          whileHover={{
            scale: 1.05,
          }}
          whileTap={{
            scale: 0.96,
          }}
        >
          <Gift size={20} />
          Open Your Surprise
          <Sparkles size={18} />
        </motion.button>

        <div className="scroll-hint">
          <span>scroll to explore</span>
          <ArrowDown size={16} />
        </div>
      </motion.div>
    </section>
  );
}

/* =========================
   MESSAGE
========================= */

function Message() {
  return (
    <section
      id="message"
      className="section message-section"
    >
      <Reveal>
        <div className="section-heading">
          <span className="eyebrow">
            FROM THE HEART
          </span>

          <h2>
            Happy Birthday Aditi
            <span> ❤️🎂✨</span>
          </h2>
        </div>

        <div className="letter-card">
          <div className="letter-decoration">
            <Heart
              size={22}
              fill="currentColor"
            />
          </div>

          <p>
            Kuch log life mein bas “friends” banke
            aate hain… aur kuch log dheere-dheere
            life ka woh hissa ban jaate hain jinke
            bina sab kuch thoda incomplete sa lagta
            hai. Tu mere liye wahi insaan hai. 🫶🏻
          </p>

          <p>
            Tere saath bitaye hue moments, random
            conversations, bina wajah ki hasi, aur
            woh chhoti-chhoti memories… shayad ye
            sab ordinary moments lagte hain, but
            honestly, mere liye ye sab kaafi special
            hain.
          </p>

          <p>
            Thank you for being the person you are —
            caring, crazy, funny, supportive, and
            beautifully yourself. 💗
          </p>

          <p>
            I hope this new year of your life brings
            you everything your heart quietly wishes
            for. May you smile more, stress less,
            achieve everything you dream about and
            always have people around you who make
            you feel loved.
          </p>

          <p className="letter-ending">
            And no matter how much life changes, I
            hope we always have those random
            conversations, stupid laughs, and
            unforgettable memories. ❤️
          </p>

          <div className="signature">
            Always rooting for you ✨
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* =========================
   GALLERY
========================= */

function Gallery() {
  const [selected, setSelected] =
    useState(null);

  const nextImage = () => {
    setSelected(
      (selected + 1) % memories.length
    );
  };

  const previousImage = () => {
    setSelected(
      (selected - 1 + memories.length) %
        memories.length
    );
  };

  return (
    <section
      id="memories"
      className="section memories-section"
    >
      <Reveal>
        <div className="section-heading">
          <span className="eyebrow">
            LITTLE MOMENTS
          </span>

          <h2>
            Our Memories <span>📸💗</span>
          </h2>

          <p>
            Four little pieces of a much bigger
            story.
          </p>
        </div>

        <div className="memory-grid">
          {memories.map((memory, index) => (
            <motion.button
              className="memory-card"
              key={memory.image}
              onClick={() =>
                setSelected(index)
              }
              whileHover={{
                y: -8,
              }}
            >
              <div className="memory-image-wrap">
                <img
                  src={memory.image}
                  alt={memory.caption}
                  onError={(event) => {
                    console.error(
                      `Image failed: ${memory.image}`
                    );

                    event.currentTarget.style.opacity =
                      "0";
                  }}
                />

                <div className="memory-overlay">
                  <span>
                    View memory
                  </span>
                </div>
              </div>

              <div className="memory-caption">
                {memory.caption}
              </div>
            </motion.button>
          ))}
        </div>
      </Reveal>

      <AnimatePresence>
        {selected !== null && (
          <motion.div
            className="lightbox"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() =>
              setSelected(null)
            }
          >
            <button
              className="lightbox-close"
              onClick={() =>
                setSelected(null)
              }
            >
              <X />
            </button>

            <button
              className="lightbox-arrow left"
              onClick={(event) => {
                event.stopPropagation();
                previousImage();
              }}
            >
              <ChevronLeft />
            </button>

            <motion.div
              className="lightbox-content"
              initial={{
                scale: 0.85,
              }}
              animate={{
                scale: 1,
              }}
              exit={{
                scale: 0.85,
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
            >
              <img
                src={memories[selected].image}
                alt={
                  memories[selected].caption
                }
              />

              <div>
                {
                  memories[selected]
                    .caption
                }
              </div>
            </motion.div>

            <button
              className="lightbox-arrow right"
              onClick={(event) => {
                event.stopPropagation();
                nextImage();
              }}
            >
              <ChevronRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* =========================
   STORY
========================= */

function Story() {
  return (
    <section
      id="story"
      className="section story-section"
    >
      <Reveal>
        <div className="section-heading">
          <span className="eyebrow">
            OUR JOURNEY
          </span>

          <h2>
            Our Story <span>✨</span>
          </h2>

          <p>
            A collection of moments that became
            memories.
          </p>
        </div>

        <div className="timeline">
          {storyItems.map(
            (item, index) => (
              <motion.div
                className={`timeline-item ${
                  index % 2 === 0
                    ? "timeline-left"
                    : "timeline-right"
                }`}
                key={item.title}
                initial={{
                  opacity: 0,
                  x:
                    index % 2 === 0
                      ? -40
                      : 40,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  duration: 0.7,
                }}
              >
                <div className="timeline-dot">
                  <Heart
                    size={13}
                    fill="currentColor"
                  />
                </div>

                <div className="timeline-card">
                  <span>{item.year}</span>

                  <h3>{item.title}</h3>

                  <p>{item.text}</p>
                </div>
              </motion.div>
            )
          )}
        </div>
      </Reveal>
    </section>
  );
}

/* =========================
   REASONS
========================= */

function Reasons() {
  return (
    <section className="section reasons-section">
      <Reveal>
        <div className="section-heading">
          <span className="eyebrow">
            JUST BECAUSE
          </span>

          <h2>
            Things I Love About You{" "}
            <span>💗</span>
          </h2>
        </div>

        <div className="reasons-grid">
          {reasons.map(
            (reason, index) => (
              <motion.div
                className="reason-card"
                key={reason.title}
                whileHover={{
                  y: -7,
                  rotate:
                    index % 2 ? 1 : -1,
                }}
              >
                <div className="reason-icon">
                  {reason.icon}
                </div>

                <h3>
                  {reason.title}
                </h3>

                <p>{reason.text}</p>
              </motion.div>
            )
          )}
        </div>
      </Reveal>
    </section>
  );
}

/* =========================
   CAKE
========================= */

function Cake() {
  const [blown, setBlown] =
    useState([false, false, false]);

  const toggleCandle = (index) => {
    setBlown((current) => {
      const updated = [...current];

      updated[index] =
        !updated[index];

      return updated;
    });
  };

  const allOut =
    blown.every(Boolean);

  return (
    <section className="section cake-section">
      <Reveal>
        <div className="cake-card">
          <div className="section-heading">
            <span className="eyebrow">
              MAKE A WISH
            </span>

            <h2>
              One More Thing...{" "}
              <span>🎂</span>
            </h2>

            <p>
              Click the candles and make
              your wish.
            </p>
          </div>

          <div className="cake-wrapper">
            <div className="candles">
              {blown.map(
                (isBlown, index) => (
                  <button
                    key={index}
                    className={`candle ${
                      isBlown
                        ? "candle-off"
                        : ""
                    }`}
                    onClick={() =>
                      toggleCandle(
                        index
                      )
                    }
                  >
                    {!isBlown && (
                      <span className="flame" />
                    )}

                    <span className="candle-stick" />
                  </button>
                )
              )}
            </div>

            <div className="cake-icing cake-top-icing" />

            <div className="cake-layer cake-top" />

            <div className="cake-icing cake-middle-icing" />

            <div className="cake-layer cake-middle" />

            <div className="cake-icing cake-bottom-icing" />

            <div className="cake-layer cake-bottom" />

            <div className="cake-plate" />
          </div>

          <AnimatePresence>
            {allOut && (
              <motion.div
                className="wish-message"
                initial={{
                  opacity: 0,
                  y: 15,
                  scale: 0.9,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
              >
                <Sparkles size={20} />

                Wish granted. ✨❤️

                <Sparkles size={20} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  );
}

/* =========================
   SURPRISE
========================= */

function Surprise() {
  const [revealed, setRevealed] =
    useState(false);

  return (
    <section
      id="surprise"
      className="section surprise-section"
    >
      <Reveal>
        <motion.div
          className={`surprise-card ${
            revealed
              ? "surprise-revealed"
              : ""
          }`}
        >
          {!revealed ? (
            <>
              <div className="surprise-icon">
                <Gift size={34} />
              </div>

              <span className="eyebrow">
                WAIT... THERE'S MORE
              </span>

              <h2>
                One Last Surprise... 🎁
              </h2>

              <p>
                I saved one little message
                just for you.
              </p>

              <button
                className="reveal-button"
                onClick={() =>
                  setRevealed(true)
                }
              >
                Reveal It
                <Sparkles size={17} />
              </button>
            </>
          ) : (
            <motion.div
              className="revealed-message"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <Heart
                size={32}
                fill="currentColor"
              />

              <h2>
                You deserve all the
                happiness in the world.
                ❤️
              </h2>

              <p>
                Keep being exactly who you
                are. Keep laughing loudly,
                dreaming fearlessly, and
                making the world a little
                brighter just by being in it.
              </p>

              <p>
                Happy Birthday once again,
                Aditi. Here's to more
                memories, more adventures,
                more random conversations,
                and a lot more reasons to
                smile. 🫶🏻✨
              </p>
            </motion.div>
          )}
        </motion.div>
      </Reveal>
    </section>
  );
}

/* =========================
   FINAL
========================= */

function Final() {
  return (
    <section className="final-section">
      <div className="final-glow" />

      <Reveal>
        <div className="final-content">
          <div className="final-stars">
            <Star size={16} />
            <Sparkles size={22} />
            <Star size={12} />
          </div>

          <span className="eyebrow">
            UNTIL THE NEXT MEMORY
          </span>

          <h2>
            Here's to you,
            <br />
            Aditi. ❤️
          </h2>

          <p>
            May this chapter be your most
            beautiful one yet.
          </p>

          <div className="final-heart">
            <Heart
              size={34}
              fill="currentColor"
            />
          </div>

          <div className="final-footer">
            Made with love ✨
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* =========================
   APP
========================= */

function App() {
  const [opened, setOpened] =
    useState(false);

  const openSurprise = () => {
    setOpened(true);

    /*
      Start music after the user clicks.
      This avoids browser autoplay restrictions.
    */
    window.dispatchEvent(
      new Event(
        "birthday-start-music"
      )
    );

    setTimeout(() => {
      document
        .getElementById("message")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 700);
  };

  return (
    <div className="app">
      <Particles />

      <Confetti active={opened} />

      <Nav />

      <MusicPlayer />

      <main>
        <Intro
          onOpen={openSurprise}
        />

        <Message />

        <Gallery />

        <Story />

        <Reasons />

        <Cake />

        <Surprise />

        <Final />
      </main>
    </div>
  );
}

createRoot(
  document.getElementById("root")
).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);