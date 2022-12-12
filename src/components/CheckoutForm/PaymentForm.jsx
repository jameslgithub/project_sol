import React from 'react'

const ReviewForm = () => {
    return (
      <form>
        <label>
          Rate Our Service For Better Quality!
          <textarea name="review" />
        </label>
        <input type="submit" value="Submit Review" />
      </form>
    );
  };
  
  export default ReviewForm;