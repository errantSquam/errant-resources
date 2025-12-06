import type { Route } from "./+types/home";
import { BirdAnatomy } from "~/welcome/birdanatomy";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Bird Anatomy" },
    { name: "bird anatomy", content: "bird anatomy guide" },
  ];
}

export default function Home() {
  return <BirdAnatomy />;
}
