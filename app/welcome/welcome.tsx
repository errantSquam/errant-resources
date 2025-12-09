import { useQuery } from "@tanstack/react-query";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import Markdown from "react-markdown";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import rehypeExternalLinks from "rehype-external-links";
import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router";
import { Link } from "react-router";

function LinkRenderer(props: any) {
  console.log({ props });
  return (
    <a href={props.href} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  );
}

export function Welcome() {

  let params = useParams()
  const [searchParams, setSearchParams] = useSearchParams();

  const [currentTab, setCurrentTab] = useState(searchParams.get("tab") || "resources")

  const mdQuery = useQuery({
    queryKey: [currentTab],
    queryFn: async () => {
      const response = await fetch(`${currentTab}.md`)
      return response.text()
    }
  })

  useEffect(() => {
    
    let tempTab = params.tab
    console.log(params)
    if (tempTab !== undefined) {
      setCurrentTab(tempTab)
    }
  }, [searchParams])

  useEffect(() => {
    let id = window.location.hash.substring(1)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  }, [mdQuery.isSuccess])
  //test
  return (
    <main className="flex flex-col p-10 pt-16 pb-4 space-y-4 w-full md:w-2/3">
      <div id="top" />
      <div><b> Looking for bird wing tutorials? Head over to <a href = "/birdanatomy/" className = "underline cursor-pointer">this link!</a></b></div>

      <Markdown
        remarkPlugins={[
          [remarkToc, { tight: true, maxDepth: 3 }],

        ]}

        rehypePlugins={[
          [rehypeSlug],
          [rehypeExternalLinks, {target: '_blank'}]
        ]}
      >{mdQuery.isSuccess ? mdQuery.data : "Loading..."}</Markdown>

      {/*<div className="">
        <div><i>Want to help fund my art textbook addiction?</i> </div>
        <div>
          <a href="https://ko-fi.com/errantsquam" target="_blank">
            <img src="support_me_on_kofi_beige.png" className="w-40" />
          </a>
        </div>
      </div>*/}
      <hr className="w-3/4" />

      <div className="italic py-2 text-lg"
        onClick={() => document.getElementById("top")?.scrollIntoView({ behavior: 'smooth' })}
      > Done reading? <u className="cursor-pointer">Back to top</u></div>

    </main>
  );
}
