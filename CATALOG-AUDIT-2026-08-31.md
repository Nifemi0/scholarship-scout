# Scholarship Scout — full catalog audit

Audit date: 31 August 2026 (Africa/Lagos). Scope: all 30 records in the current local catalog, their matching/checklist behavior, and the official evidence supporting them.

## Verdict

**The catalog is not ready to be described as 30 fully verified scholarship matches.** The records refer to real named programmes, but programme existence is not proof of applicant eligibility, a current opening, funding coverage, or a complete application checklist. Every record needs corrections or more specific evidence before full verification sign-off.

This is a completed audit of the 30 records, **not completed remediation or comprehensive validation of every partner institution and country route**. No catalog, application code, live deployment, scholarship application, or hackathon submission was changed during this audit. Only this report and local audit-status documentation were updated. This report does not certify Devpost submission status, email confirmations, security, or production behavior.

## What was checked

- Inspected the local catalog and deterministic search/checklist implementation.
- Attempted every catalog source URL; followed relevant official application, eligibility and country guidance, and used official-source search results where direct retrieval failed.
- Compared country restrictions, study levels, funded subjects, destination, funding, dates, and required application steps/documents.
- Distinguished current-cycle evidence, historical guidance, programme directories, source conflicts, and unresolved details.
- Did not use scholarship aggregators or social posts as proof. A failed fetch is an access limitation, not evidence that a programme is fake or its website is universally broken.

Findings below are paraphrases with readable source links. A source link substantiates only the associated statement, not every field of the record. This report does not preserve immutable copies of provider pages; future rechecks may see changes. Where only indexed official text was available, that limitation is noted.

## Catalog measurements

These counts were calculated from the local TypeScript exports, not estimated:

| Measure | Count | Meaning |
| --- | ---: | --- |
| Catalog records | 30 | Includes umbrella programmes and individual partner awards |
| Records using `Any country` for applicant eligibility | 22 | Several actually have nationality, residence or international-status restrictions |
| Records using `Any field` | 29 | Often confuses accepted academic backgrounds with funded courses |
| Identical helper-generated document checklists | 26 | Three generic prompts, not programme-specific requirements |
| Broad “Manually checked against the official source” labels | 29 | No field-level proof attached; Manaaki has a narrower label |
| Machine-readable closing dates | 2 | Commonwealth and Chevening only |
| Funding classifications | 7 full; 23 varies | Zero tuition or partial records, despite tuition-only awards |
| Nigeria + Computer Science + other filters blank | 29 results | Candidate records, **not 29 verified eligible/open awards** |

The previous local Manaaki fix explains the change from the older 30-result demo. This audit does not change that local count or establish the current public count.

## Highest-priority findings

1. **False eligibility:** VLIR-UOS's linked degree-scholarship country list excludes Nigeria and Ghana, although the app includes both. Monash Leadership is currently undergraduate-only, but the app includes postgraduate study. See records 16 and 30.
2. **Wrong evidence:** The Swiss record links to scholarships for Swiss applicants studying abroad, not Swiss Government Excellence awards for foreign applicants coming to Switzerland. See record 18.
3. **Incomplete checklists:** The helper assigns 26 records the same three document prompts. It misses nomination, admission, reference, financial-evidence and research-supervisor requirements, and invents a separate checklist where consideration may be automatic.
4. **Timing is not modeled:** Closed and not-yet-open rounds can remain search results. Rhodes West Africa, Australia Awards and Ireland Fellows have relevant closed rounds. Unknown closing dates also pass a requested deadline filter.
5. **Funding filters hide valid awards:** Clarendon is fully funded; Monash is tuition-only; Macquarie offers a capped tuition reduction. All are classified `varies`.
6. **“Any field” is misleading:** Schwarzman funds Global Affairs; Yenching funds China Studies. A computer-science graduate may apply, but that does not make either a computer-science degree scholarship.
7. **Counting is ambiguous:** Mastercard's umbrella directory and its Cambridge partner are both included. Thirty records are not necessarily thirty independent, currently open applications.

## Record-by-record evidence and corrections

Legend: **Correction** = at least one contradicted, misleading or materially incomplete catalog field. **Partial** = headline facts supported, but partner/track evidence remains necessary. **Unresolved** = current-cycle evidence could not be sufficiently retrieved. These are audit dispositions, not admissions judgments.

### 01. Mastercard Foundation Scholars Program

Record ID: `mastercard-scholars` — **Correction / directory-level evidence**

- Eligibility, levels, subjects and destinations depend on the partner. The Foundation says partners manage applications and selection; the directory does not establish the app's universal doctoral coverage or its exact five-country restriction. The partner listings did not fully load in the retrieved page.
- Comprehensive partner-dependent support and variable deadlines are reasonable umbrella descriptions. There is no universal verified document checklist here.
- Action: treat this as a discovery directory, require a named partner before positive eligibility scoring/checklist generation, and link the Cambridge child record rather than count it as an unrelated opportunity. Do not rank the umbrella as a uniquely “best” award.

Evidence: [Foundation — where to apply](https://mastercardfdn.org/en/what-we-do/our-programs/mastercard-foundation-scholars-program/where-to-apply/).

### 02. Commonwealth Master's Scholarships

Record ID: `commonwealth-masters` — **Correction**

- UK taught master's route, not unrestricted study. Eligible nationality/refugee/protected-person status **and** permanent residence are required; the catalog's “citizen or resident” is incorrect. Academic thresholds and development relevance matter; MBA study is excluded. Its five-country list is incomplete.
- Full scholarship support is supported. For 2027/28, applications open 8 September 2026 and close 20 October 2026 at 16:00 BST; as of this audit the round has not opened.
- Checklist must include CSC application **and** the relevant nominating route, which may have an earlier deadline; citizenship/refugee evidence, complete transcripts, and at least two signed references. Current generic supporting-evidence labels are insufficient.

Evidence: [CSC — eligibility, dates, documents and nominating routes](https://cscuk.fcdo.gov.uk/scholarships/commonwealth-masters-scholarships/).

### 03. Chevening Scholarships

Record ID: `chevening` — **Correction**

- Eligible nationality alone is insufficient. The official rules include residence conditions, return-home commitment, an eligible undergraduate qualification completed at least two years before the deadline, and 2,800 hours of **post-graduation** work. The app omits these qualifiers and many eligible countries.
- UK master's/full-funding headline is supported, but course eligibility and award terms still apply.
- Closing date is confirmed: 6 October 2026, 11:00 UTC. The checklist must distinguish initial application from interview documents: photo ID, degree certificate and references are required at least seven working days before interview. The unconditional-offer deadline is 8 July 2027, 17:00 BST.

Evidence: [eligibility](https://www.chevening.org/resource-hub/guidance/eligibility/), [2027/28 timeline and staged documents](https://www.chevening.org/scholarships/application-timeline/).

### 04. Mastercard Foundation Scholars at Cambridge

Record ID: `cambridge-mastercard` — **Correction**

- Master's-only at Cambridge is supported. The app's five African countries and five subjects are unnecessarily restrictive. Official guidance covers African applicants, including stated temporary-abroad exceptions, and eligible full-time master's courses; MACC, MBA, MCL and MFin are excluded.
- Full support is supported by Cambridge's FAQ. Academic admission, leadership/community commitment and programme objectives remain material conditions.
- Application is through the Cambridge course/funding process. The next cycle opens in September; closing dates depend on the course. Replace “usually” with a selected course/cycle deadline, or explicit unknown. The generic three-document list is not a complete course checklist.

Evidence: [eligibility — indexed official text retrieved](https://www.mastercardfoundation.fund.cam.ac.uk/apply/eligibility), [application route](https://www.mastercardfoundation.fund.cam.ac.uk/apply), [funding and course FAQ](https://www.mastercardfoundation.fund.cam.ac.uk/faq).

### 05. Fulbright Foreign Student Program

Record ID: `fulbright-foreign-student` — **Correction; Nigeria route unresolved**

- The programme is for non-U.S. applicants, operates through participating countries, and has country-specific degree/non-degree routes. `Any country` is false as a universal eligibility rule. U.S. destination and country-dependent funding are supported.
- Nigeria appears in the official directory, but the linked Nigerian embassy page returned technical difficulties. This audit cannot confirm the current Nigerian degree track, subject restrictions, application deadline or exact documents.
- Action: retain only directory-level facts until the Nigerian call is obtained. Do not promise a Nigerian applicant master's-degree funding from the global postgraduate label. Do not confuse U.S.-citizen awards **to Nigeria** with Nigerian awards **to the U.S.**

Evidence: [Fulbright — Nigeria country entry and programme limitations](https://foreign.fulbrightonline.org/about/foreign-student-program?country=nigeria), [embassy route — unavailable during audit](https://ng.usembassy.gov/education-culture/exchange-programs/fulbright-visiting-student-program-junior-staff-development-jsd/).

### 06. Erasmus Mundus Joint Masters

Record ID: `erasmus-mundus` — **Partial / consortium required**

- Worldwide master's applicants are supported; applicants need a bachelor's degree or must graduate before starting. Individual consortia define subject prerequisites and participating study locations. `Any country` destination is not a promise of any destination the user wants.
- Full scholarships are available for selected high-ranked applicants, not guaranteed to every admitted student or every course intake.
- Most application periods fall between October and January, but a specific consortium determines dates and documents. No single exact deadline or universal three-item checklist is verified.
- Action: retain an umbrella listing, but select a course and scholarship-bearing intake before scoring subject fit or generating application steps.

Evidence: [European Commission — Erasmus Mundus Joint Masters](https://erasmus-plus.ec.europa.eu/opportunities/individuals/students/erasmus-mundus-joint-masters).

### 07. DAAD EPOS

Record ID: `daad-epos` — **Correction**

- Limited to listed developing/newly industrialised countries and selected German development-related courses. Master's study is standard; doctoral funding is exceptional. Applicants generally need a relevant degree, strong grades and two years' relevant post-degree experience. `Any country`/`Any field` overstate eligibility.
- Stipend, insurance and travel support are specified; retain component-level coverage rather than infer every cost is paid.
- Deadlines depend on the 2027/28 course list. Applications go to courses first, not directly to DAAD.
- Checklist omissions: signed checklist/form, CV, motivation, employer recommendation and employment certificates, language evidence, degrees/transcripts and applicable translations; courses can require more.

Evidence: [DAAD — EPOS requirements, funding and documents](https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/?detail=50076777).

### 08. Global Korea Scholarship

Record ID: `global-korea-scholarship` — **Correction**

- Undergraduate and graduate/doctoral tracks in South Korea exist, but applicant and parental nationality, age, grades, designated institutions and track/country quotas matter. Graduate guidance requires non-Korean citizenship for applicant and parents, generally age under 40 and at least 80% academic performance. `Any country` is not a sufficient rule.
- Tuition and living-related benefits support the package headline; exact benefits depend on the call.
- Embassy/university routes have different deadlines and supporting documents. This audit did not validate a current Nigerian track notice or its full document set.
- Action: split undergraduate/graduate routes, attach the current call and country quota, and mark unresolved track details unknown.

Evidence: [Study in Korea — official GKS overview and eligibility](https://www.studyinkorea.go.kr/ko/plan/scholarship.do?tab=gks-tab1).

### 09. Japanese Government MEXT Scholarships

Record ID: `mext-scholarship` — **Partial / category required**

- Japan and undergraduate/research study routes are supported, but the seven scholarship categories have different age, academic, examination and nomination requirements. The official overview says available types/fields vary by country.
- Tuition exemption, stipend and travel benefits are described. They should be attached to the selected category, not treated as identical terms across every route.
- Embassy or university recommendation is required. Current Nigerian deadlines and category-specific documents were not established from the overview.
- Action: require category and country notice before assigning level/subject eligibility or an application checklist. Global `Any country` should not be interpreted as verified eligibility for every citizen.

Evidence: [Study in Japan — MEXT types, requirements and benefits](https://www.studyinjapan.go.jp/en/planning/scholarships/mext-scholarships/).

### 10. Türkiye Scholarships

Record ID: `turkiye-burslari` — **Correction**

- Undergraduate, master's and doctoral routes exist. Despite broad international access, Turkish/former Turkish citizens and certain students already enrolled at the same level in Türkiye are excluded.
- Minimum grades and age cutoffs vary by level: undergraduate under 21, master's under 30 and PhD under 35. Health-science grade criteria differ. None are modeled.
- The root record combines long-term and other award types. Funding components, funded subjects, current-cycle dates and exact documents need the selected full-time programme call; they were not fully established here.
- Action: replace unconditional country eligibility with exclusions and level-specific rules; do not derive a current deadline from an undated annual pattern.

Evidence: [Türkiye Scholarships — criteria and programme categories](https://www.turkiyeburslari.gov.tr/scholarshipsprograms).

### 11. Stipendium Hungaricum

Record ID: `stipendium-hungaricum` — **Correction**

- Hungary and the degree-level headline are supported, but eligible subjects/levels depend on the sending partner. `Any country` and `Any field` are misleading.
- The award includes tuition and additional contributions; living support must not be equated with all living costs being covered. Exact package requires the track call.
- Published 2026/27 deadline: 15 January 2026, 14:00 CET, now past. No next-cycle deadline was verified.
- Checklist must include the sending-partner process/nomination, its possibly different deadline, online application, and track/nationality-specific documents; doctoral supervisor confirmation may apply.

Evidence: [official application steps, calls and dates](https://stipendiumhungaricum.hu/apply/), [doctoral call and living-cost caveat](https://stipendiumhungaricum.hu/wp-content/uploads/2025/10/PhD_Call_for_Applications_2026_27.pdf).

### 12. Australia Awards Scholarships

Record ID: `australia-awards` — **Correction / country profile required**

- Nigeria and the four other listed African countries appear among participating countries, but the five-country array excludes many others. Master's scope fits the Africa route, not the entire global Australia Awards umbrella. Country residence, experience and development requirements need the relevant profile.
- Australia is supported. The exact funding/documents should come from the country call and scholarship handbook, not the generic portal description.
- The 2027 intake closed on 30 April 2026, 14:00 AEST. The government application system confirms closure. A future generic listing must not appear “open now.”
- Action: clarify Africa-master's scope, expand supported countries from a cycle-specific list, and separate future discovery from current applications.

Evidence: [participating countries](https://www.dfat.gov.au/people-to-people/australia-awards/participating-countries), [Africa programme](https://www.dfat.gov.au/geo/africa-middle-east/development-assistance-in-sub-saharan-africa/australia-awards-africa), [2027 dates](https://www.dfat.gov.au/people-to-people/australia-awards/frequently-asked-questions), [application-system closure](https://oasis.dfat.gov.au/).

### 13. Manaaki New Zealand Scholarships

Record ID: `manaaki-new-zealand` — **Partial; earlier local correction supported**

- The local country list and country-level study restrictions align with the reviewed tertiary country page. Nigeria is absent. Fiji and listed Asian countries other than Timor-Leste are postgraduate-only. New Zealand is the relevant destination for this record.
- The existing narrower verification label is appropriate. This does not verify unrestricted subjects, all general eligibility, funding components or documents.
- The source says tertiary applications are closed. The next opening/closing date remains unknown; the app only mentions closure in prose.
- Action: add structured closed-cycle status and country-specific subject/eligibility evidence before calling the whole record verified. Preserve the Nigeria exclusion.

Evidence: [Manaaki — eligible countries, levels and closure notice](https://www.nzscholarships.govt.nz/check-eligible-countries/).

### 14. SI Scholarship for Global Professionals

Record ID: `si-global-professionals` — **Unresolved current cycle; overbroad eligibility**

- Official indexed course entries show citizenship lists and eligible master's courses, not universal country/subject access. Nigeria appears in historical official entries, but that does not establish every current-cycle Nigerian course option.
- Swedish master's scope is supported. Current funding amounts, work/leadership requirements, documents and dates were not independently established: the current central guidance returned 403 and the application portal retrieval failed.
- Action: remove any implication of current full verification; obtain the current SI call and eligible-course list before changing hard eligibility or benefit amounts. Never interpret the portal's country selector/cookie list as a scholarship eligibility list.

Evidence: [official indexed course entry — historical, not current-call proof](https://apply-scholarships.si.se/courses/course/1343-statistics-and-data-science), [current guidance — access-limited](https://si.se/en/apply/scholarships/swedish-institute-scholarships-for-global-professionals/), [application portal](https://apply-scholarships.si.se/).

### 15. Ireland Fellows Programme

Record ID: `ireland-fellows` — **Correction; country strand unresolved**

- One-year study in Ireland and government full funding are supported. The record's `varies` classification conflicts with its full-funding description.
- The umbrella contains separate country strands and eligible-course guidance. This audit did not establish that each of the five listed countries has unrestricted subject access in the same strand. Nigeria's applicable course list and full staged checklist need the current country guidance.
- The government explicitly says 2027/28 applications are closed. No next-cycle date should be invented.
- Action: use a country/strand-specific record, structured closure status, verified course list and staged application requirements; do not infer a computer-science course match from `Any field`.

Evidence: [Government of Ireland — programme, full funding and 2027/28 closure](https://api.ireland.ie/en/ireland-fellows-programme/), [applicant/strand guidance](https://api.ireland.ie/en/ireland-fellows-programme/applying-for-the-ireland-fellows-programme/).

### 16. VLIR-UOS

Record ID: `vlir-uos` — **Correction — high priority**

- The linked source is ICP Connect study scholarships, while the title combines training and master's awards. These must not share assumed eligibility lists.
- **Nigeria and Ghana are absent** from the published degree-scholarship country list; Kenya, South Africa and Uganda are present. Both eligible nationality and residence are required. Funded study is limited to selected programmes in Flanders; age and prior-study conditions matter.
- Tuition, travel, insurance and living expenses are covered for the funded programme. `varies` hides a defined package. Dates and admission documents are programme-specific.
- Action: remove Nigeria/Ghana from this degree route, separate training awards, and attach the intake-specific course/country list. A 2027 project-funding call is not a student application deadline.

Evidence: [official country list — indexed text](https://www.vliruos.be/country-list-scholarships), [study eligibility and coverage](https://www.vliruos.be/get-funded/study-scholarships), [participating university corroboration](https://www.uantwerpen.be/en/about-uantwerp/faculties/institute-of-development-policy/development-studies/master-development-studies/application/vlir-uos-scholarship/).

### 17. France Excellence Eiffel

Record ID: `eiffel-excellence` — **Correction / current call incomplete**

- France, master's and doctoral routes are supported, but there are seven designated subject areas and foreign-applicant conditions; `Any field` is not accurate.
- Eiffel pays allowances and services, **not tuition fees directly**. Separate public-institution fee exemptions may apply. Do not label this universally full-cost without the institution's terms. Current French guidance updates allowances from January 2026; older English benefit pages show older figures.
- French institutions submit candidates; applicants need their institution's earlier internal process. The reviewed 2026 central deadline was 8 January 2026. No 2027 call/deadline or complete candidate document set was verified.
- Action: update the source path, encode subject/nomination restrictions and funding exclusions; leave next-cycle details unknown.

Evidence: [official programme overview — indexed text; direct access limited](https://www.campusfrance.org/en/the-france-excellence-eiffel-scholarship-program), [2026 campaign](https://www.campusfrance.org/fr/le-programme-de-bourses-france-excellence-eiffel), [updated benefits](https://www.campusfrance.org/fr/droits-et-obligations-du-boursier-eiffel), [tuition limitation](https://ressources.campusfrance.org/pratique/programmes/en/plaquette_eiffel_1_en.pdf).

### 18. Swiss Government Excellence Scholarships

Record ID: `swiss-government-excellence` — **Correction — wrong source**

- The catalog links to Swiss students' scholarship offers **abroad**, not foreign students' excellence scholarships **in Switzerland**. Replace with the Swiss State Secretariat's programme page.
- The real 2027/28 programme primarily funds research applicants who have completed a master's; art master's availability is restricted. This is not a general taught-master's scholarship in every field/country.
- Funding type, duration and deadlines depend on scholarship/country. The official 2027/28 cycle opens 20 August 2026; no single worldwide closing date applies.
- Research checklist needs a Swiss supervisor's support, research plan and route-specific evidence. The detailed current guidance uses the online GO ESKAS route. Exact Nigerian type/deadline remains unresolved here.

Evidence: [incorrect catalog source — outbound offers](https://www.swissuniversities.ch/en/service/scholarships-for-study-abroad/government-scholarships/scholarship-offers), [correct government programme](https://www.sbfi.admin.ch/en/swiss-government-excellence-scholarships), [types and application requirements](https://www.sbfi.admin.ch/en/swiss-government-excellence-scholarships-at-a-glance).

### 19. Gates Cambridge

Record ID: `gates-cambridge` — **Correction; current route details partial**

- Cambridge postgraduate study and full-cost support are supported. Applicants must be from outside the UK; `Any country` incorrectly includes UK applicants. Course/degree exclusions still require checking.
- The direct Trust application page was unavailable. Cambridge's own funding and admissions pages provide corroborating evidence, including a separate Gates statement/reference requirement.
- Deadlines vary by applicant round and course. No single catalog-wide current deadline was established; do not transplant a department's deadline to every course.
- Action: encode nationality restrictions and eligible course types, and include the additional Gates referee alongside course documents. Replace a generic personal-statement prompt with current official instructions.

Evidence: [Cambridge Judge — eligibility and application](https://www.jbs.cam.ac.uk/scholarships-loans/the-gates-cambridge-scholarship/), [Cambridge — supporting references](https://www.postgraduate.study.cam.ac.uk/apply/how/references), [Trust application page — access-limited](https://www.gatescambridge.org/apply/).

### 20. Rhodes Scholarship

Record ID: `rhodes-scholarship` — **Correction / constituency required**

- Oxford postgraduate funding is real, but citizenship/residence, age and academic criteria depend on constituency. For West Africa, Nigeria is included; residence in the region for five of the last ten years and specified academic/age criteria apply. `Any country` cannot replace this evaluation.
- Full funding headline is supported; eligible courses and duration require the Conditions of Tenure. Doctoral treatment must be checked rather than assumed from the app's postgraduate-only tag.
- **West Africa applications closed 27 August 2026, 23:59 GMT** for 2027 entry. References have a separate 3 September deadline; that does not reopen applications.
- Action: constituency-specific deadlines, eligibility and candidate/referee document checklists.

Evidence: [West Africa application route/dates](https://www.rhodeshouse.ox.ac.uk/scholarships/applications/west-africa/), [eligibility checker](https://www.rhodeshouse.ox.ac.uk/scholarships/applications/west-africa/eligibilitycriteria/), [2027 candidate guide](https://www.rhodeshouse.ox.ac.uk/media/sjypp0gf/west-africa-information-for-candidates-document-2027-final.pdf).

### 21. Clarendon Fund

Record ID: `clarendon-fund` — **Correction**

- Oxford master's/DPhil, broad subjects and no nationality/residence restriction are supported. Course admission and academic selection still apply.
- The official page explicitly describes full funding, including course fees and living support; the catalog's `varies` classification needs correction.
- Applicants are automatically considered if their graduate application meets the relevant December/January course deadline. A separate scholarship personal statement or application should not be invented.
- Action: checklist should say “complete the eligible Oxford course application by its funding deadline,” with course-specific documents. Exact dates need the selected course and cycle.

Evidence: [Oxford — Clarendon funding and automatic consideration](https://www.ox.ac.uk/admissions/graduate/fees-and-funding/funding/clarendon).

### 22. Knight-Hennessy Scholars

Record ID: `knight-hennessy` — **Correction**

- Global citizenship access and Stanford graduate/doctoral scope are supported, but named programmes are excluded. For the 2027 cohort, the first bachelor's degree must generally be from January 2020 or later; military-service exceptions apply.
- Funding is for up to three years, not an unconditional promise for every year of a longer doctorate. Coverage needs this duration qualifier.
- KHS closes **6 October 2026, 13:00 Pacific Time**. A separate Stanford application is due by its KHS-specific deadline or 1 December 2026, whichever is earlier, subject to documented exceptions.
- Action: model degree date, exclusions, two application tracks, and their documents. Generic academic-record/statement prompts miss the actual submission structure.

Evidence: [eligibility](https://knight-hennessy.stanford.edu/admission/before-you-apply/eligibility), [two application deadlines](https://knight-hennessy.stanford.edu/admission/preparing-your-applications/application-deadlines), [programme and funding overview](https://knight-hennessy.stanford.edu/).

### 23. Schwarzman Scholars

Record ID: `schwarzman-scholars` — **Correction**

- Funds a one-year **Master of Global Affairs** at Tsinghua, not a degree in any subject. Applicants may come from other academic backgrounds. Chinese and U.S./global application routes differ.
- Full funding is supported; `varies` should not conceal that headline.
- U.S./global applications for 2027/28 close **9 September 2026, 15:00 EDT**. Candidates must be 18–28 on 1 August 2027 and have completed undergraduate requirements by then.
- Checklist must use the actual online application, CV, transcripts, essays/references and language rules. The video introduction is recommended, not mandatory; do not make it a blocking required document.

Evidence: [programme subject and funding](https://www.schwarzmanscholars.org/), [application instructions and dates](https://www.schwarzmanscholars.org/admissions/application-instructions/).

### 24. Yenching Academy

Record ID: `yenching-academy` — **Correction**

- The Peking University master's is **China Studies**, with humanities/social-science research areas. A bachelor's in any field is an entrance condition, not a funded-degree subject list. Chinese and international applicants have distinct requirements.
- Full fellowships are described; coverage/duration should be taken from the applicable admissions terms rather than left as an unexplained `varies`.
- Current admissions guidance requires bachelor's completion by 31 August 2027, but this audit did not establish a current closing date.
- Checklist omissions include a separate research-interest statement, CV, official transcripts, diploma/enrollment evidence, two qualifying academic references, and English evidence or a valid exemption.

Evidence: [programme and fellowship scope](https://yenchingacademy.pku.edu.cn/), [current qualifications and document list](https://yenchingacademy.pku.edu.cn/ADMISSIONS.htm).

### 25. Weidenfeld-Hoffmann

Record ID: `weidenfeld-hoffmann` — **Correction / mixed-cycle source**

- Oxford limits eligibility to named courses and countries of ordinary residence, including Nigeria. Advanced Computer Science is listed; that does not support `Any field`. Return intentions and contribution to public life matter.
- Full course fees and living support are supported; funding classification needs correction.
- Applicants must select the scholarship in the Oxford application and upload its separate scholarship statement by the course's December/January deadline.
- Source conflict: the page has a 2027/28 statement but still contains 2026 interview/outcome references. Do not infer next-cycle interview dates or a universal closing date from that mixture. The catalog's older URL should be replaced with the current path.

Evidence: [Oxford — current scholarship page, courses, residence and statement](https://www.ox.ac.uk/admissions/graduate/fees-and-funding/fees-funding-and-scholarship-search/weidenfeld-hoffmann-scholarships-and-leadership-programme).

### 26. Lester B. Pearson International Scholarship

Record ID: `lester-b-pearson` — **Correction — applicant stage matters**

- For international school-leavers entering Toronto's undergraduate programme, not students already attending post-secondary study. International status, graduation timing and school nomination are material gates; `Any country` alone is insufficient.
- Four-year tuition, books, incidental fees and residence support are specified; represent the components rather than unexplained `varies`.
- The 2027 block lists school nomination **9 October 2026**, university admission **16 October 2026**, and scholarship application/documents **6 November 2026**. Older FAQ dates remain on the page, so flag that conflict and confirm the live cycle before relying on a deadline.
- Crucially, Toronto prohibits AI-generated content in its undergraduate award applications. Research/checklist help must not become prohibited essay drafting.

Evidence: [Toronto — Pearson eligibility, benefits, application stages and AI policy](https://future.utoronto.ca/pearson-scholarships).

### 27. UBC International Scholars

Record ID: `ubc-international-scholars` — **Correction**

- Use the dedicated International Scholars page, not the broad awards directory. Requires international status, entry directly from secondary school, a first undergraduate degree and significant financial need; listed degree exclusions apply. This is not a general transfer-student award.
- Support is need-assessed; do not confuse it with UBC's separate automatic merit awards or promise a uniform amount.
- 2027 applications open in September 2026. Guidance gives 15 November for the award application and 31 January for documents; year/time-zone details should be recorded from the live cycle before encoding exact timestamps.
- Checklist needs prior UBC application, separate nominator and teacher referee, financial evidence and essays. Keep sensitive evidence with UBC, not Scholarship Scout.

Evidence: [UBC — International Scholars requirements and application sequence](https://you.ubc.ca/financial-planning/scholarships-awards-international-students/international-scholars/).

### 28. York President's International Scholarship of Excellence

Record ID: `york-presidents` — **Correction / mixed-cycle source**

- For international high-school applicants entering their first undergraduate year, with academic, leadership and nomination requirements. `Any country` is not a substitute for international-fee status and school stage.
- Published value is CAD 180,000 over four years (CAD 45,000/year); a capped award is not necessarily full cost for every student.
- The guide displays **27 January 2027, 23:59 EST** for students and **4 February 2027, 23:59 EST** for nomination/reference, but still has 2026 headings/admission instructions and a closed banner. Mark cycle status conflicted, not open.
- Checklist needs nomination/reference, personal statement, activities/awards and financial profile. Obtain consistent cycle guidance before asserting dates as final.

Evidence: [award value and audience](https://futurestudents.yorku.ca/presidents-international-scholarship-excellence), [application guide and conflicting cycle text](https://futurestudents.yorku.ca/presidents-international-scholarship-excellence-application-guides).

### 29. Macquarie Vice-Chancellor's International Scholarship

Record ID: `macquarie-vice-chancellor` — **Correction; current conditions partial**

- Official 2026 guidance supports undergraduate/postgraduate international applicants and a competitive award of **up to AUD 10,000 toward tuition**, after a full course offer. This is a partial tuition reduction, not full tuition or living support.
- Official conditions exclude Australian/New Zealand citizens and Australian permanent residents; other admission/enrollment restrictions apply. `Any country` is misleading.
- The exact catalog page failed retrieval. A separate official staging page still refers to 2021/22, so its dates/grade thresholds were not accepted as current. Current deadline, eligible-course exceptions and full documentation remain unresolved.
- Action: use the current scholarship call plus the university conditions, classify capped partial tuition, and require course offer before scholarship application.

Evidence: [2026 international student guide](https://www.mq.edu.au/__data/assets/pdf_file/0010/1351189/International-Student-Guide-2026.pdf), [official scholarship conditions — confirm applicability to current offer](https://students.mq.edu.au/__data/assets/pdf_file/0010/367291/Vice-Chancellors_International_Scholarship_Conditions.pdf).

### 30. Monash International Leadership Scholarship

Record ID: `monash-leadership` — **Correction — high priority**

- Current official criteria require an unconditional offer for full-time **undergraduate** study at an Australian Monash campus. Remove postgraduate eligibility. International-student status is required; current students, certain transfers, pathways and named courses are excluded.
- Pays **100% course fees**, excluding health cover, accommodation and living costs. Classify tuition-only, not unexplained `varies` or full-cost funding.
- **No separate scholarship application:** eligible offer-holders are automatically considered. The helper's generic personal-statement checklist is misleading.
- No standalone scholarship closing date was established. Checklist should focus on eligible course admission and offer conditions; retention includes academic and ambassador obligations.

Evidence: [Monash — current eligibility, coverage, exclusions and automatic consideration](https://www.monash.edu/study/fees-scholarships/scholarships/find-a-scholarship/monash-international-leadership-scholarship-5571Z).

## Cross-cutting implementation findings

These are local code observations, not claims about the latest production deployment.

| Priority | Finding | Consequence | Recommended acceptance test |
| --- | --- | --- | --- |
| P1 | Country matching treats `Any country` as a positive match | Domestic/ineligible nationals can receive eligibility points | Turkish citizen does not positively match Türkiye Scholarships; UK applicant does not positively match Gates |
| P1 | Country lists mix incomplete samples with exhaustive eligibility | Valid students are hidden; invalid students appear | Distinguish complete restrictions from unreviewed countries; incomplete evidence returns unknown |
| P1 | Field search uses literal list/`Any field`; eligibility reports nonlisted fields as unknown while search removes them | Unsupported positive matches and inconsistent exclusion | Separate previous degree subject from funded course; Yenching is not a CS-degree match |
| P1 | Only level/country/subject/destination enter scoring | Age, residence, degree timing, grades, experience and admissions gates are not evaluated | Show “not evaluated” gates; never present the score as full eligibility or award probability |
| P1 | `createChecklist` maps the static `documents` array directly | All 26 helper records yield the same incomplete three-item checklist | Provider-specific, staged steps with evidence; automatic awards do not invent separate applications |
| P1 | Unknown closing dates pass `deadlineBefore`; no open/closed state | Date-filtered results include unresolved or closed rounds | Separate confirmed date matches from unknowns; closed rounds excluded from an “open” filter |
| P1 | Funding filter uses exact enum equality | Full/tuition/partial filters silently omit relevant awards | Clarendon appears under full; Monash under tuition; Macquarie under partial tuition |
| P2 | Record-wide verification labels/date lack field evidence | A checked homepage looks like every requirement was checked | Each material rule links to its source, cycle, review date and review scope |
| P2 | Umbrella and partner records share one result count | Apparent opportunity count can double-count routes | Count directory entries separately from application-ready awards; parent-child IDs |
| P2 | Date-only fields lose cutoff time, timezone and application stage | Students may miss same-day or nomination deadlines | Distinct opening, application, nomination, reference and admission deadlines with source timezone |

The earlier local destination/profile/tied-ranking fixes remain useful, but passing software tests does not validate scholarship facts. No fresh browser/build/security audit was performed in this catalog audit.

## What “verified” should mean before an update

Recommended publication gates; these are not implemented by this report:

1. Identify the exact programme, country route, funded course/track and intake. Directory-level entries remain clearly labeled directories.
2. Use the provider or its named administering institution. Record an official URL for each material claim; a legitimate domain alone is not sufficient.
3. Store the observed rule, cycle, checked date, scope and limitations. Do not advance `lastVerified` after merely confirming a page loads.
4. Distinguish verified, unknown, historical and conflicting facts. Conflicting cycle dates require clarification; old rules must not silently become next-year facts.
5. Review applicant restrictions separately from preferences/selection criteria. Citizenship, residence and international-fee status are different concepts.
6. Record funding components, caps, duration and exclusions. “Full tuition” is not “all expenses.”
7. Build a sourced, staged checklist. Label optional items optional and planning suggestions as suggestions. Respect each provider's AI-use policy.
8. Run negative and positive regression profiles, then review the UI and WebMCP output for identical uncertainty labels.
9. Publish only after authorized deployment; separately update demo/submission claims if authorized. Preserve an audit/change history.

## Remediation order and remaining evidence gaps

**First:** correct VLIR-UOS country scope, Monash level/funding/application route, Swiss source, misleading subject matches, and blanket verification/checklist claims. These directly affect whether a student should spend time applying.

**Second:** structure deadlines/status, funding components, nationality/residence and application-stage rules. Correct complete country/course lists from cycle-specific evidence, not from broad assumptions.

**Third:** complete the unresolved current-country/track calls: Nigerian Fulbright; current SI; MEXT and GKS national notices; Ireland's relevant strand; Macquarie's current detailed call; Gates course exclusions; Swiss Nigerian award types/deadlines. Resolve Toronto, York and Weidenfeld mixed-cycle text before relying on all their dates. Every umbrella still needs a selected partner/course for an application-ready checklist.

**Release position:** the app may demonstrate a discovery-and-planning workflow if it accurately discloses partial evidence. It should not claim all 30 records are fully verified, currently open, or a particular student's confirmed matches. Existing documentation contains older completion/demo claims; this report and the new audit-status notes qualify those claims, not certify the submission.
