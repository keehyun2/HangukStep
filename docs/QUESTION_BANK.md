# Hanguk Step Question Bank

Questions must be stored independently from Vue components so the web client, future Flutter app, and backend use the same model.

## Stable identifiers

Use IDs in this format:

```text
{course}-{lesson}-q{sequence}
basic-1-q001
eps-12-q004
topik-1-8-q015
```

Never reuse an ID for a different question. Content edits should increment a `version` field after questions move to the backend.

## Question metadata

Every question needs:

- `id`
- `courseId`
- `lessonId`
- `order`
- `type`
- Indonesian prompt
- Korean instruction
- difficulty
- searchable tags
- answer data
- optional image or audio URL

## Supported first types

- `fill-blank`: choose one answer for a blank.
- `sentence-builder`: choose and order only the needed tokens.
- `audio-choice`: listen and choose one answer.

New types should extend the discriminated `LessonQuestion` union instead of adding unrelated fields to existing types.

## Backend migration

The TypeScript file is temporary seed data. Before the Flutter client is created, migrate it to these backend resources:

```text
questions
question_options
question_assets
question_tags
quiz_attempts
quiz_answers
```

Clients should request questions through a versioned API:

```http
GET  /api/v1/lessons/{lessonId}/questions
POST /api/v1/lessons/{lessonId}/attempts
POST /api/v1/attempts/{attemptId}/answers
POST /api/v1/attempts/{attemptId}/complete
```

Correct answers should eventually be scored by the backend. Do not include them in production client responses when the question is used for a formal test.

## Media

Use stable asset IDs and URLs instead of binary data in question records. Keep source images and audio separate from question text so assets can be replaced without changing question IDs.
