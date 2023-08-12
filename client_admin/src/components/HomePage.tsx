import { Typography } from "@mui/material";
import image from "../assets/homePageImage.jpg";
import "../style/HomePage.css";

export function HomePage() {
  return (
    <div className="main-container">
      <Typography className="text">
        <span className="heading">
          <span className="title">Unleash</span>Your Potential.
        </span>
        <br />
        <span className="para">
          Immerse yourself in a handpicked collection of cutting-edge technical
          courses, meticulously crafted to propel your expertise and career
          trajectory. From coding prowess to cybersecurity mastery, our
          industry-leading instructors ensure you remain primed for success in
          the dynamic world of technology.
          <br /> Embark on your transformative journey today.
        </span>
      </Typography>
      <img src={image} />
    </div>
  );
}
