import { useState, useEffect } from "react";

const useFilePreview = (file: File | null): [string | null] => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    // Clean up the object URL when the component unmounts or file changes
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return [preview];
};

export default useFilePreview;
