import { Table, Pagination, Input, Form, Button } from "antd";
import { useEffect, useState } from "react";
import { makeAxiosRequest } from '../Utils/fetcher';
import * as queryString from "query-string"
import { withRouter } from "react-router";

const Movie = (props) => {

    const [movieData, setMovieData] = useState([]);
    const [totalMovies, setTotalMovies] = useState(0);
    const [movieDataLoading, setMovieDataLoading] = useState(true);
    const [pageSizeValue, setPageSizeValue] = useState(10);
    const [form] = Form.useForm();

    useEffect(() => {
        console.log(queryString.parse(props.location.search));

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
            const query = "?" + queryString.stringify(parsed);
            setMovieDataLoading(true)
            makeAxiosRequest("get", `movie${query}`, {}).then((resp) => {
                setMovieData(resp.docs);
                setTotalMovies(resp.total)
                setMovieDataLoading(false);
            }).catch(e => {
                console.log(e)
                setMovieDataLoading(false);
            });
        }

    }, [props.location.search]);

    const config = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Academy Award Nominations',
            dataIndex: 'academyAwardNominations',
            key: 'academyAwardNominations',
        },
        {
            title: 'Academy Award Wins',
            dataIndex: 'academyAwardWins',
            key: 'academyAwardWins',
        },
        {
            title: 'BoxOffice Revenue In Millions',
            dataIndex: 'boxOfficeRevenueInMillions',
            key: 'boxOfficeRevenueInMillions',
        },
        {
            title: 'Budget In Millions',
            dataIndex: 'budgetInMillions',
            key: 'budgetInMillions',
        },
        {
            title: 'Rotten Tomatoes Score',
            dataIndex: 'rottenTomatoesScore',
            key: 'rottenTomatoesScore',
        }, {
            title: 'Runtime In Minutes',
            dataIndex: 'runtimeInMinutes',
            key: 'runtimeInMinutes',
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
        if (!isNaN(e.budgetInMillions) && e.budgetInMillions !== "") {
            parsed["budgetInMillions<"] = Number(e.budgetInMillions)
        } else if (!isNaN(parsed["budgetInMillions<"])) {
            params.delete("budgetInMillions<");
            parsed = queryString.parse(params.toString);
        }
        if (!isNaN(e.academyAwardWins) && e.academyAwardWins !== "") {
            parsed["academyAwardWins>"] = Number(e.academyAwardWins)
        } else if (!isNaN(parsed["academyAwardWins>"])) {
            params.delete("academyAwardWins>");
            parsed = queryString.parse(params.toString);
        }
        if (!isNaN(e.runtimeInMinutes) && e.runtimeInMinutes !== "") {
            parsed["runtimeInMinutes>"] = Number(e.runtimeInMinutes)
        } else if (!isNaN(parsed["runtimeInMinutes>"])) {
            params.delete("runtimeInMinutes>");
            parsed = queryString.parse(params.toString);
        }
        props.history.push({
            pathname: props.location.pathname,
            search: queryString.stringify(parsed)
        });
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
                        <Form.Item name="budgetInMillions" label="Budget In Millions <=">
                            <Input placeholder="Enter Budget In Millions <=" />
                        </Form.Item>
                        <Form.Item name="academyAwardWins" label="Academy Award Wins >=">
                            <Input placeholder="Enter Academy Award Wins >=" />
                        </Form.Item>
                    </div>
                    <div style={{ display: "flex" }}>
                        <Form.Item name="runtimeInMinutes" label="Runtime In Minutes >=">
                            <Input placeholder="Enter Runtime In Minutes >=" />
                        </Form.Item>
                        <Form.Item>
                            <Button htmlType="submit" type="primary">Submit</Button>
                        </Form.Item>
                    </div>
                </Form>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 20, marginBottom: 20 }}>
                <span>Total: {totalMovies} movies</span>
                <Pagination
                    showSizeChanger
                    size="small"
                    defaultCurrent={getPageFromSearchQuery() || 1}
                    total={totalMovies || 0}
                    pageSize={pageSizeValue || 10}
                    onShowSizeChange={onShowSizeChange}
                    onChange={applyPagination}
                />
            </div>
            <Table
                bordered
                dataSource={movieData ? movieData : []}
                rowKey={record => record._id}
                columns={config}
                pagination={false}
                loading={movieDataLoading} />
        </>
    );
}

export default withRouter(Movie);