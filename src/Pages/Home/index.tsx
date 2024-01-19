import React, { Component } from "react";
import { Page } from "Components/Page";
import { BirthdayText } from "Components/BirthdayText";
import { ExploreButton } from "./ExploreButton";
import "./styles.scss";

export default class Home extends Component<Props> {
  override shouldComponentUpdate() {
    return false;
  }

  override render() {
    return (
      <Page name="home">
        <div>
          <BirthdayText />
          <ExploreButton />
        </div>
      </Page>
    );
  }
}

type Props = Record<string, never>;
