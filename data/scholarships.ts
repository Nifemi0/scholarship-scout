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
  requirements: string[];
  documents: string[];
  sourceUrl: string;
  lastVerified: string;
};

export const scholarships: Scholarship[] = [
  {
    id: "future-builders",
    title: "Future Builders Technology Award",
    provider: "Future Builders Foundation",
    description: "Supports students building practical technology solutions for their communities.",
    studyLevels: ["undergraduate", "postgraduate"],
    fields: ["Computer Science", "Engineering", "Data Science"],
    eligibleRegions: ["Nigeria", "Ghana", "Kenya", "South Africa"],
    destinations: ["Any country"],
    award: "$5,000 tuition grant",
    deadline: "2026-10-31",
    requirements: ["Resident of an eligible African country", "Studying a technology-related field", "Enrolled at an accredited institution"],
    documents: ["Academic transcript", "Personal statement", "Proof of enrollment"],
    sourceUrl: "https://example.org/future-builders",
    lastVerified: "2026-08-20",
  },
  {
    id: "global-leaders",
    title: "Global Leaders Graduate Fellowship",
    provider: "Global Leaders Institute",
    description: "A graduate fellowship for students with a record of service and leadership.",
    studyLevels: ["postgraduate", "doctoral"],
    fields: ["Public Policy", "Business", "Computer Science", "Social Sciences"],
    eligibleRegions: ["Any country"],
    destinations: ["United Kingdom", "United States"],
    award: "Full tuition plus living stipend",
    deadline: "2026-11-15",
    requirements: ["Applying to an eligible graduate program", "Demonstrated community leadership", "Two academic or professional references"],
    documents: ["CV", "Statement of purpose", "Two references"],
    sourceUrl: "https://example.org/global-leaders",
    lastVerified: "2026-08-18",
  },
  {
    id: "women-stem",
    title: "Women in STEM Access Grant",
    provider: "Access for Tomorrow",
    description: "Helps women and girls access undergraduate education in science and technology.",
    studyLevels: ["undergraduate"],
    fields: ["Computer Science", "Engineering", "Physics", "Mathematics"],
    eligibleRegions: ["Nigeria", "Ghana", "Kenya", "Uganda"],
    destinations: ["Any country"],
    award: "$3,500 education grant",
    deadline: "2026-09-30",
    requirements: ["Identify as a woman or girl", "Resident of an eligible country", "Studying a STEM field"],
    documents: ["Academic transcript", "Personal statement", "Enrollment evidence"],
    sourceUrl: "https://example.org/women-stem",
    lastVerified: "2026-08-22",
  },
  {
    id: "climate-fellows",
    title: "Climate Solutions Fellowship",
    provider: "Earth Tomorrow Network",
    description: "Funds graduate research and projects focused on climate resilience and sustainability.",
    studyLevels: ["postgraduate", "doctoral"],
    fields: ["Environmental Science", "Engineering", "Agriculture", "Data Science"],
    eligibleRegions: ["Any country"],
    destinations: ["Any country"],
    award: "$8,000 research support",
    deadline: "2026-12-01",
    requirements: ["Proposed work must address climate resilience", "Enrolled in a graduate program", "Research supervisor endorsement"],
    documents: ["Research proposal", "Academic transcript", "Supervisor letter"],
    sourceUrl: "https://example.org/climate-fellows",
    lastVerified: "2026-08-19",
  },
];
