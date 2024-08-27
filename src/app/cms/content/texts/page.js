"use client";
import React from "react";
import Api from "api/requests";

import POPUP_TYPES from "constants/popup-types";

import styles from "./texts.module.scss";

import CmsButton from "components/CmsButton/CmsButton";
import TableCreator from "components/TableCreator/TableCreator";
import TABLE_CELL_TYPES from "constants/TableCellType";
import TABLE_COLORS from "constants/TableColors";
import usePopup from "utils/hooks/usePopup";
import useDeleteItem from "utils/hooks/useDeleteItem";
import usePermission from "utils/hooks/usePermission";
import CMS_MODULES from "constants/CMSModules";
import { useAppSelector } from "utils/hooks/useRedux";

export default function TextsPage(props) {
  const texts = useAppSelector((store) => store.init?.texts);
  usePermission(CMS_MODULES.TEXTS);

  const openPopup = usePopup();

  const deleteItem = useDeleteItem();

  const deleteAction = {
    color: TABLE_COLORS.RED,
    text: "מחיקה",
    onClick: deleteItemHandler,
  };

  function deleteItemHandler(item) {
    deleteItem("למחוק את הטקסט הזה?", callback);
    function callback(onSuccess) {
      onDelete(item, onSuccess);
    }
  }

  const updateAction = {
    color: TABLE_COLORS.GREEN,
    text: "עדכון",
    onClick: onUpdate,
  };

  function onUpdate(item) {
    openPopup(POPUP_TYPES.TEXTS, { text: item });
  }

  function onDelete(item, onSuccess) {
    const payload = { key: item.key };
    Api.deleteText({ payload, onSuccess });
  }

  const header = {
    key: { title: "מפתח", type: TABLE_CELL_TYPES.TEXT },
    tag: { title: "תגית", type: TABLE_CELL_TYPES.TEXT },
    actions: {
      title: "פעולות",
      type: TABLE_CELL_TYPES.ACTION_BUTTONS,
      actions: [updateAction, deleteAction],
    },
  };

  return (
    <div className={styles["all-text-wrapper"]}>
      <div className={styles["add-buttom-wrapper"]}>
        <CmsButton onClick={() => openPopup(POPUP_TYPES.TEXTS)} text={"הוסף"} />
      </div>

      <TableCreator data={texts ?? []} header={header} />
    </div>
  );
}
