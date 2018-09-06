# Rechextor

一个基于 [slate](https://github.com/ianstormtaylor/slate) 封装的轻量级 React 富文本编辑器

## 安装

```sh
npm install rechextor --save
```

## 使用

```js
import Rechextor from 'rechextor';

class App extends React.Component {
  state = { value: '' };

  handleChange = value => {
    this.setState({ value });
  };

  handleSuccess = (result, insertImage) => {
    // result 为上传图片的 http response body
    // insertImage 为一个回调函数，接受一个 url 作为参数，只有调用此函数才能插入图片
    insertImage(result.data.url);
  };

  render() {
    return (
      <Rechextor
        tools={[
          'bold',
          'strong',
          'italic',
          'underline',
          'strikethrough',
          'image',
          'tag',
          'blockquote',
          'line'
        ]}
        initialValue={this.state.value}
        placeholder="To be continued..."
        onChange={this.handleChange}
        uploadPath="/upload"
        onUploadSuccess={this.handleSuccess}
      />
    );
  }
}
```

## API

组件接受以下参数

| 参数名          | 描述                                                                                          | 类型     | 默认值 |
| --------------- | --------------------------------------------------------------------------------------------- | -------- | ------ |
| tools           | 工具栏列表，目前支持的工具见使用                                                              | string[] |        |
| initialValue    | 编辑器渲染的初始内容，此值只在第一次 Boolean(initialValue) 为 true 时生效，后续的更新会被忽略 | string   |        |
| placeholder     | 编辑器无内容时显示的 placeholder                                                              | string   |        |
| onChange        | 用于同步编辑器的更改，接受一个 html 字符串作为参数                                            | function |        |
| uploadPath      | 图片上传服务器地址，需要配合 onUploadSuccess 一起使用                                         | string   |        |
| onUploadSuccess | 图片上传成功的回调，说明见使用                                                                | function |        |
| beforeUpload    | 图片上传之前的回调，详见 [rc-upload](https://github.com/react-component/upload)               | function |        |
| onUploadError   | 图片上传失败的回调                                                                            | function |        |
| onBlur          | 编辑器失去焦点的回调                                                                          | function |        |
| onFocus         | 编辑器获得焦点的回调                                                                          | function |        |
