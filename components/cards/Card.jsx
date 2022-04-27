import React from "react";

const Card = ({ dataCharacter, updateChoosing, background, skill }) => {
  //Function for send id character && id Character to parrent component
  const choosingCharacter = (name, id) => {
    updateChoosing(name, id);
  };

  return (
    <>
      {skill.length === 0
        ? dataCharacter.map((data) => (
            <div className={data.id == background ? "card active" : "card"} key={data.id}>
              <img className="image" src={data.imgSrc} alt="avatar" />
              <h1>{data.name}</h1>
              <h2>{data.age}</h2>
              <h3>{data.city}</h3>
              <button className="choose-btn" onClick={() => choosingCharacter(data.name, data.id)}>
                choose
              </button>
            </div>
          ))
        : skill.skills?.map((data) => (
            <div className="card" key={data.id}>
              <img className="image" src={data.imgSrc} alt="avatar" />
              <h3>{data.name}</h3>
            </div>
          ))}
    </>
  );
};

export default Card;
