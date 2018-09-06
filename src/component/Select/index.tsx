import * as React from 'react';
import { FORMAT } from '../../constant';
import IconDown from './IconDown';

interface SelectProps {
  format: string;
  onFormatChange: (format: string) => void;
}

interface SelectState {
  showDropDown: boolean;
}

class Select extends React.PureComponent<SelectProps, SelectState> {
  constructor(props: SelectProps) {
    super(props);
    this.state = { showDropDown: false };
  }

  public render() {
    const { showDropDown } = this.state;
    return (
      <div
        className="Select"
        onMouseOver={this.showDropDown}
        onMouseLeave={this.hideDropDown}
      >
        <div className="Select-value">
          <span className="Select-value-text">{FORMAT[this.props.format]}</span>
          <IconDown up={showDropDown} />
        </div>
        {showDropDown && (
          <ul className="Select-dropdown">
            <li
              className="Select-dropdown-content"
              onClick={this.handleClick.bind(this, 'content')}
            >
              正文
            </li>
            <li
              className="Select-dropdown-subtitle"
              onClick={this.handleClick.bind(this, 'subtitle')}
            >
              副标题
            </li>
            <li
              className="Select-dropdown-content"
              onClick={this.handleClick.bind(this, 'comment')}
            >
              备注
            </li>
          </ul>
        )}
      </div>
    );
  }

  private showDropDown = () => {
    this.setState({ showDropDown: true });
  };

  private hideDropDown = () => {
    this.setState({ showDropDown: false });
  };

  private handleClick = (format: string) => {
    this.props.onFormatChange(format);
    this.setState({ showDropDown: false });
  };
}

export default Select;
