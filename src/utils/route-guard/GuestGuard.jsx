import PropTypes from "prop-types";

// project imports

const GuestGuard = ({ children }) => {
  return children;
};

GuestGuard.propTypes = {
  children: PropTypes.node,
};

export default GuestGuard;
