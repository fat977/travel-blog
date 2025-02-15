import { faLinkedin, faSquareFacebook, faSquareInstagram, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './social-media.scss'
const SocialMediaComponent = ({classname}) => {
  return (
    <div className={`social-media d-flex gap-3 ${classname}`}>
      <FontAwesomeIcon icon={faSquareFacebook} />
      <FontAwesomeIcon icon={faXTwitter} />
      <FontAwesomeIcon icon={faLinkedin} />
      <FontAwesomeIcon icon={faSquareInstagram} />
    </div>
  );
};
export default SocialMediaComponent;
