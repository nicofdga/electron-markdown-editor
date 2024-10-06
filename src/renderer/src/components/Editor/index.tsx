import { useCallback, useEffect } from "react"
import useCodeMirror from "../use-codemirror"
import React from "react";

interface Props {
    initialDoc: string,
    onChange: (doc: string) => void
}

const Editor: React.FC<Props> = (props) => {
    const { onChange, initialDoc } = props
    const handleChange = useCallback(
        state => onChange(state.doc.toString()),
        [onChange]
    )
    const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
        initialDoc: initialDoc,
        onChange: handleChange
    })

    const handleFileOpen = (doc: string) => {
        editorView.dispatch({
            changes: {
                from: 0,
                to: editorView.state.doc.length,
                insert: doc
            }
        })
    };

    useEffect(() => {
        if (editorView) {
            // Listen for the response from the main process
            window.api.onOpenFile(handleFileOpen);
        }
    }, [editorView])

    return <div className='editor-wrapper' ref={refContainer}></div>
}

export default Editor