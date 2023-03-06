# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here

I have moved the constants out of the function to global scope to make them easily accessible with other functions.

For the reusability purpose a new function called `getCandidateHash()` is created.

The input can be an empty object or can be event with `partitionKey` this is managed by another function called `getCandidateFromEvent()` that returns the candidate object or null based on the input provided. This function in future can also be used to sanities the input or perform other checks if required without changing the other implementation details.

I have refactored the main function by adding another function named `getCandidateForPartitionKeyFromEvent()` which makes it more readable that this function is getting the candidate based on the partition key provided. In the default implementation at first glance it is not clear that what type of key / object is being returned for the partition key.

By doing so in future if we have an another object/entity for which we need to determine the partition key we can pass on additional information and create a new function which manages that particular entity's partition keys without adding a new
`deterministicPartitionKey()` method. Instead what we can do is we can write another method `getAgentForPartitionKeyFromEvent()` and hide the implementation details which will keep our interface clean. Here is what it would look like.

```
  if(event.typeOFEntity === "Candidate"){
    return getCandidateForPartitionKeyFromEvent(event)
  }else if(event.typeOfEntity === "Agent"){
    return getAgentForPartitionKeyFromEvent(event)
  }
```
