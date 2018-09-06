export enum ToolType {
  Bold = 'bold',
  Strong = 'strong',
  Italic = 'italic',
  Underline = 'underline',
  Strikethrough = 'strikethrough',
  Image = 'image',
  Tag = 'tag',
  Blockquote = 'blockquote',
  Line = 'line'
}

export enum RenderType {
  Mark = 'mark',
  Insert = 'insert',
  Node = 'node'
}

export const TOOLS = [
  { type: ToolType.Bold, tip: '加粗', renderType: RenderType.Mark },
  { type: ToolType.Strong, tip: '强调', renderType: RenderType.Mark },
  { type: ToolType.Italic, tip: '斜体', renderType: RenderType.Mark },
  { type: ToolType.Underline, tip: '下划线', renderType: RenderType.Mark },
  { type: ToolType.Strikethrough, tip: '删除线', renderType: RenderType.Mark },
  { type: ToolType.Image, tip: '插入图片', renderType: RenderType.Insert },
  { type: ToolType.Tag, tip: '标签', renderType: RenderType.Mark },
  { type: ToolType.Blockquote, tip: '引用', renderType: RenderType.Node },
  { type: ToolType.Line, tip: '插入横线', renderType: RenderType.Insert }
];

export const FORMAT = {
  comment: '备注',
  content: '正文',
  subtitle: '副标题'
};

export const CUSTOM_STYLE = {
  blockquote: {
    borderLeft: '5px solid #ddd',
    color: '#aaa',
    fontStyle: 'italic',
    margin: '10px 0',
    paddingLeft: 10
  },
  comment: {
    color: '#999999',
    fontSize: 14,
    lineHeight: '24px',
    margin: 0
  },
  image: { maxWidth: '100%' },
  line: {
    backgroundColor: '#e8e8e8',
    border: 0,
    height: 2,
    margin: '20px 0'
  },
  strong: { color: '#FC5832' },
  subtitle: {
    fontSize: 20,
    lineHeight: '28px',
    margin: '10px 0'
  },
  tag: {
    backgroundColor: '#FC5832',
    color: '#fff',
    fontSize: 16,
    margin: '10px 0',
    padding: 5
  }
};
