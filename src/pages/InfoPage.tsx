import React from 'react';
import { useSite } from '../context/SiteContext';
import { PAGE_CONTENT } from '../data/pageContent';
import { relatedNavForSlug, menusToNavGroups, NAV_GROUPS } from '../data/navigation';
import { PageHero } from '../components/public/PageHero';
import { SafeImage } from '../components/common/SafeImage';
import { NewsItem } from '../types';
import {
  ArrowRight,
  Clock,
  MapPin,
  Phone,
  Mail,
  GraduationCap,
  BookOpen,
  Users,
  Award,
  ShieldCheck,
  Calendar,
  Sparkles,
  CheckCircle2,
  Bus,
  Target,
  Heart,
  FileText,
  DollarSign,
  Zap,
  Check,
  UserCheck,
  Newspaper
} from 'lucide-react';

interface InfoPageProps {
  slug: string;
}

// Granular distinct hero images per route
const ROUTE_HERO_IMAGES: Record<string, string> = {
  about: '/images/campus.jpg',
  'about/mission': '/images/students.jpg',
  'about/timing': '/images/hallway.jpg',
  'about/curriculum': '/images/lab.jpg',
  'about/assessments': '/images/classroom-2.jpg',
  'about/policies': '/images/campus.jpg',
  admissions: '/images/students.jpg',
  'admissions/process': '/images/classroom.jpg',
  'admissions/register': '/images/computers.jpg',
  'admissions/vacancies': '/images/campus.jpg',
  information: '/images/event-banner.jpg',
  'information/calendar': '/images/campus.jpg',
  'information/assembly': '/images/campus.jpg',
  'information/activities': '/images/sports.jpg',
  'information/activities/primary': '/images/activities/investiture-2.jpg',
  'information/activities/junior': '/images/students.jpg',
  'information/activities/senior': '/images/event-banner.jpg',
  'information/assessment': '/images/lab.jpg',
  fees: '/images/campus.jpg',
  'fees/rules': '/images/hallway.jpg',
  'fees/transport': '/images/school-bus.jpg',
  'fees/structure': '/images/computers.jpg',
  alumni: '/images/students.jpg',
  'alumni/our-alumni': '/images/students.jpg',
  'alumni/ex-students': '/images/classroom-2.jpg',
};

// Route-specific blog highlights (ensures a DIFFERENT blog is shown on right sidebar per page)
const ROUTE_BLOG_MAPPING: Record<string, Partial<NewsItem>> = {
  about: {
    id: 101,
    title: 'Ibn Seena Students Awarded 1st Prize at National Science Olympiad',
    category_name: 'Academics & Research',
    featured_image: '/images/lab.jpg',
    excerpt: 'Our high school science team secured 1st place with their solar microgrid project.',
    publish_date: '2026-09-28T10:00:00.000Z'
  },
  'about/mission': {
    id: 102,
    title: 'Nurturing Moral and Intellectual Wisdom for the Greater Good',
    category_name: 'School Philosophy',
    featured_image: '/images/students.jpg',
    excerpt: 'How our holistic curriculum prepares students for real-world leadership and community service.',
    publish_date: '2026-09-25T09:00:00.000Z'
  },
  'about/timing': {
    id: 103,
    title: 'Morning Assembly & Timetable Adjustments for Winter Term',
    category_name: 'Campus Life',
    featured_image: '/images/hallway.jpg',
    excerpt: 'Key details regarding gate arrival times, assembly lines, and Friday early dismissal.',
    publish_date: '2026-09-22T08:00:00.000Z'
  },
  'about/curriculum': {
    id: 104,
    title: 'Reading Week Turns Library into an Interactive Story Village',
    category_name: 'Academics',
    featured_image: '/images/library.jpg',
    excerpt: 'Primary classes spent five days with guest authors, book talks, and quiet reading corners.',
    publish_date: '2026-09-12T08:30:00.000Z'
  },
  'about/assessments': {
    id: 105,
    title: 'Grade 10 & 12 External Examination Preparation Benchmarks',
    category_name: 'Academics',
    featured_image: '/images/classroom-2.jpg',
    excerpt: 'Guidance and revision schedules for upcoming board practicals and international assessments.',
    publish_date: '2026-09-08T11:00:00.000Z'
  },
  'about/policies': {
    id: 106,
    title: 'Updated Campus Safeguarding & Student Wellbeing Guidelines',
    category_name: 'Policies',
    featured_image: '/images/campus.jpg',
    excerpt: 'Reinforcing our commitment to child protection, respectful behavior, and safety on campus.',
    publish_date: '2026-09-02T10:00:00.000Z'
  },
  admissions: {
    id: 107,
    title: 'Admissions Open for Academic Year 2026–2027',
    category_name: 'Admissions Spotlight',
    featured_image: '/images/classroom.jpg',
    excerpt: 'Enrolment details, available seats, and document requirements for new applicant families.',
    publish_date: '2026-09-30T10:00:00.000Z'
  },
  'admissions/process': {
    id: 108,
    title: 'Friendly Placement Interaction Guide for New Parents',
    category_name: 'Admissions Spotlight',
    featured_image: '/images/classroom.jpg',
    excerpt: 'What to expect during your child’s informal readiness review at our admissions desk.',
    publish_date: '2026-09-26T09:00:00.000Z'
  },
  'admissions/register': {
    id: 109,
    title: 'Online Application Portal Now Active for Fast-Track Enquiries',
    category_name: 'Admissions Spotlight',
    featured_image: '/images/computers.jpg',
    excerpt: 'Submit child registration online and receive your placement slot within 2 working days.',
    publish_date: '2026-09-24T12:00:00.000Z'
  },
  'admissions/vacancies': {
    id: 110,
    title: 'Mid-Term Grade Seat Availability & Waitlist Circular',
    category_name: 'Admissions Spotlight',
    featured_image: '/images/campus.jpg',
    excerpt: 'Check current seat openings across KG 1 to Grade 11 and sibling priority rules.',
    publish_date: '2026-09-20T08:00:00.000Z'
  },
  information: {
    id: 111,
    title: 'Art Studio Exhibits Student Work for Parents’ Evening',
    category_name: 'Campus Life',
    featured_image: '/images/art.jpg',
    excerpt: 'Paintings, clay models, and calligraphy from Grades 3 to 12 are on display in the atrium.',
    publish_date: '2026-08-29T10:00:00.000Z'
  },
  'information/calendar': {
    id: 112,
    title: 'Annual Academic Calendar & Key Holiday Dates 2026–2027',
    category_name: 'General Info',
    featured_image: '/images/campus.jpg',
    excerpt: 'Plan ahead for term dates, exam windows, National Day celebrations, and sports meets.',
    publish_date: '2026-09-15T10:00:00.000Z'
  },
  'information/assembly': {
    id: 113,
    title: 'Student Leadership Prefect Installation Ceremony',
    category_name: 'Campus Life',
    featured_image: '/images/campus.jpg',
    excerpt: 'Newly elected student council members lead their first morning assembly and pledge service.',
    publish_date: '2026-09-10T09:00:00.000Z'
  },
  'information/activities': {
    id: 114,
    title: 'Football Team Opens the Season with a 3–1 Home Victory',
    category_name: 'Sports & Athletics',
    featured_image: '/images/soccer.jpg',
    excerpt: 'Senior boys squad started the interschool league with an energetic home win.',
    publish_date: '2026-08-22T16:00:00.000Z'
  },
  'fees/structure': {
    id: 115,
    title: 'Accounts Desk Circular: Term Instalments & Online Payment',
    category_name: 'Fee Notice',
    featured_image: '/images/computers.jpg',
    excerpt: 'Guidelines on settling term tuition, sibling discounts, and digital receipts.',
    publish_date: '2026-09-18T10:00:00.000Z'
  },
  'fees/transport': {
    id: 116,
    title: 'School Bus Supervised Fleet Safety & Route Upgrades',
    category_name: 'Transport Notice',
    featured_image: '/images/school-bus.jpg',
    excerpt: 'New bus stops added across Riverside and North Campus loops with full conductor supervision.',
    publish_date: '2026-09-14T09:00:00.000Z'
  },
  alumni: {
    id: 117,
    title: 'Alumni Spotlight: Graduating Cohort Excel in Universities Worldwide',
    category_name: 'School Alumni',
    featured_image: '/images/students.jpg',
    excerpt: 'Ibn Seena alumni share stories of medical, engineering, and civic accomplishments.',
    publish_date: '2026-09-01T10:00:00.000Z'
  }
};

const go = (tab: string) => {
  window.history.pushState({}, '', `/${tab}`);
  window.dispatchEvent(new PopStateEvent('popstate'));
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

export const InfoPage: React.FC<InfoPageProps> = ({ slug }) => {
  const { pages, menus, events, news, settings } = useSite();
  const cmsPage = pages.find((page) => page.slug === slug);
  const fallback = PAGE_CONTENT[slug];
  const isLive = Boolean(cmsPage?.is_published) || (!cmsPage && Boolean(fallback));
  const cmsGroups = menusToNavGroups(menus);
  const group =
    (cmsGroups.length ? cmsGroups : NAV_GROUPS).find((item) => slug === item.key || slug.startsWith(`${item.key}/`)) ||
    relatedNavForSlug(slug);

  const title = cmsPage?.title || fallback?.title || 'Page';
  const eyebrow = cmsPage?.eyebrow || fallback?.eyebrow || group?.label || 'Ibn Seena English High School';
  const intro = cmsPage?.intro || fallback?.intro || '';
  
  const heroImage = ROUTE_HERO_IMAGES[slug] || '/images/campus.jpg';

  // Select 1 SPECIFIC/DIFFERENT blog for the right sidebar based on current route
  const publishedNews = news.filter((n) => n.status === 'published');
  const routeBlogFallback = ROUTE_BLOG_MAPPING[slug];
  
  // Pick distinct published news or route-specific blog
  const sidebarBlogIndex = Math.abs(slug.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % (publishedNews.length || 1);
  const activeSidebarBlog = publishedNews[sidebarBlogIndex] || routeBlogFallback || {
    id: 999,
    title: `Latest Updates from ${title}`,
    category_name: 'School News',
    featured_image: heroImage,
    excerpt: `Discover the latest academic highlights, campus events, and news related to ${title.toLowerCase()}.`,
    publish_date: new Date().toISOString()
  };

  const html =
    (cmsPage?.content && cmsPage.content.trim()) ||
    fallback?.sections.map((section) => `<h2>${section.heading}</h2><p>${section.body}</p>`).join('') ||
    '';

  if (!isLive) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold font-heading text-[#005530]">Page not found</h1>
        <p className="text-slate-500 mt-3">This page is unpublished or does not exist yet.</p>
        <button
          onClick={() => go('')}
          className="mt-6 inline-flex items-center gap-2 bg-[#005530] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#004428] transition-colors"
        >
          Return to Home <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-20 animate-fadeIn">
      {/* Dynamic Header Hero with Topic-Specific Photography */}
      <PageHero eyebrow={eyebrow} title={title} intro={intro} image={heroImage} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Dynamic Content Area */}
          <article className="lg:col-span-8 space-y-10">

            {/* Specialized Rich UI Block for Mission & Vision */}
            {slug === 'about/mission' && (
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-[#d4e8dc] text-[#005530] flex items-center justify-center mb-6">
                      <Target className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#005530]">Our Vision</span>
                    <h2 className="text-xl font-bold font-heading text-[#005530] mt-2 mb-4">Ready for the real world</h2>
                    <p className="text-[#17202A] leading-relaxed text-sm">
                      {fallback?.sections.find((section) => section.heading.toLowerCase().includes('vision'))?.body
                        || 'By placing an equal emphasis on a child’s social, moral and psychological development, students who would graduate from such an institution are well equipped to deal with real world challenges.'}
                    </p>
                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-[#005530]">
                      <Sparkles className="w-4 h-4 text-amber-500" /> Wisdom • Integrity • Courage
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-[#005530] to-[#004428] rounded-3xl p-8 text-white shadow-md relative overflow-hidden">
                    <div className="w-12 h-12 rounded-2xl bg-white/10 text-[#8fceb0] flex items-center justify-center mb-6">
                      <Heart className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#8fceb0]">Our Mission</span>
                    <h2 className="text-xl font-bold font-heading text-white mt-2 mb-4">The whole child first</h2>
                    <p className="text-white leading-relaxed text-sm">
                      {fallback?.sections.find((section) => section.heading.toLowerCase().includes('mission'))?.body
                        || 'The philosophy behind the establishment of Ibn Seena English High School as a premier educational institution has been that while academic achievement is a necessary focus, it should not need to be at the expense of other areas of a child’s development.'}
                    </p>
                    <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-xs font-semibold text-[#b7d0c4]">
                      <ShieldCheck className="w-4 h-4 text-[#8fceb0]" /> Trusted Learning Environment
                    </div>
                  </div>
                </div>

                {fallback?.sections.find((section) => section.heading.toLowerCase().includes('how we teach')) && (
                  <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-bold font-heading text-[#005530] mb-4">How we teach</h3>
                    <p className="text-[#17202A] leading-relaxed text-sm sm:text-base">
                      {fallback.sections.find((section) => section.heading.toLowerCase().includes('how we teach'))?.body}
                    </p>
                  </div>
                )}

                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                  <h3 className="text-lg font-bold font-heading text-[#005530] mb-6 flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#005530]" /> Core Pillars of Development
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <h4 className="font-bold text-[#005530] text-sm mb-1">Academic Mastery</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Concept clarity, critical thinking, and structured curriculum inquiry.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <h4 className="font-bold text-[#005530] text-sm mb-1">Moral Integrity</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Instilling strong values, respect, honesty, and empathy in all interactions.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <h4 className="font-bold text-[#005530] text-sm mb-1">Psychological Growth</h4>
                      <p className="text-xs text-slate-500 leading-relaxed">Fostering emotional resilience, self-confidence, and mental wellbeing.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Official admission rules and document lists */}
            {slug === 'admissions' && (
              <div className="space-y-8">
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#d4e8dc] text-[#005530] flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold font-heading text-[#005530]">Admission rules</h2>
                      <p className="text-xs text-slate-500">Entrance test, seat order, and FS2 registration</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {[
                      'All admissions are subjected to passing an entrance test and are based on first come first serve basis.',
                      'The highest scorer will get the first chance.',
                      'There will be no retest.',
                      'For FS2 the admission requests are filled and submitted online on the date announced. Only the required number of forms will be accepted and others will be rejected as explained on the website when admissions are opened.',
                    ].map((rule) => (
                      <li key={rule} className="flex gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <CheckCircle2 className="w-5 h-5 text-[#005530] shrink-0 mt-0.5" />
                        <p className="text-sm text-slate-700 leading-relaxed">{rule}</p>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                  <h2 className="text-xl font-bold font-heading text-[#005530] mb-2">Documents required at admission</h2>
                  <p className="text-sm text-slate-500 mb-6">Both original and photocopy must be produced. All photocopies should be on A4 size paper.</p>

                  <div className="space-y-8">
                    <div>
                      <h3 className="font-bold font-heading text-[#005530] mb-3">Classes FS2, Year 1 and Year 2</h3>
                      <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 leading-relaxed">
                        <li>Original Passport with a valid residence visa + 1 Photocopy</li>
                        <li>Original Birth Certificate (must be in English or Arabic) + 1 Photocopy</li>
                        <li>Two Passport size photographs</li>
                        <li>One photocopy of Father’s passport with valid residence visa</li>
                        <li>Advance of two months’ fees (cash only)</li>
                        <li>Copy of Vaccination Card</li>
                        <li>Original Emirates ID + 1 Photocopy</li>
                        <li>All the photocopies of the above documents should be on A4 size paper</li>
                        <li>SIS No. of Nursery if attended in Sharjah or Ajman</li>
                        <li>Those students who transfer from a school in the UAE must bring their Medical File from the previous school</li>
                      </ol>
                    </div>

                    <div>
                      <h3 className="font-bold font-heading text-[#005530] mb-1">Year 3 to Year 13</h3>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#004428] mb-3">A. Transfer within Ajman &amp; Sharjah</p>
                      <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 leading-relaxed">
                        <li>Students coming from other systems (other than British system) must provide a School Leaving Certificate attested by the Ministry of Education + SIS No. (Sharjah + Ajman) + Report Card Attested.</li>
                        <li>Students coming from the British system must provide a Transfer Certificate Attested by The Ministry of Education + SIS No. (Sharjah + Ajman) + Report Card attested.</li>
                        <li>Original Passport with a valid residence visa + 1 photocopy of the same</li>
                        <li>One Photocopy of Father’s Passport with Valid Residence visa</li>
                        <li>One Passport size photograph of Student</li>
                        <li>Advance of two months’ fees (cash only)</li>
                        <li>Original Birth Certificate (must be in English or Arabic) + 1 Photocopy</li>
                        <li>Original Emirates ID + 1 Photocopy</li>
                        <li>Latest Report Card attested by the Ministry of Education</li>
                        <li>Copy of Vaccination Card</li>
                        <li>Those students who transfer from a school in the UAE must bring their Medical File from the previous school</li>
                        <li>All the photocopies of the above documents should be on A4 size paper</li>
                      </ol>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-[#004428] mb-3">B. Transfer outside UAE</p>
                      <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 leading-relaxed mb-4">
                        <li>Students coming from India, Pakistan, Bangladesh, Sri Lanka or other systems (other than British system) must provide School Leaving Certificate attested + Report Card attested.</li>
                        <li>Students coming from the British system must provide a Transfer Certificate duly attested.</li>
                        <li>All candidates of all systems must provide a Report Card duly attested.</li>
                      </ol>
                      <div className="p-5 rounded-2xl bg-[#e6f0eb] border border-[#b7d0c4]">
                        <p className="text-sm font-bold text-[#005530] mb-2">All out of UAE documents must be attested by:</p>
                        <ol className="list-decimal pl-5 space-y-1.5 text-sm text-slate-700 leading-relaxed">
                          <li>The Ministry of Education or education Bureau of the country</li>
                          <li>The Ministry of Foreign Affairs of the country</li>
                          <li>The Embassy or the Consulate of UAE in the country</li>
                          <li>The TC / Leaving certificate should mention that the student has passed and been promoted to the next class (the class admission is sought in)</li>
                        </ol>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold font-heading text-[#005530] mb-3">Additional documents for all admissions from outside the UAE</h3>
                      <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 leading-relaxed">
                        <li>Original Passport with a valid residence visa + 1 Copy</li>
                        <li>One Photocopy of Father’s Passport with Valid Residence visa</li>
                        <li>One Passport size photograph of Student</li>
                        <li>Advance of two months’ fees (cash only)</li>
                        <li>Original Birth Certificate (must be in English or Arabic) + 1 Photocopy</li>
                        <li>Original Emirates ID + 1 Photocopy</li>
                        <li>Latest Report Card of the last class attested in the same manner as the TC</li>
                        <li>All the photocopies of the above documents should be on A4 size paper</li>
                      </ol>
                      <p className="mt-4 text-xs text-slate-500">*NOTE: Subject to change by the Ministry of Education.</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                  <h2 className="text-xl font-bold font-heading text-[#005530] mb-4">Requirements for admission test</h2>
                  <ol className="list-decimal pl-5 space-y-2 text-sm text-slate-700 leading-relaxed">
                    <li>Candidates must bring the Report Card of the previous school.</li>
                    <li>If the student wants to transfer in midterm, he/she must bring the latest report card from the current school.</li>
                  </ol>
                  <div className="mt-6 p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm leading-relaxed">
                    Parents are requested to be honest when filling the registration and admission forms because withholding information or giving false information is dishonest.
                  </div>
                </div>
              </div>
            )}

            {/* Specialized Rich UI Block for Admission Process */}
            {slug === 'admissions/process' && (
              <div className="space-y-8">
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-[#d4e8dc] text-[#005530] flex items-center justify-center font-bold">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold font-heading text-[#005530]">4-Step Admission Journey</h2>
                      <p className="text-xs text-slate-500">Simple, transparent, and matched to available seats</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        step: '01',
                        title: 'Enquiry & Online Registration',
                        desc: 'Submit the online registration form with the child’s name, date of birth, previous school, and target grade. Our admissions desk responds within 2 working days.',
                        icon: FileText
                      },
                      {
                        step: '02',
                        title: 'Interaction & Placement Review',
                        desc: 'The child meets a teacher for an encouraging, friendly interaction focusing on language comfort, number sense, and social readiness.',
                        icon: Users
                      },
                      {
                        step: '03',
                        title: 'Offer of Admission',
                        desc: 'Upon successful interaction and availability, a formal written offer with fee schedules and uniform lists is issued (valid for 7 working days).',
                        icon: CheckCircle2
                      },
                      {
                        step: '04',
                        title: 'Enrolment Confirmation',
                        desc: 'Complete fee payment, submit original verified documents, collect the welcome kit, and confirm transport routes or after-school activities.',
                        icon: UserCheck
                      }
                    ].map((st) => (
                      <div key={st.step} className="flex gap-4 p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#b7d0c4] transition-colors">
                        <div className="shrink-0 w-12 h-12 rounded-2xl bg-[#005530] text-[#8fceb0] flex flex-col items-center justify-center font-heading font-bold text-lg shadow-sm">
                          {st.step}
                        </div>
                        <div>
                          <h3 className="font-bold font-heading text-[#005530] text-base mb-1">{st.title}</h3>
                          <p className="text-sm text-slate-600 leading-relaxed">{st.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-6 rounded-2xl bg-[#e6f0eb] border border-[#b7d0c4] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold text-[#005530]">Ready to begin enrolment?</h4>
                      <p className="text-xs text-slate-600">Register online or visit our admissions desk today.</p>
                    </div>
                    <button
                      onClick={() => go('admissions/register')}
                      className="shrink-0 bg-[#005530] text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-[#004428] transition-colors"
                    >
                      Start Registration
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Specialized Rich UI Block for Vacancies */}
            {slug === 'admissions/vacancies' && (
              <div className="space-y-8">
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                    <div>
                      <h2 className="text-xl font-bold font-heading text-[#005530]">Grade Seat Availability</h2>
                      <p className="text-xs text-slate-500">Live seat availability for the current academic session</p>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-[#e6f0eb] text-[#004428] text-xs font-semibold border border-[#b7d0c4] flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#005530] animate-pulse"></span> Academic Year 2026-27
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { grade: 'KG 1', seats: '6 Seats Available', status: 'Open', color: 'green' },
                      { grade: 'KG 2', seats: '4 Seats Available', status: 'Open', color: 'green' },
                      { grade: 'Grade 1', seats: '3 Seats Available', status: 'Open', color: 'green' },
                      { grade: 'Grade 2', seats: 'Wait-list Only', status: 'Waitlist', color: 'amber' },
                      { grade: 'Grade 3', seats: '2 Seats Available', status: 'Open', color: 'green' },
                      { grade: 'Grade 4', seats: '1 Seat Available', status: 'Limited', color: 'amber' },
                      { grade: 'Grade 5', seats: 'Wait-list Only', status: 'Waitlist', color: 'amber' },
                      { grade: 'Grade 6', seats: '4 Seats Available', status: 'Open', color: 'green' },
                      { grade: 'Grade 7', seats: '2 Seats Available', status: 'Open', color: 'green' },
                      { grade: 'Grade 8', seats: '3 Seats Available', status: 'Open', color: 'green' },
                      { grade: 'Grade 9', seats: '2 Seats Available', status: 'Open', color: 'green' },
                      { grade: 'Grade 10', seats: '1 Seat Available', status: 'Limited', color: 'amber' },
                      { grade: 'Grade 11', seats: 'Science & Commerce', status: 'Open', color: 'green' },
                      { grade: 'Grade 12', seats: 'Contact Admissions Desk', status: 'Limited', color: 'blue' },
                    ].map((v, i) => (
                      <div key={i} className="p-4 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-[#b7d0c4] transition-all shadow-2xs">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold text-[#005530] text-sm">{v.grade}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            v.color === 'green' ? 'bg-[#d4e8dc] text-[#003822]' :
                            v.color === 'amber' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'
                          }`}>
                            {v.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600">{v.seats}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs leading-relaxed">
                    <strong>Notice:</strong> Seats are filled on a first-come, first-served basis. Sibling applicants receive priority placement on wait-listed grades.
                  </div>
                </div>
              </div>
            )}

            {/* Specialized Rich UI Block for School Timing */}
            {slug === 'about/timing' && (
              <div className="space-y-8">
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                  <h2 className="text-xl font-bold font-heading text-[#005530] mb-6 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-[#005530]" /> Daily Campus Timetable
                  </h2>

                  <div className="space-y-3">
                    {[
                      { time: '07:20 AM - 07:45 AM', activity: 'Campus Gate Open & Arrival', note: 'Students gather in designated house line-ups' },
                      { time: '07:45 AM - 08:00 AM', activity: 'Morning Assembly & Thought of the Day', note: 'Courtyard or Auditorium during wet weather' },
                      { time: '08:05 AM - 10:15 AM', activity: 'Periods 1 to 3 (Core Subjects)', note: 'Classroom teaching & lab practicals' },
                      { time: '10:15 AM - 10:35 AM', activity: 'Morning Recess Break', note: 'Healthy snack & playground activity' },
                      { time: '10:40 AM - 12:05 PM', activity: 'Periods 4 & 5 (Language & STEM)', note: 'Interactive learning & project work' },
                      { time: '12:05 PM - 12:40 PM', activity: 'Lunch Break & Prayer Time', note: 'Cafeteria & activity fields' },
                      { time: '12:45 PM - 02:15 PM', activity: 'Periods 6 & 7 (Co-curricular & Sports)', note: 'Clubs, library, and sports sessions' },
                      { time: '02:15 PM', activity: 'Regular Campus Dismissal', note: 'Bus departure & parent pickup gate opens' },
                    ].map((slot, i) => (
                      <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 gap-2">
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-xs font-bold px-3 py-1 rounded-xl bg-[#d4e8dc] text-[#005530]">
                            {slot.time}
                          </span>
                          <span className="font-bold text-[#005530] text-sm">{slot.activity}</span>
                        </div>
                        <span className="text-xs text-slate-500 sm:text-right">{slot.note}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-[#e6f0eb] border border-[#b7d0c4]">
                      <h4 className="font-bold text-[#005530] text-xs uppercase tracking-wider mb-1">Friday Early Timetable</h4>
                      <p className="text-xs text-slate-600">Friday session concludes at 11:45 AM for all students and staff.</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-[#e6f0eb] border border-[#b7d0c4]">
                      <h4 className="font-bold text-[#005530] text-xs uppercase tracking-wider mb-1">Kindergarten Hours</h4>
                      <p className="text-xs text-slate-600">KG 1 & KG 2 conclude 30 minutes earlier (1:45 PM Mon-Thu).</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Specialized Rich UI Block for Fee Structure */}
            {slug === 'fees/structure' && (
              <div className="space-y-8">
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                  <h2 className="text-xl font-bold font-heading text-[#005530] mb-6 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[#005530]" /> Annual Fee Structure
                  </h2>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 text-xs font-bold text-[#005530] uppercase bg-slate-50">
                          <th className="py-3 px-4 rounded-l-xl">Academic Stage</th>
                          <th className="py-3 px-4">Grades Covered</th>
                          <th className="py-3 px-4">Annual Tuition</th>
                          <th className="py-3 px-4 rounded-r-xl">Term Instalment</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-slate-700">
                        <tr>
                          <td className="py-3.5 px-4 font-semibold text-[#005530]">Kindergarten</td>
                          <td className="py-3.5 px-4 text-xs">KG 1 & KG 2</td>
                          <td className="py-3.5 px-4 font-bold text-[#004428]">18,000 AED</td>
                          <td className="py-3.5 px-4 text-xs">6,000 × 3 Terms</td>
                        </tr>
                        <tr>
                          <td className="py-3.5 px-4 font-semibold text-[#005530]">Primary School</td>
                          <td className="py-3.5 px-4 text-xs">Grade 1 to 5</td>
                          <td className="py-3.5 px-4 font-bold text-[#004428]">22,500 AED</td>
                          <td className="py-3.5 px-4 text-xs">7,500 × 3 Terms</td>
                        </tr>
                        <tr>
                          <td className="py-3.5 px-4 font-semibold text-[#005530]">Middle School</td>
                          <td className="py-3.5 px-4 text-xs">Grade 6 to 8</td>
                          <td className="py-3.5 px-4 font-bold text-[#004428]">26,000 AED</td>
                          <td className="py-3.5 px-4 text-xs">8,666 × 3 Terms</td>
                        </tr>
                        <tr>
                          <td className="py-3.5 px-4 font-semibold text-[#005530]">Secondary School</td>
                          <td className="py-3.5 px-4 text-xs">Grade 9 & 10</td>
                          <td className="py-3.5 px-4 font-bold text-[#004428]">29,500 AED</td>
                          <td className="py-3.5 px-4 text-xs">9,833 × 3 Terms</td>
                        </tr>
                        <tr>
                          <td className="py-3.5 px-4 font-semibold text-[#005530]">Senior Secondary</td>
                          <td className="py-3.5 px-4 text-xs">Grade 11 & 12</td>
                          <td className="py-3.5 px-4 font-bold text-[#004428]">32,000 AED</td>
                          <td className="py-3.5 px-4 text-xs">10,666 × 3 Terms</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <h4 className="font-bold text-[#005530] text-xs uppercase mb-1">Registration Fee</h4>
                      <p className="text-base font-bold text-[#004428]">1,500 AED</p>
                      <p className="text-[11px] text-slate-500 mt-1">One-time payment upon admission</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <h4 className="font-bold text-[#005530] text-xs uppercase mb-1">Lab & Resource Fee</h4>
                      <p className="text-base font-bold text-[#004428]">1,200 AED</p>
                      <p className="text-[11px] text-slate-500 mt-1">Annual resource contribution</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                      <h4 className="font-bold text-[#005530] text-xs uppercase mb-1">Sibling Concession</h4>
                      <p className="text-base font-bold text-[#004428]">10% Off</p>
                      <p className="text-[11px] text-slate-500 mt-1">Applied to 3rd & subsequent child</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Specialized Rich UI Block for Transport */}
            {slug === 'fees/transport' && (
              <div className="space-y-8">
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                  <h2 className="text-xl font-bold font-heading text-[#005530] mb-6 flex items-center gap-2">
                    <Bus className="w-5 h-5 text-[#005530]" /> Supervised School Bus Routes
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { route: 'Route A — North Campus Loop', time: '06:40 AM Pickup', areas: 'North Avenue, University District, Al Majaz' },
                      { route: 'Route B — Riverside & Central', time: '06:50 AM Pickup', areas: 'Riverside Towers, City Center, Corniche' },
                      { route: 'Route C — Old Town & Market', time: '06:55 AM Pickup', areas: 'Heritage Area, Market Road, Souk District' },
                      { route: 'Route D — East Villas & Suburbs', time: '07:00 AM Pickup', areas: 'East Villas, Green Gardens, Outer Highway' },
                    ].map((r, i) => (
                      <div key={i} className="p-5 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#b7d0c4] transition-all">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-bold font-heading text-[#005530] text-sm">{r.route}</span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#d4e8dc] text-[#003822]">{r.time}</span>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">{r.areas}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-6 rounded-2xl bg-[#005530] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <h4 className="font-bold font-heading text-white">Need a bus stop closer to your residence?</h4>
                      <p className="text-xs text-[#b7d0c4]">Email transport@ibnseena.edu for custom route requests.</p>
                    </div>
                    <button
                      onClick={() => go('contact')}
                      className="shrink-0 bg-white text-[#005530] px-4 py-2.5 rounded-xl font-semibold text-xs hover:bg-[#e6f0eb] transition-colors"
                    >
                      Request Stop
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Co-curricular overview — Primary / Junior / Senior */}
            {slug === 'information/activities' && (
              <div className="space-y-8">
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                  <h2 className="text-xl font-bold font-heading text-[#005530] mb-2 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#005530]" /> Co-curricular by stage
                  </h2>
                  <p className="text-sm text-slate-500 mb-6">Choose Primary, Junior, or Senior to view ceremonies, programmes, and photo updates.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { key: 'information/activities/primary', name: 'Primary', desc: 'Year 3 investiture and primary stage activities.', image: '/images/activities/investiture-2.jpg' },
                      { key: 'information/activities/junior', name: 'Junior', desc: 'Junior stage clubs and co-curricular events.', image: '/images/students.jpg' },
                      { key: 'information/activities/senior', name: 'Senior', desc: 'Senior stage programmes and celebrations.', image: '/images/event-banner.jpg' },
                    ].map((stage) => (
                      <button
                        key={stage.key}
                        type="button"
                        onClick={() => go(stage.key)}
                        className="text-left rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 hover:border-[#b7d0c4] hover:bg-white transition-all"
                      >
                        <div className="h-36 overflow-hidden bg-[#e6f0eb]">
                          <SafeImage src={stage.image} alt={stage.name} type="academic" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-5">
                          <h3 className="font-bold font-heading text-[#005530] text-base">{stage.name}</h3>
                          <p className="text-xs text-slate-600 leading-relaxed mt-1">{stage.desc}</p>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#005530] mt-3">
                            View page <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Primary activities — Investiture Ceremony gallery */}
            {slug === 'information/activities/primary' && (
              <div className="space-y-8">
                <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-[#004428]">30 September 2026</p>
                      <h2 className="text-xl font-bold font-heading text-[#005530] mt-1">Primary Investiture Ceremony — Year 3</h2>
                      <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-2xl">
                        Year 3 students were invested as primary leaders. The ceremony included badge pinning, a school-flag procession, and a stage performance for parents and teachers.
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { src: '/images/activities/investiture-1.jpg', caption: 'Stage performance during the investiture programme' },
                      { src: '/images/activities/investiture-2.jpg', caption: 'Year 3 leaders after the investiture' },
                      { src: '/images/activities/investiture-3.jpg', caption: 'Welcome board and full hall view' },
                      { src: '/images/activities/investiture-4.jpg', caption: 'Flag procession through the assembly hall' },
                      { src: '/images/activities/investiture-5.jpg', caption: 'Badge pinning for a Year 3 student leader' },
                    ].map((photo) => (
                      <figure key={photo.src} className="rounded-2xl overflow-hidden border border-slate-100 bg-slate-50">
                        <div className="aspect-[4/3] overflow-hidden bg-[#e6f0eb]">
                          <SafeImage src={photo.src} alt={photo.caption} type="academic" className="w-full h-full object-cover" />
                        </div>
                        <figcaption className="p-3 text-xs text-slate-600 leading-relaxed">{photo.caption}</figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Main Page HTML Content (Clean, elegant, no extra image section inside) */}
            {slug !== 'about/mission' && slug !== 'admissions' && slug !== 'admissions/process' && slug !== 'information/activities' && slug !== 'information/activities/primary' && (
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm space-y-6">
              <div
                className="space-y-6 text-slate-700 [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:font-bold [&_h2]:font-heading [&_h2]:text-[#005530] [&_h2]:mt-4 [&_p]:leading-relaxed [&_p]:text-[15px] [&_p]:text-slate-600 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-2"
                dangerouslySetInnerHTML={{ __html: html }}
              />

              {/* Dynamic Events widget for Calendar route */}
              {slug === 'information/calendar' && events.length > 0 && (
                <div className="mt-10 pt-8 border-t border-slate-100 space-y-4">
                  <h2 className="text-2xl font-bold font-heading text-[#005530]">Upcoming School Events</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[...events].sort((a, b) => a.event_date.localeCompare(b.event_date)).map((evt) => (
                      <article key={evt.id} className="rounded-2xl border border-slate-100 bg-slate-50 p-5 hover:border-[#b7d0c4] transition-all">
                        <p className="text-xs font-bold uppercase tracking-wider text-[#004428]">
                          {new Date(evt.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </p>
                        <h3 className="font-heading font-bold text-[#005530] mt-1 text-base">{evt.title}</h3>
                        <p className="text-xs text-slate-600 mt-1">{evt.description}</p>
                        <div className="mt-3 space-y-1 text-xs text-slate-500">
                          <p className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[#005530]" />{evt.start_time} - {evt.end_time}</p>
                          <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#005530]" />{evt.location}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              )}
            </div>
            )}

            {/* Bottom Call to Action Banner */}
            <div className="rounded-3xl bg-gradient-to-br from-[#005530] to-[#004428] p-8 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold font-heading">Have specific questions about {title}?</h3>
                <p className="text-xs text-[#b7d0c4] mt-1 max-w-md">
                  Our administrative desk is available Monday through Friday from 8:00 AM to 3:00 PM to assist you.
                </p>
              </div>
              <button
                onClick={() => go('contact')}
                className="shrink-0 bg-white text-[#005530] px-6 py-3 rounded-2xl font-bold text-sm hover:bg-[#e6f0eb] transition-all shadow-sm flex items-center gap-2"
              >
                Contact Admissions <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </article>

          {/* Sidebar Navigation & RIGHT SIDE 1 MODERN BLOG CARD MODEL */}
          <aside className="lg:col-span-4 space-y-6">
            
            {/* Sub-menu Quick Navigation */}
            {group?.children?.length ? (
              <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-wider text-[#004428] mb-4 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" /> {group.label} Section
                </p>
                <div className="space-y-1.5">
                  <button
                    onClick={() => go(group.key)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                      slug === group.key
                        ? 'bg-[#005530] text-white shadow-sm'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>Overview</span>
                    {slug === group.key && <Check className="w-4 h-4 text-[#8fceb0]" />}
                  </button>
                  {group.children.map((child) => (
                    <button
                      key={child.key}
                      onClick={() => go(child.key)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-between ${
                        slug === child.key
                          ? 'bg-[#005530] text-white shadow-sm'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{child.label}</span>
                      {slug === child.key && <Check className="w-4 h-4 text-[#8fceb0]" />}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            {/* EXACTLY 1 MODERN BLOG CARD ON THE RIGHT SIDEBAR (Customized per Page) */}
            <div className="rounded-3xl bg-white border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all space-y-4 group">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#004428] flex items-center gap-1.5">
                  <Newspaper className="w-4 h-4 text-[#005530]" /> Featured School Blog
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#d4e8dc] text-[#003822]">
                  {activeSidebarBlog.category_name || 'Blog'}
                </span>
              </div>

              {/* Single Blog Modern Visual Container */}
              <div
                onClick={() => go('news')}
                className="cursor-pointer space-y-3"
              >
                <div className="h-44 rounded-2xl overflow-hidden relative bg-slate-100">
                  <SafeImage
                    src={activeSidebarBlog.featured_image || heroImage}
                    alt={activeSidebarBlog.title || title}
                    type="news"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-[#005530]/90 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#8fceb0]" />
                    {new Date(activeSidebarBlog.publish_date || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>

                <div>
                  <h4 className="font-heading font-bold text-base text-[#005530] leading-snug group-hover:text-[#003822] transition-colors">
                    {activeSidebarBlog.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                    {activeSidebarBlog.excerpt}
                  </p>
                </div>
              </div>

              <button
                onClick={() => go('news')}
                className="w-full text-center bg-[#005530] hover:bg-[#004428] text-white font-bold text-xs py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-2xs"
              >
                Read Full Blog Story <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick School Contact Desk Card */}
            <div className="rounded-3xl bg-white border border-slate-100 p-6 shadow-sm space-y-4">
              <h3 className="font-heading font-bold text-base text-[#005530] flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#005530]" /> Admissions Desk
              </h3>
              
              <div className="space-y-3 text-xs text-slate-600">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>{settings.address}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-semibold text-slate-800">{settings.phone}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-semibold text-slate-800">{settings.email}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{settings.working_hours}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => go('contact')}
                  className="w-full text-center bg-slate-100 hover:bg-[#e6f0eb] text-[#005530] font-bold text-xs py-3 rounded-xl transition-colors"
                >
                  Send Online Enquiry
                </button>
              </div>
            </div>

          </aside>
        </div>
      </section>
    </div>
  );
};
