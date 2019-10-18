import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
    List,
    Placeholder,
    Segment,

} from "semantic-ui-react";
import * as actions from "../store/actions/assignments";
import Hoc from "../hoc/hoc";

class AssignmentList extends React.PureComponent {
    componentDidMount() {
        if (this.props.token !== undefined && this.props.token !== null) {
            this.props.getASNTS(this.props.token);
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.token !== this.props.token) {
            if (newProps.token !== undefined && newProps.token !== null) {
                this.props.getASNTS(newProps.token);
            }
        }
    }

    renderItem(item) {
        return (
            <Link to="/assignments/1">
                <List.Item>{item.title}</List.Item>
            </Link>
        );
    }

    render() {
        return (
            <Hoc>
                {this.props.loading ? (
                    <Placeholder active />
                ) : (
                        <div>
                            <h3 style={{ margin: "16px 0" }}>Assignment List</h3>
                            <Segment>
                                {this.props.assignments.map(item => {
                                    return (
                                        <List divided verticalAlign='middle'>
                                            <Link to={`/assignments/${item.id}`}>
                                                <List.Item>
                                                    <List.Content>
                                                        <List.Header>{item.title}</List.Header>
                                                    </List.Content>
                                                </List.Item>
                                            </Link>
                                            Added by: {item.teacher}
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