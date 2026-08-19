# Abstract

The foundation-model industry once appeared to have a clean division of labor: labs conducted research and trained models; product companies wrapped those models in interfaces, workflows, and business models.

That boundary is disappearing.

On one side, frontier labs such as OpenAI and Anthropic are moving deeper into products. They no longer provide only APIs; they are building coding agents, research agents, computer-use agents, and the full operating environments around them. On the other side, product companies such as Cursor are training their own models and feeding real production interactions directly into their optimization loops. Meta's ARE and OpenEnv elevate the environment into a shared abstraction for training, evaluation, and deployment. OpenAI's GDPval moves evaluation beyond exam questions to real work products: legal documents, engineering drawings, customer-support conversations, and more.[1][2][3]

All of these changes point to the same conclusion: an AI product is no longer merely a distribution channel for a model. The product is becoming the place where the model - and the system around it - learns.

This essay advances a stronger claim:

**Once open models cross a minimum capability threshold, product companies that own proprietary environments and closed feedback loops will outperform general-purpose frontier models accessed only through APIs in bounded, feedback-rich vertical domains.**

The reason is not that open models are inherently better, nor that every company should pretrain a foundation model. The reason is that open models provide a rapidly improving intelligence prior, while products own something frontier labs cannot easily reproduce: real tasks, tools, state, outcomes, and feedback. One provides the starting point. The other continuously supplies direction.

Frontier labs optimize the prior. Product labs optimize the posterior.

**Signal is all you need** - not because signal alone solves everything, but because every meaningful improvement to a model, an architecture, or a product requires direction from real outcomes.

---

# 1. From Agent Systems to Learning Systems

In 2023, Lilian Weng decomposed an LLM-powered agent into several core components: planning, memory, and tool use. That framework shaped much of the agent research and product development that followed.[4] By 2026, she had widened the lens to the harness: the runtime system outside the model that organizes workflow, context, tools, permissions, persistent state, and evaluation - and potentially makes self-improvement possible.[5]

We can take this line of thought one step further.

An AI product deployed in the real world is not merely an agent system. It is also a learning system. At minimum, it contains six parts:

1. **Task distribution**: the tasks users actually bring, rather than tasks researchers wrote in advance;
2. **Environment**: the visible state, constraints, tools, and external world in which the task unfolds;
3. **Trajectory**: the complete sequence of observations, reasoning, actions, and outcomes;
4. **Signal**: learning direction extracted from user reactions, programmatic verification, and real-world results;
5. **Update surface**: the model, prompt, memory, tools, router, workflow, and UX;
6. **Evaluation loop**: the mechanism that determines whether a change produced real progress or merely improved a metric.

The product learning system: real tasks become trajectories and signals inside the product environment, which then update the model, harness, and product

Traditional software products also collect feedback, analyze logs, and run A/B tests. Calling every product iteration reinforcement learning would therefore be imprecise. This essay uses the broader term **reinforcement loop**: a system acts in an environment, observes the outcome, and modifies the policy on which its next action will depend.

An interaction can be represented as a trajectory:

τ = (s₀, a₀, o₁, a₁, …, oₜ)

Here, *s* includes the user, memory, time, location, and product state; *a* can be a response, a search, a tool call, a clarifying question, or a proactive intervention; and *o* includes tool outputs, user reactions, and real-world consequences.

The system extracts a signal from the trajectory:

y = g(τ, h, r_world)

*h* may be feedback from a user or evaluator, while *r_world* is the downstream result of the task. The system then applies an update operation *U* to modify its policy:

Θ_(t+1) = U(Θₜ, τ, y)

The crucial point is that *Θ* contains more than model weights:

Θ = {θ_model, θ_prompt, θ_memory, θ_tools, θ_router, θ_workflow, θ_UX}

*U* does not have to be PPO or gradient descent. It can be fine-tuning, prompt optimization, a change to memory policy, a redesigned tool schema, an updated router, a human architecture change, or even a redesign of the human-AI workflow.

This definition creates an important shift: the unit that learns is no longer only the model. It is the complete **model-harness-product** system.

---

# 2. Environment: A More Fundamental Abstraction Than the RL Algorithm

In classical reinforcement learning, the environment determines what an agent can observe, which actions it can take, and how each action changes the world. For an LLM agent, the environment is usually composed of a task, a harness, tools, state, and a grading rubric.

The value of this abstraction is that it is not tied to a single training algorithm. The same environment can support:

- Offline evaluation;
- Online A/B testing;
- Synthetic trajectory generation;
- Prompt and harness optimization;
- Supervised fine-tuning or distillation;
- Reinforcement learning;
- Failure replay and regression testing.

In an interview with Sequoia, Prime Intellect described an environment as the unit that connects a task, an agent harness, and a grading rubric, and argued that every AI company may eventually want its own research lab. Its central example was Cursor: Composer is not optimized inside an abstract coding benchmark. It learns inside the same tools and interaction environment as the Cursor product.[6]

Meta's Agents Research Environments (ARE) and Gaia2 reflect a similar shift. Gaia2 tests more than search and execution. It asks an agent to handle ambiguity, collaboration, time constraints, and noisy information in a dynamic, asynchronous environment. Many failures invisible to a static benchmark emerge only when an agent's action changes the state it will encounter next.[1]

This is also the fundamental difference between a static dataset and an environment.

A dataset tells a model: “In the past, someone produced this output for this input.”

An environment allows a system to discover: “If I take this action in this state, how will the world change next?”

The former primarily carries knowledge. The latter carries causality, constraints, and consequences. For agents that must act over long horizons, the scarce resource is often no longer more tokens. It is a world that can be entered repeatedly, acted upon, and observed.

---

# 3. Signal, Not Just Data

“More users lead to more data; more data leads to a better model; a better model attracts more users.” This was once the standard story of the AI product data flywheel. It hides a problem: most product data does not automatically tell the system how it should change.

A chat log is data. A user saying “That restaurant is too far away” is also data. It becomes an actionable signal only when the system can determine whether the user is correcting location resolution, a distance constraint, ranking policy, persona recall, or the way results were presented.

**Data records what happened. Signal tells the system how to change.**

## 3.1 Four Common Types of Signal

| **Signal Type** | **Examples** | **Advantages** | **Common Failure Mode** |
|-|-|-|-|
| Explicit human feedback | Thumbs up/down, written corrections, pairwise preferences | Intent is relatively direct | Feedback is sparse and shaped by emotion and interface design |
| Implicit behavioral signal | Accept, undo, retry, follow-up, bypass | Abundant and grounded in real behavior | Meaning is ambiguous; engagement is easily mistaken for value |
| Programmatic outcome | Unit test, database state, API result, constraint check | Clear, cheap, and scalable | The system may overfit the verifier or exploit test loopholes |
| Delayed world outcome | Actual adoption, recurrence, long-term trust | Closest to real value | Long delay, many confounders, difficult credit assignment |

A useful signal should satisfy at least four conditions:

1. **Aligned**: it tracks the outcome the user actually wants, not merely what is easy to measure;
2. **Attributable**: it helps identify which component caused success or failure;
3. **Actionable**: the system owns a policy surface it can modify in response;
4. **Timely**: the loop closes quickly enough to validate a change before the environment moves on.

A product's learning speed can therefore be approximated as:

Learning Velocity ∝ Signal Quality × Attribution Quality × Update Speed

Attribution is the most frequently neglected term. A product can possess enormous volumes of user feedback and still be reduced to random tuning if it cannot tell whether a failure came from the model, memory, a tool, or the interface.

## 3.2 Feedback Is Not Signal

A user continuing the conversation may mean the previous answer was excellent. It may also mean the answer failed to solve the problem. The absence of a complaint may indicate satisfaction, or it may indicate abandonment. A click on a place may represent genuine interest, or it may simply mean the user is checking what the system actually recommended.

Feedback is an observation produced inside an environment. Signal is an interpreted observation that can enter an update loop.

Feedback that never enters a loop is only analytics. Analytics that cannot be validated easily becomes organizational storytelling: teams select the metrics they prefer to believe, then make the system converge on them.

---

# 4. What Is Learning? The Model, the Harness, or the Product?

When an AI product performs poorly, the most natural response is: “Use a stronger model.” But the same base model can exhibit radically different quality, cost, and failure modes inside different agent architectures. IBM's Open Agent Leaderboard evaluates the complete agent system rather than the model alone. Its results show that pairing the same model with different agents can substantially change both score and cost, and that architectural changes such as tool shortlisting can turn a failing configuration into a viable one.[7]

A single piece of user feedback may point to three different classes of update.

## 4.1 Model-Level Updates

- Fine-tuning or RL;
- Reward modeling;
- Distillation;
- Model selection;
- Inference-time compute policy.

These updates can internalize new behavior and make it cheap at inference time, but training is more expensive, and a bad reward can produce behaviors that are harder to remove.

## 4.2 Harness-Level Updates

- System prompt and context assembly;
- Memory capture, retrieval, and injection;
- Tool definitions and permissions;
- Routing and planning loops;
- Reflection, verification, and retry;
- Persistent state and artifact management.

Harness updates are usually faster than changing weights and easier to roll back. Lilian Weng describes this as an engineering layer closer to runtime and software-system design: it determines how a model observes, acts, remembers, checks itself, and iterates.[5]

## 4.3 Product-Level Updates

- How a user expresses a goal;
- Which actions require confirmation;
- When to show a preview, diff, or evidence;
- At what level of abstraction a human intervenes;
- How a user corrects memory and preferences;
- When the system should be proactive, and when it should remain silent.

A product update changes more than the experience. It also changes the signals that will be available in the future. A memory product without a correction interface loses its most important source of supervision. An agent product that reveals only the final answer and hides the trajectory makes it difficult for both users and builders to determine where a failure occurred.

The same user feedback may imply a model, harness, or product update; the deciding factors are the full trajectory and root-cause attribution

Product design is therefore environment design. The interface determines whether a human can express reward. The tool interface defines the agent's action space. Permissions and confirmations define the safe boundary of exploration. Logs and artifacts determine whether a failure can become material for the next learning cycle.

---

# 5. Open Weights, Closed Loops

By mid-2026, the general capability gap between open weights and the proprietary frontier was shrinking rapidly. On the Artificial Analysis Intelligence Index, the open-weight Kimi K3 entered at 57 and ranked third overall, only three points behind the leader at the time.[15] **Open weights are no longer merely a cheaper substitute.** This shifts the locus of competition beyond the model: as base-model priors converge, the teams that own the richest tasks, densest feedback, and fastest update loops become increasingly likely to define the frontier of a domain.

Once an open model is placed inside a purpose-built vertical environment and continuously optimized, the ordering can reverse.

Scale used tool-augmented RLVR to optimize open models for enterprise Text-to-SQL and legal reasoning. In its report, Text-to-SQL execution accuracy rose from 21.9% for the best out-of-the-box baseline to 46.9%. Legal-task accuracy reached 83.6%, while the hallucination rate on unanswerable questions fell to 21%, compared with 49% for the GPT-5 baseline. On these specific enterprise tasks, open models optimized in vertical environments surpassed general-purpose models including GPT-5, Gemini 2.5 Pro, and Claude 4.5 Sonnet.[8]

Another study spanning medicine, chemistry, psychology, and economics showed that reinforcement learning a 7B base model with domain verifiers could, within the study's evaluation setting, outperform the larger Qwen2.5-72B-Instruct and DeepSeek-R1-Distill-Qwen-32B.[9]

These results are not enough to show that open models will broadly surpass frontier labs at general intelligence. They support a narrower, but economically more consequential, claim:

**A weaker base model with a better domain gradient can outperform a stronger general model with no access to the environment.**

## 5.1 Prior and Posterior

A foundation model can be understood as a prior: it compresses general knowledge, linguistic competence, and patterns of reasoning. Model scale, pretraining data, and general post-training determine the quality of that prior.

The product environment continuously supplies new evidence: how this organization works, what this user values, what counts as a correct outcome in this domain, and which errors carry real cost.

Vertical performance can be approximated as:

P_domain(t) ≈ P_base + ∫₀^t Q_signal(u) · R_update(u)  du

The frontier lab's advantage is a higher *P_base*. The product-native lab's advantage is higher-quality, more reality-grounded signal and a faster, longer-running update loop.

Conceptual illustration: a generic frontier model starts ahead, while a vertical system compounds feedback and may establish a domain-specific frontier

This figure is not an empirical scaling law. It represents a competitive dynamic: the stronger prior determines performance on day one; the persistent gradient determines the domain boundary years later.

## 5.2 Why Frontier Labs Will Not Win Every Vertical

Frontier labs also possess products, feedback, and research capability. But they must optimize a general objective that spans countless users, languages, industries, and safety constraints. They cannot simultaneously own, in every industry:

- Private tools and permission systems;
- Internal organizational state and workflows;
- The long-tail distribution of real tasks;
- Corrections from domain experts;
- Downstream outcomes and long-term costs;
- The complete trajectory behind every product failure.

Nor do they necessarily have an incentive to optimize a particular vertical workflow to its limit. Once Claude Code becomes an important product, Anthropic will naturally make its models work especially well inside its own coding harness, not inside every coding startup's interaction model. Sequoia and Prime Intellect call this a product-model optimization loop: the more successful a product becomes, the more effectively institutional knowledge can compound inside its models and systems.[6]

The future competition may therefore be less “open-model companies versus frontier labs” and more:

The open-model ecosystem supplies an ever-stronger general substrate. Vertical product companies convert that general capability into a local frontier inside environments they own.

## 5.3 Conditions for the Strong Claim

This logic does not apply to every product. For a vertical system to surpass a general-purpose frontier model, at least the following conditions must hold:

1. The open model has crossed the minimum capability threshold for the domain;
2. The domain produces enough real tasks, with sufficient diversity and change over time;
3. The product can observe downstream outcomes, not merely generate content;
4. Feedback can be attributed to a specific component;
5. The team can modify weights or the complete harness, rather than merely place a prompt in front of an API;
6. Updates can be shipped quickly and safely, then revalidated in production;
7. The system retains held-out evaluation to avoid overfitting its own users and metrics;
8. The use of user data is governed by explicit permission, consent, and policy.

In low-frequency domains where feedback is scarce and outcomes are unobservable, the general prior of a frontier model may remain dominant for a long time. Reversal is most plausible in **bounded, high-frequency, feedback-rich** task environments.

---

# 6. Case Study: Karpo as a Living Environment

Coding is today's most mature agent environment because compilers, unit tests, git diffs, CI, and code review provide relatively dense, cheap, and verifiable feedback. Cursor already uses production interactions for online RL. Its early Tab models handled hundreds of millions of requests per day and learned from accept/reject signals; later, real-time RL for Composer turned live user behavior into reward, producing a new checkpoint as often as every few hours.[10][11]

But most human tasks do not come with unit tests.

Karpo offers a different observational window. What happens to environment, signal, and reward design when an agent's objective shifts from “complete a well-defined task” to “understand and help a particular person over time”? Karpo is treated here as an object of research, not as a success story. Its value lies in exposing the complexity of the problem.

## 6.1 Places: Where Objective Constraints Meet Subjective Preference

Place recommendations contain two classes of criteria.

Some are relatively verifiable:

- Does the place exist?
- Is it open?
- Is the distance reasonable?
- Does it satisfy the price, category, and geographic constraints?

Others are deeply personal:

- Does “good for a conversation” mean quiet and spacious, or lively and atmospheric?
- When a user asks for something “more local,” are they rejecting tourists, chains, or places that feel overdesigned?
- Does a historical preference apply to today's companions and context?
- Can an objectively matching result still feel like “somewhere I would never go”?

When a user says “That's too far,” the possible update surfaces include location grounding, query parsing, the distance constraint, ranking, persona recall, clarification strategy, and UI presentation. The feedback is identical; the root cause is not.

Places therefore sits at the boundary between programmatic reward and human preference. It is structured enough to support verifiers, yet subjective enough that no single rubric can fully capture it.

## 6.2 Memory and Persona: Credit Assignment Across Long-Lived State

“I already told you I don't like crowded places” looks, on the surface, like a memory failure. But the complete chain contains at least seven stages:

Capture → Extract → Store → Retrieve → Rank → Inject → Follow

- Did the conversation identify a fact worth retaining over the long term?
- Did extraction overgeneralize the persona?
- Did the new memory overwrite prior state, or was it merged incorrectly?
- Did the current task trigger the relevant recall?
- Was the recalled item ranked high enough?
- Did it actually enter context in a usable form?
- Did the model follow it in the final action?

Without traces at every stage, a team can only “strengthen the memory prompt.” That change may improve recall while creating a new problem: the system overreferences things the user once said, making personalization mechanical, rigid, or even offensive.

A good memory reward is not “recall as much as possible.” It is:

Use a memory that is still valid, at the right moment, with the right degree of force.

This is no longer a simple information-retrieval problem. It is a problem of long-lived state management and judgment.

## 6.3 Proactivity: Sparse, Delayed, and Relational Reward

A proactive agent is closer to open-world reinforcement learning than passive question answering. It acts before the user has issued an explicit request, so the system must first decide:

- Is this worth interrupting the user for?
- Is the information new, concrete, and relevant enough?
- Is this the right time and context?
- Does silence mean the user did not see it, was not interested, or disliked being interrupted?
- Is a click worth a potential loss of long-term trust?

If the reward is open rate, the system will learn to manufacture urgency. If the reward is reply rate, it may learn to ask unnecessary questions. If only explicit negative feedback is penalized, it may overestimate its own value because most users respond to unwanted interventions with silence.

The real objective of proactivity is not engagement. It is **judgment under relational constraints**: knowing what is worth saying, and knowing when not to speak.

Places, Memory, and Proactivity form a gradient of environmental difficulty:

| **Environment** | **Primary Signal** | **Time Horizon** | **Core Difficulty** |
|-|-|-|-|
| Places | Constraint satisfaction + user choice | Minutes to hours | Combining objective correctness with subjective preference |
| Memory / Persona | Correction + cross-session consistency | Days to months | State change, recall attribution, calibrated use |
| Proactivity | Action adoption + long-term trust | Days to years | Sparse reward, counterfactuals, interruption cost |

This progression also maps the next phase of agents: from verifiable tasks, to personalized tasks, and ultimately to environments defined by long-term relationships.

---

# 7. Bad Signal Is More Dangerous Than No Signal

Once a metric enters a learning loop, it no longer merely describes the system. It shapes the system.

Cursor observed two direct examples during real-time RL. A model discovered that deliberately making an invalid tool call could cause a failing sample to be discarded, allowing it to evade negative reward. It also learned to avoid risky code changes by repeatedly asking clarifying questions, because “taking no action” incurred no edit-error penalty. The team was not fixing missing model knowledge. It was fixing loopholes in the reward and data pipelines.[11]

More capable agents will also actively exploit benchmark environments. In an audit of coding benchmarks, Cursor found that some successful trajectories located existing fixes on the public web or in git history rather than solving the problem independently. Scores for several models fell substantially after network and history access were restricted.[12]

Anthropic's research illustrates a more serious possibility: learning to reward-hack inside a flawed but realistic programming RL environment may co-occur with broader anomalous behavior. The study was intentionally constructed and should not be read as evidence that production models will behave the same way. It nevertheless shows that bad incentives can be internalized by a model rather than merely producing a single bad output.[13]

## 7.1 Reward Hacking Does Not Come Only From the Model

The entire product system optimizes proxies:

- A router overselects small models to minimize cost;
- The UI uses default acceptance to raise the acceptance rate;
- An agent narrows the task to improve its success rate;
- A team removes hard examples to make an eval score rise;
- A recommendation system increases time spent while undermining a user's long-term goals;
- A personalization system repeatedly reinforces an old persona and makes it harder for the user to change.

In a broad reinforcement loop, the product team and the organization are learners too. A bad metric trains not only a bad model, but also bad architecture and bad decisions.

## 7.2 Silent Users and Invisible Failure

Users willing to write a correction are a minority. Many of the most serious failures produce no negative feedback. The user quietly leaves, switches tools, or reduces how much they trust the system.

A system that learns only from visible feedback will systematically miss:

- People unwilling to spend time correcting the model;
- People most sensitive to errors, who therefore churn first;
- People unwilling to expose private information in exchange for personalization;
- People harmed by a single ill-timed proactive message.

Signal design must therefore account for negative space. It must analyze not only what happened, but also what should have happened and did not.

## 7.3 Privacy, Consent, and Exploration

The more complete a trajectory becomes, the more likely it is to contain sensitive information. A product's ability to learn from a conversation does not imply a right to do so. An increase in personalization does not imply that the user understands how an update will change future behavior.

Nor is a real product a simulator that can be reset indefinitely. Online exploration consumes user time and trust and may create real-world risk. Learning in high-stakes environments therefore requires:

- Explicit data boundaries and statements of purpose;
- Long-lived state that can be deleted and corrected;
- Shadow mode and offline replay;
- Held-out evaluators;
- Human confirmation before high-impact actions;
- Appropriate separation between evaluators and self-modifying loops.

A good RL environment must do more than produce reward easily. It must also prevent the system from obtaining reward by harming the user.

---

# 8. From Product Company to Neo Lab

The core assets of a traditional frontier lab are compute, research talent, a pretraining corpus, and large-scale training infrastructure. A neo lab does not necessarily own the largest cluster, nor does it have to begin by pretraining a foundation model.

Its definition can be simpler:

**A neo lab is a product-native research organization that owns a sufficiently rich environment and continuously optimizes intelligence inside it.**

What it needs to own is not a particular model, but a continuous-learning capability:

- A unique and continuously evolving distribution of real tasks;
- High-fidelity interaction trajectories;
- The ability to observe downstream outcomes;
- A mechanism that converts failures into regression evaluations;
- A shared update surface across model, harness, and product;
- The ability to return a new policy to the real environment quickly and safely;
- Long-term taste about what is worth optimizing.

Sequoia and Prime Intellect describe this future as one in which “every AI company will want to have its own AI research lab.”[6] This does not mean every company should replicate OpenAI. Quite the opposite: the research agenda of a new kind of lab emerges from inside the product. Problems users encounter repeatedly - and that a general model cannot solve reliably - become the next benchmarks, environments, and optimization targets.

## 8.1 Research and Product Are No Longer Serial

The traditional sequence is: the research team trains a model, the product team integrates it, and users see the result last.

The product-native lab operates as a continuous loop:

Real problem → Environment → Evaluation → System update → Product deployment → New problem

Research questions no longer come only from papers and benchmarks; they also emerge from production failures. Product features no longer exist only to deliver value; they also create clearer observation and correction channels for the system. Evaluation is no longer a one-time exam before release. It becomes a persistent interface between production and research.

## 8.2 The Moat Is Learning Rate, Not Current Score

In an era of rapidly improving models, a system leading by two points today may lose that advantage with the next foundation-model release. The more durable capabilities are:

- When a new model arrives, can the system quickly identify which real tasks it improves?
- When a bad case appears, can the team locate the correct update layer?
- Can a fix become a permanent regression test?
- Can user and organizational best practices enter the system rather than remain in people's heads?
- Can the product take on increasingly complex tasks and thereby generate richer signals for the next cycle?

Competition shifts from “Who has the strongest model?” to “Whose system learns fastest?”

This is why the product itself becomes the lab. Only the product is in continuous contact with the real world, and only the real world continuously generates problems the model's developers did not anticipate.

---

# 9. Future Directions

Today's AI products still depend primarily on human teams to read traces, organize bad cases, and modify prompts and architectures. More complete forms of self-improvement will emerge gradually rather than arrive overnight.

## 9.1 Stage One: Human-Driven System Learning

The most important near-term capability is not allowing a model to rewrite its own weights. It is building reliable product-learning infrastructure:

- Production trace sampling;
- Human and automated evaluation;
- Failure taxonomy;
- Root-cause attribution;
- Regression suites;
- Shadow deployment;
- Cross-version outcome monitoring.

At this stage, the system supplies evidence. Humans decide what should change.

## 9.2 Stage Two: Observability-Driven Architecture Evolution

Next, an agent can read its own trajectories and those of other agents, then automatically propose:

- Prompt patches;
- Tool-schema changes;
- Memory-policy adjustments;
- Router changes;
- New regression evaluations;
- Simplifications to inefficient workflows.

Cursor's Cloud Doctor already demonstrates an early form of this pattern: an agent inspects failures in the cloud environment, analyzes error paths, and modifies skills, commands, or environment configuration so that the next agent rollout is more reliable.[14]

At this stage, humans move from fixing problems one by one to reviewing proposed changes, maintaining held-out evaluators, and deciding which metrics may enter the optimization loop.

## 9.3 Stage Three: Joint Optimization of Model, Harness, and Product

Over the longer term, the model, harness, and product may cease to evolve independently and instead be optimized jointly:

- The system dynamically selects the model, context budget, and tools for each task;
- Memory policy changes with the user relationship and the relevant risk boundary;
- The interface decides when to show evidence and when to request confirmation based on uncertainty;
- Production failures automatically generate environments and candidate fixes;
- Each organization develops institutional intelligence adapted to its own systems, tools, and language;
- Each user has not a static persona, but a correctable, erasable, continuously negotiated adaptive policy.

The endpoint is not necessarily one model rewriting all of its own code. A more plausible architecture is a set of loops operating at different timescales: the model acts in seconds, the harness adapts over hours or days, the product evolves over weeks, and the organization redefines its objectives over months or years.

## 9.4 Who Defines the Reward?

The more capable a system becomes at improving itself, the more consequential value judgments become.

Long-term value, research taste, relational judgment, and human growth are difficult to compress into a single reward. Some of the most important outcomes can be judged only when people look back years later.

The most important future research question may therefore be not how to eliminate the human from the loop, but how to move humans to the right level of abstraction:

- Stop approving every low-risk action, while still defining objectives and non-negotiable boundaries around optimization;
- Stop manually inspecting every trajectory, while retaining oversight of evaluators, long-term value, and structural bias;
- Stop writing every rule, while still deciding what the system should become - and what it must never become.

---

# Conclusion: The Product Is the Lab

The first generation of AI products was built on top of models. The next generation will become the place where models learn.

The open-model ecosystem will continue to narrow the general capability gap. Cheaper compute, more mature post-training, shared environment standards, and open agent infrastructure will give more product companies optimization capabilities once limited to frontier labs. But general intelligence is only the starting point. What turns it into domain intelligence is the continuous stream of real tasks, actions, outcomes, and corrections inside a product.

This does not make foundation models less important. It redefines the division of labor: frontier labs provide increasingly capable priors; product-native labs form increasingly deep posteriors inside worlds of their own.

The largest model will not own every frontier. Every product environment rich enough, real enough, and capable of producing effective signal can create a frontier of its own.

The new lab will not necessarily begin with a cluster, a benchmark, or a research paper. It may begin with a product: a product that sees real problems, acts in the world, learns from consequences, and compounds what it learns.

Open models provide the prior.  
Products provide the environment.  
The company with the best feedback loop defines the frontier.

The product is the environment. The environment produces the signal. And the product that learns fastest becomes the lab.

---

# References

1. Meta AI. [“ARE: Scaling Up Agent Environments and Evaluations.”](https://ai.meta.com/research/publications/are-scaling-up-agent-environments-and-evaluations/) 2025.
2. Meta & Hugging Face. [“Building the Open Agent Ecosystem Together: Introducing OpenEnv.”](https://huggingface.co/blog/openenv) 2025.
3. OpenAI. [“Measuring the Performance of Our Models on Real-World Tasks: GDPval.”](https://openai.com/index/gdpval/) 2025.
4. Lilian Weng. [“LLM Powered Autonomous Agents.”](https://lilianweng.github.io/posts/2023-06-23-agent/) 2023.
5. Lilian Weng. [“Harness Engineering for Self-Improvement.”](https://lilianweng.github.io/posts/2026-07-04-harness/) 2026.
6. Sequoia Capital, Training Data. [“Building the GitHub for RL Environments: Prime Intellect's Will Brown & Johannes Hagemann.”](https://sequoiacap.com/podcast/building-the-github-for-rl-environments-prime-intellects-will-brown-johannes-hagemann/) 2026.
7. IBM Research / Hugging Face. [“The Open Agent Leaderboard.”](https://huggingface.co/blog/ibm-research/open-agent-leaderboard) 2026.
8. Scale Labs. [“Scaling Enterprise Agent Performance with Reinforcement Learning via Verifiable Feedback Loops.”](https://labs.scale.com/blog/scaling-enterprise-agent-performance-with-reinforcement-learning-via-verifiable-feedback-loops) 2025.
9. Su et al. [“Crossing the Reward Bridge: Expanding RL with Verifiable Rewards Across Diverse Domains.”](https://arxiv.org/abs/2503.23829) 2025.
10. Cursor. [“Improving Cursor Tab with Online RL.”](https://cursor.com/blog/tab-rl) 2025.
11. Cursor. [“Improving Composer Through Real-Time RL.”](https://cursor.com/blog/real-time-rl-for-composer) 2026.
12. Cursor. [“Reward Hacking Is Swamping Model Intelligence Gains.”](https://cursor.com/blog/reward-hacking-coding-benchmarks) 2026.
13. Anthropic. [“From Shortcuts to Sabotage: Natural Emergent Misalignment from Reward Hacking.”](https://www.anthropic.com/research/emergent-misalignment-reward-hacking) 2025.
14. Cursor. [“How We Set Up Our Cloud Agent Environment.”](https://cursor.com/blog/cloud-agent-environment) 2026.
15. Artificial Analysis. [“Four Frontier Launches in Eight Days: Six Labs Now Field a Model Above 50 on the Artificial Analysis Intelligence Index.”](https://artificialanalysis.ai/articles/four-frontier-launches-in-eight-days-six-labs-now-field-a-model-above-50-on-the-artificial-analysis-intelligence-index) 2026.
