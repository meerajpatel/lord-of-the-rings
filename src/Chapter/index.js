import { Table, Pagination, Input, Form, Button } from "antd";
import { useEffect, useState } from "react";
import { makeAxiosRequest } from '../Utils/fetcher';
import * as queryString from "query-string"
import { withRouter } from "react-router";

const Chapter = (props) => {

    const [chapterData, setChapterData] = useState([]);
    const [bookData, setBookData] = useState([]);
    const [bookDataLoading, setBookDataLoading] = useState(true);
    const [totalChapters, setTotalChapters] = useState(0);
    const [chapterDataLoading, setChapterDataLoading] = useState(true);
    const [pageSizeValue, setPageSizeValue] = useState(10);
    const [form] = Form.useForm();

    useEffect(() => {
        if(!(bookData.length)) {
            setBookDataLoading(true);
            makeAxiosRequest("get", `book`, {}).then((resp) => {
                setBookData(resp.docs);
                setBookDataLoading(false);
            }).catch(e => {
                console.log(e)
                setBookData([]);
                setBookDataLoading(false);
            });
        }
        let bookId = "";
        if (props.match.params?.id) {
            if (props.match.path.includes("book")) {
                bookId = props.match.params.id;
            }
        }
        if (props.location.search === "") {
           if (bookId) {
                props.history.push({
                    pathname: props.location.pathname,
                    search: `?limit=10&page=1&book=${bookId}`
                });
            } else {
                props.history.push({
                    pathname: props.location.pathname,
                    search: "?limit=10&page=1"
                });
            }
        } else {
            const parsed = queryString.parse(props.location.search);
            if (!parsed.limit) {
                parsed.limit = pageSizeValue;
            }
            if (!parsed.page) {
                parsed.page = 1;
            }
            if (parsed.chapterName && parsed.chapterName.length > 3) {
                form.setFieldsValue({
                    chapterName: parsed.chapterName.substring(1, parsed.chapterName.length - 2),
                });
            }
            if (parsed.book) {
                form.setFieldsValue({
                    book: parsed.book,
                });
            }

            const query = "?" + queryString.stringify(parsed);
            setChapterDataLoading(true)
            makeAxiosRequest("get", `chapter${query}`, {}).then((resp) => {
                setChapterData(resp.docs);
                setTotalChapters(resp.total)
                setChapterDataLoading(false);
            }).catch(e => {
                console.log(e);
                setChapterData([]);
                setTotalChapters(0);
                setChapterDataLoading(false);
            });
        }

    }, [props.location.search, props.match.params.id]);

    const config = [
        {
            title: 'Chapter Name',
            dataIndex: 'chapterName',
            key: 'chapterName',
            render: (chapterName, record, index) => {
                return <a onClick={() => props.history.push(`/chapter/${record._id}`)}>{chapterName}</a>
            },
        },
        {
            title: 'Book',
            dataIndex: 'book',
            key: 'book',
            render: (book, record, index) => {
                return <a onClick={() => props.history.push(`/book/${book}`)}>{(bookData.filter(b => b["_id"] === book))[0]["name"]}</a>
            },
        }
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
        if (e.chapterName) {
            parsed.chapterName = `/${e.chapterName}/i`;
        } else if (parsed.chapterName) {
            params.delete("chapterName");
            parsed = queryString.parse(params.toString);
        }
        if (!(props.match.params?.id && props.match.path.includes("book"))) {
            if (e.book) {
                parsed.book = e.book;
            } else if (parsed.book) {
                params.delete("book");
                parsed = queryString.parse(params.toString);
            }
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
                        <Form.Item name="chapterName" label="Chapter Name">
                            <Input placeholder="Enter Chapter Name" />
                        </Form.Item>
                        {!(props.match.params?.id && props.match.path.includes("book")) &&
                            <Form.Item name="book" label="Book Id">
                                <Input placeholder="Enter book id" />
                            </Form.Item>
                        }
                        <Form.Item>
                            <Button htmlType="submit" type="primary">Submit</Button>
                            <Button htmlType="submit" onClick={onReset}>Reset</Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20, marginBottom: 20 }}>
                <span>Total: {totalChapters} quotes</span>
                <Pagination
                    showSizeChanger
                    size="small"
                    defaultCurrent={getPageFromSearchQuery() || 1}
                    total={totalChapters || 0}
                    pageSize={pageSizeValue || 10}
                    onShowSizeChange={onShowSizeChange}
                    onChange={applyPagination}
                />
            </div>
            <Table
                bordered
                dataSource={chapterData.length ? (bookData.length ? chapterData : []) : []}
                rowKey={record => record._id}
                columns={config}
                pagination={false}
                loading={chapterDataLoading || bookDataLoading || !bookData.length} />
        </>
    );
}

export default withRouter(Chapter);
