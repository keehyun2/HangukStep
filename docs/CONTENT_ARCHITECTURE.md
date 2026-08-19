# Hanguk Step Content Architecture

Course content is split into canonical grammar, lessons, and questions. Components render the data and do not own course content.

## Relationships

```text
Course -> Lesson -> Questions
             |          |
             +----------+-> Grammar entries and optional grammar sections
```

- A grammar entry is stored once in `frontend/src/data/grammar/grammar.ts`.
- A lesson references grammar with `grammarId` and can mark it as an introduction or review.
- A question belongs to one lesson and can reference the grammar used in its answer explanation.
- Grammar sections have stable IDs so a question can link directly to a rule or exception.

## Adding a lesson

1. Add `frontend/src/data/lessons/{course}/lesson-NNN.ts` using the `Lesson` interface.
2. Register it in `frontend/src/data/lessons/index.ts`.
3. Add the question file under `frontend/src/data/questions/{course}/lesson-NNN.ts`.
4. Register its questions in `frontend/src/data/questions/index.ts`.
5. Use `published` only when the lesson is ready to appear in the course list.

The generic route `/courses/:courseId/lessons/:lessonNumber` renders every registered lesson.

## Reusing grammar

Do not duplicate grammar explanations inside lessons. Reference the canonical entry:

```ts
grammarSections: [
  { grammarId: 'particle-eul-reul', mode: 'review', sectionIds: ['no-batchim'] },
]
```

Use `lessonNote` only for context that belongs to that lesson. Shared rules and exceptions belong in the grammar entry.

## Future API migration

The same IDs and relationships should become database foreign keys when content moves to the Spring Boot API. Vue and Flutter can then consume the same course, lesson, grammar, and question resources.
