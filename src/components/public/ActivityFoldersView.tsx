import React, { useMemo, useState } from 'react';
import { useSite } from '../../context/SiteContext';
import { ActivityStage } from '../../types';
import { formatActivityDate } from '../../data/activityFolders';
import { SafeImage } from '../common/SafeImage';
import { ArrowLeft, Calendar, FolderOpen, User, Images } from 'lucide-react';

interface ActivityFoldersViewProps {
  stage: ActivityStage;
  stageLabel: string;
}

export const ActivityFoldersView: React.FC<ActivityFoldersViewProps> = ({ stage, stageLabel }) => {
  const { activityFolders } = useSite();
  const [openFolderId, setOpenFolderId] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  const folders = useMemo(
    () =>
      activityFolders
        .filter((folder) => folder.stage === stage && folder.is_published)
        .sort((a, b) => (b.event_date || '').localeCompare(a.event_date || '')),
    [activityFolders, stage]
  );

  const openFolder = folders.find((folder) => folder.id === openFolderId) || null;

  if (openFolder) {
    return (
      <div className="space-y-6">
        <button
          type="button"
          onClick={() => setOpenFolderId(null)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#005530] hover:text-[#004428]"
        >
          <ArrowLeft className="w-4 h-4" /> Back to {stageLabel} folders
        </button>

        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-[#004428] flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatActivityDate(openFolder.event_date)}
              </span>
              {openFolder.byline && (
                <span className="inline-flex items-center gap-1">
                  <User className="w-3.5 h-3.5" />
                  By {openFolder.byline}
                </span>
              )}
            </p>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#005530] mt-2">{openFolder.title}</h2>
            {openFolder.description && (
              <p className="text-sm text-slate-600 mt-2 leading-relaxed max-w-3xl">{openFolder.description}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {openFolder.photos.map((photo) => (
              <figure key={photo.id} className="rounded-2xl overflow-hidden border border-slate-100 bg-slate-50">
                <button
                  type="button"
                  onClick={() => setLightbox(photo.url)}
                  className="block w-full aspect-[4/3] overflow-hidden bg-[#e6f0eb]"
                >
                  <SafeImage
                    src={photo.url}
                    alt={photo.caption || openFolder.title}
                    type="academic"
                    className="w-full h-full object-cover hover:scale-[1.02] transition duration-300"
                  />
                </button>
                {photo.caption && (
                  <figcaption className="p-3 text-xs text-slate-600 leading-relaxed">{photo.caption}</figcaption>
                )}
              </figure>
            ))}
          </div>

          {openFolder.photos.length === 0 && (
            <p className="text-sm text-slate-500 text-center py-10">This folder has no photos yet.</p>
          )}
        </div>

        {lightbox && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <img src={lightbox} alt="" className="max-h-[85vh] max-w-full rounded-2xl object-contain" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-sm space-y-6">
      <div>
        <h2 className="text-xl font-bold font-heading text-[#005530] flex items-center gap-2">
          <FolderOpen className="w-5 h-5" /> {stageLabel} activity folders
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Open a folder to view the photos for that activity or event.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {folders.map((folder) => (
          <button
            key={folder.id}
            type="button"
            onClick={() => setOpenFolderId(folder.id)}
            className="text-left rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 hover:border-[#b7d0c4] hover:bg-white transition-all group"
          >
            <div className="relative h-44 overflow-hidden bg-[#e6f0eb]">
              <SafeImage
                src={folder.cover_image || folder.photos[0]?.url || '/images/campus.jpg'}
                alt={folder.title}
                type="academic"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition duration-300"
              />
              <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/95 text-[10px] font-bold uppercase tracking-wide text-[#005530] border border-[#b7d0c4]">
                <FolderOpen className="w-3.5 h-3.5" /> Folder
              </span>
              <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#005530] text-white text-[10px] font-bold">
                <Images className="w-3.5 h-3.5" /> {folder.photos.length}
              </span>
            </div>
            <div className="p-5 space-y-1.5">
              <h3 className="font-bold font-heading text-[#005530] text-base">{folder.title}</h3>
              <p className="text-xs text-slate-500 flex flex-wrap gap-x-3 gap-y-1">
                <span>{formatActivityDate(folder.event_date)}</span>
                {folder.byline && <span>By {folder.byline}</span>}
              </p>
              {folder.description && (
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{folder.description}</p>
              )}
              <span className="inline-flex text-xs font-semibold text-[#005530] pt-1">Open folder →</span>
            </div>
          </button>
        ))}
      </div>

      {folders.length === 0 && (
        <div className="text-center py-14 text-slate-500 text-sm">
          No activity folders uploaded for {stageLabel} yet.
        </div>
      )}
    </div>
  );
};
