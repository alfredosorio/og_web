import React from "react";

class SocialMediaButton extends React.Component {
  render() {
    return (
      <div className="social-media-wrapper">
        <a
          href="https://www.facebook.com/OriGNerd/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-facebook-f" />
        </a>
        <a
          href="https://www.instagram.com/o.g_nerd/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-instagram" />
        </a>
        <a
          href="https://www.youtube.com/watch?v=AYMewuppO0k"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-youtube" />
        </a>
      </div>
    );
  }
}

export default SocialMediaButton;
