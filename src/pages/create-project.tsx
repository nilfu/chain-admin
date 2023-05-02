import {
  Button,
  Upload,
  Form,
  Input,
  UploadFile,
  UploadProps,
  message,
} from 'antd';
import { useState } from 'react';
import axios from 'axios';

export default function CreateProject() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [messageApi, contextHolder] = message.useMessage();

  const uploadProps: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([file]);
      return false;
    },
    fileList,
  };

  const asyncRead = (fileList: any) => {
    return new Promise(function (resolve, reject) {
      let file: string[] = [];
      const reader = new FileReader();
      reader.readAsText(fileList.file, 'utf8');
      reader.onload = function () {
        file = (reader.result as string).split(/[(\r\n)\r\n]+/);
        resolve(file);
      };
    });
  };

  const onFinish = async (values: any) => {
    const { project, table, fileList } = values;
    const file = await asyncRead(fileList);
    try {
      const {
        data: { code, message },
      } = await axios.post('/api/create-project', {
        project,
        table,
        file,
      });
      if (code === 200) {
        messageApi.success(message);
      }
    } catch (error) {}
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="项目名"
          name="project"
          rules={[{ required: true, message: 'Please input project!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="表名"
          name="table"
          rules={[{ required: true, message: 'Please input table!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="文件"
          name="fileList"
          required
          rules={[
            {
              validator: (_rule, value, _callback) => {
                return new Promise((resolve, reject) => {
                  if (!value || value.fileList.length === 0) {
                    reject(new Error('Please input file!'));
                  } else {
                    resolve(value);
                  }
                });
              },
            },
          ]}
        >
          <Upload {...uploadProps}>
            <Button>上传文件</Button>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
