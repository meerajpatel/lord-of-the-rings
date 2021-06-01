// eslint-disable-file
import { Table, Pagination, Input, Form, Button } from "antd";
import { useEffect, useState } from "react";
import { makeAxiosRequest } from '../Utils/fetcher';
import * as queryString from "query-string"
import { withRouter } from "react-router";

const Character = (props) => {

    const [characterData, setCharacterData] = useState([]);
    const [totalCharacters, setTotalCharacters] = useState(0);
    const [characterDataLoading, setCharacterDataLoading] = useState(true);
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
            if (parsed.race && parsed.race.length > 3) {
                form.setFieldsValue({
                    race: parsed.race.substring(1, parsed.race.length - 2),
                });
            }
            if (parsed.gender && parsed.gender.length > 3) {
                form.setFieldsValue({
                    gender: parsed.gender.substring(1, parsed.gender.length - 2),
                });
            }
            if (parsed.spouse && parsed.spouse.length > 3) {
                form.setFieldsValue({
                    spouse: parsed.spouse.substring(1, parsed.spouse.length - 2),
                });
            }

            const query = "?" + queryString.stringify(parsed);
            setCharacterDataLoading(true)
            makeAxiosRequest("get", `character${query}`, {}).then((resp) => {
                setCharacterData(resp.docs);
                setTotalCharacters(resp.total)
                setCharacterDataLoading(false);
            }).catch(e => {
                console.log(e)
                setCharacterDataLoading(false);
            });
        }
    }, [props.location.search, pageSizeValue, props.location.pathname]);

    const config = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (name, record, index) => {
                return <a onClick={() => props.history.push(`/character/${record._id}`)}>{name}</a>
            },
        },
        {
            title: 'Height',
            dataIndex: 'height',
            key: 'height',
        },
        {
            title: 'Race',
            dataIndex: 'race',
            key: 'race',
        },
        {
            title: 'Gender',
            dataIndex: 'gender',
            key: 'gender',
        },
        {
            title: 'Birth',
            dataIndex: 'birth',
            key: 'birth',
        },
        {
            title: 'Spouse',
            dataIndex: 'spouse',
            key: 'spouse',
        }, {
            title: 'Death',
            dataIndex: 'death',
            key: 'death',
        }, {
            title: 'Realm',
            dataIndex: 'realm',
            key: 'realm',
        }, {
            title: 'Hair',
            dataIndex: 'hair',
            key: 'hair',
        }, {
            title: 'WikiUrl',
            dataIndex: 'wikiUrl',
            key: 'wikiUrl',
            render: (wikiUrl, record, index) => {
                return <a href={wikiUrl} rel="noreferrer" target="_blank">{wikiUrl}</a>
            }
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
        if (e.name) {
            parsed.name = `/${e.name}/i`;
        } else if (parsed.name) {
            params.delete("name");
            parsed = queryString.parse(params.toString);
        }
        if (e.race) {
            parsed.race = `/${e.race}/i`;
        } else if (parsed.race) {
            params.delete("race");
            parsed = queryString.parse(params.toString);
        }
        if (e.gender) {
            parsed.gender = `/${e.gender}/i`;
        } else if (parsed.gender) {
            params.delete("gender");
            parsed = queryString.parse(params.toString);
        }
        if (e.spouse) {
            parsed.spouse = `/${e.spouse}/i`;
        } else if (parsed.spouse) {
            params.delete("spouse");
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
                        <Form.Item name="race" label="Race">
                            <Input placeholder="Enter Race" />
                        </Form.Item>
                        <Form.Item name="gender" label="Gender">
                            <Input placeholder="Enter gender" />
                        </Form.Item>
                    </div>
                    <div style={{ display: "flex" }}>
                        <Form.Item name="spouse" label="Spouse">
                            <Input placeholder="Enter spouse" />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" type="primary">Submit</Button>
                            <Button htmlType="submit" onClick={onReset}>Reset</Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20, marginBottom: 20 }}>
                <span>Total: {totalCharacters} characters</span>
                <Pagination
                    showSizeChanger
                    size="small"
                    defaultCurrent={getPageFromSearchQuery() || 1}
                    total={totalCharacters || 0}
                    pageSize={pageSizeValue || 10}
                    onShowSizeChange={onShowSizeChange}
                    onChange={applyPagination}
                />
            </div>
            <Table
                bordered
                dataSource={characterData ? characterData : []}
                rowKey={record => record._id}
                columns={config}
                pagination={false}
                loading={characterDataLoading} />
        </>
    );
}

export default withRouter(Character);