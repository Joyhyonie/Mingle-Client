import SearchBarCss from '../../css/common/SearchBar.module.css'

const SelectBox = (props) => {
	const handleChange = (e) => {
		// event handler
		console.log(e.target.value);
	};

	return (
    <>
		<select className={ SearchBarCss.selectBox } onChange={handleChange}>
			{props.options.map((option) => (
				<option
					key={option.value}
					value={option.value}
					defaultValue={props.defaultValue === option.value}
				>
					{option.name}
				</option>
			))}
		</select>
    </>
	);
};


export default SelectBox;