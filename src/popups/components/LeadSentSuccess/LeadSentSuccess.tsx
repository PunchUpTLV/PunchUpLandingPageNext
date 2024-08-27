"use client";

import React, { useRef } from "react";

import styles from "./LeadSentSuccess.module.scss";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";

import { SlidePopupRef } from "utils/types/popup";
import AppText from "components/AppText/AppText";
import useTranslate from "utils/hooks/useTranslate";
import RedButton from "components/RedButton/RedButton";
type Props = {
  payload: Payload;
};

type Payload = {
  name: string;
};
export default function LeadSentSuccess(props: Props) {
  const { payload } = props;
  const { name } = payload;
  const ref = useRef<SlidePopupRef>();
  const translate = useTranslate();

  const animateOut = () => ref.current?.animateOut();

  return (
    <SlidePopup className={styles["lead-sent-popup"]} ref={ref}>
      <div className={styles["lead-sent-container"]}>
        <div className={styles["title"]}>
          <AppText value={translate("leadSentSuccess_title")} />
          <span className={styles["name"]}>{name}</span>
        </div>
        <AppText
          className={styles["content"]}
          value={translate("leadSentSuccess_content")}
        />
        <div className={styles["btn"]}>
          <RedButton
            textKey="leadSentSuccess_btnText"
            type="button"
            onClick={animateOut}
          />
        </div>
      </div>
    </SlidePopup>
  );
}
