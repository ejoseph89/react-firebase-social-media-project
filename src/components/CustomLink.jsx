import { Link, useLocation } from "react-router-dom";

const CustomLink = ({ children, to }) => {
  const location = useLocation();
  const match = location.pathname === to;


  return (
    <Link to={to} className={match ? "active" : ""}>
      {children}
    </Link>
  );
};

export default CustomLink;
