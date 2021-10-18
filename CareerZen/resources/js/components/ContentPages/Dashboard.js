import React, { useState, useEffect } from "react";
import UseAuth from "../Store/UseAuth";
import {
    Container,
    Card,
    CardImg,
    CardText,
    CardBody,
    CardTitle,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    FormText
} from "reactstrap";

const Dashboard = props => {
    const { state, actions } = UseAuth();

    const [aboutme, setAboutme] = useState("");

    const [currentUser, setCurrentUser] = useState({
        id: "",
        name: "",
        email: ""
    });

    const HandleAboutClick = e => {
        e.preventDefault();
        // setAboutme(e.target.value);
    };

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setCurrentUser({
            id: user.id,
            name: user.name,
            email: user.email
        });
    }, []);

    return (
        <Container className="themed-container" fluid="md">
            {/* <div style={{ textAlign: "center" }}>
                <h1 style={{ padding: 5 }}>Dashboard</h1>
                <h4>User Details</h4>
                <h5> User Name : {currentUser.name}</h5>
                <h5> User Email : {currentUser.email}</h5>
            </div> */}
            <div style={{ paddingTop: "3rem" }}>
                <Card>
                    <CardBody className="text-center">
                        <CardTitle
                            tag="h5"
                            style={{ fontSize: "2rem", fontFamily: "cursive" }}
                        >
                            User Details :
                        </CardTitle>
                        <h5 style={{ fontSize: "2rem", fontFamily: "cursive" }}>
                            User Name : {currentUser.name}
                        </h5>
                        <h5 style={{ fontSize: "2rem", fontFamily: "cursive" }}>
                            User Email : {currentUser.email}
                        </h5>
                        <CardText
                            className="text-center"
                            style={{ fontSize: "2rem", fontFamily: "cursive" }}
                        >
                            About me :
                        </CardText>
                        <CardText
                            style={{
                                fontSize: "1.3rem",
                                fontFamily: "cursive",
                                color: "black"
                            }}
                        >
                            {aboutme}
                        </CardText>
                    </CardBody>
                    <Form style={{ padding: "1rem" }}>
                        <FormGroup>
                            <Label
                                for="exampleText"
                                style={{
                                    fontSize: "1.3rem",
                                    fontFamily: "cursive"
                                }}
                            >
                                About me !!!
                            </Label>
                            <Input
                                type="textarea"
                                name="text"
                                id="exampleText"
                                onChange={e => {
                                    setAboutme(e.target.value);
                                }}
                            />
                            <div style={{ margin: "0", paddingTop: "1rem" }}>
                                <Button
                                    color="primary"
                                    onClick={e => HandleAboutClick(e)}
                                >
                                    Submit
                                </Button>
                            </div>
                        </FormGroup>
                    </Form>
                    <Form style={{ padding: "1rem" }}>
                        <FormGroup>
                            <Label for="exampleFile">File</Label>
                            <Input type="file" name="file" id="exampleFile" />
                            <FormText color="muted">
                                Please, Select a profile image.
                            </FormText>
                            <div style={{ margin: "0", paddingTop: "1rem" }}>
                                <Button color="primary">Upload file</Button>
                            </div>
                        </FormGroup>
                    </Form>
                </Card>
            </div>
        </Container>
    );
};
export default Dashboard;
