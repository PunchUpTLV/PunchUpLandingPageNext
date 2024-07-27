"use client";

import React from "react";

import styles from "./iam-role.module.scss";
import CmsButton from "components/CmsButton/CmsButton";
import usePopup from "utils/hooks/usePopup";
import POPUP_TYPES from "constants/popup-types";
import TableCreator from "components/TableCreator/TableCreator";
import TABLE_COLORS from "constants/TableColors";
import TABLE_CELL_TYPES from "constants/TableCellType";
import usePermission from "utils/hooks/usePermission";
import CMS_MODULES from "constants/CMSModules";
import { useAppSelector } from "utils/hooks/useRedux";

function IAMRolePage(props) {
  const iamRoles = useAppSelector((store) => store.init.iamRoles);
  usePermission(CMS_MODULES.IAM_ROLE);

  const openPopup = usePopup();

  function onUpdate(item) {
    openPopup(POPUP_TYPES.IAM_ROLE, { iamRoleData: item });
  }

  const updateAction = {
    color: TABLE_COLORS.GREEN,
    text: "עדכון",
    onClick: onUpdate,
  };

  const header = {
    title: {
      title: "שם תפקיד",
      type: TABLE_CELL_TYPES.TEXT,
    },

    actions: {
      title: "פעולות",
      type: TABLE_CELL_TYPES.ACTION_BUTTONS,
      actions: [updateAction],
    },
  };

  return (
    <div className={styles["roles-page-wrapper"]}>
      <div className={styles["add-button-wrapper"]}>
        <CmsButton
          onClick={() => openPopup(POPUP_TYPES.IAM_ROLE)}
          text="יצירת תפקיד חדש"
        />
      </div>

      <TableCreator data={iamRoles ?? []} header={header} />
    </div>
  );
}

export default IAMRolePage;
