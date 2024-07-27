import Header from "components/Header/Header";
import styles from "./home.module.scss";
import { unstable_setRequestLocale } from "next-intl/server";
import HomeBanner from "components/HomeBanner/HomeBanner";
import JumpToForm from "components/JumpToForm/JumpToForm";
import AboutUs from "components/AboutUs/AboutUs";
import Form from "components/Form/Form";

export default function Home({ params: { locale } }) {
  unstable_setRequestLocale(locale);

  return (
    <main className={styles.main}>
      <Header />
      <HomeBanner />
      <JumpToForm />
      <AboutUs />
      <Form />
    </main>
  );
}
