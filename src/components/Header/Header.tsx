"use client";

import React from "react";

import styles from "./Header.module.scss";

import Logo from "./logo.jpg";
import RedButton from "components/RedButton/RedButton";
import { useAppSelector } from "utils/hooks/useRedux";

type Props = {};

function Header(props: Props) {
  return (
    <header className={styles["header-wrapper"]}>
      <div className={styles["header-content"]}>
        <div className={styles["logo-wrapper"]}>
          <img src={Logo.src} alt={"logo"} />
        </div>
        <RedButton textKey="header_btn_text" href="#lead-form" type="a" />
      </div>
    </header>
  );
}

export default Header;
