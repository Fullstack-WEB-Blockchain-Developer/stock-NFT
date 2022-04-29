import { useEffect, useState } from "react";
//classnames
import cn from "classnames";
//styles
import styles from "./ImageLoadFields.module.scss";
import Image from "next/image";

export const ImageLoadFields = ({ className, values, setValues }) => {
  const setPreview = (file, field) => {
    if (!values[field].file) {
      setValues({ ...values, [field]: { ...values[field], file: undefined } });
      return;
    }
    const objectUrl = URL.createObjectURL(file);

    setValues({ ...values, [field]: { ...values[field], preview: objectUrl } });

    return objectUrl;
  };

  const handleChange = (file, field) => {
    setValues({ ...values, [field]: { ...values[field], file } });
  };

  useEffect(() => {
    const objectUrl = setPreview(values.banner.file, "banner");

    return () => URL.revokeObjectURL(objectUrl);
  }, [values.banner.file]);

  useEffect(() => {
    const objectUrl = setPreview(values.logo.file, "logo");
    return () => URL.revokeObjectURL(objectUrl);
  }, [values.logo.file]);

  useEffect(() => {
    const objectUrl = setPreview(values.featured.file, "featured");

    return () => URL.revokeObjectURL(objectUrl);
  }, [values.featured.file]);

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
        {values.logo.preview && <Image src={values.logo.preview} objectFit="cover" layout="fill" alt="logo" />}
        {!values.logo.preview && (
          <Image src="/create-nft/Icon-Image.svg" objectFit="contain" width={48} height={40} alt="logo" />
        )}
        <input
          className={styles.fileInput}
          onChange={({ target: { files } }) => handleChange(files[0], "logo")}
          type="file"
          accept=".png, .jpg"
        />
      </div>
      <div className={styles.title}>
        <span>Featured image</span>
      </div>
      <div className={styles.description}>
        <span>
          This image will be used for featuring your collection on the homepage, category pages, or other
          promotional areas of OpenSea. 600 x 400 recommended.
        </span>
      </div>
      <div className={cn(styles.loadField, styles.loadFeaturedPlaceholder)}>
        {values.featured.preview && (
          <Image src={values.featured.preview} objectFit="cover" layout="fill" alt="logo" />
        )}
        {!values.featured.preview && (
          <Image src="/create-nft/Icon-Image.svg" objectFit="contain" width={48} height={40} alt="logo" />
        )}
        <input
          className={styles.fileInput}
          onChange={({ target: { files } }) => handleChange(files[0], "featured")}
          type="file"
          accept=".png, .jpg"
        />
      </div>
      <div className={styles.title}>
        <span>Banner image</span>
      </div>
      <div className={styles.description}>
        <span>
          This image will appear at the top of your collection page. Avoid including too much text in this
          banner image, as the dimensions change on different devices. 1400 x 400 recommended.
        </span>
      </div>
      <div className={cn(styles.loadField, styles.loadBannerPlaceholder)}>
        {values.banner.preview && (
          <Image src={values.banner.preview} objectFit="cover" layout="fill" alt="logo" />
        )}
        {!values.banner.preview && (
          <Image src="/create-nft/Icon-Image.svg" objectFit="contain" width={48} height={40} alt="logo" />
        )}
        <input
          className={styles.fileInput}
          onChange={({ target: { files } }) => handleChange(files[0], "banner")}
          type="file"
          accept=".png, .jpg"
        />
      </div>
    </div>
  );
};
