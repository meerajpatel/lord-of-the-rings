import { useEffect, useState } from "react";
import { makeAxiosRequest } from "../Utils/fetcher";
import { Button, Card } from "antd";
import { withRouter } from 'react-router';

const BookDetail = (props) => {
    const [bookData, setBookData] = useState({});
    const [bookDataLoading, setBookDataLoading] = useState(true);

    useEffect(() => {
        setBookDataLoading(true)
        makeAxiosRequest("get", `book/${props.match.params.id}`, {}).then((resp) => {
            if (resp?.docs?.length > 0) {
                setBookData(resp.docs[0]);
            } else {
                setBookData({});
            }
            setBookDataLoading(false);
        }).catch(e => {
            console.log(e)
            setBookDataLoading(false);
        });
    }, [props.match.params.id])
    return (
        <>
            {!bookDataLoading && Object.keys(bookData).length && <>
                <div style={{display: "flex", justifyContent: "space-evenly"}}>
                    <Card title="Book Detail" style={{ width: 500 }}>
                        {Object.keys(bookData).map(key => {
                            return <div key={key} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid lightgray" }}>
                                <div>
                                    {key.toUpperCase()}
                                </div>
                                <div>
                                    {bookData[key]}
                                </div>
                            </div>
                        })}
                    </Card>
                    <div>
                        <Button type="primary" onClick={() => props.history.push(`/book/${props.match.params.id}/chapter?limit=10&page=1&book=${props.match.params.id}`)}>Chapters</Button>
                    </div>
                </div>
            </>}
        </>
    );
}


export default withRouter(BookDetail);