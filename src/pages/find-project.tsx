import { Button, Modal, Select, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import axios from 'axios';
import { useEffect, useState } from 'react';

enum Status {
  FAIL = '失败',
  USED = '已使用',
  UNUSED = '未使用',
}

interface DataType {
  key: string;
  title: string;
  body: string;
  ads: string;
  status: Status;
}

export default function CreateProject() {
  const columns: ColumnsType<DataType> = [
    {
      title: '名称',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <>{text}</>,
    },
    {
      title: '内容',
      dataIndex: 'body',
      key: 'body',
      render: (text) => <>{text}</>,
    },
    {
      title: 'Ads',
      dataIndex: 'ads',
      key: 'ads',
      render: (text) => <>{text}</>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (text) => (
        <>
          {text === 'FAIL' ? '失败' : text === 'UNUSED' ? '未使用' : '已使用'}
        </>
      ),
    },
    {
      title: '操作',
      key: 'action',
      render: (value, _record) => (
        <Space size="middle">
          <Button onClick={() => changeStatus(value)}>更改状态</Button>
        </Space>
      ),
    },
  ];
  const [list, setList] = useState<DataType[]>([]);
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selected, setSelected] = useState<{ id?: string }>({});
  const [status, setStatus] = useState('UNUSED');

  const getList = () => {
    axios.get('/api/find-project').then((res) => {
      const {
        data: { code, data },
      } = res;
      if (code === 200) {
        setList(data);
      }
    });
  };

  useEffect(() => {
    getList();
  }, []);

  const handleOk = async () => {
    await axios.post('/api/project', {
      id: selected.id,
      status,
    });
    getList();
    setConfirmLoading(true);
    setOpen(false);
    setConfirmLoading(false);
  };

  const changeStatus = (value: any) => {
    setSelected(value);
    setOpen(true);
  };

  return (
    <>
      <Table columns={columns} dataSource={list} />{' '}
      <Modal
        title=""
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setOpen(false)}
      >
        <Select
          defaultValue="USED"
          style={{ width: 120 }}
          options={[
            { value: 'FAIL', label: '失败' },
            { value: 'USED', label: '已使用' },
            { value: 'UNUSED', label: '未使用' },
          ]}
          onChange={(value) => setStatus(value)}
        />
      </Modal>
    </>
  );
}
