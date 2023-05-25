import classes from "./loadingSpinner.module.css";

function LoadingSpinner() {
  return (
    <div className={classes.spinner_container}>
      <div className={classes.loading_spinner}></div>
    </div>
  );
}

export default LoadingSpinner;
