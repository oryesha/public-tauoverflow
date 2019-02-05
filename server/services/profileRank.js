getUpvoteList = function(list) {
  const res = [];
  const sortedList = list.sort(function(a, b){return b.upvote.count - a.upvote.count})
  sortedList.forEach((post) => {
    res.push(post.upvote.count);
  })
  return res;
}

calcWeightScoreByUpvotes  = function(maxWeightScore, maxPosts, maxUpvotes, upvoteList) {
  let total = 0;
  let maxIdx = upvoteList.length < maxPosts ? upvoteList.length : maxPosts;
  for(let i = 0; i < maxIdx; i++) {
    total = total + ((upvoteList[i]+1)*1.0/(maxUpvotes+1));
  }
  return maxWeightScore*Math.sqrt(total*1.0/maxPosts);
}

exports.calcUserRank = function(user) {
  const upvotesPerQuestion = getUpvoteList(user.myQuestions);
  const upvotesPerAnswer = getUpvoteList(user.myAnswers);
  const questionWeightRes = calcWeightScoreByUpvotes(0.3*1000, 100, 10, upvotesPerQuestion);
  const answerWeightRes = calcWeightScoreByUpvotes(0.6*1000, 100, 20, upvotesPerAnswer);
  const reviewWeightRes = 0.1*1000 * (user.myCourseReviews.length >= 20 ? 1 : user.myCourseReviews.length*1.0 / 20);
  return (questionWeightRes + answerWeightRes + reviewWeightRes);
}
