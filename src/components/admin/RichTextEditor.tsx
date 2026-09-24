import React from 'react';
import { Bold, Italic, Underline, List, ListOrdered, Link, Heading1, Heading2, Quote, Code } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (val: string) => void;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ value, onChange }) => {
  const insertTag = (startTag: string, endTag: string) => {
    onChange(`${value}\n${startTag}New Content${endTag}`);
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
