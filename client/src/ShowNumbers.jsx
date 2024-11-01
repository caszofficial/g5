import React from "react";
import { useLocation, useParams } from "react-router-dom";

const ShowNumbers = () => {
  //   const { cantidad } = useParams();
  const location = useLocation();
  console.log(location);

  return (
    <div>
      <div>Hola mundo</div>
      {location.state || <p>"hola"</p>}
    </div>
  );
};

export default ShowNumbers;
