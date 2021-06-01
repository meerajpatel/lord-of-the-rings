import { useEffect, useState } from "react";
import { makeAxiosRequest } from "../Utils/fetcher";
import { Card } from "antd";
import { withRouter } from 'react-router';

const QuoteDetail = (props) => {
    const [quoteData, setQuoteData] = useState({});
    const [quoteDataLoading, setQuoteDataLoading] = useState(true);

    useEffect(() => {
        setQuoteDataLoading(true)
        makeAxiosRequest("get", `quote/${props.match.params.id}`, {}).then((resp) => {
            if (resp?.docs?.length > 0) {
                setQuoteData(resp.docs[0]);
            } else {
                setQuoteData({});
            }
            setQuoteDataLoading(false);
        }).catch(e => {
            console.log(e)
            setQuoteDataLoading(false);
        });
    }, [props.match.params.id])
    return (
        <>
            {!quoteDataLoading && Object.keys(quoteData).length && <>
                <div style={{display: "flex", justifyContent: "space-evenly"}}>
                    <Card title="Quote Detail" style={{ width: 500 }}>
                        {Object.keys(quoteData).map(key => {
                            return <div key={key} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid lightgray" }}>
                                <div>
                                    {key.toUpperCase()}
                                </div>
                                <div>
                                    {quoteData[key]}
                                </div>
                            </div>
                        })}
                    </Card>
                </div>
            </>}
        </>
    );
}


export default withRouter(QuoteDetail);