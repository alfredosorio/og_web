import React, { Component } from "react";
import SoundCloudFrame from "./components/SoundCloudFrame";
import SocialMediaButton from "./components/SocialMediaButton";
import Logo from "./components/Logo";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="app-wrapper">
        <div className="header-wrapper">
          <SoundCloudFrame />
        </div>
        <div className="main-wrapper">
          <Logo />
          <h2>COMING SOON</h2>
        </div>
        <div className="footer-wrapper">
          <div>
            <SocialMediaButton
              link="https://www.facebook.com/OriGNerd/"
              icon="fab fa-facebook-f"
            />
            {/* Instagram */}
            <SocialMediaButton
              link="https://www.instagram.com/o.g_nerd/"
              icon="fab fa-instagram"
            />
            {/* YouTube */}
            <SocialMediaButton
              link="https://www.youtube.com/watch?v=AYMewuppO0k"
              icon="fab fa-youtube"
            />
          </div>
          {/* Facebook */}

          <p>&copy; OG Nerd 2019</p>
        </div>
      </div>
    );
  }
}

export default App;
