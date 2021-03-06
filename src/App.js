import React, { Component } from "react";
import SoundCloudFrame from "./components/SoundCloudFrame";
import SocialMediaButton from "./components/SocialMediaButton";
import Logo from "./components/Logo/Logo";
import "./App.css";
import Audio from "./assets/magicword.mp3";
import Gif from "./assets/images/jurassic_park.gif";

class App extends Component {
  state = {
    loading: true,
    followers: 0,
    virus: false
  };

  componentDidMount() {
    setTimeout(
      () =>
        this.setState({
          loading: false
        }),
      3000
    );

    fetch(
      "https://api.instagram.com/v1/users/self?access_token=4747502952.1677ed0.8e1da9dbd1c84de2bcf9b6cc53800484"
    )
      .then(results => {
        return results.json();
      })
      .then(data => {
        this.setState({
          followers: data.data.counts.followed_by
        });
      });
  }

  render() {
    const { loading } = this.state;

    // if (loading) {
    //   return (
    //     <div className="loader">
    //       <h1>Now Loading</h1>
    //     </div>
    //   );
    // }

    // const countDownTimer = () => {
    //   // Set the date we're counting down to
    //   var countDownDate = new Date("May 31, 2019 00:00:00").getTime();

    //   // Update the count down every 1 second
    //   var x = setInterval(function() {
    //     // Get today's date and time
    //     var now = new Date().getTime();

    //     // Find the distance between now and the count down date
    //     var distance = countDownDate - now;

    //     // Time calculations for days, hours, minutes and seconds
    //     var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    //     var hours = Math.floor(
    //       (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    //     );
    //     var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    //     var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    //     // Display the result in the element with id="timer"
    //     document.getElementById("timer").innerHTML =
    //       days + "d" + hours + "h" + minutes + "m" + seconds + "s ";

    //     // If the count down is finished, write some text
    //     if (distance < 0) {
    //       clearInterval(x);
    //       document.getElementById("timer").innerHTML = "DEPLOYING...";
    //     }
    //   }, 1000);
    // };

    const formatNumber = num => {
      var num_parts = num.toString().split(".");
      num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return num_parts.join(".");
    };

    let myAudio = document.getElementById("myAudio");

    const playAudio = e => {
      myAudio.play();

      this.setState({
        virus: !this.state.virus
      });
    };

    const clearVirus = e => {
      myAudio.pause();
      this.setState({
        virus: false
      });
    };

    console.log(
      this.state.virus ? "Get Fucked!" : "Your are clean of all diseases"
    );

    return (
      <div>
        <div>
          <img
            onClick={e => clearVirus(e)}
            className={`${
              this.state.virus === true ? "virusImage" : "virusImage--hidden"
            }`}
            src={Gif}
            alt="Newman"
          />
        </div>
        <div className="app-wrapper">
          <audio id="myAudio" loop controls>
            <source src={Audio} type="audio/mpeg" />
          </audio>
          <div className="main-wrapper">
            <Logo />
            <h2 className="flash">COMING SOON</h2>
            {/* <h2 id="timer">{countDownTimer()}</h2> */}
            <div style={{ paddingTop: "10px" }}>
              <h3>
                {this.state.followers <= 3999
                  ? "We're almost at "
                  : "We've reached over "}
                4K followers on Instagram!
                <br />
                @o.g_nerd - {formatNumber(this.state.followers)} followers
              </h3>
              <button onClick={e => playAudio(e)}>
                PRESS to <br />
                Execute Order 66{" "}
              </button>
              {/* <img className="gif" src={Gif} alt="GIF" /> */}
            </div>
          </div>
          <div className="footer-wrapper">
            <SocialMediaButton />
            <p>&copy; O.G. Nerd 2019</p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
