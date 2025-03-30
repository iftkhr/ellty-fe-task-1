import React, { useEffect, useMemo, useState } from 'react';
import './ListContainer.css';

const ListContainer = () => {
	const [pages, setPages] = useState([]);
	const [allSelectedState, setAllSelectedState] = useState(false);

	useMemo(() => {
		let pages = [1, 2, 3, 4];
		setPages(pages);
	}, []);

	useEffect(() => {
		const allPagesCheckbox = document.getElementById('allPages');
		const pageCheckboxes = pages.map((page) => document.getElementById(`page${page}`));

		allPagesCheckbox.addEventListener('change', (e) => {
			setAllSelectedState(e.target.checked);
			pageCheckboxes.forEach((checkbox) => {
				checkbox.checked = e.target.checked;
			});
		});

		pageCheckboxes.forEach((checkbox) => {
			checkbox.addEventListener('change', () => {
				const allChecked = pageCheckboxes.every((checkbox) => checkbox.checked);
				allPagesCheckbox.checked = allChecked;
				setAllSelectedState(allChecked);
			});
		});
	}, [pages]);

	return (
		<div className='mainContainer'>
			<div className='listHeaderContainer'>
				<div className='listHeader'>
					<label htmlFor='allPages'>All pages</label>
					<input
						type='checkbox'
						id='allPages'
						value={allSelectedState}
					/>
				</div>
			</div>
			<div className='listSeparator'></div>
			<div className='listContainer'>
				{pages.map((page) => (
					<div
						className='listItemContainer'
						key={page}>
						<label htmlFor={`page${page}`}>Page {page}</label>
						<input
							type='checkbox'
							id={`page${page}`}
						/>
					</div>
				))}
			</div>
			<div className='listSeparator'></div>
			<div className='buttonContainer'>
				<button className='button'>Done</button>
			</div>
		</div>
	);
};

export default ListContainer;
