import { epochToDateTimeLocal } from '@utilities/date';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import React from 'react';
import * as Yup from 'yup';

//dialog box form for creating or updating a task
const CreateUpdateTask = ({ visible, onClose, onSubmit, currentTask }) => {
	//consider current task for update mode
	const initialValues = !!currentTask
		? {
				...currentTask,
				dueDate: epochToDateTimeLocal(currentTask.dueDate) // converting epoch timestamp to date-time local for input field
		  }
		: {
				title: '',
				description: '',
				dueDate: ''
		  };

	const validationSchema = Yup.object({
		title: Yup.string().required('Task Title is required'),
		description: Yup.string().required('Description is required'),
		dueDate: Yup.date().required('Due Date is required')
	});

	const handleSubmit = (values, { setSubmitting }) => {
		const taskData = {
			...values,
			dueDate: new Date(values.dueDate).getTime()
		};
		onSubmit(taskData);
		setSubmitting(false);
		onClose();
	};
	return (
		<Dialog
			header="Add New Task"
			visible={visible}
			style={{ width: '50vw' }}
			onHide={onClose}
			breakpoints={{ '960px': '75vw', '641px': '95vw' }}
		>
			<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
				{({ isSubmitting }: any) => (
					<Form className="p-fluid space-y-4">
						<div className="field">
							<label htmlFor="title">Task Title</label>
							<Field id="title" name="title" className="p-inputtext p-component w-full" />
							<ErrorMessage name="title" component="div" className="p-error" />
						</div>

						<div className="field">
							<label htmlFor="description">Description</label>
							<Field
								as="textarea"
								id="description"
								name="description"
								className="p-inputtext p-component w-full"
							/>
							<ErrorMessage name="description" component="div" className="p-error" />
						</div>

						<div className="field">
							<label htmlFor="dueDate">Due Date</label>
							<Field
								max="2099-12-31T00:00"
								min={epochToDateTimeLocal(Date.now())}
								type="datetime-local"
								id="dueDate"
								name="dueDate"
								className="p-inputtext p-component w-full"
							/>
							<ErrorMessage name="dueDate" component="div" className="p-error" />
						</div>

						<div className="flex justify-end">
							<Button label="Submit" type="submit" className="p-button-primary" loading={isSubmitting} />
						</div>
					</Form>
				)}
			</Formik>
		</Dialog>
	);
};

export default CreateUpdateTask;
