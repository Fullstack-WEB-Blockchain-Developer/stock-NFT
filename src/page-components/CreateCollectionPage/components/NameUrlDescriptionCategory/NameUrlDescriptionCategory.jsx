import { useEffect, useState } from "react";
//next
import Link from "next/link";
//axios
import axios from "axios";
//mui
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
//hooks
import { useStyles } from "../../../../hooks/useStyles";
import { useDebounce } from "../../../../hooks/useDebounce";
//styles
import styles from "./NameUrlDescriptionCategory.module.scss";

export const NameUrlDescriptionCategory = ({ categories, values, setValues, errors, setErrors }) => {
  const [descriptionLettersUsed, setDescriptionLettersUsed] = useState(0);

  const muiClasses = useStyles();
  const debouncedName = useDebounce(values.name, 250);

  useEffect(() => {
    const { url } = values;
    const regexp = /^[0-9a-z.-]*$/;

    if (!regexp.test(url)) {
      setErrors({
        ...errors,
        url: {
          isError: true,
          helperText: "Must only contain lowercase letters, numbers, and hyphens",
        },
      });
    } else {
      setErrors({ ...errors, url: { isError: false, helperText: "" } });
    }
  }, [values]);

  useEffect(() => {
    const checkCollectionName = async () => {
      if (debouncedName) {
        const {
          data: { exists },
        } = await axios.get(`${process.env.BACKEND_URL}/collections/checkName/${debouncedName}`);

        exists && setErrors({ ...errors, name: { isError: true, helperText: "This name is already taken" } });
        !exists && setErrors({ ...errors, name: { isError: false, helperText: "" } });
      } else {
        setErrors({ ...errors, name: { isError: false, helperText: "" } });
      }
    };

    checkCollectionName();
  }, [debouncedName]);

  useEffect(() => {
    setDescriptionLettersUsed(values.description.length);
  }, [values.description]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <span>
          Name <span className={styles.star}>*</span>
        </span>
      </div>
      <TextField
        error={errors.name.isError}
        helperText={errors.name.isError && errors.name.helperText}
        fullWidth
        id="name"
        label="Name"
        variant="outlined"
        className={errors.name.isError ? muiClasses.textFieldError : muiClasses.textField}
        value={values.name}
        onChange={({ target: { value } }) => setValues({ ...values, name: value })}
        InputProps={{ style: { color: "white" } }}
        inputProps={{
          maxLength: 450,
        }}
        multiline
      />
      <div className={styles.title}>
        <span>URL</span>
      </div>
      <div className={styles.description}>
        <span>Customize your URL on Stoke. Must only contain lowercase letters, numbers, and hyphens.</span>
      </div>
      <TextField
        error={errors.url.isError}
        helperText={errors.url.isError && errors.url.helperText}
        fullWidth
        id="url"
        label="https://youritemsite.io"
        variant="outlined"
        className={errors.url.isError ? muiClasses.textFieldError : muiClasses.textField}
        value={values.url}
        onChange={({ target: { value } }) => setValues({ ...values, url: value })}
        InputProps={{ style: { color: "white" } }}
        multiline
      />
      <div className={styles.title}>
        <span>Description</span>
      </div>
      <div className={styles.description}>
        <span>
          <Link href="https://www.markdownguide.org/cheat-sheet/" passHref>
            <span className={styles.link}>Markdown</span>
          </Link>{" "}
          syntax is supported. {descriptionLettersUsed} of 1000 characters used.
        </span>
      </div>
      <TextField
        fullWidth
        id="description"
        label="Provide a detail description of your item"
        variant="outlined"
        className={muiClasses.textField}
        value={values.description}
        onChange={({ target: { value } }) => setValues({ ...values, description: value })}
        InputProps={{ style: { color: "white" } }}
        multiline
        inputProps={{
          maxLength: 1000,
        }}
        minRows={3}
      />
      <div className={styles.title}>
        <span>Category</span>
      </div>
      <div className={styles.description}>
        <span>Adding a category will help make your item discoverable on Stoke.</span>
      </div>
      <Select
        fullWidth
        labelId="category"
        id="category"
        style={{
          color: "white",
        }}
        onChange={({ target: { value } }) => setValues({ ...values, category: value })}
        value={values.category}
        className={muiClasses.select}
      >
        <MenuItem disabled value="none">
          <span style={{ color: "rgb(77, 77, 77)" }}>Select Category</span>
        </MenuItem>
        {categories.map(({ name }) => (
          <MenuItem key={name} value={name}>
            <span>{name}</span>
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};
