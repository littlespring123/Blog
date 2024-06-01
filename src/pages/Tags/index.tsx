import React, {
  FC,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Button, Form, Input, Modal, Popconfirm, Select, Tag } from 'antd';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-table';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { FormattedMessage as T } from 'react-intl';
import debounce from 'lodash/debounce';
import MyForm from '@/components/MyForm';
import { addApi, delApi, getApi, updateApi } from '@/services/tagsApi';
import useI18n from '@/hooks/useI18n';
import { formItemsType } from '@/components/MyForm/types.d';
import { IModalInfo } from '@/pages/types.d';
import { IAddParams, IPagination, ITag } from './types.d';
import './styles.scss';

const Tags: FC = () => {
  const [form] = Form.useForm();

  const { t } = useI18n();
  const tableRef = useRef<ActionType>(null);

  // 按钮的加载状态
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const rowSelection = {
    selectedRowKeys,
    fixed: true,
    onChange: (selectedRowkeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowkeys);
    },
    preserveSelectedRowKeys: false,
  };

  const [modalInfo, setModalInfo] = useState<IModalInfo>({
    show: false,
    add: true,
  });

  // 提交标签(新增，修改)
  const postData = debounce(async (param: IAddParams) => {
    setLoading(true);
    let res;
    if (param?.id) {
      res = await updateApi(param as Required<IAddParams>);
    } else {
      res = await addApi(param);
    }
    if (res) {
      // 关闭Modal
      setModalInfo({ ...modalInfo, show: false, add: true });
      // 重置
      form?.resetFields();
      // 重新获取
      tableRef.current?.reload(true);
    }
    setLoading(false);
  });

  // 删除标签: 传入数组
  const confirmDel = debounce(async (ids: number[]) => {
    const res = await delApi(ids);
    if (res) {
      // 清空多选
      tableRef.current?.clearSelected && tableRef.current?.clearSelected();
      // 重新获取数据
      tableRef.current?.reload(true);
    }
  });

  const [columnsData] = useState<ProColumns<ITag>[]>([
    {
      dataIndex: 'id',
      title: <T id="tagTable.body.id" />,
      hideInTable: true,
    },
    {
      dataIndex: 'title',
      title: <T id="tagTable.body.tags" />,
      fixed: 'left',
      render: (_: ReactNode, record: ITag) => (
        <Tag title={record.title} color={record.type} key={record.id}>
          {record.title}
        </Tag>
      ),
    },
    {
      dataIndex: 'type',
      hideInTable: true,
      title: t('tagTable.body.type'),
    },
    {
      dataIndex: 'action',
      title: <T id="tagTable.body.operate" />,
      render: (_: ReactNode, record: ITag) => (
        <>
          <Button
            type="link"
            onClick={() => {
              setModalInfo({
                ...modalInfo,
                add: false,
                show: true,
              });
              form.setFieldsValue(record);
            }}
          >
            <T id="tagTable.body.editor" />
          </Button>

          <Popconfirm
            title={t('tagTable.body.isDel')}
            okText={t('tagTable.body.confirmDel')}
            cancelText={t('tagTable.body.cancleDel')}
            onConfirm={() => confirmDel([record.id])}
          >
            <Button type="link" danger>
              <T id="tagTable.body.del" />
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ]);

  // Modal的表单项
  const formItems: formItemsType[] = useMemo(
    () => [
      {
        name: 'id',
        hidden: true,
        component: <Input />,
      },
      {
        name: 'title',
        label: t('modal.name.title'),
        colon: true,
        rules: [{ required: true }],
        component: (
          <Input placeholder={t('modal.name.placeholder')} showCount />
        ),
      },
      {
        name: 'type',
        colon: true,
        label: t('modal.type.title'),
        component: (
          <Select
            allowClear
            style={{ width: '100%' }}
            placeholder={t('modal.tags.placeholder')}
            defaultValue={['default']}
            onChange={(e: string[]) => {
              form.setFieldValue('tags', e);
            }}
            options={[
              {
                value: 'default',
                label: t('modal.type.default'),
              },
              {
                value: 'success',
                label: t('modal.type.success'),
              },
              {
                value: 'error',
                label: t('modal.type.error'),
              },
              {
                value: 'warning',
                label: t('modal.type.warning'),
              },
              {
                value: 'processing',
                label: t('modal.type.processing'),
              },
            ]}
          />
        ),
      },
    ],
    [],
  );

  useEffect(() => {
    return () => {
      postData.cancel();
      confirmDel.cancel();
    };
  }, []);

  return (
    <>
      <ProTable<ITag, IPagination>
        className="no-select"
        columns={columnsData}
        rowKey={'id'}
        size="small"
        showHeader
        actionRef={tableRef}
        bordered
        rowSelection={rowSelection}
        request={async () => {
          const res = await getApi();
          return {
            data: res?.list,
            total: res?.total,
            success: !!res,
          };
        }}
        tableAlertRender={false}
        pagination={false}
        search={false}
        scroll={{ scrollToFirstRowOnChange: true, x: 'max-content', y: 500 }}
        tableLayout="fixed"
        options={false}
        toolBarRender={() => [
          <Button
            onClick={() => {
              form.resetFields();
              setModalInfo({
                ...modalInfo,
                show: true,
                add: true,
              });
            }}
            type="primary"
            key="add"
            icon={<PlusOutlined />}
          >
            <T id="tagTable.head.add" />
          </Button>,
          <Button
            onClick={() => confirmDel(selectedRowKeys as number[])}
            type="primary"
            danger
            key="add"
            disabled={selectedRowKeys.length === 0}
            icon={<MinusOutlined />}
          >
            <T id="tagTable.head.del" />
          </Button>,
        ]}
      />

      <Modal
        title={<T id={modalInfo.add ? 'modal.addTitle' : 'modal.editTitle'} />}
        open={modalInfo.show}
        maskClosable={true}
        destroyOnClose
        width={600}
        centered
        confirmLoading={loading}
        afterClose={() => form.resetFields()}
        onOk={() => form.submit()}
        onCancel={() => {
          setModalInfo({ ...modalInfo, show: false });
          form?.resetFields();
        }}
      >
        <MyForm
          form={form}
          onFinished={postData}
          formItems={formItems}
          preserve={false}
          disabled={loading}
        />
      </Modal>
    </>
  );
};
export default Tags;
