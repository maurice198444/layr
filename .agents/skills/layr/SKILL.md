```markdown
# layr Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches you how to contribute to the `layr` TypeScript codebase, which is built with the Vite framework. You'll learn the repository's coding conventions, commit message patterns, and how to write and organize tests. This guide also provides suggested commands for common development workflows.

## Coding Conventions

### File Naming
- Use **camelCase** for file names.
  - Example: `myComponent.ts`, `userService.test.ts`

### Import Style
- Mixed import styles are used. Both default and named imports may appear.
  - Example:
    ```typescript
    import React from 'react';
    import { useState } from 'react';
    ```

### Export Style
- Prefer **named exports**.
  - Example:
    ```typescript
    export function fetchData() { ... }
    export const API_URL = '...';
    ```

### Commit Messages
- Use **Conventional Commits**.
- Prefixes include: `refactor`, `build`.
- Example:
  ```
  refactor: improve error handling in userService
  build: update Vite config for production
  ```

## Workflows

_No automated workflows detected in this repository._

## Testing Patterns

- **Test files** are named with the pattern: `*.test.*`
  - Example: `userService.test.ts`
- **Testing framework** is not specified in the repository.
- Place test files alongside the code they test or in a dedicated test directory, following the naming pattern.

  Example test file:
  ```typescript
  // userService.test.ts
  import { fetchUser } from './userService';

  test('fetchUser returns user data', () => {
    const user = fetchUser(1);
    expect(user.id).toBe(1);
  });
  ```

## Commands
| Command         | Purpose                                      |
|-----------------|----------------------------------------------|
| /test           | Run all test files matching *.test.*         |
| /build          | Build the project using Vite                 |
| /refactor       | Start a refactor following commit conventions|
```
