import React, { useState, useEffect } from 'react';
import { getKeys } from 'eslint-visitor-keys';

const Table = (props) => {
	const [ keys, setKeys ] = useState([]);
	const [ data, setData ] = useState([]);

	useEffect(
		() => {
			getKeys();
		},
		[ props.data ]
	);

	useEffect(
		() => {
			filterData(props.search);
		},
		[ props.search ]
	);

	function getKeys() {
		if (props.data.length > 0) {
			setData(props.data);
			setKeys(Object.keys(props.data[0]));
		}
	}

	function filterData(query) {
		var result = props.data;

		if (query.length > 0) {
			result = result.filter(function(res) {
				var text = JSON.stringify(res);
				return text.toUpperCase().includes(query.toUpperCase());
			});
			setData(result);
		} else {
			if (props.data.length > 0) {
				setData(props.data);
			}
		}
	}

	return (
		<div>
			<table className="table table-striped table-borderless table-hover table-sm">
				<thead>
					<tr>
						{keys.map((key) => (
							<th className={props.hidden[key]} key={key} scope="col">
								{props.head[key] || key}
							</th>
						))}
						{data.length > 1 && props.action && <th scope="col">Ação</th>}
					</tr>
				</thead>
				<tbody>
					{data.map((value) => (
						<tr key={value.id}>
							{Object.keys(value).map((item) => (
								<td className={props.hidden[item]} key={item}>
									{value[item]}
								</td>
							))}
							{props.action && (
								<td>
									<ul className="btnActions">
										{props.view && (
											<li>
												<ion-icon class="btnView" name="eye" />
											</li>
										)}
										{props.edit && (
											<li>
												<ion-icon class="btnEdit" name="create" />
											</li>
										)}
										{props.delete && (
											<li>
												<ion-icon class="btnRemove" name="trash" />
											</li>
										)}
									</ul>
								</td>
							)}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
