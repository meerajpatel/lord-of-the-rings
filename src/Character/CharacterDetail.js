import { useEffect, useState } from "react";
import { makeAxiosRequest } from "../Utils/fetcher";
import { Button, Card } from "antd";
import { withRouter } from 'react-router';

const CharacterDetail = (props) => {
    const [characterData, setCharacterData] = useState({});
    const [characterDataLoading, setCharacterDataLoading] = useState(true);

    useEffect(() => {
        setCharacterDataLoading(true)
        makeAxiosRequest("get", `character/${props.match.params.id}`, {}).then((resp) => {
            if (resp?.docs?.length > 0) {
                setCharacterData(resp.docs[0]);
            } else {
                setCharacterData({});
            }
            setCharacterDataLoading(false);
        }).catch(e => {
            console.log(e)
            setCharacterDataLoading(false);
        });
    }, [props.match.params.id])
    return (
        <>
            {!characterDataLoading && Object.keys(characterData).length && <>
                <div style={{display: "flex", justifyContent: "space-evenly"}}>
                    <Card title="Character Detail" style={{ width: 500 }}>
                        {Object.keys(characterData).map(key => {
                            return <div key={key} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid lightgray" }}>
                                <div>
                                    {key.toUpperCase()}
                                </div>
                                <div>
                                    {characterData[key]}
                                </div>
                            </div>
                        })}
                    </Card>
                    <div>
                        <Button type="primary" onClick={() => props.history.push(`/character/${props.match.params.id}/quote?limit=10&page=1&character=${props.match.params.id}`)}>Character Quotes</Button>
                    </div>
                </div>
            </>}
        </>
    );
}


export default withRouter(CharacterDetail);