"use client";

import React from "react";

import styles from "./itemIngredients.module.scss";
import CmsButton from "components/CmsButton/CmsButton";
import TableCreator from "components/TableCreator/TableCreator";
import useDeleteItem from "utils/hooks/useDeleteItem";
import usePermission from "utils/hooks/usePermission";
import CMS_MODULES from "constants/CMSModules";
import Api from "api/requests";
import TABLE_CELL_TYPES from "constants/TableCellType";
import usePopup from "utils/hooks/usePopup";
import TABLE_COLORS from "constants/TableColors";
import POPUP_TYPES from "constants/popup-types";
import useNotificationsHandler from "utils/hooks/useNotificationsHandler";
import { useAppSelector } from "utils/hooks/useRedux";

function ItemIngredientsPage(props) {
  const itemIngredients = useAppSelector((store) => store.init.itemIngredients);
  usePermission(CMS_MODULES.ITEM_INGREDIENTS);

  const openPopup = usePopup();
  const { onSuccessNotification } = useNotificationsHandler();

  const deleteItem = useDeleteItem();

  function onUpdate(item) {
    openPopup(POPUP_TYPES.ITEM_INGREDIENTS, { ingredient: item });
  }

  function deleteItemHandler(item) {
    deleteItem("למחוק את הרכיב הזה?", callback);
    function callback(onSuccess) {
      onDelete(item, onSuccess);
    }
  }

  function onDelete(item, onSuccess) {
    const payload = { id: item._id };
    Api.deleteItemIngredient({ payload, onSuccess });
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
      moduleName: "ItemIngredients",
      fieldName: "itemIngredients",
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
    <div className={styles["item-ingredients-page-wrapper"]}>
      <div className={styles["add-button-wrapper"]}>
        <CmsButton
          onClick={() => openPopup(POPUP_TYPES.ITEM_INGREDIENTS)}
          text="יצירת רכיב חדש"
        />
      </div>

      <TableCreator data={itemIngredients ?? []} header={header} />
    </div>
  );
}

export default ItemIngredientsPage;
