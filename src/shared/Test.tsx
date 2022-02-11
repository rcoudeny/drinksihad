import React from "react";


interface Props {
    text: string
}

function Test(props: Props) {
    return (
        <React.Fragment>{props.text}</React.Fragment>
    )
}

export default Test;