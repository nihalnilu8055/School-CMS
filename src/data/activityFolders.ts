import { ActivityFolder } from '../types';

export const ACTIVITY_STAGES = [
  { key: 'primary' as const, label: 'Primary', path: 'information/activities/primary' },
  { key: 'junior' as const, label: 'Junior', path: 'information/activities/junior' },
  { key: 'senior' as const, label: 'Senior', path: 'information/activities/senior' },
];

export const INITIAL_ACTIVITY_FOLDERS: ActivityFolder[] = [
  {
    id: 1,
    stage: 'primary',
    title: 'HAPPY FAMILY DAY',
    slug: 'happy-family-day',
    byline: 'FS2',
    event_date: '2026-09-24',
    cover_image: '/images/activities/happy-family-day/04.jpg',
    description: 'Primary FS2 Happy Family Day classroom activities with parents and grandparents.',
    is_published: true,
    created_at: '2026-09-24T10:00:00.000Z',
    photos: [
      { id: 1, url: '/images/activities/happy-family-day/01.jpg', caption: 'FS2 classroom activity during Happy Family Day' },
      { id: 2, url: '/images/activities/happy-family-day/02.jpg', caption: 'Teacher and student discussion' },
      { id: 3, url: '/images/activities/happy-family-day/03.jpg', caption: 'Grandparents Day session with FS2' },
      { id: 4, url: '/images/activities/happy-family-day/04.jpg', caption: 'FS2 class group photo — Happy Family Day' },
    ],
  },
  {
    id: 2,
    stage: 'primary',
    title: 'Primary Investiture Ceremony',
    slug: 'primary-investiture',
    byline: 'Year 3',
    event_date: '2026-09-30',
    cover_image: '/images/activities/investiture-2.jpg',
    description: 'Year 3 students were invested as primary leaders with badge pinning and a school-flag procession.',
    is_published: true,
    created_at: '2026-09-30T10:00:00.000Z',
    photos: [
      { id: 1, url: '/images/activities/investiture-1.jpg', caption: 'Stage performance during the investiture programme' },
      { id: 2, url: '/images/activities/investiture-2.jpg', caption: 'Year 3 leaders after the investiture' },
      { id: 3, url: '/images/activities/investiture-3.jpg', caption: 'Welcome board and full hall view' },
      { id: 4, url: '/images/activities/investiture-4.jpg', caption: 'Flag procession through the assembly hall' },
      { id: 5, url: '/images/activities/investiture-5.jpg', caption: 'Badge pinning for a Year 3 student leader' },
    ],
  },
  {
    id: 10,
    stage: 'senior',
    title: 'Islamic Activity',
    slug: 'islamic-activity',
    byline: 'Senior',
    event_date: '2026-11-01',
    cover_image: '/images/activities/islamic-activity/01.jpg',
    description: 'Senior Islamic Activity programmes and photo updates.',
    is_published: true,
    created_at: '2026-11-25T04:57:34.629Z',
    photos: [
      { id: 1, url: '/images/activities/islamic-activity/01.jpg', caption: 'Islamic Activity photo 1' },
      { id: 2, url: '/images/activities/islamic-activity/02.jpg', caption: 'Islamic Activity photo 2' },
      { id: 3, url: '/images/activities/islamic-activity/03.jpg', caption: 'Islamic Activity photo 3' },
    ],
  },
];

export const formatActivityDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
};
