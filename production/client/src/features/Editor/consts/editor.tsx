import { createPlateEditor, ParagraphPlugin, PlateLeaf } from "@udecode/plate-common/react";
import { BlockquotePlugin } from "@udecode/plate-block-quote/react";
import { HorizontalRulePlugin } from "@udecode/plate-horizontal-rule/react";
import { LinkPlugin } from "@udecode/plate-link/react";
import { LinkFloatingToolbar } from "@/entities/Post/ui/plate-ui/link-floating-toolbar";
import { ImagePlugin, MediaEmbedPlugin } from "@udecode/plate-media/react";
import { MentionInputPlugin, MentionPlugin } from "@udecode/plate-mention/react";
import { TableCellHeaderPlugin, TableCellPlugin, TablePlugin, TableRowPlugin } from "@udecode/plate-table/react";
import { TodoListPlugin } from "@udecode/plate-list/react";
import { ExcalidrawPlugin } from "@udecode/plate-excalidraw/react";
import { TogglePlugin } from "@udecode/plate-toggle/react";
import { ColumnItemPlugin, ColumnPlugin } from "@udecode/plate-layout/react";
import { HeadingPlugin } from "@udecode/plate-heading/react";
import { DatePlugin } from "@udecode/plate-date/react";
import {
  BoldPlugin,
  CodePlugin,
  ItalicPlugin,
  StrikethroughPlugin,
  SubscriptPlugin,
  SuperscriptPlugin,
  UnderlinePlugin
} from "@udecode/plate-basic-marks/react";
import { FontBackgroundColorPlugin, FontColorPlugin, FontSizePlugin } from "@udecode/plate-font/react";
import { HighlightPlugin } from "@udecode/plate-highlight/react";
import { KbdPlugin } from "@udecode/plate-kbd/react";
import { AlignPlugin } from "@udecode/plate-alignment/react";
import { IndentPlugin } from "@udecode/plate-indent/react";
import { IndentListPlugin } from "@udecode/plate-indent-list/react";
import { LineHeightPlugin } from "@udecode/plate-line-height/react";
import { CommentsPlugin } from "@udecode/plate-comments/react";
import { AutoformatPlugin } from "@udecode/plate-autoformat/react";
import { BlockMenuPlugin, BlockSelectionPlugin } from "@udecode/plate-selection/react";
import { CaptionPlugin } from "@udecode/plate-caption/react";
import { DndPlugin } from "@udecode/plate-dnd";
import { EmojiPlugin } from "@udecode/plate-emoji/react";
import { ExitBreakPlugin, SoftBreakPlugin } from "@udecode/plate-break/react";
import { NodeIdPlugin } from "@udecode/plate-node-id";
import { ResetNodePlugin } from "@udecode/plate-reset-node/react";
import { DeletePlugin } from "@udecode/plate-select";
import { SlashPlugin } from "@udecode/plate-slash-command/react";
import { DocxPlugin } from "@udecode/plate-docx";
import { CsvPlugin } from "@udecode/plate-csv";
import { MarkdownPlugin } from "@udecode/plate-markdown";
import { JuicePlugin } from "@udecode/plate-juice";
import { withDraggables } from "@/entities/Post/ui/plate-ui/with-draggables";
import { withPlaceholders } from "@/entities/Post/ui/plate-ui/placeholder";
import { BlockquoteElement } from "@/entities/Post/ui/plate-ui/blockquote-element";
import { ExcalidrawElement } from "@/entities/Post/ui/plate-ui/excalidraw-element";
import { HrElement } from "@/entities/Post/ui/plate-ui/hr-element";
import { ImageElement } from "@/entities/Post/ui/plate-ui/image-element";
import { LinkElement } from "@/entities/Post/ui/plate-ui/link-element";
import { ToggleElement } from "@/entities/Post/ui/plate-ui/toggle-element";
import { ColumnGroupElement } from "@/entities/Post/ui/plate-ui/column-group-element";
import { ColumnElement } from "@/entities/Post/ui/plate-ui/column-element";
import { HEADING_KEYS } from "@udecode/plate-heading";
import { withProps } from "@udecode/cn";
import { HeadingElement } from "@/entities/Post/ui/plate-ui/heading-element";
import { MediaEmbedElement } from "@/entities/Post/ui/plate-ui/media-embed-element";
import { MentionElement } from "@/entities/Post/ui/plate-ui/mention-element";
import { MentionInputElement } from "@/entities/Post/ui/plate-ui/mention-input-element";
import { ParagraphElement } from "@/entities/Post/ui/plate-ui/paragraph-element";
import { TableElement } from "@/entities/Post/ui/plate-ui/table-element";
import { TableRowElement } from "@/entities/Post/ui/plate-ui/table-row-element";
import { TableCellElement, TableCellHeaderElement } from "@/entities/Post/ui/plate-ui/table-cell-element";
import { TodoListElement } from "@/entities/Post/ui/plate-ui/todo-list-element";
import { DateElement } from "@/entities/Post/ui/plate-ui/date-element";
import { CodeLeaf } from "@/entities/Post/ui/plate-ui/code-leaf";
import { CommentLeaf } from "@/entities/Post/ui/plate-ui/comment-leaf";
import { HighlightLeaf } from "@/entities/Post/ui/plate-ui/highlight-leaf";
import { KbdLeaf } from "@/entities/Post/ui/plate-ui/kbd-leaf";
import React from "react";

export const editor = createPlateEditor({
  plugins: [
    ParagraphPlugin,
    BlockquotePlugin,
    HorizontalRulePlugin,
    LinkPlugin.configure({
      render: { afterEditable: () => <LinkFloatingToolbar /> }
    }),
    ImagePlugin,
    MediaEmbedPlugin,
    MentionPlugin,
    TablePlugin,
    TodoListPlugin,
    ExcalidrawPlugin,
    TogglePlugin,
    ColumnPlugin,
    HeadingPlugin,
    DatePlugin,
    BoldPlugin,
    ItalicPlugin,
    UnderlinePlugin,
    StrikethroughPlugin,
    CodePlugin,
    SubscriptPlugin,
    SuperscriptPlugin,
    FontColorPlugin,
    FontBackgroundColorPlugin,
    FontSizePlugin,
    HighlightPlugin,
    KbdPlugin,
    AlignPlugin.configure({
      inject: { targetPlugins: ["p", "h1", "h2", "h3"] }
    }),
    IndentPlugin.configure({
      inject: { targetPlugins: ["p", "h1", "h2", "h3"] }
    }),
    IndentListPlugin.configure({
      inject: { targetPlugins: ["p", "h1", "h2", "h3"] }
    }),
    LineHeightPlugin.configure({
      inject: {
        nodeProps: {
          defaultNodeValue: 1.5,
          validNodeValues: [1, 1.2, 1.5, 2, 3]
        },
        targetPlugins: ["p", "h1", "h2", "h3"]
      }
    }),
    CommentsPlugin,
    AutoformatPlugin.configure({
      options: {
        enableUndoOnDelete: true,
        rules: [
          // Usage: https://platejs.org/docs/autoformat
        ]
      }
    }),
    BlockSelectionPlugin,
    BlockMenuPlugin,
    CaptionPlugin.configure({
      options: { plugins: [ImagePlugin, MediaEmbedPlugin] }
    }),
    DndPlugin.configure({
      options: { enableScroller: true }
    }),
    EmojiPlugin,
    ExitBreakPlugin.configure({
      options: {
        rules: [
          {
            hotkey: "mod+enter"
          },
          {
            before: true,
            hotkey: "mod+shift+enter"
          },
          {
            hotkey: "enter",
            level: 1,
            query: {
              allow: ["h1", "h2", "h3"],
              end: true,
              start: true
            },
            relative: true
          }
        ]
      }
    }),
    NodeIdPlugin,
    ResetNodePlugin.configure({
      options: {
        rules: [
          // Usage: https://platejs.org/docs/reset-node
        ]
      }
    }),
    DeletePlugin,
    SoftBreakPlugin.configure({
      options: {
        rules: [
          { hotkey: "shift+enter" },
          {
            hotkey: "enter",
            query: {
              allow: ["code_block", "blockquote", "td", "th"]
            }
          }
        ]
      }
    }),
    SlashPlugin,
    DocxPlugin,
    CsvPlugin,
    MarkdownPlugin,
    JuicePlugin
  ],
  override: {
    components: withDraggables(withPlaceholders(({
      [BlockquotePlugin.key]: BlockquoteElement,
      [ExcalidrawPlugin.key]: ExcalidrawElement,
      [HorizontalRulePlugin.key]: HrElement,
      [ImagePlugin.key]: ImageElement,
      [LinkPlugin.key]: LinkElement,
      [TogglePlugin.key]: ToggleElement,
      [ColumnPlugin.key]: ColumnGroupElement,
      [ColumnItemPlugin.key]: ColumnElement,
      [HEADING_KEYS.h1]: withProps(HeadingElement, { variant: "h1" }),
      [HEADING_KEYS.h2]: withProps(HeadingElement, { variant: "h2" }),
      [HEADING_KEYS.h3]: withProps(HeadingElement, { variant: "h3" }),
      [HEADING_KEYS.h4]: withProps(HeadingElement, { variant: "h4" }),
      [HEADING_KEYS.h5]: withProps(HeadingElement, { variant: "h5" }),
      [HEADING_KEYS.h6]: withProps(HeadingElement, { variant: "h6" }),
      [MediaEmbedPlugin.key]: MediaEmbedElement,
      [MentionPlugin.key]: MentionElement,
      [MentionInputPlugin.key]: MentionInputElement,
      [ParagraphPlugin.key]: ParagraphElement,
      [TablePlugin.key]: TableElement,
      [TableRowPlugin.key]: TableRowElement,
      [TableCellPlugin.key]: TableCellElement,
      [TableCellHeaderPlugin.key]: TableCellHeaderElement,
      [TodoListPlugin.key]: TodoListElement,
      [DatePlugin.key]: DateElement,
      [BoldPlugin.key]: withProps(PlateLeaf, { as: "strong" }),
      [CodePlugin.key]: CodeLeaf,
      [CommentsPlugin.key]: CommentLeaf,
      [HighlightPlugin.key]: HighlightLeaf,
      [ItalicPlugin.key]: withProps(PlateLeaf, { as: "em" }),
      [KbdPlugin.key]: KbdLeaf,
      [StrikethroughPlugin.key]: withProps(PlateLeaf, { as: "s" }),
      [SubscriptPlugin.key]: withProps(PlateLeaf, { as: "sub" }),
      [SuperscriptPlugin.key]: withProps(PlateLeaf, { as: "sup" }),
      [UnderlinePlugin.key]: withProps(PlateLeaf, { as: "u" })
    })))
  },
  value: [
    {
      id: "1",
      type: "p",
      children: [{ text: "Hello, World!" }]
    }
  ]
});
export const { tf: editorTransformation } = editor;