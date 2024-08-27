"use client";

import React from "react";

import styles from "./items.module.scss";
import CmsButton from "components/CmsButton/CmsButton";
import TableCreator from "components/TableCreator/TableCreator";
import CMS_MODULES from "constants/CMSModules";
import TABLE_COLORS from "constants/TableColors";
import TABLE_CELL_TYPES from "constants/TableCellType";
import usePermission from "utils/hooks/usePermission";
import usePopup from "utils/hooks/usePopup";
import useDeleteItem from "utils/hooks/useDeleteItem";
import POPUP_TYPES from "constants/popup-types";
import Api from "api/requests";
import useNotificationsHandler from "utils/hooks/useNotificationsHandler";
import { useAppSelector } from "utils/hooks/useRedux";

function ItemsPage() {
  const items = useAppSelector((store) => store.init.items);
  const media = useAppSelector((store) => store.init.media);
  usePermission(CMS_MODULES.ITEMS);

  const openPopup = usePopup();

  const deleteItem = useDeleteItem();
  const { onSuccessNotification } = useNotificationsHandler();

  function onUpdate(item) {
    openPopup(POPUP_TYPES.ITEMS, { item: item });
  }

  function deleteItemHandler(item) {
    deleteItem("למחוק את המוצר הזה?", callback);
    function callback(onSuccess) {
      onDelete(item, onSuccess);
    }
  }

  function onDelete(item, onSuccess) {
    const payload = { id: item._id };
    Api.deleteItem({ payload, onSuccess });
  }

  const updateAction = {
    color: TABLE_COLORS.GREEN,
    text: "עדכון",
    onClick: onUpdate,
  };

  const deleteAction = {
    color: TABLE_COLORS.RED,
    text: "מחיקה",
    onClick: deleteItemHandler,
  };

  function onOptionClick(id, item) {
    const payload = {
      moduleName: "Items",
      fieldName: "items",
      id: id,
      inStock: item.id,
    };
    const config = {
      showLoader: false,
    };
    Api.updateStock({ payload, onSuccess: onSuccessNotification, config });
  }

  const header = {
    name: {
      title: "שם",
      type: TABLE_CELL_TYPES.TEXT,
    },
    price: {
      title: "מחיר",
      type: TABLE_CELL_TYPES.TEXT,
    },

    media: {
      title: "תמונה",
      type: TABLE_CELL_TYPES.TEXT_FROM_DATASET,
      dataset: media ? Object.values(media) : [],
      displayField: "name",
    },

    inStock: {
      title: "מלאי",
      type: TABLE_CELL_TYPES.COLORED_CELL,
      onOptionClick: onOptionClick,
      options: {
        true: {
          color: "green",
          title: "במלאי",
          id: true,
        },
        false: {
          color: "red",
          title: "לא במלאי",
          id: false,
        },
      },
    },

    actions: {
      title: "פעולות",
      type: TABLE_CELL_TYPES.ACTION_BUTTONS,
      actions: [updateAction, deleteAction],
    },
  };

  return (
    <div className={styles["items-page-wrapper"]}>
      <div className={styles["add-button-wrapper"]}>
        <CmsButton
          onClick={() => openPopup(POPUP_TYPES.ITEMS)}
          text="יצירת מוצר חדש"
        />
      </div>

      <TableCreator data={items ?? []} header={header} />
    </div>
  );
}

export default ItemsPage;
