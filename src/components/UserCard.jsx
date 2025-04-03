import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, about, age, gender } = user;
  return (
    <div>
      <div className="card bg-base-200 w-96 shadow-sm">
        <figure>
          <img src={user.photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + "  " + lastName}</h2>
                {age && gender && <p>{age+", "+gender}</p>}
          <p>{about}</p>
          <div className="card-actions justify-end my-4">
            <button className="btn btn-primary mx-2">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
