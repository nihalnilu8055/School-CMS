import React, { useRef, useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';
import { describeFileType, formatFileSize, readFileAsDataUrl } from '../../utils/files';

interface FileUploadFieldProps {
  label: string;
  value: string;
  onChange: (url: string, meta?: { name: string; size: string; type: string }) => void;
  accept?: string;
  hint?: string;
  required?: boolean;
}

const MAX_BYTES = 8 * 1024 * 1024;

export const FileUploadField: React.FC<FileUploadFieldProps> = ({
  label,
  value,
  onChange,
  accept = 'image/*,.pdf,.doc,.docx,.xls,.xlsx',
  hint,
  required,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [fileName, setFileName] = useState('');

  const applyFile = async (file?: File) => {
    if (!file) return;
    if (file.size > MAX_BYTES) {
      setError('Please choose a file under 8 MB.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const url = await readFileAsDataUrl(file);
      setFileName(file.name);
      onChange(url, {
        name: file.name,
        size: formatFileSize(file.size),
        type: describeFileType(file),
      });
    } catch {
      setError('Could not read that file. Try another one.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-2">
      <p className="block font-bold text-slate-700 dark:text-slate-300 uppercase text-[11px] tracking-wide">{label}</p>
      <div
        className="rounded-xl border border-dashed border-[#b7d0c4] bg-[#e6f0eb]/60 p-3 space-y-3"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          applyFile(e.dataTransfer.files?.[0]);
        }}
      >
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="inline-flex items-center gap-2 bg-[#005530] hover:bg-[#004428] text-white font-semibold text-xs px-3.5 py-2 rounded-lg"
          >
            <Upload className="w-4 h-4" />
            {busy ? 'Uploading…' : 'Choose file'}
          </button>
          {value && (
            <button
              type="button"
              onClick={() => {
                onChange('');
                setFileName('');
                setError('');
                if (inputRef.current) inputRef.current.value = '';
              }}
              className="inline-flex items-center gap-1 text-xs text-red-600 font-semibold"
            >
              <X className="w-3.5 h-3.5" /> Remove
            </button>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          required={required && !value}
          className="hidden"
          onChange={(e) => {
            applyFile(e.target.files?.[0]);
            e.target.value = '';
          }}
        />
        {fileName && (
          <p className="flex items-center gap-2 text-xs text-slate-600">
            <FileText className="w-4 h-4 text-[#005530]" />
            {fileName}
          </p>
        )}
        <input
          type="text"
          value={value.startsWith('data:') ? '' : value}
          onChange={(e) => {
            setFileName('');
            onChange(e.target.value);
          }}
          placeholder="Or paste an image / file URL"
          className="w-full px-3.5 py-2 rounded-lg bg-white border border-[#b7d0c4] text-sm text-slate-900"
        />
        {hint && <p className="text-[11px] text-slate-500">{hint}</p>}
        {error && <p className="text-[11px] text-red-600 font-semibold">{error}</p>}
      </div>
    </div>
  );
};
