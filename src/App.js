import React, { Component } from "react";
import SoundCloudFrame from "./components/SoundCloudFrame";
import SocialMediaButton from "./components/SocialMediaButton";
import Logo from "./components/Logo/Logo";
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

    // if (loading) {
    //   return (
    //     <div className="loader">
    //       <h1>GET READY...</h1>
    //     </div>
    //   );
    // }

    const countDownTimer = () => {
      // Set the date we're counting down to
      var countDownDate = new Date("May 31, 2019 00:00:00").getTime();

      // Update the count down every 1 second
      var x = setInterval(function() {
        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="timer"
        document.getElementById("timer").innerHTML =
          days + "d" + hours + "h" + minutes + "m" + seconds + "s ";

        // If the count down is finished, write some text
        if (distance < 0) {
          clearInterval(x);
          document.getElementById("timer").innerHTML = "EXPIRED";
        }
      }, 1000);
    };

    return (
      <div className="app-wrapper">
        <div className="main-wrapper">
          <Logo />
          <h2 className="flash">COMING SOON</h2>
          <h2 id="timer">{countDownTimer()}</h2>
        </div>
        <div className="footer-wrapper">
          <SocialMediaButton />
          <p>&copy; O.G. Nerd 2019</p>
        </div>
      </div>
    );
  }
}

export default App;
