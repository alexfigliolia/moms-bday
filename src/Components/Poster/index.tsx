import React, { Component } from "react";
import { Title } from "./Title";
import { Content } from "./Content";
import { connectCards } from "State/Cards";
import type { ICards } from "Models/types";
import "./styles.scss";

class PosterRenderer extends Component<Props, State> {
  length: number;
  letters: string[];
  activeDelay: number;
  state: State = { expanded: false };
  constructor(props: Props) {
    super(props);
    const { name } = this.props;
    this.letters = name.split("");
    this.length = this.letters.filter(v => v !== " ").length;
    this.activeDelay = this.length * 50 + 500;
  }

  public override shouldComponentUpdate({ active }: Props) {
    return active !== this.props.active;
  }

  override render() {
    const { text, img, active } = this.props;
    return (
      <div
        className={`poster ${active ? "active" : ""}`}
        style={{
          "--inject-background": `url(${img})`,
        }}>
        <article>
          <Title letters={this.letters} length={this.length} />
          <Content text={text} active={active} delay={this.activeDelay} />
        </article>
      </div>
    );
  }
}

interface OwnProps {
  img: string;
  text: string;
  name: string;
  index: number;
}

interface Props extends OwnProps {
  active: boolean;
}

interface State {
  expanded: boolean;
}

const mSTP = ({ index: activeIndex }: ICards, { index }: OwnProps) => {
  return { active: activeIndex === index };
};

export const Poster = connectCards(mSTP)(PosterRenderer);
