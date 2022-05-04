//next
import Image from "next/image";
//mui
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
//hooks
import { useStyles } from "../../../../hooks/useStyles";
//styles
import styles from "./Links.module.scss";

export const Links = ({ values, setValues }) => {
  const muiClasses = useStyles();

  return (
    <>
      <div className={styles.title}>
        <span>Links</span>
      </div>
      <div className={styles.websiteImageWrapper}>
        <div
          className={styles.websiteImageContainer}
          style={{
            borderRadius: "7px 0 0 0",
            borderBottom: "none",
          }}
        >
          <Image src="/create-collection/Icon-Discord.svg" alt="insta" width={19} height={19} />
        </div>
        <TextField
          fullWidth
          id="discordLink"
          placeholder="example"
          variant="outlined"
          className={muiClasses.tripleTextFieldTop}
          value={values.discordLink}
          onChange={({ target: { value } }) => setValues({ ...values, discordLink: value })}
          InputProps={{
            style: { color: "white" },
            startAdornment: (
              <InputAdornment position="start" style={{ marginRight: "0px" }}>
                <span style={{ color: "grey" }}>https://discord.gg/</span>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className={styles.websiteImageWrapper}>
        <div
          className={styles.websiteImageContainer}
          style={{
            borderRadius: "0",
            borderTop: "1px solid var(--shadow)",
            borderBottom: "none",
            height: "56px",
          }}
        >
          <Image src="/profile-settings/Icon-Insta.svg" alt="insta" width={19} height={19} />
        </div>
        <TextField
          fullWidth
          id="instagramLink"
          placeholder="yourinstagramhandle"
          variant="outlined"
          className={muiClasses.tripleTextFieldCenter}
          value={values.instagramLink}
          onChange={({ target: { value } }) => setValues({ ...values, instagramLink: value })}
          InputProps={{
            style: { color: "white" },
            startAdornment: (
              <InputAdornment position="start" style={{ marginRight: "0px" }}>
                <span style={{ color: "grey" }}>https://instagram.com/</span>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className={styles.websiteImageWrapper}>
        <div
          className={styles.websiteImageContainer}
          style={{
            borderRadius: "0",
            borderTop: "1px solid var(--shadow)",
            borderBottom: "none",
            height: "56px",
          }}
        >
          <Image src="/create-collection/Icon-Telegram.svg" alt="telega" width={19} height={19} />
        </div>
        <TextField
          fullWidth
          id="telegramLink"
          placeholder="example"
          variant="outlined"
          className={muiClasses.tripleTextFieldCenter}
          value={values.telegramLink}
          onChange={({ target: { value } }) => setValues({ ...values, telegramLink: value })}
          InputProps={{
            style: { color: "white" },
            startAdornment: (
              <InputAdornment position="start" style={{ marginRight: "0px" }}>
                <span style={{ color: "grey" }}>https://t.me/</span>
              </InputAdornment>
            ),
          }}
        />
      </div>
      <div className={styles.websiteImageWrapper}>
        <div
          className={styles.websiteImageContainer}
          style={{
            borderRadius: "0",
            borderTop: "1px solid var(--shadow)",
            borderBottom: "none",
            height: "56px",
          }}
        >
          <Image src="/profile-settings/Icon-Site.svg" alt="insta" width={19} height={19} />
        </div>
        <TextField
          fullWidth
          id="yourSite"
          placeholder="yoursite.io"
          variant="outlined"
          className={muiClasses.tripleTextFieldCenter}
          value={values.yourSiteLink}
          onChange={({ target: { value } }) => setValues({ ...values, yourSiteLink: value })}
          InputProps={{ style: { color: "white" } }}
        />
      </div>
      <div className={styles.websiteImageWrapper}>
        <div
          className={styles.websiteImageContainer}
          style={{
            borderRadius: "0 0 0 7px",
            borderTop: "1px solid var(--shadow)",
            height: "56px",
          }}
        >
          <Image src="/create-collection/Icon-Medium.svg" alt="insta" width={19} height={19} />
        </div>
        <TextField
          fullWidth
          id="medium"
          placeholder="yourmediumhandle"
          variant="outlined"
          className={muiClasses.tripleTextFieldBottom}
          value={values.mediumLink}
          onChange={({ target: { value } }) => setValues({ ...values, mediumLink: value })}
          InputProps={{
            style: { color: "white" },
            startAdornment: (
              <InputAdornment position="start" style={{ marginRight: "0px" }}>
                <span style={{ color: "grey" }}>https://medium.com/@</span>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </>
  );
};
