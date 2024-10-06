import rehypeSanitize from 'rehype-sanitize'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import rehypeReact, { Options } from 'rehype-react'
import * as prod from 'react/jsx-runtime'
import remarkGfm from 'remark-gfm'
// import RemarkCode from '@renderer/remark-code'
import 'github-markdown-css/github-markdown.css'
import rehypeHighlight from 'rehype-highlight'
import { common } from 'lowlight'
import bnf from 'highlight.js/lib/languages/bnf'

import "@renderer/assets/github-dark.min.css"
import { Highlighter } from 'react-codemirror-runmode'
import { oneDarkHighlightStyle } from '@codemirror/theme-one-dark'

const production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs }

interface Props {
    doc: string
}

const code = 'const x = 123'

const Preview: React.FC<Props> = (props): JSX.Element => {

    const md = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype)
        .use(rehypeSanitize)
        .use(rehypeHighlight, { languages: { ...common, bnf } })
        .use(rehypeReact, production as Options)
        .processSync(props.doc).result

    return (
        <div className="!max-w-[1000px] markdown-body !m-0 p-4">
            {md}
        </div>
    )
}

export default Preview