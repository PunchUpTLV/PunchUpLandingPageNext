"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import styles from "./IAMRolePopup.module.scss";
import { SlidePopupRef } from "utils/types/popup";
import SlidePopup from "popups/Presets/SlidePopup/SlidePopup";
import FormCreator from "components/FormCreator/FormCreator";
import { FormDataType } from "utils/types/form";
import FORM_INPUTS_TYPES from "constants/form-inputs-types";
import { useAppSelector } from "utils/hooks/useRedux";
import { IAMRoleType, moduleType } from "utils/types/init";
import Api from "api/requests";

type Payload = {
  iamRoleData?: IAMRoleType;
};

type Props = {
  payload: Payload;
};

function IAMRolePopup(props: Props) {
  const { payload = {} } = props;
  const { iamRoleData } = payload;

  const modules = useAppSelector((store) => store.init.modules);

  const ref = useRef<SlidePopupRef>();

  function onSubmit(payload) {
    if (iamRoleData) {
      payload["id"] = iamRoleData["_id"];
      return Api.updateRole({ payload, onSuccess });
    }

    Api.createRole({ payload, onSuccess });
  }

  function onSuccess() {
    ref.current?.animateOut();
  }

  const formData: FormDataType = {
    inputs: [
      {
        name: "title",
        label: "שם התפקיד",
        inputType: FORM_INPUTS_TYPES.INPUT,
        rules: ["not_empty"],
      },
      {
        name: "permissionBitwise",
        label: "הרשאות",
        inputType: FORM_INPUTS_TYPES.BITWISE_CHECKBOX,
        rules: ["not_empty"],
        options: modules,
        field: "title",
        bitwiseField: "bitwise",
      },
    ],
    initialData: iamRoleData,
  };

  return (
    <SlidePopup className={styles["role-popup"]} ref={ref}>
      <div className={styles["form"]}>
        <FormCreator
          formData={formData}
          buttonText={!iamRoleData ? "הוסף" : "עדכן"}
          onSubmit={onSubmit}
        />
      </div>
    </SlidePopup>
  );
}

export default IAMRolePopup;
