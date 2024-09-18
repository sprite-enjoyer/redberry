import ListingFilters from "../../components/ListingFilters/ListingFilters";
import styles from "./ListingsPage.module.scss";

const ListingsPage = () => {
  return (
    <div className={styles.root}>
      <div className={styles.root__top}>
        <ListingFilters />
      </div>
      <div className={styles.root__listings}></div>
    </div>
  );
};

export default ListingsPage;
