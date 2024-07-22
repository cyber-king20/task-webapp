import { Card } from 'primereact/card';
import React from 'react';

const TaskOverviewCard = ({ label, value, stripeClassNames }: any) => {
	return (
		<Card
			title={label}
			pt={{ root: { className: 'relative' }, title: { className: 'text-lg' }, content: { className: 'p-0' } }}
		>
			<div className={`w-8 h-full top-0 right-8 absolute ${stripeClassNames}`}></div>
			<p className="m-0 text-lg">{value}</p>
		</Card>
	);
};
export default TaskOverviewCard;
