'use strict'

import React, { Component } from 'react';

class CheckList extends Component {
	render() {
		let tasks = this.props.tasks.map((task) => (
			<li className="c-checklist__task">
				<input type="checkbox" defaultChecked={task.done} />
				{task.name}
				<a href="" className="c-checklist__task--remove"></a>
			</li>
		));

		return (
			<div className="c-checklist">
				<ul>{tasks}</ul>
			</div>
		)
	}
}

export default CheckList;
