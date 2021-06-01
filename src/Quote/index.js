import { Table, Pagination, Input, Form, Button } from "antd";
import { useEffect, useState } from "react";
import { makeAxiosRequest } from '../Utils/fetcher';
import * as queryString from "query-string"
import { withRouter } from "react-router";

const Quote = (props) => {

    const [quoteData, setQuoteData] = useState([]);
    const [totalQuotes, setTotalQuotes] = useState(0);
    const [quoteDataLoading, setQuoteDataLoading] = useState(true);
    const [pageSizeValue, setPageSizeValue] = useState(10);
    const [form] = Form.useForm();

    useEffect(() => {
        let movieId = "";
        let characterId = "";
        if (props.match.params?.id) {
            if (props.match.path.includes("character")) {
                characterId = props.match.params.id;
            } else if (props.match.path.includes("movie")) {
                movieId = props.match.params.id;
            }
        }
        if (props.location.search === "") {
            if (characterId) {
                props.history.push({
                    pathname: props.location.pathname,
                    search: `?limit=10&page=1&character=${characterId}`
                });
            } else if (movieId) {
                props.history.push({
                    pathname: props.location.pathname,
                    search: `?limit=10&page=1&movie=${movieId}`
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
            if (parsed.dialog && parsed.dialog.length > 3) {
                form.setFieldsValue({
                    dialog: parsed.dialog.substring(1, parsed.dialog.length - 2),
                });
            }
            if (parsed.character) {
                form.setFieldsValue({
                    character: parsed.character,
                });
            }
            if (parsed.movie) {
                form.setFieldsValue({
                    movie: parsed.movie,
                });
            }

            const query = "?" + queryString.stringify(parsed);
            setQuoteDataLoading(true)
            makeAxiosRequest("get", `quote${query}`, {}).then((resp) => {
                setQuoteData(resp.docs);
                setTotalQuotes(resp.total)
                setQuoteDataLoading(false);
            }).catch(e => {
                console.log(e);
                setQuoteData([]);
                setTotalQuotes(0);
                setQuoteDataLoading(false);
            });
        }

    }, [props.location.search, props.match.params.id]);

    const config = [
        {
            title: 'Movie ID',
            dataIndex: 'movie',
            key: 'movie',
            render: (movie, record, index) => {
                return <a onClick={() => props.history.push(`/movie/${movie}`)}>{movie}</a>
            },
        },
        {
            title: 'Dialog',
            dataIndex: 'dialog',
            key: 'dialog',
            render: (dialog, record, index) => {
                return <a onClick={() => props.history.push(`/quote/${record._id}`)}>{dialog}</a>
            },
        },
        {
            title: 'Character Id',
            dataIndex: 'character',
            key: 'character',
            render: (character, record, index) => {
                return <a onClick={() => props.history.push(`/character/${character}`)}>{character}</a>
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
        if (e.dialog) {
            parsed.dialog = `/${e.dialog}/i`;
        } else if (parsed.dialog) {
            params.delete("dialog");
            parsed = queryString.parse(params.toString);
        }
        if (!(props.match.params?.id && props.match.path.includes("movie"))) {
            if (e.movie) {
                parsed.movie = e.movie;
            } else if (parsed.movie) {
                params.delete("movie");
                parsed = queryString.parse(params.toString);
            }
        }
        if (!(props.match.params?.id && props.match.path.includes("character"))) {
            if (e.character) {
                parsed.character = e.character;
            } else if (parsed.character) {
                params.delete("character");
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
                        <Form.Item name="dialog" label="Dialog">
                            <Input placeholder="Enter Dialog" />
                        </Form.Item>
                        {!(props.match.params?.id && props.match.path.includes("movie")) &&
                            <Form.Item name="movie" label="Movie Id">
                                <Input placeholder="Enter movie id" />
                            </Form.Item>
                        }
                        {!(props.match.params?.id && props.match.path.includes("character")) &&
                            <Form.Item name="character" label="Character Id">
                                <Input placeholder="Enter Character Id" />
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
                <span>Total: {totalQuotes} quotes</span>
                <Pagination
                    showSizeChanger
                    size="small"
                    defaultCurrent={getPageFromSearchQuery() || 1}
                    total={totalQuotes || 0}
                    pageSize={pageSizeValue || 10}
                    onShowSizeChange={onShowSizeChange}
                    onChange={applyPagination}
                />
            </div>
            <Table
                bordered
                dataSource={quoteData ? quoteData : []}
                rowKey={record => record._id}
                columns={config}
                pagination={false}
                loading={quoteDataLoading} />
        </>
    );
}

export default withRouter(Quote);