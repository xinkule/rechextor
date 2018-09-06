import * as Immutable from 'immutable';
import * as React from 'react';
import { Block, Mark } from 'slate';
import { FORMAT, RenderType, TOOLS, ToolType } from '../../constant';
import Select from '../Select';
import Tool from '../Tool';

const formats = Object.keys(FORMAT);

interface ToolBarProps {
  availableTools: string[];
  activeMarks: Immutable.Set<Mark>;
  activeBlocks: Immutable.List<Block>;
  onFormatChange: (format: string) => void;
  onToolClick: (
    { type, renderType }: { type: ToolType; renderType: RenderType }
  ) => void;
  uploadPath?: string;
  beforeUpload?: (file: any) => any;
  onSuccess: (result: any) => void;
  onError?: (args: any[]) => void;
}

interface ToolBarState {
  visibleTools: string[];
}

class ToolBar extends React.PureComponent<ToolBarProps, ToolBarState> {
  private visibleTools = TOOLS.filter(
    ({ type }) => this.props.availableTools.indexOf(type) !== -1
  );

  public render() {
    const {
      onFormatChange,
      onToolClick,
      uploadPath,
      beforeUpload,
      onSuccess,
      onError
    } = this.props;
    return (
      <div className="ToolBar">
        <Select format={this.getFormat()} onFormatChange={onFormatChange} />
        {this.visibleTools.map(({ type, tip, renderType }) => (
          <Tool
            key={type}
            type={type}
            tip={tip}
            renderType={renderType}
            active={this.isActive(type, renderType)}
            onToolClick={onToolClick}
            uploadPath={uploadPath}
            beforeUpload={beforeUpload}
            onSuccess={onSuccess}
            onError={onError}
          />
        ))}
      </div>
    );
  }

  private getFormat() {
    for (let i = 0; i < formats.length; i++) {
      if (
        this.props.activeBlocks.some((node: Block) => node.type === formats[i])
      ) {
        return formats[i];
      }
    }
    return 'content';
  }

  private isActive(type: ToolType, renderType: RenderType) {
    const { activeMarks, activeBlocks } = this.props;
    if (renderType === RenderType.Mark) {
      return activeMarks.some((mark: Mark) => mark.type === type);
    }
    return activeBlocks.some((node: Block) => node.type === type);
  }
}

export default ToolBar;
