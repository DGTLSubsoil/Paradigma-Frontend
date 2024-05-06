import GreenButton from "@/components/buttons/Green";
import GreyButton from "@/components/buttons/Grey";
import styles from "@/styles/pages/debates.module.css";
import Link from "next/link";

import type { Metadata } from "next";
import Debates from "@/components/screens/debates/Debates";
import {
  debatesService,
  // getCachedData,
  // getItem,
} from "@/services/debates.service";
import Topics from "@/components/screens/topics/Topics";
import { CreateDebatesModalButton } from "@/components/modal/CreateDebates";

export const metadata: Metadata = {
  title: "Debates | Paradigma",
};

export default async function DebatesPage() {
  const { getAll } = debatesService;
  // const _data = await getCachedData();
  const data = await getAll();

  // console.log(data);

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
              <h4 className="green_color">
                The winners of which will receive guaranteed winnings in crypto
                coin.
              </h4>
            </div>
            <div
              className={styles.debates__container__description__info__buttons}
            >
              <Link href="#topics">
                <GreenButton title="Go To Debates" />
              </Link>
              <CreateDebatesModalButton />
            </div>
          </div>
          <div
            className={`${styles.debates__container__description__image} ${styles.pc}`}
          ></div>
        </div>
        <div id="topics" className={styles.debates__container__debates}>
          <h4 className="green_color">Choose Your Topic</h4>
          {data && <Topics topics={data?.topics} />}
        </div>
      </div>
    </div>
  );
}
