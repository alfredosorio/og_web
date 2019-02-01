import React from "react";

class SocialMediaButton extends React.Component {
  render() {
    return (
      <div className="social-media-button">
        <a href={this.props.link} target="_blank" rel="noopener noreferrer">
          <i className={this.props.icon} />
        </a>
      </div>
    );
  }
}

export default SocialMediaButton;
