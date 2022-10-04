import Spinner from "react-bootstrap/Spinner";
import "./loadingbox.scss";

export default function LoadingBox() {
  return (
    <div className="loaderScreen">
      <div className="spinner">
        <div className="loader l1"></div>
        <div className="loader l2"></div>
      </div>
    </div>
  );
}
