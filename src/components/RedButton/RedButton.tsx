import React from "react";

import styles from "./RedButton.module.scss";
import { useAppSelector } from "utils/hooks/useRedux";
import AppText from "components/AppText/AppText";
import useTranslate from "utils/hooks/useTranslate";

type Props = {
  textKey: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "a";
};

function RedButton(props: Props) {
  const { textKey, onClick, type = "button", href = "#" } = props;
  const translate = useTranslate();

  if (type === "a") {
    return (
      <a href={href} className={styles["btn"]}>
        <AppText className={styles["btn-text"]} value={translate(textKey)} />
      </a>
    );
  }
  return (
    <button className={styles["btn"]} onClick={onClick}>
      <AppText className={styles["btn-text"]} value={translate(textKey)} />
    </button>
  );
}

export default RedButton;
