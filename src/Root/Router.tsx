import type { ComponentType } from "react";
import React, { Component } from "react";
import { Routing } from "State/Routing";
import { TaskQueue } from "Tools/TaskQueue";
import type { TimedPromiseResolution } from "Tools/TimedPromise";
import { TimedPromise } from "Tools/TimedPromise";
import type { ComponentModule } from "./types";

export class Router<T extends ComponentModule> extends Component<
  Props<T>,
  State
> {
  state: State = { Page: null };
  initialRoute: keyof Props<T>["routes"];
  initialLoad: Promise<TimedPromiseResolution<T>>;
  constructor(props: Props<T>) {
    super(props);
    this.initialRoute = this.currentRoute;
    this.initialLoad = this.createLoader(this.initialRoute).race();
    this.hashChange = this.hashChange.bind(this);
  }

  override async componentDidMount() {
    window.addEventListener("hashchange", this.hashChange);
    this.onRouteLoaded(this.initialRoute, await this.initialLoad);
  }

  override componentWillUnmount() {
    window.removeEventListener("hashchange", this.hashChange);
  }

  private hashChange() {
    const hash = this.currentRoute;
    void Routing.flipScreen().then(async () => {
      try {
        const Task = this.createLoader(hash, 1000);
        this.onRouteLoaded(hash, await Task.race());
      } catch (error) {
        // silence
      }
    });
  }

  private onRouteLoaded(
    hash: string,
    { result, remainingMS }: TimedPromiseResolution<T>,
  ) {
    this.setState({ Page: result.default }, () => {
      TaskQueue.deferTask(() => {
        Routing.initialize(remainingMS, () => {
          Routing.setRouteName(hash);
        });
      }, remainingMS || 300);
    });
  }

  private createLoader(hash: keyof Props<T>["routes"], threshold = 2000) {
    return new TimedPromise(() => this.props.routes[hash](), threshold);
  }

  private get currentRoute() {
    return window.location.hash.slice(1).toLowerCase() || this.props.default;
  }

  override render() {
    const { Page } = this.state;
    if (!Page) {
      return null;
    }
    return <Page />;
  }
}

interface Props<T extends ComponentModule> {
  default: string;
  routes: Record<string, () => Promise<T>>;
}

interface State {
  Page: ComponentType | null;
}
