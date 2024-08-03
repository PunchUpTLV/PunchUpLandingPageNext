"use client";

import GlowingButton from "components/GlowingButton/GlowingButton";
import styles from "./JumpToForm.module.scss";
import useTranslate from "utils/hooks/useTranslate";

export default function JumpToForm() {
  const translate = useTranslate();
  return (
    <div className={styles["skip-to-form"]}>
      <GlowingButton
        title={translate("glowingBtn_text").text}
        href="#lead-form"
      />
    </div>
  );
}
