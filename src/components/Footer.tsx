"use client";
import styles from "@/styles/components/footer.module.css";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { PNG } from "@/../public/static/images/png/png";
import { useWindowSize } from "@/hooks/useWindowSize";

const links = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "Debates", link: "/debates" },
  { id: 3, name: "FAQ", link: "/faq" },
  { id: 4, name: "Account", link: "/account" },
];

const conditionLinks = [
  { id: 1, name: "Terms of Service", link: "/terms" },
  { id: 2, name: "Privacy Policy", link: "/privacy" },
  { id: 3, name: "Cookie Settings", link: "/cookie" },
];

export default function Footer() {
  const router = usePathname();
  const { width } = useWindowSize();

  const targetViewportSize = 760;

  const mobileConditionLinks = conditionLinks
    .map((link) => {
      if (link.id === 1) {
        return { ...link, id: 2 };
      } else if (link.id === 2) {
        return { ...link, id: 1 };
      } else {
        return link;
      }
    })
    .sort((a, b) => a.id - b.id);

  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <div className={styles.footer__container__content}>
          <Image src={PNG.sphere} alt="logo" width={85} height={85} />
          <nav className={styles.footer__container__content__links}>
            {links.map((_link) => {
              return (
                <Link
                  href={_link.link}
                  className={`${styles.link} ${
                    router === _link.link ||
                    (_link.id === 2 && router.includes("/debates/"))
                      ? styles.link__current
                      : ""
                  }`}
                  key={"link-" + _link.id}
                >
                  {_link.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className={styles.footer__container__bottom}>
          <hr style={{ width: "100%" }} />
          <div className={styles.footer__container__bottom__info}>
            {width && width > targetViewportSize && (
              <p>© 2024 Paradigma. All rights reserved.</p>
            )}
            <nav className={styles.footer__container__bottom__info__conditions}>
              {(width && width <= targetViewportSize
                ? mobileConditionLinks
                : conditionLinks
              ).map((_link) => {
                return (
                  <Link
                    href={_link.link}
                    className={`${styles.link} ${
                      router === _link.link ? styles.link__current : ""
                    }`}
                    key={"link-" + _link.id}
                  >
                    {_link.name}
                  </Link>
                );
              })}
            </nav>
            {width && width <= targetViewportSize && (
              <p>© 2024 Paradigma. All rights reserved.</p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
