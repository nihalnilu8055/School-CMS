import { SiteGalleryPhoto, SiteImageValue } from '../types';

export type SiteImageSection =
  | 'branding'
  | 'home_welcome'
  | 'about'
  | 'page_heroes'
  | 'stage_cards'
  | 'activities_primary';

export interface SiteImagePlacementDef {
  id: string;
  section: SiteImageSection;
  sectionLabel: string;
  label: string;
  whereShown: string;
  defaultUrl: string;
  defaultCaption?: string;
  sync?: 'logo' | 'about_banner';
}

/** Growing photo galleries (add new photos — not fixed replace-only slots). */
export interface SitePhotoGalleryDef {
  key: string;
  section: SiteImageSection;
  sectionLabel: string;
  label: string;
  whereShown: string;
  defaults: { url: string; caption: string }[];
}

/** Single-image slots (upload replaces that one place). */
export const SITE_IMAGE_PLACEMENTS: SiteImagePlacementDef[] = [
  {
    id: 'logo',
    section: 'branding',
    sectionLabel: 'Branding',
    label: 'School logo',
    whereShown: 'Header, footer, and admin panel',
    defaultUrl: '/images/logo.png',
    sync: 'logo',
  },
  {
    id: 'welcome_main',
    section: 'home_welcome',
    sectionLabel: 'Home welcome photos',
    label: 'Home welcome — large photo',
    whereShown: 'Home page welcome section (big photo on the left)',
    defaultUrl: '/images/classroom.jpg',
  },
  {
    id: 'welcome_small_left',
    section: 'home_welcome',
    sectionLabel: 'Home welcome photos',
    label: 'Home welcome — bottom left photo',
    whereShown: 'Home page welcome section (small left photo)',
    defaultUrl: '/images/campus.jpg',
  },
  {
    id: 'welcome_small_right',
    section: 'home_welcome',
    sectionLabel: 'Home welcome photos',
    label: 'Home welcome — bottom right photo',
    whereShown: 'Home page welcome section (small right photo)',
    defaultUrl: '/images/lab.jpg',
  },
  {
    id: 'about_banner',
    section: 'about',
    sectionLabel: 'About page',
    label: 'About page top photo',
    whereShown: 'About Our School page banner',
    defaultUrl: '/images/campus.jpg',
    sync: 'about_banner',
  },
  {
    id: 'hero_about_mission',
    section: 'page_heroes',
    sectionLabel: 'Page top photos',
    label: 'Mission & Vision top photo',
    whereShown: '/about/mission',
    defaultUrl: '/images/students.jpg',
  },
  {
    id: 'hero_information',
    section: 'page_heroes',
    sectionLabel: 'Page top photos',
    label: 'General Information top photo',
    whereShown: '/information',
    defaultUrl: '/images/event-banner.jpg',
  },
  {
    id: 'hero_information_activities',
    section: 'page_heroes',
    sectionLabel: 'Page top photos',
    label: 'Co-curricular overview top photo',
    whereShown: '/information/activities',
    defaultUrl: '/images/sports.jpg',
  },
  {
    id: 'hero_information_activities_primary',
    section: 'page_heroes',
    sectionLabel: 'Page top photos',
    label: 'Primary activities top photo',
    whereShown: '/information/activities/primary',
    defaultUrl: '/images/activities/investiture-2.jpg',
  },
  {
    id: 'hero_information_activities_junior',
    section: 'page_heroes',
    sectionLabel: 'Page top photos',
    label: 'Junior activities top photo',
    whereShown: '/information/activities/junior',
    defaultUrl: '/images/students.jpg',
  },
  {
    id: 'hero_information_activities_senior',
    section: 'page_heroes',
    sectionLabel: 'Page top photos',
    label: 'Senior activities top photo',
    whereShown: '/information/activities/senior',
    defaultUrl: '/images/event-banner.jpg',
  },
  {
    id: 'hero_admissions',
    section: 'page_heroes',
    sectionLabel: 'Page top photos',
    label: 'Admissions top photo',
    whereShown: '/admissions',
    defaultUrl: '/images/students.jpg',
  },
  {
    id: 'hero_admissions_process',
    section: 'page_heroes',
    sectionLabel: 'Page top photos',
    label: 'Admission Process top photo',
    whereShown: '/admissions/process',
    defaultUrl: '/images/classroom.jpg',
  },
  {
    id: 'hero_admissions_register',
    section: 'page_heroes',
    sectionLabel: 'Page top photos',
    label: 'Documents & Registration top photo',
    whereShown: '/admissions/register',
    defaultUrl: '/images/computers.jpg',
  },
  {
    id: 'stage_primary_card',
    section: 'stage_cards',
    sectionLabel: 'Co-curricular cards',
    label: 'Primary stage card photo',
    whereShown: 'Co-curricular page — Primary card',
    defaultUrl: '/images/activities/investiture-2.jpg',
  },
  {
    id: 'stage_junior_card',
    section: 'stage_cards',
    sectionLabel: 'Co-curricular cards',
    label: 'Junior stage card photo',
    whereShown: 'Co-curricular page — Junior card',
    defaultUrl: '/images/students.jpg',
  },
  {
    id: 'stage_senior_card',
    section: 'stage_cards',
    sectionLabel: 'Co-curricular cards',
    label: 'Senior stage card photo',
    whereShown: 'Co-curricular page — Senior card',
    defaultUrl: '/images/event-banner.jpg',
  },
];

export const SITE_PHOTO_GALLERIES: SitePhotoGalleryDef[] = [
  {
    key: 'primary_investiture',
    section: 'activities_primary',
    sectionLabel: 'Primary Investiture photos',
    label: 'Primary Investiture gallery',
    whereShown: 'Primary activities page (/information/activities/primary)',
    defaults: [
      { url: '/images/activities/investiture-1.jpg', caption: 'Stage performance during the investiture programme' },
      { url: '/images/activities/investiture-2.jpg', caption: 'Year 3 leaders after the investiture' },
      { url: '/images/activities/investiture-3.jpg', caption: 'Welcome board and full hall view' },
      { url: '/images/activities/investiture-4.jpg', caption: 'Flag procession through the assembly hall' },
      { url: '/images/activities/investiture-5.jpg', caption: 'Badge pinning for a Year 3 student leader' },
    ],
  },
];

/** Upload destination list: clear UI places (not every photo slot). */
export type UploadDestination =
  | {
      kind: 'fixed';
      id: string;
      group: string;
      label: string;
      whereShown: string;
    }
  | {
      kind: 'gallery';
      id: string;
      group: string;
      label: string;
      whereShown: string;
    };

export const UPLOAD_DESTINATIONS: UploadDestination[] = [
  ...SITE_IMAGE_PLACEMENTS.map((item) => ({
    kind: 'fixed' as const,
    id: item.id,
    group: item.sectionLabel,
    label: item.label,
    whereShown: item.whereShown,
  })),
  ...SITE_PHOTO_GALLERIES.map((gallery) => ({
    kind: 'gallery' as const,
    id: gallery.key,
    group: gallery.sectionLabel,
    label: gallery.label,
    whereShown: gallery.whereShown,
  })),
];

export const HERO_IMAGE_KEYS: Record<string, string> = {
  'about/mission': 'hero_about_mission',
  information: 'hero_information',
  'information/activities': 'hero_information_activities',
  'information/activities/primary': 'hero_information_activities_primary',
  'information/activities/junior': 'hero_information_activities_junior',
  'information/activities/senior': 'hero_information_activities_senior',
  admissions: 'hero_admissions',
  'admissions/process': 'hero_admissions_process',
  'admissions/register': 'hero_admissions_register',
};

export const buildInitialSiteImages = (): Record<string, SiteImageValue> => {
  const map: Record<string, SiteImageValue> = {};
  SITE_IMAGE_PLACEMENTS.forEach((item) => {
    map[item.id] = {
      url: item.defaultUrl,
      caption: item.defaultCaption || '',
      updated_at: new Date().toISOString(),
    };
  });
  return map;
};

export const buildInitialSiteGalleries = (): Record<string, SiteGalleryPhoto[]> => {
  const map: Record<string, SiteGalleryPhoto[]> = {};
  SITE_PHOTO_GALLERIES.forEach((gallery) => {
    map[gallery.key] = gallery.defaults.map((item, index) => ({
      id: index + 1,
      url: item.url,
      caption: item.caption,
      updated_at: new Date().toISOString(),
    }));
  });
  return map;
};
