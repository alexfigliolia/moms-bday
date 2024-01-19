import type { ComponentType } from "react";

export type ComponentModule = { default: ComponentType };

export type WrappedLoader = [
  component: Promise<ComponentModule>,
  preloader?: Promise<any>,
];
