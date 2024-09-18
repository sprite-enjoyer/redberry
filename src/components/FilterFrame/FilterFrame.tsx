import { ReactNode } from "react";
import styles from "./FilterFrame.module.scss";
import { Button } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { observer } from "mobx-react";

interface FilterProps {
  children: ReactNode;
  buttonText: string;
  isOpen: boolean;
  onSubmit: () => void;
  title: string;
  setOpen: (open: boolean) => void;
}

const FilterFrame = ({ children, buttonText, isOpen, onSubmit, title, setOpen }: FilterProps) => {
  return (
    <div className={styles.root}>
      <Button onClick={() => setOpen(!isOpen)}>
        {buttonText}
        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </Button>
      {isOpen ? (
        <div className={styles.root__filterValues}>
          <>
            <span className={styles.root__filterValues__title}>{title}</span>
            {children}
            <div className={styles.root__filterValues__submitBtnWrapper}>
              <Button onClick={() => onSubmit()}>არჩევა</Button>
            </div>
          </>
        </div>
      ) : null}
    </div>
  );
};

export default observer(FilterFrame);
