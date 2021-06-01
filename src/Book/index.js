import { Table, Pagination, Input, Form, Button } from "antd";
import { useEffect, useState } from "react";
import { makeAxiosRequest } from '../Utils/fetcher';
import * as queryString from "query-string"
import { withRouter } from "react-router";

const Book = (props) => {

    const [bookData, setBookData] = useState([]);
    const [totalBooks, setTotalBooks] = useState(0);
    const [bookDataLoading, setBookDataLoading] = useState(true);
    const [pageSizeValue, setPageSizeValue] = useState(10);
    const [form] = Form.useForm();

    useEffect(() => {
        if (props.location.search === "") {
            props.history.push({
                pathname: props.location.pathname,
                search: "?limit=10&page=1"
            });
        } else {
            const parsed = queryString.parse(props.location.search);
            if (!parsed.limit) {
                parsed.limit = pageSizeValue;
            }
            if (!parsed.page) {
                parsed.page = 1;
            }
            if (parsed.name && parsed.name.length > 3) {
                form.setFieldsValue({
                    name: parsed.name.substring(1, parsed.name.length - 2),
                });
            }
            const query = "?" + queryString.stringify(parsed);
            setBookDataLoading(true)
            makeAxiosRequest("get", `book${query}`, {}).then((resp) => {
                setBookData(resp.docs);
                setTotalBooks(resp.total)
                setBookDataLoading(false);
            }).catch(e => {
                console.log(e)
                setBookDataLoading(false);
            });
        }

    }, [props.location.search, pageSizeValue, props.location.pathname]);

    const config = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (name, record, index) => {
                return <a onClick={() => props.history.push(`/book/${record._id}`)}>{name}</a>
            },
        },
    ];

    const onShowSizeChange = (current, pageSize) => {
        const parsed = queryString.parse(props.location.search);
        parsed.limit = pageSize;
        setPageSizeValue(pageSize);
        props.history.push({
            pathname: props.location.pathname,
            search: props.location.search
        })
    }

    const applyPagination = (page, pageSize) => {
        const parsed = queryString.parse(props.location.search);
        parsed.limit = pageSize;
        parsed.page = page;
        props.history.push({
            pathname: props.location.pathname,
            search: queryString.stringify(parsed)
        });
    };

    const getPageFromSearchQuery = () => {
        const parsed = queryString.parse(props.location.search);
        return Number(parsed.page);
    };

    const applyFilters = (e) => {
        let parsed = queryString.parse(props.location.search);
        const params = new URLSearchParams(props.location.search)
        if (e.name) {
            parsed.name = `/${e.name}/i`;
        } else if (parsed.name) {
            params.delete("name");
            parsed = queryString.parse(params.toString);
        }
        props.history.push({
            pathname: props.location.pathname,
            search: queryString.stringify(parsed)
        });
    }

    const onReset = () => {
        form.resetFields();
    }

    return (
        <>
            <div style={{ display: 'flex', marginTop: 20 }}>
                <Form
                    layout={"inline"}
                    form={form}
                    initialValues={{ layout: "inline" }}
                    onFinish={applyFilters}
                >
                    <div style={{ display: "flex", marginBottom: 20 }}>
                        <Form.Item name="name" label="Name">
                            <Input placeholder="Enter Name" />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" type="primary">Submit</Button>
                            <Button htmlType="submit" onClick={onReset}>Reset</Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20, marginBottom: 20 }}>
                <span>Total: {totalBooks} books</span>
                <Pagination
                    showSizeChanger
                    size="small"
                    defaultCurrent={getPageFromSearchQuery() || 1}
                    total={totalBooks || 0}
                    pageSize={pageSizeValue || 10}
                    onShowSizeChange={onShowSizeChange}
                    onChange={applyPagination}
                />
            </div>
            <Table
                bordered
                dataSource={bookData ? bookData : []}
                rowKey={record => record._id}
                columns={config}
                pagination={false}
                loading={bookDataLoading} />
        </>
    );
}

export default withRouter(Book);