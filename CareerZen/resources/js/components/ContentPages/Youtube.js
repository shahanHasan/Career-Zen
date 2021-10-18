import React, { useState } from "react";
import {
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Card,
    Button,
    CardTitle,
    CardText,
    Row,
    Col,
    Container
} from "reactstrap";
import classnames from "classnames";

const Youtube = props => {
    const [activeTab, setActiveTab] = useState("1");

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    };

    return (
        <React.Fragment>
            <div style={{ padding: "3rem", fontFamily: "Roboto" }}>
                <h1>Youtube Viewer</h1>
            </div>
            <Container className="themed-container" fluid="md">
                <div>
                    <Nav tabs>
                        <NavItem>
                            <NavLink
                                className={classnames({
                                    active: activeTab === "1"
                                })}
                                onClick={() => {
                                    toggle("1");
                                }}
                            >
                                Search
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({
                                    active: activeTab === "2"
                                })}
                                onClick={() => {
                                    toggle("2");
                                }}
                            >
                                Favourite Links
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                            <Row>
                                <Col sm="12">
                                    <h4> Will be Added Soon, On progress!!</h4>
                                </Col>
                            </Row>
                        </TabPane>
                        <TabPane tabId="2">
                            <h4 style={{ fontFamily: "fantasy" }}>
                                Will be Added Soon, On progress!!
                            </h4>
                        </TabPane>
                    </TabContent>
                </div>
            </Container>
        </React.Fragment>
    );
};

export default Youtube;
