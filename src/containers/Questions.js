import React from 'react';
import { Step, Button, Message } from 'semantic-ui-react';


const stepStyle = {
    marginTop: "20px",
    marginBottom: "20px"
};

class Questions extends React.Component {
    state = {
        current: 0
    };

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }

    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    messageExampleMessage = (msg) => (
        <Message>
            <Message.Header>Changes in Service</Message.Header>
            <p>
                {msg}
            </p>
        </Message>
    )

    render() {
        const { current } = this.state;
        const { questions } = this.props;

        console.log(questions, current)
        return (
            <div>
                <Step.Group style={stepStyle}>
                    {questions.map((q, index) => (
                        <Step
                            key={index}
                            active={'active' ? current === index : ""}
                        >
                            <Step.Content>
                                <Step.Title>Question {q.key}</Step.Title>
                            </Step.Content>
                        </Step>
                    ))}
                </Step.Group>
                <div>{questions[current]}</div>
                <div>
                    {current < questions.length - 1 && (
                        <Button type="primary" onClick={() => this.next()}>
                            Next
                        </Button>
                    )}
                    {current === questions.length - 1 && (
                        <Button
                            type="primary"
                            onClick={() => this.messageExampleMessage("Processing complete!")}
                        >
                            Done
                        </Button>
                    )}
                    {current > 0 && (
                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                            Previous
                        </Button>
                    )}
                </div>
            </div >
        );
    }
}

export default Questions;

// const Questions = () => <Step.Group questions={steps} />

// export default Questions