import NormalButton from "@/components/buttons/Normal";
import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 | Paradigma",
};

export default function Custom404() {
  return (
    <div>
      <div className="page_404">
        <div className="page_404__container">
          <div className="page_404__info">
            <div>
              <h4 className="purple_color">Page Not Found</h4>
              <h1>ERROR 404</h1>
            </div>
            <h4>Something went wrong. please try again later</h4>
          </div>
          <Link href="/" className="page_404__info__button">
            <NormalButton
              title="Go To Main"
              style={{
                width: "100%",
                maxWidth: "450px",
                minWidth: "160px",
              }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
