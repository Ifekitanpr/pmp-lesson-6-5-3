import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  ChevronDown,
  Volume2,
  VolumeX,
  X,
  Filter,
  Layers,
  ShieldCheck,
  BookOpen,
  FolderGit2,
  Sparkles,
  HelpCircle,
  Clock,
  Database,
} from "lucide-react";
import { useLessonAudio } from "../../shared/useLessonAudio";
import "./styles.css";

const illustrationFiles = import.meta.glob("./assets/illustrations/*.png", {
  eager: true,
  query: "?url",
  import: "default",
});
const img = (n) => illustrationFiles[`./assets/illustrations/${n}.png`];

const tabs = [
  "The potluck rule",
  "Where deposits come from",
  "The three-step pipeline",
  "Don't wait for closure",
  "Exam lens",
];

const pipelineSteps = [
  {
    title: "1. Curate",
    description:
      "Select the learning with reuse value. Ten excellent assets beat a hundred entries nobody reads — asset libraries die of volume more often than scarcity.",
    image: "pipeline-curate",
    icon: Filter,
  },
  {
    title: "2. Generalize",
    description:
      "Strip the project specifics, keep the pattern. A lesson tied too tightly to one project's exact circumstances helps nobody else.",
    image: "pipeline-generalize",
    icon: Layers,
  },
  {
    title: "3. Version and Own",
    description:
      "Assets enter through a steward — the PMO or a named owner — versioned, with the contributing project credited. Governance light enough not to deter contribution, firm enough to keep the library trustworthy.",
    image: "pipeline-version-own",
    icon: ShieldCheck,
  },
];

const quizzes = [
  {
    q: "A project team dumps every raw lesson from their retrospectives and post-mortems directly into the organization's asset library, without filtering, generalizing, or removing project-specific details. Within a year, the library has thousands of entries, and most team members have stopped checking it because it's too cluttered to be useful. What does this scenario best illustrate?",
    a: [
      "The library failed because it didn't have enough entries to be genuinely useful",
      "Asset libraries die of volume more often than scarcity — raw, uncurated lessons dumped in without curation or generalization make the library too cluttered to actually use",
      "The team should have waited until project closure to add anything to the library",
      "The problem is that no steward or owner reviewed the individual project's contributions for credit",
    ],
    correct: 1,
    explain:
      "Correct! This is exactly the volume failure mode this lesson warns about — raw lessons, uncurated and ungeneralized, don't become assets just by being added to a shared space. Ten excellent, curated assets are worth more than thousands of raw, cluttered entries.",
    fail:
      "Reconsider — the library had plenty of entries, so scarcity wasn't the problem; timing (waiting for closure) isn't what's being tested here; and the core issue is curation and generalization, not simply a missing credit step.",
  },
  {
    q: "A project team validates a genuinely useful estimating adjustment in month three of a twelve-month project. The project manager decides to hold onto this learning and add it to the organization's estimating database only once the project formally closes, reasoning that 'we'll do all our OPA updates at the end.' What is the drawback of this approach?",
    a: [
      "There is no drawback — OPA updates are meant to be batched and submitted only at project closure",
      "Waiting until closure means the proven learning sits unused for months, unavailable to other projects (or even this project's own later phases) that could benefit from it sooner",
      "The drawback is that estimating databases specifically should never be updated mid-project, regardless of when a lesson is proven",
      "There is no drawback, since organizational process assets only have value once a project is fully closed",
    ],
    correct: 1,
    explain:
      "Correct! Assets ship when the learning is proven, not when the project happens to close — waiting means a validated, useful lesson sits idle for months instead of helping other projects (or this one) right away.",
    fail:
      "Reconsider — OPA updates aren't meant to be batched only at closure; nothing about estimating databases specifically requires waiting; and assets have value the moment they're proven, not only once a project ends.",
  },
];

function App() {
  const [tab, setTab] = useState(0);
  const [sound, setSound] = useState(true);
  const [revealed, setRevealed] = useState({});
  const [openAccordion, setOpenAccordion] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});

  useLessonAudio(sound);

  const toggleReveal = (key) => {
    setRevealed((prev) => ({ ...prev, [key]: true }));
  };

  const handleQuizAnswer = (quizIdx, optionIdx) => {
    setQuizAnswers((prev) => ({ ...prev, [quizIdx]: optionIdx }));
  };

  return (
    <div className="app-container">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="badge-wrapper">
            <span className="badge">Lesson 6.5.3</span>
            <span className="badge-meta">CertSprints PMP · Module 6</span>
          </div>
          <h1 className="main-title">Update Organizational Process Assets (OPAs)</h1>
          <p className="subtitle">
            Transforming real-world project learnings into curated, versioned, reusable organizational assets.
          </p>
        </div>
        <div className="audio-toggle">
          <button
            onClick={() => setSound(!sound)}
            className="icon-button"
            title={sound ? "Mute audio feedback" : "Enable audio feedback"}
          >
            {sound ? <Volume2 size={20} /> : <VolumeX size={20} />}
          </button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="tabs-nav" aria-label="Lesson screens">
        {tabs.map((name, i) => (
          <button
            key={name}
            onClick={() => setTab(i)}
            className={`tab-btn ${tab === i ? "tab-btn-active" : ""}`}
          >
            <span className="tab-number">{i + 1}</span>
            <span className="tab-name">{name}</span>
          </button>
        ))}
      </nav>

      {/* Main Content Area */}
      <main className="content-area">
        {/* SCREEN 1: HOOK */}
        {tab === 0 && (
          <div className="screen-card">
            <div className="card-badge">Screen 1 · Hook</div>
            <h2 className="screen-heading">The Potluck Rule: Deposit as Well as Withdraw</h2>
            <div className="intro-prose">
              <p>
                If you go to a potluck dinner, you don't just eat. You bring a dish. The whole thing only works because people contribute as well as consume.
              </p>
            </div>

            {!revealed.hook ? (
              <div className="reveal-cta">
                <button
                  onClick={() => toggleReveal("hook")}
                  className="primary-btn"
                >
                  <Sparkles size={18} />
                  <span>Reveal the OPA Connection</span>
                </button>
              </div>
            ) : (
              <div className="reveal-box animate-fade-in">
                <div className="reveal-content-grid">
                  <div className="reveal-text">
                    <h3 className="section-title">The Matching Deposit Obligation</h3>
                    <p>
                      Organizational process assets work the same way. Every project withdraws from this shared library on day one — templates, checklists, playbooks, policies, estimating databases, risk and trigger libraries, the lessons repository.
                    </p>
                    <p>
                      Enabler 6.3 names the matching deposit obligation: <strong>projects that only withdraw leave the organization exactly as smart as they found it</strong>.
                    </p>
                    <div className="highlight-pill">
                      <span>Core Principle:</span> A project that only consumes capability leaves future projects to reinvent the wheel.
                    </div>
                  </div>
                  <div className="reveal-image-container">
                    <img
                      src={img("potluck-table-deposit")}
                      alt="Potluck table sharing resources alongside active OPA library"
                      className="lesson-image"
                      onClick={() =>
                        setModalData({
                          title: "The Matching Deposit Obligation",
                          image: "potluck-table-deposit",
                          text: "Just like a potluck dinner, an organization's asset library thrives only when teams deposit proven tools and insights back onto the shelf.",
                        })
                      }
                    />
                    <span className="image-caption">Click image to expand</span>
                  </div>
                </div>
              </div>
            )}

            <div className="screen-footer">
              <div></div>
              <button onClick={() => setTab(1)} className="nav-btn next-btn">
                <span>Next: Where deposits come from</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 2: WHERE DEPOSITS COME FROM */}
        {tab === 1 && (
          <div className="screen-card">
            <div className="card-badge">Screen 2 · The Friction of Real Work</div>
            <h2 className="screen-heading">Where the Deposits Actually Come From</h2>
            <div className="intro-prose">
              <p>
                OPA updates aren't a separate task bolted onto the end of a project. They come from somewhere very specific.
              </p>
            </div>

            {!revealed.source ? (
              <div className="reveal-cta">
                <button
                  onClick={() => toggleReveal("source")}
                  className="primary-btn"
                >
                  <Sparkles size={18} />
                  <span>Discover the Source of OPA Updates</span>
                </button>
              </div>
            ) : (
              <div className="reveal-box animate-fade-in">
                <div className="reveal-content-grid">
                  <div className="reveal-text">
                    <h3 className="section-title">Tested in the Field</h3>
                    <p>
                      OPA updates appear as an output of <strong>nearly every monitoring process</strong> in this module, because monitoring is where practice gets tested hard enough to learn from.
                    </p>
                    <p>
                      It's the friction of actually running the work — not the theoretical planning of it — that produces something worth depositing back into the library.
                    </p>
                    <div className="info-card-accent">
                      <strong>Monitoring as an Asset Engine:</strong>
                      <ul>
                        <li>Schedule monitoring refines estimation velocity databases.</li>
                        <li>Risk monitoring generates battle-tested trigger libraries.</li>
                        <li>Quality audits yield standardized inspection checklists.</li>
                        <li>Stakeholder feedback refines communication matrices.</li>
                      </ul>
                    </div>
                  </div>
                  <div className="reveal-image-container">
                    <img
                      src={img("monitoring-deposits-feed")}
                      alt="Monitoring processes channeling validated insights into central OPA repository"
                      className="lesson-image"
                      onClick={() =>
                        setModalData({
                          title: "Monitoring Channels Feeding OPA Deposits",
                          image: "monitoring-deposits-feed",
                          text: "Active monitoring pressure-tests plans against reality, creating the empirical data needed to update the organization's reusable assets.",
                        })
                      }
                    />
                    <span className="image-caption">Click image to expand</span>
                  </div>
                </div>
              </div>
            )}

            <div className="screen-footer">
              <button onClick={() => setTab(0)} className="nav-btn prev-btn">
                <ArrowLeft size={18} />
                <span>Previous</span>
              </button>
              <button onClick={() => setTab(2)} className="nav-btn next-btn">
                <span>Next: Three-step pipeline</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 3: THREE-STEP PIPELINE & KNOWLEDGE CHECK */}
        {tab === 2 && (
          <div className="screen-card">
            <div className="card-badge">Screen 3 · Asset Transformation</div>
            <h2 className="screen-heading">The Pipeline: Curate, Generalize, Version</h2>
            <div className="intro-prose">
              <p>
                Raw lessons do not belong in the asset library — assets do. Three honest steps turn raw experiences into reusable capability. Click each to explore.
              </p>
            </div>

            <div className="accordion-list">
              {pipelineSteps.map((step, index) => {
                const IconComponent = step.icon;
                const isOpen = openAccordion === index;
                return (
                  <div
                    key={step.title}
                    className={`accordion-card ${isOpen ? "accordion-open" : ""}`}
                  >
                    <button
                      className="accordion-header"
                      onClick={() =>
                        setOpenAccordion(isOpen ? null : index)
                      }
                    >
                      <div className="accordion-title-group">
                        <span className="accordion-icon-box">
                          <IconComponent size={20} />
                        </span>
                        <span className="accordion-title">{step.title}</span>
                      </div>
                      <ChevronDown
                        size={20}
                        className={`chevron ${isOpen ? "chevron-rotated" : ""}`}
                      />
                    </button>
                    {isOpen && (
                      <div className="accordion-body animate-fade-in">
                        <div className="accordion-grid">
                          <div className="accordion-desc">
                            <p>{step.description}</p>
                          </div>
                          <div className="accordion-img-wrap">
                            <img
                              src={img(step.image)}
                              alt={step.title}
                              className="accordion-thumb"
                              onClick={() =>
                                setModalData({
                                  title: step.title,
                                  image: step.image,
                                  text: step.description,
                                })
                              }
                            />
                            <span className="image-caption">Enlarge</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Micro Knowledge Check 1 */}
            <div className="quiz-section">
              <div className="quiz-header">
                <HelpCircle className="quiz-badge-icon" size={20} />
                <span>Micro Knowledge Check</span>
              </div>
              <p className="quiz-scenario">{quizzes[0].q}</p>
              <div className="quiz-options">
                {quizzes[0].a.map((opt, optIdx) => {
                  const isSelected = quizAnswers[0] === optIdx;
                  const isCorrect = optIdx === quizzes[0].correct;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleQuizAnswer(0, optIdx)}
                      className={`quiz-option ${
                        isSelected
                          ? isCorrect
                            ? "quiz-option-correct"
                            : "quiz-option-wrong"
                          : ""
                      }`}
                    >
                      <span className="option-letter">
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span className="option-text">{opt}</span>
                    </button>
                  );
                })}
              </div>
              {quizAnswers[0] !== undefined && (
                <div
                  className={`quiz-feedback ${
                    quizAnswers[0] === quizzes[0].correct
                      ? "feedback-correct"
                      : "feedback-wrong"
                  } animate-fade-in`}
                >
                  {quizAnswers[0] === quizzes[0].correct
                    ? quizzes[0].explain
                    : quizzes[0].fail}
                </div>
              )}
            </div>

            <div className="screen-footer">
              <button onClick={() => setTab(1)} className="nav-btn prev-btn">
                <ArrowLeft size={18} />
                <span>Previous</span>
              </button>
              <button onClick={() => setTab(3)} className="nav-btn next-btn">
                <span>Next: Don't wait for closure</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 4: TIMING: DON'T WAIT FOR CLOSURE & KNOWLEDGE CHECK */}
        {tab === 3 && (
          <div className="screen-card">
            <div className="card-badge">Screen 4 · Deposit Timing</div>
            <h2 className="screen-heading">Timing: Don't Wait for Closure</h2>
            <div className="intro-prose">
              <p>
                One more detail changes when a deposit actually happens — and it isn't at the end of the project lifecycle.
              </p>
            </div>

            {!revealed.timing ? (
              <div className="reveal-cta">
                <button
                  onClick={() => toggleReveal("timing")}
                  className="primary-btn"
                >
                  <Sparkles size={18} />
                  <span>Reveal the Proven Learning Rule</span>
                </button>
              </div>
            ) : (
              <div className="reveal-box animate-fade-in">
                <div className="reveal-content-grid">
                  <div className="reveal-text">
                    <h3 className="section-title">Assets Ship When Proven</h3>
                    <p>
                      <strong>Do not wait for closure</strong> — assets ship when the learning is proven.
                    </p>
                    <p>
                      A lesson that's genuinely validated in month three of a project shouldn't sit in someone's private notes until the project wraps up months later. The moment it's proven, it's ready to deposit — for the current project's own later phases, and for whichever other project might need it next week.
                    </p>
                    <div className="highlight-pill">
                      <span>Golden Rule:</span> Continuous deposit keeps the enterprise agile and prevents validated insights from decaying in draft documents.
                    </div>
                  </div>
                  <div className="reveal-image-container">
                    <img
                      src={img("proven-midproject-timing")}
                      alt="Mid-project learning deposited immediately upon validation"
                      className="lesson-image"
                      onClick={() =>
                        setModalData({
                          title: "Immediate Mid-Project Deposit",
                          image: "proven-midproject-timing",
                          text: "Proven practices deliver immediate organizational ROI when deposited as soon as they are validated during execution.",
                        })
                      }
                    />
                    <span className="image-caption">Click image to expand</span>
                  </div>
                </div>

                {/* Micro Knowledge Check 2 */}
                <div className="quiz-section">
                  <div className="quiz-header">
                    <HelpCircle className="quiz-badge-icon" size={20} />
                    <span>Micro Knowledge Check</span>
                  </div>
                  <p className="quiz-scenario">{quizzes[1].q}</p>
                  <div className="quiz-options">
                    {quizzes[1].a.map((opt, optIdx) => {
                      const isSelected = quizAnswers[1] === optIdx;
                      const isCorrect = optIdx === quizzes[1].correct;
                      return (
                        <button
                          key={optIdx}
                          onClick={() => handleQuizAnswer(1, optIdx)}
                          className={`quiz-option ${
                            isSelected
                              ? isCorrect
                                ? "quiz-option-correct"
                                : "quiz-option-wrong"
                              : ""
                          }`}
                        >
                          <span className="option-letter">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="option-text">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                  {quizAnswers[1] !== undefined && (
                    <div
                      className={`quiz-feedback ${
                        quizAnswers[1] === quizzes[1].correct
                          ? "feedback-correct"
                          : "feedback-wrong"
                      } animate-fade-in`}
                    >
                      {quizAnswers[1] === quizzes[1].correct
                        ? quizzes[1].explain
                        : quizzes[1].fail}
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="screen-footer">
              <button onClick={() => setTab(2)} className="nav-btn prev-btn">
                <ArrowLeft size={18} />
                <span>Previous</span>
              </button>
              <button onClick={() => setTab(4)} className="nav-btn next-btn">
                <span>Next: Exam lens</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 5: SYNTHESIS (EXAM LENS) */}
        {tab === 4 && (
          <div className="screen-card">
            <div className="card-badge">Screen 5 · Synthesis & Exam Lens</div>
            <h2 className="screen-heading">The Sustained Value of Active OPA Governance</h2>
            <div className="intro-prose">
              <p>
                Back to that potluck table one more time — because a project that only ever eats leaves the organization exactly as hungry as it found it.
              </p>
            </div>

            {!revealed.exam ? (
              <div className="reveal-cta">
                <button
                  onClick={() => toggleReveal("exam")}
                  className="primary-btn"
                >
                  <Award size={18} />
                  <span>Reveal Key Exam Takeaways</span>
                </button>
              </div>
            ) : (
              <div className="reveal-box animate-fade-in">
                <div className="reveal-content-grid">
                  <div className="reveal-text">
                    <h3 className="section-title">Exam-Relevant Enablers</h3>
                    <ul className="bullet-list">
                      <li>
                        <strong>OPAs Defined:</strong> Templates, checklists, playbooks, policies, estimating databases, risk/trigger libraries, and the lessons learned repository.
                      </li>
                      <li>
                        <strong>Reciprocal Obligation:</strong> Every project withdraws capability; Enabler 6.3 mandates the matching deposit obligation.
                      </li>
                      <li>
                        <strong>Monitoring Output:</strong> OPA updates emerge naturally from monitoring processes where practice is tested against reality.
                      </li>
                      <li>
                        <strong>Three-Step Pipeline:</strong> Curate (filter for reuse value), Generalize (strip specifics, isolate the pattern), and Version & Own (governed by a named steward with source attribution).
                      </li>
                      <li>
                        <strong>Timing Rule:</strong> Assets ship when the learning is proven — never artificially delayed until project closure.
                      </li>
                    </ul>
                  </div>
                  <div className="reveal-image-container">
                    <img
                      src={img("exam-opa-potluck")}
                      alt="Fully stocked and continuously replenished OPA repository"
                      className="lesson-image"
                      onClick={() =>
                        setModalData({
                          title: "Synchronized Organizational Capability",
                          image: "exam-opa-potluck",
                          text: "Continuous OPA stewardship transforms isolated project lessons into permanent enterprise competitive advantages.",
                        })
                      }
                    />
                    <span className="image-caption">Click image to expand</span>
                  </div>
                </div>

                <div className="completion-card">
                  <Award size={32} className="completion-icon" />
                  <div>
                    <h4>Lesson 6.5.3 Completed</h4>
                    <p>You have mastered the principles, pipeline, and timing of updating Organizational Process Assets.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="screen-footer">
              <button onClick={() => setTab(3)} className="nav-btn prev-btn">
                <ArrowLeft size={18} />
                <span>Previous</span>
              </button>
              <div></div>
            </div>
          </div>
        )}
      </main>

      {/* Modal Portal */}
      {modalData &&
        createPortal(
          <div className="modal-backdrop" onClick={() => setModalData(null)}>
            <div
              className="modal-content animate-pop"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <h3>{modalData.title}</h3>
                <button
                  className="close-btn"
                  onClick={() => setModalData(null)}
                >
                  <X size={20} />
                </button>
              </div>
              <div className="modal-body">
                <img
                  src={img(modalData.image)}
                  alt={modalData.title}
                  className="modal-image"
                />
                <p className="modal-caption">{modalData.text}</p>
              </div>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
