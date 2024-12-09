import PurpleButton from "@/components/buttons/Purple";
import GreyButton from "@/components/buttons/Grey";
import styles from "@/styles/pages/debates.module.css";
import Link from "next/link";
import Image from "next/image";

import type { Metadata } from "next";
import Debates from "@/components/screens/debates/Debates";
import {
  debatesService,
  // getCachedData,
  // getItem,
} from "@/services/debates.service";
import Topics from "@/components/screens/topics/Topics";
import { CreateDebatesModalButton } from "@/components/modal/CreateDebates";
import { PNG } from "@/../public/static/images/png/png";
import HotDebates from "@/components/screens/debates/HotDebates";

/* export const dynamic = 'force-dynamic' */

export const metadata: Metadata = {
  title: "Debates | Paradigma",
};

export default async function DebatesPage() {
  const { getAll } = debatesService;
  // const _data = await getCachedData();
  const data = await getAll();

  //console.log("TOPICS DATA:", data);

  return (
    <div className={styles.debates}>
      <div className={styles.debates__container}>
        <div className={styles.debates__container__description}>
          <div className={styles.debates__container__description__info}>
            <div className={styles.debates__container__description__info__text}>
              <h1>Battle of Opinions</h1>
              <h4>
                Become a participant in world disputes and conspiracies. Over
                1000 controversies on topics ranging from politics and religion
                to culture and science! Daily!
              </h4>
            </div>
            <div
              className={styles.debates__container__description__info__buttons}
            >
              <Link
                className={
                  styles.debates__container__description__info__buttons_btn
                }
                href="#hot-debates"
              >
                <PurpleButton style={{ width: "100%" }} title="Hot Debates" />
              </Link>
              <Link
                className={
                  styles.debates__container__description__info__buttons_btn
                }
                href="#topics"
              >
                <GreyButton style={{ width: "100%" }} title="Choose Topic" />
              </Link>
              {/* <CreateDebatesModalButton /> */}
            </div>
            <h4 className={styles.debates__container__description__info_text}>
              The winners of which will receive guaranteed winnings in crypto
              coin.
            </h4>
          </div>
          {/* <div
            className={`${styles.debates__container__description__image} ${styles.pc}`}
          ></div> */}
          <Image
            className={`${styles.debates__container__description__image} ${styles.pc}`}
            src={PNG.sphere_with_bg}
            alt="sphere"
          />
        </div>
        <div
          id="hot-debates"
          className={styles.debates__container__hot_debates}
        >
          <div>
            <h4 className="golden_color">Almost Finished</h4>
            <h1>Hot Debates</h1>
          </div>
          <HotDebates />
        </div>
        <div id="topics" className={styles.debates__container__debates}>
          <div>
            <h4 className="purple_color">Choose Where To Debate</h4>
            <h1>All Topics</h1>
          </div>
          {data && <Topics topics={data?.topics} />}
        </div>
      </div>
    </div>
  );
}
