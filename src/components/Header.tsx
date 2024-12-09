"use client";

import styles from "@/styles/components/header.module.css";
import CustomConnectButton from "./buttons/Connect";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useMemo } from "react";
import AccountButton from "./buttons/Account";
import { useWindowSize } from "@/hooks/useWindowSize";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";
import { createGlobalStyle } from "styled-components";
import { useIsAdmin, useParadBalance } from "@/hooks/useContractData";
import { toOptionalFixed } from "@/utils/converter";

const GlobalStyle = createGlobalStyle<{
  isBalanceShow: boolean | undefined | 0;
}>`
    ::-webkit-scrollbar-track {
      margin-top: ${(props) => (!props.isBalanceShow ? "100px" : "145px")};
    }
  `;

const links = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Debates", link: "/debates" },
  { id: 3, name: "FAQ", link: "/faq" },
];

const admin = { id: 4, name: "Admin", link: "/admin" };

export default function Header() {
  const { width } = useWindowSize();
  const router = usePathname();
  const { isConnected, address } = useAccount();
  const { formattedBalance } = useParadBalance(address);
  const isAdmin = useIsAdmin(address);

  const targetViewportSize = 760;

  const [burgerClass, setBurgerClass] = useState([
    styles.burger_bar,
    styles.inactive,
  ]);
  const [menuClass, setMenuClass] = useState([styles.menu, styles.hidden]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isBalanceShow = useMemo(
    () => width && width > targetViewportSize && isConnected,
    [width, targetViewportSize, isConnected]
  );

  const updateMenu = () => {
    if (isMenuOpen) {
      setBurgerClass([styles.burger_bar, styles.inactive]);
      setMenuClass([styles.menu, styles.hidden]);
    } else {
      setBurgerClass([styles.burger_bar, styles.active]);
      setMenuClass([styles.menu, styles.visible]);
    }
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setBurgerClass([styles.burger_bar, styles.inactive]);
    setMenuClass([styles.menu, styles.hidden]);
    setIsMenuOpen(false);
  };

  return (
    <>
      <GlobalStyle isBalanceShow={isBalanceShow} />
      <header>
        {width && width <= targetViewportSize ? (
          <>
            {isMenuOpen && (
              <div className={menuClass.join(" ")}>
                <div className={styles.menu__container}>
                  <motion.nav
                    className={styles.menu__container__links}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 }}
                  >
                    {links.map((_link) => {
                      return (
                        <p key={"link-" + _link.id}>
                          <Link
                            href={_link.link}
                            className={`${
                              styles.header__container__links__link
                            } ${styles.menu_links} ${
                              router === _link.link ||
                              (_link.id === 2 && router.includes("/debates/"))
                                ? styles.current_link
                                : ""
                            }`}
                            onClick={closeMenu}
                          >
                            {_link.name}
                          </Link>
                        </p>
                      );
                    })}
                    {isAdmin && (
                      <p>
                        <Link
                          href={admin.link}
                          className={`${
                            styles.header__container__links__link
                          } ${styles.menu_links} ${
                            router === admin.link ? styles.current_link : ""
                          }`}
                          onClick={closeMenu}
                        >
                          {admin.name}
                        </Link>
                      </p>
                    )}
                  </motion.nav>
                  <motion.div
                    className={styles.menu__container__buttons}
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Link
                      href="/account"
                      className={styles.flex_center}
                      onClick={closeMenu}
                    >
                      <AccountButton
                        title="Account"
                        isActive={router === "/account"}
                        style={{
                          width: "100%",
                          maxWidth: "450px",
                          minWidth: "160px",
                        }}
                      />
                    </Link>
                    <CustomConnectButton
                      divClassName={styles.flex_center}
                      style={{
                        width: "100%",
                        maxWidth: "450px",
                        minWidth: "160px",
                      }}
                    />
                  </motion.div>
                </div>
              </div>
            )}
            <div
              className={`${styles.header} ${
                isMenuOpen && styles.header__burger
              }`}
            >
              <div className={styles.header__container}>
                <h3>
                  <Link href={"/"} onClick={closeMenu}>
                    Paradigma
                  </Link>
                </h3>
                <div className={styles.burger_menu} onClick={updateMenu}>
                  <div className={burgerClass.join(" ")}></div>
                  <div className={burgerClass.join(" ")}></div>
                  <div className={burgerClass.join(" ")}></div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {isConnected && formattedBalance !== undefined && (
              <div className={styles.balance}>
                <div className={styles.balance__container}>
                  <div className={styles.balance__container__balance}>
                    <p>
                      Balance: {toOptionalFixed(formattedBalance, 4)} $PARAD
                    </p>
                    <u>
                      <a
                        target="_blank"
                        href="https://pancakeswap.finance/swap?outputCurrency=0xBDa093C16347b5B106bC5BF9aFd0DdEef85eA60C"
                      >
                        Buy Now
                      </a>
                    </u>
                  </div>
                </div>
              </div>
            )}
            <div className={styles.header}>
              <div className={styles.header__container}>
                <Link href="/account">
                  <AccountButton
                    title="Account"
                    isActive={router === "/account"}
                  />
                </Link>
                <nav className={styles.header__container__links}>
                  {links.map((_link) => {
                    return (
                      <Link
                        href={_link.link}
                        className={`${styles.header__container__links__link} ${
                          router === _link.link ||
                          (_link.id === 2 && router.includes("/debates/"))
                            ? styles.current_link
                            : ""
                        }`}
                        key={"link-" + _link.id}
                      >
                        {_link.name}
                      </Link>
                    );
                  })}
                  {isAdmin && (
                    <Link
                      href={admin.link}
                      className={`${styles.header__container__links__link}  ${
                        router === admin.link ? styles.current_link : ""
                      }`}
                      onClick={closeMenu}
                    >
                      {admin.name}
                    </Link>
                  )}
                </nav>
                <CustomConnectButton />
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
}
