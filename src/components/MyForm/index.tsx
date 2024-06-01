import React, { FC } from 'react';
import { Form } from 'antd';
import { formType, formItemsType } from './types.d';
import './style.scss';

const MyForm: FC<formType> = props => {
  const { form, formItems, layout, onFinished, ...otherProps } = props;

  return (
    <div className="Form">
      <Form
        scrollToFirstError={true}
        className="Form-form"
        form={form}
        layout={layout || 'horizontal'}
        onFinish={onFinished}
        {...otherProps}
      >
        {formItems.map((item: formItemsType) => (
          <Form.Item key={item.name} {...item}>
            {item?.component}
          </Form.Item>
        ))}
      </Form>
    </div>
  );
};

export default MyForm;
