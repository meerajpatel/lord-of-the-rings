import { React } from 'react';

const Home = () => {
    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", fontSize: "40px", fontWeight: 600 }}>
                HELLO LOTR FANS
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "10px",
                fontSize: "20px"
            }}>
                Click here: &nbsp;<a href="https://github.com/meerajpatel2011/lord-of-the-rings" rel="noreferrer" target="_blank">Code Base</a> &nbsp;and&nbsp; <a href="https://github.com/meerajpatel2011/lord-of-the-rings/blob/master/README.md" rel="noreferrer" target="_blank">Read Me / Assumptions</a>
        </div>
        </>
    );
}

export default Home;