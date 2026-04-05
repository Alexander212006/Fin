import { X } from "lucide-react";
import { useRef, useState } from "react";
import { useI18n } from "../i18n";

export const FileUpload = ({ setFile }) => {
  const { t } = useI18n();
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setFileName("");
      return;
    }

    setFile(file);
    setFileName(file.name);
  };

  const handleRemove = () => {
    setFile(null);
    setFileName("");
    fileInputRef.current.value = null;
  };

  return (
    <div className="space-y-3">
      {/* Hidden input */}
      <input
        type="file"
        accept="image/jpg, image/jpeg, image/png"
        ref={fileInputRef}
        onChange={(e) => handleFileChange(e)}
        className="hidden"
      />

      {/* Button */}
      <button
        type="button"
        onClick={() => fileInputRef.current.click()}
        className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
      >
        {t("forms.chooseFile")}
      </button>

      {/* Show selected file */}
      {fileName && (
        <p className="text-sm text-zinc-600">{t("forms.selected")} {fileName} 
          <button
          onClick={handleRemove}
          className="p-1 rounded hover:bg-gray-200 transition">
            <X className="h-4 w-4" />
          </button>
        </p> 
      )}
    </div>
  );
};
