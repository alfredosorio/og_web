import React from "react";

const SoundCloudFrame = () => {
  return (
    <div className="soundcloud">
      <iframe
        width="100%"
        height="123"
        scrolling="no"
        frameborder="no"
        allow="autoplay"
        title="soundcloudframe"
        src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/554774223&color=%23ff5500&auto_play=true&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
      />
    </div>
  );
};

export default SoundCloudFrame;
