"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import UnderlineExt from "@tiptap/extension-underline";

import {
    Bold,
    Strikethrough,
    Italic,
    Underline,
    List,
    ListOrdered,
    Heading3,
} from "lucide-react";

import { Toggle } from "@/components/ui/toggle";

interface props {
    description: string;
    onChange: (richText: string) => void;
}

const TextEditor = ({ onChange, description }: props) => {
    const editor = useEditor({
        extensions: [StarterKit.configure(), UnderlineExt],
        content: description,
        editorProps: {
            attributes: {
                class: "rounded-md min-h-[250px] border border-input bg-background p-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition",
            },
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML());
        },
    });

    const togglesData = [
        {
            type: "heading",
            icon: <Heading3 size={18} />,
            action: () =>
                editor?.chain().focus().toggleHeading({ level: 3 }).run(),
        },
        {
            type: "bold",
            icon: <Bold size={18} />,
            action: () => editor?.chain().focus().toggleBold().run(),
        },
        {
            type: "underline",
            icon: <Underline size={18} />,
            action: () => editor?.chain().focus().toggleUnderline().run(),
        },
        {
            type: "italic",
            icon: <Italic size={18} />,
            action: () => editor?.chain().focus().toggleItalic().run(),
        },
        {
            type: "strike",
            icon: <Strikethrough size={18} />,
            action: () => editor?.chain().focus().toggleStrike().run(),
        },
        {
            type: "bulletList",
            icon: <List size={18} />,
            action: () => editor?.chain().focus().toggleBulletList().run(),
        },
        {
            type: "orderedList",
            icon: <ListOrdered size={18} />,
            action: () => editor?.chain().focus().toggleOrderedList().run(),
        },
    ];

    return (
        <div className="flex flex-col justify-stretch gap-1.5">
            <div className="flex gap-0.5 border border-input bg-transparent rounded-md p-1">
                {togglesData.map((toggle, idx) => (
                    <Toggle
                        key={idx}
                        size="sm"
                        pressed={editor?.isActive(toggle.type)}
                        onPressedChange={toggle.action}
                    >
                        {toggle.icon}
                    </Toggle>
                ))}
            </div>
            <EditorContent className="tiptap" editor={editor} />
        </div>
    );
};

export default TextEditor;
