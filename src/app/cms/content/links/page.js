"use client";

import React from "react";

import styles from "./links.module.scss";
import CmsButton from "components/CmsButton/CmsButton";
import TableCreator from "components/TableCreator/TableCreator";
import TABLE_CELL_TYPES from "constants/TableCellType";
import TABLE_COLORS from "constants/TableColors";
import usePopup from "utils/hooks/usePopup";
import POPUP_TYPES from "constants/popup-types";
import Api from "api/requests";
import useDeleteItem from "utils/hooks/useDeleteItem";
import CMS_MODULES from "constants/CMSModules";
import usePermission from "utils/hooks/usePermission";
import { useAppSelector } from "utils/hooks/useRedux";

function Links() {
  const links = useAppSelector((store) => store.init.links);
  usePermission(CMS_MODULES.LINKS);

  const openPopup = usePopup();

  const deleteItem = useDeleteItem();

  function deleteItemHandler(item) {
    deleteItem("למחוק את הלינק הזה?", callback);
    function callback(onSuccess) {
      onDelete(item, onSuccess);
    }
  }

  function onDelete(item, onSuccess) {
    const payload = { id: item._id };
    Api.removeLink({ payload, onSuccess });
  }

  function onUpdate(item) {
    openPopup(POPUP_TYPES.LINKS, { linkData: item });
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
  const header = {
    name: { title: "שם", type: TABLE_CELL_TYPES.TEXT },
    link: { title: "לינק", type: TABLE_CELL_TYPES.TEXT },

    actions: {
      title: "פעולות",
      type: TABLE_CELL_TYPES.ACTION_BUTTONS,
      actions: [updateAction, deleteAction],
    },
  };

  return (
    <div className={styles["links-page"]}>
      <CmsButton
        text={"הוספת לינק חדש"}
        onClick={() => openPopup(POPUP_TYPES.LINKS)}
      />
      <TableCreator header={header} data={links ?? []} />
    </div>
  );
}

export default Links;
