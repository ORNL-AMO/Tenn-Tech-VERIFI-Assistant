# Definition of Done

The capstone proof of concept is complete only when the team can demonstrate the following outcomes and provide the associated evidence. The team owns its implementation approach and may propose changes to these criteria for customer approval before treating them as accepted.

## Product behavior

- The result is a working standalone Angular application using WebLLM for local language-model inference.
- The application ingests and can retrieve all 24 `Reviewed` records in the starter corpus without extracting the reference PDFs at runtime.
- Factual VERIFI answers are grounded in retrieved records and identify the supporting record IDs.
- When the reviewed records do not support an answer, the assistant asks a focused clarifying question or explicitly states that it lacks sufficient information.
- General model knowledge is not presented as VERIFI-specific fact.
- Warnings attached to risky or destructive records are preserved in the answer.
- The assistant does not modify VERIFI data, perform autonomous actions, or produce authoritative calculations that are absent from the reviewed corpus.

## Interaction and failure states

- The interface provides understandable states for model loading, download or initialization progress, generation, completion, stopped generation, retry, reset, and failure.
- A user can stop an in-progress answer and begin a new conversation without reloading the application.
- Model work does not make the interface unusable; the team chooses and documents how responsiveness is maintained.
- Missing required browser capabilities and model-loading failures produce actionable messages rather than an unexplained blank or frozen interface.
- The assistant is available when requested and can be dismissed without interrupting the rest of the demonstration application.

## Grounding and evaluation

- The application scores at least **120 out of 150** on the published golden-question evaluation.
- Golden questions 13–15 pass individually.
- No evaluated response recommends destructive storage deletion without the required backup and escalation warning.
- No evaluated response invents an undocumented VERIFI formula, threshold, workflow, or product capability.
- Citations identify records that actually support the associated claims.
- Automated tests cover retrieval behavior, prompt or context assembly, citation preservation, insufficient-information handling, and safety-warning preservation.

## Privacy and operational boundaries

- Conversation content and inference remain local to the application.
- Any network access needed to obtain model artifacts or application assets is documented for the user.
- The application does not send user questions, retrieved records, or conversation history to an undisclosed service.
- Logs and error reporting do not expose conversation content by default.
- Electron is optional. It becomes part of the accepted scope only if the team proposes it, explains the benefit, and receives customer approval.

## Engineering and handoff

- The repository includes repeatable setup, development, test, and build instructions.
- The team documents its architecture, knowledge-retrieval approach, major dependencies, model choice, security/privacy assumptions, and known limitations.
- The team maintains a customer-approved project plan containing milestones, risks, priorities, and intermediate demonstrations.
- Meaningful architectural decisions and changes in scope are recorded with their rationale.
- The final automated test suite passes from a clean checkout using the documented commands.
- The final demonstration includes supported questions, a source-cited answer, an insufficient-information response, a destructive-action warning, loading/error recovery, and keyboard operation.
- The final handoff identifies unfinished work and recommendations for professional integration instead of presenting the proof of concept as production-ready.

## Acceptance evidence

The final handoff package must contain:

1. Golden-question scores and reviewed responses.
2. Automated test results.
3. Setup and architecture documentation.
4. A list of known limitations and deferred work.
5. A final demonstration or recording agreed upon with the customer.

Meeting a schedule or completing a list of implementation tasks does not by itself satisfy this Definition of Done; the observable outcomes and evidence above are required.
