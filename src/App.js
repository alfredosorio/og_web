import React, { Component } from "react";
import SoundCloudFrame from "./components/SoundCloudFrame";
import SocialMediaButton from "./components/SocialMediaButton";
import Logo from "./components/Logo";
import "./App.css";

class App extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    setTimeout(
      () =>
        this.setState({
          loading: false
        }),
      3000
    );
  }
  render() {
    const { loading } = this.state;

    if (loading) {
      return (
        <div className="loader">
          <h1>GET READY...</h1>
        </div>
      );
    }

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
            {/* Facebook */}
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

          <p>&copy; O.G. Nerd 2019</p>
        </div>
      </div>
    );
  }
}

export default App;
