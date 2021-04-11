import ReplayIcon from "@material-ui/icons/Replay";
import CloseIcon from "@material-ui/icons/Close";
import StarRateIcon from "@material-ui/icons/StarRate";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FlashOnIcon from "@material-ui/icons/FlashOn";
import IconButton from "@material-ui/core/IconButton";
import "./SwipeButtons.css";

import React from "react";

export default function SwipeButtons() {
  return (
    <section>
      <footer className="swipeButtons MultiIconButton-root">
        <IconButton>
          <ReplayIcon className="swipeButtons__repeat"  />
        </IconButton>
        <IconButton>
          <CloseIcon className="swipeButtons__close"  />
        </IconButton>
        <IconButton>
          <StarRateIcon className="swipeButtons__star"  />
        </IconButton>
        <IconButton>
          <FavoriteIcon className="swipeButtons__favorite"  />
        </IconButton>
        <IconButton>
          <FlashOnIcon className="swipeButtons__lightning"  />
        </IconButton>
      </footer>
    </section>
  );
}
