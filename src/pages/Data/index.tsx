import React, {
  FC,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Button, Form, Input, Modal, Popconfirm, Select, Tag } from 'antd';
import { ProColumns, ProTable, ActionType } from '@ant-design/pro-table';
import { PlusOutlined, RedoOutlined, SearchOutlined } from '@ant-design/icons';
import { FormattedMessage as T } from 'react-intl';
import debounce from 'lodash/debounce';
import dayjs from 'dayjs';
import MyForm from '@/components/MyForm';
import { addApi, delApi, getApi, updateApi } from '@/services/listApi';
import useI18n from '@/hooks/useI18n';
import { formItemsType } from '@/components/MyForm/types.d';
import { IModalInfo } from '@/pages/types.d';
import { IData, IDataParams, ITableParams, ITag } from './types.d';
import './styles.scss';

const Data: FC = () => {
  const { t } = useI18n();
  const [form] = Form.useForm();

  const tableRef = useRef<ActionType>();

  const [tableParams, setTableParams] = useState<ITableParams>({});

  const [loading, setLoading] = useState<boolean>(false);

  const [tagsMap, setTagsMap] = useState<ITag[]>([]);

  const [columnsData, setColumnsData] = useState<ProColumns<IData>[]>([]);

  const [modalInfo, setModalInfo] = useState<IModalInfo>({
    show: false,
    add: true,
  });

  // 获取数据
  const getData = async (params: ITableParams) => {
    const res = await getApi(params);
    if (res) {
      setColumnsData([
        // {
        //   dataIndex: 'id',
        //   title: <T id="dataTable.body.id" />,
        //   search: false,
        //   fixed: 'left',
        // },
        {
          title: <T id="dataTable.body.number" />,
          dataIndex: 'number',
          search: false,
          fixed: 'left',
          render: (_, __: IData, index: number) =>
            res?.pageSize * (res?.pageNum - 1) + index + 1,
        },
        {
          dataIndex: 'title',
          // copyable: true,
          title: <T id="dataTable.body.name" />,
          fixed: 'left',
        },
        {
          dataIndex: 'description',
          title: <T id="dataTable.body.description" />,
          ellipsis: {
            showTitle: true,
          },
          width: 250, // 超过30字隐藏
          search: false,
        },
        {
          // 在 列表 中展示
          dataIndex: 'createdAt',
          title: <T id="dataTable.body.time" />,
          valueType: 'dateTime',
          search: false,
        },
        {
          // 在 表单 中展示
          dataIndex: 'time',
          title: <T id="dataTable.body.time" />,
          hideInTable: true,
          valueType: 'dateRange',
        },
        {
          dataIndex: 'tags',
          title: <T id="dataTable.body.tags" />,
          filters: true,
          onFilter: true,
          valueType: 'checkbox',
          renderFormItem: () => (
            <Select
              mode="multiple"
              placeholder={<T id="dataTable.form.tags.placeholder" />}
              options={res.tagsList}
            />
          ),
          render: (_: ReactNode, record: IData) =>
            record.tags?.map((item: ITag) => (
              <Tag
                title={item.label}
                color={item.type}
                key={item.value}
                className="tag no-select"
              >
                {item.label}
              </Tag>
            )),
        },
        {
          dataIndex: 'action',
          title: <T id="dataTable.body.operate" />,
          search: false,
          render: (_: ReactNode, record: IData) => (
            <>
              <Button
                type="link"
                onClick={() => {
                  setModalInfo({ show: true, add: false });
                  form.setFieldsValue(record);
                }}
              >
                <T id="dataTable.body.editor" />
              </Button>
              <Popconfirm
                title={t('dataTable.body.isDel')}
                okText={t('dataTable.body.confirmDel')}
                cancelText={t('dataTable.body.cancleDel')}
                onConfirm={() => {
                  confirmDel(record?.id);
                }}
              >
                <Button type="link" danger>
                  <T id="dataTable.body.del" />
                </Button>
              </Popconfirm>
            </>
          ),
        },
      ]);
      setTagsMap(res.tagsList);
    }

    return res;
  };

  // 提交数据(新增，修改)
  const postData = debounce(async (param: IDataParams) => {
    setLoading(true);
    let res;
    if (param?.id) {
      res = await updateApi(param);
    } else {
      res = await addApi(param);
    }
    if (res) {
      // 发送成功：清空表单，关闭modal, 重新获取数据
      setModalInfo({ show: false, add: true });
      // form?.resetFields()

      tableRef.current?.reload(true);
    }
    setLoading(false);
  });

  // 删除数据
  const confirmDel = debounce(async (id: number) => {
    const res = await delApi(id);
    if (res) {
      // 重新获取数据
      tableRef.current?.reload(true);
    }
  });

  // Modal的表单
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
        name: 'description',
        colon: true,
        label: t('modal.description.title'),
        component: (
          <Input.TextArea
            placeholder={t('modal.description.placeholder')}
            showCount
          />
        ),
      },
      {
        name: 'tags',
        colon: true,
        label: t('modal.tags.title'),
        component: (
          <Select
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder={t('modal.tags.placeholder')}
            onChange={e => {
              form.setFieldValue('tags', e);
            }}
            options={tagsMap}
          />
        ),
      },
    ],
    [tagsMap],
  );

  useEffect(() => {
    return () => {
      postData.cancel();
      confirmDel.cancel();
    };
  }, []);

  return (
    <>
      <ProTable<IData, ITableParams>
        className="data-table no-select"
        columns={columnsData}
        rowKey={'id'}
        size="small"
        showHeader
        actionRef={tableRef}
        bordered
        request={async params => {
          const res = await getData(params);
          return {
            data: res?.list,
            total: res?.total,
            success: !!res,
          };
        }}
        pagination={{
          ...tableParams,
          position: ['bottomRight'],
          showQuickJumper: true,
          showSizeChanger: true,
        }}
        scroll={{
          scrollToFirstRowOnChange: true,
          // x: 'max-content',
          y: 400,
        }}
        tableLayout="fixed"
        options={false}
        defaultSize="small"
        dateFormatter={(value: dayjs.Dayjs) =>
          value.format('YYYY-MM-DD HH:mm:ss')
        }
        search={{
          collapseRender: false,
          collapsed: false,
          defaultCollapsed: false,
          optionRender: searchConfig => [
            <Button
              type="primary"
              icon={<SearchOutlined />}
              key="search"
              onClick={() => {
                setTableParams({
                  ...tableParams,
                  ...searchConfig.form?.getFieldsValue(),
                  // pageNum: 1,
                  // current: 1,
                });
                searchConfig.form?.submit();
              }}
            >
              <T id="dataTable.form.search" />
            </Button>,
            <Button
              key="reset"
              icon={<RedoOutlined />}
              onClick={() => {
                searchConfig.form?.resetFields();
                setTableParams({
                  ...tableParams,
                  ...searchConfig.form?.getFieldsValue(),
                  // pageNum: 1,
                  // current: 1,
                });
                searchConfig.form?.submit();
              }}
            >
              <T id="dataTable.form.reset" />
            </Button>,
          ],
        }}
        toolBarRender={() => [
          <Button
            onClick={() => {
              // form.resetFields()
              setModalInfo({ show: true, add: true });
              form.resetFields();
            }}
            type="primary"
            key="add"
            icon={<PlusOutlined />}
          >
            <T id="dataTable.head.add" />
          </Button>,
        ]}
      />

      <Modal
        title={<T id={modalInfo.add ? 'modal.addTitle' : 'modal.editTitle'} />}
        open={modalInfo.show}
        maskClosable
        // destroyOnClose
        confirmLoading={loading}
        width={600}
        centered
        onCancel={() => {
          setModalInfo({ ...modalInfo, show: false });
          form?.resetFields();
        }}
        afterClose={() => {
          form.resetFields();
        }}
        onOk={() => {
          form.submit();
        }}
      >
        <MyForm
          form={form}
          preserve={false}
          onFinished={postData}
          formItems={formItems}
          disabled={loading}
        />
      </Modal>
    </>
  );
};
export default Data;
