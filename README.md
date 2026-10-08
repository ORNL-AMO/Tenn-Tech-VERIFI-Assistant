# VERIFI Help Assistant Capstone

## Project charter

VERIFI helps industrial energy professionals organize utility data, evaluate performance, and prepare analyses and reports. Its workflows and terminology can be unfamiliar, and users may need help without leaving the task they are trying to complete.

The goal of this two-semester capstone is to create a standalone, local, source-grounded help assistant for the current VERIFI experience. The interaction may feel like a modern “Clippy”: available when requested, conversational, and able to explain concepts or guide a user through a documented workflow without becoming intrusive.

### Intended users

The audience includes facility and company energy personnel with different levels of experience in VERIFI, utility data, statistics, and energy analysis. Answers should use plain language while preserving important terminology, units, qualifications, and safety warnings.

### Required foundation

The proof of concept must be a standalone Angular application that uses WebLLM for local language-model inference. It must retrieve information from the customer-reviewed [starter corpus](knowledge-base/starter-corpus.md), answer using that material, and identify the records supporting each factual answer. The supplied PDFs provide supporting context, but the reviewed corpus is authoritative when the sources differ.

The assistant must recognize when the available material does not support an answer. In that situation it should ask a focused clarifying question or say that it does not have enough information. General knowledge learned by the language model must not be presented as VERIFI-specific fact.

### Expected behavior

The application should:

- Answer questions about documented VERIFI concepts and workflows.
- Give concise, usable guidance with source citations.
- Preserve warnings associated with risky or destructive actions.
- Remain usable while the model loads and generates a response.
- Provide clear loading, progress, stop, retry, reset, and error states.
- Keep conversations and inference local, apart from clearly documented model-artifact downloads.
- Be keyboard accessible and present the assistant as a dismissible, nonintrusive interface.

### Project boundaries

This project is a proof of concept, not a production VERIFI integration. It will not modify VERIFI data, perform actions for the user, navigate VERIFI automatically, or calculate authoritative energy, savings, or reporting results. Fine-tuning a model and extracting the PDFs at runtime are not required. The project is limited to VERIFI v0; future interfaces are outside its scope.

Electron may be investigated if the team believes it offers a useful deployment or user-experience benefit. It is not required, and it should not be assumed to improve WebLLM performance without evidence.

### Student ownership

The student team owns its proposed architecture, development process, risk management, priorities, milestones, semester schedule, and intermediate demonstrations. The team should present these decisions and any meaningful changes in scope to the customer for approval. The customer will evaluate outcomes rather than prescribe a week-by-week implementation plan.

Use the [Tenn Tech VERIFI Assistant Kanban board](https://github.com/orgs/ORNL-AMO/projects/12/views/1?system_template=kanban) to organize and communicate planned, in-progress, and completed work.

### Customer-provided materials

- [Starter knowledge corpus](knowledge-base/starter-corpus.md)
- [Golden-question evaluation](evaluation/golden-questions.md)
- [Definition of Done](docs/definition-of-done.md)
- [VERIFI user guide](reference/VERIFI-user-guide.pdf)
- [VERIFI tips and tricks](reference/VERIFI-tips-tricks.pdf)

### Success

The project succeeds when the team demonstrates a usable, maintainable proof of concept that meets the [Definition of Done](docs/definition-of-done.md), passes the published golden-question evaluation, and is delivered with enough explanation and evidence for the customer to continue the work professionally.

## Licensing notice

This repository does not currently include a software license. Public availability does not by itself grant permission to reuse or redistribute the contents. Licensing and contribution terms must be resolved before student work is reused in a production product.
