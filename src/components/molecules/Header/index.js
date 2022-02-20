import { Image, Label, Divider } from "../../index";
import "./styles.css";
import logo from "../../../assets/logo/logo.png";
const Header = ({ label }) => {
  return (
    <>
      <div className="top-header">
        <Image src={logo} width={150} preview={false} />
        <Label label={label} />
      </div>
      <Divider />
    </>
  );
};

Header.defaultProps = {
  label: "",
};

export default Header;
