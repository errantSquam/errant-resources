import { Welcome } from "~/welcome/birdanatomy";
import type { Route } from "./+types/home";


export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bird Anatomy" },
    { name: "bird anatomy", content: "bird anatomy guide" },
  ];
}

export default function ParamRoute() {
  return <Welcome />;
}
