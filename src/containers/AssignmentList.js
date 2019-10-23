import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
    List,
    Placeholder,
    Segment,
    Divider
} from "semantic-ui-react";
import * as actions from "../store/actions/assignments";
import Hoc from "../hoc/hoc";

class AssignmentList extends React.PureComponent {
    componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
            this.props.getASNTS(this.props.token);
        }
    }

    UNSAFE_componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
                this.props.getASNTS(newProps.token);
            }
        }
    }

    render() {
        return (
            <Hoc>
                {this.props.loading ? (
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
                        <div>
                            <h3 style={{ margin: "16px 0" }}>Assignment List</h3>
                            <Segment>
                                {this.props.assignments.map(item => {
                                    return (
                                        <List key={item.id} divided relaxed>
                                            <Link to={`/assignments/${item.id}`}>
                                                <List.Item>
                                                    <List.Content>
                                                        <List.Header>{item.title}</List.Header>
                                                    </List.Content>
                                                </List.Item>
                                            </Link>
                                            Added by: {item.teacher}
                                            <Divider inverted />
                                        </List>
                                    )
                                })}
                            </Segment>
                        </div>
                    )}
            </Hoc>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        assignments: state.assignments.assignments,
        loading: state.assignments.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getASNTS: token => dispatch(actions.getASNTS(token))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AssignmentList);