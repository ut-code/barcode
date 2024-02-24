import { ReactNode } from "react";
import styles from "./index.module.css";

export default function Playground({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.contentContainer}>{children}</div>
    </div>
  );
}
