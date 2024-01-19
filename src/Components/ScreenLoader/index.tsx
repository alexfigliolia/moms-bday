import React, { Component } from "react";
import { Loader } from "Components/Loader";
import type { IScreen } from "Models/types";
import { connectScreen } from "State/Screen";
import "./styles.scss";

class FulScreenLoader extends Component<IScreen> {
  override shouldComponentUpdate({ height, width }: IScreen) {
    if (width !== this.props.width) return true;
    if (height !== this.props.height) return true;
    return false;
  }

  override render() {
    const { width, height } = this.props;
    return (
      <div className="screen-loader" style={{ width, height }}>
        <Loader />
      </div>
    );
  }
}

const mSTP = ({ height, width }: IScreen) => {
  return { height, width };
};

export const ScreenLoader = connectScreen(mSTP)(FulScreenLoader);
