export type StudyLevel = "undergraduate" | "postgraduate" | "doctoral";
export type FundingType = "full" | "tuition" | "partial" | "varies";

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
  fundingType: FundingType;
  deadline: string;
  deadlineDate?: string;
  requirements: string[];
  documents: string[];
  sourceUrl: string;
  lastVerified: string;
  sourceNote: string;
};

const coreScholarships: Scholarship[] = [
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
    fundingType: "varies",
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
    fundingType: "full",
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
    fundingType: "full",
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
    fundingType: "full",
    deadline: "Usually early December or January",
    requirements: ["Hold a bachelor’s degree", "Meet the chosen Cambridge course requirements", "Be from and live in an African country"],
    documents: ["Degree records", "Course application", "Scholarship statement"],
    sourceUrl: "https://www.mastercardfoundation.fund.cam.ac.uk/apply/eligibility",
    lastVerified: "2026-08-28",
    sourceNote: "Cambridge states that funding deadlines depend on the selected course.",
  },
];

const makeVerifiedProgram = (config: {
  id: string;
  title: string;
  provider: string;
  studyLevels: StudyLevel[];
  fields: string[];
  eligibleRegions: string[];
  destinations: string[];
  award: string;
  fundingType?: FundingType;
  sourceUrl: string;
  sourceNote: string;
}): Scholarship => ({
  ...config,
  fundingType: config.fundingType ?? "varies",
  description: `${config.title} is an established scholarship or funding programme operated by ${config.provider}.`,
  deadline: "Varies by cycle or programme",
  requirements: ["Review the official programme eligibility rules", "Check the current cycle and application route", "Apply through the official provider or named institution"],
  documents: ["Academic records", "Personal statement or study plan", "Provider-specific supporting documents"],
  lastVerified: "2026-08-28",
});

const additionalVerifiedPrograms: Scholarship[] = [
  makeVerifiedProgram({ id: "fulbright-foreign-student", title: "Fulbright Foreign Student Program", provider: "U.S. Department of State", studyLevels: ["postgraduate", "doctoral"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["United States"], award: "Funding varies by country programme", sourceUrl: "https://foreign.fulbrightonline.org/", sourceNote: "Country-specific Fulbright commissions and offices publish eligibility and deadlines." }),
  makeVerifiedProgram({ id: "erasmus-mundus", title: "Erasmus Mundus Joint Masters", provider: "European Commission", studyLevels: ["postgraduate"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["Any country"], award: "Scholarships may cover participation, travel, visa, and living costs", fundingType: "full", sourceUrl: "https://erasmus-plus.ec.europa.eu/opportunities/individuals/students/erasmus-mundus-joint-masters", sourceNote: "Applicants apply to the consortium running each selected master’s programme." }),
  makeVerifiedProgram({ id: "daad-epos", title: "DAAD Development-Related Postgraduate Courses (EPOS)", provider: "DAAD", studyLevels: ["postgraduate", "doctoral"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["Germany"], award: "DAAD scholarship support for selected development-related courses", sourceUrl: "https://www.daad.de/en/information-services-for-higher-education-institutions/further-information-on-daad-programmes/epos/", sourceNote: "DAAD publishes the eligible courses and current application details in its scholarship database." }),
  makeVerifiedProgram({ id: "global-korea-scholarship", title: "Global Korea Scholarship", provider: "Government of the Republic of Korea", studyLevels: ["undergraduate", "postgraduate", "doctoral"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["South Korea"], award: "Government support including tuition and living-related benefits", fundingType: "full", sourceUrl: "https://www.studyinkorea.go.kr/ko/plan/scholarship.do?tab=gks-tab1", sourceNote: "Study in Korea publishes degree tracks, notices, quotas, and application routes." }),
  makeVerifiedProgram({ id: "mext-scholarship", title: "Japanese Government (MEXT) Scholarships", provider: "Ministry of Education, Culture, Sports, Science and Technology", studyLevels: ["undergraduate", "postgraduate", "doctoral"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["Japan"], award: "Government scholarship support; terms vary by category", fundingType: "full", sourceUrl: "https://www.studyinjapan.go.jp/en/planning/scholarships/mext-scholarships/", sourceNote: "Applications are handled through embassies or Japanese universities depending on the category." }),
  makeVerifiedProgram({ id: "turkiye-burslari", title: "Türkiye Scholarships", provider: "Government of Türkiye", studyLevels: ["undergraduate", "postgraduate", "doctoral"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["Türkiye"], award: "Government scholarship package; terms vary by level", sourceUrl: "https://www.turkiyeburslari.gov.tr/", sourceNote: "The official portal publishes programme types, eligibility, and annual applications." }),
  makeVerifiedProgram({ id: "stipendium-hungaricum", title: "Stipendium Hungaricum", provider: "Government of Hungary", studyLevels: ["undergraduate", "postgraduate", "doctoral"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["Hungary"], award: "Tuition support and additional scholarship benefits", sourceUrl: "https://stipendiumhungaricum.hu/", sourceNote: "Eligible sending partners and programme-specific requirements are listed by the official programme." }),
  makeVerifiedProgram({ id: "australia-awards", title: "Australia Awards Scholarships", provider: "Australian Government Department of Foreign Affairs and Trade", studyLevels: ["postgraduate"], fields: ["Any field"], eligibleRegions: ["Nigeria", "Ghana", "Kenya", "South Africa", "Uganda"], destinations: ["Australia"], award: "Long-term development-focused study support", sourceUrl: "https://www.dfat.gov.au/people-to-people/australia-awards", sourceNote: "Eligibility and participating countries are defined by country-specific profiles." }),
  makeVerifiedProgram({ id: "manaaki-new-zealand", title: "Manaaki New Zealand Scholarships", provider: "New Zealand Ministry of Foreign Affairs and Trade", studyLevels: ["undergraduate", "postgraduate", "doctoral"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["New Zealand"], award: "New Zealand government scholarship support", sourceUrl: "https://www.nzscholarships.govt.nz/", sourceNote: "The official portal lists eligible countries, study levels, subjects, and current rounds." }),
  makeVerifiedProgram({ id: "si-global-professionals", title: "SI Scholarship for Global Professionals", provider: "Swedish Institute", studyLevels: ["postgraduate"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["Sweden"], award: "Scholarship support for eligible master’s applicants", sourceUrl: "https://si.se/en/apply/scholarships/si-scholarship-for-global-professionals/", sourceNote: "The Swedish Institute publishes eligible countries, fields, and annual application guidance." }),
  makeVerifiedProgram({ id: "ireland-fellows", title: "Ireland Fellows Programme", provider: "Government of Ireland", studyLevels: ["postgraduate"], fields: ["Any field"], eligibleRegions: ["Nigeria", "Ghana", "Kenya", "South Africa", "Uganda"], destinations: ["Ireland"], award: "Fully funded postgraduate study for eligible country cohorts", sourceUrl: "https://www.irishaidfellowships.ie/", sourceNote: "Country-specific programme pages define eligible applicants and application steps." }),
  makeVerifiedProgram({ id: "vlir-uos", title: "VLIR-UOS Training and Masters Scholarships", provider: "VLIR-UOS", studyLevels: ["postgraduate"], fields: ["Any field"], eligibleRegions: ["Nigeria", "Ghana", "Kenya", "South Africa", "Uganda"], destinations: ["Belgium"], award: "Support for selected international training and master’s programmes", sourceUrl: "https://www.vliruos.be/en/scholarships/6", sourceNote: "VLIR-UOS publishes eligible countries and the list of eligible programmes." }),
  makeVerifiedProgram({ id: "eiffel-excellence", title: "France Excellence Eiffel Scholarship", provider: "French Ministry for Europe and Foreign Affairs", studyLevels: ["postgraduate", "doctoral"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["France"], award: "French government scholarship for selected master’s and doctoral study", sourceUrl: "https://www.campusfrance.org/en/eiffel-scholarship-program-of-excellence", sourceNote: "French higher education institutions submit applications for eligible candidates." }),
  makeVerifiedProgram({ id: "swiss-government-excellence", title: "Swiss Government Excellence Scholarships", provider: "Swiss Confederation", studyLevels: ["postgraduate", "doctoral"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["Switzerland"], award: "Government scholarship support for research and postgraduate study", sourceUrl: "https://www.swissuniversities.ch/en/topics/international-relations/swiss-government-excellence-scholarships", sourceNote: "Country-specific calls and eligible scholarship types are published by the official Swiss programme." }),
  makeVerifiedProgram({ id: "gates-cambridge", title: "Gates Cambridge Scholarship", provider: "Gates Cambridge Trust", studyLevels: ["postgraduate", "doctoral"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["United Kingdom"], award: "Full-cost scholarship for eligible Cambridge postgraduate study", fundingType: "full", sourceUrl: "https://www.gatescambridge.org/apply/", sourceNote: "Applicants apply through the University of Cambridge graduate application process." }),
  makeVerifiedProgram({ id: "rhodes-scholarship", title: "Rhodes Scholarship", provider: "Rhodes Trust", studyLevels: ["postgraduate"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["United Kingdom"], award: "Fully funded postgraduate study at the University of Oxford", sourceUrl: "https://www.rhodeshouse.ox.ac.uk/scholarships/", sourceNote: "Eligibility and constituency routes vary by applicant citizenship and ordinary residence." }),
  makeVerifiedProgram({ id: "clarendon-fund", title: "Clarendon Fund Scholarships", provider: "University of Oxford", studyLevels: ["postgraduate", "doctoral"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["United Kingdom"], award: "Graduate funding for eligible Oxford applicants", sourceUrl: "https://www.ox.ac.uk/clarendon", sourceNote: "Most applicants are automatically considered when applying for an eligible Oxford course by the relevant deadline." }),
  makeVerifiedProgram({ id: "knight-hennessy", title: "Knight-Hennessy Scholars", provider: "Stanford University", studyLevels: ["postgraduate", "doctoral"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["United States"], award: "Funding and leadership programming for eligible Stanford graduate study", sourceUrl: "https://knight-hennessy.stanford.edu/", sourceNote: "Applicants must apply separately to an eligible Stanford graduate degree programme." }),
  makeVerifiedProgram({ id: "schwarzman-scholars", title: "Schwarzman Scholars", provider: "Schwarzman Scholars", studyLevels: ["postgraduate"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["China"], award: "Fully funded one-year master’s programme at Tsinghua University", sourceUrl: "https://www.schwarzmanscholars.org/", sourceNote: "The official programme site publishes eligibility and annual application guidance." }),
  makeVerifiedProgram({ id: "yenching-academy", title: "Yenching Academy Scholarship", provider: "Peking University", studyLevels: ["postgraduate"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["China"], award: "Scholarship support for the Yenching Academy master’s programme", sourceUrl: "https://yenchingacademy.pku.edu.cn/", sourceNote: "Applicants follow the current admissions and scholarship instructions from Yenching Academy." }),
  makeVerifiedProgram({ id: "weidenfeld-hoffmann", title: "Weidenfeld-Hoffmann Scholarships and Leadership Programme", provider: "University of Oxford", studyLevels: ["postgraduate"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["United Kingdom"], award: "Funding and leadership programme for eligible Oxford graduate courses", sourceUrl: "https://www.ox.ac.uk/admissions/graduate/fees-and-funding/graduate-scholarships/weidenfeld-hoffmann-scholarships-and-leadership-programme", sourceNote: "Course eligibility and application deadlines are set through the University of Oxford graduate process." }),
  makeVerifiedProgram({ id: "lester-b-pearson", title: "Lester B. Pearson International Scholarship", provider: "University of Toronto", studyLevels: ["undergraduate"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["Canada"], award: "University of Toronto undergraduate scholarship support", sourceUrl: "https://future.utoronto.ca/pearson/about/", sourceNote: "Students must be nominated by their school and follow the university’s current process." }),
  makeVerifiedProgram({ id: "ubc-international-scholars", title: "UBC International Scholars", provider: "University of British Columbia", studyLevels: ["undergraduate"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["Canada"], award: "Need and merit-based undergraduate awards; amount varies", sourceUrl: "https://you.ubc.ca/financial-planning/scholarships-awards-international-students/", sourceNote: "UBC publishes award categories, nomination requirements, and current deadlines." }),
  makeVerifiedProgram({ id: "york-presidents", title: "York University President’s International Scholarship of Excellence", provider: "York University", studyLevels: ["undergraduate"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["Canada"], award: "International undergraduate entrance scholarship", sourceUrl: "https://futurestudents.yorku.ca/financial-support/international-scholarships", sourceNote: "Award values and annual deadlines are published by York University." }),
  makeVerifiedProgram({ id: "macquarie-vice-chancellor", title: "Macquarie University Vice-Chancellor’s International Scholarship", provider: "Macquarie University", studyLevels: ["undergraduate", "postgraduate"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["Australia"], award: "Tuition fee scholarship for eligible international students", sourceUrl: "https://www.mq.edu.au/study/admissions-and-entry/scholarships/international", sourceNote: "Macquarie lists current international scholarship conditions and eligible courses." }),
  makeVerifiedProgram({ id: "monash-leadership", title: "Monash International Leadership Scholarship", provider: "Monash University", studyLevels: ["undergraduate", "postgraduate"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["Australia"], award: "Tuition scholarship for eligible international students", sourceUrl: "https://www.monash.edu/study/fees-scholarships/scholarships/find-a-scholarship/international-leadership-scholarship", sourceNote: "Monash publishes course eligibility, selection criteria, and application instructions." }),
];

export const scholarships: Scholarship[] = [...coreScholarships, ...additionalVerifiedPrograms];
