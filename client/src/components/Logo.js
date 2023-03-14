// import { ReactComponent as LogoDark } from "../assets/images/logos/xtremelogo.svg";
import ulogo from "../assets/elogo1.png";
import { Link } from "react-router-dom";

const Logo = () => { 
  return (
    <Link to="/">
      <img src={ulogo} height={55} width={50} margin></img>
    </Link>
  );
};

export default Logo;