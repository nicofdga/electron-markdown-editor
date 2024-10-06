import type React from 'react'
import { useEffect, useState, useRef } from 'react'
import { EditorView } from 'codemirror'
import { markdown, markdownLanguage } from "@codemirror/lang-markdown"
import { HighlightStyle } from "@codemirror/language"
import { tags } from "@lezer/highlight"
import { syntaxHighlighting } from "@codemirror/language"
import { languages } from '@codemirror/language-data'
import { keymap } from "@codemirror/view"
import { defaultKeymap, historyKeymap} from "@codemirror/commands"
import { oneDarkTheme } from '@codemirror/theme-one-dark'
import { githubDark } from '@uiw/codemirror-theme-github'

const mySyntaxHighlighting = HighlightStyle.define([
  {
    tag: tags.heading1,
    fontSize: '1.6em',
    fontWeight: 'bold'
  },
  {
    tag: tags.heading2,
    fontSize: '1.4em',
    fontWeight: 'bold'
  },
  {
    tag: tags.heading3,
    fontSize: '1.2em',
    fontWeight: 'bold'
  }
])

const useCodeMirror = <T extends Element>(
  props: any
): [React.MutableRefObject<T | null>, EditorView?] => {
  const refContainer = useRef<T>(null)
  const [editorView, setEditorView] = useState<EditorView>()
  const { onChange } = props

  useEffect(() => {
    if (!refContainer.current) return

    let view = new EditorView({
      doc: props.initialDoc,
      extensions: [
        keymap.of([...defaultKeymap, ...historyKeymap]),
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
          addKeymap: true
        }),
        syntaxHighlighting(mySyntaxHighlighting),
        EditorView.lineWrapping,
        EditorView.updateListener.of(update => {
          if (update.changes) {
            onChange && onChange(update.state)
          }
        }),
        githubDark,
      ],
      parent: refContainer.current
    })

    setEditorView(view)
  }, [refContainer])

  return [refContainer, editorView]
}

export default useCodeMirror