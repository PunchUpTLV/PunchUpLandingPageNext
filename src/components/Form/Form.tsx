"use client";

import React from "react";

import styles from "./Form.module.scss";
import { FormDataType } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";
import FormCreator from "components/FormCreator/FormCreator";
import RedButton from "components/RedButton/RedButton";
import AppText from "components/AppText/AppText";
import useTranslate from "utils/hooks/useTranslate";
import Api from "api/requests";
import usePopup from "utils/hooks/usePopup";
import POPUP_TYPES from "constants/popup-types";

type Props = {};

function Form(props: Props) {
  const translate = useTranslate();
  const openPopup = usePopup();

  const formData: FormDataType = {
    inputs: [
      {
        name: "fullname",
        label: "שם מלא",
        inputType: FORM_INPUTS_TYPES.ANIMATED_INPUT,
        rules: ["not_empty", "full_name"],
      },
      {
        name: "phone",
        label: "טלפון",
        inputType: FORM_INPUTS_TYPES.ANIMATED_INPUT,
        rules: ["not_empty", "phone"],
        type: "tel",
      },
    ],
  };

  function onSubmit(payload: any) {
    Api.sendLead({ payload, onSuccess });

    function onSuccess() {
      openPopup(POPUP_TYPES.LEAD_SENT_SUCCESS, {
        name: payload.fullname,
      });
    }
  }

  return (
    <section id="lead-form" className={styles["form-wrapper"]}>
      <div className={styles["form-content"]}>
        <AppText className={styles["title"]} value={translate("form_title")} />
        <AppText
          className={styles["subtitle"]}
          value={translate("form_subtitle")}
        />

        <div className={styles["form"]}>
          <FormCreator
            formData={formData}
            onSubmit={onSubmit}
            buttonText={"form_btn_text"}
            CustomButton={RedButton}
          />
        </div>
      </div>
    </section>
  );
}

export default Form;
