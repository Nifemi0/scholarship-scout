export type StudyLevel = "undergraduate" | "postgraduate" | "doctoral";
export type FundingType = "full" | "tuition" | "partial" | "varies";

export type Scholarship = {
  id: string;
  title: string;
  provider: string;
  description: string;
  studyLevels: StudyLevel[];
  studyLevelsByRegion?: Record<string, StudyLevel[]>;
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
  sourceAuthority: string;
  verificationStatus: string;
  lastVerified: string;
  sourceNote: string;
  evidenceScope: "programme" | "directory" | "course-or-partner";
  countryEvidence: "complete" | "partial" | "worldwide" | "partner-dependent" | "unknown";
  fieldEvidence: "broad" | "specific" | "partner-dependent" | "unknown";
  cycleStatus: "open" | "upcoming" | "closed" | "unknown";
  applicationReady: boolean;
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
    sourceAuthority: "Official Mastercard Foundation partner page",
    verificationStatus: "Partner-directory scope checked; partner-specific eligibility remains unresolved",
    lastVerified: "2026-08-28",
    sourceNote: "The Foundation says partner institutions manage their own criteria and deadlines.",
    evidenceScope: "directory", countryEvidence: "partner-dependent", fieldEvidence: "partner-dependent", cycleStatus: "unknown", applicationReady: false,
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
    requirements: ["Eligible citizenship, refugee or protected-person status and permanent residence in an eligible Commonwealth country", "Hold an eligible first degree by September 2027 and meet the academic threshold", "Apply through an eligible nominating route and show that UK study is unaffordable without the award"],
    documents: ["CSC application and nominating-route application", "Citizenship or refugee-status evidence and complete transcripts", "At least two signed references and required development statements"],
    sourceUrl: "https://cscuk.fcdo.gov.uk/scholarships/commonwealth-masters-scholarships/",
    sourceAuthority: "Official Commonwealth Scholarship Commission page",
    verificationStatus: "Core 2027/28 route, dates and listed requirements checked; country and nominator details remain route-specific",
    lastVerified: "2026-08-28",
    sourceNote: "The official page lists the 2027/28 opening and closing dates and eligibility requirements.",
    evidenceScope: "programme", countryEvidence: "partial", fieldEvidence: "broad", cycleStatus: "upcoming", applicationReady: true,
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
    requirements: ["Meet Chevening nationality, residence and return-home rules", "Hold an eligible undergraduate degree completed at least two years before the deadline and 2,800 hours of post-graduation work", "Apply to three eligible UK courses"],
    documents: ["Initial application, course choices and required essays", "Interview-stage photo ID and undergraduate degree certificate", "Interview-stage references uploaded at least seven working days before interview"],
    sourceUrl: "https://www.chevening.org/resource-hub/guidance/eligibility/",
    sourceAuthority: "Official Chevening / UK FCDO page",
    verificationStatus: "Core 2027/28 route, dates and staged documents checked; full country/course rules still apply",
    lastVerified: "2026-08-28",
    sourceNote: "The official timeline lists applications opening 4 Aug 2026 and closing 6 Oct 2026 at 11:00 UTC.",
    evidenceScope: "programme", countryEvidence: "partial", fieldEvidence: "broad", cycleStatus: "open", applicationReady: true,
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
    deadline: "Select a course for its December/January funding deadline",
    requirements: ["Hold a bachelor’s degree", "Meet the chosen Cambridge course requirements", "Be from and live in an African country"],
    documents: ["Select an eligible full-time Cambridge master’s course", "Complete the course and funding application by that course’s deadline", "Confirm the course-specific documents and scholarship questions"],
    sourceUrl: "https://www.mastercardfoundation.fund.cam.ac.uk/apply/eligibility",
    sourceAuthority: "Official University of Cambridge programme page",
    verificationStatus: "Cambridge programme scope checked; selected course, deadline and documents remain unresolved",
    lastVerified: "2026-08-28",
    sourceNote: "Cambridge states that funding deadlines depend on the selected course.",
    evidenceScope: "course-or-partner", countryEvidence: "partial", fieldEvidence: "partner-dependent", cycleStatus: "upcoming", applicationReady: false,
  },
];

const makeVerifiedProgram = (config: {
  id: string;
  title: string;
  provider: string;
  studyLevels: StudyLevel[];
  studyLevelsByRegion?: Record<string, StudyLevel[]>;
  fields: string[];
  eligibleRegions: string[];
  destinations: string[];
  award: string;
  fundingType?: FundingType;
  sourceUrl: string;
  sourceAuthority?: string;
  verificationStatus?: string;
  lastVerified?: string;
  sourceNote: string;
  deadline?: string;
  deadlineDate?: string;
  cycleStatus?: Scholarship["cycleStatus"];
  evidenceScope?: Scholarship["evidenceScope"];
  countryEvidence?: Scholarship["countryEvidence"];
  fieldEvidence?: Scholarship["fieldEvidence"];
  applicationReady?: boolean;
  requirements?: string[];
  documents?: string[];
}): Scholarship => ({
  ...config,
  fundingType: config.fundingType ?? "varies",
  description: `${config.title} is an established scholarship or funding programme operated by ${config.provider}.`,
  deadline: config.deadline ?? "Current cycle or route not established — open the official source",
  sourceAuthority: config.sourceAuthority ?? `Official ${config.provider} programme page`,
  verificationStatus: config.verificationStatus ?? "Programme identity reviewed; current route and material requirements remain to verify",
  requirements: config.requirements ?? [`Select the exact ${config.title} route, course or country call`, "Confirm the current cycle, eligibility and funding on the official source", "Do not treat this directory record as application-ready"],
  documents: config.documents ?? [`Select the current ${config.title} route before creating a document list`, "Open the official source and record its current application steps", "Use only provider-confirmed requirements for the selected route"],
  lastVerified: config.lastVerified ?? "2026-08-31",
  evidenceScope: config.evidenceScope ?? "directory",
  countryEvidence: config.countryEvidence ?? "unknown",
  fieldEvidence: config.fieldEvidence ?? "unknown",
  cycleStatus: config.cycleStatus ?? "unknown",
  applicationReady: config.applicationReady ?? false,
});

const additionalVerifiedPrograms: Scholarship[] = [
  makeVerifiedProgram({ id: "fulbright-foreign-student", title: "Fulbright Foreign Student Program", provider: "U.S. Department of State", studyLevels: ["postgraduate", "doctoral"], fields: ["Any field"], eligibleRegions: ["Nigeria"], destinations: ["United States"], award: "Funding varies by country programme", sourceUrl: "https://foreign.fulbrightonline.org/about/foreign-student-program?country=nigeria", countryEvidence: "partial", evidenceScope: "course-or-partner", sourceNote: "Nigeria appears in the official country directory; the current Nigerian degree track, subjects, deadline and documents remain unresolved." }),
  makeVerifiedProgram({ id: "erasmus-mundus", title: "Erasmus Mundus Joint Masters", provider: "European Commission", studyLevels: ["postgraduate"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["Any country"], award: "Scholarships may cover participation, travel, visa, and living costs", fundingType: "full", sourceUrl: "https://erasmus-plus.ec.europa.eu/opportunities/individuals/students/erasmus-mundus-joint-masters", sourceNote: "Applicants apply to the consortium running each selected master’s programme." }),
  makeVerifiedProgram({ id: "daad-epos", title: "DAAD Development-Related Postgraduate Courses (EPOS)", provider: "DAAD", studyLevels: ["postgraduate", "doctoral"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["Germany"], award: "DAAD scholarship support for selected development-related courses", sourceUrl: "https://www.daad.de/en/information-services-for-higher-education-institutions/further-information-on-daad-programmes/epos/", sourceNote: "DAAD publishes the eligible courses and current application details in its scholarship database." }),
  makeVerifiedProgram({ id: "global-korea-scholarship", title: "Global Korea Scholarship", provider: "Government of the Republic of Korea", studyLevels: ["undergraduate", "postgraduate", "doctoral"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["South Korea"], award: "Government support including tuition and living-related benefits", fundingType: "full", sourceUrl: "https://www.studyinkorea.go.kr/ko/plan/scholarship.do?tab=gks-tab1", sourceNote: "Study in Korea publishes degree tracks, notices, quotas, and application routes." }),
  makeVerifiedProgram({ id: "mext-scholarship", title: "Japanese Government (MEXT) Scholarships", provider: "Ministry of Education, Culture, Sports, Science and Technology", studyLevels: ["undergraduate", "postgraduate", "doctoral"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["Japan"], award: "Government scholarship support; terms vary by category", fundingType: "full", sourceUrl: "https://www.studyinjapan.go.jp/en/planning/scholarships/mext-scholarships/", sourceNote: "Applications are handled through embassies or Japanese universities depending on the category." }),
  makeVerifiedProgram({ id: "turkiye-burslari", title: "Türkiye Scholarships", provider: "Government of Türkiye", studyLevels: ["undergraduate", "postgraduate", "doctoral"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["Türkiye"], award: "Government scholarship package; terms vary by level", sourceUrl: "https://www.turkiyeburslari.gov.tr/", sourceNote: "The official portal publishes programme types, eligibility, and annual applications." }),
  makeVerifiedProgram({ id: "stipendium-hungaricum", title: "Stipendium Hungaricum", provider: "Government of Hungary", studyLevels: ["undergraduate", "postgraduate", "doctoral"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["Hungary"], award: "Tuition support and additional contributions; not a promise that every living cost is covered", deadline: "2026/27 round closed 15 Jan 2026; next cycle unknown", cycleStatus: "closed", sourceUrl: "https://stipendiumhungaricum.hu/apply/", sourceNote: "Eligible subjects and levels depend on the sending partner; the last verified round is closed." }),
  makeVerifiedProgram({ id: "australia-awards", title: "Australia Awards Scholarships", provider: "Australian Government Department of Foreign Affairs and Trade", studyLevels: ["postgraduate"], fields: ["Any field"], eligibleRegions: ["Nigeria", "Ghana", "Kenya", "South Africa", "Uganda"], destinations: ["Australia"], award: "Long-term development-focused study support", deadline: "2027 intake closed 30 Apr 2026; future cycle unknown", cycleStatus: "closed", countryEvidence: "partial", evidenceScope: "course-or-partner", sourceUrl: "https://www.dfat.gov.au/people-to-people/australia-awards/participating-countries", sourceNote: "The record is an umbrella; applicants must select a participating-country profile and current call." }),
  makeVerifiedProgram({
    id: "manaaki-new-zealand", title: "Manaaki New Zealand Scholarships", provider: "Education New Zealand",
    studyLevels: ["undergraduate", "postgraduate", "doctoral"], fields: ["Any field"],
    eligibleRegions: ["Fiji", "New Caledonia", "French Polynesia", "Wallis and Futuna", "Kiribati", "Nauru", "Naoero", "Niue", "Federated States of Micronesia", "Palau", "Marshall Islands", "Papua New Guinea", "Samoa", "Solomon Islands", "Tonga", "Tuvalu", "Vanuatu", "Cambodia", "Indonesia", "Laos", "Lao PDR", "Malaysia", "Nepal", "Philippines", "Thailand", "Timor-Leste", "Vietnam", "Viet Nam"],
    studyLevelsByRegion: Object.fromEntries(["Fiji", "Cambodia", "Indonesia", "Laos", "Lao PDR", "Malaysia", "Nepal", "Philippines", "Thailand", "Vietnam", "Viet Nam"].map((region) => [region, ["postgraduate", "doctoral"] as StudyLevel[]])),
    destinations: ["New Zealand"], award: "New Zealand government scholarship support",
    sourceUrl: "https://www.nzscholarships.govt.nz/check-eligible-countries/",
    verificationStatus: "Country eligibility and country-specific study levels checked against the official source",
    lastVerified: "2026-08-30",
    sourceNote: "Tertiary scholarships are limited to listed Pacific and Asian citizens; Nigeria is not listed. Fiji and listed Asian countries other than Timor-Leste are postgraduate-only. Tertiary applications were closed at review. Check country-specific subjects and the next application round; no current deadline is asserted.",
    evidenceScope: "course-or-partner", countryEvidence: "complete", fieldEvidence: "unknown", cycleStatus: "closed",
  }),
  makeVerifiedProgram({ id: "si-global-professionals", title: "SI Scholarship for Global Professionals", provider: "Swedish Institute", studyLevels: ["postgraduate"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["Sweden"], award: "Scholarship support for eligible master’s applicants", sourceUrl: "https://apply-scholarships.si.se/", sourceNote: "The Swedish Institute application portal lists eligible programmes and current application guidance." }),
  makeVerifiedProgram({ id: "ireland-fellows", title: "Ireland Fellows Programme", provider: "Government of Ireland", studyLevels: ["postgraduate"], fields: ["Any field"], eligibleRegions: ["Nigeria", "Ghana", "Kenya", "South Africa", "Uganda"], destinations: ["Ireland"], award: "Fully funded one-year postgraduate study for eligible country cohorts", fundingType: "full", deadline: "2027/28 applications closed; next cycle unknown", cycleStatus: "closed", countryEvidence: "partial", evidenceScope: "course-or-partner", sourceUrl: "https://api.ireland.ie/en/ireland-fellows-programme/", sourceNote: "Applicants need a current country strand and eligible-course list; the verified 2027/28 round is closed." }),
  makeVerifiedProgram({ id: "vlir-uos", title: "VLIR-UOS ICP Connect Master’s Scholarships", provider: "VLIR-UOS", studyLevels: ["postgraduate"], fields: ["Selected ICP Connect programmes"], eligibleRegions: ["Kenya", "South Africa", "Uganda"], destinations: ["Belgium"], award: "Tuition, travel, insurance and living support for selected programmes", fundingType: "full", countryEvidence: "partial", fieldEvidence: "specific", evidenceScope: "course-or-partner", sourceUrl: "https://www.vliruos.be/get-funded/study-scholarships", sourceNote: "Nigeria and Ghana are absent from the reviewed degree-scholarship country list; nationality and residence, programme, age and prior-study conditions apply." }),
  makeVerifiedProgram({ id: "eiffel-excellence", title: "France Excellence Eiffel Scholarship", provider: "French Ministry for Europe and Foreign Affairs", studyLevels: ["postgraduate", "doctoral"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["France"], award: "French government scholarship for selected master’s and doctoral study", sourceUrl: "https://www.campusfrance.org/en/eiffel-scholarship-program-of-excellence", sourceNote: "French higher education institutions submit applications for eligible candidates." }),
  makeVerifiedProgram({ id: "swiss-government-excellence", title: "Swiss Government Excellence Scholarships", provider: "Swiss Confederation", studyLevels: ["doctoral"], fields: ["Research in any academic field", "Art (limited countries)"], eligibleRegions: ["Any country"], destinations: ["Switzerland"], award: "CHF 2,450 monthly basic-living contribution plus limited benefits; tuition is not covered", fundingType: "partial", evidenceScope: "course-or-partner", countryEvidence: "partial", fieldEvidence: "specific", cycleStatus: "open", sourceUrl: "https://www.sbfi.admin.ch/en/swiss-government-excellence-scholarships-at-a-glance", sourceNote: "The 2027/28 research routes require a completed master’s, research plan and Swiss supervisor; art master’s availability and deadlines depend on country. Applications opened 20 August 2026." }),
  makeVerifiedProgram({ id: "gates-cambridge", title: "Gates Cambridge Scholarship", provider: "Gates Cambridge Trust", studyLevels: ["postgraduate", "doctoral"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["United Kingdom"], award: "Full-cost scholarship for eligible Cambridge postgraduate study", fundingType: "full", sourceUrl: "https://www.gatescambridge.org/apply/", sourceNote: "Applicants apply through the University of Cambridge graduate application process." }),
  makeVerifiedProgram({ id: "rhodes-scholarship", title: "Rhodes Scholarship", provider: "Rhodes Trust", studyLevels: ["postgraduate"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["United Kingdom"], award: "Fully funded postgraduate study at the University of Oxford", sourceUrl: "https://www.rhodeshouse.ox.ac.uk/scholarships/", sourceNote: "Eligibility and constituency routes vary by applicant citizenship and ordinary residence." }),
  makeVerifiedProgram({ id: "clarendon-fund", title: "Clarendon Fund Scholarships", provider: "University of Oxford", studyLevels: ["postgraduate", "doctoral"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["United Kingdom"], award: "Full course fees and living-cost grant for eligible Oxford graduate applicants", fundingType: "full", evidenceScope: "course-or-partner", countryEvidence: "worldwide", fieldEvidence: "broad", sourceUrl: "https://www.ox.ac.uk/admissions/graduate/fees-and-funding/funding/clarendon", documents: ["Select an eligible Oxford graduate course", "Submit the course application by its December or January funding deadline", "No separate Clarendon application or scholarship statement is required"], sourceNote: "Eligible applicants are automatically considered through their graduate course application; the exact deadline is course-specific." }),
  makeVerifiedProgram({ id: "knight-hennessy", title: "Knight-Hennessy Scholars", provider: "Stanford University", studyLevels: ["postgraduate", "doctoral"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["United States"], award: "Funding and leadership programming for eligible Stanford graduate study", sourceUrl: "https://knight-hennessy.stanford.edu/", sourceNote: "Applicants must apply separately to an eligible Stanford graduate degree programme." }),
  makeVerifiedProgram({ id: "schwarzman-scholars", title: "Schwarzman Scholars", provider: "Schwarzman Scholars", studyLevels: ["postgraduate"], fields: ["Global Affairs"], eligibleRegions: ["Any country"], destinations: ["China"], award: "Fully funded one-year Master of Global Affairs at Tsinghua University", fundingType: "full", fieldEvidence: "specific", countryEvidence: "worldwide", deadline: "9 Sep 2026 at 15:00 EDT · 2027/28 global route", deadlineDate: "2026-09-09", cycleStatus: "open", applicationReady: true, evidenceScope: "programme", sourceUrl: "https://www.schwarzmanscholars.org/admissions/application-instructions/", sourceNote: "Applicants may come from any academic background, but the funded degree is Global Affairs; age and degree-completion rules apply." }),
  makeVerifiedProgram({ id: "yenching-academy", title: "Yenching Academy Scholarship", provider: "Peking University", studyLevels: ["postgraduate"], fields: ["China Studies"], eligibleRegions: ["Any country"], destinations: ["China"], award: "Fellowship support for the Yenching Academy master’s in China Studies", fundingType: "full", fieldEvidence: "specific", countryEvidence: "worldwide", evidenceScope: "programme", sourceUrl: "https://yenchingacademy.pku.edu.cn/ADMISSIONS.htm", sourceNote: "A bachelor’s in any field is an entrance condition, not a promise of a degree in that field; current qualifications and documents are published, while the current closing date remains unresolved." }),
  makeVerifiedProgram({ id: "weidenfeld-hoffmann", title: "Weidenfeld-Hoffmann Scholarships and Leadership Programme", provider: "University of Oxford", studyLevels: ["postgraduate"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["United Kingdom"], award: "Funding and leadership programme for eligible Oxford graduate courses", sourceUrl: "https://www.ox.ac.uk/admissions/graduate/fees-and-funding/graduate-scholarships/weidenfeld-hoffmann-scholarships-and-leadership-programme", sourceNote: "Course eligibility and application deadlines are set through the University of Oxford graduate process." }),
  makeVerifiedProgram({ id: "lester-b-pearson", title: "Lester B. Pearson International Scholarship", provider: "University of Toronto", studyLevels: ["undergraduate"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["Canada"], award: "University of Toronto undergraduate scholarship support", sourceUrl: "https://future.utoronto.ca/pearson/about/", sourceNote: "Students must be nominated by their school and follow the university’s current process." }),
  makeVerifiedProgram({ id: "ubc-international-scholars", title: "UBC International Scholars", provider: "University of British Columbia", studyLevels: ["undergraduate"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["Canada"], award: "Need and merit-based undergraduate awards; amount varies", sourceUrl: "https://you.ubc.ca/financial-planning/scholarships-awards-international-students/", sourceNote: "UBC publishes award categories, nomination requirements, and current deadlines." }),
  makeVerifiedProgram({ id: "york-presidents", title: "York University President’s International Scholarship of Excellence", provider: "York University", studyLevels: ["undergraduate"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["Canada"], award: "International undergraduate entrance scholarship", sourceUrl: "https://futurestudents.yorku.ca/presidents-international-scholarship-excellence", sourceNote: "Award values and annual deadlines are published by York University." }),
  makeVerifiedProgram({ id: "macquarie-vice-chancellor", title: "Macquarie University Vice-Chancellor’s International Scholarship", provider: "Macquarie University", studyLevels: ["undergraduate", "postgraduate"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["Australia"], award: "Competitive tuition contribution up to AUD 10,000 after an eligible full course offer", fundingType: "partial", countryEvidence: "partial", evidenceScope: "course-or-partner", sourceUrl: "https://www.mq.edu.au/__data/assets/pdf_file/0010/1351189/International-Student-Guide-2026.pdf", sourceNote: "Australian and New Zealand citizens and Australian permanent residents are excluded; the current detailed call, deadline and full documents remain unresolved." }),
  makeVerifiedProgram({ id: "monash-leadership", title: "Monash International Leadership Scholarship", provider: "Monash University", studyLevels: ["undergraduate"], fields: ["Any field"], eligibleRegions: ["Any country"], destinations: ["Australia"], award: "100% course fees; excludes health cover, accommodation and living costs", fundingType: "tuition", countryEvidence: "partial", fieldEvidence: "broad", evidenceScope: "programme", applicationReady: true, sourceUrl: "https://www.monash.edu/study/fees-scholarships/scholarships/find-a-scholarship/monash-international-leadership-scholarship-5571Z", requirements: ["Be an international student with an unconditional full Monash offer", "Intend full-time undergraduate study at an Australian Monash campus", "Meet the listed current-student, pathway, transfer and course exclusions"], documents: ["Obtain an eligible unconditional Monash undergraduate offer", "No separate scholarship application — eligible offer-holders are automatically considered", "If selected, review the academic and ambassador retention duties"], sourceNote: "Four awards per year are automatically considered from eligible undergraduate offer-holders; 100% course fees excludes OSHC, accommodation and living costs." }),
];

export const scholarships: Scholarship[] = [...coreScholarships, ...additionalVerifiedPrograms];
