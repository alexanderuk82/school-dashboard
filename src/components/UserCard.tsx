import React from "react";

const UserCard = ({ rolUser }: { rolUser: string }) => {
	return (
		<div className="rounded-2xl odd:bg-alexPurple even:bg-alexYellow p-4 flex-1">
			{rolUser}
		</div>
	);
};

export default UserCard;
