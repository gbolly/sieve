import React from "react";
import { Form, Checkbox } from "semantic-ui-react";

const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px"
};

class Choices extends React.Component {
    render() {
        const { questionId, usersAnswers, choices, change } = this.props;
        return (
            <Form>
                {choices.map((c, index) => {
                    return (
                        <Form.Field>
                            <Checkbox
                                radio
                                style={radioStyle}
                                label={c}
                                key={index}
                                onChange={(e, qId) => { change(e, qId, questionId) }}
                                value={c}
                                checked={usersAnswers[questionId] === c}
                            />
                        </Form.Field>
                    );
                })}
            </Form>
        );
    }
}

export default Choices;