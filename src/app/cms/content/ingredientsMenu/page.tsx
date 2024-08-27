"use client";

import React from "react";

import styles from "./ingredientsMenu.module.scss";
import CmsButton from "components/CmsButton/CmsButton";
import TableCreator from "components/TableCreator/TableCreator";
import useDeleteItem from "utils/hooks/useDeleteItem";

import CMS_MODULES from "constants/CMSModules";
import Api from "api/requests";
import TABLE_CELL_TYPES from "constants/TableCellType";
import usePermission from "utils/hooks/usePermission";
import TABLE_COLORS from "constants/TableColors";
import { useRouter } from "next/navigation";
import { Routes } from "constants/routes";
import { useAppSelector } from "utils/hooks/useRedux";

function ItemIngredientsMenuPage() {
  const ingredientsMenus = useAppSelector(
    (store) => store.init.ingredientsMenus
  );
  usePermission(CMS_MODULES.INGREDIENTS_MENU);
  const router = useRouter();

  const deleteItem = useDeleteItem();

  function onUpdate(item) {
    router.push(`${Routes.cmsIngredientsMenuForm}/${item._id}`);
  }

  function deleteItemHandler(item) {
    deleteItem("למחוק את התפריט הזה?", callback);
    function callback(onSuccess) {
      onDelete(item, onSuccess);
    }
  }

  function onDelete(item, onSuccess) {
    const payload = { id: item._id };
    Api.deleteIngredientsMenu({ payload, onSuccess });
  }

  function createNewMenu() {
    router.push(Routes.cmsIngredientsMenuForm);
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

  const header = {
    name: {
      title: "שם",
      type: TABLE_CELL_TYPES.TEXT,
    },
    minOptions: {
      title: "מינימום",
      type: TABLE_CELL_TYPES.TEXT,
    },
    maxOptions: {
      title: "מקסימום",
      type: TABLE_CELL_TYPES.TEXT,
    },
    ingredients: {
      title: "מספר רכיבים",
      type: TABLE_CELL_TYPES.COUNT_ROWS,
    },
    isFree: {
      title: "תפריט חינמי",
      type: TABLE_CELL_TYPES.COLORED_CELL,
      options: {
        true: {
          color: "orange",
          title: "כן",
          id: true,
        },
        false: {
          color: "blue",
          title: "לא",
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
    <div className={styles["item-ingredients-menu-page-wrapper"]}>
      <div className={styles["add-button-wrapper"]}>
        <CmsButton onClick={createNewMenu} text="יצירת תפריט חדש" />
      </div>

      <TableCreator data={ingredientsMenus ?? []} header={header} />
    </div>
  );
}

export default ItemIngredientsMenuPage;
