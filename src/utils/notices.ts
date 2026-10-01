import { Notice } from '../types';

const SEEN_KEY = 'school_cms_seen_notices';

const publishedIds = (notices: Notice[]) =>
  notices.filter((notice) => notice.status === 'published').map((notice) => notice.id);

export const getUnseenNotices = (notices: Notice[]) => {
  let seen: number[] = [];
  try {
    seen = JSON.parse(localStorage.getItem(SEEN_KEY) || '[]');
  } catch {
    seen = [];
  }
  return notices.filter((notice) => notice.status === 'published' && !seen.includes(notice.id));
};

export const markNoticesSeen = (notices: Notice[]) => {
  localStorage.setItem(SEEN_KEY, JSON.stringify(publishedIds(notices)));
};
