import { useEffect, useState } from "react";
import { makeAxiosRequest } from "../Utils/fetcher";
import { Card } from "antd";
import { withRouter } from 'react-router';

const ChapterDetail = (props) => {
    const [chapterData, setChapterData] = useState({});
    const [chapterDataLoading, setChapterDataLoading] = useState(true);

    useEffect(() => {
        setChapterDataLoading(true)
        makeAxiosRequest("get", `chapter/${props.match.params.id}`, {}).then((resp) => {
            if (resp?.docs?.length > 0) {
                setChapterData(resp.docs[0]);
            } else {
                setChapterData({});
            }
            setChapterDataLoading(false);
        }).catch(e => {
            console.log(e)
            setChapterDataLoading(false);
        });
    }, [props.match.params.id])
    return (
        <>
            {!chapterDataLoading && Object.keys(chapterData).length && <>
                <div style={{display: "flex", justifyContent: "space-evenly"}}>
                    <Card title="Character Detail" style={{ width: 500 }}>
                        {Object.keys(chapterData).map(key => {
                            return <div key={key} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid lightgray" }}>
                                <div>
                                    {key.toUpperCase()}
                                </div>
                                <div>
                                    {chapterData[key]}
                                </div>
                            </div>
                        })}
                    </Card>
                </div>
            </>}
        </>
    );
}


export default withRouter(ChapterDetail);