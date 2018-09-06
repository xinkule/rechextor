import Upload from 'rc-upload';
import * as React from 'react';
import { RenderType, ToolType } from '../../constant';
import Icon from './Icon';

interface ToolProps {
  type: ToolType;
  renderType: RenderType;
  tip: string;
  active: boolean;
  uploadPath?: string;
  onToolClick: (
    { type, renderType }: { type: ToolType; renderType: RenderType }
  ) => void;
  beforeUpload?: (file: any) => any;
  onSuccess: (result: any) => void;
  onError?: (args: any[]) => void;
}

interface ToolState {
  showTip: boolean;
}

class Tool extends React.PureComponent<ToolProps, ToolState> {
  constructor(props: ToolProps) {
    super(props);
    this.state = { showTip: false };
  }

  public render() {
    const { type, tip, active, uploadPath } = this.props;
    const className = active ? 'Tool active' : 'Tool';
    return (
      <div
        className={className}
        onMouseOver={this.showTip}
        onMouseLeave={this.hideTip}
        onMouseDown={this.handleClick}
      >
        {type === ToolType.Image ? (
          <Upload
            action={uploadPath}
            accept=".png,.gif,.jpeg,.jpg"
            beforeUpload={this.beforeUpload}
            onSuccess={this.handleSuccess}
            onError={this.handleError}
          >
            <div className="Tool-icon-wrapper">
              <Icon type={type} />
            </div>
          </Upload>
        ) : (
          <Icon type={type} />
        )}
        {this.state.showTip && <div className="Tool-tooltip">{tip}</div>}
      </div>
    );
  }

  private showTip = () => {
    this.setState({ showTip: true });
  };

  private hideTip = () => {
    this.setState({ showTip: false });
  };

  private handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const { type, renderType, onToolClick } = this.props;
    if (type !== ToolType.Image) {
      onToolClick({ type, renderType });
    }
  };

  private beforeUpload = (file: any) => {
    const { beforeUpload } = this.props;
    if (beforeUpload) {
      beforeUpload(file);
    }
  };

  private handleSuccess = (result: any) => {
    this.props.onSuccess(result);
  };

  private handleError = (...args: any[]) => {
    const { onError } = this.props;
    if (onError) {
      onError(args);
    }
  };
}

export default Tool;
