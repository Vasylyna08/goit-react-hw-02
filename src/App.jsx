import { useEffect, useState } from 'react';
import Description from './components/Description/Description';
import Options from './components/Options/Options';
import Feedback from './components/Feedback/Feedback';
import Notification from './components/Notification/Notification';

const initialReviews = { good: 0, neutral: 0, bad: 0 };

function App() {
  const [reviews, setReviews] = useState(() => {
    const stringifyReviews = localStorage.getItem('feedback');
    const parsedReviews = JSON.parse(stringifyReviews) ?? initialReviews;
    return parsedReviews;
  });

  const updateFeedback = feedbackType => {
    setReviews({ ...reviews, [feedbackType]: reviews[feedbackType] + 1 });
  };

  const resetFeedback = () => {
    setReviews(initialReviews);
  };

  const totalFeedback = reviews.good + reviews.neutral + reviews.bad;
  const positiveFeedback = Math.round((reviews.good / totalFeedback) * 100);

  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(reviews));
  }, [reviews]);

  return (
    <div>
      <>
        <Description />
        <Options
          updateFeedback={updateFeedback}
          resetFeedback={resetFeedback}
          total={totalFeedback}
        />
        {totalFeedback > 0 ? (
          <Feedback
            reviews={reviews}
            total={totalFeedback}
            positive={positiveFeedback}
          />
        ) : (
          <Notification />
        )}
      </>
    </div>
  );
}

export default App;
