export interface NavChild {
  key: string;
  label: string;
}

export interface NavGroup {
  key: string;
  label: string;
  children?: NavChild[];
}

export const NAV_GROUPS: NavGroup[] = [
  {
    key: 'about',
    label: 'About Us',
    children: [
      { key: 'about/mission', label: 'Mission & Vision' },
      { key: 'about/staff', label: 'Faculty & Staff' },
      { key: 'about/timing', label: 'School Timing' },
      { key: 'about/curriculum', label: 'Our Curriculum' },
      { key: 'about/assessments', label: 'External Assessments' },
      { key: 'about/policies', label: 'School Policies' },
    ],
  },
  {
    key: 'admissions',
    label: 'Vacancy & Admissions',
    children: [
      { key: 'admissions/process', label: 'Admission Process' },
      { key: 'admissions/register', label: 'Online Registration' },
      { key: 'admissions/vacancies', label: 'Vacancies' },
    ],
  },
  {
    key: 'information',
    label: 'General Information',
    children: [
      { key: 'information/calendar', label: 'Academic Calendar' },
      { key: 'information/assembly', label: 'Assembly' },
      { key: 'information/activities', label: 'Co-curricular Activities' },
      { key: 'information/assessment', label: 'Assessment' },
    ],
  },
  {
    key: 'fees',
    label: 'Fees & Transport',
    children: [
      { key: 'fees/rules', label: 'Rules and Regulations' },
      { key: 'fees/transport', label: 'Transport Information' },
      { key: 'fees/structure', label: 'Fee Structure' },
    ],
  },
  {
    key: 'alumni',
    label: 'School Alumni',
    children: [
      { key: 'alumni/our-alumni', label: 'Our Alumni' },
    ],
  },
  {
    key: 'notices',
    label: 'Notices',
    children: [
      { key: 'notices/general', label: 'General Notices' },
      { key: 'notices/fee', label: 'Fee Notices' },
    ],
  },
];

export const relatedNavForSlug = (slug: string) =>
  NAV_GROUPS.find((group) => slug === group.key || slug.startsWith(`${group.key}/`));

export const urlToTab = (url: string) => url.replace(/^\//, '').replace(/\/+$/, '') || 'home';

export const menusToNavGroups = (
  menus: { id: number; title: string; url: string; location: string; parent_id?: number | null; order_index: number; is_active: boolean }[]
): NavGroup[] => {
  const header = menus
    .filter((item) => item.location === 'header' && item.is_active)
    .sort((a, b) => a.order_index - b.order_index);
  const parents = header.filter((item) => !item.parent_id);

  return parents.map((parent) => ({
    key: urlToTab(parent.url),
    label: parent.title,
    children: header
      .filter((child) => child.parent_id === parent.id)
      .sort((a, b) => a.order_index - b.order_index)
      .map((child) => ({
        key: urlToTab(child.url),
        label: child.title,
      })),
  }));
};

export const isNavActive = (currentTab: string, group: NavGroup) => {
  if (currentTab === group.key) return true;
  if (currentTab.startsWith(`${group.key}/`)) return true;
  if (group.key === 'about' && currentTab === 'staff') return true;
  if (group.key === 'notices' && currentTab.startsWith('notices')) return true;
  return false;
};
