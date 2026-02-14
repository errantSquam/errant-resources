import type { Route } from "./+types/home";
import { Proust } from "~/welcome/proust";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Proust" },
        { name: "Proust", content: "CN TL" },
    ];
}

export default function Home() {
    return <Proust />;
}
