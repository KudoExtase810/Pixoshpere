"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import {
    Bold,
    Strikethrough,
    Italic,
    List,
    ListOrdered,
    Heading2,
} from "lucide-react";

import { Toggle } from "@/components/ui/toggle";

import { toast } from "sonner";

interface props {
    description: string;
    onChange: (richText: string) => void;
}

const TextEditor = ({ onChange, description }: props) => {
    const editor = useEditor({
        extensions: [StarterKit.configure()],
        content: description,
        editorProps: {
            attributes: {
                class: "rounded-md min-h-[250px] border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition",
            },
        },
        onUpdate({ editor }) {
            onChange(editor.getHTML());
            toast(editor.getHTML());
        },
    });
    return (
        <div className="flex flex-col justify-stretch gap-1.5">
            <div className="border border-input bg-transparent rounded-md p-1 w-full">
                <Toggle
                    size="sm"
                    pressed={editor?.isActive("heading")}
                    onPressedChange={() =>
                        editor
                            ?.chain()
                            .focus()
                            .toggleHeading({ level: 2 })
                            .run()
                    }
                >
                    <Heading2 className="h-4 w-4" />{" "}
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor?.isActive("bold")}
                    onPressedChange={() =>
                        editor?.chain().focus().toggleBold().run()
                    }
                >
                    <Bold className="h-4 w-4" />{" "}
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor?.isActive("italic")}
                    onPressedChange={() =>
                        editor?.chain().focus().toggleItalic().run()
                    }
                >
                    <Italic className="h-4 w-4" />{" "}
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor?.isActive("strike")}
                    onPressedChange={() =>
                        editor?.chain().focus().toggleStrike().run()
                    }
                >
                    <Strikethrough className="h-4 w-4" />{" "}
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor?.isActive("bulletList")}
                    onPressedChange={() =>
                        editor?.chain().focus().toggleBulletList().run()
                    }
                >
                    <List className="h-4 w-4" />{" "}
                </Toggle>
                <Toggle
                    size="sm"
                    pressed={editor?.isActive("orderedList")}
                    onPressedChange={() =>
                        editor?.chain().focus().toggleOrderedList().run()
                    }
                >
                    <ListOrdered className="h-4 w-4" />{" "}
                </Toggle>
            </div>
            <EditorContent editor={editor} />
        </div>
    );
};

export default TextEditor;
