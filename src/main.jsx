import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { createPortal } from "react-dom";
import {
  ArrowLeft,
  ArrowRight,
  Award,
  Check,
  Volume2,
  VolumeX,
  X,
  Target,
  Filter,
  Layers,
  ShieldCheck,
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

const reveals = {
  hook: {
    title: "The Matching Deposit Obligation",
    text: "Organizational process assets work exactly like a potluck dinner. Every project withdraws from this shared library on day one — templates, checklists, playbooks, policies, estimating databases, risk and trigger libraries, the lessons repository. Enabler 6.3 names the matching deposit obligation: projects that only withdraw leave the organization exactly as smart as they found it. A project that only consumes capability leaves future projects to reinvent the wheel.",
    image: "potluck-table-deposit",
  },
  monitoring: {
    title: "Monitoring Channels Feeding OPA Deposits",
    text: "OPA updates aren't a separate task bolted onto the end of a project. They appear as an output of nearly every monitoring process in this module, because monitoring is where practice gets tested hard enough against reality to learn from. Schedule monitoring refines estimation velocity databases; risk monitoring generates battle-tested trigger libraries; quality audits yield standardized inspection checklists; and stakeholder feedback refines communication matrices.",
    image: "monitoring-deposits-feed",
  },
  timing: {
    title: "Assets Ship When Proven — Don't Wait for Closure",
    text: "A lesson that is genuinely validated in month three of a project shouldn't sit in someone's private notes until the project formally closes months later. The moment it is proven, it's ready to deposit — for the current project's own later phases, and for whichever sister project might need it next week. Continuous deposit keeps the enterprise agile and prevents validated insights from decaying in draft documents.",
    image: "proven-midproject-timing",
  },
  exam: {
    title: "The Sustained Value of Active OPA Governance",
    text: "Back to that potluck table one more time — because a project that only ever eats leaves the organization exactly as hungry as it found it. Continuous OPA stewardship transforms isolated project lessons into permanent enterprise competitive advantages.",
    image: "exam-opa-potluck",
    bullets: [
      "OPAs defined: templates, checklists, playbooks, policies, estimating databases, risk/trigger libraries, and the lessons learned repository",
      "Reciprocal obligation: every project withdraws capability; Enabler 6.3 mandates the matching deposit obligation",
      "Monitoring output: OPA updates emerge naturally from monitoring processes where practice is tested against reality",
      "Three-step pipeline: Curate (filter for reuse value), Generalize (strip specifics, keep pattern), Version & Own (governed by named steward with credit)",
      "Timing rule: assets ship immediately when proven — never artificially delayed until project closure",
    ],
  },
};

const pipelineSteps = [
  {
    title: "1. Curate",
    text: "Select the learning with reuse value. Ten excellent assets beat a hundred entries nobody reads — asset libraries die of volume more often than scarcity. Without curation, repositories become junk drawers.",
    image: "pipeline-curate",
    icon: Filter,
  },
  {
    title: "2. Generalize",
    text: "Strip the project specifics, keep the pattern. A lesson tied too tightly to one project's exact vendor code or unique circumstance helps nobody else. Extract the repeatable principle.",
    image: "pipeline-generalize",
    icon: Layers,
  },
  {
    title: "3. Version and Own",
    text: "Assets enter through a steward — the PMO or a named owner — versioned, with the contributing project credited. Governance light enough not to deter contribution, firm enough to keep the library trustworthy.",
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
    c: 1,
    g: "Correct! This is exactly the volume failure mode this lesson warns about — raw lessons, uncurated and ungeneralized, don't become assets just by being added to a shared space. Ten excellent, curated assets are worth more than thousands of raw, cluttered entries.",
    b: "Reconsider — the library had plenty of entries, so scarcity wasn't the problem; timing (waiting for closure) isn't what's being tested here; and the core issue is curation and generalization, not simply a missing credit step.",
  },
  {
    q: "A project team validates a genuinely useful estimating adjustment in month three of a twelve-month project. The project manager decides to hold onto this learning and add it to the organization's estimating database only once the project formally closes, reasoning that 'we'll do all our OPA updates at the end.' What is the drawback of this approach?",
    a: [
      "There is no drawback — OPA updates are meant to be batched and submitted only at project closure",
      "Waiting until closure means the proven learning sits unused for months, unavailable to other projects (or even this project's own later phases) that could benefit from it sooner",
      "The drawback is that estimating databases specifically should never be updated mid-project, regardless of when a lesson is proven",
      "There is no drawback, since organizational process assets only have value once a project is fully closed",
    ],
    c: 1,
    g: "Correct! Assets ship when the learning is proven, not when the project happens to close — waiting means a validated, useful lesson sits idle for months instead of helping other projects (or this one) right away.",
    b: "Reconsider — OPA updates aren't meant to be batched only at closure; nothing about estimating databases specifically requires waiting; and assets have value the moment they're proven, not only once a project ends.",
  },
];

function Modal({ d, close, done }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && close();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [close]);

  return createPortal(
    <div className="modal-backdrop" onClick={close}>
      <section className="focus-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-x" onClick={close} aria-label="Close modal">
          <X size={20} />
        </button>
        {step === 0 ? (
          <>
            <img className="modal-illustration" src={img(d.image)} alt="" />
            <h3>{d.title}</h3>
            <div className="modal-copy">
              <p>{d.text}</p>
            </div>
          </>
        ) : (
          <div className="modal-summary">
            <h3>Key Takeaways</h3>
            <ul>
              {d.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </div>
        )}
        {d.bullets && step === 0 ? (
          <button className="modal-action" onClick={() => setStep(1)}>
            Next <ArrowRight size={18} />
          </button>
        ) : (
          <button
            className="modal-action"
            onClick={() => {
              done();
              close();
            }}
          >
            Mark as read <Check size={18} />
          </button>
        )}
      </section>
    </div>,
    document.body
  );
}

function Quiz({ d, finish }) {
  const [p, setP] = useState(null);
  return createPortal(
    <div className="knowledge-backdrop">
      <section className="knowledge-modal">
        <p className="quiz-label">
          <Target size={18} /> MICRO KNOWLEDGE CHECK
        </p>
        <h3>{d.q}</h3>
        <div className="answers">
          {d.a.map((x, i) => (
            <button
              key={x}
              onClick={() => setP(i)}
              className={p === i ? (i === d.c ? "correct" : "wrong") : ""}
            >
              <span>{String.fromCharCode(65 + i)}</span>
              {x}
            </button>
          ))}
        </div>
        {p !== null && (
          <>
            <p className={`feedback ${p === d.c ? "good" : "bad"}`}>
              {p === d.c ? d.g : d.b}
            </p>
            <button className="finish-check" onClick={finish}>
              Finish check <ArrowRight size={18} />
            </button>
          </>
        )}
      </section>
    </div>,
    document.body
  );
}

function App() {
  const [s, setS] = useState(0);
  const [done, setDone] = useState(Array(5).fill(false));
  const [modal, setModal] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const [sound, setSound] = useState(true);
  const [pipelineRead, setPipelineRead] = useState(Array(3).fill(false));

  useLessonAudio(sound);

  const mark = (i = s) =>
    setDone((d) => d.map((x, j) => (j === i ? true : x)));
  const go = (i) => i >= 0 && i < 5 && (i <= s + 1 || done[i - 1]) && setS(i);

  useEffect(() => {
    if (s === 2 && pipelineRead.every(Boolean)) {
      // Step 2 pipeline items all read
    }
  }, [pipelineRead, s]);

  let c;

  if (s === 0)
    c = (
      <div className="hero-layout">
        <div>
          <p className="eyebrow">LESSON 6.5.3 · UPDATE ORGANIZATIONAL PROCESS ASSETS</p>
          <h1>
            Deposit as well as withdraw; keep the library <span>alive.</span>
          </h1>
          <p className="lead">
            If you go to a potluck dinner, you don't just eat. You bring a dish. The whole thing only works because people contribute as well as consume. Projects that only withdraw leave the organization exactly as smart as they found it.
          </p>
          <button
            className="primary-cta"
            disabled={done[0]}
            onClick={() => !done[0] && setModal("hook")}
          >
            {done[0] ? "Deposit obligation reviewed" : "Reveal matching deposit obligation"}{" "}
            <ArrowRight size={18} />
          </button>
        </div>
        <img className="lesson-art" src={img("potluck-table-deposit")} alt="" />
      </div>
    );

  if (s === 1)
    c = (
      <div className="hero-layout">
        <div>
          <p className="eyebrow">MONITORING AS THE ENGINE</p>
          <h2>Tested in the Field: Friction Generates Learning</h2>
          <p className="lead">
            OPA updates aren't a separate task bolted onto the end of a project. They appear as an output of nearly every monitoring process, because monitoring is where practice gets tested hard enough against reality to learn from.
          </p>
          <button
            className="primary-cta"
            disabled={done[1]}
            onClick={() => !done[1] && setModal("monitoring")}
          >
            {done[1] ? "Monitoring engine reviewed" : "Reveal monitoring deposit engine"}{" "}
            <ArrowRight size={18} />
          </button>
        </div>
        <img className="lesson-art" src={img("monitoring-deposits-feed")} alt="" />
      </div>
    );

  if (s === 2)
    c = (
      <div className="wide-page">
        <h2>The Pipeline: Curate, Generalize, Version</h2>
        <p className="lead">
          Raw lessons do not belong in the asset library — assets do. Click each of the three steps to explore how raw experience becomes reusable capability.
        </p>
        <div className="card-grid three">
          {pipelineSteps.map((step, i) => {
            const Icon = step.icon;
            const isRead = pipelineRead[i];
            return (
              <button
                className={`click-card ${isRead ? "read" : ""}`}
                onClick={() => {
                  setPipelineRead((r) => r.map((v, j) => (j === i ? true : v)));
                  setModal({
                    title: step.title,
                    text: step.text,
                    image: step.image,
                  });
                }}
                key={step.title}
              >
                <span className="card-icon">
                  <Icon size={28} />
                </span>
                <strong>{step.title}</strong>
                {isRead ? (
                  <Check className="card-arrow check" size={20} />
                ) : (
                  <ArrowRight className="card-arrow" size={20} />
                )}
              </button>
            );
          })}
        </div>
        {pipelineRead.every(Boolean) && (
          <button
            className="knowledge-cta centered"
            disabled={done[2]}
            onClick={() => setQuiz(0)}
          >
            {done[2] ? (
              <>
                <Check size={18} /> Knowledge check completed
              </>
            ) : (
              <>
                <Target size={18} /> Start knowledge check <ArrowRight size={18} />
              </>
            )}
          </button>
        )}
      </div>
    );

  if (s === 3)
    c = (
      <div className="hero-layout">
        <div>
          <p className="eyebrow">DEPOSIT TIMING</p>
          <h2>Assets Ship When Proven, Not When Closed</h2>
          <p className="lead">
            A lesson validated in month three of a project shouldn't sit in someone's private notes until project closure. The moment it is proven, deposit it immediately for later phases and sister projects.
          </p>
          <button
            className="primary-cta"
            disabled={done[3]}
            onClick={() => setModal("timing")}
          >
            {done[3] ? "Timing rule reviewed — ready for check" : "Reveal the proven learning rule"}{" "}
            <ArrowRight size={18} />
          </button>
          {done[3] && (
            <button
              className="knowledge-cta"
              style={{ marginTop: 14 }}
              onClick={() => setQuiz(1)}
            >
              <Target size={18} /> Start knowledge check <ArrowRight size={18} />
            </button>
          )}
        </div>
        <img className="lesson-art" src={img("proven-midproject-timing")} alt="" />
      </div>
    );

  if (s === 4)
    c = (
      <div className="exam-layout">
        <p className="eyebrow">MODULE 6 SYNTHESIS</p>
        <h2>The Sustained Value of Active OPA Governance</h2>
        <div className="exam-two-col">
          <div>
            <p className="lead">
              Back to that potluck table one more time — because a project that only ever eats leaves the organization exactly as hungry as it found it.
            </p>
            <p>
              When teams deposit proven templates, estimation calibrations, risk triggers, and generalized checklists, the organization grows continuously smarter.
            </p>
            <button
              className="primary-cta"
              disabled={done[4]}
              onClick={() => setModal("exam")}
            >
              {done[4] ? "Exam takeaway review complete" : "Review key exam takeaways"}{" "}
              <ArrowRight size={18} />
            </button>
          </div>
          <img className="lesson-art" src={img("exam-opa-potluck")} alt="" />
        </div>
      </div>
    );

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="course-select">
          <span className="crumb">Module 6</span>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">Lesson 6.5.3</span>
        </div>
        <div className="module-progress">
          <div>
            {Array.from({ length: 10 }, (_, i) => (
              <span
                className={`progress-dot ${
                  i < 6 ? "done" : i === 6 ? "active" : ""
                }`}
                key={i}
              >
                {i < 6 ? <Check size={10} /> : <span />}
              </span>
            ))}
          </div>
        </div>
        <div className="top-actions">
          <button className="ghost-button" onClick={() => setSound(!sound)}>
            {sound ? <Volume2 size={16} /> : <VolumeX size={16} />}
            <span>{sound ? "Sound on" : "Sound off"}</span>
          </button>
          <button className="ghost-button">
            <X size={16} />
            <span>Quit</span>
          </button>
        </div>
      </header>
      <main className="workspace">
        <section className="lesson-stage">
          <article className="lesson-card">
            <div className="section-tabs">
              <p>SECTION {s + 1} OF 5</p>
              <div>
                {tabs.map((x, i) => (
                  <button
                    className={`${done[i] ? "done" : ""} ${
                      s === i ? "active" : ""
                    }`}
                    key={x}
                    onClick={() => go(i)}
                  >
                    {done[i] && <Check size={14} />}
                    {x}
                  </button>
                ))}
              </div>
            </div>
            <div className="lesson-content">{c}</div>
            {done[s] && (
              <p className="completion">
                <Check size={16} /> Interaction complete — continue when ready.
              </p>
            )}
            <footer className="nav-footer">
              <button
                className="secondary-button"
                disabled={!s}
                onClick={() => go(s - 1)}
              >
                <ArrowLeft size={16} /> Previous
              </button>
              <button
                className={`primary-button ${done[s] ? "unlocked" : ""}`}
                disabled={!done[s]}
                onClick={() => s < 4 && go(s + 1)}
              >
                Continue <ArrowRight size={16} />
              </button>
            </footer>
          </article>
        </section>
      </main>
      {modal && (
        <Modal
          d={typeof modal === "string" ? reveals[modal] : modal}
          close={() => setModal(null)}
          done={() => {
            if (typeof modal === "string") mark();
          }}
        />
      )}
      {quiz !== null && (
        <Quiz
          d={quizzes[quiz]}
          finish={() => {
            mark(quiz === 0 ? 2 : 3);
            setQuiz(null);
          }}
        />
      )}
    </div>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
