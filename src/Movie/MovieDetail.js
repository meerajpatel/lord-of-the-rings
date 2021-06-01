import { useEffect, useState } from "react";
import { makeAxiosRequest } from "../Utils/fetcher";
import { Button, Card } from "antd";
import { withRouter } from 'react-router';

const MovieDetail = (props) => {
    const [movieData, setMovieData] = useState({});
    const [movieDataLoading, setMovieDataLoading] = useState(true);

    useEffect(() => {
        setMovieDataLoading(true)
        makeAxiosRequest("get", `movie/${props.match.params.id}`, {}).then((resp) => {
            if (resp?.docs?.length > 0) {
                setMovieData(resp.docs[0]);
            } else {
                setMovieData({});
            }
            setMovieDataLoading(false);
        }).catch(e => {
            console.log(e)
            setMovieDataLoading(false);
        });
    }, [props.match.params.id])
    return (
        <>
            {!movieDataLoading && Object.keys(movieData).length && <>
                <div style={{display: "flex", justifyContent: "space-evenly"}}>
                    <Card title="Movie Detail" style={{ width: 500 }}>
                        {Object.keys(movieData).map(key => {
                            return <div key={key} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid lightgray" }}>
                                <div>
                                    {key.toUpperCase()}
                                </div>
                                <div>
                                    {movieData[key]}
                                </div>
                            </div>
                        })}
                    </Card>
                    <div>
                        <Button type="primary" onClick={() => props.history.push(`/movie/${props.match.params.id}/quote?limit=10&page=1&movie=${props.match.params.id}`)}>Movie Quotes</Button>
                    </div>
                </div>
            </>}
        </>
    );
}


export default withRouter(MovieDetail);