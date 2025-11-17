import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resources" },
    { name: "resources", content: "list of resources" },
  ];
}

export default function Home() {
  return <Welcome />;
}
