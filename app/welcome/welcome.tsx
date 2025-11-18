import { useQuery } from "@tanstack/react-query";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import Markdown from "react-markdown";
import remarkToc from "remark-toc";
import rehypeSlug from "rehype-slug";
import rehypeExternalLinks from "rehype-external-links";

function LinkRenderer(props: any) {
  console.log({ props });
  return (
    <a href={props.href} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  );
}

export function Welcome() {
  const mdQuery = useQuery({
    queryKey: ['markdown'],
    queryFn: async () => {
      const response = await fetch('resources.md')
      return response.text()
    }
  })
  //test
  return (
    <main className="flex flex-col p-10 pt-16 pb-4 space-y-4 w-full md:w-2/3">
      <div id="top" />

      <Markdown
        remarkPlugins={[
          [remarkToc, { tight: true, maxDepth: 2 }],

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
