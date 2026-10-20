/**
 * Soft launch: only these public pages are live.
 * Set to false / expand LIVE_PUBLIC_TABS when other pages are ready.
 */
export const SOFT_LAUNCH = true;

/** Public tabs allowed during soft launch (admin stays available by URL). */
export const LIVE_PUBLIC_TABS = [
  'home',
  'about/mission',
  'notices',
  'notices/general',
  'notices/fee',
] as const;

export type LivePublicTab = (typeof LIVE_PUBLIC_TABS)[number];

export const isLivePublicTab = (tab: string): boolean => {
  if (!SOFT_LAUNCH) return true;
  const key = tab.replace(/^\//, '').replace(/\/+$/, '') || 'home';
  if (key === 'admin' || key.startsWith('admin')) return true;
  return (LIVE_PUBLIC_TABS as readonly string[]).includes(key);
};

export const toLiveTab = (tab: string): string => {
  if (isLivePublicTab(tab)) {
    const key = tab.replace(/^\//, '').replace(/\/+$/, '') || 'home';
    return key || 'home';
  }
  return 'home';
};
