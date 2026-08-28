export type StudyLevel = "undergraduate" | "postgraduate" | "doctoral";

export type Scholarship = {
  id: string;
  title: string;
  provider: string;
  description: string;
  studyLevels: StudyLevel[];
  fields: string[];
  eligibleRegions: string[];
  destinations: string[];
  award: string;
  deadline: string;
  deadlineDate?: string;
  requirements: string[];
  documents: string[];
  sourceUrl: string;
  lastVerified: string;
  sourceNote: string;
};

export const scholarships: Scholarship[] = [
  {
    id: "mastercard-scholars",
    title: "Mastercard Foundation Scholars Program",
    provider: "Mastercard Foundation",
    description: "A partner-led program supporting talented young people facing barriers to education across Africa.",
    studyLevels: ["undergraduate", "postgraduate", "doctoral"],
    fields: ["Any field"],
    eligibleRegions: ["Nigeria", "Ghana", "Kenya", "South Africa", "Uganda"],
    destinations: ["Any country"],
    award: "Comprehensive support; varies by partner",
    deadline: "Varies by partner institution",
    requirements: ["Meet the selected partner institution's criteria", "Check the partner's current eligibility and deadline", "Apply directly through the selected partner institution"],
    documents: ["Academic records", "Personal statement", "Partner-specific documents"],
    sourceUrl: "https://mastercardfdn.org/en/what-we-do/our-programs/mastercard-foundation-scholars-program/where-to-apply/",
    lastVerified: "2026-08-28",
    sourceNote: "The Foundation says partner institutions manage their own criteria and deadlines.",
  },
  {
    id: "commonwealth-masters",
    title: "Commonwealth Master’s Scholarships",
    provider: "Commonwealth Scholarship Commission",
    description: "UK government-funded scholarships for candidates from eligible low and middle income Commonwealth countries.",
    studyLevels: ["postgraduate"],
    fields: ["Any field"],
    eligibleRegions: ["Nigeria", "Ghana", "Kenya", "South Africa", "Uganda"],
    destinations: ["United Kingdom"],
    award: "UK study support; see official terms",
    deadline: "20 Oct 2026 · 2027/28 cycle",
    deadlineDate: "2026-10-20",
    requirements: ["Citizen or resident of an eligible Commonwealth country", "Hold a first degree by September 2027", "Unable to afford UK study without the award"],
    documents: ["University qualifications", "Personal statement", "Supporting application evidence"],
    sourceUrl: "https://cscuk.fcdo.gov.uk/scholarships/commonwealth-masters-scholarships/",
    lastVerified: "2026-08-28",
    sourceNote: "The official page lists the 2027/28 opening and closing dates and eligibility requirements.",
  },
  {
    id: "chevening",
    title: "Chevening Scholarships",
    provider: "UK Foreign, Commonwealth & Development Office",
    description: "Fully funded one-year UK master’s scholarships for emerging leaders from Chevening-eligible countries.",
    studyLevels: ["postgraduate"],
    fields: ["Any field"],
    eligibleRegions: ["Nigeria", "Ghana", "Kenya", "South Africa", "Uganda"],
    destinations: ["United Kingdom"],
    award: "Fully funded one-year master’s",
    deadline: "6 Oct 2026 · 2027/28 cycle",
    deadlineDate: "2026-10-06",
    requirements: ["Citizen of a Chevening-eligible country", "At least 2,800 hours of eligible work experience", "Apply to three eligible UK courses"],
    documents: ["Course choices", "Leadership and influence essays", "References"],
    sourceUrl: "https://www.chevening.org/resource-hub/guidance/eligibility/",
    lastVerified: "2026-08-28",
    sourceNote: "The official timeline lists applications opening 4 Aug 2026 and closing 6 Oct 2026 at 11:00 UTC.",
  },
  {
    id: "cambridge-mastercard",
    title: "Mastercard Foundation Scholars at Cambridge",
    provider: "University of Cambridge",
    description: "A Cambridge postgraduate route for African applicants combining course admission with Mastercard Foundation funding consideration.",
    studyLevels: ["postgraduate"],
    fields: ["Computer Science", "Engineering", "Environmental Science", "Data Science", "Social Sciences"],
    eligibleRegions: ["Nigeria", "Ghana", "Kenya", "South Africa", "Uganda"],
    destinations: ["United Kingdom"],
    award: "Full support; course-dependent",
    deadline: "Usually early December or January",
    requirements: ["Hold a bachelor’s degree", "Meet the chosen Cambridge course requirements", "Be from and live in an African country"],
    documents: ["Degree records", "Course application", "Scholarship statement"],
    sourceUrl: "https://www.mastercardfoundation.fund.cam.ac.uk/apply/eligibility",
    lastVerified: "2026-08-28",
    sourceNote: "Cambridge states that funding deadlines depend on the selected course.",
  },
];
