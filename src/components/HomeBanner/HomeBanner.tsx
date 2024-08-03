"use client";
import React from "react";

import styles from "./HomeBanner.module.scss";

import Banner from "./banner.webp";
import AppText from "components/AppText/AppText";
import useTranslate from "utils/hooks/useTranslate";

type Props = {};

function HomeBanner(props: Props) {
  const translate = useTranslate();
  return (
    <div className={styles["home-banner"]}>
      <div className={styles["top-banner-bg-media"]}>
        <img src={Banner.src} />
      </div>
      <div className={styles["banner-content"]}>
        <AppText
          className={styles["title"]}
          value={translate("homePage_title")}
        />
        <AppText
          className={styles["subtitle"]}
          value={translate("homePage_subtitle")}
        />
      </div>
    </div>
  );
}

export default HomeBanner;
