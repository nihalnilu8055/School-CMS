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
    intro: 'Ibn Seena English High School welcomes new families whenever a seat is available. This page explains how admission works, how to register online, and where to check current vacancies.',
    sections: [
      {
        heading: 'Who can apply',
        body: 'Admission is open to boys and girls who meet the age criteria for the requested grade. Applications are accepted throughout the year, subject to vacancy. Priority is given to siblings of current students and to families who complete documents on time.',
      },
      {
        heading: 'What you will find in this menu',
        body: 'Use Admission Process for the step-by-step journey, Online Registration to start an enquiry, and Vacancies for a demo list of open seats by grade. The Admissions button in the header also opens a short enquiry form.',
      },
      {
        heading: 'Admissions desk',
        body: 'Visit the school office Monday to Friday, 8:00 AM to 3:00 PM, or write to admissions@ibnseena.edu. Please bring the child’s birth certificate, previous report card, passport-size photographs, and parent identification.',
      },
    ],
  },
  'admissions/process': {
    title: 'Admission Process',
    eyebrow: 'Vacancy & Admissions',
    intro: 'Admission is simple, transparent, and matched to vacancy. Families complete four steps from enquiry to confirmed enrolment.',
    sections: [
      {
        heading: 'Step 1 — Enquiry & online registration',
        body: 'Submit the online registration form with the child’s name, date of birth, last school attended, and the grade you are applying for. Our admissions team replies within two working days with an appointment or a wait-list note if the grade is full.',
      },
      {
        heading: 'Step 2 — Interaction and placement review',
        body: 'The child meets a teacher for a friendly interaction. We look at language comfort, number sense, and social readiness. This is not a high-pressure exam. It helps us place the learner in the right class without sacrificing wellbeing.',
      },
      {
        heading: 'Step 3 — Offer of admission',
        body: 'If a seat is available and the interaction is successful, the school issues a written offer with the fee schedule, uniform list, and joining date. Offers remain valid for seven working days.',
      },
      {
        heading: 'Step 4 — Confirmation',
        body: 'Pay the registration fee, submit original documents for verification, and collect the welcome pack. Transport and after-school activity requests can be added at this stage if routes and clubs have space.',
      },
    ],
  },
  'admissions/register': {
    title: 'Online Registration',
    eyebrow: 'Vacancy & Admissions',
    intro: 'Begin your application online. This demo form captures an enquiry; the admissions office then schedules the next visit.',
    sections: [
      {
        heading: 'How to start',
        body: 'Click Apply for Admissions in the header, or send an email to admissions@ibnseena.edu with the subject “New Registration”. Include the child’s full name, date of birth, current grade, and preferred joining term.',
      },
      {
        heading: 'Documents to keep ready',
        body: 'Birth certificate, latest report card, transfer certificate (if moving from another school), vaccination record, two passport photographs, and a copy of parent Emirates ID or passport. Soft copies are accepted for the first enquiry; originals are checked at confirmation.',
      },
      {
        heading: 'What happens next',
        body: 'You will receive an acknowledgement and a proposed interaction slot. Incomplete forms are held for five days. After that the enquiry is closed and you may register again.',
      },
    ],
  },
  'admissions/vacancies': {
    title: 'Vacancies',
    eyebrow: 'Vacancy & Admissions',
    intro: 'Seat availability changes during the year. The list below is demo data for the current academic year so families can see how vacancies are published.',
    sections: [
      {
        heading: 'Open seats (demo)',
        body: 'KG 1: 6 seats. KG 2: 4 seats. Grade 1: 3 seats. Grade 2: wait-list only. Grade 3: 2 seats. Grade 4: 1 seat. Grade 5: wait-list only. Grade 6: 4 seats. Grade 7: 2 seats. Grade 8: 3 seats. Grade 9: 2 seats. Grade 10: 1 seat. Grade 11: 3 seats (Science and Commerce). Grade 12: limited, contact office.',
      },
      {
        heading: 'Wait-list policy',
        body: 'When a grade shows wait-list only, names are recorded in the order received. A seat is offered by phone and email. Families have 48 hours to accept. Sibling applicants are moved one place forward on the same list.',
      },
      {
        heading: 'Confirm a vacancy',
        body: 'Always confirm with the office before planning a transfer. Call +1 (555) 234-5678 or visit during working hours. This page is updated whenever a circular is issued in Fee Notices or General Notices.',
      },
    ],
  },
  about: {
    title: 'About Us',
    eyebrow: 'Ibn Seena English High School',
    intro: 'A school that values academic achievement without sacrificing a child’s social, moral, and psychological growth.',
    sections: [
      {
        heading: 'Who we are',
        body: 'Ibn Seena English High School is committed to producing a universal human being: a person with not just robotic information at his command, but the wisdom to use it for the greater good. Children learn in a free and relaxed atmosphere, where they are trusted and teachers are approachable.',
      },
      {
        heading: 'Explore this menu',
        body: 'Mission & Vision explains our philosophy. School Timing lists the daily timetable. Our Curriculum and External Assessments describe what students study and how progress is measured. School Policies cover conduct and safeguarding.',
      },
    ],
  },
  'about/mission': {
    title: 'Mission & Vision',
    eyebrow: 'About Us',
    intro: 'Ibn Seena English High School is committed to academic achievement without sacrificing the wider growth of every child.',
    sections: [
      {
        heading: 'Establishment philosophy',
        body: 'The philosophy behind the establishment of Ibn Seena English High School as a premier educational institution has been that while academic achievement is a necessary focus, it should not need to be at the expense of other areas of a child’s development.',
      },
      {
        heading: 'Holistic development',
        body: 'By placing an equal emphasis on a child’s social, moral and psychological development, students who graduate from this institution are well equipped to deal with real-world challenges. Classrooms stay calm, relationships stay respectful, and curiosity is protected.',
      },
      {
        heading: 'Our vision',
        body: 'Nurturing Social, Moral, and Intellectual Wisdom for the Greater Good. We want learners who can use knowledge with kindness, courage, and responsibility.',
      },
      {
        heading: 'Our mission',
        body: 'To provide a trusted, approachable learning community where children grow in wisdom, not only in information, and leave school ready to serve their families and society.',
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
    intro: 'The academic year is organised around two terms, assessment windows, and community events. Dates below are demo data for 2026–27.',
    sections: [
      {
        heading: 'Term dates (demo)',
        body: 'Term 1: 1 September 2026 to 17 December 2026. Winter break: 18 December 2026 to 4 January 2027. Term 2: 5 January 2027 to 25 June 2027. Spring break: 22 March 2027 to 2 April 2027. Last working day for students: 25 June 2027.',
      },
      {
        heading: 'Key events',
        body: 'Parent orientation: 8 September. National Day assembly: 2 December. Sports Day: 12 February. Science Fair: 18 March. Annual Day: 15 May. Report-card days are published two weeks in advance through General Notices.',
      },
      {
        heading: 'How updates are issued',
        body: 'If a holiday or exam date changes, the school posts a notice and updates this page. Please check Notices before planning travel during term time.',
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
    intro: 'Clubs and activities sit alongside academics so children can grow socially and morally as well as intellectually.',
    sections: [
      {
        heading: 'Clubs (demo list)',
        body: 'Debate and Model United Nations. Science and Robotics. Art and Calligraphy. Choir and School Band. Eco Club. Community Service. Chess. Photography. Participation is encouraged but never forced, in keeping with our relaxed and trusting atmosphere.',
      },
      {
        heading: 'Sports',
        body: 'Football, basketball, athletics, badminton, and swimming (seasonal) run after Period 7 on selected days. House matches are held each term. A medical fitness note is required for competitive teams.',
      },
      {
        heading: 'How to join',
        body: 'Club lists open in the first two weeks of Term 1. Students give two preferences to the class teacher. Most clubs meet once a week. Changes after October need a parent note.',
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
    intro: 'Fee and transport rules are published so families can plan. The points below are demo regulations for this website.',
    sections: [
      {
        heading: 'Payment schedule',
        body: 'Tuition is collected in three instalments: at confirmation of admission, before 10 October, and before 10 February. Transport is billed term-wise. Activity and examination fees are billed when the event is announced.',
      },
      {
        heading: 'Late payment and refunds',
        body: 'A reminder is sent after the due date. A late fee of a small fixed amount (see the current Fee Notice) applies after seven days. Registration fees are non-refundable. Tuition refunds for mid-year withdrawal follow the circular issued each June.',
      },
      {
        heading: 'Sibling concession',
        body: 'A 10% concession on tuition is offered for the third and subsequent sibling studying at the same time. Transport and one-time fees are charged in full. Concessions are reviewed each academic year.',
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
