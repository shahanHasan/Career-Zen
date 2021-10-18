import React, { useEffect, useState } from "react";
import axios from "axios";
import {
    Container,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input,
    Row,
    Col,
    Jumbotron,
    Spinner
} from "reactstrap";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

// Single task UI
import SingleTaskRecord from "./Task/SingleTaskRecord";

import UseAuth from "../Store/UseAuth";

// Styles Material UI
const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        height: 140,
        width: 100
    },
    control: {
        padding: theme.spacing(2)
    }
}));

const TaskManager = props => {
    // Create Task Modal Methods
    const { className } = props;

    // Material UI Functions
    const [spacing, setSpacing] = React.useState(2);
    const classes = useStyles();

    const handleChange = event => {
        setSpacing(Number(event.target.value));
    };

    // Future Implementation
    // const { checked, setChecked } = useState(false);
    // const handleChecked = e => {
    //     e.preventDefault();
    //     setChecked(e.target.checked);
    // };

    // UI Functions Add Task
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
    const externalCloseBtn = (
        <button
            className="close"
            style={{
                position: "absolute",
                top: "15px",
                right: "15px"
            }}
            onClick={toggle}
        >
            &times;
        </button>
    );

    // Global state manager
    const { state } = UseAuth();
    const [token, settoken] = useState("");

    const [task, setTask] = useState({
        title: "",
        description: "",
        status: "",
        date: "",
        time: ""
    });

    const [showTask, setShowtask] = useState("");

    // To keep track of async
    const [isCompleted, setCompleted] = useState(false);
    const [loading, setLoading] = useState(true);
    const refresh = () => {
        setLoading(false);
    };

    // Component life cycle , get tasks
    useEffect(() => {
        async function GetTasks() {
            settoken(state.token);
            const config = {
                headers: {
                    Authorization: "Bearer " + state.token
                }
            };

            try {
                const response = await axios.get("todo", config);

                if (response.data.status === 200) {
                    setShowtask(JSON.stringify(response.data.tasks));
                    setLoading(false);
                    console.log(response.data.status);

                    // console.log(showTask);
                    // console.log(typeof showTask);
                    // console.log(typeof JSON.parse(showTask));
                    // console.log(JSON.parse(showTask));
                    // console.log(typeof response.data.tasks);
                }
            } catch (e) {
                console.log(e);
                setLoading(true);
            }
        }

        GetTasks();
        // console.log(showTask);
    }, [loading]);

    const AddTask = async e => {
        e.preventDefault();

        try {
            const response = await axios.post(
                //"http://app.mycareerzen.tech/api/todo",
                "todo",
                task,
                {
                    headers: {
                        Authorization: "Bearer " + token
                    }
                }
            );
            // task
            setCompleted(true);
            console.log(response);
            console.log(token);
            // setModal(!modal);
            if (response.data.status === 200) {
                console.log(posted);
            }
        } catch (e) {
            console.log(e);
            setCompleted(false);
        }
        location.reload(true);
        toggle();
    };

    return (
        <React.Fragment>
            <Container className="themed-container" fluid="md">
                <div
                    style={{
                        position: "relative",
                        textAlign: "center"
                    }}
                >
                    <h1
                        style={{
                            fontFamily: "cursive",
                            paddingTop: "1rem"
                        }}
                    >
                        Task / Todo List Manager
                    </h1>
                    <div className="Add-Task-Modal">
                        <Button
                            color="primary"
                            onClick={toggle}
                            size="lg"
                            style={{
                                size: "2rem"
                            }}
                        >
                            Add Task
                        </Button>
                        <Modal
                            isOpen={modal}
                            toggle={toggle}
                            className={className}
                            external={externalCloseBtn}
                        >
                            <ModalHeader>
                                <FormGroup>
                                    <Label for="Title">Title</Label>
                                    <Input
                                        required
                                        type="text"
                                        name="title"
                                        id="title"
                                        placeholder="title"
                                        onChange={e => {
                                            setTask({
                                                ...task,
                                                [e.target.name]: e.target.value
                                            });
                                        }}
                                    />
                                </FormGroup>
                            </ModalHeader>
                            <ModalBody>
                                <FormGroup>
                                    <Label for="Description">
                                        {" "}
                                        Description
                                    </Label>
                                    <Input
                                        required
                                        type="textarea"
                                        name="description"
                                        id="description"
                                        onChange={e => {
                                            setTask({
                                                ...task,
                                                [e.target.name]: e.target.value
                                            });
                                        }}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="exampleDate">Date</Label>
                                    <Input
                                        required
                                        type="date"
                                        name="date"
                                        id="exampleDate"
                                        placeholder="date placeholder"
                                        onChange={e => {
                                            console.log(typeof e.target.value);
                                            console.log(e.target.value);
                                            setTask({
                                                ...task,
                                                [e.target.name]: e.target.value
                                            });
                                        }}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="exampleTime">Time</Label>
                                    <Input
                                        required
                                        type="time"
                                        name="time"
                                        id="exampleTime"
                                        placeholder="time placeholder"
                                        onChange={e => {
                                            setTask({
                                                ...task,
                                                [e.target.name]: e.target.value
                                            });
                                        }}
                                    />
                                </FormGroup>

                                <FormGroup>
                                    <Label for="Status">Status</Label>
                                    <Input
                                        required
                                        type="text"
                                        name="Status"
                                        id="Status"
                                        placeholder="Status"
                                        onChange={e => {
                                            setTask({
                                                ...task,
                                                status: e.target.value
                                            });
                                        }}
                                    />
                                </FormGroup>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="primary" onClick={AddTask}>
                                    Add Task
                                </Button>
                                <Button color="secondary" onClick={toggle}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </Modal>
                    </div>
                </div>
            </Container>
            <div
                style={{
                    alignItems: "center",
                    padding: "2rem"
                }}
            >
                <Row>
                    <Col sm="12" md={{ size: 6, offset: 3 }}>
                        <Jumbotron style={{ textAlign: "center" }}>
                            <h4>List of Tasks</h4>
                            <hr className="my-2" />
                        </Jumbotron>
                    </Col>
                </Row>
            </div>
            <Container className="themed-container" fluid="md">
                <Grid container className={classes.root} spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify="center" spacing={2}>
                            {showTask ? (
                                JSON.parse(showTask).map(
                                    (taskrecord, index) => {
                                        return (
                                            <Grid key={index} item>
                                                <SingleTaskRecord
                                                    {...taskrecord}
                                                />
                                            </Grid>
                                        );
                                    }
                                )
                            ) : (
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        paddingTop: "1rem"
                                        // height: "100vh"
                                    }}
                                >
                                    <Spinner
                                        style={{
                                            width: "5rem",
                                            height: "5rem"
                                        }}
                                        type="grow"
                                    />
                                </div>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </React.Fragment>
    );
};

export default TaskManager;
