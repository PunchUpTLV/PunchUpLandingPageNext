"use client";

import React from "react";

import styles from "./AboutUs.module.scss";
import AnimatedBlobImage from "components/AnimatedBlobImage/AnimatedBlobImage";
import useTranslate from "utils/hooks/useTranslate";
import AppText from "components/AppText/AppText";

type Props = {};

function AboutUs(props: Props) {
  const translate = useTranslate();
  return (
    <section className={styles["about-us-wrapper"]}>
      <div className={styles["about-us-content"]}>
        <AppText
          className={styles["title"]}
          value={translate("aboutUs_title")}
        />

        <div className={styles["content"]}>
          <AppText
            className={styles["about-us-text"]}
            value={translate("aboutUs_content")}
          />
          <div className={styles["image-wrapper"]}>
            <AnimatedBlobImage />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
