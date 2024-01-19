import React, { Component, Fragment } from "react";
import type { CancelFN } from "@figliolia/task-queue";
import { TaskQueue } from "Tools/TaskQueue";
import "./styles.scss";

export class Content extends Component<Props> {
  cancelFN?: CancelFN;

  override componentDidMount() {
    if (this.props.active) {
      this.deferReset();
    }
  }

  override UNSAFE_componentWillReceiveProps({ active }: Props) {
    if (active === this.props.active) {
      return;
    }
    if (active) {
      this.deferReset();
    } else {
      this.cancelReset();
    }
  }

  public override shouldComponentUpdate({ active }: Props) {
    return active !== this.props.active;
  }

  public override componentWillUnmount() {
    this.cancelFN?.();
  }

  private deferReset(delay = this.props.delay + 2200) {
    this.cancelFN = TaskQueue.deferTask(() => {
      this.setState({ reset: true });
    }, delay);
  }

  private cancelReset() {
    this.cancelFN?.();
    this.setState({ reset: false });
  }

  override render() {
    const { text, active, delay } = this.props;
    return (
      <Fragment>
        <div
          className="poster-text"
          style={{
            transitionDelay: `${active ? delay : 0}ms`,
          }}>
          <p>{text}</p>
        </div>
      </Fragment>
    );
  }
}

interface Props {
  text: string;
  delay: number;
  active: boolean;
}
