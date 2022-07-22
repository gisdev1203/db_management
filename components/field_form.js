import { forwardRef, useImperativeHandle } from 'react';
import { Checkbox, Form, Input, Select, Space } from '@arco-design/web-react';
import fieldTypes from '../data/filed_typs';


/**
 * It renders a form for editing a table
 * @param props - The props passed to the component.
 * @returns A TableForm component
 */
function FieldForm(props, ref) {
    const [form] = Form.useForm();

    const { field, table } = props;

    const save = (values) => {
        const data = { ...field, ...values };
        table.fields = table.fields.map(f => f.id === data.id ? data : f);
        props.updateTable(table);
    };

    useImperativeHandle(ref, () => ({
        submit: () => {
            form.submit();
        }
    }));

    return (
        <Form
            onSubmit={save}
            form={form}
            labelAlign="left"
            requiredSymbol={false}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 18 }}
            onValuesChange={(changedValues, allValues) => {
                if (!props.formChange) props.setFormChange(true);
            }}
        >
            <Space direction="vertical" style={{ width: '100%' }}>
                <Space className="table-form-item">
                    <Form.Item
                        label="Name"
                        field="name"
                        initialValue={field.name}
                        rules={[{ required: true, message: 'Please enter field name' }]}
                    >
                        <Input allowClear />
                    </Form.Item>
                    <Form.Item
                        label="Type"
                        field="type"
                        initialValue={field.type}
                        rules={[{ required: true, message: 'Please choose field type' }]}
                    >
                        <Select style={{ width: '100%' }} allowCreate>
                            {fieldTypes.map(item => (
                                <Select.Option key={item} value={item}>
                                    {item}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Space>
                <Space className="table-form-item">
                    <Form.Item label="Comment" field="note" initialValue={field.note || ''}>
                        <Input allowClear placeholder="note" />
                    </Form.Item>
                    <Form.Item label="Default" field="dbdefault" initialValue={field.dbdefault || ''}>
                        <Input allowClear placeholder="default" />
                    </Form.Item>
                </Space>
                <Space className="table-form-item">
                    <Form.Item noStyle field="pk" initialValue={field.pk}>
                        <Checkbox defaultChecked={field.pk}>Primary</Checkbox>
                    </Form.Item>
                    <Form.Item noStyle field="unique" initialValue={field.unique}>
                        <Checkbox defaultChecked={field.unique}>Unique</Checkbox>
                    </Form.Item>
                    <Form.Item noStyle field="not_null" initialValue={field.not_null}>
                        <Checkbox defaultChecked={field.not_null}>Not Null</Checkbox>
                    </Form.Item>
                    <Form.Item noStyle field="increment" initialValue={field.increment}>
                        <Checkbox defaultChecked={field.increment}>Increment</Checkbox>
                    </Form.Item>
                </Space>
            </Space>
        </Form>
    );
}

export default forwardRef(FieldForm);
