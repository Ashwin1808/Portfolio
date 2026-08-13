// ─────────────────────────────────────────────────────────────
// CASE STUDY CONTENT — full story for every /work/[slug] page.
// Screens render as schematic wireframe placeholders until real
// (approved) screenshots are added via `image`.
// ─────────────────────────────────────────────────────────────

export interface JourneyStep {
  label: string;
  detail?: string;
}

export interface Decision {
  title: string;
  body: string;
}

export interface Interaction {
  title: string;
  body: string;
}

export interface EdgeCase {
  state: string;
  problem: string;
  copy: string;
  recovery: string;
}

export interface MicrocopyPair {
  before: string;
  after: string;
  why: string;
}

export interface CaseScreen {
  title: string;
  caption: string;
  /** Path to an approved screenshot in /public — null renders a schematic placeholder */
  image: string | null;
  kind: "phone" | "web" | "flow";
}

export interface CaseStudy {
  slug: string;
  clientDisplay: string;
  confidentialityNote: string;
  level: 2 | 3;
  overview: string;
  context: string;
  role: string[];
  challenge: string;
  journeyTitle: string;
  journey: JourneyStep[];
  decisions: Decision[];
  interactions: Interaction[];
  visual: string[];
  edgeCases: EdgeCase[];
  microcopy?: MicrocopyPair[];
  screens: CaseScreen[];
  prototypeUrl: string | null;
  learnings: string[];
  nextSlug?: string;
}

// ─────────────────────────────────────────────────────────────

export const visualIvr = {
  intro:
    "Visual IVR combines voice, visual UI, conversational interaction and self-service into one journey. The audio prompt guides, the screen shows options and status, the user acts on either channel, and the system responds with the next conversational state.",
  loop: [
    { label: "Audio prompt", detail: "The caller hears a short, specific prompt aligned with what is on screen." },
    { label: "Visual screen", detail: "Options and status arrive on the device while the call is live." },
    { label: "User action", detail: "Tap the option or say the answer — both channels map to the same state." },
    { label: "System response", detail: "Validation, progress and next-step instructions are shown and read out." },
    { label: "Next conversational state", detail: "The journey advances, or recovers with a clear retry when something fails." },
  ],
  loops: [
    {
      title: "Credit Card Activation",
      flow: ["Card details", "PIN setup", "Modify PIN", "Activation", "Confirmation", "Reward / scratch card"],
    },
    {
      title: "Credit Card Onboarding",
      flow: ["Pre-approved offer", "Card recommendation", "Offer presentation", "Consent", "Verification", "Confirmation"],
    },
    {
      title: "Insurance Renewal",
      flow: ["Renewal due", "Policy information", "Benefits", "Payment", "Confirmation"],
    },
    {
      title: "Vehicle Insurance",
      flow: ["Renewal", "Vehicle details", "Claim intimation", "Policy servicing"],
    },
    {
      title: "Loan Journeys",
      flow: ["Loan status", "EMI details", "Pre-closure", "Repayment", "Confirmation"],
    },
    {
      title: "UPI / Payment",
      flow: ["UPI ID entry", "Validation", "Transaction status", "Confirmation", "Failure states", "Retry"],
    },
    {
      title: "Document Upload",
      flow: ["Upload", "Validation", "Error state", "Retry", "Success"],
    },
  ] as { title: string; flow: string[] }[],
};

// ─────────────────────────────────────────────────────────────

export const caseStudies: Record<string, CaseStudy> = {
  "visual-ivr": {
    slug: "visual-ivr",
    clientDisplay: "Multiple enterprise clients · Ubona Technologies",
    confidentialityNote:
      "Client names and deployment details are anonymised. Journeys and patterns are drawn from real Visual IVR work without exposing confidential material.",
    level: 3,
    overview:
      "Visual IVR is the flagship pattern of my work: a call plus a screen. While the audio menu speaks, the device shows the same choices visually — so users can read, tap and complete tasks instead of memorising a voice menu. It is conversational UX with a visual layer, real application logic behind it, and self-service as the goal.",
    context:
      "Banks, insurers and financial-services companies run enormous IVR trees. Callers hate them: long audio menus, misremembered options, high effort. The business goal was call deflection and containment — letting callers complete real tasks (activate a card, renew a policy, make a payment) without an agent, while keeping a human handoff one tap away.",
    role: [
      "End-to-end UX/UI for Visual IVR journeys at Ubona — from requirements to handoff.",
      "Journey mapping, conversation design and screen design working alongside product and client teams.",
      "Interaction states: loading, validation, errors, retry, timeout, success and agent handoff.",
      "A reusable component and state library so journeys shipped consistently across clients.",
    ],
    challenge:
      "You are designing for a person who is both listening and reading, possibly mid-errand, possibly on a budget of attention. The audio and the visual must agree exactly — a mismatch destroys trust. Add real-world failure: bad networks, dropped sessions, OTP friction, users with low digital confidence. Every journey needs an explicit exit to a human, and every error needs to be recoverable without repeating the whole flow.",
    journeyTitle: "The Visual IVR interaction loop",
    journey: [
      { label: "Call lands", detail: "IVR greets the caller with a short, branded audio prompt." },
      { label: "Visual screen delivered", detail: "A menu or task screen arrives on the phone while the call is live." },
      { label: "Options shown + read out", detail: "Audio and screen present the same options in the same order." },
      { label: "User acts", detail: "Tap or speech maps to the same state — no duplication of logic." },
      { label: "System validates", detail: "Progress and validation states are visual; the audio stays brief." },
      { label: "Done — or human handoff", detail: "Completion is explicit; agent handoff is always available." },
    ],
    decisions: [
      {
        title: "Few options, one action per screen",
        body: "Voice menus can carry many options; screens should not copy them. Each visual step offers at most a handful of choices and one primary action, so reading and tapping are faster than listening.",
      },
      {
        title: "Audio and visual must say the same thing",
        body: "The prompt and the screen are generated from the same state, in the same order. If they ever diverge, the caller doubts the entire journey.",
      },
      {
        title: "Design the exit first",
        body: "Every screen keeps a visible, persistent path to a human agent. That exit is what makes self-service feel safe, which paradoxically improves completion.",
      },
      {
        title: "Thumb-first mobile layout",
        body: "These journeys run on real phones during real calls. Primary actions sit in the thumb zone, text is readable in one glance, and buttons meet touch-target standards.",
      },
      {
        title: "State machine thinking",
        body: "The journey is modelled as states: validating, success, error, retry, timeout, handoff. Designing all of them before visual polish meant engineers got exact behaviour — and edge cases did not come as surprises.",
      },
    ],
    interactions: [
      {
        title: "Loading",
        body: "Lookup and validation get explicit progress states — 'Checking your policy…' — so the caller never wonders whether the system heard them.",
      },
      {
        title: "Validation",
        body: "Inputs (card number, UPI ID, OTP, PIN) validate inline where possible, with the error shown in context and a clear next action.",
      },
      {
        title: "Error + retry",
        body: "Failures explain what happened in plain language and always offer a path: retry, change input, or handoff to an agent. Retry counters prevent infinite loops.",
      },
      {
        title: "Timeout",
        body: "If the caller goes quiet, the prompt repeats and the screen highlights the current step — never silently resetting the journey.",
      },
      {
        title: "Success",
        body: "Completion is explicit: reference number, what happens next, and how to reach the follow-up. The audio confirms, the screen persists it.",
      },
      {
        title: "Agent handoff",
        body: "The handoff passes journey context, so the caller never re-explains what the system already knows.",
      },
    ],
    visual: [
      "High-contrast, mobile-first layouts built for one-glance reading during a call.",
      "Card-based structure with a clear primary action per screen; secondary actions visually quieter.",
      "Status colours used sparingly — green only for explicit success, red for blocking errors.",
      "Consistent spacing and typographic scale so every journey feels like the same product.",
      "Touch targets at or above 44px; text contrast meeting AA; no reliance on colour alone.",
    ],
    edgeCases: [
      {
        state: "Session expired",
        problem: "The screen session dies while the call is still live.",
        copy: "Your session ended. We'll keep you on this call.",
        recovery: "Resume the journey from the last confirmed step without re-entering everything.",
      },
      {
        state: "Network drop",
        problem: "The visual layer disconnects mid-task.",
        copy: "We lost the visual session. You're still on the call.",
        recovery: "Continue in audio or retry the visual session — state is preserved server-side.",
      },
      {
        state: "Invalid input",
        problem: "A card number or UPI ID fails validation.",
        copy: "That number doesn't look right. Tap to re-enter.",
        recovery: "Inline correction with keyboard focus on the invalid field.",
      },
      {
        state: "OTP mismatch",
        problem: "The entered OTP is wrong.",
        copy: "That OTP didn't match. You have 2 more attempts.",
        recovery: "Retry with remaining-attempt visibility; resend option; handoff after limit.",
      },
      {
        state: "Payment timeout",
        problem: "The payment provider does not respond in time.",
        copy: "We didn't get a confirmation yet.",
        recovery: "Never assume failure without checking status — poll, then offer retry or agent.",
      },
      {
        state: "Agent unavailable",
        problem: "Caller requests handoff during an outage.",
        copy: "All agents are busy right now. Your place is saved.",
        recovery: "Queue with position info or schedule a callback instead of dropping the caller.",
      },
    ],
    microcopy: [
      {
        before: "The UPI ID entered does not exist or is not registered with any bank.",
        after: "We couldn't find that UPI ID. Check it and try again.",
        why: "UX copy exploration. The recovery action is explicit, and the user is not blamed for a system mismatch.",
      },
      {
        before: "Connectivity problems prevent verifying the UPI ID or completing the transaction.",
        after: "We're having connection trouble. Your payment hasn't gone through.",
        why: "UX copy exploration. Reassures the user about money state before asking them to do anything.",
      },
      {
        before: "An error occurred while processing your request. Please try again later.",
        after: "Something went wrong on our side. Nothing was charged. Tap to retry.",
        why: "UX copy exploration. States who is at fault and what state the money is in — the two things people panic about.",
      },
    ],
    screens: [
      {
        title: "Journey — Call to completion",
        caption: "The interaction loop: audio prompt, visual screen, user action, system response, next state.",
        image: null,
        kind: "flow",
      },
      {
        title: "Menu screen during a live call",
        caption: "Audio and screen present the same options. Primary action in the thumb zone; agent exit always visible.",
        image: null,
        kind: "phone",
      },
      {
        title: "Validation state",
        caption: "Explicit progress while the system checks input — the caller always knows the system heard them.",
        image: null,
        kind: "phone",
      },
      {
        title: "Error with recovery",
        caption: "Plain-language failure, state of the transaction, and a clear next action.",
        image: null,
        kind: "phone",
      },
      {
        title: "Success with reference",
        caption: "Completion is explicit: reference number, what happens next, how to follow up.",
        image: null,
        kind: "phone",
      },
    ],
    prototypeUrl: null,
    learnings: [
      "Designing for voice + screen forced me to think in states, not screens — audio, visual and logic are one system.",
      "The unhappy path is the product: error design and the exit-to-agent are what make self-service trustworthy.",
      "Engineers could implement exactly because every journey was specified as states with defined transitions.",
      "Small real-world constraints — one hand, one glance, bad network — matter more than visual polish.",
    ],
    nextSlug: "insurance-renewal",
  },

  "insurance-renewal": {
    slug: "insurance-renewal",
    clientDisplay: "Major Indian Insurer (confidential)",
    confidentialityNote:
      "Client identity, policy data and any screenshots are confidential. The journey and design decisions below are sanitised to patterns.",
    level: 3,
    overview:
      "A Visual IVR journey for policy renewal: the customer calls, sees their renewal on screen, reviews policy details and benefits, pays, and receives confirmation — all in one call, without an agent.",
    context:
      "Renewal inquiries were a large share of contact-centre volume. Customers wanted to renew in minutes without navigating voice menus or waiting in queue; the insurer wanted deflection without damaging trust in a regulated product.",
    role: [
      "UX/UI Designer for the end-to-end renewal journey.",
      "Flow and conversation design with the product and client teams.",
      "Policy-data display, payment flow and confirmation states.",
      "Component and state definitions handed to engineers for implementation.",
    ],
    challenge:
      "Renewal touches sensitive, personalised data (policy number, vehicle details, premium). Users must trust what they see before paying. Add payment failure, expired policy edge states and users with low digital confidence — every screen had to carry enough context to be acted on without an agent.",
    journeyTitle: "Renewal journey",
    journey: [
      { label: "Renewal due", detail: "Caller identified; screen shows 'Your policy renewal is due'." },
      { label: "Policy information", detail: "Policy number, vehicle, tenure and premium shown in clear cards." },
      { label: "Benefits", detail: "What renewal covers — progressive disclosure, no walls of text." },
      { label: "Payment", detail: "One primary payment path with alternatives one step away." },
      { label: "Confirmation", detail: "Reference number, e-policy availability and next steps." },
    ],
    decisions: [
      {
        title: "Show the amount early",
        body: "Premium appears with the policy summary, before any commitment. Hiding the number until late felt like a trap — showing it early builds the trust renewal needs.",
      },
      {
        title: "Benefits via progressive disclosure",
        body: "Coverage is shown as concise card summaries with expandable detail, instead of long policy text on one screen.",
      },
      {
        title: "One payment path first",
        body: "The journey proposes one default payment method; alternatives are one step away rather than a flat menu of options.",
      },
      {
        title: "Explicit confirmation before charging",
        body: "A final review screen states the amount and what happens next before any payment is initiated.",
      },
      {
        title: "Post-renewal clarity",
        body: "Confirmation explains how to download the policy and what happens if the payment was already processed elsewhere.",
      },
    ],
    interactions: [
      { title: "Policy lookup", body: "Explicit 'Checking your policy…' state so the caller knows the system is working, not silent." },
      { title: "Payment processing", body: "Spinner plus reassurance that the payment is being confirmed — never an empty screen." },
      { title: "Payment failure", body: "Plain-language failure, whether money moved, and retry or alternative-method options." },
      { title: "Already renewed", body: "A state for customers who renewed elsewhere — confirms their status instead of selling again." },
      { title: "Success", body: "Reference number, e-policy download path and confirmation via SMS after the call." },
    ],
    visual: [
      "A calm, trust-first visual tone: generous spacing, clear hierarchy, restrained colour.",
      "Policy data in labelled cards — one fact per line, nothing decorative.",
      "Primary CTA as the only full-width action; secondary actions quiet.",
      "The insurer's brand colours appear inside this case study only; the portfolio itself keeps its own system.",
    ],
    edgeCases: [
      {
        state: "Policy not found",
        problem: "The policy number does not match the caller identity.",
        copy: "We couldn't find a policy matching these details.",
        recovery: "Verify with alternate fields or offer agent handoff with context.",
      },
      {
        state: "Already renewed",
        problem: "The policy was renewed through another channel.",
        copy: "Good news — this policy is already renewed.",
        recovery: "Show the active policy period and how to download proof.",
      },
      {
        state: "Payment declined",
        problem: "The payment method is rejected.",
        copy: "Your bank declined this payment. Nothing was charged.",
        recovery: "Retry, switch payment method, or complete over the call with an agent.",
      },
      {
        state: "Premium mismatch",
        problem: "The premium differs from what the user expected.",
        copy: "Your premium includes the state's GST and no late fee.",
        recovery: "Break down the amount so the difference is explained, not hidden.",
      },
      {
        state: "Network timeout",
        problem: "The visual session drops during payment.",
        copy: "Your payment hasn't gone through. Let's check again.",
        recovery: "Poll the transaction status before showing failure; resume the journey safely.",
      },
    ],
    screens: [
      {
        title: "Renewal offer screen",
        caption: "Policy summary with the premium visible up front — trust before commitment.",
        image: null,
        kind: "phone",
      },
      {
        title: "Benefits, expanded",
        caption: "Coverage as concise cards with progressive disclosure instead of policy walls of text.",
        image: null,
        kind: "phone",
      },
      {
        title: "Review before payment",
        caption: "Final confirmation states the exact amount before any charge is initiated.",
        image: null,
        kind: "phone",
      },
      {
        title: "Renewal complete",
        caption: "Reference number, e-policy download and SMS confirmation after the call.",
        image: null,
        kind: "phone",
      },
    ],
    prototypeUrl: null,
    learnings: [
      "In insurance, the premium is the interface. Surface it early and break it down.",
      "Edge states like 'already renewed' are mini-products — they protect trust more than any happy-path polish.",
      "A payment journey must never guess: always verify transaction state before messaging failure.",
    ],
    nextSlug: "credit-card-onboarding",
  },

  "credit-card-onboarding": {
    slug: "credit-card-onboarding",
    clientDisplay: "Major Indian Private Bank (confidential)",
    confidentialityNote:
      "Client identity and internal flows are confidential. Screens are schematic placeholders — no real screenshots are included.",
    level: 3,
    overview:
      "A pre-approved credit card offered inside a call: the customer sees the offer, understands the terms, gives consent, completes verification, sets up the PIN and activates the card — with a scratch-card reward moment at the end.",
    context:
      "Banks sell pre-approved cards over outbound calls. Voice-only presentation made disclosures long, consent weak and activation drop-off high. The goal: present the offer visually, collect genuine consent, complete onboarding in the call, and get the card activated.",
    role: [
      "UX/UI Designer for the full onboarding journey.",
      "Offer presentation, consent and disclosure design.",
      "KYC, OTP and PIN entry flows with security states.",
      "Activation and post-activation reward experience.",
    ],
    challenge:
      "Compliance demands precise disclosures; users resist reading them. KYC verification can fail in many ways; PIN entry is sensitive; fraud guardrails must not punish legitimate customers. Every security failure needed a dignified recovery path — and consent had to be real, not a checkbox reflex.",
    journeyTitle: "Onboarding journey",
    journey: [
      { label: "Pre-approved offer", detail: "The call opens with the offer and what it means, in plain language." },
      { label: "Card recommendation", detail: "If relevant, a short comparison between options — limited to the offer context." },
      { label: "Offer presentation", detail: "Limit, fees and key terms in an honest summary card." },
      { label: "Consent", detail: "Explicit, audited consent for the application — never buried." },
      { label: "Verification", detail: "KYC details and OTP verification with clear state handling." },
      { label: "PIN + activation", detail: "Secure PIN setup, then activation with visible progress." },
      { label: "Confirmation + reward", detail: "Success screen with card delivery info and a scratch-card reward interaction." },
    ],
    decisions: [
      {
        title: "Consent before anything else",
        body: "The offer screen explains what the user is consenting to and what happens next. Consent is explicit, logged and irreversible-looking — a checkbox was never enough.",
      },
      {
        title: "Fees and limits up front",
        body: "Annual fee, joining fee and credit limit are stated on the first offer screen. Surprises in card terms destroy trust faster than anything else.",
      },
      {
        title: "One input per step",
        body: "Details are collected one field per screen, so focus, validation and error handling stay simple and mobile-friendly.",
      },
      {
        title: "Secure PIN entry",
        body: "PIN setup uses a masked keypad with the digits never shown on screen — secure by design, not by warning text.",
      },
      {
        title: "The scratch-card moment",
        body: "After activation, a scratch-card interaction reveals the reward. It is the one playful moment, earned by finishing — not decoration on every screen.",
      },
    ],
    interactions: [
      { title: "OTP flow", body: "Clear countdown, resend with lockout visibility, and a masked input with inline validation." },
      { title: "PIN setup", body: "Masked keypad, confirm step, and explicit mismatch handling with remaining attempts." },
      { title: "KYC failure", body: "Dignified decline paths — the journey explains why and what alternatives exist, never leaving the user stuck." },
      { title: "Activation", body: "A visible multi-step progress so the user knows activation is happening, not hanging." },
      { title: "Duplicate application", body: "Detected early with a clear message and a path to check existing application status." },
    ],
    visual: [
      "A bank-grade tone: confident, precise, restrained colour and strong typographic hierarchy.",
      "The card itself presented as a real artefact on the offer screen — the only illustration in the journey.",
      "Security flows visually quiet: no red panic, just controlled, explicit state.",
    ],
    edgeCases: [
      {
        state: "KYC verification fail",
        problem: "Identity details do not verify against records.",
        copy: "We couldn't verify these details with the records.",
        recovery: "Offer document-based verification or an in-branch / agent-assisted path.",
      },
      {
        state: "Duplicate application",
        problem: "An application already exists for this identity.",
        copy: "You already have an application in progress.",
        recovery: "Show application status instead of starting a second one.",
      },
      {
        state: "OTP limit reached",
        problem: "Too many failed OTP attempts.",
        copy: "You've used your OTP attempts. We'll switch you to an agent.",
        recovery: "Handoff with full journey context — the user never repeats themselves.",
      },
      {
        state: "Limit change mid-flow",
        problem: "The approved limit changes during the journey.",
        copy: "Your approved limit has been updated.",
        recovery: "Show the new offer explicitly and require consent again.",
      },
      {
        state: "Session timeout during PIN",
        problem: "The call drops during PIN setup.",
        copy: "Your session ended before the PIN was saved.",
        recovery: "Resume securely with the card already verified — no re-entry of card details.",
      },
    ],
    screens: [
      {
        title: "Offer presentation",
        caption: "Limit, fees and key terms in one honest summary — consent context first.",
        image: null,
        kind: "phone",
      },
      {
        title: "Secure PIN keypad",
        caption: "Masked digits, visible progress, no screen ever reveals the PIN.",
        image: null,
        kind: "phone",
      },
      {
        title: "Activation progress",
        caption: "Multi-step activation progress so completion is felt, not assumed.",
        image: null,
        kind: "phone",
      },
      {
        title: "Scratch-card reward",
        caption: "The one playful moment — earned by finishing the journey.",
        image: null,
        kind: "phone",
      },
    ],
    prototypeUrl: null,
    learnings: [
      "Compliance and UX are not enemies: clear disclosure, designed as part of the flow, converts better than fine print.",
      "Security states need their own UX — a dignified failure path protects both the customer and the brand.",
      "One playful, earned moment carries more delight than endless animation.",
    ],
    nextSlug: "upi-payment",
  },

  "upi-payment": {
    slug: "upi-payment",
    clientDisplay: "Financial Services Client (confidential)",
    confidentialityNote:
      "Client identity and transaction data are confidential. Error copy below is UX copy exploration, not shipped copy.",
    level: 3,
    overview:
      "The UPI payment journey: entering a UPI ID, validation, amount confirmation, async transaction status, success — and honest, calm failure states with recovery. Designed for the anxiety of moving money.",
    context:
      "Collections and bill payments moved to UPI because it is instant and free. But UPI is asynchronous: confirmation can take seconds or minutes, and failures have many quiet flavours. Users needed to know exactly what happened to their money at every moment.",
    role: [
      "UX/UI Designer for the payment flow across mobile and Visual IVR contexts.",
      "Validation, status, failure, retry and recovery state design.",
      "Microcopy for every money state.",
    ],
    challenge:
      "A payment must never be ambiguous. Pending looks like failure, failure looks like pending, and double payment is the worst outcome in the product. Every state — validating, pending, success, failed, timed out — needed its own copy, visual and recovery action.",
    journeyTitle: "Payment journey",
    journey: [
      { label: "UPI ID entry", detail: "Single focused field, keyboard optimised, inline validation." },
      { label: "Validation", detail: "Instant check with clear feedback before any amount entry." },
      { label: "Amount + confirm", detail: "The amount and payee in an unambiguous review card." },
      { label: "Transaction status", detail: "Pending states while the provider confirms — with a timer, not silence." },
      { label: "Success / failure", detail: "Explicit terminal states with reference numbers or clear recovery." },
      { label: "Retry flows", detail: "Failure never dead-ends: retry, change method, or continue later." },
    ],
    decisions: [
      {
        title: "Validate before money talk",
        body: "The UPI ID is checked the moment it is entered, so users never start a payment against an ID that cannot receive it.",
      },
      {
        title: "The review card",
        body: "Payee, amount and reference are confirmed together on one screen. Nothing about money is decided in two taps.",
      },
      {
        title: "Pending is a first-class state",
        body: "UPI confirmations lag. Instead of a silent spinner, the pending screen carries a timer and reassurance about what is happening.",
      },
      {
        title: "Never guess on failure",
        body: "If the provider does not respond, the flow polls before reporting failure — a timeout is not assumed to be a failure.",
      },
      {
        title: "Every failure ends in recovery",
        body: "Retry is the default action, changing method is one step away, and every screen answers the real question: where is my money?",
      },
    ],
    interactions: [
      { title: "Invalid UPI ID", body: "Inline, immediate, and actionable — with the field refocused for correction." },
      { title: "Unregistered UPI ID", body: "A distinct state from invalid: the ID exists but cannot receive payments." },
      { title: "Transaction pending", body: "Timer-based pending state with periodic status checks, never a frozen spinner." },
      { title: "Success", body: "Reference number, amount, payee and next steps — a receipt people can read aloud." },
      { title: "Failure", body: "Reason in plain language, money state stated explicitly, retry or alternate path offered." },
      { title: "Double-charge prevention", body: "If a retry happens after an uncertain outcome, the UI states clearly that the previous attempt may still complete." },
    ],
    visual: [
      "Money UI discipline: large numerals, explicit currency, one primary action per screen.",
      "Status colour used only for money state — green for success, red for blocking failure, neutral for pending.",
      "Reference numbers in monospace, copyable, so users can quote them to support.",
    ],
    edgeCases: [
      {
        state: "UPI ID doesn't exist",
        problem: "The entered ID is not registered anywhere.",
        copy: "We couldn't find that UPI ID.",
        recovery: "Correct and retry — before any amount is shown.",
      },
      {
        state: "Connectivity failure",
        problem: "The network drops mid-payment.",
        copy: "We're having connection trouble. Your payment hasn't gone through.",
        recovery: "Reconnect and check status — never assume a failure debited money.",
      },
      {
        state: "Payment failed after debit",
        problem: "The provider reports failure after the money was debited.",
        copy: "Your bank debited the amount, but we didn't get a confirmation.",
        recovery: "Auto-refund path with reference number and support contact — the worst state handled first-class.",
      },
      {
        state: "Session expired",
        problem: "The payment screen is stale.",
        copy: "This payment session expired. Nothing was charged.",
        recovery: "Restart from amount review, not from the beginning of the journey.",
      },
      {
        state: "Retry limit",
        problem: "Repeated failures on the same ID.",
        copy: "This ID keeps failing. Want to try another way?",
        recovery: "Switch to a different payment method or hand off with context.",
      },
    ],
    screens: [
      {
        title: "UPI ID entry + validation",
        caption: "One focused field, inline validation before any amount is shown.",
        image: null,
        kind: "phone",
      },
      {
        title: "Review card",
        caption: "Payee, amount and reference confirmed on one screen.",
        image: null,
        kind: "phone",
      },
      {
        title: "Pending state",
        caption: "A timer, not a silent spinner — the user always knows the payment is being confirmed.",
        image: null,
        kind: "phone",
      },
      {
        title: "Success receipt",
        caption: "Reference number in monospace, copyable, with next steps.",
        image: null,
        kind: "phone",
      },
    ],
    prototypeUrl: null,
    learnings: [
      "Money UX is state design: every screen answers 'what happened to my money?' in the first line.",
      "Pending is where users panic. Design it like a product, not a spinner.",
      "The double-charge fear is real — the interface must never create ambiguity about whether a retry is safe.",
    ],
    nextSlug: "omni-channel-dashboard",
  },

  "omni-channel-dashboard": {
    slug: "omni-channel-dashboard",
    clientDisplay: "Enterprise Contact Center Platform (confidential)",
    confidentialityNote:
      "Client identity and operational metrics are confidential. The interface patterns shown are sanitised.",
    level: 3,
    overview:
      "An operations dashboard for contact-centre supervisors: calls, chats, WhatsApp and campaigns in one view, with KPIs, channel performance, trends, filters and drill-downs — designed as a decision tool, not a poster.",
    context:
      "Operations teams ran reports in separate tools per channel. Staffing, campaign and coverage decisions were slow because the data lived apart. The dashboard's job was to make one question answerable in seconds: what is happening across our channels right now?",
    role: [
      "UX/UI Designer — information architecture and data hierarchy.",
      "Dashboard layout, filter model, drill-down patterns and the chart/component language.",
      "Worked with product owners and frontend engineers on data-driven rendering and empty/error states.",
    ],
    challenge:
      "Dense data, many filters, real-time updates and very different roles (supervisor, agent, admin). Every extra widget is noise. The design had to define what decision each view supports, then remove everything that did not serve it.",
    journeyTitle: "How supervisors work with it",
    journey: [
      { label: "Land on overview", detail: "KPIs and channel status visible without a click." },
      { label: "Spot the anomaly", detail: "Trends and alerts surface what changed, not everything." },
      { label: "Filter the context", detail: "Channel, time range and campaign filters with sensible defaults." },
      { label: "Drill down", detail: "A KPI opens its detail view — queue, agents, conversations, reasons." },
      { label: "Act", detail: "Inline actions and handoff to the relevant workflow." },
    ],
    decisions: [
      {
        title: "KPI cards, not number walls",
        body: "Four to six KPIs at the top, each a card with a delta and a sparkline — scannable in a glance, clickable for depth.",
      },
      {
        title: "Channels as first-class tabs",
        body: "Calls, chats, WhatsApp and campaigns get parallel views with identical layout rules, so learning one teaches all.",
      },
      {
        title: "Filters with defaults, not empty states",
        body: "The filter bar opens with a sensible default range, so the page is never a blank void before configuration.",
      },
      {
        title: "Drill-down as the only click",
        body: "One click from KPI to detail; the detail view answers the question the KPI raised.",
      },
      {
        title: "Real-time is marked, not animated",
        body: "Live data is labelled with a refresh timestamp — no gratuitous motion pretending to be live.",
      },
    ],
    interactions: [
      { title: "Loading", body: "Skeleton cards preserve layout so the page never jumps; refresh states are visible." },
      { title: "Empty state", body: "A named, explained empty state per view ('No calls in this range') with a reset-filters action." },
      { title: "Metric API failure", body: "The affected panel shows a retry state, not a broken page — partial failure is contained." },
      { title: "Stale data", body: "A timestamp plus a 'data is X minutes old' marker keeps stale data honest." },
      { title: "Permission-limited views", body: "Restricted metrics render as explained placeholders, not mysterious blanks." },
    ],
    visual: [
      "Dense but scannable: a strict typographic scale and a consistent card grid keep dozens of values readable.",
      "Status colour reserved for states — success, warning, failure — never decoration.",
      "Labels over icons: every KPI and channel carries a text label, because operations teams read fast and ambiguously.",
    ],
    edgeCases: [
      {
        state: "No data for period",
        problem: "A channel has no activity in the selected range.",
        copy: "No calls in this period.",
        recovery: "Empty state with a reset-filter action and a link to a wider range.",
      },
      {
        state: "API failure",
        problem: "One metric service is down.",
        copy: "Live metrics unavailable.",
        recovery: "Panel-level retry with last-known values shown, page otherwise intact.",
      },
      {
        state: "Stale data",
        problem: "The data feed lags.",
        copy: "Data is 15 minutes old.",
        recovery: "Timestamp marker plus a refresh control — no silent staleness.",
      },
      {
        state: "Permission limits",
        problem: "The user cannot see a metric.",
        copy: "This metric requires supervisor access.",
        recovery: "Explained placeholder instead of a confusing blank.",
      },
    ],
    screens: [
      {
        title: "Omni-channel overview",
        caption: "KPI cards, channel tabs and trends — the decision surface, not a poster.",
        image: null,
        kind: "web",
      },
      {
        title: "Channel detail",
        caption: "Queue, agents, conversations and reasons — one click from the KPI.",
        image: null,
        kind: "web",
      },
      {
        title: "Filter bar",
        caption: "Sensible defaults; the page is never a blank void before configuration.",
        image: null,
        kind: "web",
      },
      {
        title: "Drill-down modal",
        caption: "Detail answers the question the KPI raised, then closes without losing context.",
        image: null,
        kind: "web",
      },
    ],
    prototypeUrl: null,
    learnings: [
      "Dashboards are tools, not posters: define the decision each view supports before designing a single chart.",
      "Data density is a design problem — hierarchy and spacing decide what is readable.",
      "Partial failure states (one panel down) are more common than total outages; design for them.",
    ],
    nextSlug: "agent-assist",
  },

  "agent-assist": {
    slug: "agent-assist",
    clientDisplay: "Enterprise Contact Center Platform (confidential)",
    confidentialityNote:
      "Client identity, transcripts and customer data are confidential. Patterns shown are sanitised.",
    level: 3,
    overview:
      "An AI agent-assist workspace: live transcript, customer context panel, and AI suggestions presented as cards the agent chooses to act on. Designed around one principle — context in, human decision out.",
    context:
      "Agents handle high-volume calls while juggling screens. AI could summarise, suggest and nudge — but only if suggestions arrive at the right moment, justify themselves and never act without the agent. The design goal was human + AI collaboration with an obvious line of responsibility.",
    role: [
      "UX/UI Designer for the agent-assist experience.",
      "Suggestion card model, live transcript UI, customer context panel.",
      "Feedback and dismissal design so the system learns what agents actually use.",
    ],
    challenge:
      "Suggestions are noise unless timely and trustworthy. Transcripts are noisy and sensitive. Model latency and failure are constant. And every screen carries customer PII — masking and permission controls were part of the design, not an afterthought.",
    journeyTitle: "How a suggestion becomes an action",
    journey: [
      { label: "Live conversation", detail: "The agent sees the transcript and customer context while on the call." },
      { label: "AI suggests", detail: "A card appears with a short suggestion and the reason behind it." },
      { label: "Agent decides", detail: "Accept, dismiss or edit — nothing happens without the agent." },
      { label: "Action", detail: "Accepted suggestions complete the task or update the system state." },
      { label: "Feedback", detail: "Dismissals teach the model — the loop is visible, not silent." },
    ],
    decisions: [
      {
        title: "Suggestions are cards, never autocomplete",
        body: "The agent stays in control: suggestions surface as actionable cards with a one-line reason, not as text the AI writes directly into the conversation.",
      },
      {
        title: "Show the why",
        body: "Every suggestion carries a short rationale ('customer asked twice about the offer') — trust comes from visible reasoning.",
      },
      {
        title: "One action per card",
        body: "Accept or dismiss. Editing happens inside the card's context, not in a separate flow.",
      },
      {
        title: "Keyboard-first placement",
        body: "The suggestion panel sits next to the transcript with keyboard shortcuts, because agents move fast.",
      },
      {
        title: "PII masking by default",
        body: "Sensitive fields are masked unless the agent has permission — the interface enforces policy.",
      },
    ],
    interactions: [
      { title: "Suggestion arrival", body: "A quiet card in the side panel with a subtle pulse — attention without interruption." },
      { title: "Accepted", body: "The card collapses into a confirmed action with a timestamp; the transcript shows the effect." },
      { title: "Dismissed", body: "One-tap dismissal with an optional reason — feedback becomes training signal." },
      { title: "ASR failure", body: "Transcript stalls with an explicit state, not silence — the agent knows audio is not being captured." },
      { title: "No suggestion", body: "The panel rests in a designed empty state instead of pretending to be idle." },
      { title: "Model latency", body: "Suggestions that arrive too late for the moment are offered as 'missed opportunities', never injected mid-call." },
    ],
    visual: [
      "Dense, calm, typographically strict — agents read all day; the workspace must not shout.",
      "Transcript, context and suggestions in three stable zones; motion only to indicate change.",
      "Status colours for suggestion state: offered, accepted, dismissed, missed.",
    ],
    edgeCases: [
      {
        state: "ASR failure",
        problem: "Speech-to-text drops mid-call.",
        copy: "Live transcript paused.",
        recovery: "Explicit state plus retry; the agent's flow does not break.",
      },
      {
        state: "No suggestions",
        problem: "The model has nothing useful.",
        copy: "No suggestions right now.",
        recovery: "Designed rest state — not silence, not fake activity.",
      },
      {
        state: "Stale context",
        problem: "Customer context is outdated.",
        copy: "This profile may be out of date.",
        recovery: "Marked stale with a refresh action before the agent acts on it.",
      },
      {
        state: "Late suggestion",
        problem: "The suggestion arrives after the moment passed.",
        copy: "Suggested earlier — view now?",
        recovery: "Offered as a retrospective item instead of interrupting.",
      },
      {
        state: "Sensitive data",
        problem: "PII appears in the transcript.",
        copy: "Masked for your role.",
        recovery: "Masking enforced by permission; nothing sensitive shown by default.",
      },
    ],
    screens: [
      {
        title: "Agent workspace",
        caption: "Transcript, context and suggestions in three stable zones.",
        image: null,
        kind: "web",
      },
      {
        title: "Suggestion card",
        caption: "A suggestion with its reason — accept, dismiss or edit, never autocomplete.",
        image: null,
        kind: "web",
      },
      {
        title: "Accepted action",
        caption: "Confirmed actions with timestamps; the loop is visible.",
        image: null,
        kind: "web",
      },
      {
        title: "Rest + edge states",
        caption: "Designed states for ASR failure, stale context and no-suggestion moments.",
        image: null,
        kind: "web",
      },
    ],
    prototypeUrl: null,
    learnings: [
      "Human + AI interaction design is about the line of responsibility: suggest, never decide.",
      "Timing is a UI property — a late suggestion is noise, whatever its quality.",
      "Feedback loops must be visible for trust to grow.",
    ],
    nextSlug: "ai-ask-me",
  },

  "ai-ask-me": {
    slug: "ai-ask-me",
    clientDisplay: "Enterprise Platform (confidential)",
    confidentialityNote:
      "Client identity and product specifics are confidential. Interaction patterns shown are sanitised.",
    level: 3,
    overview:
      "An 'Ask Me' GenAI assistant for operational questions in a financial-services product: suggestion chips to start, short grounded answers, cited sources, graceful refusals and honest failure states. A chatbot, designed like a product.",
    context:
      "Users repeatedly asked the same operational questions. The answer existed in documentation and agent knowledge — the ask was to make it instantly available without risking hallucinated answers about money and policies. A bare chatbot was never the answer; a grounded assistant with visible limits was.",
    role: [
      "UX/UI Designer for the conversational experience.",
      "Suggestion-chip design, answer composition, source attribution and disclaimer patterns.",
      "Failure, refusal and escalation states.",
    ],
    challenge:
      "In a financial context, a wrong answer is a brand event. The design had to make the assistant's scope obvious, ground every answer in a source, refuse gracefully out-of-scope questions, and escalate to humans without shame. Latency, long answers and ambiguous questions are all design problems.",
    journeyTitle: "How a question becomes an answer",
    journey: [
      { label: "Ask", detail: "Suggestion chips show what the assistant can answer; the user asks in their own words." },
      { label: "Clarify", detail: "Ambiguous questions get one targeted clarification, not a menu." },
      { label: "Ground", detail: "The answer is composed from sources, with citations attached." },
      { label: "Answer", detail: "Short answer first; sources below; next steps if relevant." },
      { label: "Out of scope", detail: "The assistant says what it can't do and offers a human path." },
      { label: "Feedback", detail: "Thumbs on every answer train the system openly." },
    ],
    decisions: [
      {
        title: "Scope is visible from the start",
        body: "A scope badge and suggestion chips tell users what the assistant can answer before they ask — setting expectations is the first line of trust.",
      },
      {
        title: "Short answers, then sources",
        body: "The answer comes first in one or two sentences; sources expand beneath. Reading the answer must take under ten seconds.",
      },
      {
        title: "Citations, always",
        body: "Every substantive claim carries its source. 'Because the system said so' is never enough in finance.",
      },
      {
        title: "Disclaimers where they belong",
        body: "Where an answer touches financial decisions, a contextual note ('confirm with your advisor') appears inline — not a wall of boilerplate.",
      },
      {
        title: "Refusal is a designed state",
        body: "Out-of-scope questions are answered honestly with an escalation path. The unhelpful path is part of the UX, not a failure of it.",
      },
    ],
    interactions: [
      { title: "Typing + streaming", body: "Answers stream with a compact marker, so users read as they arrive — no waiting on a blank screen." },
      { title: "Suggestion chips", body: "Dynamic chips restate the top questions; they disappear after use to reduce noise." },
      { title: "Sources", body: "Expandable citations with titles and links, collapsed by default." },
      { title: "Feedback", body: "Thumbs up/down on every answer with an optional reason field." },
      { title: "Ambiguity", body: "One clarifying question, then the most likely interpretation — never an interrogation." },
      { title: "Long generation", body: "A progress note ('still working — this one needs more steps') instead of an infinite spinner." },
    ],
    visual: [
      "The assistant reads as part of the product, not a foreign chat widget: same type scale, same card language.",
      "Sources and disclaimers visually quiet but always present — trust by design, not by bold text.",
      "Status colour reserved for system state: streaming, clarifying, out-of-scope, error.",
    ],
    edgeCases: [
      {
        state: "Out-of-scope question",
        problem: "The question is outside what the assistant can answer.",
        copy: "I can't help with that yet — but here's who can.",
        recovery: "Escalation path with a human contact; no pretend answers.",
      },
      {
        state: "Ambiguous question",
        problem: "The intent could be two things.",
        copy: "Did you mean your policy renewal or a new quote?",
        recovery: "One targeted clarification, then proceed.",
      },
      {
        state: "Service down",
        problem: "The model backend is unavailable.",
        copy: "The assistant is temporarily unavailable.",
        recovery: "Fallback to search or human path; never a fake answer.",
      },
      {
        state: "Sensitive question",
        problem: "The question touches personal financial advice.",
        copy: "This needs a human — here's how to reach one.",
        recovery: "Contextual disclaimer plus escalation, built into the flow.",
      },
      {
        state: "Timeout",
        problem: "Generation exceeds the patience budget.",
        copy: "That took too long. Ask me again?",
        recovery: "Restart with a clearer prompt — the user keeps their place.",
      },
    ],
    screens: [
      {
        title: "Ask Me — first view",
        caption: "Scope badge and suggestion chips set expectations before the first question.",
        image: null,
        kind: "phone",
      },
      {
        title: "Grounded answer",
        caption: "Short answer first, sources beneath, disclaimer in context.",
        image: null,
        kind: "phone",
      },
      {
        title: "Graceful refusal",
        caption: "Out-of-scope is a designed state with a human escalation path.",
        image: null,
        kind: "phone",
      },
      {
        title: "Feedback loop",
        caption: "Thumbs on every answer — the system learns in the open.",
        image: null,
        kind: "phone",
      },
    ],
    prototypeUrl: null,
    learnings: [
      "GenAI UX is mostly about limits: scope, sources, refusals and latency are the product.",
      "Trust in AI interfaces comes from visible grounding, not confident prose.",
      "The unhelpful path needs as much design as the happy path.",
    ],
    nextSlug: "loan-journey",
  },

  "loan-journey": {
    slug: "loan-journey",
    clientDisplay: "Financial Services Client (confidential)",
    confidentialityNote:
      "Client identity and customer data are confidential. Patterns shown are sanitised.",
    level: 3,
    overview:
      "Loan self-service across voice and visual: checking loan status, reviewing EMI schedules, getting a pre-closure quote and completing repayment — financial workflows where clarity and security come first.",
    context:
      "Customers called constantly to check loan status, EMI dates and pre-closure options. These are simple questions with personalised answers — exactly the kind of work self-service should absorb, provided the data is presented with the seriousness money deserves.",
    role: [
      "UX/UI Designer — secure verification, financial data display and repayment flows.",
      "State and error design for OTP, quotes and payments.",
    ],
    challenge:
      "Loan data is personal and sensitive: OTP-verified access, careful amount display, pre-closure quotes that must be understood before committing. Every screen carries financial weight; errors and ambiguity are expensive.",
    journeyTitle: "Loan journey",
    journey: [
      { label: "Secure access", detail: "OTP verification before any account data is shown." },
      { label: "Loan status", detail: "Status and key figures in labelled summary cards." },
      { label: "EMI details", detail: "Schedule, next EMI date and outstanding amount." },
      { label: "Pre-closure quote", detail: "Amount, savings and the trade-off explained before commitment." },
      { label: "Repayment", detail: "Payment with full confirmation and receipt." },
    ],
    decisions: [
      {
        title: "Verify before you show",
        body: "No loan data renders before OTP verification — the security moment is explicit and it is the first screen.",
      },
      {
        title: "Amounts with context",
        body: "Every figure carries its label and period ('Next EMI — 12 Aug — ₹4,250') so numbers are never naked.",
      },
      {
        title: "Pre-closure is a decision, not a click",
        body: "The quote shows the amount, the savings and the closing date together — with a confirm screen before anything moves.",
      },
      {
        title: "Confirm before commit",
        body: "Payment review restates the amount, the loan and the due date before charging.",
      },
      {
        title: "Receipts that survive",
        body: "Completion yields a reference number and a post-call confirmation — the user can prove what happened.",
      },
    ],
    interactions: [
      { title: "OTP flow", body: "Countdown, resend with limits, masked input and lockout visibility." },
      { title: "Quote calculation", body: "Explicit 'calculating your quote…' state — quotes are computed, not instant." },
      { title: "Payment states", body: "Pending, success and failure handling with the money-state-first copy from the UPI work." },
      { title: "Session lockout", body: "Repeated OTP failures end the session with a human path, never an angry wall." },
    ],
    visual: [
      "Conservative by design: restrained colour, labelled figures, generous spacing around numbers.",
      "Financial data in consistent card grammar — the same layout for status, EMI and quote.",
      "One primary action per screen; everything secondary stays visually quiet.",
    ],
    edgeCases: [
      {
        state: "Loan not found",
        problem: "The identity has no matching loan.",
        copy: "We couldn't find a loan matching these details.",
        recovery: "Verify alternative details or hand off with context.",
      },
      {
        state: "OTP failure limit",
        problem: "Verification attempts exhausted.",
        copy: "Verification locked for now.",
        recovery: "Handoff to an agent — the user never re-enters details.",
      },
      {
        state: "Pre-closure ineligible",
        problem: "The loan cannot be pre-closed at this stage.",
        copy: "This loan isn't eligible for pre-closure yet.",
        recovery: "Explain the condition and show the next eligible date.",
      },
      {
        state: "Partial payment",
        problem: "The user wants to pay less than the full amount.",
        copy: "You can pay any amount above ₹X.",
        recovery: "Accept partial payment with updated EMI schedule shown after.",
      },
      {
        state: "Session expiry",
        problem: "The flow times out between steps.",
        copy: "Your session ended. Your loan data was not changed.",
        recovery: "Resume with one verification, never from scratch.",
      },
    ],
    screens: [
      {
        title: "Secure access",
        caption: "OTP verification is the first screen — no data before trust.",
        image: null,
        kind: "phone",
      },
      {
        title: "Loan summary",
        caption: "Status and figures in labelled cards — numbers never appear naked.",
        image: null,
        kind: "phone",
      },
      {
        title: "Pre-closure quote",
        caption: "Amount, savings and closing date together — a decision, not a click.",
        image: null,
        kind: "phone",
      },
      {
        title: "Repayment confirmation",
        caption: "Reference number and post-call receipt that survive.",
        image: null,
        kind: "phone",
      },
    ],
    prototypeUrl: null,
    learnings: [
      "Financial UX is conservative by design: every number needs context, every action needs confirmation.",
      "Security and friction are different things — OTP verification can feel like care, not hassle.",
      "Receipts are UX: users need to prove what happened after the call ends.",
    ],
    nextSlug: "visual-ivr",
  },
};

export const getCaseStudy = (slug: string) => caseStudies[slug];

// ─────────────────────────────────────────────────────────────
// LEVEL 2 — compact case studies (Problem / Solution / Decisions)
// ─────────────────────────────────────────────────────────────

export const miniCaseStudies: Record<string, Omit<CaseStudy, "interactions" | "learnings"> & { interactions?: Interaction[]; learnings?: string[] }> = {
  "campaign-manager": {
    slug: "campaign-manager",
    clientDisplay: "Enterprise Contact Center Platform (confidential)",
    confidentialityNote:
      "Client identity and campaign data are confidential. Patterns shown are sanitised.",
    level: 2,
    overview:
      "A campaign management interface: create, schedule and monitor outbound campaigns with customer segments, status and performance metrics in one workflow.",
    context:
      "Campaign setup lived across spreadsheets and tools; mid-flight status and performance were unclear. The workflow needed one surface: build a campaign, watch it run, act on its results.",
    role: [
      "UX/UI Designer — campaign creation flow, status model, metrics views and dashboard patterns.",
    ],
    challenge:
      "Campaigns have many moving parts — segments, channels, schedules, budgets, outcomes. The design had to keep creation simple while making live status and performance scannable.",
    journeyTitle: "Campaign lifecycle",
    journey: [
      { label: "Create campaign", detail: "Name, channel, segment and schedule in a guided flow." },
      { label: "Review + launch", detail: "A summary screen before anything goes live." },
      { label: "Monitor status", detail: "Running, paused, completed — with live metrics." },
      { label: "Measure performance", detail: "Outcome metrics per segment and channel." },
      { label: "Act on results", detail: "Drill into a result and adjust or end the campaign." },
    ],
    decisions: [
      {
        title: "Creation is a guided flow",
        body: "Segments, channels and schedules are chosen in sequence with defaults — not a blank form with twenty fields.",
      },
      {
        title: "Status is a first-class citizen",
        body: "Every campaign shows its status and progress visibly, so mid-flight ambiguity disappears.",
      },
      {
        title: "Metrics next to the campaign",
        body: "Performance lives on the campaign card, not a buried report — decisions happen where the data is.",
      },
    ],
    visual: [
      "Dashboard grammar shared with the omni-channel work: KPI cards, filters with defaults, drill-downs.",
      "Status colours reserved for campaign state — running, paused, completed, failed.",
    ],
    edgeCases: [
      {
        state: "Segment too small",
        problem: "A segment contains too few customers to run a meaningful campaign.",
        copy: "This segment has very few customers.",
        recovery: "Warn before launch and suggest widening the segment.",
      },
      {
        state: "Schedule conflict",
        problem: "Two campaigns would overlap on the same channel.",
        copy: "Another campaign is already scheduled for this channel.",
        recovery: "Show the overlap and let the user reschedule or proceed knowingly.",
      },
      {
        state: "Paused mid-flight",
        problem: "An operator pauses a running campaign.",
        copy: "Campaign paused. Live data is preserved.",
        recovery: "Resume or end with full state preserved — no lost work.",
      },
    ],
    screens: [
      {
        title: "Campaign creation",
        caption: "Guided flow — segment, channel, schedule — with defaults and a review step.",
        image: null,
        kind: "web",
      },
      {
        title: "Campaign status board",
        caption: "Status and progress on every card; metrics one click away.",
        image: null,
        kind: "web",
      },
    ],
    prototypeUrl: null,
  },

  "document-upload": {
    slug: "document-upload",
    clientDisplay: "Financial Services Client — Muthoot Finance (confidential)",
    confidentialityNote:
      "Client identity and customer documents are confidential. Patterns shown are sanitised.",
    level: 2,
    overview:
      "Document collection for a loan workflow: upload, validation, error, retry and success — designed so failures explain themselves and never dead-end.",
    context:
      "Customers had to submit documents over the phone or portal. Failures were unclear ('invalid document'), resubmissions were endless, and support time was burned on the same few questions.",
    role: ["UX/UI Designer — upload states, validation messaging, retry design and microcopy."],
    challenge:
      "Documents fail in many quiet ways — wrong type, blurry photo, oversize file, expired ID. Each failure needs a specific, actionable message and an easy retry.",
    journeyTitle: "Document flow",
    journey: [
      { label: "Upload", detail: "Clear guidance on which document and how to capture it." },
      { label: "Validation", detail: "Explicit 'checking your document…' state." },
      { label: "Error state", detail: "A specific, human reason for failure." },
      { label: "Retry", detail: "Retake or re-upload without restarting the flow." },
      { label: "Success", detail: "Confirmation with what happens next." },
    ],
    decisions: [
      {
        title: "Tell users what 'good' looks like",
        body: "Each upload screen shows the expected document and capture tips before the first attempt — most failures are prevented, not handled.",
      },
      {
        title: "Specific failure reasons",
        body: "'Too blurry to read' beats 'invalid document' — every validation failure explains itself and what to do.",
      },
      {
        title: "Retry without friction",
        body: "Retake reopens the camera with the previous capture context; no form data is lost.",
      },
    ],
    visual: [
      "A calm capture experience: camera view, guidance card and status in one screen.",
      "Validation states in the same status language as the rest of the system.",
    ],
    edgeCases: [
      {
        state: "Wrong document type",
        problem: "The uploaded file is not the requested document.",
        copy: "This looks like the wrong document. We need your Aadhaar card.",
        recovery: "Show the expected type and let the user retry.",
      },
      {
        state: "Unreadable image",
        problem: "The photo is too blurry or cut off.",
        copy: "We can't read this clearly. Retake with good light, filling the frame.",
        recovery: "Retake with tips — the camera reopens.",
      },
      {
        state: "File too large",
        problem: "The file exceeds the size limit.",
        copy: "This file is too large. Choose a smaller photo.",
        recovery: "Suggest compression or resizing before retry.",
      },
      {
        state: "Expired document",
        problem: "The ID is expired.",
        copy: "This document has expired.",
        recovery: "Accept alternate documents from the approved list.",
      },
    ],
    screens: [
      {
        title: "Capture with guidance",
        caption: "Expected document, capture tips and status in one screen.",
        image: null,
        kind: "phone",
      },
      {
        title: "Validation & retry",
        caption: "A specific reason, a clear fix and a retry that loses nothing.",
        image: null,
        kind: "phone",
      },
      {
        title: "Upload complete",
        caption: "Confirmation and what happens next — no ambiguity.",
        image: null,
        kind: "phone",
      },
    ],
    prototypeUrl: null,
  },

  "vehicle-insurance": {
    slug: "vehicle-insurance",
    clientDisplay: "Insurance Client (confidential)",
    confidentialityNote: "Client identity and policy data are confidential.",
    level: 2,
    overview:
      "Vehicle insurance self-service: renewal, vehicle details, claim intimation and policy servicing — insurance journeys designed for moments of urgency.",
    context:
      "Vehicle insurance interactions happen in stressed moments — a renewal deadline, an accident, a lost policy. Users needed fast, unambiguous paths with minimum reading and maximum clarity.",
    role: ["UX/UI Designer — journey design, service screens and state handling."],
    challenge:
      "Urgency changes UX: decisions must be obvious, language plain, and the path to a human never more than one tap away.",
    journeyTitle: "Service journeys",
    journey: [
      { label: "Renewal", detail: "Due date, premium and one clear path to renew." },
      { label: "Vehicle details", detail: "Policy and vehicle facts in labelled cards." },
      { label: "Claim intimation", detail: "The what, when and how of the incident — clearly." },
      { label: "Policy servicing", detail: "Download, address change and certificates." },
    ],
    decisions: [
      {
        title: "Urgent paths first",
        body: "Renewal and claim intimation lead the interface — the two reasons people actually call.",
      },
      {
        title: "One clear action per screen",
        body: "In a stressful moment, a single obvious next step beats a rich menu.",
      },
      {
        title: "Human exit stays visible",
        body: "Claim-related screens always offer agent handoff — urgency is not the time for maze navigation.",
      },
    ],
    visual: [
      "The same trust-first insurance tone as the renewal case study: clear cards, restrained colour, explicit amounts.",
    ],
    edgeCases: [
      {
        state: "Claim outside window",
        problem: "Intimation is filed after the allowed period.",
        copy: "This intimation is outside the reporting window.",
        recovery: "Explain next steps and connect to an agent with context.",
      },
      {
        state: "Renewal lapsed",
        problem: "The policy already expired.",
        copy: "Your policy has lapsed. Renewal is still available.",
        recovery: "Offer renewal with any lapse implications shown clearly.",
      },
    ],
    screens: [
      {
        title: "Service home",
        caption: "Urgent paths first — renewal and claim intimation lead.",
        image: null,
        kind: "phone",
      },
      {
        title: "Claim intimation",
        caption: "The what, when and how, captured clearly — with a human exit always visible.",
        image: null,
        kind: "phone",
      },
    ],
    prototypeUrl: null,
  },

  "halo-cloud": {
    slug: "halo-cloud",
    clientDisplay: "Ubona Technologies — internal product (confidential)",
    confidentialityNote:
      "Internal product details and interfaces are confidential. Patterns shown are sanitised.",
    level: 2,
    overview:
      "HALO Cloud, the CCaaS platform behind Ubona's conversational and contact-center products: enterprise workflow interfaces, internal tools and the product experience itself.",
    context:
      "A capable platform with engineering-first surfaces needed a coherent product experience — consistent patterns, clear workflows and usable internal tools.",
    role: ["UX/UI Designer — product UI, interface patterns and internal tools."],
    challenge:
      "Platforms accumulate inconsistencies: every team builds their own table, form and status pattern. The job was introducing a shared system without breaking velocity.",
    journeyTitle: "The platform problem",
    journey: [
      { label: "Surface inventory", detail: "Find every table, form and status pattern in use." },
      { label: "Define shared patterns", detail: "One component language with defined states." },
      { label: "Apply progressively", detail: "Retrofit high-traffic flows first, then expand." },
      { label: "Maintain the system", detail: "New features inherit the patterns instead of inventing new ones." },
    ],
    decisions: [
      {
        title: "Patterns before features",
        body: "Consistency came from a shared component and state library, applied incrementally.",
      },
      {
        title: "Internal tools are user-facing too",
        body: "Operators use these tools all day — the same UX discipline applied to them.",
      },
      {
        title: "State coverage in the library",
        body: "Loading, empty, error and permission states shipped with every component, not added later.",
      },
    ],
    visual: [
      "The enterprise dashboard grammar: dense, scannable, typographically strict, status colours only for states.",
    ],
    edgeCases: [
      {
        state: "Permission-denied surface",
        problem: "A user opens a tool without permission.",
        copy: "This tool requires admin access.",
        recovery: "Explained placeholder with a request-access path.",
      },
      {
        state: "Legacy data shape",
        problem: "Old records lack fields new interfaces expect.",
        copy: "This record has incomplete data.",
        recovery: "Graceful degraded rendering with a note — never a crash.",
      },
    ],
    screens: [
      {
        title: "Platform surface",
        caption: "Consistent patterns across enterprise workflows and internal tools.",
        image: null,
        kind: "web",
      },
    ],
    prototypeUrl: null,
  },
};
