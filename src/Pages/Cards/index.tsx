import React, { Component } from "react";
import { default as PageSwitch, type PageSwitch as PW } from "pageswitch";
import { Page } from "Components/Page";
import { Poster } from "Components/Poster";
import { Cards as CardState } from "State/Cards";
import API from "./API";
import "./styles.scss";

export default class Cards extends Component<Record<string, never>> {
  private PW?: PW;

  override componentDidMount() {
    const { index } = CardState.getState();
    this.PW = new PageSwitch("cardSlider", {
      duration: 750,
      direction: 1,
      transition: "scrollCover",
      start: index < 0 ? 0 : index,
      loop: true,
      mousewheel: true,
      mouse: true,
      arrowkey: true,
    });
    this.PW.on("after", index => {
      CardState.setActive(index);
    });
  }

  override shouldComponentUpdate() {
    return false;
  }

  override componentWillUnmount() {
    if (this.PW) {
      this.PW.destroy();
    }
  }

  override render() {
    return (
      <Page name="cards">
        <div id="cardSlider">
          {API.map((entry, index) => {
            return <Poster key={entry.name} {...entry} index={index} />;
          })}
        </div>
      </Page>
    );
  }
}
