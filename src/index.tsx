import * as React from 'react';
import { Block, Change, Mark, Value } from 'slate';
import Html from 'slate-html-serializer';
import { Editor, RenderAttributes } from 'slate-react';
import ToolBar from './component/ToolBar';
import { CUSTOM_STYLE, RenderType, ToolType } from './constant';
import { MarkHotkey } from './plugin';
import rules from './rule';
import './style';

const plugins = [
  MarkHotkey({ key: 'b', type: 'bold' }),
  MarkHotkey({ key: 'i', type: 'italic' }),
  MarkHotkey({ key: 'u', type: 'underline' })
];

const html = new Html({ rules });

interface RechextorProps {
  tools: string[];
  initialValue: string;
  placeholder?: string;
  onChange: (value: string) => void;
  uploadPath?: string;
  onUploadSuccess?: (data: any, callback: (src: string) => void) => void;
  beforeUpload?: (file: any) => any;
  onUploadError?: (args: any[]) => void;
  onBlur?: () => void;
  onFocus?: () => void;
}

interface RechextorState {
  value: Value;
  count: number;
}

class Rechextor extends React.Component<RechextorProps, RechextorState> {
  public static getDerivedStateFromProps(
    props: RechextorProps,
    state: RechextorState
  ) {
    if (state.count === 0 && props.initialValue) {
      return { value: html.deserialize(props.initialValue), count: 1 };
    }
    return state;
  }

  constructor(props: RechextorProps) {
    super(props);
    this.state = {
      value: html.deserialize(this.props.initialValue || ''),
      count: 0
    };
  }

  public render() {
    const { value } = this.state;
    const {
      tools,
      placeholder,
      uploadPath,
      beforeUpload,
      onUploadError,
      onBlur,
      onFocus
    } = this.props;
    return (
      <div className="Rechextor">
        <ToolBar
          availableTools={tools}
          activeMarks={value.activeMarks}
          activeBlocks={value.blocks}
          onFormatChange={this.handleFormatChange}
          onToolClick={this.handleToolClick}
          uploadPath={uploadPath}
          beforeUpload={beforeUpload}
          onSuccess={this.handleSuccess}
          onError={onUploadError}
        />
        <Editor
          className="Rechextor-editor"
          value={value}
          placeholder={placeholder}
          plugins={plugins}
          onChange={this.onChange}
          renderMark={this.renderMark}
          renderNode={this.renderNode}
          spellCheck={true}
          autoFocus={true}
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </div>
    );
  }

  private onChange = ({ value }: Change) => {
    const result = html.serialize(value);
    this.props.onChange(result);
    this.setState({ value });
  };

  private handleFormatChange = (format: string) => {
    const { value } = this.state;
    const active = value.blocks.some((node: Block) => node.type === format);
    const change = value
      .change()
      .setBlocks(active || format === 'content' ? 'paragraph' : format);
    this.onChange(change);
  };

  private handleToolClick = ({
    type,
    renderType
  }: {
    type: ToolType;
    renderType: RenderType;
  }) => {
    const { value } = this.state;
    let change;
    const prevChange: any = value.change();
    switch (renderType) {
      case RenderType.Mark:
        change = prevChange.toggleMark(type);
        break;
      case RenderType.Node:
        const active = value.blocks.some((node: Block) => node.type === type);
        change = prevChange.setBlocks(active ? 'paragraph' : type);
        break;
      case RenderType.Insert:
        change = prevChange
          .collapseToEndOfBlock()
          .insertBlock({ type, isVoid: true })
          .insertBlock({ type: 'paragraph' });
        break;
      default:
        break;
    }
    this.onChange(change);
  };

  private handleSuccess = (data: any) => {
    const { onUploadSuccess } = this.props;
    if (onUploadSuccess) {
      onUploadSuccess(data, this.insertImage);
    }
  };

  private insertImage = (src: string) => {
    const prevChange: any = this.state.value.change();
    const change = prevChange
      .collapseToEndOfBlock()
      .insertBlock({ type: 'image', isVoid: true, data: { src } })
      .insertBlock({ type: 'paragraph' });
    this.onChange(change);
  };

  private renderMark = ({
    mark,
    attributes,
    children
  }: {
    mark: Mark;
    attributes: RenderAttributes;
    children: React.ReactNode;
  }) => {
    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>;
      case 'strong':
        return (
          <strong style={CUSTOM_STYLE.strong} {...attributes}>
            {children}
          </strong>
        );
      case 'italic':
        return <em {...attributes}>{children}</em>;
      case 'underline':
        return <u {...attributes}>{children}</u>;
      case 'strikethrough':
        return <del {...attributes}>{children}</del>;
      case 'tag':
        return (
          <span style={CUSTOM_STYLE.tag} {...attributes}>
            {children}
          </span>
        );
      default:
        return null;
    }
  };

  private renderNode = ({
    node,
    attributes,
    children,
    isSelected
  }: {
    node: any;
    attributes: RenderAttributes;
    children: React.ReactNode;
    isSelected: boolean;
  }) => {
    switch (node.type) {
      case 'subtitle':
        return (
          <h3 style={CUSTOM_STYLE.subtitle} {...attributes}>
            {children}
          </h3>
        );
      case 'comment':
        return (
          <p style={CUSTOM_STYLE.comment} {...attributes}>
            {children}
          </p>
        );
      case 'blockquote':
        return (
          <blockquote style={CUSTOM_STYLE.blockquote} {...attributes}>
            {children}
          </blockquote>
        );
      case 'line':
        return (
          <div
            className="hr"
            style={{
              overflow: 'auto',
              background: isSelected ? '#f4f4f4' : undefined,
              cursor: 'pointer'
            }}
            {...attributes}
          >
            <hr style={CUSTOM_STYLE.line} />
          </div>
        );
      case 'image':
        const src = node.data.get('src');
        return (
          <img
            style={{
              ...CUSTOM_STYLE.image,
              outline: isSelected ? 'dotted #f86442' : undefined,
              cursor: 'pointer'
            }}
            src={src}
            alt="img"
            {...attributes}
          />
        );
      default:
        return null;
    }
  };
}

export default Rechextor;
