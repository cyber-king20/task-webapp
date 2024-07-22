import React from 'react';

const RootLayout = ({ children }: any) => {
	return (
		<main className="p-8 min-h-screen bg-gray-200 ">
			{/* <Outlet /> */}
			<div className="max-w-[72rem] m-auto ">{children}</div>
		</main>
	);
};

export default RootLayout;
