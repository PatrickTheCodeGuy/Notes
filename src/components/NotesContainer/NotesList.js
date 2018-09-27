import React, { Component } from "react";
import Note from "./Note";
import { getNotes } from "../actions/actions";
import { connect } from "react-redux";

const update = require("immutability-helper");

class MainNotes extends Component {
	state = {
		notes: this.props.notes
	};

	componentWillMount() {
		this.props.getNotes(this.props.notes);
	}
	deleteItem = id => {
		this.setState(prevState => {
			return {
				notes: prevState.notes.filter(note => note.id !== id)
			};
		});
	};

	moveCard = (dragIndex, hoverIndex) => {
		const { notes } = this.state;
		console.log(this.state);

		const dragCard = notes[dragIndex];

		this.setState(
			update(this.state, {
				notes: {
					$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
				}
			})
		);
	};
	render() {
		return (
			<div className="note-container">
				{this.state.notes.map((note, index) => (
					<Note
						key={note.id}
						note={note}
						id={note.id}
						index={index}
						date={note.date}
						title={note.title}
						body={note.body}
						moveCard={this.moveCard}
					/>
				))}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	notes: state.notes
});

export default connect(
	mapStateToProps,
	{ getNotes }
)(MainNotes);
