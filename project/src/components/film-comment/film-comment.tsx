import { CommentData } from '../../types/types';

type FilmCommentProp = {
    commentary: CommentData
}

function FilmComment({commentary}:FilmCommentProp):JSX.Element {
  const {comment, rating, user, date} = commentary;
  const formatDate = new Date(date).toLocaleDateString('en-US',{year: 'numeric', month: 'long', day: 'numeric'});
  const formatRating = rating.toLocaleString(undefined, {minimumFractionDigits: 1}).replace('.',',');
  return(
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time className="review__date" dateTime={formatDate}>{formatDate}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{formatRating}</div>
    </div>
  );
}

export default FilmComment;
