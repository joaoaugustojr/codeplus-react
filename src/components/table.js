import React, { useState, useEffect } from 'react';
import { upperCaseValue } from '../services/helpers';
import '../css/table.css';

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

	const getKeys = () => {
		if (props.data.length > 0) {
			setData(props.data);
			setKeys(Object.keys(props.data[0]));
		}
	};

	const filterData = (query) => {
		var result = props.data;

		if (query.length > 0) {
			result = result.filter(function(res) {
				var text = JSON.stringify(res);
				return upperCaseValue(text).includes(upperCaseValue(query));
			});
			setData(result);
		} else {
			if (props.data.length > 0) {
				setData(props.data);
			}
		}
	};

	return (
		<div className="w-100">
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
											<li
												data-toggle="modal"
												data-target={props.editDataTarget}
												onClick={() => props.functionEdit(value.id)}
											>
												<ion-icon class="btnEdit" name="create" />
											</li>
										)}
										{props.delete && (
											<li onClick={() => props.functionDelete(value.id)}>
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
