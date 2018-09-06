if (typeof window !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.type = 'text/css';
  styleSheet.setAttribute('rechextor', 'true');
  styleSheet.innerHTML = `
  .Rechextor {
    border: 1px solid #ccc;
    background: #fff;
    color: #333;
  }

  .Rechextor-editor {
    padding: 6px 5px;
    text-align: left;
    overflow: auto;
  }

  .Rechextor-editor .hr:hover {
    background: #f4f4f4;
  }

  .Rechextor .ToolBar {
    border-bottom: 1px #e8e8e8 solid;
    padding: 6px 5px;
    text-align: left;
  }

  .Rechextor .ToolBar::after {
    display: table;
    content: '';
    clear: both;
  }

  .Rechextor .Select {
    float: left;
  }

  .Rechextor .Select-value {
    width: 130px;
    line-height: 13px;
    padding: 8px;
    border: 1px hsl(0, 0%, 80%) solid;
    cursor: pointer;
    box-sizing: content-box;
  }

  .Rechextor .Select-value-text {
    font-size: 14px;
    color: #333;
  }

  .Rechextor .Select-value-icon {
    float: right;
    position: relative;
    top: 2px;
    width: 10px;
    height: 10px;
    -webkit-transition: -webkit-transform 0.3s;
    transition: -webkit-transform 0.3s;
    -o-transition: transform 0.3s;
    transition: transform 0.3s;
    transition: transform 0.3s, -webkit-transform 0.3s;
  }

  .Rechextor .Select-value-icon.up {
    -webkit-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
  }

  .Rechextor .Select-dropdown {
    position: absolute;
    margin: 0;
    padding: 0;
    width: 150px;
    list-style: none;
    background: #fff;
    box-shadow: 1px 1px 3px #a0a0a0;
    z-index: 10;
    animation: fadeIn 0.4s;
    -webkit-animation: fadeIn 0.4s;
  }

  .Rechextor .Select-dropdown > li {
    padding: 2px 8px;
    line-height: 38px;
    cursor: pointer;
    -webkit-transition: background 0.3s;
    -o-transition: background 0.3s;
    transition: background 0.3s;
  }

  .Rechextor .Select-dropdown > li:hover {
    background: #f8f8f8;
  }

  .Rechextor .Select-dropdown-content {
    font-size: 16px;
  }

  .Rechextor .Select-dropdown-subtitle {
    font-size: 17px;
    font-weight: 900;
  }

  .Rechextor .Select-dropdown-comment {
    font-size: 15px;
    color: #999;
  }

  .Rechextor .Tool {
    float: left;
    position: relative;
    margin-left: 1px;
    width: 32px;
    height: 32px;
    font-size: 0;
    cursor: pointer;
    box-sizing: border-box;
  }

  .Rechextor .Tool:hover {
    border: 1px solid #ccc;
  }

  .Rechextor .Tool.active {
    border: 1px solid #f86442;
    background-color: rgba(248, 100, 66, 0.1);
  }

  .Rechextor .Tool-icon-wrapper {
    width: 100%;
    height: 100%;
  }

  .Rechextor .Tool-tooltip {
    position: absolute;
    bottom: 120%;
    left: 0;
    padding: 5px 10px;
    background-color: #555;
    color: #fff;
    font-size: 12px;
    text-align: center;
    white-space: nowrap;
    border-radius: 5px;
    animation: fadeIn 0.4s;
    -webkit-animation: fadeIn 0.4s;
  }

  .Rechextor .Icon {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -8px 0 0 -8px;
    width: 16px;
    height: 16px;
  }

  @-webkit-keyframes fadeIn {
    from {
      opacity: 0;
    }
  
    to {
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
  
    to {
      opacity: 1;
    }
  }`;
  document.head.appendChild(styleSheet);
}
