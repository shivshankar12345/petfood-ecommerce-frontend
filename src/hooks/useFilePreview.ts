import { useState, useEffect } from "react";

const useFilePreview = (file: File | null): [string | null, (url: string | null) => void] => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Cleanup to revoke object URL after component unmounts or file change
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return [preview, setPreview];
};

export default useFilePreview;
