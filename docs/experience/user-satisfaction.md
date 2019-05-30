title: User Satisfaction
description: How user satisfaction is measured in Sematext Experience

On the Overview page of your Experience app you will notice several scores that show the overall user satisfaction for the related performance section of your website.

<img
  class="content-modal-image"
  alt="Sematext Experience Satisfaction Scores"
  src="/images/experience/satisfaction.png"
  title="Satisfaction Scores"
  width=470
  height=130
/>

You can hover over each of these scores to get additional information such as the exact numeric score (0.00–1.00), number of events, and the score range of different score levels. This score is based on the [Apdex](http://www.apdex.org/) industry standard for measuring users satisfaction based on the response time.


### How It's Measured

Different websites have different performance goals which is why the first step in getting good results in measuring your website's performance is to define the different time thresholds based on your requirements. These time thresholds are the key component in measuring users' satisfaction as the Apdex score is based on a set of response time measurements against the time threshold.

Page loads, ajax requests, and on-page transactions have different performance characteristics so we separate these into different user satisfaction scores and allow website owners to set different time thresholds for each. You can configure each of these time thresholds by opening your App and clicking on Configure Requirements in the left menu.

<!-- Todo: add link to a more detailed page about configuring requirements -->

You can also define different url groups and assign different time thresholds for each group by opening your App and clicking on Url Groups in the left menu.

#### Apdex Level

The first step in calculating the Apdex score is determining the Apdex level for each measured response time. Given that T is the above mentioned time threshold, each response time falls into one of the three levels:

 * Satisfied: The response time is less than or equal to T.
 * Tolerating: The response time is greated than T but still less than or equal to 4 * T.
 * Frustrated: The response time is greater than T.

For example, if we have a time threshold of 2 seconds and a recorded page load was finished in 5.2 seconds, then it falls into the Tolerating level.

#### Apdex Score

Given the above we can now calculate the Apdex score. This score is a ratio value of the number of satisfied and tolerating responses to the total number of responses made. Each satisfied response counts as one, while each tolerating response counts as half a satisfied response. The score range is from 0 to 1, where 0 is the worst possible score, and 1 is the best possible score.

The exact formula used is:

<!-- https://www.codecogs.com/latex/eqneditor.php -->
<!-- ApdexScore = \frac{SatisfiedResponses + (ToleratingResponses / 2)}{TotalResponses} -->

<img
  class="content-modal-image"
  alt="Sematext Experience Satisfaction Scores"
  src="/images/experience/apdex.gif"
  title="Satisfaction Scores"
  width=551
  height=47
/>

#### User Satisfaction Levels

We show the satisfaction level most prominently in our user interface because it gives you a better idea of how your visitors perceive the website performance. The different levels are based on the Apdex score:

| Level        | Min  | Max  |
|--------------|------|------|
| Excellent    | 0.93 | 1.00 |
| Good         | 0.84 | 0.92 |
| Fair         | 0.69 | 0.83 |
| Poor         | 0.49 | 0.68 |
| Unacceptable | 0.00 | 0.48 |

