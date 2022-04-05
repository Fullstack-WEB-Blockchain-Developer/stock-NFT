import { useState } from "react";
//classnames
import cn from "classnames";
//next
import Image from "next/image";
//utils
import { sidebarData } from "./ProfileSettings.utils";
//components
import { ProfileSubPage } from "./components/ProfileSubPage";
//icons
import ProfileIcon from "./icons/profile.svg";
import NotificationsIcon from "./icons/notifications.svg";
//styles
import styles from "./ProfileSettings.module.css";

export const ProfileSettings = () => {
  const [activeSidebarRow, setActiveSidebarRow] = useState("Profile");

  const getIcon = (text) => {
    switch (text) {
      case "Profile":
        return <ProfileIcon />;
      case "Notifications":
        return <NotificationsIcon />;
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.sidebar}>
        {sidebarData.map(({ text, id, hasIcon }) => (
          <div
            className={cn(styles.sidebarRow, {
              [styles.sidebarActiveRow]: activeSidebarRow === text,
            })}
            key={id}
            onClick={() => setActiveSidebarRow(text)}
          >
            {hasIcon && (
              <div
                className={cn(styles.sidebarIconWrapper, {
                  [styles.sidebarActiveRow]: activeSidebarRow === text,
                })}
              >
                {getIcon(text)}
              </div>
            )}
            <div className={styles.sidebarText}>
              <span>{text}</span>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.contentWrapper}>{activeSidebarRow === "Profile" && <ProfileSubPage />}</div>
    </div>
  );
};
