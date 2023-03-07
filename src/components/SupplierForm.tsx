import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";

// interface FormData {
// 	name: string;
// 	logo: string;
// 	address: string;
// }

const validationSchema = Yup.object({
	name: Yup.string().required("Name is required"),
	logo: Yup.mixed().required("Retry file upload"),
	address: Yup.string().required("Address is required"),
});

export function SupplierForm() {
	const [uploadFile, setUploadFile] = useState("");
	var f = "";
	var src = "";
	const [imageSrc, setImageSrc] = useState("");

	const handleUpload = async (e) => {
		formik.setFieldValue("logo", imageSrc);
		console.log(e.target.files[0]);
		console.log(uploadFile);
		console.log(formik.values.logo);
		const formData = new FormData();
		formData.append("file", e.target.files[0]);
		formData.append("upload_preset", "supplier");

		await axios
			.post("https://api.cloudinary.com/v1_1/dn1jogb0o/image/upload", formData)
			.then((response) => {
				console.log(response);
				setImageSrc(response.data.secure_url);
				src = response.data.secure_url;
				console.log(imageSrc);
				formik.setFieldValue("logo", src);
				console.log(formik.values);
			})
			.catch((error) => {
				console.log(error);
			});
	};

	var base_url = process.env.REACT_APP_BASE_URL;
	// if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
	// 	base_url = "http://localhost:8000/";
	// }

	const handleSubmit = (values: FormData) => {
		console.log(values, formik.values);
		formik.setFieldValue("logo", src);
		console.log(formik.values);
		console.log(values);

		axios
			.post("https://supplier-info.herokuapp.com/supplier", values)
			.then((res) => {
				console.log(res);
				console.log(values);
				location.reload();
			})
			.catch((err) => {
				console.log(err);
				console.log(values);
			});
	};

	const formik = useFormik({
		initialValues: { name: "", logo: "", address: "" },
		validationSchema,
		onSubmit: handleSubmit,
	});

	return (
		<Form onSubmit={formik.handleSubmit} encType='multipart/form-data'>
			<Form.Group className=''>
				<Form.Label className=''>Name:</Form.Label>
				<Form.Control
					type='text'
					name='name'
					value={formik.values.name}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
					className=''
				/>
				{formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
			</Form.Group>

			<Form.Group>
				<Form.Label className='pt-2'>Logo:</Form.Label>
				<Form.Control
					type='file'
					name='logo'
					accept='image/*'
					onChange={(event) => {
						setUploadFile(event.target.files[0]);
						f = event.target.files[0];
						handleUpload(event);
					}}
					onBlur={formik.handleBlur}
				/>
				{formik.touched.logo && formik.errors.logo ? <div>{formik.errors.logo}</div> : null}
			</Form.Group>
			<Form.Group>
				<Form.Label className='pt-2'>Address:</Form.Label>
				<Form.Control
					type='address'
					name='address'
					value={formik.values.address}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>
				{formik.touched.address && formik.errors.address ? (
					<div>{formik.errors.address}</div>
				) : null}
			</Form.Group>
			<Button className='mt-3' type='submit'>
				Submit
			</Button>
		</Form>
	);
}
