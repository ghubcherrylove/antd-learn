import React from 'react';
import {Upload, Button, Icon, message} from 'antd';

class MyUpload extends React.Component {
  constructor() {
    super();
    this.state = {
      value: ''
    };
  }
  render() {
    const props = {
      name: 'file',
      actions: '//jsonplaceholder.typicode.com/posts/',
      onChange(info) {
        if (info.file.status !== 'iploading') {
          console.log(info.file, info,fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name}file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      }
    }
    return (
      <div>
        <Upload>
          <Button>
            <Icon type="upload" />Click to Upload
          </Button>
        </Upload>
      </div>
    );
  }
}

export default MyUpload;