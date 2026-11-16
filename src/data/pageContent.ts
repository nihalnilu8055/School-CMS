export interface InfoPageContent {
  title: string;
  eyebrow: string;
  intro: string;
  sections: { heading: string; body: string }[];
}

export const PAGE_CONTENT: Record<string, InfoPageContent> = {
  admissions: {
    title: 'Vacancy & Admissions',
    eyebrow: 'Admissions Office',
    intro: 'All admissions are subjected to passing an entrance test and are based on a first come first serve basis. The highest scorer will get the first chance. There will be no retest.',
    sections: [
      {
        heading: 'Admission rules',
        body: 'All admissions are subjected to passing an entrance test and are based on first come first serve basis. The highest scorer will get the first chance. There will be no retest. For FS2 the admission requests are filled and submitted online on the date announced. Only the required number of forms will be accepted and others will be rejected as explained on the website when admissions are opened.',
      },
      {
        heading: 'Documents for FS2, Year 1 and Year 2',
        body: 'At the time of admission the following documents should be produced (both original and photocopy): Original Passport with a valid residence visa + 1 photocopy; Original Birth Certificate (must be in English or Arabic) + 1 photocopy; two passport size photographs; one photocopy of father’s passport with valid residence visa; advance of two months’ fees (cash only); copy of Vaccination Card; Original Emirates ID + 1 photocopy; all photocopies on A4 size paper; SIS No. of Nursery if attended in Sharjah or Ajman; students transferring from a school in the UAE must bring their Medical File from the previous school.',
      },
      {
        heading: 'Year 3 to Year 13 — Transfer within Ajman & Sharjah',
        body: 'Students coming from other systems (other than British system) must provide a School Leaving Certificate attested by the Ministry of Education + SIS No. (Sharjah + Ajman) + Report Card attested. Students coming from the British system must provide a Transfer Certificate attested by the Ministry of Education + SIS No. (Sharjah + Ajman) + Report Card attested. Also required: original passport with a valid residence visa + 1 photocopy; one photocopy of father’s passport with valid residence visa; one passport size photograph of the student; advance of two months’ fees (cash only); original Birth Certificate (English or Arabic) + 1 photocopy; original Emirates ID + 1 photocopy; latest Report Card attested by the Ministry of Education; copy of Vaccination Card; Medical File from the previous UAE school; all photocopies on A4 size paper.',
      },
      {
        heading: 'Year 3 to Year 13 — Transfer outside UAE',
        body: 'Students coming from India, Pakistan, Bangladesh, Sri Lanka or other systems (other than British system) must provide a School Leaving Certificate attested + Report Card attested. Students coming from the British system must provide a Transfer Certificate duly attested. All candidates of all systems must provide a Report Card duly attested. All out-of-UAE documents must be attested by: the Ministry of Education or Education Bureau of the country; the Ministry of Foreign Affairs of the country; and the Embassy or Consulate of the UAE in the country. The TC / Leaving Certificate should mention that the student has passed and been promoted to the class for which admission is sought. Additional documents for all outside-UAE admissions: original passport with a valid residence visa + 1 copy; one photocopy of father’s passport with valid residence visa; one passport size photograph of the student; advance of two months’ fees (cash only); original Birth Certificate (English or Arabic) + 1 photocopy; original Emirates ID + 1 photocopy; latest Report Card of the last class attested in the same manner as the TC; all photocopies on A4 size paper. Subject to change by the Ministry of Education.',
      },
      {
        heading: 'Requirements for admission test',
        body: 'Candidates must bring the Report Card of the previous school. If the student wants to transfer in midterm, he/she must bring the latest report card from the current school. Parents are requested to be honest when filling the registration and admission forms because withholding information or giving false information is dishonest.',
      },
    ],
  },
  'admissions/process': {
    title: 'Admission Process',
    eyebrow: 'Vacancy & Admissions',
    intro: 'All admissions are subjected to passing an entrance test and are based on a first come first serve basis. The highest scorer will get the first chance. There will be no retest.',
    sections: [
      {
        heading: 'Admission rules',
        body: 'All admissions are subjected to passing an entrance test and are based on first come first serve basis. The highest scorer will get the first chance. There will be no retest. For FS2 the admission requests are filled and submitted online on the date announced. Only the required number of forms will be accepted and others will be rejected as explained on the website when admissions are opened.',
      },
      {
        heading: 'Requirements for admission test',
        body: 'Candidates must bring the Report Card of the previous school. If the student wants to transfer in midterm, he/she must bring the latest report card from the current school. Parents are requested to be honest when filling the registration and admission forms because withholding information or giving false information is dishonest.',
      },
    ],
  },
  'admissions/register': {
    title: 'Documents & Registration',
    eyebrow: 'Vacancy & Admissions',
    intro: 'At the time of admission the following documents should be produced (both original and photocopy). All photocopies should be on A4 size paper.',
    sections: [
      {
        heading: 'Documents for FS2, Year 1 and Year 2',
        body: 'Original Passport with a valid residence visa + 1 photocopy; Original Birth Certificate (must be in English or Arabic) + 1 photocopy; two passport size photographs; one photocopy of father’s passport with valid residence visa; advance of two months’ fees (cash only); copy of Vaccination Card; Original Emirates ID + 1 photocopy; all photocopies on A4 size paper; SIS No. of Nursery if attended in Sharjah or Ajman; students transferring from a school in the UAE must bring their Medical File from the previous school.',
      },
      {
        heading: 'Year 3 to Year 13 — Transfer within Ajman & Sharjah',
        body: 'Students coming from other systems (other than British system) must provide a School Leaving Certificate attested by the Ministry of Education + SIS No. (Sharjah + Ajman) + Report Card attested. Students coming from the British system must provide a Transfer Certificate attested by the Ministry of Education + SIS No. (Sharjah + Ajman) + Report Card attested. Also required: original passport with valid residence visa + 1 photocopy; father’s passport photocopy; one passport photograph; advance of two months’ fees (cash only); birth certificate; Emirates ID; latest Report Card attested; Vaccination Card; Medical File from previous UAE school; all photocopies on A4 paper.',
      },
      {
        heading: 'Year 3 to Year 13 — Transfer outside UAE',
        body: 'School Leaving / Transfer Certificate and Report Card must be attested as required. Out-of-UAE documents must be attested by the Ministry of Education (or Education Bureau), the Ministry of Foreign Affairs, and the UAE Embassy/Consulate in that country. The TC must state that the student has passed and been promoted to the class applied for. Also bring passport, father’s passport copy, photograph, two months’ fees (cash), birth certificate, Emirates ID, and attested latest Report Card. Subject to change by the Ministry of Education.',
      },
    ],
  },
  about: {
    title: 'About Us',
    eyebrow: 'Ibn Seena English High School',
    intro: 'The school was built in 1978 under the patronage of the ruler of Sharjah, H.H. Sheikh Sultan Bin Mohd. Al Qassimi. No frills, no jargon, just honest education.',
    sections: [
      {
        heading: 'School Profile — History',
        body: 'The school was built in 1978 under the patronage of the ruler of Sharjah, H.H. Sheikh Sultan Bin Mohd. Al Qassimi. The town was growing and there was a need to provide wholesome education at affordable prices. No frills, no jargon, just honest education.',
      },
      {
        heading: 'The Philosophy',
        body: 'The school is committed to producing a universal human being, a person with not just robotic information at his command, but the wisdom to use it for the greater good. A world citizen; erudite, able to accept diverse cultures and values while holding on to his own. A humane person; an eco friendly citizen of the world. These are big targets, but unless you reach for the stars, you will not touch the moon!',
      },
      {
        heading: 'What is education?',
        body: 'Is it a meal ticket? Is it a CD full of information? Is it the key to wisdom? Is it a bridge to universal understanding? We think it is all this and more. It helps us to understand ourselves and our potential. It helps us to take the hard times philosophically, and the good times level headedly. We believe that children need a free and relaxed atmosphere to grow in, where they are trusted and the teachers are approachable.',
      },
    ],
  },
  'about/mission': {
    title: 'Mission & Vision',
    eyebrow: 'About Us',
    intro: 'The philosophy behind the establishment of Ibn Seena English High School as a premier educational institution has been that while academic achievement is a necessary focus, it should not need to be at the expense of other areas of a child’s development.',
    sections: [
      {
        heading: 'Our mission',
        body: 'The philosophy behind the establishment of Ibn Seena English High School as a premier educational institution has been that while academic achievement is a necessary focus, it should not need to be at the expense of other areas of a child’s development.',
      },
      {
        heading: 'Our vision',
        body: 'By placing an equal emphasis on a child’s social, moral and psychological development, students who would graduate from such an institution are well equipped to deal with real world challenges.',
      },
      {
        heading: 'How we teach',
        body: 'The school is committed to producing a universal human being, a person with not just robotic information at his command, but the wisdom to use it for the greater good. We believe that children need a free and relaxed atmosphere to grow in, where they are trusted and the teachers are approachable.',
      },
    ],
  },
  'about/timing': {
    title: 'School Timing',
    eyebrow: 'About Us',
    intro: 'A calm, structured day helps children learn with confidence and still have time to rest at home.',
    sections: [
      {
        heading: 'Regular school hours',
        body: 'Monday to Thursday: 7:45 AM – 2:15 PM. Friday: 7:45 AM – 11:45 AM. The school office stays open until 3:00 PM on weekdays for parent enquiries, certificates, and fee queries.',
      },
      {
        heading: 'Period timetable (demo)',
        body: 'Assembly 7:45–8:00. Period 1 8:05–8:45. Period 2 8:50–9:30. Period 3 9:35–10:15. Break 10:15–10:35. Period 4 10:40–11:20. Period 5 11:25–12:05. Lunch 12:05–12:40. Period 6 12:45–1:25. Period 7 1:30–2:15. Kindergarten finishes 30 minutes earlier on Mondays to Thursdays.',
      },
      {
        heading: 'Arrival and dismissal',
        body: 'Students may enter campus from 7:20 AM. Gates close at 8:00 AM. Late arrivals report to the office for a late slip. Afternoon pickup is from the designated parent bay or assigned bus bay. Transport routes are timed to these hours.',
      },
    ],
  },
  'about/curriculum': {
    title: 'Our Curriculum',
    eyebrow: 'About Us',
    intro: 'The curriculum balances academic mastery with social, moral, and intellectual growth in a relaxed classroom atmosphere.',
    sections: [
      {
        heading: 'Learning approach',
        body: 'We believe that children need a free and relaxed atmosphere to grow in, where they are trusted and the teachers are approachable. Lessons develop understanding, discussion, and practical skill — not only recall for a test.',
      },
      {
        heading: 'Core subjects',
        body: 'English, Mathematics, Science, Social Studies, Islamic Education or Moral Education, Arabic, and Information Technology. These are supported by Art, Music, Physical Education, and library periods every week.',
      },
      {
        heading: 'Stage pathways',
        body: 'Kindergarten focuses on play, language, and early number sense. Primary (Grades 1–5) builds literacy, numeracy, and curiosity. Middle school (Grades 6–8) adds labs, projects, and independent reading. Senior school (Grades 9–12) prepares students for board examinations, university counselling, and community service.',
      },
    ],
  },
  'about/assessments': {
    title: 'External Assessments',
    eyebrow: 'About Us',
    intro: 'External assessments help us measure progress against recognised standards while keeping classroom learning humane and balanced.',
    sections: [
      {
        heading: 'What we use them for',
        body: 'Results are shared with families and used to support each learner. They are never used to shame a child or to rank classrooms against one another in a public way.',
      },
      {
        heading: 'Demo assessment calendar',
        body: 'Grade 4 and Grade 8 benchmark tests in November. Grade 10 board practicals in January. Grade 12 pre-board examinations in December. International checkpoint-style papers for selected grades in March. Exact dates appear on the Academic Calendar and in Exam Notices.',
      },
      {
        heading: 'Support around exam days',
        body: 'Revision timetables, quiet rooms, and counsellor drop-ins are arranged before major external papers. Students who need extra time or a reader should inform the office at the start of the year so arrangements can be made.',
      },
    ],
  },
  'about/policies': {
    title: 'School Policies',
    eyebrow: 'About Us',
    intro: 'Clear policies keep the campus safe, respectful, and focused on the greater good.',
    sections: [
      {
        heading: 'Code of conduct',
        body: 'Students are expected to show courtesy, honesty, and care for others. Uniform must be complete on every working day. Mobile phones stay in bags unless a teacher asks for them. Bullying, unkind language, and damage to school property are taken seriously and recorded.',
      },
      {
        heading: 'Attendance and leave',
        body: 'A minimum of 90% attendance is expected. Planned leave is applied for in writing. Medical leave of more than two days needs a doctor’s note. Repeated unexplained absence is discussed with parents in a meeting, not only by a circular.',
      },
      {
        heading: 'Safeguarding',
        body: 'Child protection, first-aid, visitor badges, and locked campus gates are in place so every child can learn in a trusted environment. Concerns may be raised with the class teacher, counsellor, or Principal. Visitor entry is only through the main office.',
      },
    ],
  },
  information: {
    title: 'General Information',
    eyebrow: 'School Life',
    intro: 'Day-to-day information about the academic calendar, morning assembly, co-curricular activities, and how we assess learning.',
    sections: [
      {
        heading: 'Start here',
        body: 'Academic Calendar lists term dates and holidays. Assembly explains the morning gathering. Co-curricular Activities covers clubs and sports. Assessment describes internal tests and reports. Notices still carry last-minute changes.',
      },
      {
        heading: 'Who to contact',
        body: 'Class teachers handle daily queries. The office handles certificates, leave, and transport. The counsellor is available by appointment on Tuesdays and Thursdays after assembly.',
      },
    ],
  },
  'information/calendar': {
    title: 'Academic Calendar',
    eyebrow: 'General Information',
    intro: 'Official School Academic Calendar for 2026–27. Download the PDF for the complete list of term dates, holidays, and school events.',
    sections: [
      {
        heading: 'Official calendar PDF',
        body: 'The School Academic Calendar 2026–27 is published by Ibn Seena English High School. Use the download button on this page (or the Home page banner) to open the official PDF. If any date changes during the year, a General Notice will be issued.',
      },
      {
        heading: 'How to use this calendar',
        body: 'Plan travel and family events around published holidays and exam windows. For last-minute changes, check Notices and messages from class teachers. For calendar questions, contact the school office during working hours.',
      },
    ],
  },
  'information/assembly': {
    title: 'Assembly',
    eyebrow: 'General Information',
    intro: 'Assembly is a daily moment of togetherness, reflection, and shared values at the start of the school day.',
    sections: [
      {
        heading: 'Daily pattern',
        body: 'Assembly runs from 7:45 AM to 8:00 AM on the main courtyard, or in the auditorium during rain. It includes the school greeting, a short thought for the day, house announcements, and birthday wishes. Students stand with their class lines.',
      },
      {
        heading: 'Student roles',
        body: 'Each week a different class leads the thought, news reading, or a short performance. Prefects help with lines and silence. Special assemblies for National Day, farewell, and prize giving are announced in General Notices. Parents are welcome on those days.',
      },
      {
        heading: 'Why it matters',
        body: 'Assembly reminds everyone that wisdom is meant to be used for the greater good. It is also where urgent safety or timing messages are read so no child misses an update.',
      },
    ],
  },
  'information/activities': {
    title: 'Co-curricular Activities',
    eyebrow: 'General Information',
    intro: 'Co-curricular life at Ibn Seena is organised by stage — Primary, Junior, and Senior — so every child can take part in assemblies, ceremonies, clubs, and stage events suited to their age.',
    sections: [
      {
        heading: 'Browse by stage',
        body: 'Open Primary for lower-school ceremonies and activities, Junior for middle years, and Senior for upper-school events. New photo updates are published under the matching stage page after each programme.',
      },
      {
        heading: 'What we celebrate',
        body: 'Investiture ceremonies, assemblies, cultural programmes, sports days, and community events sit alongside academics so children grow socially and morally as well as intellectually.',
      },
    ],
  },
  'information/activities/primary': {
    title: 'Primary — Co-curricular Activities',
    eyebrow: 'General Information · Co-curricular Activities',
    intro: 'Primary stage programmes, ceremonies, and co-curricular moments from the Ibn Seena campus.',
    sections: [
      {
        heading: 'Primary Investiture Ceremony — Year 3',
        body: 'Date: 30 September 2026. Year 3 students were invested as primary leaders in a special ceremony on the school stage. The programme included the formal investiture, a procession with school flags, and a group performance for parents and teachers.',
      },
    ],
  },
  'information/activities/junior': {
    title: 'Junior — Co-curricular Activities',
    eyebrow: 'General Information · Co-curricular Activities',
    intro: 'Junior stage clubs, ceremonies, and co-curricular events will appear here as they are published.',
    sections: [
      {
        heading: 'Coming soon',
        body: 'Junior co-curricular photos and activity updates will be added after each programme. Please check back, or contact the school office for the latest junior calendar.',
      },
    ],
  },
  'information/activities/senior': {
    title: 'Senior — Co-curricular Activities',
    eyebrow: 'General Information · Co-curricular Activities',
    intro: 'Senior stage clubs, ceremonies, and co-curricular events will appear here as they are published.',
    sections: [
      {
        heading: 'Coming soon',
        body: 'Senior co-curricular photos and activity updates will be added after each programme. Please check back, or contact the school office for the latest senior calendar.',
      },
    ],
  },
  'information/assessment': {
    title: 'Assessment',
    eyebrow: 'General Information',
    intro: 'Assessment is used to understand each child and to guide teaching, not to create fear.',
    sections: [
      {
        heading: 'Internal assessment',
        body: 'Formative checks, notebooks, projects, orals, and two term examinations are balanced so academic achievement never comes at the expense of wellbeing. Kindergarten uses observation notes rather than percentage scores.',
      },
      {
        heading: 'Report cards (demo scale)',
        body: 'A+ 90–100. A 80–89. B 70–79. C 60–69. D 50–59. Below 50 is supported with a parent meeting and a simple improvement plan. Effort and conduct are reported separately from marks.',
      },
      {
        heading: 'Promotion',
        body: 'Promotion is based on year-long work, attendance, and the final term. A child who needs more time may be offered extra support in the next grade rather than public comparison with classmates.',
      },
    ],
  },
  fees: {
    title: 'Fees & Transport',
    eyebrow: 'Accounts Office',
    intro: 'Fee rules, bus information, and the annual fee structure are published so families can plan with clarity.',
    sections: [
      {
        heading: 'Three pages in this menu',
        body: 'Rules and Regulations explain due dates and late fees. Transport Information lists demo routes and safety rules. Fee Structure shows sample tuition and other charges by stage. Official circulars also appear under Fee Notices.',
      },
      {
        heading: 'Accounts desk',
        body: 'The accounts window is open 8:00 AM to 2:00 PM on working days. Receipts are issued for every payment. For a fee query write to accounts@ibnseena.edu with the student’s name and grade.',
      },
    ],
  },
  'fees/rules': {
    title: 'Rules and Regulations',
    eyebrow: 'Fees & Transport',
    intro: 'Fee payment rules and school regulations for families at Ibn Seena English High School. Always follow the latest Fee Notice for exact due dates.',
    sections: [
      {
        heading: 'Fee payment schedule',
        body: 'Tuition and transport fees are collected term-wise as announced in the Fee Notices. First Term fees for 2026–27 must be settled as per the published schedule (see Fee Notices). Online payment may be available when the portal is open. Keep receipts for every payment.',
      },
      {
        heading: 'Admission fee advance',
        body: 'At the time of admission, an advance of two months’ fees is collected in cash only, along with the required documents listed under Vacancy & Admissions. Registration / admission charges are non-refundable unless a circular states otherwise.',
      },
      {
        heading: 'Late payment',
        body: 'Parents are requested to pay on or before the due date published in Fee Notices. After the due date, a reminder is issued. Late fees or temporary withholding of report cards / certificates may apply as per the current circular.',
      },
      {
        heading: 'Sibling concession',
        body: 'A concession on tuition may be offered for the third and subsequent sibling studying at the same time, subject to school policy for that academic year. Transport and one-time fees are usually charged in full. Confirm the current concession with the accounts office.',
      },
      {
        heading: 'Accounts office',
        body: 'The accounts desk assists with fee queries during school working hours (Monday to Thursday as published). For written queries, contact the school office with the student’s full name, class, and receipt number.',
      },
      {
        heading: 'General school regulations',
        body: 'Students must wear the approved school uniform, arrive on time for assembly, and follow classroom and bus safety rules. Leave applications should go through the class teacher / office. Mobile phones and prohibited items are not allowed without permission. Serious misconduct is handled under school discipline policy.',
      },
    ],
  },
  'fees/transport': {
    title: 'Transport Information',
    eyebrow: 'Fees & Transport',
    intro: 'School transport covers selected residential areas with supervised pickup and drop-off. Routes below are demo examples.',
    sections: [
      {
        heading: 'Demo routes',
        body: 'Route A: North campus loop, first pickup 6:40 AM. Route B: Riverside apartments, first pickup 6:50 AM. Route C: Old town and market road, first pickup 6:55 AM. Route D: East villas, first pickup 7:00 AM. Afternoon drop follows the reverse order and finishes by 3:15 PM on regular days.',
      },
      {
        heading: 'Safety rules',
        body: 'Students sit in assigned seats, wear the seat belt, and follow the conductor. Eating on the bus is not allowed. Parents must be present at the drop point for KG and Grade 1. A missed pickup is reported to the office immediately.',
      },
      {
        heading: 'Registration',
        body: 'Transport is confirmed only after the route form and term fee are received. Seat changes mid-term depend on vacancy. Write to transport@ibnseena.edu to request a new stop.',
      },
    ],
  },
  'fees/structure': {
    title: 'Fee Structure',
    eyebrow: 'Fees & Transport',
    intro: 'The fee structure is reviewed annually and communicated through Fee Notices. Figures below are demo amounts for illustration.',
    sections: [
      {
        heading: 'Tuition (demo, per year)',
        body: 'Kindergarten: 18,000. Grades 1–5: 22,500. Grades 6–8: 26,000. Grades 9–10: 29,500. Grades 11–12: 32,000. Amounts are in the school’s accounting currency and exclude transport.',
      },
      {
        heading: 'Other charges (demo)',
        body: 'Registration (new students only): 1,500. Annual resource and lab fee: 1,200. Examination fee (senior school): 800. Transport: 4,800 to 7,200 depending on route. Activity clubs that use outside coaches may have a small extra fee announced in a circular.',
      },
      {
        heading: 'Official circular',
        body: 'Always use the latest Fee Notice PDF from the Notices page or collect a stamped copy from the accounts office. Website demo figures are replaced when the new academic circular is uploaded in Admin → Notices Manager.',
      },
    ],
  },
  alumni: {
    title: 'School Alumni',
    eyebrow: 'Ibn Seena Family',
    intro: 'Graduates remain part of the school long after they leave campus. This menu is the home of our alumni network.',
    sections: [
      {
        heading: 'Stay connected',
        body: 'Open Our Alumni to read news from graduates, mentor opportunities, and reunion dates. Write to alumni@ibnseena.edu to update your year, city, and occupation.',
      },
      {
        heading: 'How alumni help',
        body: 'Alumni visit for career talks, judge science fairs, and host short internships. Current students see that wisdom can be used for the greater good in many professions.',
      },
    ],
  },
  'alumni/our-alumni': {
    title: 'Our Alumni',
    eyebrow: 'School Alumni',
    intro: 'A growing network of Ibn Seena graduates in universities, public service, business, medicine, and the arts.',
    sections: [
      {
        heading: 'Alumni notes (demo)',
        body: 'Class of 2018: Amina Rahman is completing medicine. Class of 2020: Faris Al-Najjar interned in civil engineering. Class of 2022: Leah Joseph joined a community teaching fellowship. Class of 2024: Julian Rodriguez writes that the school’s emphasis on critical writing still guides his university essays.',
      },
      {
        heading: 'Reunions and visits',
        body: 'A campus reunion is hosted every January during winter break. Alumni may visit on working Fridays after 12:00 PM with a prior email to the office. Please bring a photo ID.',
      },
      {
        heading: 'Register or update your details',
        body: 'Email alumni@ibnseena.edu with your full name, years of study, current city, and a short note we may publish with your permission. Mentors for Grade 11 and 12 career talks are always welcome.',
      },
    ],
  },
  'alumni/ex-students': {
    title: 'Our Alumni',
    eyebrow: 'School Alumni',
    intro: 'A growing network of Ibn Seena graduates in universities, public service, business, medicine, and the arts.',
    sections: [
      {
        heading: 'Alumni notes (demo)',
        body: 'Class of 2018: Amina Rahman is completing medicine. Class of 2020: Faris Al-Najjar interned in civil engineering. Class of 2022: Leah Joseph joined a community teaching fellowship. Class of 2024: Julian Rodriguez writes that the school’s emphasis on critical writing still guides his university essays.',
      },
      {
        heading: 'Reunions and visits',
        body: 'A campus reunion is hosted every January during winter break. Alumni may visit on working Fridays after 12:00 PM with a prior email to the office. Please bring a photo ID.',
      },
      {
        heading: 'Register or update your details',
        body: 'Email alumni@ibnseena.edu with your full name, years of study, current city, and a short note we may publish with your permission. Mentors for Grade 11 and 12 career talks are always welcome.',
      },
    ],
  },
};
