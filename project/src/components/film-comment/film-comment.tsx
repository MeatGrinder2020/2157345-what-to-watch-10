import { CommentData } from '../../types/types';

type FilmCommentProp = {
    commentary: CommentData
}

function FilmComment({commentary}:FilmCommentProp):JSX.Element {
  const {comment, rating, user, date} = commentary;
  return(
    <div className="review">
      <blockquote className="review__quote">
        <p className="review__text">{comment}</p>

        <footer className="review__details">
          <cite className="review__author">{user.name}</cite>
          <time className="review__date" dateTime={new Date(date).toLocaleDateString()}>{new Date(date).toLocaleDateString()}</time>
        </footer>
      </blockquote>

      <div className="review__rating">{rating}</div>
    </div>
  );
}

export default FilmComment;
