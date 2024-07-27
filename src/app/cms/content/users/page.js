"use client";

import React from "react";

import styles from "./users.module.scss";
import CmsButton from "components/CmsButton/CmsButton";
import usePopup from "utils/hooks/usePopup";
import POPUP_TYPES from "constants/popup-types";
import TableCreator from "components/TableCreator/TableCreator";
import TABLE_CELL_TYPES from "constants/TableCellType";
import useDeleteItem from "utils/hooks/useDeleteItem";
import TABLE_COLORS from "constants/TableColors";
import Api from "api/requests";
import usePermission from "utils/hooks/usePermission";
import CMS_MODULES from "constants/CMSModules";
import { useAppSelector } from "utils/hooks/useRedux";

function UsersPage(props) {
  const users = useAppSelector((store) => store.init.users);
  usePermission(CMS_MODULES.USERS);

  const roles = useAppSelector((store) => store.init.iamRoles);

  const openPopup = usePopup();

  const deleteItem = useDeleteItem();

  function deleteItemHandler(item) {
    deleteItem("למחוק את היוזר הזה?", callback);
    function callback(onSuccess) {
      onDelete(item, onSuccess);
    }
  }

  const deleteAction = {
    color: TABLE_COLORS.RED,
    text: "מחיקה",
    onClick: deleteItemHandler,
  };

  const updateAction = {
    color: TABLE_COLORS.GREEN,
    text: "עדכון",
    onClick: onUpdate,
  };

  function onUpdate(item) {
    openPopup(POPUP_TYPES.UPDATE_USER, { user: item });
  }

  function onDelete(item, onSuccess) {
    const payload = { id: item._id };
    Api.deleteUser({ payload, onSuccess });
  }

  const header = {
    username: {
      title: "שם משתמש",
      type: TABLE_CELL_TYPES.TEXT,
    },
    uuid: {
      title: "מזהה יחודי",
      type: TABLE_CELL_TYPES.TEXT,
    },
    roleId: {
      title: "תפקיד",
      type: TABLE_CELL_TYPES.TEXT_FROM_DATASET,
      dataset: roles,
      displayField: "title",
    },
    actions: {
      title: "פעולות",
      type: TABLE_CELL_TYPES.ACTION_BUTTONS,
      actions: [updateAction, deleteAction],
    },
  };
  return (
    <div className={styles["users-page-wrapper"]}>
      <div className={styles["add-button-wrapper"]}>
        <CmsButton
          onClick={() => openPopup(POPUP_TYPES.CREATE_USER)}
          text="יצירת יוזר חדש"
        />
      </div>

      <TableCreator data={users ?? []} header={header} />
    </div>
  );
}

export default UsersPage;
