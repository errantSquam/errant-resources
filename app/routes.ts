import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [index("routes/home.tsx"),
    route("birdanatomy", "routes/birdanatomyroute.tsx")
] satisfies RouteConfig;
