import { useEffect, useState, useRef } from "react";
//classnames
import cn from "classnames";
//styles
import styles from "./ImageLoadFields.module.scss";
import { useCallback } from "react";

export const ImageLoadFields = ({ className }) => {
  const [files, setFiles] = useState({
    banner: { preview: undefined, file: undefined },
    featured: { preview: undefined, file: undefined },
    logo: { preview: undefined, file: undefined },
  });

  const bannerRef = useRef();
  const featuredRef = useRef();
  const logoRef = useRef();

  const setPreview = (file, field) => {
    if (!files[field].file) {
      console.log("---9898", 9898);
      setFiles({ ...files, [field]: { ...files[field], file: undefined } });
      return;
    }
    console.log("---1212", 1212);
    const objectUrl = URL.createObjectURL(file);

    setFiles({ ...files, [field]: { ...files[field], preview: objectUrl } });

    return objectUrl;
  };

  const memoisedSetPreview = useCallback(setPreview, [files])

  const handleChange = (file, field) => {
    setFiles({ ...files, [field]: { ...files[field], file } });
  };

  //useEffects

  useEffect(() => {
    const objectUrl = memoisedSetPreview(files.banner.file, "banner");

    return () => URL.revokeObjectURL(objectUrl);
  }, [files.banner.file, memoisedSetPreview]);

  useEffect(() => {
    const objectUrl = memoisedSetPreview(files.logo.file, "logo");
    return () => URL.revokeObjectURL(objectUrl);
  }, [files.logo.file, memoisedSetPreview]);

  useEffect(() => {
    const objectUrl = memoisedSetPreview(files.featured.file, "featured");

    return () => URL.revokeObjectURL(objectUrl);
  }, [files.featured.file, memoisedSetPreview]);
  console.log("---files", files);

  return (
    <div className={cn(className, styles.wrapper)}>
      <div className={styles.title}>
        <span>
          Logo Image <span className={styles.star}>*</span>
        </span>
      </div>
      <div className={styles.description}>
        <span>This image will also be used for navigation. 350 x 350 recommended.</span>
      </div>
      <div className={cn(styles.loadField, styles.loadLogoPlaceholder)}>
        <input
          className={styles.fileInput}
          onChange={({ target: { files } }) => handleChange(files[0], "logo")}
          ref={logoRef}
          type="file"
          accept=".png, .jpg, .gif, .svg"
        />
      </div>
    </div>
  );
};
