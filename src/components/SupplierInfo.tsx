import React from "react";
import useAxios from "axios-hooks";

const imageStyle = {
	width: "10em",
	height: "10em",
	objectFit: "fill",
};

export function SupplierInfo() {
	// var base_url = process.env.REACT_APP_BASE_URL;
	// // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
	// //     base_url = "http://localhost:8000/";
	// // }

	const [{ data, loading, error }, refetch] = useAxios(
		"https://supplier-info.herokuapp.com/suppliers"
	);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error!</p>;

	return (
		<div>
			{data.map((item) => (
				<div className='container d-flex justify-content-center pb-3'>
					<img
						className='img-fluid'
						src={item.logo}
						alt=''
						style={{
							width: "10em",
							height: "10em",
							objectFit: "fill",
						}}
					/>
					<div className='p-5'>
						<h4 className='ml-5 pl-5'>Name: {item.name}</h4>
						<h5>Address: {item.address}</h5>
					</div>
				</div>
			))}
		</div>
	);
}
