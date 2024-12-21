import React from "react";
import { useParams, useSearchParams } from "react-router-dom";
import Button from "../Button/Button";

const SearchDetails = () => {
  const parameter = useParams();
  console.log(parameter, "parameter from searchDetails");

  const [queryParams, setQueryParams] = useSearchParams()
  const sort = queryParams.get('sort')
  console.log(sort,'sort');
  const filter = queryParams.get('filter')
  console.log(filter,'filter');
  return (
    <div>
      <p>SearchDetails</p>
      <Button onClick={()=>setQueryParams({sort:'desc', filter:'quantity'})}>change query parameters</Button>
    </div>
  );
};

export default SearchDetails;
