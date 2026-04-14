import { X } from "lucide-react";
import { memo, useCallback, useRef, useState } from "react";
import { useI18n } from "../i18n";

export const FileUpload = memo(({ setFile }) => {
  const { t } = useI18n();
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];

    if (!file) {
      setFileName("");
      return;
    }

    setFile(file);
    setFileName(file.name);
  }, [setFile]);

  const handleRemove = useCallback(() => {
    setFile(null);
    setFileName("");
    fileInputRef.current.value = null;
  }, [setFile]);

  return (
    <div className="space-y-3">
      {/* Hidden input */}
      <input
        type="file"
        accept="image/jpg, image/jpeg, image/png"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Button */}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="rounded-2xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-3 text-sm font-medium text-zinc-700 dark:text-zinc-200 transition hover:bg-zinc-50 dark:hover:bg-zinc-700"
      >
        {t("forms.chooseFile")}
      </button>

      {/* Show selected file */}
      {fileName && (
        <p className="text-sm text-zinc-600 dark:text-zinc-300">{t("forms.selected")} {fileName} 
          <button
          onClick={handleRemove}
          className="p-1 rounded hover:bg-gray-200 transition">
            <X className="h-4 w-4" />
          </button>
        </p> 
      )}
    </div>
  );
})


