import React from "react";
import { connect } from "react-redux";
import { Card, Placeholder } from "semantic-ui-react";
import Questions from "./Questions";
import Choices from "../components/Choices";
import { getASNTSDetail } from "../store/actions/assignments";
import Hoc from "../hoc/hoc";

const cardStyle = {
    marginTop: "20px",
    marginBottom: "20px"
};

class AssignmentDetail extends React.Component {
    state = {
        usersAnswers: {}
    };

    componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
            this.props.getASNTSDetail(this.props.token, this.props.match.params.id);
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
                this.props.getASNTSDetail(newProps.token, this.props.match.params.id);
            }
        }
    }

    onChange = (e, qId, questionId) => {
        const { usersAnswers } = this.state;
        usersAnswers[questionId] = qId.value;
        this.setState({ usersAnswers });
    };

    render() {
        const { currentAssignment, loading } = this.props;
        const { title } = currentAssignment;
        const { usersAnswers } = this.state;
        return (
            <Hoc>
                {Object.keys(currentAssignment).length > 0 ? (
                    <Hoc>
                        {loading ? (
                            <Placeholder>
                                <Placeholder.Header image>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Header>
                                <Placeholder.Paragraph>
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                    <Placeholder.Line />
                                </Placeholder.Paragraph>
                            </Placeholder>
                        ) : (
                                <Card style={cardStyle} fluid>
                                    <Card.Content>
                                        <Card.Header>{title}</Card.Header>
                                        <Questions
                                            questions={currentAssignment.questions.map(q => {
                                                return (
                                                    <Card style={cardStyle} fluid key={q.id}>
                                                        <Card.Content>
                                                            <Card.Header>{q.question}</Card.Header>
                                                            <Choices
                                                                questionId={q.order}
                                                                choices={q.choices}
                                                                change={this.onChange}
                                                                usersAnswers={usersAnswers}
                                                            />
                                                        </Card.Content>
                                                    </Card>
                                                );
                                            })}
                                        />
                                    </Card.Content>
                                </Card>
                            )}
                    </Hoc>
                ) : null
                }
            </Hoc>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        currentAssignment: state.assignments.currentAssignment,
        loading: state.assignments.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getASNTSDetail: (token, id) => dispatch(getASNTSDetail(token, id))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssignmentDetail);