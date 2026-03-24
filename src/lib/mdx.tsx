import { evaluate } from "@mdx-js/mdx";
import { cache } from "react";
import * as runtime from "react/jsx-runtime";
import { mdxComponents } from "@/components/mdx-components";

type EvaluatedMdxModule = {
  default: (props: { components?: typeof mdxComponents }) => JSX.Element;
};

const evaluateMdx = cache(async (source: string) => {
  return (await evaluate(source, {
    ...runtime
  })) as EvaluatedMdxModule;
});

export async function RenderMdx({ source }: { source: string }) {
  const { default: Content } = await evaluateMdx(source);

  return <Content components={mdxComponents} />;
}
