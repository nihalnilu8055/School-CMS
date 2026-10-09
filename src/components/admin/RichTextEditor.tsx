import React, { useRef } from 'react';
import { Bold, Italic, List, Heading2, Quote, ImagePlus } from 'lucide-react';
import { readFileAsDataUrl } from '../../utils/files';

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const imageInputRef = useRef<HTMLInputElement>(null);

  const insertTag = (startTag: string, endTag: string) => {
    onChange(`${value}\n${startTag}New Content${endTag}`);
  };

  const insertImage = async (file?: File) => {
    if (!file) return;
    const url = await readFileAsDataUrl(file);
    onChange(`${value}\n<p><img src="${url}" alt="${file.name}" style="max-width:100%;height:auto;border-radius:12px;" /></p>`);
  };

  return (
    <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-white dark:bg-slate-800">
      {/* Formatting Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <button
          type="button"
          onClick={() => insertTag('<strong>', '</strong>')}
          className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
          title="Bold"
        >
          <Bold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => insertTag('<em>', '</em>')}
          className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
          title="Italic"
        >
          <Italic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => insertTag('<h2>', '</h2>')}
          className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => insertTag('<ul><li>', '</li></ul>')}
          className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => insertTag('<blockquote>', '</blockquote>')}
          className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
          title="Quote"
        >
          <Quote className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => imageInputRef.current?.click()}
          className="p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200"
          title="Upload image"
        >
          <ImagePlus className="w-4 h-4" />
        </button>
        <input
          ref={imageInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            insertImage(e.target.files?.[0]);
            e.target.value = '';
          }}
        />
        <span className="text-xs text-slate-400 ml-auto pr-2">Rich HTML Mode</span>
      </div>

      {/* Editor Text Area */}
      <textarea
        rows={8}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-4 outline-none bg-transparent text-sm font-sans text-slate-900 dark:text-white leading-relaxed resize-y"
        placeholder="Write your article or page content HTML..."
      />
    </div>
  );
};
