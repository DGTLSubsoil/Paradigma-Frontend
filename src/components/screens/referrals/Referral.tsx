import styles from "@/styles/components/screens/referrals/referral.module.css";
import { truncateAddress } from "@/utils/truncateAddress";

interface ReferralProps {
  address: `0x${string}`;
  volume: bigint;
  income: bigint;
  explorer: string;
  width: number;
  style?: React.CSSProperties;
}

export default function Referral({
  address,
  volume,
  income,
  explorer,
  width,
  style,
}: ReferralProps) {
  const isMobile = width && width <= 760;

  const truncatedAddress = truncateAddress({
    address,
    width,
    startingWidth: isMobile ? 456 : 1430,
    minimumCharacters: 3,
    power: isMobile ? 2.3 : 2.7,
  });

  return (
    <div className={styles.referral} style={style}>
      <div className={styles.referral__container}>
        <div className={styles.referral__container__body}>
          {isMobile ? (
            <>
              <div style={{ width: "100%" }}>
                <a href={`${explorer}/address/${address}`} target="_blank">
                  {truncatedAddress}
                </a>
                <h6>Referral Address</h6>
              </div>
              <p>
                {Number(income)}
                <h6>Volume ($PARAD)</h6>
              </p>
              <p>
                {Number(volume)}
                <h6>Your Income</h6>
              </p>
            </>
          ) : (
            <>
              <a href={`${explorer}/address/${address}`} target="_blank">
                {truncatedAddress}
              </a>
              <p>{Number(income)}</p>
              <p>{Number(volume)}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
