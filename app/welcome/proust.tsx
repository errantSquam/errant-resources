import { useQuery } from "@tanstack/react-query";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import Markdown from "react-markdown";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import rehypeExternalLinks from "rehype-external-links";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";

function LinkRenderer(props: any) {
    console.log({ props });
    return (
        <a href={props.href} target="_blank" rel="noreferrer">
            {props.children}
        </a>
    );
}

export function Proust() {


    const mdQuery = useQuery({
        queryKey: ["proust"],
        queryFn: async () => {
            const response = await fetch(`/misc/proust_cn.md`)
            return response.text()
        }
    })

    useEffect(() => {
        let id = window.location.hash.substring(1)
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

    }, [mdQuery.isSuccess])
    //test
    return (
        <main className="flex flex-col p-10 pt-16 pb-4 space-y-4 w-full md:w-2/3 text-lg">
            <div id="top" />

            <Markdown
                remarkPlugins={[
                    [remarkToc, { tight: true, maxDepth: 2 }],

                ]}

                rehypePlugins={[
                    [rehypeSlug],
                    [rehypeExternalLinks, { target: '_blank' }]
                ]}
            >{mdQuery.isSuccess ? mdQuery.data : "Loading..."}</Markdown>

            <hr className="w-3/4" />

            <div className="italic py-2 text-lg"
                onClick={() => document.getElementById("top")?.scrollIntoView({ behavior: 'smooth' })}
            > Done reading? <u className="cursor-pointer">Back to top</u></div>

        </main>
    );
}
