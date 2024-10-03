function Rating(props) {
  
  const roundedRating = Math.round(props.children);

  let result;

  if (roundedRating >= 5) {
    result = "★★★★★";
  } else if (roundedRating >= 4) {
    result = "★★★★☆";
  } else if (roundedRating >= 3) {
    result = "★★★☆☆";
  } else if (roundedRating >= 2) {
    result = "★★☆☆☆";
  } else if (roundedRating >= 1) {
    result = "★☆☆☆☆";
  } else if (roundedRating >= 0) {
    result = "☆☆☆☆☆";
  } 

  return (
    <div>{result}</div>
  )
}

export default Rating