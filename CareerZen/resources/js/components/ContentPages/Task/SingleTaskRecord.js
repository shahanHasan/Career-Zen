import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input,
    Card,
    CardTitle,
    CardText,
    CardDeck,
    CardColumns
} from "reactstrap";
import React, { useState } from "react";
import UseAuth from "../../Store/UseAuth";

const SingleTaskRecord = props => {
    const { state } = UseAuth();
    const [editTaskData, setEditTaskData] = useState({
        title: "",
        description: "",
        status: "",
        date: "",
        time: ""
    });

    const editTask = async (e, id) => {
        e.preventDefault();
        console.log(state.token);
        const config = {
            headers: {
                Authorization: "Bearer " + state.token
            }
        };

        try {
            const response = await axios.put(
                "todo/" + id,
                editTaskData,
                // {
                //     params: {
                //         id: editTaskData.id,
                //         description: editTaskData.description,
                //         status: editTaskData.status,
                //         date: editTaskData.date,
                //         time: editTaskData.time
                //     }
                // },
                config
            );

            console.log(response);
        } catch (e) {
            console.log(e);
            console.log("catch");
        }
        location.reload(true);
        Edittoggle();
    };

    const deleteTask = async (e, id) => {
        const config = {
            headers: {
                Authorization: "Bearer " + state.token
            }
        };
        e.preventDefault();
        try {
            const response = await axios.delete(
                "todo/" + id,
                // { _method: "delete", params: { id: id } },
                config
            );
            console.log(response);
        } catch (e) {
            console.log(e);
        }
        location.reload(true);
    };

    // Create Task Modal Methods
    const { className, id, title, description, status, date, time } = props;

    // UI Functions Edit Task
    const [editModal, setEditModal] = useState(false);
    const Edittoggle = () => setEditModal(!editModal);
    const externalCloseBtnEdit = (
        <button
            className="close"
            style={{
                position: "absolute",
                top: "15px",
                right: "15px"
            }}
            onClick={Edittoggle}
        >
            &times;
        </button>
    );

    return (
        <Card
            body
            inverse
            // color="primary"
            style={{
                backgroundColor: "#96e1ff",
                borderColor: "#333"
                // color: "black"
            }}
            className="text-center"
        >
            <CardTitle
                tag="h2"
                style={{ color: "black", fontFamily: "cursive" }}
            >
                Title : {title}
            </CardTitle>
            <CardText
                tag="h4"
                style={{ color: "black", fontFamily: "cursive" }}
            >
                Description : {description}
            </CardText>
            <CardText
                tag="h4"
                style={{ color: "black", fontFamily: "cursive" }}
            >
                Status : {status}
            </CardText>
            <CardText
                tag="h4"
                style={{ color: "black", fontFamily: "cursive" }}
            >
                Deadline : {date}
            </CardText>
            <CardText
                tag="h4"
                style={{ color: "black", fontFamily: "cursive" }}
            >
                Deadline : {time}
            </CardText>
            <div
                style={{
                    padding: "1rem"
                }}
            >
                <Button
                    style={{
                        backgroundColor: "black"
                    }}
                    onClick={Edittoggle}
                >
                    Edit
                </Button>

                {/* Edit Button ---------------------------- */}
                <div>
                    <Modal
                        isOpen={editModal}
                        toggle={Edittoggle}
                        className={className}
                        external={externalCloseBtnEdit}
                    >
                        <ModalHeader>
                            <FormGroup>
                                <Label for="Title">Title</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    id="title"
                                    defaultValue={title}
                                    onChange={e => {
                                        setEditTaskData({
                                            ...editTaskData,
                                            [e.target.name]: e.target.value
                                        });
                                    }}
                                />
                            </FormGroup>
                        </ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="Description"> Description</Label>
                                <Input
                                    type="textarea"
                                    name="description"
                                    id="description"
                                    defaultValue={description}
                                    onChange={e => {
                                        setEditTaskData({
                                            ...editTaskData,
                                            [e.target.name]: e.target.value
                                        });
                                    }}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="exampleDate">Date</Label>
                                <Input
                                    type="date"
                                    name="date"
                                    id="exampleDate"
                                    // placeholder="date placeholder"
                                    defaultValue={date}
                                    onChange={e => {
                                        // console.log(typeof e.target.value);
                                        // console.log(e.target.value);
                                        setEditTaskData({
                                            ...editTaskData,
                                            [e.target.name]: e.target.value
                                        });
                                    }}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleTime">Time</Label>
                                <Input
                                    type="time"
                                    name="time"
                                    id="exampleTime"
                                    // placeholder="time placeholder"
                                    defaultValue={time}
                                    onChange={e => {
                                        setEditTaskData({
                                            ...editTaskData,
                                            [e.target.name]: e.target.value
                                        });
                                    }}
                                />
                            </FormGroup>

                            <FormGroup>
                                <Label for="status">Status</Label>
                                <Input
                                    type="text"
                                    name="status"
                                    id="status"
                                    // placeholder="Status"
                                    defaultValue={status}
                                    onChange={e => {
                                        setEditTaskData({
                                            ...editTaskData,
                                            [e.target.name]: e.target.value
                                        });
                                    }}
                                />
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="primary"
                                // onClick={Edittoggle}
                                onClick={e => editTask(e, id)}
                            >
                                Edit Task
                            </Button>{" "}
                            <Button color="secondary" onClick={Edittoggle}>
                                Cancel
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
                {/* -------------------------------------------- */}
            </div>
            <div
                style={{
                    padding: "1rem"
                }}
            >
                <Button
                    style={{
                        backgroundColor: "black"
                    }}
                    onClick={e => deleteTask(e, id)}
                >
                    Delete
                </Button>
            </div>
            {/* <CustomInput
                                type="switch"
                                id="exampleCustomSwitch"
                                name="customSwitch"
                                label="Turn on when status : Complete"
                                checked={checked}
                                onChange={handleChecked(e)}
                            /> */}
        </Card>
    );
};

export default SingleTaskRecord;
