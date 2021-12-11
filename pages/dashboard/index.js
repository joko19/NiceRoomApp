import Header from "../../components/header/header"
import { admin } from "../../redux/privateRoute"
import PropTypes from "prop-types";
import { connect } from "react-redux";

function Index(props){
  console.log(props)
  return(
    <div>
      <Header name={props.auth.user.user.name}/>
    </div>
  )
}

const withAuth =  admin(Index)
withAuth.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});
export default connect(mapStateToProps)(withAuth);
