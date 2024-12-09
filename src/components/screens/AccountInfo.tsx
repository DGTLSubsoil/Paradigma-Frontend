"use client";

import styles from "@/styles/components/screens/account_info.module.css";
import { useAccount, useBalance } from "wagmi";
import { formatUnits } from "viem";
import { motion } from "framer-motion";
import BackButton from "../buttons/Back";
import { useWindowSize } from "@/hooks/useWindowSize";
import BackMobile from "../buttons/BackMobile";
import { truncateAddress } from "@/utils/truncateAddress";
import { useParadBalance } from "@/hooks/useContractData";
import { toOptionalFixed } from "@/utils/converter";
import PurpleButton from "../buttons/Purple";

const animation = (_delay?: number) => ({
  initial: { x: -100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { delay: _delay ? _delay : 0.05 },
});

export default function AccountInfo() {
  const { address } = useAccount();
  const { data } = useBalance({ address: address });
  const { formattedBalance } = useParadBalance(address);
  const { width } = useWindowSize();

  const isMobile = width && width <= 760;

  const truncatedAddress = truncateAddress({
    address,
    width,
    startingWidth: 1300,
  });

  const balance =
    data?.value !== undefined && data?.decimals
      ? formatUnits(data?.value, data?.decimals)
      : 0;
  const symbol = data?.symbol;

  // useEffect(() => {
  //   const { getTopics: getDisputes } = blockchainService;

  //   const fetchData = async () => {
  //     const disputes = await getDisputes();
  //     console.log(disputes);
  //   };

  //   fetchData();
  // }, []);

  return (
    <div className={styles.account_info}>
      {isMobile && (
        <div className={styles.account_info__head}>
          <BackButton title="Go Back" />
        </div>
      )}
      <div className={styles.account_info__container}>
        <div className={styles.account_info__container__data}>
          {/* {isMobile && (
            <motion.div {...animation()}>
              <BackMobile title={"Go Back"} />
            </motion.div>
          )} */}
          <div>
            <motion.div {...animation()}>
              <h4 className="purple_color">Welcome</h4>
            </motion.div>

            {truncatedAddress ? (
              <motion.div
                className={styles.flex__space_between}
                style={{ textTransform: "none" }}
                {...animation()}
              >
                <h1>{truncatedAddress}</h1>
                {!isMobile && <BackButton title="Go Back" />}
              </motion.div>
            ) : (
              <motion.div
                className={styles.flex__space_between}
                {...animation()}
              >
                <h1>Please, connect your wallet</h1>
                {!isMobile && <BackButton title="Go Back" />}
              </motion.div>
            )}
          </div>
          {address && (
            <>
              <motion.div className="purple_color" {...animation(0.1)}>
                <h2>
                  {formattedBalance ? toOptionalFixed(formattedBalance, 4) : 0}{" "}
                  $parad
                </h2>
                <h4>balance parad</h4>
              </motion.div>

              <motion.div className="purple_color" {...animation(0.15)}>
                <h2>
                  {balance ? toOptionalFixed(balance, 4) : 0} ${symbol}
                </h2>
                <h4>balance {symbol}</h4>
              </motion.div>
              <a
                style={{ width: 300, height: 75 }}
                target="_blank"
                href="https://pancakeswap.finance/swap?outputCurrency=0xBDa093C16347b5B106bC5BF9aFd0DdEef85eA60C"
              >
                <PurpleButton
                  style={{ width: "100%", height: "100%" }}
                  title="Buy PARAD Tokens"
                />
              </a>
              {/* <motion.div {...animation(0.2)}>
                <h2>some info</h2>
                <h4>info</h4>
              </motion.div> */}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
