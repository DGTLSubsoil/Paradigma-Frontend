"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import styles from "@/styles/components/buttons/connect.module.css";
import { SVG } from "@/../public/static/images/svg/svg";
import Image from "next/image";

interface CustomConnectButtonProps {
  style?: React.CSSProperties;
  divClassName?: string;
}

export default function CustomConnectButton({
  style,
  divClassName,
}: CustomConnectButtonProps) {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
            className={divClassName ? divClassName : ""}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    className={`${styles.connect__button} ${styles.connect__button__text}`}
                    onClick={openConnectModal}
                    style={style}
                    type="button"
                  >
                    <Image
                      className={styles.connect__button__cubes}
                      src={SVG.cubes}
                      alt="cubes"
                    />
                    <Image src={SVG.wallet} alt="wallet" />
                    Connect
                  </button>
                );
              }
              if (chain.unsupported) {
                return (
                  <button
                    className={`${styles.connect__button} ${styles.connect__button__text}`}
                    onClick={openChainModal}
                    style={style}
                    type="button"
                  >
                    <Image
                      className={styles.connect__button__cubes}
                      src={SVG.cubes}
                      alt="cubes"
                    />
                    <Image src={SVG.wallet} alt="wallet" />
                    Wrong Network
                  </button>
                );
              }
              return (
                <div
                  style={{ display: "flex", gap: 12 }}
                  className={divClassName}
                >
                  {/* <button
                    className={`${styles.connect__button} ${styles.connect__button__text}`}
                    onClick={openChainModal}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: 8,
                      borderRadius: 999,
                    }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 34,
                          height: 34,
                          borderRadius: 999,
                          overflow: "hidden",
                          // marginRight: -6,
                        }}
                      >
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            // style={{ width: 12, height: 12 }}
                            width={34}
                            height={34}
                          />
                        )}
                      </div>
                    )} 
                  </button>*/}
                  <button
                    className={`${styles.connect__button} ${styles.connect__button__text}`}
                    onClick={openAccountModal}
                    style={style}
                    type="button"
                  >
                    <Image
                      className={styles.connect__button__cubes}
                      src={SVG.cubes}
                      alt="cubes"
                    />
                    <Image src={SVG.wallet} alt="wallet" />

                    {account.displayName}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
