"use client";

import { useEffect, useState } from "react";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import FontFamily from "@tiptap/extension-font-family";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import { Extension } from "@tiptap/core";

/* -------------------------------------------------------
⭐ FIXED FONTSIZE EXTENSION (CORRECT GLOBAL ATTRIBUTES)
-------------------------------------------------------- */
const FontSize = Extension.create({
  name: "fontSize",

  addGlobalAttributes() {
    return [
      {
        types: ["textStyle"],
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (el) =>
              el.style.fontSize?.replace("px", "") || null,
            renderHTML: (attrs) => {
              if (!attrs.fontSize) return {};
              return { style: `font-size: ${attrs.fontSize}px` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (size) =>
        ({ chain }) => {
          return chain()
            .setMark("textStyle", { fontSize: size })
            .run();
        },
    };
  },
});

interface EditorProps {
  value: string;
  onChange: (val: string) => void;
}

export default function Editor({ value, onChange }: EditorProps) {
  const [customHex, setCustomHex] = useState("#B8860B");

  /* -------------------------------------------------------
  ⭐ FIXED EXTENSION ORDER (CORRECT TIPTAP SCHEMA)
  -------------------------------------------------------- */
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      TextStyle,
      Color,
      FontFamily,
      FontSize,
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Image.configure({ allowBase64: true }),
    ],
    content: value || "<p>Start creating magic...</p>",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  /* Sync external changes */
  useEffect(() => {
    if (editor && value !== undefined && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [value, editor]);

  if (!editor) {
    return (
      <div className="flex items-center justify-center w-full h-[calc(100vh-80px)]">
        <p className="text-pink-500 font-bold animate-pulse">
          Initializing Princess Boutique Editor...
        </p>
      </div>
    );
  }

  /* -------------------------------------------------------
  FONT OPTIONS
  -------------------------------------------------------- */
  const fontSizes = [
    "8",
    "9",
    "10",
    "11",
    "12",
    "14",
    "16",
    "18",
    "20",
    "22",
    "24",
    "26",
    "28",
    "30",
    "32",
    "36",
    "42",
    "48",
    "54",
    "60",
    "72",
    "84",
    "96",
  ];

  const fonts = [
    {
      name: "Serif (Classic)",
      items: [
        "Playfair Display",
        "Times New Roman",
        "Georgia",
        "Garamond",
        "Baskerville",
        "Palatino",
      ],
    },
    {
      name: "Handwriting (Royal)",
      items: [
        "Great Vibes",
        "Brush Script MT",
        "Dancing Script",
        "Pacifico",
        "Alex Brush",
        "Satisfy",
        "Lobster",
        "Pinyon Script",
      ],
    },
    {
      name: "Modern (Clean)",
      items: [
        "Montserrat",
        "Arial",
        "Helvetica",
        "Verdana",
        "Inter",
        "Futura",
        "Century Gothic",
        "Trebuchet MS",
      ],
    },
  ];

  const palette = [
    "#000000",
    "#FFFFFF",
    "#D4AF37",
    "#B8860B",
    "#C09090",
    "#444444",
    "#FFC0CB",
    "#FF69B4",
    "#FF1493",
    "#C71585",
    "#800080",
    "#E6E6FA",
    "#FADDEB",
    "#FFF0F5",
    "#FFE4E1",
    "#DDA0DD",
    "#BA55D3",
    "#4B0082",
    "#000080",
    "#191970",
    "#2F4F4F",
    "#708090",
    "#BC8F8F",
    "#F08080",
  ];

  /* -------------------------------------------------------
  IMAGE UPLOAD
  -------------------------------------------------------- */
  const handleImg = () => {
    const el = document.createElement("input");
    el.type = "file";
    el.accept = "image/*";

    el.onchange = async () => {
      const file = el.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          editor
            .chain()
            .focus()
            .setImage({ src: reader.result as string })
            .run();
        };
        reader.readAsDataURL(file);
      }
    };

    el.click();
  };

  /* -------------------------------------------------------
  ⭐ CLEAN WELCOME TEMPLATE (Tiptap Commands)
  -------------------------------------------------------- */
  const loadWelcomeTemplate = () => {
    const chain = editor.chain().focus().clearContent();

    chain
      .setTextAlign("center")
      .setFontFamily("Georgia, 'Times New Roman', serif")
      .setFontSize("42")
      .setColor("#D4AF37")
      .insertContent("Welcome to the Fairytale ✨🩰")
      .insertContent("<p></p>");

    chain
      .setTextAlign("left")
      .setFontFamily("Trebuchet MS, 'Arial', sans-serif")
      .setFontSize("22")
      .setColor("#D4AF37")
      .insertContent("Our Story & Mission")
      .insertContent("<p></p>");

    chain
      .setFontFamily( "Palatino, 'Palatino Linotype', 'Book Antiqua', 'Georgia', serif" )
      .setFontSize("17")
      .setColor("#444444")
      .insertContent(
        "At Princess Pirouette Boutique, we believe every child deserves to feel magical. " +
          "Our mission is to bring joy, confidence, and sparkle to every princess who twirls into our world."
      )
      .insertContent("<p></p>");

    chain
    .setFontFamily("Palatino, 'Palatino Linotype', 'Book Antiqua', 'Georgia', serif")
      .setFontSize("17")
      .setColor("#444444")
      .insertContent(
        "From handcrafted tutus to shimmering accessories, each piece is designed with love, care, " +
          "and a touch of fairytale wonder."
      )
      .insertContent("<p></p>");

    chain
      .setTextAlign("right")
      .setFontFamily("Brush Script MT, 'Script MT Bold', cursive")
      .setFontSize("30")
      .setColor("#D4AF37")
      .insertContent("Princess Pirouette ✧")
      .insertContent("<p></p>");

    chain
      .setTextAlign("right")
      .setFontFamily("Palatino, 'Palatino Linotype', 'Book Antiqua', 'Georgia', serif")
      .setFontSize("15")
      .setColor("#444444")
      .insertContent("Founder & Muse");

    chain.run();
  };

  /* -------------------------------------------------------
  RENDER UI
  -------------------------------------------------------- */
  return (
    <div className="flex w-full h-[calc(100vh-80px)] p-6 gap-6 bg-[#F8F9FA] overflow-hidden">
      {/* MAIN EDITOR */}
      <div className="flex-1 flex flex-col rounded-2xl border-[3px] border-[#B8860B] bg-white shadow-2xl overflow-hidden">
        <div className="flex-1 p-12 overflow-y-auto bg-[#FDF2F8] shadow-inner selection:bg-pink-200">
          <EditorContent
            editor={editor}
            className="outline-none min-h-full prose prose-pink max-w-none"
          />
        </div>
      </div>

      {/* SIDEBAR */}
      <aside className="w-[360px] bg-white border border-pink-100 rounded-2xl shadow-xl flex flex-col overflow-hidden">
        <div className="p-5 bg-gradient-to-br from-pink-50 via-white to-pink-50 border-b border-pink-100">
          <h2 className="font-serif font-black text-[#B8860B] text-xl tracking-tighter uppercase flex items-center gap-2">
            <span>✨</span> Princess Boutique Studio
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-10 custom-scrollbar">
          {/* TYPOGRAPHY */}
          <Section title="Typography Selection">
            <div className="h-52 overflow-y-auto border border-pink-50 rounded-xl p-2 space-y-4 bg-gray-50/50 shadow-inner custom-scrollbar">
              {fonts.map((g) => (
                <div key={g.name} className="space-y-1">
                  <p className="text-[10px] text-pink-300 font-black uppercase tracking-widest px-2">
                    {g.name}
                  </p>
                  {g.items.map((f) => (
                    <button
                      key={f}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-white hover:shadow-md rounded-lg transition-all active:scale-95 text-gray-700"
                      style={{ fontFamily: f }}
                      onClick={() =>
                        editor.chain().focus().setFontFamily(f).run()
                      }
                    >
                      {f}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </Section>

          {/* FONT SIZE */}
          <Section title="Size Settings">
            <div className="flex flex-wrap gap-1.5 h-32 overflow-y-auto p-2 border border-pink-50 rounded-xl bg-gray-50/50 custom-scrollbar">
              {fontSizes.map((s) => (
                <button
                  key={s}
                  className={`w-[45px] h-10 text-xs flex items-center justify-center rounded-lg border bg-white transition-all hover:bg-pink-500 hover:text-white hover:border-pink-600 ${
                    editor.isActive("textStyle", { fontSize: s })
                      ? "bg-pink-500 text-white border-pink-600 shadow-md"
                      : "text-gray-500 border-gray-100"
                  }`}
                  onClick={() =>
                    editor.chain().focus().setFontSize(s).run()
                  }
                >
                  {s}px
                </button>
              ))}
            </div>
          </Section>

          {/* COLORS */}
          <Section title="Royal Colors">
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-pink-100 shadow-sm">
                <input
                  type="color"
                  value={customHex}
                  onChange={(e) => {
                    setCustomHex(e.target.value);
                    editor.chain().focus().setColor(e.target.value).run();
                  }}
                  className="w-14 h-14 rounded-full cursor-pointer bg-transparent border-none appearance-none shadow-md overflow-hidden"
                />
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                    Hex Wheel
                  </span>
                  <span className="text-lg font-mono text-[#B8860B] font-black uppercase">
                    {customHex}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-6 gap-2 max-h-24 overflow-y-auto p-1 custom-scrollbar">
                {palette.map((c) => (
                  <button
                    key={c}
                    className="w-full aspect-square rounded-lg border border-gray-100 shadow-sm hover:scale-110 transition-transform active:rotate-12"
                    style={{ background: c }}
                    onClick={() =>
                      editor.chain().focus().setColor(c).run()
                    }
                  />
                ))}
              </div>
            </div>
          </Section>

          {/* FORMATTING */}
          <Section title="Formatting Tools">
            <div className="grid grid-cols-2 gap-2">
              <FormatBtn
                active={editor.isActive("bold")}
                onClick={() =>
                  editor.chain().focus().toggleBold().run()
                }
              >
                Bold
              </FormatBtn>

              <FormatBtn
                active={editor.isActive("italic")}
                onClick={() =>
                  editor.chain().focus().toggleItalic().run()
                }
              >
                Italic
              </FormatBtn>

              <FormatBtn
                active={editor.isActive("underline")}
                onClick={() =>
                  editor.chain().focus().toggleUnderline().run()
                }
              >
                Underline
              </FormatBtn>

              <FormatBtn
                active={editor.isActive("strike")}
                onClick={() =>
                  editor.chain().focus().toggleStrike().run()
                }
              >
                Strike
              </FormatBtn>
            </div>

            <div className="flex gap-1 mt-4 p-1 bg-gray-100 rounded-xl shadow-inner">
              {["left", "center", "right", "justify"].map((a) => (
                <button
                  key={a}
                  className={`flex-1 py-2 text-[10px] font-black uppercase transition-all rounded-lg ${
                    editor.isActive({ textAlign: a })
                      ? "bg-white shadow-md text-[#B8860B]"
                      : "text-gray-400 hover:text-gray-600"
                  }`}
                  onClick={() =>
                    editor.chain().focus().setTextAlign(a).run()
                  }
                >
                  {a}
                </button>
              ))}
            </div>
          </Section>

          {/* MEDIA */}
          <Section title="Layout & Media">
            <button
              onClick={handleImg}
              className="w-full py-4 border-2 border-dashed border-pink-200 rounded-2xl text-pink-500 font-black text-[11px] uppercase tracking-widest hover:bg-pink-50 hover:border-pink-300 transition-all mb-3"
            >
              📸 Upload Royal Portrait
            </button>

            <button
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .insertContent(
                    "<hr style='border:none; border-top:5px double #B8860B; margin: 40px 0;' />"
                  )
                  .run()
              }
              className="w-full py-3 bg-gray-50 border border-gray-100 rounded-xl text-[10px] font-bold text-gray-400 uppercase tracking-widest hover:bg-gray-100 mb-3 transition-colors"
            >
              Add Golden Divider
            </button>

            {/* ⭐ UPDATED SIGNATURE BUTTON */}
            <button
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .setTextAlign("right")
                  .setFontFamily("Brush Script MT")
                  .setFontSize("30")
                  .setColor("#D4AF37")
                  .insertContent("Princess Pirouette ✧")
                  .insertContent("<p></p>")
                  .setFontFamily("Times New Roman")
                  .setFontSize("15")
                  .setColor("#444444")
                  .insertContent("Founder & Muse")
                  .run()
              }
              className="w-full py-4 bg-[#B8860B] text-white rounded-xl shadow-lg hover:brightness-110 font-serif italic text-sm transition-all active:scale-95"
            >
              Apply Signature
            </button>
          </Section>

          {/* TEMPLATE */}
          <Section title="Email Templates">
            <button
              onClick={loadWelcomeTemplate}
              className="w-full py-5 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-2xl shadow-pink-100 shadow-2xl font-black text-xs uppercase tracking-widest transition-all hover:-translate-y-1 active:translate-y-0.5"
            >
              👑 Load Welcome Email Template
            </button>
          </Section>
        </div>
      </aside>

      {/* GLOBAL CSS */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #fbcfe8;
          border-radius: 20px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #f9a8d4;
        }

        /* ⭐ REMOVE Montserrat override so Times New Roman works */
        .ProseMirror p {
          margin-bottom: 1.2em;
        }

        .ProseMirror:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
}

/* -------------------------------------------------------
REUSABLE COMPONENTS
-------------------------------------------------------- */
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="h-px bg-pink-100 flex-1"></span>
        <h3 className="text-[10px] font-black text-pink-300 uppercase tracking-[4px]">
          {title}
        </h3>
        <span className="h-px bg-pink-100 flex-1"></span>
      </div>
      {children}
    </div>
  );
}

function FormatBtn({
  children,
  onClick,
  active,
}: {
  children: React.ReactNode;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`py-3.5 px-3 text-xs font-black rounded-xl border transition-all ${
        active
          ? "bg-pink-500 text-white border-pink-600 shadow-xl scale-[0.95]"
          : "bg-white text-gray-500 border-gray-100 hover:border-pink-200 hover:bg-pink-50"
      }`}
    >
      {children}
    </button>
  );
}
