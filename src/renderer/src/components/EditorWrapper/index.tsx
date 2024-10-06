import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../TabList"

export function EditorWrapper({ editor, view }: { editor: any; view: React.ReactNode }): JSX.Element {
    return (
        <Tabs className="w-full text-white p-0 max-h-[100vh] flex flex-col" defaultValue="markdown-editor">
            <TabsContent value="markdown-editor" className="w-full flex flex-row data-[state=active]:h-full data-[state=active]:max-h-[calc(100vh-30px)]">
                <div
                    className="w-full data-[state=active]:max-h-[calc(100vh-30px)] overflow-y-auto thin-scrollbar border-r border-white/20"
                >
                    {editor}
                </div>
                <div
                    className="w-full data-[state=active]:max-h-[calc(100vh-30px)] overflow-y-auto thin-scrollbar"
                >
                    {view}
                </div>
            </TabsContent>
            <TabsContent
                value="markdown-view"
                className="flex justify-center data-[state=active]:w-full data-[state=active]:max-h-[calc(100vh-30px)] overflow-y-auto thin-scrollbar"
            >
                {view}
            </TabsContent>
            <TabsList className="border-b border-[#ffffff3d] mt-auto">
                <TabsTrigger value="markdown-editor">Editor</TabsTrigger>
                <TabsTrigger value="markdown-view">Reader Mode</TabsTrigger>
            </TabsList>
        </Tabs>
    )
}