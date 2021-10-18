import React from "react";
import { Jumbotron, Button } from "reactstrap";

const RecordView = props => {
    return (
        <div>
            <Jumbotron>
                <h3 className="display-3">{props.queryResultPageTitle}</h3>
                <p
                    className="description"
                    style={{
                        margin: "0",
                        padding: "0"
                    }}
                    dangerouslySetInnerHTML={{
                        __html: props.queryResultPageSnippet
                    }}
                ></p>
                <hr className="my-2" />
                <div style={{ display: "flex" }}>
                    <div style={{ paddingRight: "1rem" }}>
                        <Button
                            color="primary"
                            target="_blank"
                            href={props.queryResultPageFullURL}
                        >
                            Learn More
                        </Button>
                    </div>
                    <div>
                        <Button
                            color="primary"
                            href={props.queryResultPageFullURL}
                        >
                            Add to Favourites
                        </Button>
                    </div>
                </div>
            </Jumbotron>
        </div>
    );
};
export default RecordView;
