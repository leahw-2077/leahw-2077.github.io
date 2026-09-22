# The turn

I’ve been thinking about Jev through a book I read recently: Max Bennett’s [*A Brief History of Intelligence*](https://www.abriefhistoryofintelligence.com/book).

One of Bennett’s earliest breakthroughs isn’t language or reasoning. It’s steering. In [his account of early bilaterian animals](https://www.frontiersin.org/journals/neuroanatomy/articles/10.3389/fnana.2021.693346/full), a body that could move forward and turn, together with neurons that could weigh competing signals, made a new kind of navigation possible. Food ahead? Keep going. Danger rising? Turn.

Simpler life could already move toward or away from things. Bennett presents the bilaterian step as a hypothesis about *how* sensing, weighing, and movement came together in animals with neurons and muscles—not the first choice ever made by a living thing.

Still, I keep coming back to that image. **An animal doesn’t need to describe every possible path. It has to go somewhere.**

# From answers to choices

We usually notice AI’s intelligence in its answers: how well it explains an idea, writes a paragraph, or reasons through a problem. But in a working product, many consequential judgments are smaller and less visible. Which option should appear first? Is a signal worth acting on? Should the system continue, change course, or leave the decision to a person?

That’s why [Jev](https://typesafe.ai/blog/introducing-system-one-models-and-jev) interests me. Give it a situation and specific questions, and it returns structured choices with probabilities that software can use directly. You can ask an LLM for structured output too. Jev’s bet is to make these small judgments the main job of the model, rather than a format we ask a text-generating model to adopt.

# What we built with Jev

We’ve been trying this at Karpo, where a recommendation has to survive contact with someone’s actual evening. A wrong guess doesn’t just cost a click; it can cost a night out.

In [one small experiment](https://taste.karpo.ai/), we used Jev to rank 1,253 NYC places against signals from someone’s Google Maps history. The fun part is seeing a huge, generic list start to reflect an individual taste.

We’ve also shipped Jev in Karpo Discover. After retrieving and initially ranking candidates, we ask it two separate questions about the top 60: how well does each place fit the category, and how well does it fit this person? We then combine those scores with the initial ranking. At the same time, we removed an older pre-scoring step and a separate LLM selection call.

In that rollout, average homepage request time went from 4.13 to 2.88 seconds—about 30% faster. Category pages went from 2.77 to 1.24 seconds—about 55% faster. Those are gains from changing the *whole pipeline*, not a Jev-only benchmark. And latency alone tells us nothing about whether someone loved the place we suggested.

# Where the analogy stops

An animal has a body, needs, and consequences it can learn from. Jev has none of those on its own. It doesn’t decide what a good night out means for someone, and it won’t automatically learn from a disappointing one. We have to give it useful context, define what each judgment is for, and connect those judgments to what happens after the recommendation.

AI has been classifying and ranking things for decades, so this isn’t a claim that Jev invented choosing. What feels new to me is the prospect of putting flexible, fast judgment into many ordinary moments of software—not just at the end, when we ask a model to explain itself, but while a product is deciding where to turn.

That’s what I mean by a possible “bilaterian moment.” It’s not a claim that Jev completes intelligence. It’s a question about what we can build when choosing becomes as natural a part of software as generating an answer.

I wrote more about [intelligence beyond language](https://leahw-2077.github.io/notes/when-we-talk-about-intelligence/) in an earlier note.
